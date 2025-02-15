import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: { port: 3050 }, build: { outDir: 'build' }, base: './', plugins: [react()],
});
