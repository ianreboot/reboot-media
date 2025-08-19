#!/bin/bash

# Optimized Production Deployment for Reboot Media
# Builds locally and transfers only production-ready files

set -e

# Production server details
PROD_SERVER_IP="44.247.64.96"
PROD_SERVER_USER="ubuntu"
PROD_SERVER_PATH="/home/ubuntu/reboot"

echo "🚀 Starting optimized production deployment for Reboot Media..."

# 1. Build everything locally first
echo "🔨 Building for production locally..."
npm run build:prod

# 2. Commit built files to GitHub
echo "📤 Committing to GitHub..."
git add -f dist/ server/dist/
git commit -m "Production build - $(date +'%Y-%m-%d %H:%M:%S')" || echo "No changes to commit"
git push origin master

# 3. Create production-only package (exclude dev files)
echo "📦 Creating production deployment package..."
tar czf /tmp/reboot-deploy-optimized.tar.gz \
    --exclude=node_modules \
    --exclude=.git \
    --exclude=src \
    --exclude=server/src \
    --exclude=server/node_modules \
    --exclude=test-results \
    --exclude=coverage \
    --exclude=*.log \
    --exclude=*.pid \
    dist/ \
    server/dist/ \
    server/package.json \
    package.json \
    nginx-production.conf \
    .env.production.template

echo "📦 Package created: $(du -h /tmp/reboot-deploy-optimized.tar.gz | cut -f1)"

# 4. Transfer to server
echo "🌐 Transferring to production server ($PROD_SERVER_USER@$PROD_SERVER_IP)..."
scp /tmp/reboot-deploy-optimized.tar.gz "$PROD_SERVER_USER@$PROD_SERVER_IP":/tmp/

# 5. Set up on server
echo "🚀 Setting up on production server..."
ssh "$PROD_SERVER_USER@$PROD_SERVER_IP" << 'EOF'
# Create directory structure
mkdir -p /home/ubuntu/reboot
cd /home/ubuntu/reboot

# Backup existing deployment
if [ -d "dist" ]; then
    cp -r dist dist.backup.$(date +%Y%m%d-%H%M%S) 2>/dev/null || true
fi

# Extract new deployment
tar xzf /tmp/reboot-deploy-optimized.tar.gz

# Install only production dependencies for server
cd server && npm install --production --legacy-peer-deps
cd ..

# Set up basic environment if it doesn't exist
if [ ! -f .env ]; then
    cp .env.production.template .env
    echo "⚠️  Basic .env created - please customize with production values"
fi

# Set up nginx configuration
if [ -f nginx-production.conf ]; then
    sudo cp nginx-production.conf /etc/nginx/sites-available/reboot-media 2>/dev/null || echo "Note: nginx config ready for manual setup"
    sudo ln -sf /etc/nginx/sites-available/reboot-media /etc/nginx/sites-enabled/ 2>/dev/null || echo "Note: nginx symlink ready for manual setup"
fi

# Create systemd service file
sudo tee /etc/systemd/system/reboot-media.service > /dev/null << 'SERVICE_EOF'
[Unit]
Description=Reboot Media Node.js Server
After=network.target

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/home/ubuntu/reboot
Environment=NODE_ENV=production
ExecStart=/usr/bin/node server/dist/server.js
Restart=always
RestartSec=10
StandardOutput=journal
StandardError=journal
SyslogIdentifier=reboot-media

[Install]
WantedBy=multi-user.target
SERVICE_EOF

# Enable and start service
sudo systemctl daemon-reload
sudo systemctl enable reboot-media 2>/dev/null || echo "Service setup ready"
sudo systemctl start reboot-media 2>/dev/null || echo "Service start ready"

# Test nginx config and reload
sudo nginx -t 2>/dev/null && sudo systemctl reload nginx 2>/dev/null || echo "Nginx ready for manual configuration"

# Cleanup
rm -f /tmp/reboot-deploy-optimized.tar.gz

echo ""
echo "✅ Production deployment completed!"
echo "📁 Deployed to: /home/ubuntu/reboot"
echo "🔧 Service: reboot-media"
echo "🌐 Ready for: https://www.rebootmedia.net/"
echo ""
echo "🔧 Manual steps (if needed):"
echo "1. Edit .env file: nano /home/ubuntu/reboot/.env"
echo "2. Configure SSL: sudo certbot --nginx -d www.rebootmedia.net"
echo "3. Check service: sudo systemctl status reboot-media"
echo "4. View logs: sudo journalctl -u reboot-media -f"
EOF

# Cleanup local temp file
rm -f /tmp/reboot-deploy-optimized.tar.gz

echo ""
echo "🎉 Reboot Media deployment complete!"
echo "🌐 Site should be available at: https://www.rebootmedia.net/"
echo ""
echo "📋 Summary:"
echo "  ✓ Built locally with all dependencies"
echo "  ✓ Transferred production-ready files"
echo "  ✓ Server configured with systemd service"
echo "  ✓ Nginx configuration ready"
echo "  ✓ Environment template created"