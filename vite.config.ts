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
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            router: ['react-router-dom'],
            'marketing-psychology': [
              './src/pages/MarketingPsychology.tsx',
              './src/pages/UnawareStageCustomers.tsx',
              './src/pages/ProblemAwareStageCustomers.tsx',
              './src/pages/SolutionAwareStageCustomers.tsx',
              './src/pages/ProductAwareStageCustomers.tsx',
              './src/pages/MostAwareStageCustomers.tsx'
            ],
            'growth-plateau': [
              './src/pages/GrowthPlateauSolutions.tsx',
              './src/pages/RevenueCeilingBreakthrough.tsx',
              './src/pages/CustomerAcquisitionStall.tsx',
              './src/pages/MarketExpansionBarriers.tsx',
              './src/pages/OperationalScalingCrisis.tsx',
              './src/pages/TeamGrowthBottlenecks.tsx',
              './src/pages/ProductMarketFitErosion.tsx',
              './src/pages/CompetitivePressurePlateau.tsx'
            ],
            'fractional-cmo': [
              './src/pages/FractionalCMOGuide.tsx',
              './src/pages/FractionalCMOVsAgency.tsx',
              './src/pages/FractionalCMOVsFullTime.tsx',
              './src/pages/FractionalCMOVsConsultant.tsx',
              './src/pages/FractionalCMOVsInHouse.tsx',
              './src/pages/TransitionStrategies.tsx',
              './src/pages/WhenToChooseEach.tsx',
              './src/pages/CostROIAnalysis.tsx'
            ],
            'ui-components': [
              './src/components/LeadForm.tsx',
              './src/components/GlobalHeader.tsx',
              './src/components/GlobalFooter.tsx',
              './src/components/PricingCards.tsx'
            ]
          },
        },
      },
    },
  }
})
