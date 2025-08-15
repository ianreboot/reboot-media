#!/usr/bin/env node

/**
 * Accessibility Validation Pipeline
 * Static analysis validation for WCAG 2.1 AA compliance
 * No browser automation - analyzes built files and CSS
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Color contrast calculation utilities
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function getLuminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function getContrastRatio(color1, color2) {
  const lum1 = getLuminance(color1.r, color1.g, color1.b);
  const lum2 = getLuminance(color2.r, color2.g, color2.b);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

// WCAG compliance levels
const WCAG_AA_NORMAL = 4.5;
const WCAG_AA_LARGE = 3.0;
const WCAG_AAA_NORMAL = 7.0;
const WCAG_AAA_LARGE = 4.5;

class AccessibilityValidator {
  constructor() {
    this.violations = [];
    this.successes = [];
    this.warnings = [];
    
    // Define problematic combinations to check
    this.problematicPatterns = [
      'text-gray-300',
      'text-gray-400', 
      'text-gray-500',
      'text-gray-600',
      'dark:text-gray-300',
      'dark:text-gray-400'
    ];

    // Color mappings for Tailwind classes
    this.colorMap = {
      'text-gray-300': '#d1d5db',
      'text-gray-400': '#9ca3af',
      'text-gray-500': '#6b7280',
      'text-gray-600': '#4b5563',
      'text-white': '#ffffff',
      'bg-slate-900': '#0f172a', // Dark background base
    };
  }

  async validateProject() {
    console.log('🔍 Starting Accessibility Validation Pipeline...\n');

    // Step 1: Validate CSS architecture
    await this.validateCSSArchitecture();

    // Step 2: Scan component files for problematic patterns  
    await this.scanComponentFiles();

    // Step 3: Validate built CSS for utilities
    await this.validateBuiltCSS();

    // Step 4: Generate compliance report
    this.generateReport();

    return {
      violations: this.violations.length,
      successes: this.successes.length,
      warnings: this.warnings.length,
      isCompliant: this.violations.length === 0
    };
  }

  async validateCSSArchitecture() {
    console.log('📐 Validating CSS Architecture...');

    const accessibilityUtilsPath = path.join(__dirname, '../src/styles/accessibility-utilities.css');
    
    if (!fs.existsSync(accessibilityUtilsPath)) {
      this.violations.push({
        type: 'MISSING_UTILITIES',
        file: 'accessibility-utilities.css',
        message: 'Accessibility utilities CSS file not found'
      });
      return;
    }

    const cssContent = fs.readFileSync(accessibilityUtilsPath, 'utf8');

    // Check for required utility classes
    const requiredClasses = [
      'replace-text-gray-300',
      'replace-text-gray-400', 
      'replace-text-gray-500',
      'text-gradient-safe',
      'text-gradient-enhanced',
      'text-gradient-critical'
    ];

    requiredClasses.forEach(className => {
      if (cssContent.includes(`.${className}`)) {
        this.successes.push({
          type: 'CSS_UTILITY_FOUND',
          class: className,
          message: `Required accessibility class ${className} found`
        });
      } else {
        this.violations.push({
          type: 'MISSING_CSS_UTILITY',
          class: className,
          message: `Required accessibility class ${className} missing`
        });
      }
    });

    console.log('✅ CSS Architecture validation complete\n');
  }

  async scanComponentFiles() {
    console.log('🔎 Scanning component files for problematic patterns...');

    const srcPath = path.join(__dirname, '../src');
    const files = this.getAllTsxFiles(srcPath);

    for (const file of files) {
      const content = fs.readFileSync(file, 'utf8');
      const relativePath = path.relative(srcPath, file);

      // Check for problematic patterns
      this.problematicPatterns.forEach(pattern => {
        const regex = new RegExp(`className="[^"]*${pattern.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}[^"]*"`, 'g');
        const matches = content.match(regex);
        
        if (matches) {
          matches.forEach(match => {
            this.violations.push({
              type: 'PROBLEMATIC_COLOR_CLASS',
              file: relativePath,
              pattern: pattern,
              context: match,
              message: `Problematic color class "${pattern}" found - may fail WCAG contrast requirements`
            });
          });
        }
      });

      // Check for accessibility class usage (positive indicators)
      const goodPatterns = [
        'replace-text-gray-300',
        'replace-text-gray-400',
        'text-gradient-safe',
        'text-gradient-enhanced',
        'text-gradient-critical',
        'text-critical-accessible',
        'text-important-accessible'
      ];

      goodPatterns.forEach(pattern => {
        if (content.includes(pattern)) {
          this.successes.push({
            type: 'ACCESSIBILITY_CLASS_USED',
            file: relativePath,
            class: pattern,
            message: `Accessibility-compliant class "${pattern}" used`
          });
        }
      });
    }

    console.log('✅ Component scanning complete\n');
  }

  async validateBuiltCSS() {
    console.log('🏗️ Validating built CSS output...');

    const distPath = path.join(__dirname, '../dist');
    const cssFiles = this.getCSSFiles(distPath);

    if (cssFiles.length === 0) {
      this.warnings.push({
        type: 'NO_BUILT_CSS',
        message: 'No built CSS files found - run build first'
      });
      return;
    }

    cssFiles.forEach(file => {
      const content = fs.readFileSync(file, 'utf8');
      const relativePath = path.relative(distPath, file);

      // Check if accessibility utilities are included in build
      if (content.includes('--text-gradient-safe') || content.includes('replace-text-gray')) {
        this.successes.push({
          type: 'UTILITIES_IN_BUILD',
          file: relativePath,
          message: 'Accessibility utilities included in built CSS'
        });
      } else {
        this.warnings.push({
          type: 'UTILITIES_NOT_IN_BUILD',
          file: relativePath,  
          message: 'Accessibility utilities may not be included in built CSS'
        });
      }

      // Check for CSS bundle size (performance impact assessment)
      const sizeKB = (Buffer.byteLength(content, 'utf8') / 1024).toFixed(2);
      if (sizeKB > 300) {
        this.warnings.push({
          type: 'LARGE_CSS_BUNDLE',
          file: relativePath,
          size: `${sizeKB}KB`,
          message: `Large CSS bundle detected - monitor performance impact`
        });
      } else {
        this.successes.push({
          type: 'REASONABLE_CSS_SIZE',
          file: relativePath,
          size: `${sizeKB}KB`,
          message: 'CSS bundle size within acceptable range'
        });
      }
    });

    console.log('✅ Built CSS validation complete\n');
  }

  getAllTsxFiles(dir) {
    let files = [];
    const items = fs.readdirSync(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
        files = files.concat(this.getAllTsxFiles(fullPath));
      } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
        files.push(fullPath);
      }
    }

    return files;
  }

  getCSSFiles(dir) {
    if (!fs.existsSync(dir)) return [];

    let files = [];
    const items = fs.readdirSync(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        files = files.concat(this.getCSSFiles(fullPath));
      } else if (item.endsWith('.css')) {
        files.push(fullPath);
      }
    }

    return files;
  }

  generateReport() {
    console.log('📊 ACCESSIBILITY VALIDATION REPORT');
    console.log('═'.repeat(50));
    
    // Summary
    console.log('\n📈 SUMMARY');
    console.log(`✅ Successes: ${this.successes.length}`);
    console.log(`⚠️  Warnings: ${this.warnings.length}`);
    console.log(`❌ Violations: ${this.violations.length}`);
    
    const complianceStatus = this.violations.length === 0 ? '✅ COMPLIANT' : '❌ NON-COMPLIANT';
    console.log(`🎯 Status: ${complianceStatus}\n`);

    // Violations (Critical)
    if (this.violations.length > 0) {
      console.log('❌ CRITICAL VIOLATIONS (Must Fix)');
      console.log('-'.repeat(40));
      this.violations.forEach((violation, index) => {
        console.log(`${index + 1}. ${violation.type}: ${violation.message}`);
        if (violation.file) console.log(`   File: ${violation.file}`);
        if (violation.pattern) console.log(`   Pattern: ${violation.pattern}`);
        if (violation.context) console.log(`   Context: ${violation.context.substring(0, 100)}...`);
        console.log('');
      });
    }

    // Warnings (Should Address)  
    if (this.warnings.length > 0) {
      console.log('⚠️  WARNINGS (Recommend Addressing)');
      console.log('-'.repeat(40));
      this.warnings.forEach((warning, index) => {
        console.log(`${index + 1}. ${warning.type}: ${warning.message}`);
        if (warning.file) console.log(`   File: ${warning.file}`);
        console.log('');
      });
    }

    // Successes (Good Progress)
    if (this.successes.length > 0) {
      console.log('✅ SUCCESSES (Good Implementation)');
      console.log('-'.repeat(40));
      this.successes.slice(0, 10).forEach((success, index) => {
        console.log(`${index + 1}. ${success.type}: ${success.message}`);
        if (success.file) console.log(`   File: ${success.file}`);
      });
      
      if (this.successes.length > 10) {
        console.log(`   ... and ${this.successes.length - 10} more successes`);
      }
      console.log('');
    }

    // Next Steps
    console.log('🚀 NEXT STEPS');
    console.log('-'.repeat(20));
    if (this.violations.length === 0) {
      console.log('✅ Ready for cross-browser testing');
      console.log('✅ Ready for manual WCAG validation');
    } else {
      console.log(`❌ Fix ${this.violations.length} critical violations first`);
      console.log('❌ Re-run validation after fixes');
    }
    
    console.log('\n' + '═'.repeat(50));
  }
}

// Execute if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const validator = new AccessibilityValidator();
  
  validator.validateProject()
    .then(results => {
      process.exit(results.isCompliant ? 0 : 1);
    })
    .catch(error => {
      console.error('❌ Validation failed:', error);
      process.exit(1);
    });
}

export default AccessibilityValidator;