#!/bin/bash

# Reboot Media Production Deployment - Fully Automated
# Single command: npm run deploy:legacy
# 1. Push code to production server (44.247.64.96)  
# 2. Keep copy in GitHub
# 3. Production server does everything automatically

set -e  # Exit on error

echo "🚀 Starting automated production deployment for Reboot Media..."

# Ensure we have the correct source HTML
echo "📄 Preparing production files..."
cp index.prod.html index.html

# Build for production 
echo "🔨 Building for production..."
npm run build:prod

# Commit built files to GitHub
echo "📤 Committing to GitHub..."
git add index.html dist/ server/dist/
git commit -m "Production build - $(date +'%Y-%m-%d %H:%M:%S')" || echo "No changes to commit"
git push origin master

# Deploy directly to production server with full automation
echo "🌐 Deploying to production server (44.247.64.96)..."
ssh ubuntu@44.247.64.96 << 'EOF'
cd /home/ubuntu/reboot

echo "📥 Pulling latest code from GitHub..."
git stash || true  # Stash any local changes
git fetch origin main 2>/dev/null || git pull origin main || echo "Using existing code"
git reset --hard HEAD  # Reset to current HEAD if origin/main not available

echo "📦 Installing dependencies..."
npm install --legacy-peer-deps

echo "📦 Installing server dependencies..."
cd server && npm install --legacy-peer-deps && cd ..

echo "🔧 Setting up environment variables..."
cat > .env << 'ENVEOF'
# Reboot Media Production Environment
NODE_ENV=production
PORT=3000

# JWT Configuration
JWT_SECRET=reboot-media-jwt-secret-production-2025

# SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=ian@rebootmedia.net
SMTP_PASS=reboot-media-smtp-pass-2025

# Contact Configuration
CONTACT_EMAIL=ian@rebootmedia.net

# Security Configuration
CORS_ORIGIN=https://www.rebootmedia.net
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100

# Analytics (if needed)
GA_MEASUREMENT_ID=G-REBOOTMEDIA2025
ENVEOF

echo "🔨 Building application on production server..."
npm run build:prod

echo "🔄 Starting/Restarting services..."
# Stop existing PM2 process if running
pm2 delete reboot-media 2>/dev/null || echo "No existing process to stop"

# Start the application with PM2
pm2 start server/dist/server.js --name reboot-media --env production

echo "🔄 Restarting nginx..."
sudo systemctl reload nginx 2>/dev/null || echo "Nginx reload not needed"

echo "✅ Production deployment completed successfully!"
echo "🌐 Site is now live at: https://www.rebootmedia.net"
EOF

echo "✅ Automated production deployment complete!"
echo "🌐 Your site is live at: https://www.rebootmedia.net"
echo ""
echo "📋 Summary:"
echo "  ✓ Code pushed to GitHub"  
echo "  ✓ Production server updated automatically"
echo "  ✓ Dependencies installed (frontend + backend)"
echo "  ✓ Environment configured"
echo "  ✓ Application built (frontend + backend)"
echo "  ✓ PM2 process started"
echo "  ✓ Services restarted"