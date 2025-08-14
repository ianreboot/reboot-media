import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      reportsDirectory: './coverage',
      exclude: [
        'node_modules/',
        'dist/',
        'assets/',
        '**/*.d.ts',
        '**/*.test.{ts,tsx}',
        '**/__tests__/**',
        '**/test/**',
        'src/test/**',
        'coverage/**',
        'scripts/**',
        'server/**',
        'vite.config.ts',
        'vitest.config.ts',
        'tailwind.config.js',
        'postcss.config.js',
        'eslint.config.js'
      ],
      include: [
        'src/**/*.{ts,tsx}',
        '!src/**/*.d.ts',
        '!src/test/**',
        '!src/**/__tests__/**'
      ],
      thresholds: {
        global: {
          statements: 80,
          branches: 75,
          functions: 85,
          lines: 80
        },
        // Critical business logic requires higher coverage
        'src/utils/': {
          statements: 90,
          branches: 85,
          functions: 90,
          lines: 90
        },
        'src/contexts/': {
          statements: 85,
          branches: 80,
          functions: 85,
          lines: 85
        },
        'src/hooks/': {
          statements: 85,
          branches: 80,
          functions: 85,
          lines: 85
        }
      }
    },
    // Test timeout and retry configuration
    testTimeout: 10000,
    hookTimeout: 10000,
    teardownTimeout: 5000,
    // Performance and reliability settings
    isolate: true,
    pool: 'threads',
    poolOptions: {
      threads: {
        singleThread: false
      }
    },
    // Reporter configuration
    reporter: ['verbose', 'json', 'html'],
    outputFile: {
      json: './test-results.json',
      html: './test-results.html'
    }
  },
})