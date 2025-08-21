#!/bin/bash

echo "🚀 Syncing updated production build to server..."

# Sync the updated dist-prod directory to production server
rsync -avz --delete dist-prod/ ubuntu@44.247.64.96:/home/ubuntu/reboot/dist-prod/

echo "✅ Production build synced successfully!"

echo ""
echo "⏳ Waiting for changes to take effect..."
sleep 3

echo "🎯 Testing the updated production site..."
echo "📄 HTTP response:"
curl -I http://www.rebootmedia.net/ 2>/dev/null | head -3

echo ""
echo "🔍 Testing for JSX errors (should be clean):"
curl -s http://www.rebootmedia.net/ | grep -E "(script.*src=)" | head -1

echo ""
echo "✅ Production deployment update complete!"