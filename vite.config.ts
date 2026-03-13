import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5000,
    allowedHosts: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
      '/verify-email': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('@mui') || id.includes('@emotion')) return 'mui';
            if (id.includes('recharts') || id.includes('d3-') || id.includes('victory-vendor')) return 'charts';
            if (id.includes('motion') || id.includes('framer-motion')) return 'motion';
            if (id.includes('@supabase')) return 'supabase';
            if (id.includes('@radix-ui')) return 'radix-ui';
            if (id.includes('react-dom') || id.includes('react-router')) return 'react-vendor';
            if (id.includes('react-datepicker') || id.includes('date-fns') || id.includes('react-hook-form') || id.includes('react-google-recaptcha') || id.includes('react-slick') || id.includes('slick-carousel')) return 'form-libs';
            if (id.includes('lucide-react')) return 'icons';
          }
        },
      },
    },
  },
})
