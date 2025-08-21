#!/bin/bash

echo "🔧 Setting up nginx configuration for www.rebootmedia.net..."

# Create the nginx configuration for production
cat << 'EOF' > /tmp/rebootmedia-nginx.conf
# Reboot Media Production Site
server {
    listen 80;
    listen [::]:80;
    server_name www.rebootmedia.net rebootmedia.net;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name www.rebootmedia.net rebootmedia.net;

    # SSL certificates (if they exist)
    # ssl_certificate /etc/letsencrypt/live/www.rebootmedia.net/fullchain.pem;
    # ssl_certificate_key /etc/letsencrypt/live/www.rebootmedia.net/privkey.pem;
    # include /etc/letsencrypt/options-ssl-nginx.conf;
    # ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    # Serve from the production build
    root /home/ubuntu/reboot/dist-prod;
    index index.html index.htm;
    
    # Handle React Router
    location / {
        try_files $uri $uri/ /index.html;
        
        # Security headers
        add_header X-Frame-Options DENY;
        add_header X-Content-Type-Options nosniff;
        add_header X-XSS-Protection "1; mode=block";
        add_header Strict-Transport-Security "max-age=31536000; includeSubDomains";
    }
    
    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        add_header X-Frame-Options DENY;
        add_header X-Content-Type-Options nosniff;
    }
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/javascript
        application/xml+rss
        application/json;
}
EOF

echo "📁 Nginx config created at /tmp/rebootmedia-nginx.conf"
echo ""
echo "🚀 Next steps to complete setup:"
echo "1. Copy config to server: scp /tmp/rebootmedia-nginx.conf ubuntu@44.247.64.96:/tmp/"
echo "2. SSH to server and add config to nginx"
echo "3. Test and reload nginx"
echo ""
echo "Or run the automated setup..."