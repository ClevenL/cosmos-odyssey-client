import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const path = require('path')

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 8080,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000'
      }
    }
  },
  build: {
    outDir: path.resolve(__dirname, '../server/public/')
  }
})
