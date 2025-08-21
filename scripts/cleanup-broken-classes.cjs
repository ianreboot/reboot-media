#!/usr/bin/env node

/**
 * Cleanup Script for Broken Auto-Healer Classes
 * Fixes all replace-* classes left behind by the removed auto-healer plugin
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class BrokenClassCleaner {
  constructor() {
    // Map broken replace-* classes to proper Tailwind classes
    this.classReplacements = {
      'replace-text-gray-900': 'text-gray-900',
      'replace-text-gray-800': 'text-gray-800', 
      'replace-text-gray-700': 'text-gray-700',
      'replace-text-gray-600': 'text-gray-600',
      'replace-text-gray-500': 'text-gray-500',
      'replace-text-gray-400': 'text-gray-400',
      'replace-text-gray-300': 'text-gray-300',
      'replace-text-gray-200': 'text-gray-200',
      'replace-text-gray-100': 'text-gray-100'
    };
    
    this.stats = {
      filesProcessed: 0,
      replacementsMade: 0,
      errorsEncountered: 0
    };
  }

  log(message, type = 'info') {
    const colors = {
      info: '\x1b[36m',    // cyan
      success: '\x1b[32m', // green  
      error: '\x1b[31m',   // red
      warning: '\x1b[33m'  // yellow
    };
    
    console.log(`${colors[type]}${message}\x1b[0m`);
  }

  async cleanFile(filePath) {
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      let replacementCount = 0;
      const originalContent = content;
      
      // Apply all class replacements to this file
      for (const [brokenClass, fixedClass] of Object.entries(this.classReplacements)) {
        const regex = new RegExp(brokenClass, 'g');
        const matches = content.match(regex);
        
        if (matches) {
          content = content.replace(regex, fixedClass);
          replacementCount += matches.length;
          
          this.log(`  📝 ${path.basename(filePath)}: ${matches.length} × ${brokenClass} → ${fixedClass}`, 'info');
        }
      }
      
      // Write updated content back to file if changes were made
      if (replacementCount > 0) {
        fs.writeFileSync(filePath, content, 'utf8');
        this.stats.replacementsMade += replacementCount;
        this.log(`✅ Fixed ${path.basename(filePath)}: ${replacementCount} classes`, 'success');
      }
      
      return replacementCount;
    } catch (error) {
      this.log(`❌ Error cleaning ${filePath}: ${error.message}`, 'error');
      this.stats.errorsEncountered++;
      return 0;
    }
  }

  async cleanAllFiles() {
    this.log('🧹 Starting cleanup of broken auto-healer classes...', 'info');
    
    try {
      // Find all files with replace- classes
      const srcDir = 'src';
      const extensions = ['.tsx', '.ts', '.jsx', '.js'];
      
      const findFilesWithBrokenClasses = (dir) => {
        let files = [];
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        
        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name);
          
          if (entry.isDirectory()) {
            files = files.concat(findFilesWithBrokenClasses(fullPath));
          } else if (extensions.some(ext => entry.name.endsWith(ext))) {
            // Check if file contains replace- classes
            try {
              const content = fs.readFileSync(fullPath, 'utf8');
              if (content.includes('replace-')) {
                files.push(fullPath);
              }
            } catch (error) {
              this.log(`⚠️ Skipping ${fullPath}: ${error.message}`, 'warning');
            }
          }
        }
        
        return files;
      };
      
      const filesToClean = findFilesWithBrokenClasses(srcDir);
      
      this.log(`📁 Found ${filesToClean.length} files with broken classes`, 'info');
      
      // Process each file
      for (const filePath of filesToClean) {
        const replacements = await this.cleanFile(filePath);
        this.stats.filesProcessed++;
      }
      
      return true;
    } catch (error) {
      this.log(`❌ Cleanup failed: ${error.message}`, 'error');
      return false;
    }
  }

  async validateBuild() {
    this.log('🔧 Validating TypeScript compilation...', 'info');
    
    try {
      execSync('npx tsc --noEmit', { stdio: 'pipe' });
      this.log('✅ TypeScript validation passed', 'success');
      return true;
    } catch (error) {
      this.log(`❌ TypeScript validation failed: ${error.message}`, 'error');
      return false;
    }
  }

  async run() {
    const startTime = Date.now();
    
    this.log('🚀 BROKEN CLASS CLEANUP STARTING', 'info');
    this.log(`Target: Remove all replace-* classes from ${this.stats.filesProcessed} files`, 'info');
    
    // Step 1: Clean all files
    if (!(await this.cleanAllFiles())) {
      this.log('🛑 Cleanup failed', 'error');
      process.exit(1);
    }
    
    // Step 2: Validate build
    if (!(await this.validateBuild())) {
      this.log('🛑 Build validation failed after cleanup', 'error');
      process.exit(1);
    }
    
    const duration = Math.round((Date.now() - startTime) / 1000);
    
    this.log('', 'info');
    this.log('🎉 BROKEN CLASS CLEANUP COMPLETE!', 'success');
    this.log(`⚡ Completed in ${duration} seconds`, 'success');
    this.log(`📊 ${this.stats.replacementsMade} broken classes fixed in ${this.stats.filesProcessed} files`, 'success');
    this.log(`✅ All replace-* classes converted to proper Tailwind classes`, 'success');
    
    return true;
  }
}

// Execute cleanup if run directly
if (require.main === module) {
  const cleaner = new BrokenClassCleaner();
  cleaner.run().catch(error => {
    console.error('Cleanup failed:', error);
    process.exit(1);
  });
}

module.exports = BrokenClassCleaner;