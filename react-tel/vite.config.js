import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  build: {
    outDir: 'public',
    assetsDir: 'build',
    publicDir: 'assets'
  },
  base: "/",
  plugins: [react()],
  test: {
    environment: 'jsdom', 
    globals: true, 
  },
  preview: {
    port: 4000,
    strictPort: true,
  },
  server: {
    port: 4000,
    strictPort: true,
    host: true,
    origin: "http://0.0.0.0:4000",
    watch: {
      usePolling: true
    }
  },
});
