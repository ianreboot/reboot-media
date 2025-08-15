#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

// Motion and animation patterns that should respect prefers-reduced-motion
const motionPatterns = [
  // Animations and transitions
  { pattern: /transition-all/g, shouldWrap: true },
  { pattern: /animate-pulse/g, shouldWrap: true },
  { pattern: /animate-spin/g, shouldWrap: true },
  { pattern: /animate-bounce/g, shouldWrap: true },
  { pattern: /transform hover:scale-\d+/g, shouldWrap: true },
  { pattern: /focus-visible:scale-\d+/g, shouldWrap: true },
  
  // CSS custom animations
  { pattern: /duration-\d+/g, shouldWrap: false },
  { pattern: /ease-in-out/g, shouldWrap: false },
  { pattern: /ease-in/g, shouldWrap: false },
  { pattern: /ease-out/g, shouldWrap: false }
];

// Motion accessibility utility classes to add
const motionUtilities = `
/* Motion accessibility - Respect user's motion preferences */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  
  /* Keep necessary animations for accessibility */
  .motion-safe\\:animate-pulse {
    animation: none;
  }
  
  .motion-safe\\:animate-spin {
    animation: none;
  }
  
  .motion-safe\\:animate-bounce {
    animation: none;
  }
  
  /* Disable transforms that could cause motion sickness */
  .motion-reduce\\:transform-none {
    transform: none !important;
  }
}

/* Utility classes for motion-aware design */
@media (prefers-reduced-motion: no-preference) {
  .motion-safe\\:animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  
  .motion-safe\\:animate-spin {
    animation: spin 1s linear infinite;
  }
  
  .motion-safe\\:animate-bounce {
    animation: bounce 1s infinite;
  }
  
  .motion-safe\\:transition-all {
    transition-property: all;
  }
  
  .motion-safe\\:duration-300 {
    transition-duration: 300ms;
  }
  
  .motion-safe\\:duration-500 {
    transition-duration: 500ms;
  }
  
  .motion-safe\\:hover\\:scale-105:hover {
    transform: scale(1.05);
  }
  
  .motion-safe\\:focus-visible\\:scale-105:focus-visible {
    transform: scale(1.05);
  }
}
`;

function addMotionAccessibility(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  let replacements = 0;

  // Replace animations with motion-safe variants
  content = content.replace(/animate-pulse/g, (match) => {
    replacements++;
    return 'motion-safe:animate-pulse motion-reduce:animate-none';
  });

  content = content.replace(/animate-spin/g, (match) => {
    replacements++;
    return 'motion-safe:animate-spin motion-reduce:animate-none';
  });

  content = content.replace(/animate-bounce/g, (match) => {
    replacements++;
    return 'motion-safe:animate-bounce motion-reduce:animate-none';
  });

  // Replace scale transforms with motion-safe variants
  content = content.replace(/transform hover:scale-105/g, (match) => {
    replacements++;
    return 'motion-safe:transform motion-safe:hover:scale-105 motion-reduce:transform-none';
  });

  content = content.replace(/focus-visible:scale-105/g, (match) => {
    replacements++;
    return 'motion-safe:focus-visible:scale-105 motion-reduce:transform-none';
  });

  // Replace transition-all with motion-safe variants
  content = content.replace(/transition-all/g, (match) => {
    replacements++;
    return 'motion-safe:transition-all motion-reduce:transition-none';
  });

  // Replace duration classes with motion-safe variants
  content = content.replace(/duration-300/g, (match) => {
    replacements++;
    return 'motion-safe:duration-300 motion-reduce:duration-0';
  });

  content = content.replace(/duration-500/g, (match) => {
    replacements++;
    return 'motion-safe:duration-500 motion-reduce:duration-0';
  });

  if (replacements > 0) {
    fs.writeFileSync(filePath, content);
    console.log(`📝 Enhanced ${replacements} motion patterns in ${path.basename(filePath)}`);
    modified = true;
  }

  return replacements;
}

// Add motion utilities to CSS file
function addMotionUtilitiesToCSS() {
  const cssPath = '/home/ian/projects/reboot/src/styles/accessibility-utilities.css';
  if (fs.existsSync(cssPath)) {
    let cssContent = fs.readFileSync(cssPath, 'utf8');
    
    if (!cssContent.includes('prefers-reduced-motion')) {
      cssContent += motionUtilities;
      fs.writeFileSync(cssPath, cssContent);
      console.log('✅ Added motion accessibility utilities to CSS');
      return true;
    } else {
      console.log('ℹ️  Motion utilities already exist in CSS');
      return false;
    }
  }
  return false;
}

// Component files to process
const componentFiles = [
  '/home/ian/projects/reboot/src/components/GlobalHeader.tsx',
  '/home/ian/projects/reboot/src/components/GlobalFooter.tsx',
  '/home/ian/projects/reboot/src/components/LeadForm.tsx',
  '/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx',
  '/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx',
  '/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx',
  '/home/ian/projects/reboot/src/pages/MarketingPsychology.tsx',
  '/home/ian/projects/reboot/src/pages/Contact.tsx',
  '/home/ian/projects/reboot/src/pages/Home.tsx'
];

console.log('🎭 MOTION ACCESSIBILITY ENHANCEMENT');
console.log('==================================\n');

// Add motion utilities to CSS first
const cssAdded = addMotionUtilitiesToCSS();

let totalReplacements = 0;
let filesModified = 0;

componentFiles.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    console.log(`🔍 Checking ${path.basename(filePath)}...`);
    const replacements = addMotionAccessibility(filePath);
    
    if (replacements > 0) {
      filesModified++;
      totalReplacements += replacements;
    } else {
      console.log(`  ✅ No motion patterns found or already accessible`);
    }
    console.log('');
  } else {
    console.log(`⚠️  File not found: ${path.basename(filePath)}`);
  }
});

console.log(`📊 SUMMARY:`);
console.log(`  • ${totalReplacements} motion patterns made accessible`);
console.log(`  • ${filesModified} files modified`);
console.log(`  • CSS utilities ${cssAdded ? 'added' : 'already present'}`);

if (totalReplacements > 0 || cssAdded) {
  console.log('\n✅ Motion accessibility successfully enhanced!');
  console.log('WCAG improvements:');
  console.log('• 2.3.3 Level AAA: Motion triggered by interaction');
  console.log('• Vestibular disorder support');
  console.log('• Reduced cognitive load for users sensitive to motion');
  console.log('• prefers-reduced-motion media query support');
} else {
  console.log('\n🎉 All motion patterns already accessible!');
}