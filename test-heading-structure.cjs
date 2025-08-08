const puppeteer = require('puppeteer');

async function testHeadingStructure() {
  console.log('🔍 Testing heading structure and hero section...');
  
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  
  try {
    // Navigate to dev server
    await page.goto('http://localhost:5173/', { 
      waitUntil: 'networkidle0',
      timeout: 10000
    });
    
    // Take screenshot of hero section
    await page.screenshot({ 
      path: '/home/ian/projects/reboot/hero-test-after-heading-changes.png', 
      fullPage: false,
      clip: { x: 0, y: 0, width: 1920, height: 800 }
    });
    
    // Check heading structure
    const headings = await page.evaluate(() => {
      const h1s = Array.from(document.querySelectorAll('h1')).map(h => ({
        tag: 'h1',
        text: h.textContent.substring(0, 50),
        classes: h.className
      }));
      
      const h2s = Array.from(document.querySelectorAll('h2')).map(h => ({
        tag: 'h2', 
        text: h.textContent.substring(0, 50),
        classes: h.className
      }));
      
      const h3s = Array.from(document.querySelectorAll('h3')).map(h => ({
        tag: 'h3',
        text: h.textContent.substring(0, 50), 
        classes: h.className
      }));
      
      return { h1s, h2s, h3s };
    });
    
    console.log('\n📊 HEADING STRUCTURE ANALYSIS:');
    console.log('\n🎯 H1 Tags (should be 1):');
    headings.h1s.forEach((h, i) => {
      console.log(`  ${i+1}. "${h.text}" - Classes: ${h.classes}`);
    });
    
    console.log('\n📝 H2 Tags (main sections):');
    headings.h2s.forEach((h, i) => {
      const hasNewClass = h.classes.includes('heading-xl');
      const status = hasNewClass ? '✅ NEW' : '❌ OLD';
      console.log(`  ${i+1}. "${h.text}" - ${status}`);
    });
    
    console.log('\n📄 H3 Tags (subsections):');
    headings.h3s.forEach((h, i) => {
      const hasNewClass = h.classes.includes('heading-');
      const status = hasNewClass ? '✅ NEW' : '⏹️  OLD';
      console.log(`  ${i+1}. "${h.text}" - ${status}`);
    });
    
    // Check if hero is working (typewriter effect)
    await page.waitForSelector('.animate-blink', { timeout: 5000 });
    console.log('\n🎉 Hero typewriter animation is working!');
    
    // Test responsive breakpoints
    const breakpoints = [
      { width: 375, height: 667, name: 'Mobile' },
      { width: 768, height: 1024, name: 'Tablet' },
      { width: 1024, height: 768, name: 'Desktop Small' },
      { width: 1920, height: 1080, name: 'Desktop Large' }
    ];
    
    for (const bp of breakpoints) {
      await page.setViewport({ width: bp.width, height: bp.height });
      await page.screenshot({ 
        path: `/home/ian/projects/reboot/responsive-test-${bp.name.toLowerCase().replace(' ', '-')}.png`,
        fullPage: false,
        clip: { x: 0, y: 0, width: bp.width, height: Math.min(bp.height, 800) }
      });
      console.log(`📱 ${bp.name} (${bp.width}x${bp.height}) - Screenshot saved`);
    }
    
    console.log('\n✅ All tests completed successfully!');
    console.log('📸 Screenshots saved to project directory');
    
  } catch (error) {
    console.error('❌ Error during testing:', error.message);
  } finally {
    await browser.close();
  }
}

testHeadingStructure();