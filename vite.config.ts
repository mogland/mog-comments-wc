import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: 'src/nx-comments.ts',
      formats: ['es'],
      fileName: format => `nx-comments.${format}.js`,
    },
    // rollupOptions: {
    //   external: /^lit/
    // }
  }
})
