import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    
    console.log('Navigating to dev site...');
    await page.goto('https://dev.rebootmedia.net/reboot/', { 
      waitUntil: 'networkidle2',
      timeout: 30000 
    });
    
    // Wait for content and fonts to load
    await page.waitForSelector('h1', { timeout: 10000 });
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Take screenshot of hero with new font
    await page.screenshot({ 
      path: '/home/ian/projects/reboot/final-hero-figtree.png',
      fullPage: false
    });
    
    console.log('Screenshot saved!');
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
})();