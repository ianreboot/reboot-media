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
    
    // Wait for content to load
    await page.waitForSelector('h1', { timeout: 10000 });
    
    // Take screenshots
    await page.screenshot({ 
      path: '/home/ian/projects/reboot/color-update-hero.png',
      fullPage: false
    });
    
    // Scroll to services section
    await page.evaluate(() => {
      document.querySelector('#services').scrollIntoView();
    });
    await new Promise(resolve => setTimeout(resolve, 500));
    
    await page.screenshot({ 
      path: '/home/ian/projects/reboot/color-update-services.png',
      fullPage: false
    });
    
    // Scroll to about section
    await page.evaluate(() => {
      document.querySelector('#about').scrollIntoView();
    });
    await new Promise(resolve => setTimeout(resolve, 500));
    
    await page.screenshot({ 
      path: '/home/ian/projects/reboot/color-update-about.png',
      fullPage: false
    });
    
    console.log('Screenshots saved!');
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
})();