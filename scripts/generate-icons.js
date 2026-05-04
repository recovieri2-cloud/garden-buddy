// public/icon-source.png（1024x1024 推奨）から各サイズの PWA アイコンを生成
import sharp from 'sharp';
import { mkdirSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const outDir = resolve(root, 'public');
mkdirSync(outDir, { recursive: true });

// 優先順：高解像度PNG → SVG（フォールバック）
const pngSrc = resolve(outDir, 'icon-source.png');
const svgSrc = resolve(outDir, 'icon.svg');
const src = existsSync(pngSrc) ? pngSrc : svgSrc;
console.log(`source: ${src}`);

// 採用した空色は maskable のパディング背景にも流用する
let SKY = { r: 191, g: 227, b: 247 };

// ─── 前処理：trim で外周をカット → 残った角の白を空色で flood-fill ───
// 1) sharp.trim() で四辺の白マージンを自動切り落とし
// 2) 角丸カードの四隅にまだ残る白ピクセルを、4隅から flood-fill で空色に置換
//    （内側のメモ帳など独立した白は守られる）
async function trimAndFillCorners(input) {
  // 1) 外周トリム
  const trimmed = await sharp(input).trim({ threshold: 40 }).png().toBuffer();

  // 2) 空色サンプリング（トリム後の上部から青寄りピクセルを探す）
  const { data, info } = await sharp(trimmed)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const w = info.width, h = info.height;
  const sampleAt = (px, py) => {
    const x = Math.max(0, Math.min(w - 1, Math.round(w * px)));
    const y = Math.max(0, Math.min(h - 1, Math.round(h * py)));
    const i = (y * w + x) * 4;
    return [data[i], data[i + 1], data[i + 2]];
  };
  for (const [px, py] of [[0.50, 0.10], [0.40, 0.13], [0.60, 0.13], [0.50, 0.18]]) {
    const [r, g, b] = sampleAt(px, py);
    if (b > r + 15 && b > 180 && r > 100) { SKY = { r, g, b }; break; }
  }
  console.log(`  trim後: ${w}x${h} / sky=rgb(${SKY.r},${SKY.g},${SKY.b})`);

  // 3) 4隅から白っぽいピクセルを flood-fill で空色に置換
  const visited = new Uint8Array(w * h);
  const isWhiteish = (r, g, b, a) => a < 16 || (r >= 230 && g >= 230 && b >= 230);
  const stack = [];
  // 4隅 + 各辺の中点（凹形状でも全周到達できるように）
  const seeds = [
    [0, 0], [w - 1, 0], [0, h - 1], [w - 1, h - 1],
    [Math.floor(w / 2), 0], [Math.floor(w / 2), h - 1],
    [0, Math.floor(h / 2)], [w - 1, Math.floor(h / 2)],
  ];
  for (const [x, y] of seeds) stack.push(x, y);
  while (stack.length) {
    const y = stack.pop(), x = stack.pop();
    if (x < 0 || x >= w || y < 0 || y >= h) continue;
    const v = y * w + x;
    if (visited[v]) continue;
    const i = v * 4;
    if (!isWhiteish(data[i], data[i + 1], data[i + 2], data[i + 3])) continue;
    visited[v] = 1;
    data[i]     = SKY.r;
    data[i + 1] = SKY.g;
    data[i + 2] = SKY.b;
    data[i + 3] = 255;
    stack.push(x + 1, y, x - 1, y, x, y + 1, x, y - 1);
  }

  return await sharp(data, { raw: { width: w, height: h, channels: 4 } })
    .png()
    .toBuffer();
}

const cleanBuf = await trimAndFillCorners(src);
console.log('✓ 白枠除去: trim → 4隅 flood-fill で残り白を空色置換');

const targets = [
  { name: 'icon-192.png',          size: 192 },
  { name: 'icon-512.png',          size: 512 },
  { name: 'icon-512-maskable.png', size: 512, maskable: true },
  { name: 'apple-touch-icon.png',  size: 180 },  // iOS ホーム画面
  { name: 'favicon-32.png',        size: 32 },
];

for (const t of targets) {
  if (t.maskable) {
    // maskable は周囲を safe-zone として確保（80%にスケールダウンし余白に空色）
    const inner = Math.round(t.size * 0.8);
    const pad = Math.round((t.size - inner) / 2);
    const innerBuf = await sharp(cleanBuf).resize(inner, inner, { fit: 'cover' }).png().toBuffer();
    await sharp({
      create: { width: t.size, height: t.size, channels: 4, background: { r: SKY.r, g: SKY.g, b: SKY.b, alpha: 1 } },
    })
      .composite([{ input: innerBuf, top: pad, left: pad }])
      .png()
      .toFile(resolve(outDir, t.name));
  } else {
    // fit: 'cover' でちょうど画面いっぱいに（余白なし）
    await sharp(cleanBuf).resize(t.size, t.size, { fit: 'cover' }).png().toFile(resolve(outDir, t.name));
  }
  console.log(`✓ ${t.name} (${t.size}x${t.size})`);
}
