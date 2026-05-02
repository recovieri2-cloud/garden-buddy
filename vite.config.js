import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      // 開発中もService Workerを動かして挙動を確認できるようにする
      devOptions: { enabled: true, type: 'module' },
      includeAssets: [
        'icon.svg',
        'apple-touch-icon.png',
        'favicon-32.png',
      ],
      manifest: {
        name: 'Garden Buddy 🌱',
        short_name: 'Garden Buddy',
        description: '家庭菜園・園芸の記録とAI相談',
        lang: 'ja',
        theme_color: '#10B981',
        background_color: '#F0FDF4',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: '/icon-512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // Anthropic API などサードパーティへのリクエストはキャッシュさせない
        navigateFallbackDenylist: [/^\/api/, /api\.anthropic\.com/],
        // open-meteo の天気は短期キャッシュ（オフライン時にも前回値が使える）
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.open-meteo\.com\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'open-meteo-cache',
              networkTimeoutSeconds: 5,
              expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 6 },
            },
          },
        ],
      },
    }),
  ],
  server: {
    // host: true で 0.0.0.0（全インターフェース）にバインドし、同一LAN内の他端末からアクセス可能になる
    host: true,
    port: 5173,
    strictPort: true,
  },
});
