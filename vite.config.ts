// vite.config.ts
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  root: 'src',
  plugins: [react()],
  build: {
    outDir: '../www',
    emptyOutDir: true,
  },
})
