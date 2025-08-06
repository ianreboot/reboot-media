import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // DEPLOYMENT ENFORCEMENT: Prevent accidental wrong builds
  const isDev = mode === 'development'
  const base = isDev ? '/reboot/' : '/'
  
  console.log(`🔧 Building in ${mode} mode with base path: ${base}`)
  
  // Validate build environment
  if (process.env.NODE_ENV === 'production' && isDev) {
    console.warn('⚠️  WARNING: Building dev mode in production environment')
  }
  
  return {
    plugins: [react()],
    base,
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
          },
        },
      },
    },
  }
})
