#!/bin/bash
# Reboot Media - Isolated Production Deployment
# Builds in separate directory to prevent dev environment contamination

set -e  # Exit on error

echo "🚀 Starting Reboot isolated production deployment..."

# Configuration
PROJECT_NAME="reboot"
BUILD_CACHE="/tmp/${PROJECT_NAME}-production-build-$(date +%Y%m%d-%H%M%S)"
PROD_SERVER_IP="44.247.64.96"
PROD_SERVER_USER="ubuntu"
PROD_SERVER_PATH="/home/ubuntu/reboot"

echo "📁 Build directory: ${BUILD_CACHE}"

# Create isolated build environment
echo "🏗️ Creating isolated build environment..."
rm -rf "${BUILD_CACHE}"
mkdir -p "${BUILD_CACHE}"

# Copy source code (exclude all build artifacts and dev files)
echo "📋 Copying source code to isolated environment..."
rsync -av --exclude='node_modules' \
           --exclude='dist*' \
           --exclude='*.log' \
           --exclude='*.pid' \
           --exclude='.git' \
           --exclude='coverage' \
           --exclude='test-results' \
           --exclude='accessibility-*.html' \
           --exclude='bundle-*.html' \
           --exclude='performance-*.html' \
           --exclude='real-cwv-*.html' \
    /home/ian/projects/reboot/ "${BUILD_CACHE}/"

# Build in complete isolation
echo "🔨 Building in isolated environment..."
cd "${BUILD_CACHE}"

# Install frontend dependencies
npm install --legacy-peer-deps

# Install server dependencies  
echo "📦 Installing server dependencies..."
cd server
npm install --legacy-peer-deps
cd ..

# Prepare production HTML
cp index.prod.html index.html

# Build production assets
NODE_ENV=production npm run build:prod

# Validate build
if [ ! -f "dist-prod/index.html" ]; then
    echo "❌ ERROR: Production build failed - dist-prod/index.html not found"
    exit 1
fi

echo "✅ Build validation passed"

# Create deployment package
echo "📦 Creating deployment package..."
DEPLOY_PACKAGE="/tmp/reboot-isolated-deploy-$(date +%Y%m%d-%H%M%S).tar.gz"
tar czf "${DEPLOY_PACKAGE}" \
    --exclude=node_modules \
    --exclude=.git \
    --exclude=src \
    --exclude='scripts/*.sh' \
    --exclude='*.log' \
    .

# Deploy to production server
echo "🌐 Deploying to production server (${PROD_SERVER_USER}@${PROD_SERVER_IP})..."
scp "${DEPLOY_PACKAGE}" "${PROD_SERVER_USER}@${PROD_SERVER_IP}":/tmp/

echo "🚀 Installing on production server..."
ssh "${PROD_SERVER_USER}@${PROD_SERVER_IP}" << EOF
cd ${PROD_SERVER_PATH}

echo "📦 Creating backup of current deployment..."
if [ -d "dist-prod" ]; then
    cp -r dist-prod dist-prod.backup.\$(date +%Y%m%d-%H%M%S) 2>/dev/null || true
fi

echo "📥 Extracting new deployment..."
tar xzf /tmp/$(basename ${DEPLOY_PACKAGE})

echo "📦 Installing production dependencies..."
npm install --production --legacy-peer-deps

echo "🔍 Validating deployment..."
if ! grep -q "Reboot Media" dist-prod/index.html; then
    echo "❌ VALIDATION FAILED: Missing Reboot Media branding"
    exit 1
fi

if grep -q "syncup\|SyncUp" dist-prod/ 2>/dev/null; then
    echo "❌ CONTAMINATION DETECTED: SyncUp content found"
    exit 1
fi

echo "✅ Deployment validation passed"

echo "🔄 Restarting services..."
sudo systemctl restart reboot-media
sudo systemctl reload nginx

echo "🧹 Cleaning up temporary files..."
rm -f /tmp/$(basename ${DEPLOY_PACKAGE})

echo "✅ Production deployment completed successfully!"
echo "🌐 Site is now live at: https://www.rebootmedia.net/"
EOF

# Cleanup local build environment
echo "🧹 Cleaning up local build environment..."
rm -rf "${BUILD_CACHE}"
rm -f "${DEPLOY_PACKAGE}"

echo ""
echo "✅ Reboot production deployment completed successfully!"
echo "🌐 Live at: https://www.rebootmedia.net/"
echo "📁 Your development environment remains untouched"
echo ""