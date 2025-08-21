#!/usr/bin/env node

/**
 * Reboot Media - Deployment Validation Script
 * Validates deployments for common issues and cross-contamination
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const VALIDATION_CONFIG = {
    dev: {
        buildDir: 'dist',
        expectedBranding: 'Reboot Media',
        expectedPaths: ['/reboot/'],
        forbiddenContent: ['syncup', 'SyncUp', 'Ultra', 'BigBrain']
    },
    production: {
        buildDir: 'dist-prod', 
        expectedBranding: 'Reboot Media',
        expectedPaths: ['/'],
        forbiddenContent: ['syncup', 'SyncUp', 'Ultra', 'BigBrain', '/reboot/']
    }
};

function validateBuild(environment) {
    console.log(`🔍 Validating ${environment} build...`);
    
    const config = VALIDATION_CONFIG[environment];
    if (!config) {
        console.error(`❌ Unknown environment: ${environment}`);
        return false;
    }
    
    const buildPath = path.join(__dirname, '..', config.buildDir);
    
    // Check if build directory exists
    if (!fs.existsSync(buildPath)) {
        console.error(`❌ Build directory not found: ${config.buildDir}`);
        return false;
    }
    
    const indexPath = path.join(buildPath, 'index.html');
    
    // Check if index.html exists
    if (!fs.existsSync(indexPath)) {
        console.error(`❌ index.html not found in ${config.buildDir}`);
        return false;
    }
    
    // Read and validate index.html content
    const indexContent = fs.readFileSync(indexPath, 'utf8');
    
    // Check for expected branding
    if (!indexContent.includes(config.expectedBranding)) {
        console.error(`❌ Missing expected branding: ${config.expectedBranding}`);
        return false;
    }
    
    // Check for expected paths
    let hasExpectedPath = false;
    for (const expectedPath of config.expectedPaths) {
        if (indexContent.includes(expectedPath)) {
            hasExpectedPath = true;
            break;
        }
    }
    
    if (!hasExpectedPath) {
        console.error(`❌ Missing expected paths: ${config.expectedPaths.join(', ')}`);
        return false;
    }
    
    // Check for forbidden content (cross-contamination)
    for (const forbidden of config.forbiddenContent) {
        if (indexContent.toLowerCase().includes(forbidden.toLowerCase())) {
            console.error(`❌ CONTAMINATION DETECTED: Found forbidden content "${forbidden}"`);
            return false;
        }
    }
    
    // Check assets directory
    const assetsPath = path.join(buildPath, 'assets');
    if (!fs.existsSync(assetsPath)) {
        console.error(`❌ Assets directory not found: ${path.join(config.buildDir, 'assets')}`);
        return false;
    }
    
    // Count assets
    const assetFiles = fs.readdirSync(assetsPath);
    if (assetFiles.length < 3) {
        console.error(`❌ Too few asset files (${assetFiles.length}). Expected at least 3 files.`);
        return false;
    }
    
    // Check for essential asset types
    const hasJS = assetFiles.some(file => file.endsWith('.js'));
    const hasCSS = assetFiles.some(file => file.endsWith('.css'));
    
    if (!hasJS) {
        console.error(`❌ No JavaScript files found in assets`);
        return false;
    }
    
    if (!hasCSS) {
        console.error(`❌ No CSS files found in assets`);
        return false;
    }
    
    console.log(`✅ ${environment} build validation passed`);
    console.log(`   - Build directory: ${config.buildDir}`);
    console.log(`   - Asset files: ${assetFiles.length}`);
    console.log(`   - Branding verified: ${config.expectedBranding}`);
    console.log(`   - No contamination detected`);
    
    return true;
}

// Main execution
function main() {
    const environment = process.argv[2];
    
    if (!environment) {
        console.error('Usage: node validate-deployment.js <dev|production>');
        process.exit(1);
    }
    
    if (!['dev', 'production'].includes(environment)) {
        console.error('Environment must be either "dev" or "production"');
        process.exit(1);
    }
    
    const isValid = validateBuild(environment);
    
    if (!isValid) {
        console.error(`❌ ${environment} deployment validation FAILED`);
        process.exit(1);
    }
    
    console.log(`✅ ${environment} deployment validation PASSED`);
    process.exit(0);
}

main();