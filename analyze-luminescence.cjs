const puppeteer = require('puppeteer');

async function analyzeLuminescence() {
  console.log('🔍 Analyzing luminescence hierarchy on homepage...');
  
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  
  try {
    // Navigate to dev server 
    await page.goto('http://localhost:5174/reboot/', { 
      waitUntil: 'networkidle0',
      timeout: 10000
    });
    
    // Take full page screenshot for analysis
    await page.screenshot({ 
      path: '/home/ian/projects/reboot/homepage-luminescence-analysis.png', 
      fullPage: true
    });
    
    // Analyze luminescence values of key elements
    const luminanceAnalysis = await page.evaluate(() => {
      function getLuminance(element) {
        const style = window.getComputedStyle(element);
        return {
          backgroundColor: style.backgroundColor,
          color: style.color,
          fontSize: style.fontSize,
          fontWeight: style.fontWeight
        };
      }
      
      const elements = {
        hero_h1: document.querySelector('h1'),
        hero_cta: document.querySelector('button'),
        section_h2s: Array.from(document.querySelectorAll('h2')),
        body_text: document.querySelector('p'),
        cards: Array.from(document.querySelectorAll('[class*="bg-white"]')).slice(0, 3)
      };
      
      return {
        hero_h1: elements.hero_h1 ? getLuminance(elements.hero_h1) : null,
        hero_cta: elements.hero_cta ? getLuminance(elements.hero_cta) : null,
        section_h2s: elements.section_h2s.map(h2 => getLuminance(h2)).slice(0, 3),
        body_text: elements.body_text ? getLuminance(elements.body_text) : null,
        cards: elements.cards.map(card => getLuminance(card))
      };
    });
    
    console.log('\n📊 LUMINESCENCE HIERARCHY ANALYSIS:');
    
    console.log('\n🎯 Hero H1 Luminescence:');
    if (luminanceAnalysis.hero_h1) {
      console.log(`  Color: ${luminanceAnalysis.hero_h1.color}`);
      console.log(`  Background: ${luminanceAnalysis.hero_h1.backgroundColor}`);
      console.log(`  Font Size: ${luminanceAnalysis.hero_h1.fontSize}`);
      console.log(`  Font Weight: ${luminanceAnalysis.hero_h1.fontWeight}`);
    }
    
    console.log('\n🔥 Hero CTA Luminescence:');
    if (luminanceAnalysis.hero_cta) {
      console.log(`  Color: ${luminanceAnalysis.hero_cta.color}`);
      console.log(`  Background: ${luminanceAnalysis.hero_cta.backgroundColor}`);
      console.log(`  Font Weight: ${luminanceAnalysis.hero_cta.fontWeight}`);
    }
    
    console.log('\n📝 Section H2s Luminescence:');
    luminanceAnalysis.section_h2s.forEach((h2, i) => {
      console.log(`  H2 ${i+1}: ${h2.color} on ${h2.backgroundColor}`);
    });
    
    console.log('\n📄 Body Text Luminescence:');
    if (luminanceAnalysis.body_text) {
      console.log(`  Color: ${luminanceAnalysis.body_text.color}`);
    }
    
    console.log('\n🎴 Card Backgrounds:');
    luminanceAnalysis.cards.forEach((card, i) => {
      console.log(`  Card ${i+1}: ${card.backgroundColor}`);
    });
    
    console.log('\n✅ Luminescence analysis complete!');
    console.log('📸 Full page screenshot saved for visual analysis');
    
  } catch (error) {
    console.error('❌ Error during analysis:', error.message);
  } finally {
    await browser.close();
  }
}

analyzeLuminescence();