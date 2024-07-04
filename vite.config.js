import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Listen on all network interfaces
    port: 3000,      // Use port 3000
    strictPort: true,
    cors: true
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/__test__/setup.js',
  }
})
