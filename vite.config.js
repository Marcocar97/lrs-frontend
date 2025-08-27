import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {},   // evita errores cuando librerías esperan process.env
  },
  optimizeDeps: {
    include: ['buffer'], // asegura que buffer esté disponible
  },
})
