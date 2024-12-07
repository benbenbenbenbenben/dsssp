import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    // strictPort: true,
    open: true,
    hmr: true
  },
  logLevel: 'info'
})
