const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  // Test different viewport sizes
  const viewports = [
    { width: 375, height: 667, name: 'mobile' },
    { width: 768, height: 1024, name: 'tablet' },
    { width: 1024, height: 768, name: 'desktop-small' },
    { width: 1440, height: 900, name: 'desktop-large' }
  ];
  
  console.log('Testing fluid pricing cards at different viewports...\n');
  
  for (const viewport of viewports) {
    await page.setViewport(viewport);
    await page.goto('http://localhost:5177/reboot/', { waitUntil: 'networkidle0' });
    
    // Scroll to pricing section
    await page.evaluate(() => {
      const pricingSection = document.querySelector('#pricing');
      if (pricingSection) {
        pricingSection.scrollIntoView({ behavior: 'instant' });
      }
    });
    
    // Wait for cards to be visible
    await page.waitForSelector('[class*="rounded-3xl"]', { timeout: 5000 });
    
    // Check cards layout
    const cardsInfo = await page.evaluate(() => {
      const cards = document.querySelectorAll('[class*="rounded-3xl"]');
      const container = cards[0]?.parentElement;
      
      if (!container) return null;
      
      const containerStyle = window.getComputedStyle(container);
      const containerWidth = container.offsetWidth;
      
      const cardsData = Array.from(cards).map(card => ({
        width: card.offsetWidth,
        height: card.offsetHeight,
        visible: card.offsetWidth > 0 && card.offsetHeight > 0
      }));
      
      return {
        containerWidth,
        gridColumns: containerStyle.gridTemplateColumns,
        cardsCount: cards.length,
        cards: cardsData
      };
    });
    
    console.log(`📱 ${viewport.name.toUpperCase()} (${viewport.width}x${viewport.height})`);
    if (cardsInfo) {
      console.log(`  Container width: ${cardsInfo.containerWidth}px`);
      console.log(`  Grid columns: ${cardsInfo.gridColumns}`);
      console.log(`  Cards visible: ${cardsInfo.cards.filter(c => c.visible).length}/${cardsInfo.cardsCount}`);
      console.log(`  Card widths: ${cardsInfo.cards.map(c => c.width).join(', ')}px`);
    } else {
      console.log('  ❌ Could not find pricing cards!');
    }
    console.log('');
    
    // Take screenshot
    await page.screenshot({ 
      path: `fluid-cards-${viewport.name}.png`,
      fullPage: false
    });
  }
  
  console.log('✅ Screenshots saved as fluid-cards-*.png');
  
  await browser.close();
})().catch(error => {
  console.error('❌ Error:', error.message);
  process.exit(1);
});