import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  // Wait for deployment to propagate
  await new Promise(resolve => setTimeout(resolve, 5000));
  
  // Desktop viewport
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto('https://dev.rebootmedia.net/reboot/', { waitUntil: 'networkidle2' });
  
  // Wait for content to load
  await page.waitForSelector('nav', { timeout: 10000 });
  
  // Take initial viewport screenshot
  await page.screenshot({ 
    path: '/tmp/improved-desktop-initial.png', 
    fullPage: false 
  });
  
  // Scroll to check sticky header fix
  await page.evaluate(() => window.scrollBy(0, 500));
  await page.screenshot({ 
    path: '/tmp/improved-desktop-scrolled.png', 
    fullPage: false 
  });
  
  // Mobile viewport
  await page.setViewport({ width: 375, height: 667 });
  await page.goto('https://dev.rebootmedia.net/reboot/', { waitUntil: 'networkidle2' });
  
  await page.screenshot({ 
    path: '/tmp/improved-mobile.png', 
    fullPage: false 
  });
  
  // Tablet viewport
  await page.setViewport({ width: 768, height: 1024 });
  await page.goto('https://dev.rebootmedia.net/reboot/', { waitUntil: 'networkidle2' });
  
  await page.screenshot({ 
    path: '/tmp/improved-tablet.png', 
    fullPage: false 
  });
  
  console.log('Screenshots taken - improvements applied');
  
  await browser.close();
})();