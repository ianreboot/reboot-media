import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

async function comprehensiveAccessibilityCleanup() {
  console.log('🔧 Starting Comprehensive Accessibility Cleanup...');
  
  // Define all patterns to clean up - comprehensive coverage
  const cleanupPatterns = [
    // Direct problematic classes still present
    { pattern: /\btext-gray-([0-9]+)\b/g, replacement: 'replace-text-gray-$1' },
    { pattern: /\btext-slate-([7-9]00)\b/g, replacement: 'replace-text-slate-$1' },
    { pattern: /\btext-zinc-([7-9]00)\b/g, replacement: 'replace-text-zinc-$1' },
    { pattern: /\btext-stone-([7-9]00)\b/g, replacement: 'replace-text-stone-$1' },
    { pattern: /\btext-neutral-([7-9]00)\b/g, replacement: 'replace-text-neutral-$1' },
    
    // Dark mode variants still problematic
    { pattern: /\bdark:text-gray-([0-9]+)\b/g, replacement: 'dark:replace-text-gray-$1' },
    { pattern: /\bdark:text-slate-([7-9]00)\b/g, replacement: 'dark:replace-text-slate-$1' },
    { pattern: /\bdark:text-zinc-([7-9]00)\b/g, replacement: 'dark:replace-text-zinc-$1' },
    { pattern: /\bdark:text-stone-([7-9]00)\b/g, replacement: 'dark:replace-text-stone-$1' },
    { pattern: /\bdark:text-neutral-([7-9]00)\b/g, replacement: 'dark:replace-text-neutral-$1' },
    
    // Double/triple replacement cleanup
    { pattern: /\breplace-replace-text-gray-([0-9]+)\b/g, replacement: 'replace-text-gray-$1' },
    { pattern: /\breplace-replace-replace-text-gray-([0-9]+)\b/g, replacement: 'replace-text-gray-$1' },
    { pattern: /\bdark:replace-replace-text-gray-([0-9]+)\b/g, replacement: 'dark:replace-text-gray-$1' },
    
    // State-based variants
    { pattern: /\bhover:text-gray-([0-9]+)\b/g, replacement: 'hover:replace-text-gray-$1' },
    { pattern: /\bfocus:text-gray-([0-9]+)\b/g, replacement: 'focus:replace-text-gray-$1' },
    { pattern: /\bdisabled:text-gray-([0-9]+)\b/g, replacement: 'disabled:replace-text-gray-$1' },
    { pattern: /\bactive:text-gray-([0-9]+)\b/g, replacement: 'active:replace-text-gray-$1' },
    
    // Clean up patterns where original class appears after replacement class
    { pattern: /\breplace-text-gray-([0-9]+)([^"]*?)\btext-gray-\1\b/g, replacement: 'replace-text-gray-$1$2' },
    { pattern: /\bdark:replace-text-gray-([0-9]+)([^"]*?)\bdark:text-gray-\1\b/g, replacement: 'dark:replace-text-gray-$1$2' },
    
    // Clean up duplicate classes in same className
    { pattern: /(\breplace-text-gray-[0-9]+\b)(\s+[^"]*?\s+)\1/g, replacement: '$1$2' },
    
    // Very specific patterns seen in validation output
    { pattern: /\btext-important dark:replace-text-gray-([0-9]+)\b/g, replacement: 'text-important dark:replace-text-gray-$1' },
    { pattern: /\btext-standard dark:replace-text-gray-([0-9]+)\b/g, replacement: 'text-standard dark:replace-text-gray-$1' },
    { pattern: /\btext-optional dark:replace-text-gray-([0-9]+)\b/g, replacement: 'text-optional dark:replace-text-gray-$1' },
  ];
  
  let totalReplacements = 0;
  let filesProcessed = 0;
  
  try {
    // Find all TSX files
    const files = await glob('src/**/*.tsx', {
      cwd: process.cwd(),
      absolute: true
    });
    
    console.log(`📁 Found ${files.length} TSX files to process`);
    
    for (const filePath of files) {
      let content = fs.readFileSync(filePath, 'utf8');
      let fileChanged = false;
      let fileReplacements = 0;
      
      // Apply each cleanup pattern
      for (const { pattern, replacement } of cleanupPatterns) {
        const matches = content.match(pattern);
        if (matches) {
          content = content.replace(pattern, replacement);
          fileReplacements += matches.length;
          fileChanged = true;
        }
      }
      
      // Write back if changed
      if (fileChanged) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ ${path.relative(process.cwd(), filePath)}: ${fileReplacements} replacements`);
        filesProcessed++;
        totalReplacements += fileReplacements;
      }
    }
    
    console.log(`\n📊 COMPREHENSIVE CLEANUP COMPLETE`);
    console.log(`📁 Files processed: ${filesProcessed}`);
    console.log(`🔧 Total replacements: ${totalReplacements}`);
    
    if (totalReplacements === 0) {
      console.log('ℹ️  No problematic patterns found - all clean!');
    } else {
      console.log(`\n⚡ Run validation to verify fixes: npm run accessibility:validate`);
    }
    
  } catch (error) {
    console.error('❌ Error during cleanup:', error);
    process.exit(1);
  }
}

// Execute cleanup
comprehensiveAccessibilityCleanup();