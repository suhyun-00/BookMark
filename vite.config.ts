import { resolve } from 'path';

import { defineConfig } from 'vite';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

import 'dotenv/config';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    open: true,
    proxy: {
      '/api': {
        target: process.env.VITE_SERVER_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@api': resolve(__dirname, 'src/api'),
      '@hooks': resolve(__dirname, 'src/hooks'),
      '@constants': resolve(__dirname, 'src/constants'),
      '@components': resolve(__dirname, 'src/components'),
      '@customTypes': resolve(__dirname, 'src/types'),
    },
  },
});
