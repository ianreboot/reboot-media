#!/bin/bash

# Deploy Complete Monitoring and Observability Stack
# Production deployment script for Reboot Media monitoring infrastructure

set -euo pipefail

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" &> /dev/null && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
MONITORING_COMPOSE="$PROJECT_ROOT/docker/docker-compose.monitoring.yml"
ENV_FILE="$PROJECT_ROOT/.env.monitoring"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check prerequisites
check_prerequisites() {
    log_info "Checking prerequisites..."
    
    # Check Docker
    if ! command -v docker &> /dev/null; then
        log_error "Docker is not installed"
        exit 1
    fi
    
    # Check Docker Compose
    if ! command -v docker-compose &> /dev/null; then
        log_error "Docker Compose is not installed"
        exit 1
    fi
    
    # Check available disk space (minimum 50GB for monitoring data)
    AVAILABLE_SPACE=$(df / | awk 'NR==2 {print $4}')
    REQUIRED_SPACE=52428800  # 50GB in KB
    
    if [ "$AVAILABLE_SPACE" -lt "$REQUIRED_SPACE" ]; then
        log_error "Insufficient disk space. Required: 50GB, Available: $((AVAILABLE_SPACE / 1024 / 1024))GB"
        exit 1
    fi
    
    # Check available memory (minimum 16GB for Elasticsearch cluster)
    AVAILABLE_MEMORY=$(free -m | awk 'NR==2{print $2}')
    REQUIRED_MEMORY=16384  # 16GB in MB
    
    if [ "$AVAILABLE_MEMORY" -lt "$REQUIRED_MEMORY" ]; then
        log_error "Insufficient memory. Required: 16GB, Available: ${AVAILABLE_MEMORY}MB"
        exit 1
    fi
    
    log_success "Prerequisites check passed"
}

# Create necessary directories
create_directories() {
    log_info "Creating monitoring data directories..."
    
    sudo mkdir -p /opt/reboot/monitoring/data/{prometheus,grafana,alertmanager,elasticsearch-{1,2,3},redis}
    sudo mkdir -p /opt/reboot/monitoring/logs
    sudo mkdir -p /opt/reboot/monitoring/ssl
    sudo mkdir -p /opt/reboot/monitoring/backups
    
    # Set proper ownership
    sudo chown -R 1000:1000 /opt/reboot/monitoring/data/grafana
    sudo chown -R 65534:65534 /opt/reboot/monitoring/data/prometheus
    sudo chown -R 65534:65534 /opt/reboot/monitoring/data/alertmanager
    sudo chown -R 1000:1000 /opt/reboot/monitoring/data/elasticsearch-{1,2,3}
    sudo chown -R 999:999 /opt/reboot/monitoring/data/redis
    
    log_success "Directories created successfully"
}

# Generate SSL certificates
generate_ssl_certificates() {
    log_info "Generating SSL certificates for monitoring services..."
    
    SSL_DIR="/opt/reboot/monitoring/ssl"
    
    if [ ! -f "$SSL_DIR/monitoring.crt" ]; then
        # Generate CA key and certificate
        openssl genrsa -out "$SSL_DIR/ca.key" 4096
        openssl req -new -x509 -key "$SSL_DIR/ca.key" -sha256 -subj "/C=US/ST=CA/O=RebootMedia/CN=RebootMedia-CA" -days 3650 -out "$SSL_DIR/ca.crt"
        
        # Generate monitoring certificate
        openssl genrsa -out "$SSL_DIR/monitoring.key" 4096
        openssl req -subj "/C=US/ST=CA/O=RebootMedia/CN=monitoring.rebootmedia.net" -sha256 -new -key "$SSL_DIR/monitoring.key" -out "$SSL_DIR/monitoring.csr"
        openssl x509 -req -in "$SSL_DIR/monitoring.csr" -CA "$SSL_DIR/ca.crt" -CAkey "$SSL_DIR/ca.key" -out "$SSL_DIR/monitoring.crt" -days 365 -sha256
        
        # Generate Elasticsearch certificates
        openssl genrsa -out "$SSL_DIR/elasticsearch.key" 4096
        openssl req -subj "/C=US/ST=CA/O=RebootMedia/CN=elasticsearch" -sha256 -new -key "$SSL_DIR/elasticsearch.key" -out "$SSL_DIR/elasticsearch.csr"
        openssl x509 -req -in "$SSL_DIR/elasticsearch.csr" -CA "$SSL_DIR/ca.crt" -CAkey "$SSL_DIR/ca.key" -out "$SSL_DIR/elasticsearch.crt" -days 365 -sha256
        
        # Create PKCS12 bundle for Elasticsearch
        openssl pkcs12 -export -in "$SSL_DIR/elasticsearch.crt" -inkey "$SSL_DIR/elasticsearch.key" -out "$SSL_DIR/elastic-certificates.p12" -name "elasticsearch" -passout pass:elastic
        
        log_success "SSL certificates generated"
    else
        log_info "SSL certificates already exist, skipping generation"
    fi
}

# Set up environment variables
setup_environment() {
    log_info "Setting up monitoring environment variables..."
    
    if [ ! -f "$ENV_FILE" ]; then
        cat > "$ENV_FILE" << EOF
# Reboot Media Monitoring Stack Environment Variables

# Grafana Configuration
GRAFANA_ADMIN_USER=admin
GRAFANA_ADMIN_PASSWORD=$(openssl rand -base64 32)
GRAFANA_SECRET_KEY=$(openssl rand -base64 32)

# Elasticsearch Configuration
ELASTICSEARCH_PASSWORD=$(openssl rand -base64 32)
KIBANA_ENCRYPTION_KEY=$(openssl rand -base64 32)

# Alerting Configuration
SLACK_WEBHOOK_URL=${SLACK_WEBHOOK_URL:-}
PAGERDUTY_SERVICE_KEY_CRITICAL=${PAGERDUTY_SERVICE_KEY_CRITICAL:-}
SENDGRID_API_KEY=${SENDGRID_API_KEY:-}

# Service Version
SERVICE_VERSION=1.0.0

# Monitoring Configuration
PROMETHEUS_RETENTION_DAYS=30
ELASTICSEARCH_RETENTION_DAYS=90
EOF
        
        log_success "Environment file created at $ENV_FILE"
        log_warning "Please update the environment file with your specific values before deploying"
        
        # Secure the environment file
        chmod 600 "$ENV_FILE"
    else
        log_info "Environment file already exists"
    fi
}

# Configure system settings for Elasticsearch
configure_system_settings() {
    log_info "Configuring system settings for Elasticsearch..."
    
    # Set vm.max_map_count for Elasticsearch
    echo 'vm.max_map_count=262144' | sudo tee -a /etc/sysctl.conf
    sudo sysctl -w vm.max_map_count=262144
    
    # Set ulimits for Elasticsearch
    echo '* soft nofile 65536' | sudo tee -a /etc/security/limits.conf
    echo '* hard nofile 65536' | sudo tee -a /etc/security/limits.conf
    echo '* soft memlock unlimited' | sudo tee -a /etc/security/limits.conf
    echo '* hard memlock unlimited' | sudo tee -a /etc/security/limits.conf
    
    log_success "System settings configured"
}

# Deploy monitoring stack
deploy_monitoring_stack() {
    log_info "Deploying monitoring stack..."
    
    cd "$PROJECT_ROOT"
    
    # Pull all images first
    log_info "Pulling Docker images..."
    docker-compose -f "$MONITORING_COMPOSE" --env-file "$ENV_FILE" pull
    
    # Start core services first (Elasticsearch cluster)
    log_info "Starting Elasticsearch cluster..."
    docker-compose -f "$MONITORING_COMPOSE" --env-file "$ENV_FILE" up -d elasticsearch-1 elasticsearch-2 elasticsearch-3
    
    # Wait for Elasticsearch cluster to be ready
    log_info "Waiting for Elasticsearch cluster to be ready..."
    for i in {1..60}; do
        if docker exec reboot-elasticsearch-1 curl -s -u "elastic:$(grep ELASTICSEARCH_PASSWORD $ENV_FILE | cut -d'=' -f2)" "https://localhost:9200/_cluster/health?wait_for_status=green&timeout=5s" > /dev/null 2>&1; then
            log_success "Elasticsearch cluster is ready"
            break
        fi
        echo -n "."
        sleep 5
    done
    
    # Start log processing services
    log_info "Starting log processing services..."
    docker-compose -f "$MONITORING_COMPOSE" --env-file "$ENV_FILE" up -d logstash kibana filebeat
    
    # Start monitoring services
    log_info "Starting monitoring services..."
    docker-compose -f "$MONITORING_COMPOSE" --env-file "$ENV_FILE" up -d prometheus grafana alertmanager
    
    # Start supporting services
    log_info "Starting supporting services..."
    docker-compose -f "$MONITORING_COMPOSE" --env-file "$ENV_FILE" up -d node-exporter blackbox-exporter redis-cluster nginx-lb
    
    log_success "Monitoring stack deployed successfully"
}

# Verify deployment
verify_deployment() {
    log_info "Verifying monitoring stack deployment..."
    
    # Check service health
    SERVICES=(
        "prometheus:9090"
        "grafana:3000" 
        "alertmanager:9093"
        "elasticsearch-1:9200"
        "kibana:5601"
        "node-exporter:9100"
        "blackbox-exporter:9115"
        "redis-cluster:6379"
    )
    
    for service in "${SERVICES[@]}"; do
        SERVICE_NAME=$(echo "$service" | cut -d':' -f1)
        SERVICE_PORT=$(echo "$service" | cut -d':' -f2)
        
        if docker exec "reboot-${SERVICE_NAME}" curl -f "http://localhost:${SERVICE_PORT}" > /dev/null 2>&1; then
            log_success "$SERVICE_NAME is healthy"
        else
            log_warning "$SERVICE_NAME health check failed"
        fi
    done
    
    # Check Docker Compose services
    log_info "Checking Docker Compose service status..."
    docker-compose -f "$MONITORING_COMPOSE" --env-file "$ENV_FILE" ps
}

# Create initial Grafana dashboards
setup_initial_dashboards() {
    log_info "Setting up initial Grafana dashboards..."
    
    # Wait for Grafana to be fully ready
    for i in {1..30}; do
        if docker exec reboot-grafana curl -f http://localhost:3000/api/health > /dev/null 2>&1; then
            break
        fi
        sleep 2
    done
    
    # Import dashboards via API (if needed)
    GRAFANA_URL="http://localhost:3000"
    GRAFANA_USER=$(grep GRAFANA_ADMIN_USER "$ENV_FILE" | cut -d'=' -f2)
    GRAFANA_PASS=$(grep GRAFANA_ADMIN_PASSWORD "$ENV_FILE" | cut -d'=' -f2)
    
    log_success "Grafana dashboards are configured via provisioning"
}

# Display access information
display_access_info() {
    log_success "Monitoring stack deployment completed!"
    echo ""
    echo "=== Access Information ==="
    echo "Grafana (Dashboards):      http://localhost:3000"
    echo "  Username: $(grep GRAFANA_ADMIN_USER "$ENV_FILE" | cut -d'=' -f2)"
    echo "  Password: $(grep GRAFANA_ADMIN_PASSWORD "$ENV_FILE" | cut -d'=' -f2)"
    echo ""
    echo "Kibana (Logs):            http://localhost:5601"
    echo "  Username: elastic"
    echo "  Password: $(grep ELASTICSEARCH_PASSWORD "$ENV_FILE" | cut -d'=' -f2)"
    echo ""
    echo "Prometheus (Metrics):      http://localhost:9090"
    echo "Alertmanager (Alerts):     http://localhost:9093"
    echo ""
    echo "=== Important Files ==="
    echo "Environment variables:     $ENV_FILE"
    echo "SSL certificates:          /opt/reboot/monitoring/ssl/"
    echo "Data directory:            /opt/reboot/monitoring/data/"
    echo "Logs directory:            /opt/reboot/monitoring/logs/"
    echo ""
    echo "=== Next Steps ==="
    echo "1. Update $ENV_FILE with your Slack/PagerDuty/SendGrid credentials"
    echo "2. Configure DNS entries for monitoring.rebootmedia.net"
    echo "3. Set up SSL certificates for production domains"
    echo "4. Review and customize alert rules in monitoring/prometheus/alert-rules.yml"
    echo "5. Test alerting integrations"
    echo ""
}

# Backup configuration
create_backup() {
    log_info "Creating configuration backup..."
    
    BACKUP_DIR="/opt/reboot/monitoring/backups/$(date +%Y%m%d_%H%M%S)"
    mkdir -p "$BACKUP_DIR"
    
    # Backup configuration files
    cp -r "$PROJECT_ROOT/monitoring" "$BACKUP_DIR/"
    cp "$ENV_FILE" "$BACKUP_DIR/"
    cp "$MONITORING_COMPOSE" "$BACKUP_DIR/"
    
    log_success "Configuration backed up to $BACKUP_DIR"
}

# Main execution
main() {
    log_info "Starting monitoring stack deployment..."
    
    check_prerequisites
    create_directories
    generate_ssl_certificates
    setup_environment
    configure_system_settings
    create_backup
    deploy_monitoring_stack
    verify_deployment
    setup_initial_dashboards
    display_access_info
    
    log_success "Monitoring stack deployment completed successfully!"
}

# Execute main function
main "$@"