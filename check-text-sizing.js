import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:5173');
  await page.waitForSelector('h1', { timeout: 10000 });
  
  // Get text sizing information
  const textSizes = await page.evaluate(() => {
    const heading = document.querySelector('h1');
    const subheading = document.querySelector('p.text-xl, p.text-lg, .hero p');
    
    const getComputedSize = (el) => {
      if (!el) return null;
      const style = window.getComputedStyle(el);
      return {
        fontSize: style.fontSize,
        lineHeight: style.lineHeight,
        text: el.textContent.trim().slice(0, 100) + '...'
      };
    };
    
    return {
      heading: getComputedSize(heading),
      subheading: getComputedSize(subheading),
      // Look for the specific subheading text
      specificSubheading: (() => {
        const paragraphs = Array.from(document.querySelectorAll('p'));
        const target = paragraphs.find(p => 
          p.textContent.includes('From Silicon Valley startups to Singapore scale-ups')
        );
        return getComputedSize(target);
      })()
    };
  });
  
  console.log('Text Size Analysis:');
  console.log('==================');
  console.log('Heading (Stop Losing Profit...):', textSizes.heading);
  console.log('Subheading (From Silicon Valley...):', textSizes.specificSubheading || textSizes.subheading);
  
  // Take screenshot to verify
  await page.screenshot({ 
    path: '/tmp/text-sizing-check.png', 
    fullPage: false,
    clip: { x: 0, y: 0, width: 1200, height: 800 }
  });
  
  await browser.close();
})();