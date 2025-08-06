#!/usr/bin/env node

/**
 * Build Validation Script
 * Prevents common deployment path mistakes
 */

import { readFileSync, existsSync } from 'fs';
import { exit } from 'process';

const DIST_HTML_PATH = 'dist/index.html';
const INDEX_HTML_PATH = 'index.html';

console.log('🔍 Validating build configuration...');

// Check if dist/index.html exists
if (!existsSync(DIST_HTML_PATH)) {
  console.error('❌ No dist/index.html found. Run build first.');
  exit(1);
}

// Read the built HTML file
const builtHtml = readFileSync(DIST_HTML_PATH, 'utf8');

// Check for dev deployment requirements
const hasRebootAssets = builtHtml.includes('/reboot/assets/');
const hasRootAssets = builtHtml.includes('"/assets/');

// Determine deployment type based on assets paths
if (hasRebootAssets && !hasRootAssets) {
  console.log('✅ Valid DEV build detected (uses /reboot/ paths)');
  console.log('📁 This build is ready for dev.rebootmedia.net/reboot/');
} else if (!hasRebootAssets && hasRootAssets) {
  console.log('✅ Valid PRODUCTION build detected (uses / paths)');
  console.log('📁 This build is ready for rebootmedia.net/');
} else if (hasRebootAssets && hasRootAssets) {
  console.error('❌ MIXED PATHS DETECTED - Build is corrupted');
  console.error('   Found both /reboot/assets/ and /assets/ paths');
  exit(1);
} else {
  console.error('❌ NO ASSET PATHS DETECTED - Build may be corrupted');
  exit(1);
}

// Additional validation: Check source HTML
if (existsSync(INDEX_HTML_PATH)) {
  const sourceHtml = readFileSync(INDEX_HTML_PATH, 'utf8');
  
  if (sourceHtml.includes('/src/main.tsx')) {
    console.log('✅ Source HTML correctly points to development entry');
  } else if (sourceHtml.includes('/assets/index-')) {
    console.log('✅ Source HTML correctly points to built assets');
  } else {
    console.warn('⚠️  Source HTML may have incorrect script references');
  }
}

console.log('🎯 Build validation complete!');