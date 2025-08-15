#!/usr/bin/env node

/**
 * Accessibility Bulk Fix Script
 * Systematic replacement of problematic color classes with WCAG-compliant alternatives
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class AccessibilityBulkFixer {
  constructor() {
    this.replacementMap = new Map([
      // Primary problematic patterns - exact replacements
      ['text-gray-300', 'replace-text-gray-300'],
      ['text-gray-400', 'replace-text-gray-400'],
      ['text-gray-500', 'replace-text-gray-500'],
      ['text-gray-600', 'replace-text-gray-600'],
      
      // Dark mode patterns - remove dark: prefix since new classes work in all modes
      ['dark:text-gray-300', 'replace-text-gray-300'],
      ['dark:text-gray-400', 'replace-text-gray-400'],
      ['dark:text-gray-500', 'replace-text-gray-500'],
      ['dark:text-gray-600', 'replace-text-gray-600'],
      
      // Hierarchy upgrades - preserve existing hierarchy where possible
      ['text-critical dark:text-white', 'text-gradient-critical'],
      ['text-important dark:text-gray-300', 'text-gradient-enhanced'],
      ['text-standard dark:text-gray-300', 'text-gradient-safe'],
      ['text-optional dark:text-gray-300', 'text-gradient-safe'],
      
      // Common combined patterns
      ['text-gray-300 dark:text-gray-300', 'replace-text-gray-300'],
      ['text-gray-400 dark:text-gray-400', 'replace-text-gray-400'],
      
      // Brand color upgrades for accessibility
      ['text-orange-600', 'text-orange-accessible'],
      ['text-blue-600', 'text-blue-accessible']
    ]);
    
    this.filesProcessed = 0;
    this.replacementsMade = 0;
  }

  async fixAllFiles() {
    console.log('🔧 Starting Accessibility Bulk Fix...\n');

    const srcPath = path.join(__dirname, '../src');
    const tsxFiles = this.getAllTsxFiles(srcPath);

    console.log(`📁 Found ${tsxFiles.length} TypeScript React files to process\n`);

    for (const file of tsxFiles) {
      const replacementsInFile = await this.processFile(file);
      if (replacementsInFile > 0) {
        this.filesProcessed++;
        this.replacementsMade += replacementsInFile;
        console.log(`✅ ${path.relative(srcPath, file)}: ${replacementsInFile} fixes`);
      }
    }

    console.log(`\n📊 BULK FIX COMPLETE`);
    console.log(`Files modified: ${this.filesProcessed}`);
    console.log(`Total replacements: ${this.replacementsMade}`);
    
    return {
      filesProcessed: this.filesProcessed,
      replacementsMade: this.replacementsMade
    };
  }

  async processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    let replacementsInFile = 0;

    // Apply each replacement pattern
    for (const [oldPattern, newPattern] of this.replacementMap) {
      const regex = new RegExp(oldPattern.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g');
      const matches = content.match(regex);
      
      if (matches) {
        content = content.replace(regex, newPattern);
        replacementsInFile += matches.length;
      }
    }

    // Special case: Complex className patterns that need manual handling
    // Handle patterns like 'className="text-xl text-gray-300 mb-8"'
    const complexPatterns = [
      {
        // Match any className that contains text-gray-300 but hasn't been replaced yet
        pattern: /className="([^"]*?)text-gray-300([^"]*?)"/g,
        replacement: (match, before, after) => {
          return `className="${before}replace-text-gray-300${after}"`;
        }
      },
      {
        // Same for text-gray-400
        pattern: /className="([^"]*?)text-gray-400([^"]*?)"/g,
        replacement: (match, before, after) => {
          return `className="${before}replace-text-gray-400${after}"`;
        }
      },
      {
        // Handle dark:text-gray-300 that might remain
        pattern: /className="([^"]*?)dark:text-gray-300([^"]*?)"/g,
        replacement: (match, before, after) => {
          return `className="${before}replace-text-gray-300${after}"`;
        }
      }
    ];

    complexPatterns.forEach(({ pattern, replacement }) => {
      const matches = [...content.matchAll(pattern)];
      if (matches.length > 0) {
        content = content.replace(pattern, (match, ...groups) => {
          return replacement(match, ...groups);
        });
        replacementsInFile += matches.length;
      }
    });

    // Only write if changes were made
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
    }

    return content !== originalContent ? replacementsInFile : 0;
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
        // Skip test files for now - focus on production code
        if (!item.includes('.test.') && !item.includes('.spec.')) {
          files.push(fullPath);
        }
      }
    }

    return files;
  }
}

// Execute if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const fixer = new AccessibilityBulkFixer();
  
  fixer.fixAllFiles()
    .then(results => {
      console.log('\n✅ Bulk accessibility fix complete!');
      console.log('🔬 Run "npm run accessibility:validate" to verify fixes');
      process.exit(0);
    })
    .catch(error => {
      console.error('❌ Bulk fix failed:', error);
      process.exit(1);
    });
}

export default AccessibilityBulkFixer;