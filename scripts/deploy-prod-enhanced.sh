#!/bin/bash

# Enhanced Production Deployment Script
# For deployment to https://www.rebootmedia.net/

set -e  # Exit on error

echo "🚀 Starting enhanced production deployment..."

# Environment validation
if [[ "$NODE_ENV" != "production" ]]; then
    echo "⚠️  WARNING: NODE_ENV is not set to production"
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Pre-deployment checks
echo "🔍 Running pre-deployment checks..."

# Check for uncommitted changes
if ! git diff-index --quiet HEAD --; then
    echo "❌ Uncommitted changes detected! Please commit first."
    exit 1
fi

# Security scan
echo "🔒 Running security audit..."
npm audit --audit-level=high || {
    echo "❌ Security vulnerabilities found"
    read -p "Continue with deployment? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
}

# Run tests
echo "🧪 Running test suite..."
npm test -- --run || {
    echo "❌ Tests failed"
    exit 1
}

# Build with production environment
echo "🔨 Building for production environment..."
npm run build:prod

# Build validation
echo "✅ Validating build..."
npm run validate

# Generate deployment manifest
echo "📋 Generating deployment manifest..."
cat > dist/DEPLOYMENT_MANIFEST.json << EOF
{
  "deploymentId": "$(date +%Y%m%d-%H%M%S)",
  "timestamp": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "gitCommit": "$(git rev-parse HEAD)",
  "gitBranch": "$(git rev-parse --abbrev-ref HEAD)",
  "nodeVersion": "$(node --version)",
  "npmVersion": "$(npm --version)",
  "environment": "production",
  "buildSize": "$(du -sh dist/ | cut -f1)"
}
EOF

# Create deployment archive
echo "📦 Creating deployment archive..."
DEPLOYMENT_ID="reboot-prod-$(date +%Y%m%d-%H%M%S)"
tar -czf "${DEPLOYMENT_ID}.tar.gz" -C dist .

echo "✅ Production build complete!"
echo "📁 Deployment archive: ${DEPLOYMENT_ID}.tar.gz"
echo "📊 Build size: $(du -sh dist/ | cut -f1)"
echo ""
echo "📋 Next steps:"
echo "1. Upload ${DEPLOYMENT_ID}.tar.gz to production server"
echo "2. Extract to web root: tar -xzf ${DEPLOYMENT_ID}.tar.gz"
echo "3. Verify nginx config includes security headers from nginx-security.conf"
echo "4. Test deployment: curl -I https://www.rebootmedia.net/"
echo "5. Monitor logs for first 15 minutes"
echo ""
echo "🚨 Rollback command (if needed):"
echo "   tar -xzf previous-deployment.tar.gz"
echo ""
echo "🌐 Site will be live at: https://www.rebootmedia.net/"