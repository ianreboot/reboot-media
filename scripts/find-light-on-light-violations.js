#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

// Light background patterns that would cause contrast issues with white text
const lightBackgroundPatterns = [
  // Light solid colors
  'bg-white', 'bg-gray-50', 'bg-gray-100', 'bg-slate-50', 'bg-slate-100',
  'bg-red-50', 'bg-orange-50', 'bg-yellow-50', 'bg-green-50', 'bg-blue-50', 'bg-purple-50', 'bg-pink-50',
  'bg-red-100', 'bg-orange-100', 'bg-yellow-100', 'bg-green-100', 'bg-blue-100', 'bg-purple-100', 'bg-pink-100',
  
  // Light gradients  
  'from-red-50', 'to-red-50', 'via-red-50',
  'from-orange-50', 'to-orange-50', 'via-orange-50',
  'from-yellow-50', 'to-yellow-50', 'via-yellow-50',
  'from-green-50', 'to-green-50', 'via-green-50',
  'from-blue-50', 'to-blue-50', 'via-blue-50',
  'from-purple-50', 'to-purple-50', 'via-purple-50',
  'from-pink-50', 'to-pink-50', 'via-pink-50',
  'from-gray-50', 'to-gray-50', 'via-gray-50',
  'from-slate-50', 'to-slate-50', 'via-slate-50',
  
  'from-red-100', 'to-red-100', 'via-red-100',
  'from-orange-100', 'to-orange-100', 'via-orange-100',
  'from-yellow-100', 'to-yellow-100', 'via-yellow-100',
  'from-green-100', 'to-green-100', 'via-green-100',
  'from-blue-100', 'to-blue-100', 'via-blue-100',
  'from-purple-100', 'to-purple-100', 'via-purple-100',
  'from-pink-100', 'to-pink-100', 'via-pink-100',
  'from-gray-100', 'to-gray-100', 'via-gray-100',
  'from-slate-100', 'to-slate-100', 'via-slate-100',
  
  // Light semi-transparent overlays
  'bg-white/50', 'bg-white/60', 'bg-white/70', 'bg-white/80', 'bg-white/90',
  'bg-gray-50/50', 'bg-gray-50/60', 'bg-gray-50/70', 'bg-gray-50/80', 'bg-gray-50/90',
];

// White text classes that would be invisible on light backgrounds
const whiteTextPatterns = [
  'text-standard-accessible', // rgba(255, 255, 255, 0.82)
  'text-important-accessible', // rgba(255, 255, 255, 0.90) 
  'luminescence-', // All luminescence classes are white
];

function analyzeFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const violations = [];
  
  // Find containers with light backgrounds
  const lightContainers = [];
  
  lines.forEach((line, lineIndex) => {
    // Check for light background patterns
    const hasLightBg = lightBackgroundPatterns.some(pattern => 
      line.includes(pattern) && line.includes('className')
    );
    
    if (hasLightBg) {
      // Find the element and its scope
      const match = line.match(/<(\w+)[^>]*className="[^"]*(?:${lightBackgroundPatterns.join('|')})[^"]*"/);
      if (match) {
        lightContainers.push({
          lineIndex: lineIndex + 1,
          line: line.trim(),
          elementType: match[1],
          patterns: lightBackgroundPatterns.filter(p => line.includes(p))
        });
      }
    }
  });
  
  // Look for white text within a reasonable scope of light containers
  lightContainers.forEach(container => {
    const scopeStart = Math.max(0, container.lineIndex - 1);
    const scopeEnd = Math.min(lines.length, container.lineIndex + 50); // Check next 50 lines
    
    for (let i = scopeStart; i < scopeEnd; i++) {
      const line = lines[i];
      const hasWhiteText = whiteTextPatterns.some(pattern => 
        line.includes(pattern) && line.includes('className')
      );
      
      if (hasWhiteText) {
        violations.push({
          file: filePath,
          containerLine: container.lineIndex,
          containerCode: container.line,
          violationLine: i + 1,
          violationCode: line.trim(),
          lightPatterns: container.patterns,
          whitePatterns: whiteTextPatterns.filter(p => line.includes(p)),
          severity: 'HIGH' // White text on light background is always high severity
        });
      }
    }
  });
  
  return violations;
}

// Files to check
const filesToCheck = [
  '/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx',
  '/home/ian/projects/reboot/src/pages/MarketingPsychology.tsx',
  '/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx',
  '/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx',
  '/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx',
  '/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx',
  '/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx',
  '/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx',
  '/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx',
  '/home/ian/projects/reboot/src/pages/CostROIAnalysis.tsx',
  '/home/ian/projects/reboot/src/pages/TransitionStrategies.tsx',
  '/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx',
  '/home/ian/projects/reboot/src/pages/FractionalCMOVsFullTime.tsx',
  '/home/ian/projects/reboot/src/pages/FractionalCMOVsInHouse.tsx',
  '/home/ian/projects/reboot/src/pages/FractionalCMOVsConsultant.tsx',
  '/home/ian/projects/reboot/src/pages/FractionalCMOVsAgency.tsx',
  '/home/ian/projects/reboot/src/pages/FractionalCMOGuide.tsx',
  '/home/ian/projects/reboot/src/pages/Contact.tsx',
  '/home/ian/projects/reboot/src/pages/About.tsx'
];

console.log('🔍 SITE-WIDE LIGHT-ON-LIGHT ACCESSIBILITY VIOLATION DETECTION');
console.log('==============================================================\n');

let totalViolations = 0;
const violationsByFile = {};

filesToCheck.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    const violations = analyzeFile(filePath);
    if (violations.length > 0) {
      violationsByFile[filePath] = violations;
      totalViolations += violations.length;
      
      console.log(`❌ ${path.basename(filePath)}: ${violations.length} violation(s)`);
      violations.forEach(v => {
        console.log(`   Line ${v.violationLine}: ${v.whitePatterns.join(', ')} on light background`);
        console.log(`   Container (Line ${v.containerLine}): ${v.lightPatterns.join(', ')}`);
        console.log(`   Code: ${v.violationCode.substring(0, 80)}...`);
        console.log('');
      });
    } else {
      console.log(`✅ ${path.basename(filePath)}: No violations`);
    }
  }
});

console.log(`\n📊 SUMMARY: ${totalViolations} total light-on-light violations found across ${Object.keys(violationsByFile).length} files`);

if (totalViolations > 0) {
  console.log('\n🔧 RECOMMENDED FIXES:');
  console.log('1. Replace text-standard-accessible with text-black-standard on light backgrounds');
  console.log('2. Replace text-important-accessible with text-black-important on light backgrounds');
  console.log('3. For gradient backgrounds, test contrast manually and adjust accordingly');
  process.exit(1);
} else {
  console.log('\n✅ All files pass light-on-light contrast checks!');
  process.exit(0);
}