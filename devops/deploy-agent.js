#!/usr/bin/env node

/**
 * Reboot Media DevOps Deployment Agent
 * Handles automated deployments with validation, rollback, and monitoring
 */

const { exec } = require('child_process');
const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

class DeploymentAgent {
  constructor(config = {}) {
    this.config = {
      projectName: 'reboot-media',
      environments: {
        development: {
          url: 'https://dev.rebootmedia.net/reboot/',
          branch: 'master',
          buildCmd: 'npm run build:dev',
          basePath: '/reboot/',
          autoApprove: true
        },
        staging: {
          url: 'https://staging.rebootmedia.net/',
          branch: 'staging',
          buildCmd: 'npm run build:prod',
          basePath: '/',
          autoApprove: false
        },
        production: {
          url: 'https://www.rebootmedia.net/',
          branch: 'production',
          buildCmd: 'npm run build:prod',
          basePath: '/',
          autoApprove: false,
          requireTag: true
        }
      },
      ...config
    };
    
    this.deploymentHistory = [];
    this.currentDeployment = null;
  }

  // Execute shell command with promise
  async execCommand(command, options = {}) {
    return new Promise((resolve, reject) => {
      console.log(`📟 Executing: ${command}`);
      exec(command, options, (error, stdout, stderr) => {
        if (error) {
          console.error(`❌ Command failed: ${error.message}`);
          reject(error);
        } else {
          resolve({ stdout, stderr });
        }
      });
    });
  }

  // Check current git status
  async checkGitStatus() {
    console.log('🔍 Checking git status...');
    
    try {
      const { stdout: status } = await this.execCommand('git status --porcelain');
      if (status.trim()) {
        console.log('⚠️  Uncommitted changes detected:');
        console.log(status);
        
        const readline = require('readline').createInterface({
          input: process.stdin,
          output: process.stdout
        });
        
        return new Promise((resolve) => {
          readline.question('Continue with uncommitted changes? (y/N): ', (answer) => {
            readline.close();
            resolve(answer.toLowerCase() === 'y');
          });
        });
      }
      
      console.log('✅ Working directory clean');
      return true;
    } catch (error) {
      console.error('Failed to check git status:', error);
      return false;
    }
  }

  // Get current branch
  async getCurrentBranch() {
    const { stdout } = await this.execCommand('git branch --show-current');
    return stdout.trim();
  }

  // Validate environment
  async validateEnvironment(environment) {
    console.log(`🔍 Validating ${environment} environment...`);
    
    const envConfig = this.config.environments[environment];
    if (!envConfig) {
      throw new Error(`Unknown environment: ${environment}`);
    }

    // Check Node version
    const { stdout: nodeVersion } = await this.execCommand('node --version');
    console.log(`📦 Node version: ${nodeVersion.trim()}`);

    // Check npm packages
    try {
      await this.execCommand('npm ls --depth=0');
      console.log('✅ Dependencies installed');
    } catch {
      console.log('📦 Installing dependencies...');
      await this.execCommand('npm ci');
    }

    // Run linting
    console.log('🔍 Running linter...');
    try {
      await this.execCommand('npm run lint');
      console.log('✅ Linting passed');
    } catch (error) {
      console.log('⚠️  Linting warnings detected');
    }

    // TypeScript check
    console.log('🔍 TypeScript validation...');
    await this.execCommand('npx tsc --noEmit');
    console.log('✅ TypeScript validation passed');

    return true;
  }

  // Build project
  async buildProject(environment) {
    const envConfig = this.config.environments[environment];
    console.log(`🔨 Building for ${environment}...`);
    
    const startTime = Date.now();
    
    try {
      await this.execCommand(envConfig.buildCmd);
      
      const buildTime = ((Date.now() - startTime) / 1000).toFixed(2);
      console.log(`✅ Build completed in ${buildTime}s`);
      
      // Validate build output
      await this.validateBuild(environment);
      
      return true;
    } catch (error) {
      console.error('❌ Build failed:', error);
      throw error;
    }
  }

  // Validate build output
  async validateBuild(environment) {
    console.log('🔍 Validating build output...');
    
    const envConfig = this.config.environments[environment];
    
    // Check dist folder exists
    const distExists = await fs.access('dist').then(() => true).catch(() => false);
    if (!distExists) {
      throw new Error('dist folder not found');
    }

    // Check index.html
    const indexPath = path.join('dist', 'index.html');
    const indexContent = await fs.readFile(indexPath, 'utf-8');
    
    // Verify base path
    if (!indexContent.includes(envConfig.basePath)) {
      throw new Error(`Build doesn't contain correct base path: ${envConfig.basePath}`);
    }

    // Check for source references (should not exist in built files)
    if (indexContent.includes('/src/main.tsx')) {
      throw new Error('Build contains source file references!');
    }

    // Check assets
    const assetsExist = await fs.access('dist/assets').then(() => true).catch(() => false);
    if (!assetsExist) {
      throw new Error('Assets folder not found in build');
    }

    console.log('✅ Build validation passed');
    return true;
  }

  // Create deployment backup
  async createBackup(environment) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupName = `backup-${environment}-${timestamp}`;
    
    console.log(`📦 Creating backup: ${backupName}`);
    
    // Create backups directory
    await fs.mkdir('backups', { recursive: true });
    
    // Get current deployment state
    const currentState = {
      environment,
      timestamp,
      branch: await this.getCurrentBranch(),
      commit: (await this.execCommand('git rev-parse HEAD')).stdout.trim(),
      files: []
    };

    // Store backup info
    await fs.writeFile(
      path.join('backups', `${backupName}.json`),
      JSON.stringify(currentState, null, 2)
    );

    console.log(`✅ Backup created: ${backupName}`);
    return backupName;
  }

  // Deploy to environment
  async deploy(environment, options = {}) {
    console.log(`\n🚀 Starting deployment to ${environment}`);
    console.log('='.repeat(50));
    
    const envConfig = this.config.environments[environment];
    
    try {
      // Create deployment record
      this.currentDeployment = {
        id: crypto.randomBytes(8).toString('hex'),
        environment,
        startTime: Date.now(),
        status: 'in_progress'
      };

      // Step 1: Git status check
      if (!options.force) {
        const continueWithChanges = await this.checkGitStatus();
        if (!continueWithChanges) {
          throw new Error('Deployment cancelled due to uncommitted changes');
        }
      }

      // Step 2: Validate environment
      await this.validateEnvironment(environment);

      // Step 3: Create backup
      const backupId = await this.createBackup(environment);
      this.currentDeployment.backupId = backupId;

      // Step 4: Build
      await this.buildProject(environment);

      // Step 5: Deploy based on environment
      if (environment === 'development') {
        await this.deployToDev();
      } else if (environment === 'production') {
        await this.deployToProduction();
      }

      // Step 6: Health check
      await this.performHealthCheck(envConfig.url);

      // Success
      this.currentDeployment.status = 'success';
      this.currentDeployment.endTime = Date.now();
      this.currentDeployment.duration = this.currentDeployment.endTime - this.currentDeployment.startTime;
      
      console.log('\n✅ Deployment successful!');
      console.log(`📊 Duration: ${(this.currentDeployment.duration / 1000).toFixed(2)}s`);
      console.log(`🌐 URL: ${envConfig.url}`);
      
      // Store deployment history
      this.deploymentHistory.push(this.currentDeployment);
      await this.saveDeploymentHistory();
      
      return this.currentDeployment;
      
    } catch (error) {
      console.error('\n❌ Deployment failed:', error.message);
      
      this.currentDeployment.status = 'failed';
      this.currentDeployment.error = error.message;
      this.currentDeployment.endTime = Date.now();
      
      // Attempt rollback
      if (options.autoRollback) {
        console.log('🔄 Attempting automatic rollback...');
        await this.rollback(this.currentDeployment.backupId);
      }
      
      throw error;
    }
  }

  // Deploy to development
  async deployToDev() {
    console.log('📤 Deploying to development...');
    
    // Copy built files to root
    await this.execCommand('cp dist/index.html .');
    await this.execCommand('cp -r dist/assets .');
    await this.execCommand('cp dist/*.avif . 2>/dev/null || true');
    await this.execCommand('cp dist/*.svg . 2>/dev/null || true');
    
    // Git operations
    await this.execCommand('git add index.html assets/ *.avif *.svg 2>/dev/null || true');
    
    const commitMsg = `🚀 Auto-deploy to dev - ${new Date().toISOString()}`;
    try {
      await this.execCommand(`git commit -m "${commitMsg}"`);
      await this.execCommand('git push origin master');
    } catch (error) {
      if (!error.message.includes('nothing to commit')) {
        throw error;
      }
    }
    
    console.log('✅ Deployed to development');
  }

  // Deploy to production
  async deployToProduction() {
    console.log('📤 Creating production artifact...');
    
    const artifactName = `reboot-media-prod-${Date.now()}.tar.gz`;
    
    // Create artifact
    await this.execCommand(`cd dist && tar -czf ../${artifactName} .`);
    
    console.log(`✅ Production artifact created: ${artifactName}`);
    console.log('📋 Manual deployment required:');
    console.log('1. Upload artifact to production server');
    console.log('2. Extract to web root');
    console.log('3. Verify deployment');
  }

  // Health check
  async performHealthCheck(url, retries = 3) {
    console.log(`🔍 Performing health check: ${url}`);
    
    for (let i = 0; i < retries; i++) {
      try {
        // Wait before checking (allow deployment to propagate)
        if (i > 0) {
          console.log(`⏳ Retry ${i + 1}/${retries}...`);
          await new Promise(resolve => setTimeout(resolve, 10000));
        }
        
        const { stdout } = await this.execCommand(
          `curl -s -o /dev/null -w "%{http_code}" ${url}`
        );
        
        const statusCode = parseInt(stdout.trim());
        
        if (statusCode === 200) {
          console.log(`✅ Health check passed (HTTP ${statusCode})`);
          return true;
        } else {
          console.log(`⚠️ Health check returned HTTP ${statusCode}`);
        }
      } catch (error) {
        console.log(`⚠️ Health check failed: ${error.message}`);
      }
    }
    
    throw new Error('Health check failed after retries');
  }

  // Rollback
  async rollback(backupId) {
    console.log(`🔄 Rolling back to: ${backupId}`);
    
    try {
      // Load backup metadata
      const backupPath = path.join('backups', `${backupId}.json`);
      const backup = JSON.parse(await fs.readFile(backupPath, 'utf-8'));
      
      // Checkout the backup commit
      await this.execCommand(`git checkout ${backup.commit}`);
      
      // Rebuild with backup state
      await this.buildProject(backup.environment);
      
      // Deploy
      if (backup.environment === 'development') {
        await this.deployToDev();
      }
      
      console.log('✅ Rollback completed');
      return true;
    } catch (error) {
      console.error('❌ Rollback failed:', error);
      throw error;
    }
  }

  // Save deployment history
  async saveDeploymentHistory() {
    const historyPath = 'deployment-history.json';
    await fs.writeFile(
      historyPath,
      JSON.stringify(this.deploymentHistory, null, 2)
    );
  }

  // Get deployment status
  getStatus() {
    return {
      current: this.currentDeployment,
      history: this.deploymentHistory.slice(-10) // Last 10 deployments
    };
  }
}

// CLI Interface
if (require.main === module) {
  const agent = new DeploymentAgent();
  
  const args = process.argv.slice(2);
  const command = args[0];
  const environment = args[1] || 'development';
  
  const commands = {
    deploy: async () => {
      await agent.deploy(environment, {
        force: args.includes('--force'),
        autoRollback: args.includes('--auto-rollback')
      });
    },
    status: () => {
      const status = agent.getStatus();
      console.log(JSON.stringify(status, null, 2));
    },
    rollback: async () => {
      const backupId = args[1];
      if (!backupId) {
        console.error('Usage: deploy-agent rollback <backup-id>');
        process.exit(1);
      }
      await agent.rollback(backupId);
    },
    help: () => {
      console.log(`
Reboot Media DevOps Agent

Usage: deploy-agent <command> [environment] [options]

Commands:
  deploy [environment]  Deploy to specified environment (default: development)
  status               Show deployment status
  rollback <backup-id> Rollback to a specific backup
  help                 Show this help message

Environments:
  development  Deploy to dev.rebootmedia.net/reboot/
  staging      Deploy to staging.rebootmedia.net/
  production   Deploy to www.rebootmedia.net/

Options:
  --force         Skip git status check
  --auto-rollback Automatically rollback on failure

Examples:
  deploy-agent deploy development
  deploy-agent deploy production --auto-rollback
  deploy-agent rollback backup-development-2024-01-15
      `);
    }
  };
  
  const cmd = commands[command] || commands.help;
  
  cmd().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = DeploymentAgent;