#!/bin/bash
# Upload built files directly to dev server

set -e

DEV_SERVER="ubuntu@dev.rebootmedia.net"
DEV_PATH="/var/www/html/reboot"

echo "🚀 Uploading built files to dev server..."

# Upload index.html
echo "📄 Uploading index.html..."
rsync -avz index.html "${DEV_SERVER}:${DEV_PATH}/"

# Upload assets directory
echo "📦 Uploading assets directory..."
rsync -avz --delete assets/ "${DEV_SERVER}:${DEV_PATH}/assets/"

# Upload media files if they exist
if [ -f "reboot-media.avif" ]; then
    echo "🖼️ Uploading media files..."
    rsync -avz reboot-media.avif "${DEV_SERVER}:${DEV_PATH}/"
fi

if [ -f "vite.svg" ]; then
    rsync -avz vite.svg "${DEV_SERVER}:${DEV_PATH}/"
fi

echo "✅ Upload complete!"
echo "🌐 Check: https://dev.rebootmedia.net/reboot/"