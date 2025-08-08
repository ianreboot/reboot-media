#!/usr/bin/env node

/**
 * Reboot Project Cleanup Script
 * Removes test files, screenshots, and AI documentation
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Files to remove
const TEST_FILES = [
  'analyze-luminescence.cjs',
  'check-font.js',
  'check-improvements.js',
  'check-text-sizing.js',
  'debug-puppeteer.js',
  'final-check.js',
  'final-pixel-perfect-check.js',
  'fix-all-link-text.py',
  'fix-spacing.js',
  'mobile-fix.js',
  'record-animation.js',
  'test-fluid-cards.cjs',
  'test-fluid-simple.cjs',
  'test-h1-change.cjs',
  'test-heading-structure.cjs',
  'test-subliminal-hierarchy.cjs',
  'update-link-text.py',
  'verify-colors.js',
  'verify-final.js',
  'verify-logo.js'
];

const SCREENSHOT_FILES = [
  'animation-stage-0.png',
  'animation-stage-1.png',
  'animation-stage-2.png',
  'animation-stage-3.png',
  'animation-stage-4.png',
  'color-update-about.png',
  'color-update-hero.png',
  'color-update-services.png',
  'final-hero-figtree.png',
  'fluid-cards-desktop-large.png',
  'fluid-cards-desktop-small.png',
  'fluid-cards-mobile.png',
  'fluid-cards-tablet.png',
  'hero-after-h1-semantic-change.png',
  'hero-test-after-heading-changes.png',
  'homepage-luminescence-analysis.png',
  'responsive-test-desktop-large.png',
  'responsive-test-desktop-small.png',
  'responsive-test-mobile.png',
  'responsive-test-tablet.png',
  'subliminal-hierarchy-hero.png'
];

const AI_DOCS = [
  'ASIAN_SCARCITY_URGENCY_FRAMEWORK.md',
  'CLAUDE.md',
  'CLAUDE_PROJECT_CONTEXT.md',
  'FIX_FRACTIONAL_CMO_SPEC.md',
  'FIX_GROWTH_PLATEAU_SPEC.md',
  'FIX_MARKETING_PSYCHOLOGY_SPEC.md',
  'NAVIGATION_FIX_SUMMARY.md',
  'PRD_FRACTIONAL_CMO.md',
  'PROJECT_ROADMAP.md',
  'SEO_AEO_STRATEGY_SPEC.md',
  'SEO_ENTRY_AUDIT_SPEC.md',
  'SEO_VALIDATION_CHECKLIST.md',
  'SESSION_HANDOFF_DOCUMENTATION.md',
  'WEBSITE_CONVERSION_AUDIT_SPEC.md'
];

const OTHER_FILES = [
  'dev-server.log',
  'dev.pid',
  'vite.svg',
  'reboot-logo-white.svg',
  'reboot-media.avif',
  'scroll-audit-2025-08-07T08-36-01-487Z.json',
  'scroll-audit-2025-08-07T08-43-37-216Z.json'
];

// Step 1: Test build first
function testBuild() {
  console.log('🏗️  Step 1: Testing build...');
  
  try {
    execSync('npm run build:dev', { stdio: 'inherit' });
    console.log('✅ Build successful!');
    return true;
  } catch (e) {
    console.error('❌ Build failed! Aborting cleanup.');
    return false;
  }
}

// Step 2: Delete files
function deleteFiles() {
  console.log('🗑️  Step 2: Deleting files...');
  
  let deletedCount = 0;
  
  // Delete test files
  console.log('\n  Removing test scripts...');
  TEST_FILES.forEach(file => {
    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
      console.log(`    Deleted ${file}`);
      deletedCount++;
    }
  });
  
  // Delete screenshots
  console.log('\n  Removing screenshots...');
  SCREENSHOT_FILES.forEach(file => {
    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
      console.log(`    Deleted ${file}`);
      deletedCount++;
    }
  });
  
  // Delete AI documentation
  console.log('\n  Removing AI documentation...');
  AI_DOCS.forEach(file => {
    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
      console.log(`    Deleted ${file}`);
      deletedCount++;
    }
  });
  
  // Delete other unnecessary files
  console.log('\n  Removing other files...');
  OTHER_FILES.forEach(file => {
    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
      console.log(`    Deleted ${file}`);
      deletedCount++;
    }
  });
  
  console.log(`\n  Total files deleted: ${deletedCount}`);
}

// Step 3: Update .gitignore
function updateGitignore() {
  console.log('\n📝 Step 3: Updating .gitignore...');
  
  const gitignoreAdditions = `
# AI Assistant Files
CLAUDE.md
claude.md
.claude/
.claude*
AGENT-*.md
*_METHODOLOGY.md
*_SPEC.md
*_FRAMEWORK.md
*_AUDIT*.md
*_CHECKLIST.md
SESSION_HANDOFF*.md
PROJECT_ROADMAP.md
PRD_*.md
.ai/
.assistant/
AI_*.md
.cursorrules
.aider*
.github/copilot*

# Test and Debug Files
test-*.js
test-*.cjs
check-*.js
verify-*.js
debug-*.js
fix-*.js
fix-*.py
update-*.py
analyze-*.cjs
record-*.js
mobile-*.js
final-*.js
*-test.js
*-check.js
scroll-audit-*.json

# Screenshots and Images
*.png
*.jpg
*.jpeg
animation-stage-*.png
*-test-*.png
hero-*.png
fluid-cards-*.png
responsive-test-*.png
homepage-*-analysis.png
subliminal-*.png
color-update-*.png
final-*.png

# Temporary Files
dev-server.log
dev.pid
*.log
*.pid

# Unused Assets
vite.svg
reboot-logo-white.svg
reboot-media.avif`;
  
  const gitignorePath = '.gitignore';
  let gitignoreContent = '';
  
  if (fs.existsSync(gitignorePath)) {
    gitignoreContent = fs.readFileSync(gitignorePath, 'utf-8');
  }
  
  // Only add if not already present
  if (!gitignoreContent.includes('# AI Assistant Files')) {
    fs.appendFileSync(gitignorePath, gitignoreAdditions);
    console.log('  Added AI and test file patterns to .gitignore');
  } else {
    console.log('  .gitignore already updated');
  }
}

// Main execution
async function main() {
  console.log('🚀 Starting Reboot Project Cleanup...\n');
  
  // Step 1: Test build first
  const buildSuccess = testBuild();
  
  if (buildSuccess) {
    // Step 2: Delete files
    deleteFiles();
    
    // Step 3: Update gitignore
    updateGitignore();
    
    console.log('\n✅ Cleanup completed successfully!');
    console.log('\n📌 Next steps:');
    console.log('  1. Review changes with: git status');
    console.log('  2. Commit changes: git add -A && git commit -m "Clean up test files and documentation"');
    console.log('  3. Push to deploy: git push origin main');
  } else {
    console.log('\n⚠️  Cleanup aborted due to build failure.');
  }
}

// Run the script
main().catch(console.error);