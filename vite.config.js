import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command, mode }) => {
  
  const base = mode === 'production' 
    ?  '/Student_record_management_frontend/' 
    : '/'

  return {
    plugins: [react()],
    base: base,
    server: {
      port: 5173,
      proxy: {
        '/api': {
          target: 'http://localhost:5000',
          changeOrigin: true,
        },
      },
    },
  }
})