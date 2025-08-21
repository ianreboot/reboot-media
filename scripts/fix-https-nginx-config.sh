#!/bin/bash

echo "🔧 Fixing HTTPS nginx configuration to serve Reboot content..."

ssh ubuntu@44.247.64.96 << 'EOF'
echo "📄 Checking current HTTPS configuration..."
ls -la /etc/nginx/sites-enabled/ | grep -E "(reboot|syncup)"

echo ""
echo "🔍 Looking for HTTPS server blocks..."
grep -r "listen.*443" /etc/nginx/sites-available/ 2>/dev/null | head -5

echo ""
echo "📋 Checking if there's a separate HTTPS config serving SyncUp..."
if [ -f /etc/nginx/sites-available/syncup ]; then
    echo "Found syncup config, checking its server blocks:"
    grep -A5 -B5 "listen.*443" /etc/nginx/sites-available/syncup 2>/dev/null
fi

echo ""
echo "🔧 Updating rebootmedia.net to handle HTTPS as well..."

# Update the nginx configuration to handle both HTTP and HTTPS
sudo tee /etc/nginx/sites-available/rebootmedia.net > /dev/null << 'NGINXEOF'
# HTTP server block (existing)
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
    add_header Content-Security-Policy "frame-ancestors 'none'" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;

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
            add_header X-Frame-Options "DENY" always;
            add_header X-Content-Type-Options "nosniff" always;
        }
        
        # Special handling for HTML files
        location ~* \.html$ {
            expires 1h;
            add_header Cache-Control "public, must-revalidate";
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
        
        add_header X-Frame-Options "DENY" always;
        add_header X-Content-Type-Options "nosniff" always;
    }
}

# HTTPS server block (new - serve same Reboot content)
server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name rebootmedia.net www.rebootmedia.net;

    # Use same SSL cert as other sites (if available)
    ssl_certificate /etc/letsencrypt/live/syncup.spot/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/syncup.spot/privkey.pem;
    
    # SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;

    # SAME ROOT AS HTTP - serve Reboot content
    root /home/ubuntu/reboot/dist-prod;
    index index.html index.htm;

    # Same security headers as HTTP
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Content-Security-Policy "frame-ancestors 'none'" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;

    # Same gzip settings
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Same location blocks as HTTP
    location / {
        try_files $uri $uri/ /index.html;
        
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
            add_header X-Frame-Options "DENY" always;
            add_header X-Content-Type-Options "nosniff" always;
        }
        
        location ~* \.html$ {
            expires 1h;
            add_header Cache-Control "public, must-revalidate";
        }
    }

    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_Set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        add_header X-Frame-Options "DENY" always;
        add_header X-Content-Type-Options "nosniff" always;
    }
}
NGINXEOF

echo ""
echo "🔍 Testing nginx configuration..."
sudo nginx -t

if [ $? -eq 0 ]; then
    echo "✅ Configuration is valid, reloading nginx..."
    sudo systemctl reload nginx
    echo "✅ Nginx reloaded - HTTPS should now serve Reboot content!"
else
    echo "❌ Configuration has errors"
    exit 1
fi

echo ""
echo "📄 Final check - both HTTP and HTTPS should serve Reboot:"
echo "Root directories configured:"
grep -n "root " /etc/nginx/sites-available/rebootmedia.net
EOF

echo ""
echo "⏳ Waiting for nginx to reload..."
sleep 5

echo "🎯 Testing both HTTP and HTTPS..."
echo "📄 HTTP version:"
curl -s "http://www.rebootmedia.net/" | grep "<title>" | head -1

echo "📄 HTTPS version:"
curl -k -s "https://www.rebootmedia.net/" | grep "<title>" | head -1