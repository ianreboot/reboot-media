#!/bin/bash

# Reboot Media Production Deployment Script
# For deployment to https://www.rebootmedia.net/

set -e  # Exit on error

echo "🚀 Starting production deployment..."

# Build with production environment (uses / root path)
echo "🔨 Building for production environment..."
npm run build:prod

echo "✅ Production build complete!"
echo "📁 Built files are in: dist/"
echo ""
echo "📋 Next steps:"
echo "1. Upload the contents of dist/ folder to production server"
echo "2. Ensure server is configured to serve index.html for SPA routing"
echo "3. Configure MIME types for .avif files"
echo ""
echo "🌐 Site will be live at: https://www.rebootmedia.net/"