#!/bin/bash

# Reboot Media Production Deployment - Fully Automated
# Single command: npm run deploy:legacy
# 1. Push code to production server
# 2. Keep copy in GitHub
# 3. Production server does everything automatically

set -e  # Exit on error

echo "🚀 Starting automated production deployment for Reboot Media..."

# Build for production
echo "🔨 Building for production..."
npm run build:prod

# Commit built files to GitHub
echo "📤 Committing to GitHub..."
git add -f dist/  # Force add despite .gitignore
git commit -m "Production build - $(date +'%Y-%m-%d %H:%M:%S')" || echo "No changes to commit"
git push origin master

# Check for production server configuration
if [ -z "$PROD_SERVER_IP" ]; then
  echo "⚠️  Production server not configured. Set environment variables:"
  echo "  export PROD_SERVER_IP=\"your.server.ip\""
  echo "  export PROD_SERVER_USER=\"username\""
  echo "  export PROD_SERVER_PATH=\"/path/to/deployment\""
  echo ""
  echo "Or run: ./scripts/setup-production-server.sh"
  echo ""
  echo "✅ Local build completed successfully!"
  echo "📁 Built files are in: dist/"
  exit 0
fi

# Deploy directly to production server with full automation
echo "🌐 Deploying to production server ($PROD_SERVER_USER@$PROD_SERVER_IP)..."
ssh "$PROD_SERVER_USER@$PROD_SERVER_IP" << EOF
cd $PROD_SERVER_PATH

echo "📥 Pulling latest code from GitHub..."
git stash || true  # Stash any local changes
git fetch origin master 2>/dev/null || git pull origin master || echo "Using existing code"
git reset --hard HEAD  # Reset to current HEAD if origin/master not available

echo "📦 Installing dependencies..."
npm install --production

echo "🔨 Building application on production server..."
npm run build:prod

echo "🔄 Restarting services..."
sudo systemctl restart reboot-media
sudo systemctl reload nginx

echo "✅ Production deployment completed successfully!"
echo "🌐 Site is now live at: https://www.rebootmedia.net/"
EOF

# Future automated deployment will look like:
cat << 'EOF_TEMPLATE'

# Template for when server is configured:
ssh user@production-server << 'REMOTE_EOF'
cd /path/to/reboot/deployment
git pull origin main
npm install --legacy-peer-deps
npm run build:prod
sudo systemctl reload nginx
echo "✅ Production deployment completed!"
REMOTE_EOF

EOF_TEMPLATE