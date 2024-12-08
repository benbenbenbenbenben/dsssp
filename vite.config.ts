import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import dts from 'vite-plugin-dts'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  define: {
    'process.env.NODE_ENV': JSON.stringify('production')
  },
  plugins: [
    react({
      jsxRuntime: 'automatic'
    }),
    dts({
      insertTypesEntry: true
    }),
    viteStaticCopy({
      targets: [
        { src: 'src/icons/font.css', dest: 'styles' },
        { src: 'src/icons/font/*', dest: 'font' }
      ]
    }),
    visualizer({
      open: true,
      filename: 'dist/stats.html'
    })
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'DssspIoLibrary',
      fileName: (format) => `dsssp-io.${format}.js`,
      formats: ['es', 'umd']
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        },
        minifyInternalExports: true
      }
    },
    minify: 'esbuild',
    target: 'esnext'
  },
  css: {
    preprocessorOptions: {
      css: {
        charset: false
      }
    }
  },
  assetsInclude: ['**/*.woff', '**/*.ttf', '**/*.svg']
})
