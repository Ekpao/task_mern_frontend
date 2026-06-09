import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react() ,
    tailwindcss()
  ],
  server: {
    proxy: {
      // Dès que Axios appelle une URL commençant par /v1, Vite la redirige vers le backend
      '/v1': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
