#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Find all .tsx files in src directory
function findTsxFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      files.push(...findTsxFiles(fullPath));
    } else if (item.endsWith('.tsx')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Fix syntax issues in a file
function fixFileSyntax(filePath) {
  console.log(`Processing: ${filePath}`);
  
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Fix incomplete href conversions (missing closing backtick and closing brace)
  const incompleteHrefPattern = /href=\{\`\${import\.meta\.env\.MODE === 'development' \? '\/reboot' : ''}\/([\w-]+)"\s/g;
  if (content.match(incompleteHrefPattern)) {
    content = content.replace(incompleteHrefPattern, 'href={`${import.meta.env.MODE === \'development\' ? \'/reboot\' : \'\'}/\$1`} ');
    modified = true;
    console.log(`  Fixed incomplete href pattern in ${filePath}`);
  }
  
  // Fix incomplete href conversions with paths (missing closing backtick and closing brace)  
  const incompleteHrefPathPattern = /href=\{\`\${import\.meta\.env\.MODE === 'development' \? '\/reboot' : ''}\/([^"]+)"\s/g;
  if (content.match(incompleteHrefPathPattern)) {
    content = content.replace(incompleteHrefPathPattern, 'href={`${import.meta.env.MODE === \'development\' ? \'/reboot\' : \'\'}/\$1`} ');
    modified = true;
    console.log(`  Fixed incomplete href path pattern in ${filePath}`);
  }
  
  // Replace </Link> with </a>
  const linkClosingPattern = /<\/Link>/g;
  if (content.match(linkClosingPattern)) {
    content = content.replace(linkClosingPattern, '</a>');
    modified = true;
    console.log(`  Fixed Link closing tags in ${filePath}`);
  }
  
  // Remove unused Link imports if no more Link components exist
  if (!content.includes('<Link') && !content.includes('Link,')) {
    const linkImportPattern = /, Link/g;
    if (content.match(linkImportPattern)) {
      content = content.replace(linkImportPattern, '');
      modified = true;
      console.log(`  Removed unused Link import in ${filePath}`);
    }
    
    const singleLinkImportPattern = /import \{ Link \} from 'react-router-dom';\n/g;
    if (content.match(singleLinkImportPattern)) {
      content = content.replace(singleLinkImportPattern, '');
      modified = true;
      console.log(`  Removed single Link import in ${filePath}`);
    }
  }
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`  ✅ Updated ${filePath}`);
  } else {
    console.log(`  ⚪ No changes needed for ${filePath}`);
  }
}

// Main execution
const srcDir = './src';
const tsxFiles = findTsxFiles(srcDir);

console.log(`Found ${tsxFiles.length} .tsx files to process`);

tsxFiles.forEach(fixFileSyntax);

console.log('\n✅ Link syntax cleanup completed!');