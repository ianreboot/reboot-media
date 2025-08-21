#!/bin/bash

echo "🚀 Complete production setup for www.rebootmedia.net..."

# Copy nginx config to server
echo "📤 Copying nginx configuration to server..."
scp /tmp/rebootmedia-nginx.conf ubuntu@44.247.64.96:/tmp/

# Setup on production server
echo "🔧 Setting up nginx on production server..."
ssh ubuntu@44.247.64.96 << 'EOF'

echo "📄 Adding nginx configuration..."
sudo cp /tmp/rebootmedia-nginx.conf /etc/nginx/sites-available/rebootmedia.net

echo "🔗 Enabling site..."
sudo ln -sf /etc/nginx/sites-available/rebootmedia.net /etc/nginx/sites-enabled/

echo "🔍 Testing nginx configuration..."
sudo nginx -t

if [ $? -eq 0 ]; then
    echo "✅ Nginx config is valid, reloading..."
    sudo systemctl reload nginx
    echo "✅ Nginx reloaded successfully!"
else
    echo "❌ Nginx config has errors, please check"
    exit 1
fi

echo "📋 Current nginx sites enabled:"
ls -la /etc/nginx/sites-enabled/

echo "🧹 Cleaning up..."
rm -f /tmp/rebootmedia-nginx.conf

echo "✅ Production nginx setup complete!"

EOF

echo ""
echo "🎉 Setup complete! Testing the site..."
sleep 2
curl -I https://www.rebootmedia.net/ | head -5