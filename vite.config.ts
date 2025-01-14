/// <reference types="vitest" />
import { join, resolve } from 'node:path'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { viteStaticCopy } from 'vite-plugin-static-copy'

import { peerDependencies } from './package.json'

export default defineConfig({
  plugins: [
    react(),
    dts({ rollupTypes: true }), // Output .d.ts files
    viteStaticCopy({
      targets: [
        {
          src: 'src/icons/font.d.ts',
          dest: ''
        }
      ]
    })
  ],
  build: {
    target: 'esnext',
    minify: false,
    lib: {
      entry: resolve(__dirname, join('src', 'index.ts')),
      fileName: 'index',
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      // Exclude peer dependencies from the bundle to reduce bundle size
      external: ['react/jsx-runtime', ...Object.keys(peerDependencies)]
    }
  }
})
