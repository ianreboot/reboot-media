#!/bin/bash

# Production Server Configuration Script for Reboot Media
# This script configures nginx, SSL, and environment on the production server

set -e

echo "🔧 Configuring Production Server for Reboot Media"
echo "================================================="

# Check if running on the production server
if [ ! -f "/etc/os-release" ]; then
  echo "❌ This script should be run on the production server"
  exit 1
fi

# Update system packages
echo "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install required packages
echo "📦 Installing required packages..."
sudo apt install -y nginx nodejs npm git certbot python3-certbot-nginx ufw fail2ban

# Install Node.js 18+ (if needed)
echo "📦 Checking Node.js version..."
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt "18" ]; then
  echo "📦 Installing Node.js 18..."
  curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
  sudo apt-get install -y nodejs
fi

# Configure firewall
echo "🔥 Configuring firewall..."
sudo ufw --force reset
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw --force enable

# Configure fail2ban
echo "🛡️  Configuring fail2ban..."
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local

# Set up directory structure
echo "📁 Setting up directory structure..."
sudo mkdir -p /var/log/reboot-media
sudo chown $USER:$USER /var/log/reboot-media

# Create deployment user (if doesn't exist)
if ! id "deploy" &>/dev/null; then
  echo "👤 Creating deployment user..."
  sudo adduser --system --group --home /home/deploy deploy
  sudo usermod -aG sudo deploy
fi

# Set up deployment directory
DEPLOY_PATH="/home/ubuntu/reboot"
echo "📁 Setting up deployment directory at $DEPLOY_PATH..."
mkdir -p "$DEPLOY_PATH"
cd "$DEPLOY_PATH"

# Initialize git repository
if [ ! -d .git ]; then
  git init
  git remote add origin https://github.com/ianreboot/reboot-media.git
fi

# Copy nginx configuration
echo "🌐 Setting up nginx configuration..."
sudo cp nginx-production.conf /etc/nginx/sites-available/reboot-media
sudo ln -sf /etc/nginx/sites-available/reboot-media /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Test nginx configuration
sudo nginx -t

# Set up SSL certificate with Let's Encrypt
echo "🔒 Setting up SSL certificate..."
sudo certbot --nginx -d www.rebootmedia.net -d rebootmedia.net --agree-tos --non-interactive --email ian@rebootmedia.net

# Set up environment variables
echo "🔧 Setting up environment variables..."
if [ ! -f .env ]; then
  cp .env.production.template .env
  echo "⚠️  Please edit .env file with your production values"
fi

# Install application dependencies
echo "📦 Installing application dependencies..."
npm install --production

# Build application
echo "🔨 Building application..."
npm run build:prod

# Set up systemd service for the Node.js server
echo "🔧 Setting up systemd service..."
sudo tee /etc/systemd/system/reboot-media.service > /dev/null << EOF
[Unit]
Description=Reboot Media Node.js Server
After=network.target

[Service]
Type=simple
User=$USER
WorkingDirectory=$DEPLOY_PATH
Environment=NODE_ENV=production
ExecStart=/usr/bin/node server/dist/server.js
Restart=always
RestartSec=10
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=reboot-media

[Install]
WantedBy=multi-user.target
EOF

# Enable and start services
echo "🚀 Starting services..."
sudo systemctl daemon-reload
sudo systemctl enable reboot-media
sudo systemctl start reboot-media
sudo systemctl enable nginx
sudo systemctl restart nginx

# Set up log rotation
echo "📝 Setting up log rotation..."
sudo tee /etc/logrotate.d/reboot-media > /dev/null << EOF
/var/log/reboot-media/*.log {
    daily
    missingok
    rotate 14
    compress
    delaycompress
    notifempty
    copytruncate
}
EOF

# Create deployment update script
echo "📝 Creating deployment update script..."
tee update-deployment.sh > /dev/null << EOF
#!/bin/bash
set -e
echo "🔄 Updating Reboot Media deployment..."
git pull origin master
npm install --production
npm run build:prod
sudo systemctl restart reboot-media
sudo systemctl reload nginx
echo "✅ Deployment updated successfully!"
EOF

chmod +x update-deployment.sh

echo ""
echo "✅ Production server configuration complete!"
echo ""
echo "🌐 Your site should be live at: https://www.rebootmedia.net/"
echo ""
echo "📋 Next Steps:"
echo "1. Edit .env file with your production values"
echo "2. Test the deployment with: curl -I https://www.rebootmedia.net/"
echo "3. Monitor logs with: sudo journalctl -u reboot-media -f"
echo "4. Update deployment with: ./update-deployment.sh"
echo ""
echo "🔧 Service Management Commands:"
echo "  sudo systemctl status reboot-media    # Check service status"
echo "  sudo systemctl restart reboot-media   # Restart service"
echo "  sudo journalctl -u reboot-media -f    # View logs"
echo "  sudo nginx -t && sudo systemctl reload nginx  # Reload nginx"