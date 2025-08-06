#!/usr/bin/env node

/**
 * Reboot Media Deployment Monitor
 * Monitors site health and performance after deployments
 */

const https = require('https');
const http = require('http');
const { exec } = require('child_process');
const fs = require('fs').promises;

class DeploymentMonitor {
  constructor(config = {}) {
    this.config = {
      sites: {
        development: {
          url: 'https://dev.rebootmedia.net/reboot/',
          expectedStatus: 200,
          maxLoadTime: 5000,
          checkInterval: 300000, // 5 minutes
          alerts: {
            webhook: process.env.SLACK_WEBHOOK,
            email: process.env.ALERT_EMAIL
          }
        },
        production: {
          url: 'https://www.rebootmedia.net/',
          expectedStatus: 200,
          maxLoadTime: 3000,
          checkInterval: 60000, // 1 minute
          alerts: {
            webhook: process.env.SLACK_WEBHOOK,
            email: process.env.ALERT_EMAIL
          }
        }
      },
      ...config
    };
    
    this.metrics = {
      checks: [],
      errors: [],
      lastCheck: null
    };
  }

  // Check site availability
  async checkSite(environment) {
    const site = this.config.sites[environment];
    const startTime = Date.now();
    
    return new Promise((resolve) => {
      const url = new URL(site.url);
      const client = url.protocol === 'https:' ? https : http;
      
      const req = client.get(site.url, (res) => {
        const loadTime = Date.now() - startTime;
        
        const result = {
          environment,
          timestamp: new Date().toISOString(),
          url: site.url,
          statusCode: res.statusCode,
          loadTime,
          healthy: res.statusCode === site.expectedStatus && loadTime < site.maxLoadTime,
          errors: []
        };
        
        // Check status code
        if (res.statusCode !== site.expectedStatus) {
          result.errors.push(`Expected status ${site.expectedStatus}, got ${res.statusCode}`);
        }
        
        // Check load time
        if (loadTime > site.maxLoadTime) {
          result.errors.push(`Load time ${loadTime}ms exceeds max ${site.maxLoadTime}ms`);
        }
        
        // Read response body to check for errors
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
          // Check for common error patterns
          if (body.includes('Error') || body.includes('failed')) {
            result.errors.push('Page contains error text');
          }
          
          resolve(result);
        });
      });
      
      req.on('error', (error) => {
        resolve({
          environment,
          timestamp: new Date().toISOString(),
          url: site.url,
          statusCode: 0,
          loadTime: Date.now() - startTime,
          healthy: false,
          errors: [`Request failed: ${error.message}`]
        });
      });
      
      req.setTimeout(site.maxLoadTime * 2, () => {
        req.destroy();
        resolve({
          environment,
          timestamp: new Date().toISOString(),
          url: site.url,
          statusCode: 0,
          loadTime: Date.now() - startTime,
          healthy: false,
          errors: ['Request timeout']
        });
      });
    });
  }

  // Check JavaScript console errors (requires Puppeteer in real implementation)
  async checkConsoleErrors(environment) {
    const site = this.config.sites[environment];
    
    console.log(`🔍 Checking console errors for ${environment}...`);
    
    // This is a simplified version - real implementation would use Puppeteer
    try {
      // Check if the main JavaScript loads
      const jsUrl = site.url + 'assets/index.js';
      const response = await this.makeRequest(jsUrl);
      
      return {
        environment,
        timestamp: new Date().toISOString(),
        hasErrors: false,
        errors: []
      };
    } catch (error) {
      return {
        environment,
        timestamp: new Date().toISOString(),
        hasErrors: true,
        errors: [error.message]
      };
    }
  }

  // Make HTTP request
  makeRequest(url) {
    return new Promise((resolve, reject) => {
      const client = url.startsWith('https') ? https : http;
      
      client.get(url, (res) => {
        if (res.statusCode === 200) {
          resolve(res);
        } else {
          reject(new Error(`HTTP ${res.statusCode}`));
        }
      }).on('error', reject);
    });
  }

  // Check all sites
  async checkAllSites() {
    console.log(`\n🔍 Running health checks - ${new Date().toISOString()}`);
    console.log('='.repeat(50));
    
    const results = {};
    
    for (const environment of Object.keys(this.config.sites)) {
      console.log(`\nChecking ${environment}...`);
      
      const siteCheck = await this.checkSite(environment);
      const consoleCheck = await this.checkConsoleErrors(environment);
      
      results[environment] = {
        site: siteCheck,
        console: consoleCheck,
        healthy: siteCheck.healthy && !consoleCheck.hasErrors
      };
      
      // Store metrics
      this.metrics.checks.push(siteCheck);
      if (!siteCheck.healthy) {
        this.metrics.errors.push(siteCheck);
      }
      
      // Report status
      if (results[environment].healthy) {
        console.log(`✅ ${environment}: Healthy (${siteCheck.loadTime}ms)`);
      } else {
        console.log(`❌ ${environment}: Issues detected`);
        siteCheck.errors.forEach(err => console.log(`   - ${err}`));
        
        // Send alert
        await this.sendAlert(environment, siteCheck);
      }
    }
    
    this.metrics.lastCheck = new Date().toISOString();
    
    // Save metrics
    await this.saveMetrics();
    
    return results;
  }

  // Send alert
  async sendAlert(environment, checkResult) {
    const site = this.config.sites[environment];
    
    if (!site.alerts.webhook && !site.alerts.email) {
      return;
    }
    
    const message = `
🚨 Deployment Monitor Alert

Environment: ${environment}
URL: ${checkResult.url}
Status: ${checkResult.statusCode}
Load Time: ${checkResult.loadTime}ms
Errors: ${checkResult.errors.join(', ')}
Time: ${checkResult.timestamp}
    `;
    
    console.log('📧 Sending alert:', message);
    
    // In real implementation, send to Slack/Email
    if (site.alerts.webhook) {
      // await this.sendToSlack(site.alerts.webhook, message);
    }
    
    if (site.alerts.email) {
      // await this.sendEmail(site.alerts.email, message);
    }
  }

  // Save metrics to file
  async saveMetrics() {
    const metricsPath = 'deployment-metrics.json';
    
    // Keep only last 100 checks
    if (this.metrics.checks.length > 100) {
      this.metrics.checks = this.metrics.checks.slice(-100);
    }
    
    await fs.writeFile(
      metricsPath,
      JSON.stringify(this.metrics, null, 2)
    );
  }

  // Get metrics summary
  getMetricsSummary() {
    const last24h = Date.now() - 24 * 60 * 60 * 1000;
    const recentChecks = this.metrics.checks.filter(
      check => new Date(check.timestamp).getTime() > last24h
    );
    
    const summary = {};
    
    for (const environment of Object.keys(this.config.sites)) {
      const envChecks = recentChecks.filter(c => c.environment === environment);
      const healthyChecks = envChecks.filter(c => c.healthy);
      
      summary[environment] = {
        totalChecks: envChecks.length,
        healthyChecks: healthyChecks.length,
        uptime: envChecks.length > 0 
          ? ((healthyChecks.length / envChecks.length) * 100).toFixed(2) + '%'
          : 'N/A',
        avgLoadTime: envChecks.length > 0
          ? Math.round(envChecks.reduce((sum, c) => sum + c.loadTime, 0) / envChecks.length)
          : 0,
        lastCheck: envChecks.length > 0 ? envChecks[envChecks.length - 1].timestamp : null
      };
    }
    
    return summary;
  }

  // Start monitoring
  async startMonitoring() {
    console.log('🚀 Starting deployment monitor...');
    
    // Initial check
    await this.checkAllSites();
    
    // Schedule regular checks
    for (const [environment, site] of Object.entries(this.config.sites)) {
      setInterval(async () => {
        console.log(`\n⏰ Scheduled check for ${environment}`);
        const result = await this.checkSite(environment);
        
        this.metrics.checks.push(result);
        if (!result.healthy) {
          this.metrics.errors.push(result);
          await this.sendAlert(environment, result);
        }
        
        await this.saveMetrics();
      }, site.checkInterval);
    }
    
    console.log('📊 Monitor running. Press Ctrl+C to stop.');
  }
}

// CLI Interface
if (require.main === module) {
  const monitor = new DeploymentMonitor();
  
  const args = process.argv.slice(2);
  const command = args[0] || 'check';
  
  const commands = {
    check: async () => {
      const results = await monitor.checkAllSites();
      console.log('\n📊 Check Results:');
      console.log(JSON.stringify(results, null, 2));
    },
    monitor: async () => {
      await monitor.startMonitoring();
    },
    summary: async () => {
      // Load existing metrics
      try {
        const data = await fs.readFile('deployment-metrics.json', 'utf-8');
        monitor.metrics = JSON.parse(data);
      } catch (error) {
        console.log('No existing metrics found');
      }
      
      const summary = monitor.getMetricsSummary();
      console.log('\n📊 24-Hour Summary:');
      console.log(JSON.stringify(summary, null, 2));
    },
    help: () => {
      console.log(`
Reboot Media Deployment Monitor

Usage: monitor <command>

Commands:
  check    Run a single health check on all sites
  monitor  Start continuous monitoring
  summary  Show 24-hour metrics summary
  help     Show this help message

Examples:
  node monitor.js check
  node monitor.js monitor
  node monitor.js summary
      `);
    }
  };
  
  const cmd = commands[command] || commands.help;
  
  cmd().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = DeploymentMonitor;