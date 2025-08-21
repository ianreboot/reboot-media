#!/bin/bash
# Reboot Media - Isolated Dev Deployment
# Builds in separate directory to prevent production environment contamination

set -e  # Exit on error

echo "🚀 Starting Reboot isolated dev deployment..."

# Configuration
PROJECT_NAME="reboot"
BUILD_CACHE="/tmp/${PROJECT_NAME}-dev-build-$(date +%Y%m%d-%H%M%S)"

echo "📁 Build directory: ${BUILD_CACHE}"

# Create isolated build environment
echo "🏗️ Creating isolated build environment..."
rm -rf "${BUILD_CACHE}"
mkdir -p "${BUILD_CACHE}"

# Copy source code (exclude all build artifacts)
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
echo "🔨 Building in isolated dev environment..."
cd "${BUILD_CACHE}"

# Install frontend dependencies
npm install --legacy-peer-deps

# Install server dependencies
echo "📦 Installing server dependencies..."
cd server
npm install --legacy-peer-deps
cd ..

# Prepare dev HTML
cp index.dev.html index.html

# Build dev assets (uses /reboot/ base path)
npm run build:dev

# Validate build
if [ ! -f "dist/index.html" ]; then
    echo "❌ ERROR: Dev build failed - dist/index.html not found"
    exit 1
fi

echo "✅ Build validation passed"

# Create clean deployment files in original project (without contaminating working directory)
echo "📁 Preparing clean deployment files..."
ORIGINAL_PROJECT="/home/ian/projects/reboot"
STAGING_DIR="${ORIGINAL_PROJECT}/.deploy-staging"

# Create staging directory in original project
rm -rf "${STAGING_DIR}"
mkdir -p "${STAGING_DIR}"

# Copy built files to staging (not to root!)
cp dist/index.html "${STAGING_DIR}/"
cp -r dist/assets "${STAGING_DIR}/"
[ -f dist/reboot-media.avif ] && cp dist/reboot-media.avif "${STAGING_DIR}/"
[ -f dist/vite.svg ] && cp dist/vite.svg "${STAGING_DIR}/"

# Go back to original project directory
cd "${ORIGINAL_PROJECT}"

# Move staged files to root for deployment (git will handle these)
echo "📤 Staging files for deployment..."
cp "${STAGING_DIR}/index.html" .
cp -r "${STAGING_DIR}/assets" .
[ -f "${STAGING_DIR}/reboot-media.avif" ] && cp "${STAGING_DIR}/reboot-media.avif" .
[ -f "${STAGING_DIR}/vite.svg" ] && cp "${STAGING_DIR}/vite.svg" .

# Add deployment marker
echo "<!-- Dev deployment: $(date) -->" >> index.html

# Commit and push (this is how dev.rebootmedia.net gets updated)
echo "📤 Committing and pushing to GitHub..."
git add index.html assets/
[ -f reboot-media.avif ] && git add reboot-media.avif
[ -f vite.svg ] && git add vite.svg
git commit -m "Deploy dev build (isolated) - $(date +'%Y-%m-%d %H:%M:%S')" || echo "No changes to commit"
git push origin master

# Cleanup
echo "🧹 Cleaning up build environments..."
rm -rf "${BUILD_CACHE}"
rm -rf "${STAGING_DIR}"

echo ""
echo "✅ Reboot dev deployment completed successfully!"
echo "🌐 Live at: https://dev.rebootmedia.net/reboot/"
echo "📁 Production environment remains untouched"
echo ""