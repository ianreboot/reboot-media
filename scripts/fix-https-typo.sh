#!/bin/bash

echo "🔧 Fixing nginx configuration typo and HTTPS routing..."

ssh ubuntu@44.247.64.96 << 'EOF'
echo "🔧 Fixing the typo in nginx config..."

# Fix the nginx configuration with correct syntax
sudo tee /etc/nginx/sites-available/rebootmedia.net > /dev/null << 'NGINXEOF'
# HTTP server block
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
        
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }

    # API endpoints
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

# HTTPS server block - serve Reboot content
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name rebootmedia.net www.rebootmedia.net;

    # Use existing SSL cert
    ssl_certificate /etc/letsencrypt/live/syncup.spot/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/syncup.spot/privkey.pem;
    
    # SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;

    # CRITICAL: Same root as HTTP to serve Reboot content
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
        
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }

    # API endpoints
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
else
    echo "❌ Configuration still has errors"
    exit 1
fi

echo ""
echo "📋 Verifying both server blocks point to Reboot:"
grep -n "root.*reboot" /etc/nginx/sites-available/rebootmedia.net
EOF

echo ""
echo "⏳ Waiting for nginx to reload..."
sleep 5

echo "🎯 Final test - both should now serve Reboot Media:"
echo "📄 HTTP:"
curl -s "http://www.rebootmedia.net/" | grep "<title>"

echo "📄 HTTPS:"
curl -k -s "https://www.rebootmedia.net/" | grep "<title>"