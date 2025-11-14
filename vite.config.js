import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Define a base path para GitHub Pages em NonatoSlv/clima
  base: '/clima/',
})