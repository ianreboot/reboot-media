#!/bin/bash

echo "🔧 Fixing production nginx configuration for rebootmedia.net..."

ssh ubuntu@44.247.64.96 << 'EOF'
echo "📄 Current nginx configuration status:"
ls -la /etc/nginx/sites-enabled/ | grep -E "(reboot|syncup)"

echo ""
echo "📋 Checking current rebootmedia.net configuration:"
if [ -f /etc/nginx/sites-available/rebootmedia.net ]; then
    echo "Current root directory in rebootmedia.net:"
    grep "root " /etc/nginx/sites-available/rebootmedia.net
else
    echo "❌ rebootmedia.net config file not found"
fi

echo ""
echo "🔧 Updating nginx configuration to point to correct directory..."

# Create the correct nginx configuration for rebootmedia.net
sudo tee /etc/nginx/sites-available/rebootmedia.net > /dev/null << 'NGINXEOF'
server {
    listen 80;
    listen [::]:80;
    server_name rebootmedia.net www.rebootmedia.net;

    root /home/ubuntu/reboot/dist-prod;
    index index.html index.htm;

    # Security headers
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Handle React Router (SPA)
    location / {
        try_files $uri $uri/ /index.html;
        
        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }

    # API endpoints (if any)
    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
NGINXEOF

echo ""
echo "🔍 Testing nginx configuration..."
sudo nginx -t

if [ $? -eq 0 ]; then
    echo "✅ Configuration is valid, reloading nginx..."
    sudo systemctl reload nginx
    echo "✅ Nginx reloaded successfully!"
    
    echo ""
    echo "📄 Verifying the root directory is now correct:"
    grep "root " /etc/nginx/sites-available/rebootmedia.net
    
    echo ""
    echo "📁 Checking if the reboot dist-prod directory exists:"
    ls -la /home/ubuntu/reboot/dist-prod/ | head -5
else
    echo "❌ Configuration has errors"
    exit 1
fi
EOF

echo ""
echo "⏳ Waiting for nginx to reload..."
sleep 5

echo "🎯 Testing the fixed production site..."
echo "📄 HTTP response:"
curl -I http://www.rebootmedia.net/ 2>/dev/null | head -3

echo ""
echo "🔍 Content check (should now show Reboot Media):"
curl -s http://www.rebootmedia.net/ | grep -E "(title)" | head -2