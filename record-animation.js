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
    
    // Wait for animation to start
    await page.waitForSelector('h1', { timeout: 10000 });
    
    // Take screenshots at different stages of animation
    for (let i = 0; i < 5; i++) {
      await new Promise(resolve => setTimeout(resolve, 2000));
      await page.screenshot({ 
        path: `/home/ian/projects/reboot/animation-stage-${i}.png`,
        clip: { x: 400, y: 150, width: 1120, height: 400 }
      });
      console.log(`Captured stage ${i}`);
    }
    
    console.log('Animation screenshots saved!');
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
})();