#!/bin/bash

# Reboot Media Dev Deployment Script (Interactive Version)
# Deploys to https://dev.rebootmedia.net/reboot/

set -e  # Exit on error

echo "🚀 Starting dev deployment..."

# Prompt for commit message
echo ""
echo "📝 What changes are you deploying?"
echo "Examples:"
echo "  - Fix hero section H1 semantic structure"
echo "  - Update pricing cards to fluid layout"
echo "  - Add conversion tracking to lead forms"
echo ""
read -p "Enter commit message (or press Enter for timestamp-only): " COMMIT_MSG

# Default to timestamp if empty
if [ -z "$COMMIT_MSG" ]; then
    COMMIT_MSG="Deploy dev build - $(date +'%Y-%m-%d %H:%M:%S')"
else
    COMMIT_MSG="$COMMIT_MSG (deploy:dev)"
fi

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
# Copy optional files if they exist
[ -f dist/reboot-media.avif ] && cp dist/reboot-media.avif .
[ -f dist/vite.svg ] && cp dist/vite.svg .

# Commit and push
echo "📤 Committing and pushing to GitHub..."
git add index.html assets/
# Add optional files if they exist
[ -f reboot-media.avif ] && git add reboot-media.avif
[ -f vite.svg ] && git add vite.svg
git commit -m "$COMMIT_MSG" || echo "No changes to commit"
git push origin master

echo "✅ Dev deployment complete!"
echo "🌐 Site will be live at: https://dev.rebootmedia.net/reboot/"
echo "📋 Committed as: $COMMIT_MSG"