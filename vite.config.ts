import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import 'dotenv/config';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    open: true,
    proxy: {
      '/naverApi': {
        target: process.env.VITE_NAVER_API_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/naverApi/, ''),
      },
      '/aladinApi': {
        target: process.env.VITE_SERVER_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/aladinApi/, ''),
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@constants': resolve(__dirname, 'src/constants'),
      '@components': resolve(__dirname, 'src/components'),
      '@customTypes': resolve(__dirname, 'src/types'),
    },
  },
});
