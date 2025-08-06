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
    
    // Get computed styles for various elements
    const fontInfo = await page.evaluate(() => {
      const h1 = document.querySelector('h1');
      const body = document.querySelector('body');
      const button = document.querySelector('button');
      
      return {
        h1Font: h1 ? window.getComputedStyle(h1).fontFamily : 'not found',
        bodyFont: body ? window.getComputedStyle(body).fontFamily : 'not found',
        buttonFont: button ? window.getComputedStyle(button).fontFamily : 'not found',
        // Check if Figtree font loaded
        fontLoadStatus: document.fonts.check('1em Figtree')
      };
    });
    
    console.log('Font Information:', fontInfo);
    
    // Check network requests for font loading
    const fontRequests = [];
    page.on('response', response => {
      if (response.url().includes('fonts.googleapis.com') || response.url().includes('fonts.gstatic.com')) {
        fontRequests.push({
          url: response.url(),
          status: response.status()
        });
      }
    });
    
    // Reload to capture font requests
    await page.reload();
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Font Requests:', fontRequests);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
})();