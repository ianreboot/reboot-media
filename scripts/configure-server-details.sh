#!/bin/bash

# Configure production server details for Reboot Media
# Same server as syncup project

export PROD_SERVER_IP="44.247.64.96"
export PROD_SERVER_USER="ubuntu"
export PROD_SERVER_PATH="/home/ubuntu/reboot"

echo "✅ Production server configured:"
echo "   Server: $PROD_SERVER_USER@$PROD_SERVER_IP"
echo "   Path: $PROD_SERVER_PATH"
echo ""
echo "🚀 Ready for deployment!"
echo "   Run: npm run deploy:legacy"
echo "   Or:  npm run push-to-production"