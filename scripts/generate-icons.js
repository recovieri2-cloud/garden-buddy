// public/icon.svg → 各サイズの PNG を public/ に生成する
import sharp from 'sharp';
import { readFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const src = resolve(root, 'public/icon.svg');
const outDir = resolve(root, 'public');
mkdirSync(outDir, { recursive: true });

const svg = readFileSync(src);

const targets = [
  { name: 'icon-192.png',         size: 192 },
  { name: 'icon-512.png',         size: 512 },
  { name: 'icon-512-maskable.png', size: 512, maskable: true },
  { name: 'apple-touch-icon.png', size: 180 },  // iOS ホーム画面
  { name: 'favicon-32.png',       size: 32 },
];

for (const t of targets) {
  // maskable は周囲に safe-zone を確保する。SVGをスケールダウンして余白を入れる。
  if (t.maskable) {
    const inner = Math.round(t.size * 0.8);
    const pad = Math.round((t.size - inner) / 2);
    const inner_buf = await sharp(svg).resize(inner, inner).png().toBuffer();
    await sharp({
      create: { width: t.size, height: t.size, channels: 4, background: { r: 16, g: 185, b: 129, alpha: 1 } },
    })
      .composite([{ input: inner_buf, top: pad, left: pad }])
      .png()
      .toFile(resolve(outDir, t.name));
  } else {
    await sharp(svg).resize(t.size, t.size).png().toFile(resolve(outDir, t.name));
  }
  console.log(`✓ ${t.name} (${t.size}x${t.size})`);
}
