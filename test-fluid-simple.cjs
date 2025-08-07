const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  console.log('Testing fluid pricing cards...\n');
  
  // Test desktop view
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5177/reboot/', { waitUntil: 'networkidle0' });
  
  // Check if pricing section exists and scroll to it
  const pricingExists = await page.evaluate(() => {
    const section = document.querySelector('#pricing');
    if (section) {
      section.scrollIntoView();
      return true;
    }
    return false;
  });
  
  if (!pricingExists) {
    console.log('❌ Pricing section not found!');
    await browser.close();
    process.exit(1);
  }
  
  await page.waitForTimeout(1000); // Wait for any animations
  
  // Get pricing cards info - more specific selector
  const cardsInfo = await page.evaluate(() => {
    // Look specifically in the pricing section
    const pricingSection = document.querySelector('#pricing');
    if (!pricingSection) return { error: 'No pricing section' };
    
    // Find the container with grid styling
    const gridContainers = pricingSection.querySelectorAll('[class*="grid"]');
    let container = null;
    let cards = [];
    
    for (const grid of gridContainers) {
      const potentialCards = grid.querySelectorAll('[class*="rounded"]');
      if (potentialCards.length === 3) { // We expect exactly 3 pricing cards
        container = grid;
        cards = potentialCards;
        break;
      }
    }
    
    if (!container) {
      return { error: 'No grid container with 3 cards found' };
    }
    
    const containerStyle = window.getComputedStyle(container);
    const containerRect = container.getBoundingClientRect();
    
    const cardsData = Array.from(cards).map(card => {
      const rect = card.getBoundingClientRect();
      const title = card.querySelector('h3')?.textContent || 'Unknown';
      return {
        title,
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        top: Math.round(rect.top - containerRect.top),
        left: Math.round(rect.left - containerRect.left)
      };
    });
    
    return {
      containerWidth: Math.round(containerRect.width),
      gridColumns: containerStyle.gridTemplateColumns,
      display: containerStyle.display,
      cards: cardsData
    };
  });
  
  console.log('Pricing Cards Layout Analysis:');
  console.log('================================');
  
  if (cardsInfo.error) {
    console.log('❌ Error:', cardsInfo.error);
  } else {
    console.log('Container:');
    console.log(`  Width: ${cardsInfo.containerWidth}px`);
    console.log(`  Display: ${cardsInfo.display}`);
    console.log(`  Grid Columns: ${cardsInfo.gridColumns}`);
    console.log('\nCards:');
    cardsInfo.cards.forEach(card => {
      console.log(`  ${card.title}: ${card.width}x${card.height}px at (${card.left}, ${card.top})`);
    });
    
    // Check if cards are properly laid out
    const isFluid = cardsInfo.gridColumns.includes('auto-fit');
    const cardsInRow = cardsInfo.cards.filter(c => c.top < 100).length;
    
    console.log('\n✅ Analysis:');
    console.log(`  Fluid Grid: ${isFluid ? 'YES' : 'NO'}`);
    console.log(`  Cards per row: ${cardsInRow}`);
    console.log(`  All cards same width: ${new Set(cardsInfo.cards.map(c => c.width)).size === 1 ? 'YES' : 'NO'}`);
  }
  
  // Take screenshot of pricing section
  const pricingElement = await page.$('#pricing');
  if (pricingElement) {
    await pricingElement.screenshot({ path: 'pricing-section.png' });
    console.log('\n📸 Screenshot saved as pricing-section.png');
  }
  
  await browser.close();
})().catch(error => {
  console.error('❌ Error:', error.message);
  process.exit(1);
});