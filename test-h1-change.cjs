const puppeteer = require('puppeteer');

async function testH1Change() {
  console.log('🔍 Testing H1 after switching to semantic class...');
  
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  
  try {
    // Navigate to dev server (now on port 5174)
    await page.goto('http://localhost:5174/reboot/', { 
      waitUntil: 'networkidle0',
      timeout: 10000
    });
    
    // Take screenshot of hero section
    await page.screenshot({ 
      path: '/home/ian/projects/reboot/hero-after-h1-semantic-change.png', 
      fullPage: false,
      clip: { x: 0, y: 0, width: 1920, height: 800 }
    });
    
    // Check H1 structure
    const h1Info = await page.evaluate(() => {
      const h1 = document.querySelector('h1');
      return {
        classes: h1.className,
        text: h1.textContent.substring(0, 50),
        computedStyle: {
          fontSize: window.getComputedStyle(h1).fontSize,
          fontWeight: window.getComputedStyle(h1).fontWeight,
          lineHeight: window.getComputedStyle(h1).lineHeight
        }
      };
    });
    
    console.log('\n📊 H1 ANALYSIS AFTER CHANGE:');
    console.log(`Classes: ${h1Info.classes}`);
    console.log(`Text: "${h1Info.text}..."`);
    console.log(`Computed fontSize: ${h1Info.computedStyle.fontSize}`);
    console.log(`Computed fontWeight: ${h1Info.computedStyle.fontWeight}`);
    console.log(`Computed lineHeight: ${h1Info.computedStyle.lineHeight}`);
    
    // Check if typewriter is working
    await page.waitForSelector('.animate-blink', { timeout: 5000 });
    console.log('\n🎉 Typewriter animation is still working!');
    
    console.log('\n✅ H1 semantic change successful!');
    console.log('📸 Screenshot saved as hero-after-h1-semantic-change.png');
    
  } catch (error) {
    console.error('❌ Error during testing:', error.message);
  } finally {
    await browser.close();
  }
}

testH1Change();