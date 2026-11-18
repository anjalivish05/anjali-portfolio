import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      'framer-motion': path.resolve(import.meta.dirname, './src/lib/motion.tsx'),
      'canvas-confetti': path.resolve(import.meta.dirname, './src/lib/confetti.ts'),
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  server: {
    port: 5173,
    host: true,
  },
});
