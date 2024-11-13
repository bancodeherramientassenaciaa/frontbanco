import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false, // Desactiva los sourcemaps en producción
    outDir: 'dist',  // Asegura que los archivos se coloquen en el directorio `dist`
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
