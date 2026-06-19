import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('framer-motion') || id.includes('motion-utils') || id.includes('motion-dom')) {
            return 'framer-motion'
          }
          if (id.includes('@stripe') || id.includes('stripe-js')) {
            return 'stripe'
          }
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        },
      },
    },
  },
})