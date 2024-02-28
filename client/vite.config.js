import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({

  //Proxy of server
  server:{
    proxy:{
      '/api':{
        target:'http://localhost:3000',
        secure: false,
      },
    },
  },
  plugins: [react()],
})