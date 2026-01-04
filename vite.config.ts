import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { imagetools } from "vite-imagetools";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Base path: always "/" because we use custom domain (fisio-movimiento.com)
  // Works the same in local development
  base: '/',
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(), 
    imagetools(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'sitemap.xml'],
      manifest: {
        name: 'FisioAnalaura - Fisioterapeuta en CDMX y Metepec',
        short_name: 'FisioAnalaura',
        description: 'Fisioterapeuta con doble titulación (México y España). Especialista en traumatología, ATM, hipopresivos y manejo del dolor.',
        theme_color: '#2CA3B3',
        background_color: '#F8FBFB',
        display: 'standalone',
        icons: [
          {
            src: '/favicon.ico',
            sizes: '64x64',
            type: 'image/x-icon'
          }
        ]
      },
      workbox: {
        // Cache-first para assets estáticos (JS, CSS, imágenes con hash)
        // Network-first para HTML (para siempre tener la versión más reciente)
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,jpg,jpeg,woff,woff2}'],
        // Estrategias de caché para recursos externos
        runtimeCaching: [
          {
            // Google Fonts - Stale-while-revalidate para CSS
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'google-fonts-stylesheets',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 año
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            // Google Fonts - Cache-first para archivos de fuente
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 año
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ],
        // Limitar tamaño de caché (50MB)
        maximumFileSizeToCacheInBytes: 50 * 1024 * 1024,
        // Limpiar caché antigua automáticamente
        cleanupOutdatedCaches: true,
        // No usar skipWaiting (esperar a que el usuario recargue para nueva versión)
        skipWaiting: false,
        clientsClaim: false
      },
      // Solo en producción
      devOptions: {
        enabled: false
      }
    }),
    mode === "development" && componentTagger()
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Ensure proper build output
    outDir: 'dist',
    assetsDir: 'assets',
    // Generate source maps for debugging (optional, can be disabled for smaller builds)
    sourcemap: false,
    // Ensure proper minification
    minify: 'esbuild',
    // Rollup options for better chunking
    rollupOptions: {
      output: {
        // Ensure consistent file naming
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
        // Let Vite handle chunk splitting automatically for better compatibility
        // React.lazy() will automatically create separate chunks for lazy-loaded components
      },
    },
  },
}));
