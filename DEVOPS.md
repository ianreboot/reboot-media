# DevOps Deployment Guide for Reboot Media

## Overview

This repository includes a comprehensive DevOps deployment system with automated builds, deployments, monitoring, and rollback capabilities.

## Quick Start

### Deploy to Development
```bash
npm run devops:deploy:dev
```

### Deploy to Production
```bash
npm run devops:deploy:prod
```

### Check Deployment Status
```bash
npm run devops:status
```

### Monitor Site Health
```bash
npm run monitor:check
```

## Architecture

### Components

1. **Deploy Agent** (`devops/deploy-agent.js`)
   - Automated deployment orchestration
   - Environment validation
   - Build management
   - Rollback capabilities
   - Deployment history tracking

2. **Monitor** (`devops/monitor.js`)
   - Real-time health checks
   - Performance monitoring
   - Alert notifications
   - Metrics collection

3. **GitHub Actions** (`.github/workflows/deploy.yml`)
   - CI/CD pipeline
   - Automated testing
   - Branch-based deployments
   - Release management

## Environments

### Development
- **URL**: https://dev.rebootmedia.net/reboot/
- **Base Path**: `/reboot/`
- **Branch**: `master`
- **Auto-deploy**: Yes (on push to master)
- **Build Command**: `npm run build:dev`

### Production
- **URL**: https://www.rebootmedia.net/
- **Base Path**: `/`
- **Branch**: Tags (`v*`, `release-*`)
- **Auto-deploy**: No (manual approval required)
- **Build Command**: `npm run build:prod`

## Deployment Process

### 1. Development Deployment

The development deployment is fully automated:

```bash
# Automatic deployment on git push
git add .
git commit -m "Your changes"
git push origin master

# Or use DevOps agent
npm run devops:deploy:dev
```

**Process**:
1. Validates git status
2. Runs linting and TypeScript checks
3. Builds with `/reboot/` base path
4. Copies dist files to root
5. Commits and pushes to GitHub
6. GitHub Pages serves from master branch

### 2. Production Deployment

Production requires explicit deployment:

```bash
# Build for production
npm run devops:deploy:prod

# This creates an artifact for manual deployment
# Upload dist/ contents to production server
```

**Process**:
1. Validates environment
2. Builds with `/` base path
3. Creates deployment artifact
4. Requires manual upload to server

## Build Validation

Every build is validated for:
- Correct base paths
- No source file references
- Asset integrity
- HTML structure

```bash
# Validate current build
npm run validate
```

## Monitoring

### Real-time Monitoring
```bash
# Start continuous monitoring
npm run monitor

# Single health check
npm run monitor:check

# View 24-hour summary
npm run monitor:summary
```

### Metrics Tracked
- Response time
- HTTP status codes
- Console errors
- Uptime percentage
- Performance degradation

## Rollback Procedures

### Automatic Rollback
```bash
# Deploy with auto-rollback on failure
node devops/deploy-agent.js deploy production --auto-rollback
```

### Manual Rollback
```bash
# List available backups
ls backups/

# Rollback to specific backup
npm run devops:rollback backup-development-2024-01-15
```

## GitHub Actions CI/CD

### Workflow Triggers

1. **Push to master**: Deploy to development
2. **Create tag**: Deploy to production
3. **Pull request**: Run tests only
4. **Manual dispatch**: Deploy to any environment

### Workflow Jobs

1. **Validate**: Linting, TypeScript, build test
2. **Deploy-dev**: Automatic deployment to dev
3. **Deploy-prod**: Create production artifact
4. **Health-check**: Verify deployment success
5. **Notify-failure**: Alert on failures

## Troubleshooting

### Common Issues

#### 1. MIME Type Error
**Symptom**: "Loading module from .../src/main.tsx was blocked"

**Cause**: Development source files referenced in production

**Fix**:
```bash
npm run devops:deploy:dev
```

#### 2. 404 on Routes
**Symptom**: Routes return 404

**Cause**: Wrong base path in build

**Fix**:
```bash
# For dev
npm run build:dev

# For prod
npm run build:prod
```

#### 3. Build Validation Fails
**Symptom**: "Build doesn't contain correct base path"

**Fix**:
```bash
# Check current mode
npm run validate

# Rebuild with correct mode
npm run build:dev  # or build:prod
```

## Best Practices

### 1. Pre-deployment Checklist
- [ ] All tests passing
- [ ] No console errors locally
- [ ] Responsive design verified
- [ ] SEO meta tags updated
- [ ] Performance optimized

### 2. Deployment Safety
- Always create backups before deployment
- Use `--auto-rollback` for production
- Monitor after deployment
- Keep previous build artifacts

### 3. Branch Strategy
- `master`: Development deployments
- `staging`: Staging environment (optional)
- `v*` tags: Production releases
- Feature branches: PR previews

## Configuration Files

### `vite.config.ts`
Controls build paths based on environment:
```typescript
const base = isDev ? '/reboot/' : '/'
```

### `index.dev.html`
Development HTML template with `/reboot/` paths

### `index.prod.html`
Production HTML template with `/` paths

### `scripts/validate-build.js`
Validates build output for correct environment

## Security Considerations

1. **Secrets Management**
   - Never commit API keys or secrets
   - Use environment variables
   - Store secrets in GitHub Secrets

2. **Access Control**
   - Limit deployment permissions
   - Use protected branches
   - Require PR reviews

3. **Monitoring**
   - Set up alerts for failures
   - Monitor for security vulnerabilities
   - Regular dependency updates

## Emergency Procedures

### Site Down
1. Check deployment status: `npm run devops:status`
2. Run health check: `npm run monitor:check`
3. Check recent commits: `git log --oneline -10`
4. Rollback if needed: `npm run devops:rollback [backup-id]`

### Performance Issues
1. Check metrics: `npm run monitor:summary`
2. Analyze build size: `ls -lh dist/assets/`
3. Review recent changes: `git diff HEAD~1`
4. Consider rollback to last known good state

## Support

For deployment issues:
1. Check deployment logs
2. Verify build validation
3. Review this documentation
4. Check GitHub Actions logs

## Future Enhancements

- [ ] Blue-green deployments
- [ ] Canary releases
- [ ] A/B testing support
- [ ] CDN integration
- [ ] Database migrations
- [ ] Kubernetes deployment
- [ ] Terraform infrastructure