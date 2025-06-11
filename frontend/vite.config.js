import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@emotion/react', '@emotion/styled', '@emotion/cache']
  },
  resolve: {
    alias: {
      '@emotion/react': '@emotion/react',
      '@emotion/styled': '@emotion/styled'
    }
  },
  server: {
    port: 3000,
  }
})
