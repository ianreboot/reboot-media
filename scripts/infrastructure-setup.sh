#!/bin/bash

# Infrastructure Setup Script
# Complete setup of CI/CD infrastructure for Reboot Media

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

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

# Parse command line arguments
ENVIRONMENT="staging"
SKIP_DOCKER=false
SKIP_MONITORING=false
DRY_RUN=false

while [[ $# -gt 0 ]]; do
    case $1 in
        -e|--environment)
            ENVIRONMENT="$2"
            shift 2
            ;;
        --skip-docker)
            SKIP_DOCKER=true
            shift
            ;;
        --skip-monitoring)
            SKIP_MONITORING=true
            shift
            ;;
        --dry-run)
            DRY_RUN=true
            shift
            ;;
        -h|--help)
            echo "Infrastructure Setup Script"
            echo ""
            echo "Usage: $0 [OPTIONS]"
            echo ""
            echo "Options:"
            echo "  -e, --environment ENV   Environment (staging/production)"
            echo "  --skip-docker          Skip Docker setup"
            echo "  --skip-monitoring      Skip monitoring setup"
            echo "  --dry-run             Show what would be done"
            echo "  -h, --help            Show this help"
            echo ""
            exit 0
            ;;
        *)
            log_error "Unknown option: $1"
            exit 1
            ;;
    esac
done

log_info "=== Infrastructure Setup for $ENVIRONMENT ==="
log_info "Project root: $PROJECT_ROOT"

if [[ "$DRY_RUN" == true ]]; then
    log_warning "DRY RUN MODE - No changes will be made"
fi

# Check prerequisites
check_prerequisites() {
    log_info "Checking prerequisites..."
    
    local missing=()
    
    if ! command -v docker >/dev/null 2>&1; then
        missing+=("docker")
    fi
    
    if ! command -v docker-compose >/dev/null 2>&1 && ! docker compose version >/dev/null 2>&1; then
        missing+=("docker-compose")
    fi
    
    if ! command -v node >/dev/null 2>&1; then
        missing+=("node")
    fi
    
    if ! command -v npm >/dev/null 2>&1; then
        missing+=("npm")
    fi
    
    if [[ ${#missing[@]} -gt 0 ]]; then
        log_error "Missing required tools: ${missing[*]}"
        log_error "Please install missing tools and run again"
        exit 1
    fi
    
    log_success "All prerequisites met"
}

# Create necessary directories
create_directories() {
    log_info "Creating directory structure..."
    
    local dirs=(
        "logs/$ENVIRONMENT"
        "logs/$ENVIRONMENT/nginx"
        "logs/$ENVIRONMENT/app"
        "docker/ssl"
        "docker/grafana/$ENVIRONMENT/dashboards"
        "docker/grafana/$ENVIRONMENT/datasources"
        "monitoring/prometheus"
        "monitoring/grafana"
        "monitoring/loki"
        "backups"
        "tmp"
    )
    
    for dir in "${dirs[@]}"; do
        local full_path="$PROJECT_ROOT/$dir"
        if [[ "$DRY_RUN" == false ]]; then
            mkdir -p "$full_path"
            log_success "Created: $full_path"
        else
            log_info "[DRY RUN] Would create: $full_path"
        fi
    done
}

# Generate SSL certificates for development
generate_ssl_certs() {
    if [[ "$ENVIRONMENT" == "production" ]]; then
        log_info "Production SSL certificates should be managed externally"
        return 0
    fi
    
    log_info "Generating self-signed SSL certificates for $ENVIRONMENT..."
    
    local ssl_dir="$PROJECT_ROOT/docker/ssl"
    
    if [[ "$DRY_RUN" == false ]]; then
        if [[ ! -f "$ssl_dir/cert.pem" ]]; then
            openssl req -x509 -newkey rsa:4096 -keyout "$ssl_dir/key.pem" \
                -out "$ssl_dir/cert.pem" -days 365 -nodes \
                -subj "/CN=staging.rebootmedia.net" \
                2>/dev/null
            cp "$ssl_dir/cert.pem" "$ssl_dir/fullchain.pem"
            log_success "Generated SSL certificates"
        else
            log_info "SSL certificates already exist"
        fi
    else
        log_info "[DRY RUN] Would generate SSL certificates"
    fi
}

# Setup monitoring configuration
setup_monitoring() {
    if [[ "$SKIP_MONITORING" == true ]]; then
        log_info "Skipping monitoring setup"
        return 0
    fi
    
    log_info "Setting up monitoring configuration..."
    
    # Grafana datasource configuration
    local grafana_datasources="$PROJECT_ROOT/docker/grafana/$ENVIRONMENT/datasources"
    
    if [[ "$DRY_RUN" == false ]]; then
        cat > "$grafana_datasources/prometheus.yml" << EOF
apiVersion: 1

datasources:
  - name: Prometheus
    type: prometheus
    access: proxy
    url: http://prometheus:9090
    isDefault: true
    editable: true
    
  - name: Loki
    type: loki
    access: proxy
    url: http://loki:3100
    editable: true
    
  - name: Node Exporter
    type: prometheus
    access: proxy
    url: http://node-exporter:9100
    editable: true
EOF
        log_success "Created Grafana datasource configuration"
    else
        log_info "[DRY RUN] Would create Grafana datasource configuration"
    fi
    
    # Prometheus alerting rules
    local alert_rules="$PROJECT_ROOT/docker/alert_rules.yml"
    
    if [[ "$DRY_RUN" == false ]]; then
        cat > "$alert_rules" << 'EOF'
groups:
  - name: reboot-media-alerts
    rules:
      - alert: ServiceDown
        expr: up == 0
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "Service {{ $labels.job }} is down"
          description: "Service {{ $labels.job }} has been down for more than 1 minute"
          
      - alert: HighErrorRate
        expr: rate(http_requests_total{status=~"5.."}[5m]) > 0.1
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High error rate detected"
          description: "Error rate is {{ $value }} errors per second"
          
      - alert: HighLatency
        expr: histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m])) > 0.5
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High latency detected"
          description: "95th percentile latency is {{ $value }} seconds"
EOF
        log_success "Created Prometheus alert rules"
    else
        log_info "[DRY RUN] Would create Prometheus alert rules"
    fi
}

# Setup environment-specific configuration
setup_environment_config() {
    log_info "Setting up $ENVIRONMENT environment configuration..."
    
    local env_file="$PROJECT_ROOT/.env.$ENVIRONMENT"
    
    if [[ "$DRY_RUN" == false ]]; then
        if [[ ! -f "$env_file" ]]; then
            cat > "$env_file" << EOF
# Environment configuration for $ENVIRONMENT
NODE_ENV=$ENVIRONMENT
LOG_LEVEL=${LOG_LEVEL:-info}

# Database configuration
DB_HOST=${DB_HOST:-localhost}
DB_PORT=${DB_PORT:-5432}
DB_NAME=${DB_NAME:-reboot_$ENVIRONMENT}

# Redis configuration  
REDIS_URL=${REDIS_URL:-redis://localhost:6379}

# Security
JWT_SECRET=${JWT_SECRET:-$(openssl rand -base64 32)}
CORS_ORIGIN=${CORS_ORIGIN:-https://$ENVIRONMENT.rebootmedia.net}

# Monitoring
ENABLE_METRICS=${ENABLE_METRICS:-true}
PROMETHEUS_ENDPOINT=${PROMETHEUS_ENDPOINT:-/metrics}

# Performance
PERFORMANCE_MONITORING=${PERFORMANCE_MONITORING:-true}
CORE_WEB_VITALS_ENDPOINT=${CORE_WEB_VITALS_ENDPOINT:-/api/vitals}

# Feature flags
ENABLE_AB_TESTING=${ENABLE_AB_TESTING:-true}
ENABLE_LEAD_SCORING=${ENABLE_LEAD_SCORING:-true}
ENABLE_MARKETING_ATTRIBUTION=${ENABLE_MARKETING_ATTRIBUTION:-true}
EOF
            log_success "Created environment configuration"
        else
            log_info "Environment configuration already exists"
        fi
    else
        log_info "[DRY RUN] Would create environment configuration"
    fi
}

# Setup Docker infrastructure
setup_docker_infrastructure() {
    if [[ "$SKIP_DOCKER" == true ]]; then
        log_info "Skipping Docker setup"
        return 0
    fi
    
    log_info "Setting up Docker infrastructure..."
    
    local compose_file="$PROJECT_ROOT/docker/docker-compose.$ENVIRONMENT.yml"
    
    if [[ ! -f "$compose_file" ]]; then
        log_error "Docker Compose file not found: $compose_file"
        return 1
    fi
    
    if [[ "$DRY_RUN" == false ]]; then
        cd "$PROJECT_ROOT"
        
        # Pull required images
        log_info "Pulling Docker images..."
        docker-compose -f "$compose_file" pull || {
            log_warning "Some images may not exist yet, continuing..."
        }
        
        # Create volumes
        log_info "Creating Docker volumes..."
        docker volume create "redis_data_$ENVIRONMENT" || log_info "Volume already exists"
        docker volume create "prometheus_data_$ENVIRONMENT" || log_info "Volume already exists"
        docker volume create "grafana_data_$ENVIRONMENT" || log_info "Volume already exists"
        docker volume create "loki_data_$ENVIRONMENT" || log_info "Volume already exists"
        
        log_success "Docker infrastructure prepared"
    else
        log_info "[DRY RUN] Would setup Docker infrastructure"
    fi
}

# Validate setup
validate_setup() {
    log_info "Validating infrastructure setup..."
    
    local issues=0
    
    # Check configuration files
    local required_files=(
        ".github/workflows/ci-cd-pipeline.yml"
        "docker/docker-compose.$ENVIRONMENT.yml"
        "docker/prometheus.production.yml"
        "docker/alertmanager.production.yml"
        "scripts/deploy-blue-green.sh"
        "scripts/validate-deployment.sh"
    )
    
    for file in "${required_files[@]}"; do
        local full_path="$PROJECT_ROOT/$file"
        if [[ -f "$full_path" ]]; then
            log_success "Found: $file"
        else
            log_error "Missing: $file"
            ((issues++))
        fi
    done
    
    # Check directories
    local required_dirs=(
        "logs/$ENVIRONMENT"
        "docker/ssl"
        ".github/workflows"
        ".github/environments"
    )
    
    for dir in "${required_dirs[@]}"; do
        local full_path="$PROJECT_ROOT/$dir"
        if [[ -d "$full_path" ]]; then
            log_success "Directory exists: $dir"
        else
            log_error "Missing directory: $dir"
            ((issues++))
        fi
    done
    
    # Check executable permissions
    local executables=(
        "scripts/deploy-blue-green.sh"
        "scripts/validate-deployment.sh"
        "scripts/health-check.sh"
    )
    
    for script in "${executables[@]}"; do
        local full_path="$PROJECT_ROOT/$script"
        if [[ -x "$full_path" ]]; then
            log_success "Executable: $script"
        else
            log_warning "Not executable: $script"
        fi
    done
    
    if [[ $issues -eq 0 ]]; then
        log_success "Infrastructure setup validation passed"
        return 0
    else
        log_error "Infrastructure setup validation failed with $issues issues"
        return 1
    fi
}

# Generate setup report
generate_report() {
    log_info "Generating infrastructure setup report..."
    
    local report_file="$PROJECT_ROOT/infrastructure-setup-report-$ENVIRONMENT.md"
    
    if [[ "$DRY_RUN" == false ]]; then
        cat > "$report_file" << EOF
# Infrastructure Setup Report

**Environment:** $ENVIRONMENT  
**Date:** $(date)  
**Setup by:** $(whoami)  

## Summary

✅ Infrastructure setup completed successfully for $ENVIRONMENT environment.

## Components Configured

### CI/CD Pipeline
- GitHub Actions workflows configured
- Quality gates implemented  
- Security scanning enabled
- Blue-green deployment ready

### Docker Infrastructure
- Multi-service Docker Compose setup
- Blue-green deployment containers
- Load balancer configuration
- SSL certificate management

### Monitoring Stack
- Prometheus metrics collection
- Grafana dashboards
- Loki log aggregation
- AlertManager notifications

### Security
- SSL/TLS configuration
- Security headers enforcement
- Rate limiting configured
- Vulnerability scanning enabled

## Next Steps

1. **Configure Secrets**: Set up GitHub repository secrets
2. **DNS Configuration**: Point domain to load balancer
3. **SSL Certificates**: Install production SSL certificates
4. **Monitoring**: Configure alert channels (Slack, PagerDuty)
5. **First Deployment**: Test deployment pipeline

## URLs

- **Application**: https://$ENVIRONMENT.rebootmedia.net
- **Grafana**: http://localhost:3000 (admin/admin)
- **Prometheus**: http://localhost:9090
- **AlertManager**: http://localhost:9093

## Scripts

- **Deploy**: \`./scripts/deploy-blue-green.sh\`
- **Validate**: \`./scripts/validate-deployment.sh\`
- **Health Check**: \`./scripts/health-check.sh\`

## Configuration Files

- Environment: \`.env.$ENVIRONMENT\`
- Docker Compose: \`docker/docker-compose.$ENVIRONMENT.yml\`
- Nginx: \`docker/nginx.lb.conf\`
- Prometheus: \`docker/prometheus.production.yml\`

## Support

For issues or questions, refer to:
- \`CI_CD_DEPLOYMENT_GUIDE.md\` - Complete deployment documentation
- \`README.md\` - Project overview
- Infrastructure team: devops@rebootmedia.net

---
Generated by infrastructure-setup.sh
EOF
        log_success "Infrastructure setup report saved to: $report_file"
    else
        log_info "[DRY RUN] Would generate infrastructure setup report"
    fi
}

# Main execution
main() {
    log_info "Starting infrastructure setup..."
    
    check_prerequisites
    create_directories
    generate_ssl_certs
    setup_monitoring
    setup_environment_config
    setup_docker_infrastructure
    
    if validate_setup; then
        generate_report
        
        echo ""
        log_success "=== Infrastructure Setup Complete ==="
        echo ""
        log_info "Environment: $ENVIRONMENT"
        log_info "Next steps:"
        echo ""
        echo "1. Review generated configuration files"
        echo "2. Configure GitHub repository secrets"
        echo "3. Test the deployment pipeline:"
        echo "   ./scripts/validate-deployment.sh -e $ENVIRONMENT"
        echo "4. Deploy your first version:"
        echo "   ./scripts/deploy-blue-green.sh -v latest -e $ENVIRONMENT"
        echo ""
        log_info "For complete documentation, see CI_CD_DEPLOYMENT_GUIDE.md"
        echo ""
    else
        log_error "Infrastructure setup failed validation"
        exit 1
    fi
}

# Run main function
main "$@"