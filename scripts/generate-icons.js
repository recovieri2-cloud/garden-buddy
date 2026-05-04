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

const targets = [
  { name: 'icon-192.png',          size: 192 },
  { name: 'icon-512.png',          size: 512 },
  { name: 'icon-512-maskable.png', size: 512, maskable: true },
  { name: 'apple-touch-icon.png',  size: 180 },  // iOS ホーム画面
  { name: 'favicon-32.png',        size: 32 },
];

for (const t of targets) {
  if (t.maskable) {
    // maskable は周囲を safe-zone として確保（80%にスケールダウンし余白に背景色）
    const inner = Math.round(t.size * 0.8);
    const pad = Math.round((t.size - inner) / 2);
    const innerBuf = await sharp(src).resize(inner, inner, { fit: 'contain' }).png().toBuffer();
    // 背景色は icon の空色（#BFE3F7 系）に近いものを採用
    await sharp({
      create: { width: t.size, height: t.size, channels: 4, background: { r: 191, g: 227, b: 247, alpha: 1 } },
    })
      .composite([{ input: innerBuf, top: pad, left: pad }])
      .png()
      .toFile(resolve(outDir, t.name));
  } else {
    await sharp(src).resize(t.size, t.size, { fit: 'contain' }).png().toFile(resolve(outDir, t.name));
  }
  console.log(`✓ ${t.name} (${t.size}x${t.size})`);
}
