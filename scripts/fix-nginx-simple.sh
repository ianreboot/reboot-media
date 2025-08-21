#!/bin/bash

echo "🔧 Setting up simple HTTP nginx config for www.rebootmedia.net..."

# Copy the simple config
scp /tmp/rebootmedia-nginx-simple.conf ubuntu@44.247.64.96:/tmp/

# Apply on server
ssh ubuntu@44.247.64.96 << 'EOF'
echo "📄 Installing nginx config..."
sudo cp /tmp/rebootmedia-nginx-simple.conf /etc/nginx/sites-available/rebootmedia.net

echo "🔗 Enabling site..."
sudo ln -sf /etc/nginx/sites-available/rebootmedia.net /etc/nginx/sites-enabled/

echo "🔍 Testing nginx configuration..."
sudo nginx -t

if [ $? -eq 0 ]; then
    echo "✅ Nginx config is valid, reloading..."
    sudo systemctl reload nginx
    echo "✅ Nginx reloaded successfully!"
else
    echo "❌ Nginx config has errors"
    sudo nginx -t 2>&1
    exit 1
fi

echo "🧹 Cleanup..."
rm -f /tmp/rebootmedia-nginx-simple.conf

EOF

echo ""
echo "🎯 Testing the production site..."
sleep 2

echo "📄 Checking HTTP response:"
curl -I http://www.rebootmedia.net/ | head -5

echo ""
echo "🔍 Checking asset loading:"
curl -s http://www.rebootmedia.net/ | grep -E "(script.*src=|link.*css)" | head -3