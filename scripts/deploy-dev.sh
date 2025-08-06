#!/bin/bash

# Reboot Media Dev Deployment Script
# Deploys to https://dev.rebootmedia.net/reboot/

set -e  # Exit on error

echo "🚀 Starting dev deployment..."

# Ensure we have the correct source HTML
echo "📄 Copying source HTML..."
cp index.dev.html index.html

# Build with dev environment (uses /reboot/ base path)
echo "🔨 Building for dev environment..."
npm run build:dev

# Copy built files to root (dev server serves from root, not dist/)
echo "📁 Copying build files to root..."
cp dist/index.html .
cp -r dist/assets .
cp dist/reboot-media.avif .
cp dist/vite.svg .

# Commit and push
echo "📤 Committing and pushing to GitHub..."
git add index.html assets/ reboot-media.avif vite.svg
git commit -m "Deploy dev build - $(date +'%Y-%m-%d %H:%M:%S')" || echo "No changes to commit"
git push origin master

echo "✅ Dev deployment complete!"
echo "🌐 Site will be live at: https://dev.rebootmedia.net/reboot/"