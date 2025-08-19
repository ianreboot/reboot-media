#!/bin/bash

# Reboot Media Simple Production Deployment - Direct File Transfer
# This approach copies files directly to the server instead of using git pull

set -e  # Exit on error

echo "🚀 Starting simple production deployment for Reboot Media..."

# Build locally first
echo "🔨 Building for production locally..."
npm run build:prod

# Commit to GitHub (for backup)
echo "📤 Committing to GitHub..."
git add -f dist/  # Force add despite .gitignore
git commit -m "Production build - $(date +'%Y-%m-%d %H:%M:%S')" || echo "No changes to commit"
git push origin master

# Create a deployment package
echo "📦 Creating deployment package..."
tar czf /tmp/reboot-deploy.tar.gz \
    --exclude=node_modules \
    --exclude=.git \
    --exclude=server/node_modules \
    --exclude=test-results \
    --exclude=coverage \
    --exclude=accessibility-* \
    --exclude=bundle-* \
    --exclude=performance-* \
    --exclude=real-cwv-* \
    --exclude=server-*.log \
    --exclude=*.pid \
    .

# Check for production server configuration
if [ -z "$PROD_SERVER_IP" ]; then
  echo "📦 Deployment package created: /tmp/reboot-deploy.tar.gz"
  echo ""
  echo "⚠️  Production server not configured. Set environment variables:"
  echo "  export PROD_SERVER_IP=\"your.server.ip\""
  echo "  export PROD_SERVER_USER=\"username\""
  echo "  export PROD_SERVER_PATH=\"/path/to/deployment\""
  echo ""
  echo "Or run: ./scripts/setup-production-server.sh"
  echo ""
  echo "📄 Manual deployment steps:"
  echo "   1. scp /tmp/reboot-deploy.tar.gz user@server:/tmp/"
  echo "   2. ssh user@server"
  echo "   3. cd /path/to/deployment && tar xzf /tmp/reboot-deploy.tar.gz"
  echo "   4. npm install --production"
  echo "   5. sudo systemctl restart reboot-media && sudo systemctl reload nginx"
  echo ""
  echo "✅ Local build and package creation completed!"
  echo "🌐 Target URL: https://www.rebootmedia.net/"
  exit 0
fi

# Transfer and deploy
echo "🌐 Transferring files to production server ($PROD_SERVER_USER@$PROD_SERVER_IP)..."
scp /tmp/reboot-deploy.tar.gz "$PROD_SERVER_USER@$PROD_SERVER_IP":/tmp/

echo "🚀 Installing on production server..."
ssh "$PROD_SERVER_USER@$PROD_SERVER_IP" << EOF
cd $PROD_SERVER_PATH

echo "📦 Backing up current deployment..."
cp -r dist dist.backup.\$(date +%Y%m%d-%H%M%S) 2>/dev/null || true

echo "📥 Extracting new deployment..."
tar xzf /tmp/reboot-deploy.tar.gz

echo "📦 Installing dependencies..."
npm install --production

echo "🔨 Building application..."
npm run build:prod

echo "🔄 Restarting services..."
sudo systemctl restart reboot-media
sudo systemctl reload nginx

echo "🧹 Cleaning up..."
rm -f /tmp/reboot-deploy.tar.gz

echo "✅ Production deployment completed successfully!"
echo "🌐 Site is now live at: https://www.rebootmedia.net/"
EOF

# Cleanup local temp file when ready
# rm -f /tmp/reboot-deploy.tar.gz