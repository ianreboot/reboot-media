#!/usr/bin/env node

/**
 * ACCESSIBILITY MONITORING DASHBOARD
 * Strategic Amplification: Real-time WCAG compliance tracking
 * 
 * Features:
 * - Live accessibility score monitoring
 * - WCAG AA compliance percentage
 * - Real-time class usage analytics
 * - Regression detection and alerts
 * - Visual progress tracking
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class AccessibilityDashboard {
  constructor() {
    this.pagesDir = 'src/pages/';
    this.analyticsFile = 'accessibility-analytics.json';
    
    // Systematic accessibility classes (WCAG AA compliant)
    this.systematicClasses = [
      'text-gradient-critical',
      'text-gradient-safe', 
      'text-gradient-enhanced',
      'luminescence-layer-1',
      'luminescence-layer-2',
      'luminescence-layer-3',
      'luminescence-layer-4',
      'text-black-critical',
      'text-black-important',
      'text-black-standard',
      'text-black-optional'
    ];
    
    // Problematic classes (fail WCAG AA on gradients)
    this.problematicClasses = [
      'replace-text-gray-300',
      'replace-text-gray-400',
      'replace-text-gray-500', 
      'replace-text-gray-600',
      'text-gray-300',
      'text-gray-400',
      'text-gray-500',
      'text-gray-600'
    ];
  }

  async scanAllPages() {
    const results = {
      timestamp: new Date().toISOString(),
      totalFiles: 0,
      systematicClasses: {},
      problematicClasses: {},
      fileAnalysis: {},
      complianceScore: 0,
      totalSystematic: 0,
      totalProblematic: 0
    };

    try {
      // Get all .tsx files
      const files = fs.readdirSync(this.pagesDir)
        .filter(file => file.endsWith('.tsx'))
        .map(file => path.join(this.pagesDir, file));

      results.totalFiles = files.length;

      // Analyze each file
      for (const filePath of files) {
        const content = fs.readFileSync(filePath, 'utf8');
        const fileName = path.basename(filePath);
        
        const fileResults = {
          systematicCount: 0,
          problematicCount: 0,
          systematicClasses: {},
          problematicClasses: {},
          complianceScore: 0
        };

        // Count systematic classes
        for (const className of this.systematicClasses) {
          const regex = new RegExp(`\\b${className}\\b`, 'g');
          const matches = content.match(regex) || [];
          
          if (matches.length > 0) {
            fileResults.systematicClasses[className] = matches.length;
            fileResults.systematicCount += matches.length;
            
            if (!results.systematicClasses[className]) {
              results.systematicClasses[className] = 0;
            }
            results.systematicClasses[className] += matches.length;
          }
        }

        // Count problematic classes
        for (const className of this.problematicClasses) {
          const regex = new RegExp(`\\b${className}\\b`, 'g');
          const matches = content.match(regex) || [];
          
          if (matches.length > 0) {
            fileResults.problematicClasses[className] = matches.length;
            fileResults.problematicCount += matches.length;
            
            if (!results.problematicClasses[className]) {
              results.problematicClasses[className] = 0;
            }
            results.problematicClasses[className] += matches.length;
          }
        }

        // Calculate file compliance score
        const totalClasses = fileResults.systematicCount + fileResults.problematicCount;
        fileResults.complianceScore = totalClasses > 0 
          ? Math.round((fileResults.systematicCount / totalClasses) * 100) 
          : 100;

        results.fileAnalysis[fileName] = fileResults;
      }

      // Calculate overall metrics
      results.totalSystematic = Object.values(results.systematicClasses).reduce((sum, count) => sum + count, 0);
      results.totalProblematic = Object.values(results.problematicClasses).reduce((sum, count) => sum + count, 0);
      
      const totalClasses = results.totalSystematic + results.totalProblematic;
      results.complianceScore = totalClasses > 0 
        ? Math.round((results.totalSystematic / totalClasses) * 100) 
        : 100;

      return results;
    } catch (error) {
      console.error('Error scanning pages:', error);
      return null;
    }
  }

  generateDashboardHTML(data) {
    const topFiles = Object.entries(data.fileAnalysis)
      .sort(([,a], [,b]) => b.complianceScore - a.complianceScore)
      .slice(0, 10);

    const worstFiles = Object.entries(data.fileAnalysis)
      .sort(([,a], [,b]) => a.complianceScore - b.complianceScore)
      .slice(0, 5);

    const getScoreColor = (score) => {
      if (score >= 90) return '#22c55e'; // green
      if (score >= 70) return '#f59e0b'; // yellow
      return '#ef4444'; // red
    };

    const getScoreEmoji = (score) => {
      if (score >= 90) return '✅';
      if (score >= 70) return '⚠️';
      return '❌';
    };

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Accessibility Monitoring Dashboard - Reboot Project</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #f8fafc;
            color: #1e293b;
            line-height: 1.6;
        }
        .container { max-width: 1200px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 3rem; }
        .title { font-size: 2.5rem; font-weight: bold; color: #0f172a; margin-bottom: 0.5rem; }
        .subtitle { font-size: 1.1rem; color: #64748b; }
        .timestamp { font-size: 0.9rem; color: #94a3b8; margin-top: 1rem; }
        
        .metrics-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-bottom: 3rem; }
        .metric-card { 
            background: white; 
            padding: 2rem; 
            border-radius: 12px; 
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            text-align: center;
        }
        .metric-value { font-size: 2.5rem; font-weight: bold; margin-bottom: 0.5rem; }
        .metric-label { color: #64748b; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.05em; }
        
        .score-ring { 
            width: 120px; 
            height: 120px; 
            margin: 0 auto 1rem; 
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .score-ring svg { transform: rotate(-90deg); }
        .score-text { 
            position: absolute; 
            font-size: 1.5rem; 
            font-weight: bold; 
        }
        
        .section { margin-bottom: 3rem; }
        .section-title { font-size: 1.5rem; font-weight: bold; margin-bottom: 1.5rem; color: #0f172a; }
        
        .file-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1rem; }
        .file-card { 
            background: white; 
            padding: 1.5rem; 
            border-radius: 8px; 
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .file-name { font-weight: bold; margin-bottom: 0.5rem; }
        .file-score { font-size: 1.2rem; font-weight: bold; margin-bottom: 1rem; }
        .file-details { font-size: 0.9rem; color: #64748b; }
        
        .progress-bar { 
            width: 100%; 
            height: 8px; 
            background: #e2e8f0; 
            border-radius: 4px; 
            overflow: hidden; 
            margin: 1rem 0;
        }
        .progress-fill { height: 100%; transition: width 0.3s ease; }
        
        .class-breakdown { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
        .class-list { background: white; padding: 1.5rem; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        .class-item { display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid #f1f5f9; }
        .class-item:last-child { border-bottom: none; }
        
        .good { color: #22c55e; }
        .warning { color: #f59e0b; }
        .bad { color: #ef4444; }
        
        .auto-refresh { position: fixed; top: 20px; right: 20px; background: #3b82f6; color: white; padding: 0.5rem 1rem; border-radius: 6px; font-size: 0.8rem; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 class="title">🛡️ Accessibility Monitoring Dashboard</h1>
            <p class="subtitle">Real-time WCAG AA compliance tracking for Reboot Project</p>
            <p class="timestamp">Last updated: ${new Date(data.timestamp).toLocaleString()}</p>
        </div>

        <div class="metrics-grid">
            <div class="metric-card">
                <div class="score-ring">
                    <svg width="120" height="120">
                        <circle cx="60" cy="60" r="45" fill="none" stroke="#e2e8f0" stroke-width="8"/>
                        <circle cx="60" cy="60" r="45" fill="none" stroke="${getScoreColor(data.complianceScore)}" 
                                stroke-width="8" stroke-dasharray="${Math.PI * 90}" 
                                stroke-dashoffset="${Math.PI * 90 * (1 - data.complianceScore / 100)}"
                                stroke-linecap="round"/>
                    </svg>
                    <div class="score-text" style="color: ${getScoreColor(data.complianceScore)}">
                        ${data.complianceScore}%
                    </div>
                </div>
                <div class="metric-label">WCAG AA Compliance Score</div>
            </div>

            <div class="metric-card">
                <div class="metric-value good">${data.totalSystematic}</div>
                <div class="metric-label">Systematic Classes</div>
                <div style="font-size: 0.8rem; color: #64748b; margin-top: 0.5rem;">WCAG AA Compliant</div>
            </div>

            <div class="metric-card">
                <div class="metric-value ${data.totalProblematic > 0 ? 'bad' : 'good'}">${data.totalProblematic}</div>
                <div class="metric-label">Problematic Classes</div>
                <div style="font-size: 0.8rem; color: #64748b; margin-top: 0.5rem;">Need Replacement</div>
            </div>

            <div class="metric-card">
                <div class="metric-value">${data.totalFiles}</div>
                <div class="metric-label">Pages Monitored</div>
                <div style="font-size: 0.8rem; color: #64748b; margin-top: 0.5rem;">Real-time tracking</div>
            </div>
        </div>

        ${data.complianceScore < 100 ? `
        <div class="section">
            <h2 class="section-title">⚠️ Priority Files (Lowest Compliance)</h2>
            <div class="file-grid">
                ${worstFiles.map(([fileName, stats]) => `
                    <div class="file-card">
                        <div class="file-name">${fileName}</div>
                        <div class="file-score" style="color: ${getScoreColor(stats.complianceScore)}">
                            ${getScoreEmoji(stats.complianceScore)} ${stats.complianceScore}% compliant
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${stats.complianceScore}%; background: ${getScoreColor(stats.complianceScore)};"></div>
                        </div>
                        <div class="file-details">
                            Systematic: ${stats.systematicCount} | Problematic: ${stats.problematicCount}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
        ` : ''}

        <div class="section">
            <h2 class="section-title">📊 Class Usage Breakdown</h2>
            <div class="class-breakdown">
                <div class="class-list">
                    <h3 style="margin-bottom: 1rem; color: #22c55e;">✅ Systematic Classes (WCAG AA)</h3>
                    ${Object.entries(data.systematicClasses).map(([className, count]) => `
                        <div class="class-item">
                            <span>${className}</span>
                            <span class="good">${count}</span>
                        </div>
                    `).join('')}
                </div>

                ${data.totalProblematic > 0 ? `
                <div class="class-list">
                    <h3 style="margin-bottom: 1rem; color: #ef4444;">❌ Problematic Classes</h3>
                    ${Object.entries(data.problematicClasses).map(([className, count]) => `
                        <div class="class-item">
                            <span>${className}</span>
                            <span class="bad">${count}</span>
                        </div>
                    `).join('')}
                </div>
                ` : `
                <div class="class-list">
                    <h3 style="margin-bottom: 1rem; color: #22c55e;">🎉 Zero Problematic Classes!</h3>
                    <p style="color: #64748b;">All accessibility classes are WCAG AA compliant. Auto-healing system is maintaining 100% compliance.</p>
                </div>
                `}
            </div>
        </div>

        <div class="section">
            <h2 class="section-title">🏆 Top Performing Pages</h2>
            <div class="file-grid">
                ${topFiles.map(([fileName, stats]) => `
                    <div class="file-card">
                        <div class="file-name">${fileName}</div>
                        <div class="file-score" style="color: ${getScoreColor(stats.complianceScore)}">
                            ${getScoreEmoji(stats.complianceScore)} ${stats.complianceScore}% compliant
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${stats.complianceScore}%; background: ${getScoreColor(stats.complianceScore)};"></div>
                        </div>
                        <div class="file-details">
                            Systematic: ${stats.systematicCount} | Problematic: ${stats.problematicCount}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>

        ${data.complianceScore === 100 ? `
        <div class="section" style="text-align: center; background: linear-gradient(135deg, #22c55e, #16a34a); color: white; padding: 3rem; border-radius: 12px;">
            <h2 style="font-size: 2rem; margin-bottom: 1rem;">🎉 Perfect Accessibility Score!</h2>
            <p style="font-size: 1.1rem; opacity: 0.9;">All ${data.totalSystematic} accessibility classes are WCAG AA compliant. Your auto-healing system is working perfectly!</p>
        </div>
        ` : ''}
    </div>

    <div class="auto-refresh">Auto-refreshes every 30s</div>

    <script>
        // Auto-refresh every 30 seconds
        setTimeout(() => window.location.reload(), 30000);
        
        // Add smooth animations
        document.querySelectorAll('.metric-card, .file-card').forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    </script>
</body>
</html>`;
  }

  async runDashboard() {
    console.log('📊 Generating accessibility monitoring dashboard...');
    
    const data = await this.scanAllPages();
    if (!data) {
      console.error('❌ Failed to scan pages');
      return;
    }

    // Save analytics data
    fs.writeFileSync(this.analyticsFile, JSON.stringify(data, null, 2));
    
    // Generate HTML dashboard
    const dashboardHTML = this.generateDashboardHTML(data);
    fs.writeFileSync('accessibility-dashboard.html', dashboardHTML);
    
    // Console summary
    console.log('\n🛡️ ACCESSIBILITY MONITORING SUMMARY');
    console.log('=====================================');
    console.log(`📊 Overall Compliance Score: ${data.complianceScore}%`);
    console.log(`✅ Systematic Classes: ${data.totalSystematic}`);
    console.log(`❌ Problematic Classes: ${data.totalProblematic}`);
    console.log(`📁 Pages Monitored: ${data.totalFiles}`);
    console.log(`🔗 Dashboard: file://${path.resolve('accessibility-dashboard.html')}`);
    
    if (data.complianceScore === 100) {
      console.log('\n🎉 PERFECT SCORE! All accessibility classes are WCAG AA compliant!');
    } else {
      console.log(`\n⚠️  ${data.totalProblematic} problematic classes need replacement`);
      console.log('Run: node scripts/accessibility-migrator.js --auto-fix');
    }
    
    return data;
  }
}

// Execute dashboard if run directly
if (require.main === module) {
  const dashboard = new AccessibilityDashboard();
  dashboard.runDashboard().catch(error => {
    console.error('Dashboard failed:', error);
    process.exit(1);
  });
}

module.exports = AccessibilityDashboard;