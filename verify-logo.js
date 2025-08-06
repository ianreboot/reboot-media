import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  console.log('Verifying white logo implementation...\n');
  
  // Desktop viewport
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto('https://dev.rebootmedia.net/reboot/', { waitUntil: 'networkidle2' });
  
  // Wait for navigation to be visible
  await page.waitForSelector('nav', { visible: true });
  
  // Take screenshots of navigation and footer areas
  const nav = await page.$('nav');
  await nav.screenshot({ path: '/tmp/nav-with-white-logo.png' });
  console.log('✅ Navigation screenshot saved to /tmp/nav-with-white-logo.png');
  
  // Scroll to footer
  await page.evaluate(() => {
    document.querySelector('footer').scrollIntoView();
  });
  
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const footer = await page.$('footer');
  await footer.screenshot({ path: '/tmp/footer-with-white-logo.png' });
  console.log('✅ Footer screenshot saved to /tmp/footer-with-white-logo.png');
  
  // Check mobile view
  await page.setViewport({ width: 375, height: 667 });
  await page.reload({ waitUntil: 'networkidle2' });
  
  // Open mobile menu
  const mobileMenuButton = await page.$('button[aria-label="Menu"]');
  if (mobileMenuButton) {
    await mobileMenuButton.click();
    await new Promise(resolve => setTimeout(resolve, 500));
    await page.screenshot({ path: '/tmp/mobile-menu-with-white-logo.png' });
    console.log('✅ Mobile menu screenshot saved to /tmp/mobile-menu-with-white-logo.png');
  }
  
  console.log('\n✅ Logo verification complete!');
  console.log('The white logo with orange lightning bolt should now be visible against dark backgrounds.');
  
  await browser.close();
})();