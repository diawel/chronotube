import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  root: './',
  plugins: [react()],
  resolve: {
    alias: {
      'src/': `${__dirname}/src/`,
    },
  },
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api': 'https://chronotube.diawel.me/',
    },
  },
})
