import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isDev = mode === 'development'
  const base = isDev ? '/reboot/' : '/'
  
  console.log(`🔧 Building in ${mode} mode with base path: ${base}`)
  
  return {
    plugins: [
      react()
    ],
    base,
    define: {
      'process.env.NODE_ENV': JSON.stringify(mode),
    },
    build: {
      outDir: isDev ? 'dist' : 'dist-prod',
      sourcemap: isDev,
      target: 'es2020',
      minify: mode === 'production' ? 'esbuild' : false,
      rollupOptions: {
        input: isDev ? './index.dev.html' : './index.prod.html',
      },
    },
    server: {
      fs: {
        allow: ['..'],
      },
    },
    css: {
      devSourcemap: isDev,
    },
  }
})