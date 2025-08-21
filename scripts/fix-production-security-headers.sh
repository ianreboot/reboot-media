#!/bin/bash

echo "🔧 Adding proper security headers to nginx configuration..."

ssh ubuntu@44.247.64.96 << 'EOF'
echo "📄 Updating nginx configuration with proper security headers..."

# Create the updated nginx configuration with security headers
sudo tee /etc/nginx/sites-available/rebootmedia.net > /dev/null << 'NGINXEOF'
server {
    listen 80;
    listen [::]:80;
    server_name rebootmedia.net www.rebootmedia.net;

    root /home/ubuntu/reboot/dist-prod;
    index index.html index.htm;

    # Security headers (set via HTTP headers, not meta tags)
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
            # Re-add security headers for assets
            add_header X-Frame-Options "DENY" always;
            add_header X-Content-Type-Options "nosniff" always;
        }
        
        # Special handling for HTML files
        location ~* \.html$ {
            expires 1h;
            add_header Cache-Control "public, must-revalidate";
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
        
        # Add security headers to API responses
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
    echo "✅ Nginx reloaded successfully with security headers!"
else
    echo "❌ Configuration has errors"
    exit 1
fi
EOF

echo "✅ Security headers configuration complete!"