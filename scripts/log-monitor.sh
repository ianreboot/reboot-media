#!/bin/bash

# Log Monitoring and Analysis Script
# Monitors application logs for errors, performance issues, and security events

set -e

# Configuration
LOG_DIR="."
ALERT_THRESHOLD_ERRORS=10
ALERT_THRESHOLD_RESPONSE_TIME=5000
MONITORING_DURATION=${1:-60}  # Default 60 seconds

echo "📊 Starting log monitoring for ${MONITORING_DURATION} seconds..."

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Create monitoring report
REPORT_FILE="monitoring-report-$(date +%Y%m%d-%H%M%S).json"

monitor_logs() {
    local start_time=$(date +%s)
    local end_time=$((start_time + MONITORING_DURATION))
    
    local error_count=0
    local warning_count=0
    local request_count=0
    local slow_requests=0
    
    echo "🔍 Monitoring active logs..."
    
    # Monitor server logs if they exist
    if [ -f "server.log" ]; then
        echo "📝 Monitoring server.log..."
        
        # Monitor for new log entries
        tail -f server.log 2>/dev/null | while IFS= read -r line; do
            current_time=$(date +%s)
            if [ $current_time -gt $end_time ]; then
                break
            fi
            
            echo "$line"
            
            # Count different log levels
            if echo "$line" | grep -q "ERROR\|error\|Error"; then
                ((error_count++))
                echo -e "${RED}🚨 ERROR DETECTED: $line${NC}"
            elif echo "$line" | grep -q "WARN\|warn\|Warning"; then
                ((warning_count++))
                echo -e "${YELLOW}⚠️  WARNING: $line${NC}"
            fi
            
            # Check for slow requests
            if echo "$line" | grep -qE "responseTime.*[0-9]{4,}"; then
                ((slow_requests++))
                echo -e "${YELLOW}🐌 SLOW REQUEST: $line${NC}"
            fi
            
            # Check for rate limiting
            if echo "$line" | grep -q "Rate limit exceeded"; then
                echo -e "${RED}🛡️  RATE LIMIT TRIGGERED: $line${NC}"
            fi
            
            # Check for security events
            if echo "$line" | grep -qE "CORS\|authentication\|authorization"; then
                echo -e "${BLUE}🔒 SECURITY EVENT: $line${NC}"
            fi
            
        done &
        
        TAIL_PID=$!
        
        # Wait for monitoring duration
        sleep $MONITORING_DURATION
        
        # Stop log monitoring
        kill $TAIL_PID 2>/dev/null || true
        
    else
        echo "⚠️  No server.log found, monitoring process logs instead..."
        
        # Monitor running processes for resource usage
        for i in $(seq 1 $MONITORING_DURATION); do
            # Find Node.js processes
            node_processes=$(pgrep -f "node" 2>/dev/null || true)
            
            if [ ! -z "$node_processes" ]; then
                for pid in $node_processes; do
                    if [ -d "/proc/$pid" ]; then
                        # Get memory usage
                        mem_usage=$(ps -o pid,vsz,rss,comm -p $pid 2>/dev/null | tail -1)
                        
                        # Check if memory usage is high (>500MB RSS)
                        rss=$(echo $mem_usage | awk '{print $3}')
                        if [ $rss -gt 500000 ]; then
                            echo -e "${YELLOW}⚠️  HIGH MEMORY USAGE: PID $pid using ${rss}KB RSS${NC}"
                        fi
                    fi
                done
            fi
            
            sleep 1
        done
    fi
}

generate_report() {
    cat > "$REPORT_FILE" << EOF
{
  "monitoring_session": {
    "timestamp": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
    "duration_seconds": $MONITORING_DURATION,
    "status": "completed"
  },
  "system_health": {
    "disk_usage": "$(df -h . | tail -1 | awk '{print $5}')",
    "memory_available": "$(free -h | grep '^Mem:' | awk '{print $7}' 2>/dev/null || echo 'unknown')",
    "load_average": "$(uptime | sed 's/.*load average: //' 2>/dev/null || echo 'unknown')"
  },
  "process_status": {
    "node_processes": $(pgrep -f "node" | wc -l 2>/dev/null || echo 0),
    "vite_processes": $(pgrep -f "vite" | wc -l 2>/dev/null || echo 0)
  },
  "log_analysis": {
    "log_files_monitored": [$(ls -1 *.log 2>/dev/null | sed 's/^/"/' | sed 's/$/"/' | tr '\n' ',' | sed 's/,$//') ],
    "monitoring_active": true
  },
  "recommendations": []
}
EOF

    echo "📋 Generated monitoring report: $REPORT_FILE"
}

cleanup() {
    echo ""
    echo "🛑 Monitoring stopped"
    generate_report
    exit 0
}

# Handle interrupt signal
trap cleanup INT TERM

# Start monitoring
monitor_logs

# Generate final report
cleanup