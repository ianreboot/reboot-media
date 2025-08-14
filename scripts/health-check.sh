#!/bin/bash

# Comprehensive Health Check Script
# Verifies all services are running correctly

set -e

echo "🏥 Running comprehensive health checks..."

# Configuration
FRONTEND_URL="http://localhost:5173"
BACKEND_URL="http://localhost:3002"
TIMEOUT=5

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

check_service() {
    local name=$1
    local url=$2
    local expected_status=$3
    
    echo -n "Checking $name... "
    
    if command -v curl > /dev/null; then
        response=$(curl -s -o /dev/null -w "%{http_code}" --max-time $TIMEOUT "$url" 2>/dev/null || echo "000")
        
        if [ "$response" = "$expected_status" ]; then
            echo -e "${GREEN}✅ OK ($response)${NC}"
            return 0
        else
            echo -e "${RED}❌ FAILED (expected $expected_status, got $response)${NC}"
            return 1
        fi
    else
        echo -e "${YELLOW}⚠️  SKIP (curl not available)${NC}"
        return 0
    fi
}

check_port() {
    local name=$1
    local port=$2
    
    echo -n "Checking $name port $port... "
    
    if command -v lsof > /dev/null; then
        if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null; then
            echo -e "${GREEN}✅ OPEN${NC}"
            return 0
        else
            echo -e "${RED}❌ CLOSED${NC}"
            return 1
        fi
    elif command -v netstat > /dev/null; then
        if netstat -ln | grep ":$port " >/dev/null; then
            echo -e "${GREEN}✅ OPEN${NC}"
            return 0
        else
            echo -e "${RED}❌ CLOSED${NC}"
            return 1
        fi
    else
        echo -e "${YELLOW}⚠️  SKIP (no port checking tools)${NC}"
        return 0
    fi
}

check_process() {
    local name=$1
    local pattern=$2
    
    echo -n "Checking $name process... "
    
    if pgrep -f "$pattern" > /dev/null; then
        echo -e "${GREEN}✅ RUNNING${NC}"
        return 0
    else
        echo -e "${RED}❌ NOT RUNNING${NC}"
        return 1
    fi
}

# Initialize counters
total_checks=0
passed_checks=0

# System checks
echo "🔧 System Checks"
echo "================"

# Node.js version
echo -n "Node.js version... "
if command -v node > /dev/null; then
    node_version=$(node --version)
    echo -e "${GREEN}✅ $node_version${NC}"
    ((passed_checks++))
else
    echo -e "${RED}❌ Node.js not found${NC}"
fi
((total_checks++))

# NPM version
echo -n "NPM version... "
if command -v npm > /dev/null; then
    npm_version=$(npm --version)
    echo -e "${GREEN}✅ $npm_version${NC}"
    ((passed_checks++))
else
    echo -e "${RED}❌ NPM not found${NC}"
fi
((total_checks++))

echo ""

# Port checks
echo "🌐 Port Availability"
echo "==================="

if check_port "Frontend" "5173"; then ((passed_checks++)); fi
((total_checks++))

if check_port "Backend" "3002"; then ((passed_checks++)); fi
((total_checks++))

echo ""

# Service health checks
echo "🚀 Service Health"
echo "================"

if check_service "Backend Health" "$BACKEND_URL/api/health" "200"; then ((passed_checks++)); fi
((total_checks++))

if check_service "Backend Readiness" "$BACKEND_URL/api/ready" "200"; then ((passed_checks++)); fi
((total_checks++))

if check_service "Backend Liveness" "$BACKEND_URL/api/live" "200"; then ((passed_checks++)); fi
((total_checks++))

# Frontend is served by Vite dev server, so we check if it's serving content
if curl -s --max-time $TIMEOUT "$FRONTEND_URL" | grep -q "<!DOCTYPE html>"; then
    echo -e "Checking Frontend... ${GREEN}✅ OK${NC}"
    ((passed_checks++))
else
    echo -e "Checking Frontend... ${RED}❌ FAILED${NC}"
fi
((total_checks++))

echo ""

# Process checks
echo "⚙️  Process Status"
echo "=================="

if check_process "Vite Dev Server" "vite"; then ((passed_checks++)); fi
((total_checks++))

if check_process "Node Server" "node.*server"; then ((passed_checks++)); fi
((total_checks++))

echo ""

# Build checks
echo "🔨 Build Status"
echo "==============="

echo -n "Checking dist directory... "
if [ -d "dist" ] && [ -f "dist/index.html" ]; then
    echo -e "${GREEN}✅ EXISTS${NC}"
    ((passed_checks++))
else
    echo -e "${YELLOW}⚠️  MISSING (run npm run build:dev or build:prod)${NC}"
fi
((total_checks++))

echo ""

# Summary
echo "📊 Health Check Summary"
echo "======================="
echo "Passed: $passed_checks/$total_checks"

if [ $passed_checks -eq $total_checks ]; then
    echo -e "${GREEN}🎉 All checks passed! System is healthy.${NC}"
    exit 0
elif [ $passed_checks -ge $((total_checks * 3 / 4)) ]; then
    echo -e "${YELLOW}⚠️  Most checks passed. System is functional but has issues.${NC}"
    exit 1
else
    echo -e "${RED}❌ Multiple checks failed. System needs attention.${NC}"
    exit 2
fi