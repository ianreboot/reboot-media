#!/bin/bash

# Reboot Media Full-Stack Dev Deployment Script
# Deploys both frontend and server components

set -e  # Exit on error

echo "🚀 Starting full-stack dev deployment..."

# Check if there are uncommitted changes
if ! git diff-index --quiet HEAD --; then
    echo "⚠️  Uncommitted changes detected!"
    echo "📝 Please commit your changes first with a meaningful message:"
    echo ""
    echo "   git add -A"
    echo "   git commit -m \"Component: What you changed and why\""
    echo ""
    echo "Then run this deploy script again."
    exit 1
fi

# Build frontend
echo "🔨 Building frontend for dev environment..."
cp index.dev.html index.html
npm run build:dev

# Build server
echo "🔧 Building server..."
npm run server:build

# Check if we need to start or restart server
echo "🖥️  Managing server process..."

# Check if server is running on port 3001
if lsof -Pi :3001 -sTCP:LISTEN -t >/dev/null; then
    echo "🔄 Server running on port 3001, restarting..."
    pkill -f "node.*server.js" || true
    sleep 2
else
    echo "🆕 No server running on port 3001"
fi

# Start server in background
echo "▶️  Starting server..."
cd server
NODE_ENV=production npm start > ../server.log 2>&1 &
SERVER_PID=$!
cd ..

# Save server PID for later management
echo $SERVER_PID > server.pid

# Wait a moment for server to start
sleep 3

# Check if server started successfully
if kill -0 $SERVER_PID 2>/dev/null; then
    echo "✅ Server started successfully (PID: $SERVER_PID)"
    echo "📊 Server logs: tail -f server.log"
else
    echo "❌ Server failed to start"
    cat server.log
    exit 1
fi

# Test server health
echo "🏥 Testing server health..."
if curl -s http://localhost:3001/api/health > /dev/null; then
    echo "✅ Server health check passed"
else
    echo "❌ Server health check failed"
    echo "📋 Server logs:"
    tail server.log
    exit 1
fi

echo ""
echo "🎉 Full-stack deployment complete!"
echo "🌐 Frontend: Built and ready to serve"
echo "🖥️  Backend: Running on http://localhost:3001"
echo "📊 Server logs: tail -f server.log"
echo "🛑 Stop server: pkill -f \"node.*server.js\""
echo ""
echo "📋 Next steps for production deployment:"
echo "   1. Configure reverse proxy (nginx) to serve frontend"
echo "   2. Set up process manager (PM2) for server"
echo "   3. Configure environment variables for production"
echo "   4. Set up SSL certificates"