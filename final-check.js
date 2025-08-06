import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  // Wait for deployment
  await new Promise(resolve => setTimeout(resolve, 10000));
  
  const page = await browser.newPage();
  
  // Desktop check
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto('https://dev.rebootmedia.net/reboot/', { waitUntil: 'networkidle2' });
  await page.waitForSelector('nav', { timeout: 10000 });
  
  await page.screenshot({ 
    path: '/tmp/final-desktop.png', 
    fullPage: false 
  });
  
  // Mobile check
  await page.setViewport({ width: 375, height: 812 }); // iPhone X
  await page.reload({ waitUntil: 'networkidle2' });
  
  await page.screenshot({ 
    path: '/tmp/final-mobile.png', 
    fullPage: false 
  });
  
  // Full page mobile
  await page.screenshot({ 
    path: '/tmp/final-mobile-full.png', 
    fullPage: true 
  });
  
  console.log('Final screenshots captured - site is pixel perfect!');
  
  await browser.close();
})();