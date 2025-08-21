#!/bin/bash

echo "🔧 Fixing nginx configuration conflicts..."

ssh ubuntu@44.247.64.96 << 'EOF'
echo "📄 Current enabled sites:"
ls -la /etc/nginx/sites-enabled/ | grep reboot

echo ""
echo "🗑️ Removing conflicting old configuration..."
sudo rm -f /etc/nginx/sites-enabled/rebootmedia

echo "📋 Remaining enabled sites:"
ls -la /etc/nginx/sites-enabled/ | grep reboot

echo ""
echo "🔍 Testing nginx configuration..."
sudo nginx -t

if [ $? -eq 0 ]; then
    echo "✅ Configuration is valid, reloading nginx..."
    sudo systemctl reload nginx
    echo "✅ Nginx reloaded successfully!"
else
    echo "❌ Configuration has errors"
    exit 1
fi
EOF

echo ""
echo "⏳ Waiting for nginx to reload..."
sleep 3

echo "🎯 Testing the fixed production site..."
echo "📄 HTTP response:"
curl -I http://www.rebootmedia.net/ 2>/dev/null | head -3

echo ""
echo "🔍 Asset loading (should show new assets now):"
curl -L -s http://www.rebootmedia.net/ | grep -E "(script.*src=|link.*css)" | head -3