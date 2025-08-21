#!/usr/bin/env node

/**
 * Build Validation Script
 * Prevents common deployment path mistakes
 */

import { readFileSync, existsSync, statSync } from 'fs';
import { exit, argv } from 'process';

console.log('🔍 Validating build configuration...');

// Check for development build
const DEV_DIST_PATH = 'dist/index.dev.html';
const PROD_DIST_PATH = 'dist-prod/index.prod.html';

let buildType = null;
let htmlPath = null;

// Allow manual specification of build type via command line argument
if (argv.includes('--prod')) {
  buildType = 'prod';
  htmlPath = PROD_DIST_PATH;
} else if (argv.includes('--dev')) {
  buildType = 'dev';
  htmlPath = DEV_DIST_PATH;
} else if (existsSync(DEV_DIST_PATH) && existsSync(PROD_DIST_PATH)) {
  // Both builds exist, check which directory was modified more recently
  const devStat = statSync('dist');
  const prodStat = statSync('dist-prod');
  
  if (prodStat.mtime > devStat.mtime) {
    buildType = 'prod';
    htmlPath = PROD_DIST_PATH;
    console.log('📅 Validating most recent build (production)');
  } else {
    buildType = 'dev';
    htmlPath = DEV_DIST_PATH;
    console.log('📅 Validating most recent build (development)');
  }
} else if (existsSync(DEV_DIST_PATH)) {
  buildType = 'dev';
  htmlPath = DEV_DIST_PATH;
} else if (existsSync(PROD_DIST_PATH)) {
  buildType = 'prod';
  htmlPath = PROD_DIST_PATH;
} else {
  console.error('❌ No build found. Expected dist/index.dev.html or dist-prod/index.prod.html');
  exit(1);
}

// Read the built HTML file
const builtHtml = readFileSync(htmlPath, 'utf8');

// Check for dev deployment requirements  
const hasRebootAssets = builtHtml.includes('/reboot/assets/');
const hasRootAssets = builtHtml.includes('"/assets/');

// Validate build matches expected paths
if (buildType === 'dev') {
  if (hasRebootAssets && !hasRootAssets) {
    console.log('✅ Valid DEV build detected (uses /reboot/ paths)');
    console.log('📁 This build is ready for dev.rebootmedia.net/reboot/');
  } else {
    console.error('❌ DEV BUILD ERROR: Expected /reboot/ paths but found different paths');
    console.error('   Reboot assets:', hasRebootAssets, 'Root assets:', hasRootAssets);
    exit(1);
  }
} else if (buildType === 'prod') {
  if (!hasRebootAssets && hasRootAssets) {
    console.log('✅ Valid PRODUCTION build detected (uses / paths)');
    console.log('📁 This build is ready for rebootmedia.net/');
  } else {
    console.error('❌ PRODUCTION BUILD ERROR: Expected / paths but found different paths');
    console.error('   Reboot assets:', hasRebootAssets, 'Root assets:', hasRootAssets);
    exit(1);
  }
}

// Additional validation: Check source HTML 
if (buildType === 'dev' && existsSync('index.dev.html')) {
  const sourceHtml = readFileSync('index.dev.html', 'utf8');
  if (sourceHtml.includes('/src/main.tsx')) {
    console.log('✅ Source HTML correctly points to development entry');
  }
} else if (buildType === 'prod' && existsSync('index.prod.html')) {
  const sourceHtml = readFileSync('index.prod.html', 'utf8');
  if (sourceHtml.includes('/src/main.tsx')) {
    console.log('✅ Source HTML correctly points to development entry');
  }
}

console.log('🎯 Build validation complete!');