#!/bin/bash

# Blue-Green Deployment Script for Reboot Media
# Implements zero-downtime deployment with automated rollback

set -euo pipefail

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
LOG_FILE="$PROJECT_ROOT/logs/deployment-$(date +%Y%m%d-%H%M%S).log"
HEALTH_CHECK_TIMEOUT=300
TRAFFIC_SWITCH_TIMEOUT=60

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Ensure logs directory exists
mkdir -p "$(dirname "$LOG_FILE")"

# Logging function
log() {
    echo -e "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

log_info() {
    log "${BLUE}ℹ INFO:${NC} $1"
}

log_success() {
    log "${GREEN}✅ SUCCESS:${NC} $1"
}

log_warning() {
    log "${YELLOW}⚠ WARNING:${NC} $1"
}

log_error() {
    log "${RED}❌ ERROR:${NC} $1"
}

# Cleanup function
cleanup() {
    local exit_code=$?
    if [ $exit_code -ne 0 ]; then
        log_error "Deployment failed with exit code $exit_code"
        log_info "Check the deployment log: $LOG_FILE"
    fi
    exit $exit_code
}

trap cleanup EXIT

# Parse command line arguments
VERSION=""
ENVIRONMENT="production"
DRY_RUN=false
FORCE_DEPLOY=false
ROLLBACK=false

while [[ $# -gt 0 ]]; do
    case $1 in
        -v|--version)
            VERSION="$2"
            shift 2
            ;;
        -e|--environment)
            ENVIRONMENT="$2"
            shift 2
            ;;
        --dry-run)
            DRY_RUN=true
            shift
            ;;
        --force)
            FORCE_DEPLOY=true
            shift
            ;;
        --rollback)
            ROLLBACK=true
            shift
            ;;
        -h|--help)
            echo "Usage: $0 [OPTIONS]"
            echo "Options:"
            echo "  -v, --version VERSION    Version to deploy"
            echo "  -e, --environment ENV    Environment (staging/production)"
            echo "  --dry-run               Show what would be done"
            echo "  --force                 Force deployment even with warnings"
            echo "  --rollback              Rollback to previous version"
            echo "  -h, --help              Show this help"
            exit 0
            ;;
        *)
            log_error "Unknown option: $1"
            exit 1
            ;;
    esac
done

# Validate environment
if [[ "$ENVIRONMENT" != "staging" && "$ENVIRONMENT" != "production" ]]; then
    log_error "Invalid environment: $ENVIRONMENT. Must be 'staging' or 'production'"
    exit 1
fi

# Set environment-specific variables
if [[ "$ENVIRONMENT" == "production" ]]; then
    COMPOSE_FILE="$PROJECT_ROOT/docker/docker-compose.production.yml"
    HEALTH_CHECK_URL="https://www.rebootmedia.net/api/health"
    LOAD_BALANCER_CONFIG="$PROJECT_ROOT/docker/nginx.lb.conf"
else
    COMPOSE_FILE="$PROJECT_ROOT/docker/docker-compose.staging.yml"
    HEALTH_CHECK_URL="https://staging.rebootmedia.net/api/health"
    LOAD_BALANCER_CONFIG="$PROJECT_ROOT/docker/nginx.staging.conf"
fi

# Validate version parameter
if [[ "$ROLLBACK" == false && -z "$VERSION" ]]; then
    log_error "Version parameter is required for deployment"
    exit 1
fi

log_info "Starting blue-green deployment"
log_info "Environment: $ENVIRONMENT"
log_info "Version: ${VERSION:-'rollback'}"
log_info "Dry run: $DRY_RUN"
log_info "Log file: $LOG_FILE"

# Function to check if a service is healthy
check_service_health() {
    local service_name=$1
    local health_url=$2
    local timeout=${3:-$HEALTH_CHECK_TIMEOUT}
    
    log_info "Checking health of $service_name..."
    
    local start_time=$(date +%s)
    local max_time=$((start_time + timeout))
    
    while [ $(date +%s) -lt $max_time ]; do
        if curl -s -f --max-time 10 "$health_url" > /dev/null 2>&1; then
            log_success "$service_name is healthy"
            return 0
        fi
        
        log_info "Waiting for $service_name to be healthy..."
        sleep 5
    done
    
    log_error "$service_name failed health check after ${timeout}s"
    return 1
}

# Function to get current active slot
get_active_slot() {
    # Check which slot is currently receiving traffic
    if docker compose -f "$COMPOSE_FILE" ps frontend-blue | grep -q "Up"; then
        if docker compose -f "$COMPOSE_FILE" ps frontend-green | grep -q "Up"; then
            # Both running, check load balancer config
            if grep -q "frontend-blue" "$LOAD_BALANCER_CONFIG" 2>/dev/null; then
                echo "blue"
            else
                echo "green"
            fi
        else
            echo "blue"
        fi
    elif docker compose -f "$COMPOSE_FILE" ps frontend-green | grep -q "Up"; then
        echo "green"
    else
        echo "none"
    fi
}

# Function to get inactive slot
get_inactive_slot() {
    local active_slot=$(get_active_slot)
    if [[ "$active_slot" == "blue" ]]; then
        echo "green"
    elif [[ "$active_slot" == "green" ]]; then
        echo "blue"
    else
        echo "blue" # Default to blue if nothing is running
    fi
}

# Function to deploy to inactive slot
deploy_to_inactive_slot() {
    local inactive_slot=$(get_inactive_slot)
    local active_slot=$(get_active_slot)
    
    log_info "Active slot: $active_slot"
    log_info "Deploying to inactive slot: $inactive_slot"
    
    if [[ "$DRY_RUN" == true ]]; then
        log_info "[DRY RUN] Would deploy $VERSION to $inactive_slot slot"
        return 0
    fi
    
    # Set the version for deployment
    export VERSION="$VERSION"
    
    # Deploy backend first
    log_info "Deploying backend-$inactive_slot..."
    docker compose -f "$COMPOSE_FILE" up -d backend-$inactive_slot
    
    # Wait for backend to be healthy
    local backend_health_url="http://localhost:3002/api/health"
    if ! check_service_health "backend-$inactive_slot" "$backend_health_url" 120; then
        log_error "Backend deployment failed"
        return 1
    fi
    
    # Deploy frontend
    log_info "Deploying frontend-$inactive_slot..."
    docker compose -f "$COMPOSE_FILE" up -d frontend-$inactive_slot
    
    # Wait for frontend to be healthy
    local frontend_health_url="http://localhost/health"
    if ! check_service_health "frontend-$inactive_slot" "$frontend_health_url" 60; then
        log_error "Frontend deployment failed"
        return 1
    fi
    
    log_success "Successfully deployed to $inactive_slot slot"
    echo "$inactive_slot"
}

# Function to run smoke tests
run_smoke_tests() {
    local slot=$1
    log_info "Running smoke tests on $slot slot..."
    
    if [[ "$DRY_RUN" == true ]]; then
        log_info "[DRY RUN] Would run smoke tests on $slot slot"
        return 0
    fi
    
    # Test key endpoints
    local base_url
    if [[ "$slot" == "blue" ]]; then
        base_url="http://localhost:8080"  # Assuming blue is on 8080
    else
        base_url="http://localhost:8081"  # Assuming green is on 8081
    fi
    
    local endpoints=(
        "/"
        "/api/health"
        "/api/ready"
        "/api/live"
    )
    
    for endpoint in "${endpoints[@]}"; do
        log_info "Testing: $base_url$endpoint"
        
        if ! curl -s -f --max-time 10 "$base_url$endpoint" > /dev/null; then
            log_error "Smoke test failed for $endpoint"
            return 1
        fi
    done
    
    log_success "All smoke tests passed for $slot slot"
    return 0
}

# Function to switch traffic
switch_traffic() {
    local new_active_slot=$1
    local old_active_slot=$(get_active_slot)
    
    log_info "Switching traffic from $old_active_slot to $new_active_slot"
    
    if [[ "$DRY_RUN" == true ]]; then
        log_info "[DRY RUN] Would switch traffic to $new_active_slot"
        return 0
    fi
    
    # Update load balancer configuration
    local temp_config=$(mktemp)
    sed "s/frontend-$old_active_slot/frontend-$new_active_slot/g" "$LOAD_BALANCER_CONFIG" > "$temp_config"
    
    # Validate new configuration
    if ! nginx -t -c "$temp_config" 2>/dev/null; then
        log_error "Invalid nginx configuration"
        rm "$temp_config"
        return 1
    fi
    
    # Apply new configuration
    cp "$temp_config" "$LOAD_BALANCER_CONFIG"
    rm "$temp_config"
    
    # Reload nginx
    docker compose -f "$COMPOSE_FILE" exec load-balancer nginx -s reload
    
    # Wait for traffic switch to complete
    sleep $TRAFFIC_SWITCH_TIMEOUT
    
    # Verify the switch
    if check_service_health "New active slot" "$HEALTH_CHECK_URL" 30; then
        log_success "Traffic successfully switched to $new_active_slot"
        return 0
    else
        log_error "Health check failed after traffic switch"
        return 1
    fi
}

# Function to stop old slot
stop_old_slot() {
    local old_slot=$1
    
    log_info "Stopping old $old_slot slot services"
    
    if [[ "$DRY_RUN" == true ]]; then
        log_info "[DRY RUN] Would stop $old_slot slot"
        return 0
    fi
    
    # Graceful shutdown with 30 second timeout
    docker compose -f "$COMPOSE_FILE" stop -t 30 frontend-$old_slot backend-$old_slot
    
    log_success "Stopped $old_slot slot services"
}

# Function to rollback deployment
rollback_deployment() {
    local current_active=$(get_active_slot)
    local rollback_slot
    
    if [[ "$current_active" == "blue" ]]; then
        rollback_slot="green"
    else
        rollback_slot="blue"
    fi
    
    log_warning "Rolling back from $current_active to $rollback_slot"
    
    if [[ "$DRY_RUN" == true ]]; then
        log_info "[DRY RUN] Would rollback to $rollback_slot"
        return 0
    fi
    
    # Start the rollback slot if not running
    docker compose -f "$COMPOSE_FILE" up -d frontend-$rollback_slot backend-$rollback_slot
    
    # Wait for health check
    if check_service_health "Rollback slot" "$HEALTH_CHECK_URL" 60; then
        # Switch traffic back
        switch_traffic "$rollback_slot"
        
        # Stop failed deployment
        stop_old_slot "$current_active"
        
        log_success "Rollback completed successfully"
        return 0
    else
        log_error "Rollback failed - both slots unhealthy"
        return 1
    fi
}

# Function to perform full deployment
perform_deployment() {
    log_info "=== Starting Blue-Green Deployment ==="
    
    # Pre-deployment checks
    log_info "Running pre-deployment checks..."
    
    # Check if Docker Compose file exists
    if [[ ! -f "$COMPOSE_FILE" ]]; then
        log_error "Docker Compose file not found: $COMPOSE_FILE"
        exit 1
    fi
    
    # Check if required images exist
    if ! docker images | grep -q "ghcr.io/reboot/reboot:$VERSION"; then
        log_warning "Image ghcr.io/reboot/reboot:$VERSION not found locally"
        log_info "Pulling image..."
        docker pull "ghcr.io/reboot/reboot:$VERSION"
    fi
    
    # Deploy to inactive slot
    local new_active_slot
    if ! new_active_slot=$(deploy_to_inactive_slot); then
        log_error "Deployment to inactive slot failed"
        return 1
    fi
    
    # Run smoke tests
    if ! run_smoke_tests "$new_active_slot"; then
        log_error "Smoke tests failed"
        
        if [[ "$FORCE_DEPLOY" == false ]]; then
            log_error "Aborting deployment. Use --force to deploy anyway."
            return 1
        else
            log_warning "Continuing deployment despite failed smoke tests"
        fi
    fi
    
    # Switch traffic
    if ! switch_traffic "$new_active_slot"; then
        log_error "Traffic switch failed, attempting rollback..."
        rollback_deployment
        return 1
    fi
    
    # Monitor new deployment
    log_info "Monitoring new deployment for 60 seconds..."
    sleep 60
    
    if check_service_health "Post-switch monitoring" "$HEALTH_CHECK_URL" 30; then
        # Stop old slot
        local old_slot
        if [[ "$new_active_slot" == "blue" ]]; then
            old_slot="green"
        else
            old_slot="blue"
        fi
        
        stop_old_slot "$old_slot"
        
        log_success "=== Deployment completed successfully ==="
        log_success "Active slot: $new_active_slot"
        log_success "Version: $VERSION"
        
        return 0
    else
        log_error "Post-deployment monitoring failed, rolling back..."
        rollback_deployment
        return 1
    fi
}

# Main execution
if [[ "$ROLLBACK" == true ]]; then
    rollback_deployment
else
    perform_deployment
fi

log_info "Deployment log saved to: $LOG_FILE"