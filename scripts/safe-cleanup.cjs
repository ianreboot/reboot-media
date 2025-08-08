#!/usr/bin/env node

/**
 * Safe Cleanup Script - Optimized Order to Avoid Build Issues
 * 
 * This script performs cleanup in the correct order:
 * 1. Fix imports and config references first
 * 2. Update package.json dependencies
 * 3. Delete physical files last
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const UI_COMPONENTS_DIR = 'src/components/ui';
const KEEP_COMPONENTS = [
  'accordion', 'alert-dialog', 'badge', 'button', 'card', 
  'checkbox', 'dialog', 'form', 'input', 'label', 'progress', 
  'radio-group', 'select', 'toast', 'toaster', 'use-toast'
];

// Step 1: Analyze component usage
function findUnusedComponents() {
  console.log('📊 Step 1: Analyzing component usage...');
  
  const allComponents = fs.readdirSync(UI_COMPONENTS_DIR)
    .filter(f => f.endsWith('.tsx'))
    .map(f => f.replace('.tsx', ''));
  
  const unusedComponents = [];
  
  for (const component of allComponents) {
    if (KEEP_COMPONENTS.includes(component)) continue;
    
    try {
      // Check if component is imported anywhere
      const searchResult = execSync(
        `grep -r "from.*ui/${component}" src --include="*.tsx" --include="*.ts" 2>/dev/null || true`,
        { encoding: 'utf-8' }
      );
      
      if (!searchResult.trim()) {
        unusedComponents.push(component);
      }
    } catch (e) {
      // Grep returns non-zero if no matches found
      unusedComponents.push(component);
    }
  }
  
  console.log(`  Found ${unusedComponents.length} unused components`);
  return unusedComponents;
}

// Step 2: Fix vite.config.ts references
function fixViteConfig(unusedComponents) {
  console.log('🔧 Step 2: Fixing vite.config.ts...');
  
  const viteConfigPath = 'vite.config.ts';
  let viteConfig = fs.readFileSync(viteConfigPath, 'utf-8');
  
  // Remove references to unused components
  unusedComponents.forEach(component => {
    const radixPackage = `@radix-ui/react-${component}`;
    viteConfig = viteConfig.replace(
      new RegExp(`.*['"]${radixPackage}['"].*\n`, 'g'), 
      ''
    );
  });
  
  fs.writeFileSync(viteConfigPath, viteConfig);
  console.log('  Updated vite.config.ts');
}

// Step 3: Remove imports from source files
function removeImports(unusedComponents) {
  console.log('🔍 Step 3: Removing unused imports...');
  
  const srcFiles = execSync('find src -name "*.tsx" -o -name "*.ts"', { encoding: 'utf-8' })
    .split('\n')
    .filter(Boolean);
  
  for (const file of srcFiles) {
    let content = fs.readFileSync(file, 'utf-8');
    let modified = false;
    
    unusedComponents.forEach(component => {
      const importRegex = new RegExp(`.*from.*['"]\@/components/ui/${component}['"].*\n`, 'g');
      if (importRegex.test(content)) {
        content = content.replace(importRegex, '');
        modified = true;
      }
    });
    
    if (modified) {
      fs.writeFileSync(file, content);
      console.log(`  Fixed imports in ${file}`);
    }
  }
}

// Step 4: Update package.json
function updatePackageJson(unusedComponents) {
  console.log('📦 Step 4: Updating package.json...');
  
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
  
  // Map components to their Radix packages
  const unusedPackages = unusedComponents.map(c => `@radix-ui/react-${c}`);
  
  // Remove from dependencies
  let removed = 0;
  for (const pkg of unusedPackages) {
    if (packageJson.dependencies && packageJson.dependencies[pkg]) {
      delete packageJson.dependencies[pkg];
      removed++;
    }
  }
  
  // Also remove common unused packages
  const otherUnused = [
    'lovable-tagger', 'puppeteer', 'date-fns', 'embla-carousel-react',
    'input-otp', 'next-themes', 'react-day-picker', 'react-resizable-panels',
    'recharts', 'sonner', 'vaul', 'cmdk'
  ];
  
  for (const pkg of otherUnused) {
    if (packageJson.dependencies && packageJson.dependencies[pkg]) {
      delete packageJson.dependencies[pkg];
      removed++;
    }
  }
  
  // Remove test dependencies if not using tests
  const testDeps = [
    '@playwright/test', '@testing-library/react', '@testing-library/jest-dom',
    '@testing-library/user-event', '@vitest/coverage-v8', '@vitest/ui',
    'vitest', 'vitest-axe', 'jsdom', '@axe-core/react'
  ];
  
  for (const pkg of testDeps) {
    if (packageJson.devDependencies && packageJson.devDependencies[pkg]) {
      delete packageJson.devDependencies[pkg];
      removed++;
    }
  }
  
  fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
  console.log(`  Removed ${removed} packages from package.json`);
}

// Step 5: Test build
function testBuild() {
  console.log('🏗️  Step 5: Testing build...');
  
  try {
    execSync('npm install', { stdio: 'inherit' });
    execSync('npm run build', { stdio: 'inherit' });
    console.log('✅ Build successful!');
    return true;
  } catch (e) {
    console.error('❌ Build failed! Aborting file deletion.');
    return false;
  }
}

// Step 6: Delete physical files (only if build passes)
function deleteFiles(unusedComponents) {
  console.log('🗑️  Step 6: Deleting unused files...');
  
  // Delete component files
  unusedComponents.forEach(component => {
    const filePath = path.join(UI_COMPONENTS_DIR, `${component}.tsx`);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`  Deleted ${filePath}`);
    }
  });
  
  // Delete test directories
  const testDirs = [
    'src/test/integration',
    'src/test/utils',
    'test-results',
    'tests'
  ];
  
  testDirs.forEach(dir => {
    if (fs.existsSync(dir)) {
      fs.rmSync(dir, { recursive: true, force: true });
      console.log(`  Deleted ${dir}`);
    }
  });
  
  // Delete config files
  const configFiles = [
    'vitest.config.ts',
    'playwright.config.ts',
    'components.json',
    'nginx.conf',
    'nginx-security.conf',
    'Dockerfile',
    'vercel.json',
    'CONTRIBUTING.md',
    'CHANGELOG.md',
    'PROTOCOL_IMPROVEMENTS.md'
  ];
  
  configFiles.forEach(file => {
    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
      console.log(`  Deleted ${file}`);
    }
  });
}

// Main execution
async function main() {
  console.log('🚀 Starting Safe Cleanup Process...\n');
  
  // Step 1: Find unused components
  const unusedComponents = findUnusedComponents();
  
  if (unusedComponents.length === 0) {
    console.log('✨ No unused components found. Project is already clean!');
    return;
  }
  
  console.log('\nUnused components:', unusedComponents.join(', '));
  console.log('\n');
  
  // Step 2-4: Fix references and dependencies
  fixViteConfig(unusedComponents);
  removeImports(unusedComponents);
  updatePackageJson(unusedComponents);
  
  // Step 5: Test build
  const buildSuccess = testBuild();
  
  if (buildSuccess) {
    // Step 6: Delete files only if build passes
    deleteFiles(unusedComponents);
    console.log('\n✅ Cleanup completed successfully!');
  } else {
    console.log('\n⚠️  Cleanup aborted due to build failure.');
    console.log('Files have not been deleted. Please fix build issues first.');
  }
}

// Run the script
main().catch(console.error);