import { defineConfig, loadEnv, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import legacy from '@vitejs/plugin-legacy';

// https://vitejs.dev/config/
const viteConfig = defineConfig((mode: ConfigEnv) => {
  const env = loadEnv(mode.mode, process.cwd())
  return {
    plugins: [vue(),
      legacy({
				targets: ['firefox 68'],
				additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
				renderLegacyChunks: true,
				polyfills: [
				],
				modernPolyfills: [
					'es.promise.finally'
				]
			})],
    resolve: {
      alias: {
        '/@': resolve(__dirname, '.', './src/'),
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
      }
    },
    server: {
      host: env.VITE_HOST,
      port: env.VITE_PORT as unknown as number,
      open: env.VITE_OPEN,
      proxy: {
        '/api': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    build: {
      outDir: 'cpds',
      sourcemap: false,
      chunkSizeWarningLimit: 1500,
      //rollup configuration
      rollupOptions: {
        output: {
          entryFileNames: `assets/[name].${new Date().getTime()}.js`,
          chunkFileNames: `assets/[name].${new Date().getTime()}.js`,
          assetFileNames: `assets/[name].${new Date().getTime()}.[ext]`,
          compact: true,
          //code spliiting
          manualChunks: {
            vue: ['vue', 'vue-router', 'pinia']
          }
        }
      }
    },
    css: { preprocessorOptions: { css: { charset: false }}},
    define: {
			__INTLIFY_PROD_DEVTOOLS__: JSON.stringify(false),
		},
  }
})

export default viteConfig
