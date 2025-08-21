import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { securityPlugin } from './vite-plugin-security'
import { visualizer } from 'rollup-plugin-visualizer'

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
    plugins: [
      react(),
      securityPlugin(),
      // Bundle analyzer (generates stats.html)
      visualizer({
        filename: 'bundle-stats.html',
        open: false,
        gzipSize: true,
        brotliSize: true,
      })
    ],
    base,
    define: {
      // Remove dev-only code in production
      __DEV__: isDev,
      'process.env.NODE_ENV': JSON.stringify(mode),
    },
    build: {
      outDir: isDev ? 'dist' : 'dist-prod',
      assetsDir: 'assets',
      sourcemap: isDev ? true : false,
      target: 'es2020',
      cssCodeSplit: true,
      chunkSizeWarningLimit: 150, // Reduced from 200KB
      minify: mode === 'production' ? 'esbuild' : false,
      rollupOptions: {
        input: isDev ? './index.dev.html' : './index.prod.html',
        // Tree shaking optimization
        treeshake: {
          preset: 'recommended',
          unknownGlobalSideEffects: false,
        },
        output: {
          // Improved chunking strategy
          experimentalMinChunkSize: 15000, // Reduced from 20KB
          
          // Optimized manual chunks for better caching
          manualChunks: (id: string) => {
            // Core React libraries - keep separate for better caching
            if (id.includes('node_modules')) {
              // Split React ecosystem for optimal caching
              if (id.includes('react/') || id.includes('react-dom/')) {
                return 'react-core';
              }
              if (id.includes('react-router')) {
                return 'router';
              }
              if (id.includes('scheduler')) {
                return 'react-core';
              }
              
              // UI and icon libraries
              if (id.includes('lucide-react')) {
                return 'icons';
              }
              if (id.includes('swiper')) {
                return 'swiper';
              }
              
              // Small utility libraries can be grouped
              if (id.includes('uuid') || id.includes('joi') || id.includes('bcryptjs')) {
                return 'utils-vendor';
              }
              
              // Everything else goes to common vendor
              return 'vendor';
            }
            
            // Strategic page grouping for route-based code splitting
            if (id.includes('/src/pages/')) {
              // Marketing psychology pages - loaded together often
              if (id.includes('MarketingPsychology') || 
                  id.includes('UnawareStage') || 
                  id.includes('ProblemAware') || 
                  id.includes('SolutionAware') || 
                  id.includes('ProductAware') || 
                  id.includes('MostAware')) {
                return 'pages-psychology';
              }
              
              // Growth plateau solutions - business problems
              if (id.includes('GrowthPlateau') || 
                  id.includes('RevenueCeiling') || 
                  id.includes('CustomerAcquisition') || 
                  id.includes('MarketExpansion') || 
                  id.includes('OperationalScaling') || 
                  id.includes('TeamGrowth') || 
                  id.includes('ProductMarketFit') || 
                  id.includes('CompetitivePressure')) {
                return 'pages-solutions';
              }
              
              // Fractional CMO content - service pages
              if (id.includes('FractionalCMO') || 
                  id.includes('TransitionStrategies') || 
                  id.includes('WhenToChoose') || 
                  id.includes('CostROI')) {
                return 'pages-services';
              }
              
              // Core site pages - loaded immediately
              if (id.includes('About') || 
                  id.includes('Contact') || 
                  id.includes('Privacy') || 
                  id.includes('Terms')) {
                return 'pages-core';
              }
            }
            
            // Component-level chunking
            if (id.includes('/src/components/')) {
              // Critical UI components
              if (id.includes('GlobalHeader') || 
                  id.includes('GlobalFooter') || 
                  id.includes('ErrorBoundary') ||
                  id.includes('BackgroundGradient')) {
                return 'components-core';
              }
              
              // Form and interactive components
              if (id.includes('LeadForm') || 
                  id.includes('PricingCards') || 
                  id.includes('NotificationSystem')) {
                return 'components-interactive';
              }
              
              // Utility components
              if (id.includes('SEOHead') || 
                  id.includes('ScrollToTop') || 
                  id.includes('OptimizedImage') ||
                  id.includes('SchemaMarkup')) {
                return 'components-utils';
              }
              
              // Performance and monitoring
              if (id.includes('PerformanceMonitor') || 
                  id.includes('BackToTopButton')) {
                return 'components-perf';
              }
            }
            
            // Context and app-level utilities
            if (id.includes('/src/contexts/') || id.includes('/src/hooks/')) {
              return 'app-state';
            }
            
            if (id.includes('/src/utils/')) {
              return 'app-utils';
            }
          },
          
          // File naming for better caching
          entryFileNames: () => {
            return 'assets/[name]-[hash].js';
          },
          chunkFileNames: () => {
            return 'assets/[name]-[hash].js';
          },
          assetFileNames: (assetInfo: any) => {
            const extType = assetInfo.name?.split('.')[1];
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType ?? '')) {
              return 'assets/img/[name]-[hash][extname]';
            }
            if (/woff2?|ttf|eot/i.test(extType ?? '')) {
              return 'assets/fonts/[name]-[hash][extname]';
            }
            return 'assets/[name]-[hash][extname]';
          },
        },
        
        // Optimize dependencies that don't need to be bundled
        external: () => {
          // External libraries that should be loaded via CDN in production
          // Keep everything bundled for now for better performance
          return false;
        },
      },
    },
    
    // Enhanced performance optimizations
    esbuild: {
      target: 'es2020',
      legalComments: 'none',
      minifyIdentifiers: mode === 'production',
      minifySyntax: mode === 'production',
      minifyWhitespace: mode === 'production',
      // Remove debugging code in production
      pure: mode === 'production' ? ['console.log', 'console.debug'] : [],
      // Enable tree shaking
      treeShaking: true,
    },
    
    // Optimize dependencies
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
      ],
      exclude: [
        // Large dependencies that benefit from dynamic imports
        'swiper',
      ],
    },
    
    // Development server optimization
    server: {
      fs: {
        allow: ['..'],
      },
    },
    
    // CSS optimization (use postcss.config.js for plugins)
    css: {
      devSourcemap: isDev,
    },
  }
})
