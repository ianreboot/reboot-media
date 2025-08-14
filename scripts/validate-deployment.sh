#!/bin/bash

# Deployment Validation Script
# Comprehensive validation of deployment success across all environments

set -euo pipefail

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Parse arguments
ENVIRONMENT="production"
VERBOSE=false
TIMEOUT=300

while [[ $# -gt 0 ]]; do
    case $1 in
        -e|--environment)
            ENVIRONMENT="$2"
            shift 2
            ;;
        -v|--verbose)
            VERBOSE=true
            shift
            ;;
        -t|--timeout)
            TIMEOUT="$2"
            shift 2
            ;;
        -h|--help)
            echo "Usage: $0 [OPTIONS]"
            echo "Options:"
            echo "  -e, --environment ENV    Environment to validate (staging/production)"
            echo "  -v, --verbose           Verbose output"
            echo "  -t, --timeout SECONDS   Timeout for health checks"
            echo "  -h, --help              Show this help"
            exit 0
            ;;
        *)
            echo "Unknown option: $1"
            exit 1
            ;;
    esac
done

# Set environment-specific URLs
if [[ "$ENVIRONMENT" == "production" ]]; then
    BASE_URL="https://www.rebootmedia.net"
    API_URL="https://www.rebootmedia.net/api"
else
    BASE_URL="https://staging.rebootmedia.net"
    API_URL="https://staging.rebootmedia.net/api"
fi

log() {
    echo -e "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

log_success() {
    log "${GREEN}✅ $1${NC}"
}

log_error() {
    log "${RED}❌ $1${NC}"
}

log_warning() {
    log "${YELLOW}⚠️  $1${NC}"
}

log_info() {
    log "${BLUE}ℹ️  $1${NC}"
}

# Test counters
total_tests=0
passed_tests=0
failed_tests=0

run_test() {
    local test_name="$1"
    local test_command="$2"
    
    ((total_tests++))
    
    if [[ "$VERBOSE" == true ]]; then
        log_info "Running: $test_name"
        log_info "Command: $test_command"
    fi
    
    if eval "$test_command" >/dev/null 2>&1; then
        log_success "$test_name"
        ((passed_tests++))
        return 0
    else
        log_error "$test_name"
        ((failed_tests++))
        return 1
    fi
}

# Health check function
check_endpoint() {
    local url="$1"
    local expected_status="${2:-200}"
    local timeout="${3:-10}"
    
    local response
    response=$(curl -s -w "%{http_code}:%{time_total}" --max-time "$timeout" "$url" 2>/dev/null || echo "000:999")
    
    local status_code
    status_code=$(echo "$response" | cut -d':' -f1)
    local response_time
    response_time=$(echo "$response" | cut -d':' -f2)
    
    if [[ "$status_code" == "$expected_status" ]]; then
        if [[ "$VERBOSE" == true ]]; then
            log_info "$url - Status: $status_code, Time: ${response_time}s"
        fi
        return 0
    else
        if [[ "$VERBOSE" == true ]]; then
            log_error "$url - Status: $status_code (expected $expected_status), Time: ${response_time}s"
        fi
        return 1
    fi
}

# Performance check function
check_performance() {
    local url="$1"
    local max_time="$2"
    
    local response_time
    response_time=$(curl -s -w "%{time_total}" --max-time 30 -o /dev/null "$url" 2>/dev/null || echo "999")
    
    if (( $(echo "$response_time < $max_time" | bc -l) )); then
        if [[ "$VERBOSE" == true ]]; then
            log_info "$url - Response time: ${response_time}s (< ${max_time}s)"
        fi
        return 0
    else
        if [[ "$VERBOSE" == true ]]; then
            log_error "$url - Response time: ${response_time}s (>= ${max_time}s)"
        fi
        return 1
    fi
}

# Security header check function
check_security_headers() {
    local url="$1"
    
    local headers
    headers=$(curl -s -I "$url" 2>/dev/null || echo "")
    
    local required_headers=(
        "strict-transport-security"
        "x-content-type-options"
        "x-frame-options"
        "x-xss-protection"
        "content-security-policy"
    )
    
    for header in "${required_headers[@]}"; do
        if echo "$headers" | grep -qi "$header"; then
            if [[ "$VERBOSE" == true ]]; then
                log_info "Security header present: $header"
            fi
        else
            if [[ "$VERBOSE" == true ]]; then
                log_error "Security header missing: $header"
            fi
            return 1
        fi
    done
    
    return 0
}

log_info "Starting deployment validation for $ENVIRONMENT environment"
log_info "Base URL: $BASE_URL"
log_info "API URL: $API_URL"

echo ""
log_info "=== Basic Health Checks ==="

# Core health endpoints
run_test "Frontend root page" "check_endpoint '$BASE_URL' 200 10"
run_test "API health endpoint" "check_endpoint '$API_URL/health' 200 10"
run_test "API readiness endpoint" "check_endpoint '$API_URL/ready' 200 10"
run_test "API liveness endpoint" "check_endpoint '$API_URL/live' 200 10"

echo ""
log_info "=== Page Availability ==="

# Key marketing pages
pages=(
    "/"
    "/about"
    "/contact"
    "/fractional-cmo-guide"
    "/growth-plateau-solutions"
    "/privacy"
    "/terms"
)

for page in "${pages[@]}"; do
    run_test "Page: $page" "check_endpoint '$BASE_URL$page' 200 15"
done

echo ""
log_info "=== API Endpoint Tests ==="

# API endpoints
api_endpoints=(
    "/health"
    "/ready" 
    "/live"
    "/metrics"
)

for endpoint in "${api_endpoints[@]}"; do
    run_test "API: $endpoint" "check_endpoint '$API_URL$endpoint' 200 10"
done

echo ""
log_info "=== Performance Tests ==="

# Performance thresholds
if [[ "$ENVIRONMENT" == "production" ]]; then
    MAX_RESPONSE_TIME=2.0
    MAX_API_TIME=0.5
else
    MAX_RESPONSE_TIME=3.0
    MAX_API_TIME=1.0
fi

run_test "Frontend performance (< ${MAX_RESPONSE_TIME}s)" "check_performance '$BASE_URL' $MAX_RESPONSE_TIME"
run_test "API performance (< ${MAX_API_TIME}s)" "check_performance '$API_URL/health' $MAX_API_TIME"

# Test key pages performance
key_pages=("/" "/contact" "/fractional-cmo-guide")
for page in "${key_pages[@]}"; do
    run_test "Page performance: $page (< ${MAX_RESPONSE_TIME}s)" "check_performance '$BASE_URL$page' $MAX_RESPONSE_TIME"
done

echo ""
log_info "=== Security Tests ==="

run_test "Security headers" "check_security_headers '$BASE_URL'"

# SSL certificate check
run_test "SSL certificate validity" "
    cert_expiry=\$(echo | openssl s_client -connect $(echo $BASE_URL | sed 's/https:\/\///'):443 -servername $(echo $BASE_URL | sed 's/https:\/\///') 2>/dev/null | openssl x509 -noout -dates | grep 'notAfter' | cut -d= -f2)
    exp_epoch=\$(date -d \"\$cert_expiry\" +%s)
    now_epoch=\$(date +%s)
    days_left=\$(( (exp_epoch - now_epoch) / 86400 ))
    [ \$days_left -gt 7 ]
"

echo ""
log_info "=== Business Function Tests ==="

# Test lead form endpoint (GET to check it exists)
run_test "Lead form endpoint available" "check_endpoint '$API_URL/forms/lead' 405 10"  # 405 = Method Not Allowed for GET

# Test attribution endpoint
run_test "Marketing attribution endpoint" "check_endpoint '$API_URL/attribution/health' 200 10"

echo ""
log_info "=== Content Validation ==="

# Check for critical content
run_test "Homepage contains key content" "
    content=\$(curl -s '$BASE_URL' || echo '')
    echo \"\$content\" | grep -q 'Reboot Media' && 
    echo \"\$content\" | grep -q 'Fractional CMO'
"

run_test "Contact page has lead form" "
    content=\$(curl -s '$BASE_URL/contact' || echo '')
    echo \"\$content\" | grep -q 'form' && 
    echo \"\$content\" | grep -q 'email'
"

echo ""
log_info "=== SEO Validation ==="

# SEO checks
run_test "Homepage has title tag" "
    content=\$(curl -s '$BASE_URL' || echo '')
    echo \"\$content\" | grep -q '<title>'
"

run_test "Homepage has meta description" "
    content=\$(curl -s '$BASE_URL' || echo '')
    echo \"\$content\" | grep -q 'meta name=\"description\"'
"

run_test "Robots.txt accessible" "check_endpoint '$BASE_URL/robots.txt' 200 5"
run_test "Sitemap.xml accessible" "check_endpoint '$BASE_URL/sitemap.xml' 200 5"

echo ""
log_info "=== Advanced Health Checks ==="

# Check for memory leaks or resource issues
run_test "API responds consistently (3 rapid requests)" "
    check_endpoint '$API_URL/health' 200 5 &&
    check_endpoint '$API_URL/health' 200 5 &&
    check_endpoint '$API_URL/health' 200 5
"

# Check error pages
run_test "404 page handles gracefully" "check_endpoint '$BASE_URL/non-existent-page' 404 10"

echo ""
log_info "=== Monitoring Endpoints ==="

# Check if monitoring is working
if [[ "$ENVIRONMENT" == "production" ]]; then
    # These would be internal endpoints in a real deployment
    log_info "Skipping internal monitoring checks (would check Prometheus/Grafana)"
else
    log_info "Monitoring endpoints would be validated in staging"
fi

echo ""
log_info "=== Deployment Validation Summary ==="
echo ""

if [[ $failed_tests -eq 0 ]]; then
    log_success "All $total_tests tests passed! Deployment is healthy."
    echo ""
    log_info "✅ Environment: $ENVIRONMENT"
    log_info "✅ Base URL: $BASE_URL"
    log_info "✅ All systems operational"
    echo ""
    exit 0
else
    log_error "$failed_tests out of $total_tests tests failed!"
    echo ""
    log_error "❌ Environment: $ENVIRONMENT"
    log_error "❌ Failed tests: $failed_tests"
    log_error "❌ Passed tests: $passed_tests"
    echo ""
    
    if [[ $failed_tests -lt 3 ]] && [[ $passed_tests -gt 15 ]]; then
        log_warning "Deployment has minor issues but is mostly functional"
        exit 1
    else
        log_error "Deployment has significant issues and may not be safe"
        exit 2
    fi
fi