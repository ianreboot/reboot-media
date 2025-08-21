#!/bin/bash

echo "🔍 Diagnosing production deployment issue..."

ssh ubuntu@44.247.64.96 << 'EOF'
echo "📁 Production build assets:"
ls -la /home/ubuntu/reboot/dist-prod/assets/ | head -5

echo ""
echo "📄 Production index.html content:"
head -30 /home/ubuntu/reboot/dist-prod/index.html | grep -E "(script|link.*css)" 

echo ""
echo "🌐 Current nginx server blocks for rebootmedia:"
grep -A 5 -B 5 "server_name.*rebootmedia" /etc/nginx/sites-available/* 2>/dev/null || echo "No rebootmedia server blocks found"

echo ""
echo "🔗 Enabled nginx sites:"
ls -la /etc/nginx/sites-enabled/ | grep reboot

echo ""
echo "📋 Testing nginx config:"
sudo nginx -t 2>&1 | head -5

EOF

echo ""
echo "🌐 What's currently served:"
curl -L -s http://www.rebootmedia.net/ | grep -E "(script.*src=|link.*css)" | head -3