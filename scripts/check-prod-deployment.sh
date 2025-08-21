#!/bin/bash

echo "🔍 Checking production deployment status..."

echo "📁 Files on production server:"
ssh ubuntu@44.247.64.96 "ls -la /home/ubuntu/reboot/dist-prod/ | head -10"

echo ""
echo "📄 Current index.html on server:"
ssh ubuntu@44.247.64.96 "head -5 /home/ubuntu/reboot/dist-prod/index.html"

echo ""
echo "🌐 Checking nginx configuration for www.rebootmedia.net:"
ssh ubuntu@44.247.64.96 "grep -A 10 -B 5 'rebootmedia.net' /etc/nginx/sites-available/default || echo 'No rebootmedia.net config found'"

echo ""
echo "🔄 Checking what nginx is actually serving:"
curl -s https://www.rebootmedia.net/ | head -10