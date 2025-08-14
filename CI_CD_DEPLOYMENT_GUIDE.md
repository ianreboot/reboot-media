# CI/CD Pipeline & Deployment Guide

## Overview

This comprehensive CI/CD pipeline implements production-grade deployment practices for the Reboot Media high-performance marketing website with zero-downtime blue-green deployment, comprehensive quality gates, and full observability.

## 🚀 Quick Start

### Development Workflow
```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and push
git add .
git commit -m "feat: implement new feature"
git push origin feature/new-feature

# Create PR - triggers automatic validation and preview deployment
```

### Production Deployment
```bash
# Merge to main branch triggers staging deployment
git checkout main
git pull origin main

# Manual approval required for production deployment
# Use GitHub Actions UI or:
gh workflow run ci-cd-pipeline.yml -f environment=production
```

## 🏗️ Pipeline Architecture

### Stage 1: Security & Quality Gates
- **Security Audit**: Dependency vulnerability scanning
- **TypeScript Compilation**: Zero-error compilation requirement
- **Code Quality**: ESLint validation with error thresholds
- **Test Coverage**: Minimum 80% coverage for production
- **Bundle Analysis**: Performance budget enforcement (300KB limit)

### Stage 2: Build & Package  
- **Multi-environment builds**: Development and production configurations
- **Docker containerization**: Secure, optimized production images
- **Artifact management**: Automated versioning and storage
- **Performance validation**: Core Web Vitals compliance

### Stage 3: Deployment Strategy
- **Staging**: Automatic deployment for validation
- **Production**: Manual approval + Blue-Green deployment
- **Rollback**: Automated failure detection and rollback
- **Health Monitoring**: Comprehensive post-deployment validation

## 📋 Quality Gates

### Mandatory Checks (Cannot be bypassed)
```yaml
✅ TypeScript compilation: Zero errors
✅ Security audit: Max 5 moderate/high vulnerabilities  
✅ Test coverage: Minimum 80%
✅ Bundle size: Maximum 300KB
✅ ESLint: Zero errors (warnings allowed up to 10)
✅ Core Web Vitals: All metrics in "Good" range
```

### Quality Thresholds
| Metric | Staging | Production |
|--------|---------|------------|
| Test Coverage | 70% | 80% |
| Bundle Size | 350KB | 300KB |
| Vulnerabilities | 10 | 5 |
| Build Time | 10min | 8min |
| LCP | 3000ms | 2500ms |
| FID | 150ms | 100ms |
| CLS | 0.15 | 0.10 |

## 🔄 Blue-Green Deployment

### Process Flow
1. **Deploy to Inactive Slot**: New version deployed to green/blue environment
2. **Health Validation**: Comprehensive health checks and smoke tests
3. **Traffic Switch**: Load balancer switches traffic to new environment
4. **Monitoring Period**: 60-second observation period
5. **Cleanup**: Old environment stopped after successful validation

### Manual Blue-Green Operations
```bash
# Deploy specific version
./scripts/deploy-blue-green.sh --version v20240115-abc1234 --environment production

# Rollback deployment
./scripts/deploy-blue-green.sh --rollback --environment production

# Dry run (see what would happen)
./scripts/deploy-blue-green.sh --version v20240115-abc1234 --dry-run
```

## 📊 Monitoring & Observability

### Health Check Endpoints
```
GET /api/health          # Basic health status
GET /api/ready           # Readiness probe  
GET /api/live            # Liveness probe
GET /api/metrics         # Prometheus metrics
GET /api/metrics/business # Business KPIs
```

### Key Metrics Monitored
- **SLIs**: Availability (99.9%), Latency (P95 < 200ms), Error Rate (< 0.1%)
- **Infrastructure**: CPU, Memory, Disk, Network
- **Business**: Lead conversion rate, Form submissions, Page views
- **Security**: Failed logins, Rate limiting, SSL certificate expiry

### Alert Channels
- **Critical**: PagerDuty + Slack + Email + SMS
- **Warnings**: Slack + Email  
- **Business**: Marketing team notifications
- **Security**: Security team immediate alerts

## 🔐 Security Implementation

### Pipeline Security
- **Secret management**: GitHub Secrets integration
- **Image scanning**: Vulnerability assessment of Docker images
- **SAST**: Static application security testing
- **Dependency audit**: Automated vulnerability detection
- **Access control**: Role-based deployment permissions

### Runtime Security
- **Security headers**: CSP, HSTS, X-Frame-Options
- **Rate limiting**: API protection and DDoS mitigation  
- **SSL/TLS**: Certificate automation and monitoring
- **Input validation**: XSS and injection prevention

## 📈 Performance Optimization

### Build Optimizations
- **Bundle splitting**: Vendor vs application code separation
- **Code splitting**: Route-based lazy loading
- **Tree shaking**: Unused code elimination
- **Asset optimization**: Image compression and modern formats
- **Caching strategy**: Aggressive caching with cache busting

### Runtime Performance
- **CDN integration**: Global content distribution
- **Compression**: Gzip/Brotli compression
- **Caching headers**: Browser and proxy caching
- **Performance monitoring**: Real User Monitoring (RUM)

## 🔧 Development Environment

### Local Development
```bash
# Start full development stack
npm run dev

# Run with specific environment
NODE_ENV=development npm run dev

# Build for development
npm run build:dev
```

### Testing
```bash
# Unit tests
npm run test

# Coverage report
npm run test:coverage

# End-to-end tests (Cypress/Playwright)
npm run test:e2e
```

## 🚨 Incident Response

### Automatic Rollback Triggers
- Error rate > 1% for 5 minutes
- P95 latency > 1000ms for 10 minutes  
- Availability < 99% for 2 minutes
- Health check failures

### Manual Rollback Process
1. **Immediate**: `./scripts/deploy-blue-green.sh --rollback`
2. **Verification**: Health checks and monitoring
3. **Communication**: Status page and stakeholder notification
4. **Post-incident**: Root cause analysis and improvements

### Emergency Contacts
- **On-call Engineer**: PagerDuty escalation
- **DevOps Team**: Slack #critical-alerts
- **Business Impact**: Marketing team notification

## 📋 Environment Configuration

### Staging Environment
- **URL**: https://staging.rebootmedia.net
- **Auto-deployment**: On develop branch commits
- **Purpose**: Final validation before production
- **Data**: Anonymized production data subset
- **Monitoring**: Full monitoring stack enabled

### Production Environment  
- **URL**: https://www.rebootmedia.net
- **Deployment**: Manual approval required
- **SLA**: 99.9% availability target
- **Backup**: Automated daily backups
- **Scaling**: Auto-scaling enabled

## 🔄 CI/CD Workflow Files

### Main Pipeline
- `.github/workflows/ci-cd-pipeline.yml`: Complete CI/CD process
- `.github/workflows/feature-branch-validation.yml`: PR validation
- `.github/workflows/monitoring-alerts.yml`: Production monitoring

### Environment Configuration
- `.github/environments/staging.yml`: Staging environment config
- `.github/environments/production.yml`: Production environment config

### Infrastructure
- `docker/docker-compose.production.yml`: Production stack
- `docker/docker-compose.staging.yml`: Staging stack
- `docker/Dockerfile.prod`: Production container image

## 📚 Runbooks

### Deployment Failure
1. Check pipeline logs in GitHub Actions
2. Verify quality gates and test results
3. Check for dependency conflicts
4. Review recent code changes
5. Execute rollback if critical

### Performance Degradation
1. Check Grafana dashboards for metrics
2. Review application logs for errors
3. Verify infrastructure resource utilization
4. Check for traffic spikes or unusual patterns
5. Scale resources if needed

### Security Incident
1. Immediate assessment of threat level
2. Check security monitoring dashboards
3. Review access logs and authentication patterns
4. Implement temporary security measures
5. Coordinate with security team

## 🎯 SLA Targets

### Availability
- **Target**: 99.9% uptime (43.2 minutes downtime/month)
- **Measurement**: 5-minute intervals
- **Alerting**: < 99.5% triggers warning

### Performance
- **Response Time**: P95 < 200ms, P99 < 500ms
- **Core Web Vitals**: LCP < 2.5s, FID < 100ms, CLS < 0.1
- **Error Rate**: < 0.1% of all requests

### Business Metrics
- **Lead Form Availability**: 99.95% uptime
- **Conversion Tracking**: 100% accuracy
- **Marketing Attribution**: Real-time data processing

## 🔮 Future Enhancements

### Planned Improvements
- **Canary deployments**: Gradual traffic shifting
- **Chaos engineering**: Automated resilience testing
- **Multi-region deployment**: Global availability
- **Advanced A/B testing**: Machine learning optimization
- **Predictive scaling**: AI-driven resource management

### Technical Debt Tracking
- Regular dependency updates
- Performance optimization opportunities
- Security enhancement backlog
- Monitoring coverage gaps

---

## 📞 Support & Contact

- **DevOps Team**: devops@rebootmedia.net
- **On-Call Support**: PagerDuty escalation
- **Documentation**: Internal wiki and runbooks
- **Status Page**: https://status.rebootmedia.net

This comprehensive CI/CD pipeline ensures reliable, secure, and high-performance deployments while maintaining the marketing website's critical business functions and exceptional user experience.