/**
 * Final Accessibility Cleanup Script
 * Fixes remaining triple-replacement patterns and validates complete resolution
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Target directory for processing
const SRC_DIR = path.join(__dirname, '../src');

// Triple replacement patterns to fix
const CLEANUP_PATTERNS = [
  // Triple replacement patterns
  { pattern: /replace-replace-replace-text-gray-300/g, replacement: 'replace-text-gray-300' },
  { pattern: /replace-replace-replace-text-gray-400/g, replacement: 'replace-text-gray-400' },
  { pattern: /replace-replace-replace-text-gray-500/g, replacement: 'replace-text-gray-500' },
  { pattern: /replace-replace-replace-text-gray-600/g, replacement: 'replace-text-gray-600' },
  
  // Double replacement patterns (cleanup any remaining)
  { pattern: /replace-replace-text-gray-300/g, replacement: 'replace-text-gray-300' },
  { pattern: /replace-replace-text-gray-400/g, replacement: 'replace-text-gray-400' },
  { pattern: /replace-replace-text-gray-500/g, replacement: 'replace-text-gray-500' },
  { pattern: /replace-replace-text-gray-600/g, replacement: 'replace-text-gray-600' },
  { pattern: /replace-replace-text-gray-700/g, replacement: 'replace-text-gray-700' },
  { pattern: /replace-replace-text-gray-800/g, replacement: 'replace-text-gray-800' },
  { pattern: /replace-replace-text-gray-900/g, replacement: 'replace-text-gray-900' }
];

// Get all source files for processing
function getAllSourceFiles(dir, extensions = ['.tsx', '.ts', '.css']) {
  const files = [];
  
  function traverse(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      
      if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
        traverse(fullPath);
      } else if (entry.isFile() && extensions.some(ext => entry.name.endsWith(ext))) {
        files.push(fullPath);
      }
    }
  }
  
  traverse(dir);
  return files;
}

// Process individual file with cleanup patterns
function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    let modifiedContent = content;
    let fileModified = false;
    let replacements = [];
    
    // Apply each cleanup pattern
    CLEANUP_PATTERNS.forEach(({ pattern, replacement }) => {
      const matches = modifiedContent.match(pattern);
      if (matches) {
        modifiedContent = modifiedContent.replace(pattern, replacement);
        fileModified = true;
        replacements.push({
          pattern: pattern.toString(),
          replacement,
          count: matches.length
        });
      }
    });
    
    // Write back modified content
    if (fileModified) {
      fs.writeFileSync(filePath, modifiedContent);
      return {
        file: filePath,
        modified: true,
        replacements
      };
    }
    
    return { file: filePath, modified: false, replacements: [] };
  } catch (error) {
    return {
      file: filePath,
      modified: false,
      error: error.message,
      replacements: []
    };
  }
}

// Main execution function
function executeCleanup() {
  console.log('🔧 Starting final accessibility cleanup...');
  
  const sourceFiles = getAllSourceFiles(SRC_DIR);
  console.log(`📁 Found ${sourceFiles.length} source files to process`);
  
  const results = {
    totalFiles: sourceFiles.length,
    modifiedFiles: 0,
    totalReplacements: 0,
    errors: [],
    details: []
  };
  
  // Process each file
  sourceFiles.forEach(file => {
    const result = processFile(file);
    results.details.push(result);
    
    if (result.error) {
      results.errors.push({ file, error: result.error });
    } else if (result.modified) {
      results.modifiedFiles++;
      const fileReplacements = result.replacements.reduce((sum, r) => sum + r.count, 0);
      results.totalReplacements += fileReplacements;
      
      console.log(`✅ ${path.relative(SRC_DIR, file)}: ${fileReplacements} replacements`);
      result.replacements.forEach(r => {
        console.log(`   ${r.pattern} → ${r.replacement} (${r.count}x)`);
      });
    }
  });
  
  // Summary report
  console.log('\n' + '='.repeat(60));
  console.log('🎯 FINAL CLEANUP SUMMARY');
  console.log('='.repeat(60));
  console.log(`📊 Files processed: ${results.totalFiles}`);
  console.log(`📝 Files modified: ${results.modifiedFiles}`);
  console.log(`🔄 Total replacements: ${results.totalReplacements}`);
  console.log(`❌ Errors encountered: ${results.errors.length}`);
  
  if (results.errors.length > 0) {
    console.log('\n❌ ERRORS:');
    results.errors.forEach(err => {
      console.log(`   ${path.relative(SRC_DIR, err.file)}: ${err.error}`);
    });
  }
  
  if (results.modifiedFiles > 0) {
    console.log('\n✅ Cleanup completed successfully!');
    console.log('📋 Next: Run validation to confirm all violations resolved');
  } else {
    console.log('\n✨ No cleanup needed - all patterns already resolved!');
  }
  
  return results;
}

// Execute if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  executeCleanup();
}

export { executeCleanup };