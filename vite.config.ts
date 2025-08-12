import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { securityPlugin } from './vite-plugin-security'

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
    plugins: [react(), securityPlugin()],
    base,
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      target: 'es2020',
      cssCodeSplit: true,
      chunkSizeWarningLimit: 200,
      minify: mode === 'production' ? 'esbuild' : false,
      rollupOptions: {
        output: {
          experimentalMinChunkSize: 20000,
          manualChunks: (id) => {
            // Vendor dependencies
            if (id.includes('node_modules')) {
              if (id.includes('react')) {
                return 'react-vendor';
              }
              if (id.includes('react-router')) {
                return 'router-vendor';
              }
              if (id.includes('lucide-react')) {
                return 'icons-vendor';
              }
              if (id.includes('swiper')) {
                return 'swiper-vendor';
              }
              return 'vendor';
            }
            
            // Page chunks by category
            if (id.includes('/src/pages/')) {
              if (id.includes('MarketingPsychology') || 
                  id.includes('UnawareStage') || 
                  id.includes('ProblemAware') || 
                  id.includes('SolutionAware') || 
                  id.includes('ProductAware') || 
                  id.includes('MostAware')) {
                return 'marketing-psychology';
              }
              
              if (id.includes('GrowthPlateau') || 
                  id.includes('RevenueCeiling') || 
                  id.includes('CustomerAcquisition') || 
                  id.includes('MarketExpansion') || 
                  id.includes('OperationalScaling') || 
                  id.includes('TeamGrowth') || 
                  id.includes('ProductMarketFit') || 
                  id.includes('CompetitivePressure')) {
                return 'growth-plateau';
              }
              
              if (id.includes('FractionalCMO') || 
                  id.includes('TransitionStrategies') || 
                  id.includes('WhenToChoose') || 
                  id.includes('CostROI')) {
                return 'fractional-cmo';
              }
              
              if (id.includes('About') || 
                  id.includes('Contact') || 
                  id.includes('Privacy') || 
                  id.includes('Terms')) {
                return 'core-pages';
              }
            }
            
            // Component chunks
            if (id.includes('/src/components/')) {
              if (id.includes('LeadForm') || 
                  id.includes('GlobalHeader') || 
                  id.includes('GlobalFooter') || 
                  id.includes('PricingCards')) {
                return 'ui-components';
              }
              return 'components';
            }
            
            // Context and utilities
            if (id.includes('/src/contexts/') || id.includes('/src/utils/')) {
              return 'utils';
            }
          },
        },
      },
    },
    // Performance optimizations
    esbuild: {
      target: 'es2020',
      legalComments: 'none',
      minifyIdentifiers: mode === 'production',
      minifySyntax: mode === 'production',
      minifyWhitespace: mode === 'production',
    },
    // Development server optimization
    server: {
      fs: {
        allow: ['..'],
      },
    },
  }
})
