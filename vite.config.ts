import { defineConfig } from 'vite'
export default defineConfig({
  build: {
    rollupOptions: {
      treeshake: true,
      output: {
        entryFileNames: 'mog-comments.js',
        format: 'es',
      },
    },
  },
})