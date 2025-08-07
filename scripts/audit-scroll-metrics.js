#!/usr/bin/env node

/**
 * Audit scroll metrics and Core Web Vitals for all pages
 * Measures baseline performance before scroll fatigue improvements
 */

import puppeteer from 'puppeteer';

const BASE_URL = 'http://localhost:5178/reboot';

const PAGES = [
  { name: 'Homepage', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
  { name: 'Marketing Psychology', path: '/marketing-psychology' },
  { name: 'Growth Plateau', path: '/growth-plateau-solutions' },
  { name: 'CMO Guide', path: '/fractional-cmo-guide' },
  { name: 'Privacy', path: '/privacy' },
  { name: 'Terms', path: '/terms' }
];

async function measurePage(browser, page, url, name) {
  console.log(`\n📊 Measuring: ${name}`);
  console.log(`   URL: ${url}`);
  
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
  
  // Wait for any lazy loading
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Measure page metrics
  const metrics = await page.evaluate(() => {
    // Get document dimensions
    const docHeight = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;
    const scrollDistance = docHeight - viewportHeight;
    
    // Count visual elements
    const headings = {
      h1: document.querySelectorAll('h1').length,
      h2: document.querySelectorAll('h2').length,
      h3: document.querySelectorAll('h3').length,
      h4: document.querySelectorAll('h4').length
    };
    
    // Measure text density
    const paragraphs = document.querySelectorAll('p');
    let totalTextLength = 0;
    paragraphs.forEach(p => {
      totalTextLength += p.textContent.length;
    });
    
    // Check for sticky elements
    const stickyElements = [];
    const allElements = document.querySelectorAll('*');
    allElements.forEach(el => {
      const style = window.getComputedStyle(el);
      if (style.position === 'sticky' || style.position === 'fixed') {
        stickyElements.push({
          tag: el.tagName.toLowerCase(),
          classes: el.className
        });
      }
    });
    
    // Line heights
    const lineHeights = new Set();
    paragraphs.forEach(p => {
      const lh = window.getComputedStyle(p).lineHeight;
      lineHeights.add(lh);
    });
    
    // Visual anchors (sections with significant spacing)
    const sections = document.querySelectorAll('section, article, main > div');
    const sectionSpacing = [];
    sections.forEach(section => {
      const style = window.getComputedStyle(section);
      sectionSpacing.push({
        marginTop: style.marginTop,
        marginBottom: style.marginBottom,
        paddingTop: style.paddingTop,
        paddingBottom: style.paddingBottom
      });
    });
    
    // Check for scroll helpers
    const hasJumpLinks = document.querySelectorAll('a[href^="#"]').length > 0;
    const hasProgressBar = document.querySelector('[role="progressbar"]') !== null;
    const hasTOC = document.querySelector('.toc, .table-of-contents, nav[aria-label*="contents"]') !== null;
    
    return {
      dimensions: {
        documentHeight: docHeight,
        viewportHeight: viewportHeight,
        scrollDistance: scrollDistance,
        viewportsToScroll: (scrollDistance / viewportHeight).toFixed(2)
      },
      content: {
        headings,
        paragraphCount: paragraphs.length,
        totalTextChars: totalTextLength,
        averageParaLength: Math.round(totalTextLength / paragraphs.length)
      },
      visual: {
        stickyElementCount: stickyElements.length,
        stickyElements: stickyElements.slice(0, 3), // First 3 for brevity
        uniqueLineHeights: Array.from(lineHeights).slice(0, 5),
        sectionCount: sections.length
      },
      scrollHelpers: {
        hasJumpLinks,
        hasProgressBar,
        hasTOC
      }
    };
  });
  
  // Measure Core Web Vitals
  const vitals = await page.evaluate(() => {
    return new Promise((resolve) => {
      let lcp = 0;
      let cls = 0;
      let fid = 0;
      
      // Observe LCP
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        lcp = lastEntry.renderTime || lastEntry.loadTime;
      }).observe({ entryTypes: ['largest-contentful-paint'] });
      
      // Observe CLS
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (!entry.hadRecentInput) {
            cls += entry.value;
          }
        }
      }).observe({ entryTypes: ['layout-shift'] });
      
      // Wait a bit to collect metrics
      setTimeout(() => {
        resolve({
          lcp: lcp.toFixed(2),
          cls: cls.toFixed(4),
          ttfb: performance.timing.responseStart - performance.timing.fetchStart
        });
      }, 3000);
    });
  });
  
  return {
    name,
    url,
    metrics,
    vitals
  };
}

async function runAudit() {
  console.log('🚀 Starting Scroll Fatigue & Core Web Vitals Audit');
  console.log('=' .repeat(60));
  
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const results = [];
  
  try {
    for (const pageInfo of PAGES) {
      const page = await browser.newPage();
      await page.setViewport({ width: 1920, height: 1080 });
      
      const url = `${BASE_URL}${pageInfo.path}`;
      const result = await measurePage(browser, page, url, pageInfo.name);
      results.push(result);
      
      await page.close();
    }
  } catch (error) {
    console.error('Error during audit:', error);
  } finally {
    await browser.close();
  }
  
  // Generate summary report
  console.log('\n' + '='.repeat(60));
  console.log('📈 AUDIT SUMMARY - BASELINE METRICS');
  console.log('='.repeat(60));
  
  // Scroll fatigue indicators
  console.log('\n🔴 PAGES WITH HIGH SCROLL FATIGUE RISK:');
  results.forEach(r => {
    const viewports = parseFloat(r.metrics.dimensions.viewportsToScroll);
    if (viewports > 3) {
      console.log(`   ⚠️  ${r.name}: ${viewports} viewport heights to scroll`);
    }
  });
  
  console.log('\n📊 SCROLL METRICS BY PAGE:');
  results.forEach(r => {
    console.log(`\n${r.name}:`);
    console.log(`   Document Height: ${r.metrics.dimensions.documentHeight}px`);
    console.log(`   Viewports to Scroll: ${r.metrics.dimensions.viewportsToScroll}`);
    console.log(`   Sections: ${r.metrics.visual.sectionCount}`);
    console.log(`   Sticky Elements: ${r.metrics.visual.stickyElementCount}`);
    console.log(`   Scroll Helpers: Jump Links: ${r.metrics.scrollHelpers.hasJumpLinks}, TOC: ${r.metrics.scrollHelpers.hasTOC}`);
  });
  
  console.log('\n⚡ CORE WEB VITALS:');
  results.forEach(r => {
    console.log(`\n${r.name}:`);
    console.log(`   LCP: ${r.vitals.lcp}ms`);
    console.log(`   CLS: ${r.vitals.cls}`);
    console.log(`   TTFB: ${r.vitals.ttfb}ms`);
  });
  
  // Recommendations
  console.log('\n' + '='.repeat(60));
  console.log('💡 IMMEDIATE PRIORITIES FOR SCROLL FATIGUE REDUCTION:');
  console.log('='.repeat(60));
  
  const priorities = [];
  results.forEach(r => {
    const viewports = parseFloat(r.metrics.dimensions.viewportsToScroll);
    if (viewports > 5) {
      priorities.push(`${r.name}: CRITICAL - Requires major visual anchors and progressive disclosure`);
    } else if (viewports > 3) {
      priorities.push(`${r.name}: HIGH - Needs section breaks and improved hierarchy`);
    } else if (viewports > 2) {
      priorities.push(`${r.name}: MEDIUM - Could benefit from tighter spacing`);
    }
  });
  
  priorities.forEach((p, i) => {
    console.log(`${i + 1}. ${p}`);
  });
  
  // Save results to file
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `scroll-audit-${timestamp}.json`;
  
  await import('fs').then(fs => 
    fs.promises.writeFile(
      filename,
      JSON.stringify(results, null, 2)
    )
  );
  
  console.log(`\n✅ Full audit results saved to: ${filename}`);
  console.log('\n🎯 Next Steps: Apply CSS-only improvements to reduce scroll fatigue');
}

// Run the audit
runAudit().catch(console.error);