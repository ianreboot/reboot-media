import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  // Desktop viewport
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto('https://dev.rebootmedia.net/reboot/', { waitUntil: 'networkidle2' });
  
  // Wait for content to load
  await page.waitForSelector('nav', { timeout: 10000 });
  
  // Take full page screenshot
  await page.screenshot({ 
    path: '/tmp/desktop-full.png', 
    fullPage: true 
  });
  
  // Take viewport screenshot to see header issues
  await page.screenshot({ 
    path: '/tmp/desktop-viewport.png', 
    fullPage: false 
  });
  
  // Scroll down to check sticky header
  await page.evaluate(() => window.scrollBy(0, 500));
  await page.screenshot({ 
    path: '/tmp/desktop-scrolled.png', 
    fullPage: false 
  });
  
  // Mobile viewport
  await page.setViewport({ width: 375, height: 667 });
  await page.goto('https://dev.rebootmedia.net/reboot/', { waitUntil: 'networkidle2' });
  
  await page.screenshot({ 
    path: '/tmp/mobile-full.png', 
    fullPage: true 
  });
  
  // Check specific sections for spacing issues
  const sections = await page.$$eval('section', sections => 
    sections.map(section => ({
      height: section.offsetHeight,
      paddingTop: window.getComputedStyle(section).paddingTop,
      paddingBottom: window.getComputedStyle(section).paddingBottom,
      marginTop: window.getComputedStyle(section).marginTop,
      marginBottom: window.getComputedStyle(section).marginBottom,
      textContent: section.textContent.substring(0, 50) + '...'
    }))
  );
  
  console.log('Section Analysis:', JSON.stringify(sections, null, 2));
  
  await browser.close();
})();