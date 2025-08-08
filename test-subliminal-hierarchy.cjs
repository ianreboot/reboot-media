const puppeteer = require('puppeteer');

async function testSubliminalHierarchy() {
  console.log('🔍 Testing subliminal hierarchy implementation...');
  
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  
  try {
    // Navigate to dev server 
    await page.goto('http://localhost:5174/reboot/', { 
      waitUntil: 'networkidle0',
      timeout: 10000
    });
    
    // Take hero section screenshot
    await page.screenshot({ 
      path: '/home/ian/projects/reboot/subliminal-hierarchy-hero.png', 
      fullPage: false,
      clip: { x: 0, y: 0, width: 1920, height: 800 }
    });
    
    // Analyze color values of different elements
    const colorAnalysis = await page.evaluate(() => {
      function getComputedColor(selector) {
        const element = document.querySelector(selector);
        if (!element) return 'Not found';
        const style = window.getComputedStyle(element);
        return {
          color: style.color,
          backgroundColor: style.backgroundColor,
          element: element.textContent?.substring(0, 30) + '...'
        };
      }
      
      return {
        heroH1: getComputedColor('h1'),
        subheadline: getComputedColor('p'),
        primaryCTA: getComputedColor('button'),
        cardTitle: getComputedColor('[class*="text-2xl"]'),
        cardDescription: getComputedColor('[class*="text-sm"]')
      };
    });
    
    console.log('\n📊 SUBLIMINAL HIERARCHY COLOR ANALYSIS:');
    
    console.log('\n🎯 Hero H1 (Critical):');
    console.log(`  Color: ${colorAnalysis.heroH1.color}`);
    console.log(`  Text: "${colorAnalysis.heroH1.element}"`);
    
    console.log('\n📝 Subheadline (Standard):');
    console.log(`  Color: ${colorAnalysis.subheadline.color}`);
    console.log(`  Text: "${colorAnalysis.subheadline.element}"`);
    
    console.log('\n🔥 Primary CTA:');
    console.log(`  Background: ${colorAnalysis.primaryCTA.backgroundColor}`);
    console.log(`  Color: ${colorAnalysis.primaryCTA.color}`);
    
    console.log('\n🎴 Card Elements:');
    console.log(`  Title Color: ${colorAnalysis.cardTitle.color}`);
    console.log(`  Description Color: ${colorAnalysis.cardDescription.color}`);
    
    console.log('\n✅ Subliminal hierarchy analysis complete!');
    console.log('📸 Hero screenshot saved showing color differences');
    
  } catch (error) {
    console.error('❌ Error during analysis:', error.message);
  } finally {
    await browser.close();
  }
}

testSubliminalHierarchy();