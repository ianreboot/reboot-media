#!/usr/bin/env node

/**
 * Find all text-standard violations on colored backgrounds
 * Pattern 8: text-standard (hsl(0, 0%, 25%)) fails contrast on colored backgrounds
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class TextStandardViolationFinder {
  constructor() {
    this.violations = [];
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

  findViolations() {
    console.log('🔍 Searching for text-standard violations on colored backgrounds...\n');

    const srcPath = path.join(__dirname, '../src');
    const files = this.getAllTsxFiles(srcPath);

    for (const file of files) {
      const content = fs.readFileSync(file, 'utf8');
      const relativePath = path.relative(srcPath, file);
      const lines = content.split('\n');

      // Look for text-standard within elements that have colored backgrounds
      lines.forEach((line, lineNum) => {
        if (line.includes('text-standard')) {
          // Check if this line or nearby lines contain colored backgrounds
          const context = this.getContextLines(lines, lineNum, 3);
          const hasColoredBackground = this.hasColoredBackground(context);

          if (hasColoredBackground) {
            this.violations.push({
              file: relativePath,
              line: lineNum + 1,
              content: line.trim(),
              context: context.join('\n'),
              backgroundType: this.getBackgroundType(context)
            });
          }
        }
      });
    }

    return this.violations;
  }

  getContextLines(lines, lineNum, contextSize) {
    const start = Math.max(0, lineNum - contextSize);
    const end = Math.min(lines.length, lineNum + contextSize + 1);
    return lines.slice(start, end);
  }

  hasColoredBackground(context) {
    const contextText = context.join(' ');
    
    // Check for gradient backgrounds
    if (contextText.includes('bg-gradient-to-')) return true;
    
    // Check for colored section backgrounds
    if (contextText.includes('from-red-') || contextText.includes('to-red-')) return true;
    if (contextText.includes('from-orange-') || contextText.includes('to-orange-')) return true;
    if (contextText.includes('from-blue-') || contextText.includes('to-blue-')) return true;
    if (contextText.includes('from-green-') || contextText.includes('to-green-')) return true;
    if (contextText.includes('from-purple-') || contextText.includes('to-purple-')) return true;
    if (contextText.includes('from-slate-') || contextText.includes('to-slate-')) return true;

    return false;
  }

  getBackgroundType(context) {
    const contextText = context.join(' ');
    
    if (contextText.includes('bg-gradient-to-br from-red-')) return 'red-gradient';
    if (contextText.includes('bg-gradient-to-br from-orange-')) return 'orange-gradient';
    if (contextText.includes('bg-gradient-to-br from-slate-')) return 'slate-gradient';
    if (contextText.includes('bg-gradient-to-r from-')) return 'horizontal-gradient';
    
    return 'unknown-colored-background';
  }

  generateReport() {
    console.log('📊 TEXT-STANDARD VIOLATION REPORT');
    console.log('═'.repeat(50));
    console.log(`\n🔍 Total Violations Found: ${this.violations.length}`);

    if (this.violations.length === 0) {
      console.log('✅ No text-standard violations on colored backgrounds found!');
      return;
    }

    console.log('\n❌ VIOLATIONS REQUIRING FIXES:');
    console.log('-'.repeat(40));

    this.violations.forEach((violation, index) => {
      console.log(`\n${index + 1}. ${violation.file}:${violation.line}`);
      console.log(`   Content: ${violation.content}`);
      console.log(`   Background: ${violation.backgroundType}`);
      console.log(`   Context:`);
      violation.context.split('\n').forEach((line, i) => {
        const prefix = i === 3 ? '>>> ' : '    ';
        console.log(`   ${prefix}${line.trim()}`);
      });
    });

    console.log('\n🔧 RECOMMENDED FIX:');
    console.log('Replace text-standard → text-standard-accessible');
    console.log('Create text-standard-accessible class with proper contrast and text-shadow');
    
    console.log('\n' + '═'.repeat(50));
  }
}

// Execute if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const finder = new TextStandardViolationFinder();
  
  const violations = finder.findViolations();
  finder.generateReport();
  
  process.exit(violations.length > 0 ? 1 : 0);
}

export default TextStandardViolationFinder;