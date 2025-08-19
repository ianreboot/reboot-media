#!/bin/bash

# Production Server Setup Script for Reboot Media
# This script helps configure the production server for deployment

set -e

echo "🔧 Reboot Media Production Server Setup"
echo "========================================="
echo ""

# Check if we have the required information
if [ -z "$PROD_SERVER_IP" ]; then
  echo "⚠️  Production server configuration needed:"
  echo ""
  echo "Please set the following environment variables:"
  echo "  export PROD_SERVER_IP=\"your.server.ip.address\""
  echo "  export PROD_SERVER_USER=\"username\""  
  echo "  export PROD_SERVER_PATH=\"/path/to/deployment\""
  echo ""
  echo "Example:"
  echo "  export PROD_SERVER_IP=\"44.247.64.96\""
  echo "  export PROD_SERVER_USER=\"ubuntu\""
  echo "  export PROD_SERVER_PATH=\"/home/ubuntu/reboot\""
  echo ""
  exit 1
fi

echo "🌐 Production Server: $PROD_SERVER_USER@$PROD_SERVER_IP"
echo "📁 Deployment Path: $PROD_SERVER_PATH"
echo ""

# Test SSH connection
echo "🔐 Testing SSH connection..."
if ssh -o ConnectTimeout=10 -o BatchMode=yes "$PROD_SERVER_USER@$PROD_SERVER_IP" exit; then
  echo "✅ SSH connection successful"
else
  echo "❌ SSH connection failed"
  echo ""
  echo "Please ensure:"
  echo "1. SSH key is set up for passwordless access"
  echo "2. Server is accessible from this machine"
  echo "3. User has sudo privileges on the server"
  echo ""
  exit 1
fi

# Create deployment directory on server
echo "📁 Setting up deployment directory..."
ssh "$PROD_SERVER_USER@$PROD_SERVER_IP" << EOF
  mkdir -p $PROD_SERVER_PATH
  cd $PROD_SERVER_PATH
  
  # Initialize git repository if it doesn't exist
  if [ ! -d .git ]; then
    git init
    git remote add origin https://github.com/ianreboot/reboot-media.git
  fi
  
  echo "✅ Deployment directory ready at $PROD_SERVER_PATH"
EOF

echo ""
echo "✅ Production server setup complete!"
echo ""
echo "Next steps:"
echo "1. Run: npm run deploy:legacy (for automated deployment)"
echo "2. Or run: npm run push-to-production (for manual file transfer)"
echo ""
echo "🌐 Your site will be live at: https://www.rebootmedia.net/"