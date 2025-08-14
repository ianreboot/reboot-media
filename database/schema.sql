-- Lead Management Database Schema
-- Supports advanced lead scoring, analytics, and CRM integration

-- Create database (if not exists)
CREATE DATABASE IF NOT EXISTS reboot_leads;
USE reboot_leads;

-- Leads table - Core lead information
CREATE TABLE IF NOT EXISTS leads (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    email VARCHAR(254) NOT NULL UNIQUE,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50),
    company VARCHAR(100) NOT NULL,
    website VARCHAR(200),
    phone VARCHAR(20),
    
    -- Business information
    revenue_range ENUM('500k-1m', '1m-3m', '3m-10m', '10m+'),
    industry VARCHAR(50),
    team_size ENUM('1-10', '11-50', '51-200', '200+'),
    timeline ENUM('asap', '1-3months', '3-6months', '6months+'),
    
    -- Lead qualification
    lead_score INT DEFAULT 0,
    lead_tier ENUM('Hot', 'Warm', 'Cold', 'Unqualified') DEFAULT 'Cold',
    lead_status ENUM('new', 'contacted', 'qualified', 'unqualified', 'converted', 'lost') DEFAULT 'new',
    lead_source VARCHAR(100),
    
    -- Marketing information
    specific_issue TEXT,
    current_marketing TEXT,
    campaign_source VARCHAR(100),
    utm_source VARCHAR(100),
    utm_medium VARCHAR(100),
    utm_campaign VARCHAR(100),
    
    -- CRM integration
    crm_id VARCHAR(100),
    crm_provider ENUM('hubspot', 'salesforce', 'pipedrive', 'custom'),
    crm_sync_status ENUM('pending', 'synced', 'failed', 'disabled') DEFAULT 'pending',
    crm_last_sync TIMESTAMP NULL,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_activity_at TIMESTAMP NULL,
    converted_at TIMESTAMP NULL,
    
    -- Indexes for performance
    INDEX idx_email (email),
    INDEX idx_company (company),
    INDEX idx_lead_score (lead_score),
    INDEX idx_lead_tier (lead_tier),
    INDEX idx_lead_status (lead_status),
    INDEX idx_created_at (created_at),
    INDEX idx_crm_id (crm_id)
);

-- Lead scoring history
CREATE TABLE IF NOT EXISTS lead_scores (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    lead_id VARCHAR(36) NOT NULL,
    
    -- Score components
    demographic_score INT DEFAULT 0,
    behavioral_score INT DEFAULT 0,
    firmographic_score INT DEFAULT 0,
    intent_score INT DEFAULT 0,
    engagement_score INT DEFAULT 0,
    total_score INT DEFAULT 0,
    
    -- Qualification details
    tier ENUM('Hot', 'Warm', 'Cold', 'Unqualified'),
    priority INT DEFAULT 5,
    recommended_action TEXT,
    qualification_reasons JSON,
    disqualification_reasons JSON,
    
    -- Value predictions
    estimated_value DECIMAL(10, 2),
    conversion_probability DECIMAL(3, 2),
    predicted_clv DECIMAL(10, 2),
    
    -- Metadata
    scoring_version VARCHAR(10) DEFAULT '1.0',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE CASCADE,
    INDEX idx_lead_id (lead_id),
    INDEX idx_created_at (created_at)
);

-- Customer journey tracking
CREATE TABLE IF NOT EXISTS customer_journeys (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    lead_id VARCHAR(36),
    session_id VARCHAR(100) NOT NULL UNIQUE,
    user_id VARCHAR(36),
    
    -- Journey status
    status ENUM('active', 'converted', 'lost', 'nurturing') DEFAULT 'active',
    
    -- Attribution data
    first_touch_channel VARCHAR(50),
    first_touch_campaign VARCHAR(100),
    first_touch_timestamp TIMESTAMP NULL,
    last_touch_channel VARCHAR(50),
    last_touch_campaign VARCHAR(100),
    last_touch_timestamp TIMESTAMP NULL,
    
    -- Multi-touch attribution (JSON)
    channel_attribution JSON,
    campaign_attribution JSON,
    
    -- Timestamps
    start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE SET NULL,
    INDEX idx_lead_id (lead_id),
    INDEX idx_session_id (session_id),
    INDEX idx_status (status),
    INDEX idx_start_time (start_time)
);

-- Touchpoints in customer journey
CREATE TABLE IF NOT EXISTS touchpoints (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    journey_id VARCHAR(36) NOT NULL,
    
    -- Touchpoint details
    type ENUM('page_view', 'form_start', 'form_complete', 'content_download', 
              'email_open', 'email_click', 'chat_interaction', 'phone_call') NOT NULL,
    channel ENUM('organic', 'paid', 'social', 'email', 'direct', 'referral') NOT NULL,
    
    -- Additional data (JSON)
    details JSON,
    
    -- Scoring
    engagement_value INT DEFAULT 0,
    
    -- Timestamp
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (journey_id) REFERENCES customer_journeys(id) ON DELETE CASCADE,
    INDEX idx_journey_id (journey_id),
    INDEX idx_type (type),
    INDEX idx_channel (channel),
    INDEX idx_timestamp (timestamp)
);

-- Conversion events
CREATE TABLE IF NOT EXISTS conversion_events (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    lead_id VARCHAR(36) NOT NULL,
    journey_id VARCHAR(36),
    
    -- Event details
    type ENUM('micro', 'macro') NOT NULL,
    name VARCHAR(100) NOT NULL,
    value DECIMAL(10, 2),
    
    -- Attribution (JSON array of contributing touchpoints)
    attribution JSON,
    
    -- Timestamp
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE CASCADE,
    FOREIGN KEY (journey_id) REFERENCES customer_journeys(id) ON DELETE SET NULL,
    INDEX idx_lead_id (lead_id),
    INDEX idx_journey_id (journey_id),
    INDEX idx_type (type),
    INDEX idx_timestamp (timestamp)
);

-- Form submissions tracking
CREATE TABLE IF NOT EXISTS form_submissions (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    lead_id VARCHAR(36),
    session_id VARCHAR(100),
    
    -- Form details
    form_type ENUM('lead', 'contact', 'demo', 'newsletter') NOT NULL,
    form_data JSON NOT NULL,
    
    -- Security scoring
    security_score INT DEFAULT 0,
    bot_detected BOOLEAN DEFAULT FALSE,
    suspicious_content BOOLEAN DEFAULT FALSE,
    
    -- Processing
    processing_time_ms INT,
    email_sent BOOLEAN DEFAULT FALSE,
    
    -- Metadata
    ip_address VARCHAR(45),
    user_agent TEXT,
    referrer TEXT,
    
    -- Timestamps
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE SET NULL,
    INDEX idx_lead_id (lead_id),
    INDEX idx_session_id (session_id),
    INDEX idx_form_type (form_type),
    INDEX idx_submitted_at (submitted_at)
);

-- A/B tests configuration
CREATE TABLE IF NOT EXISTS ab_tests (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    test_id VARCHAR(100) NOT NULL UNIQUE,
    name VARCHAR(200) NOT NULL,
    hypothesis TEXT,
    
    -- Test configuration (JSON)
    variants JSON NOT NULL,
    metrics JSON,
    
    -- Test parameters
    sample_size INT DEFAULT 1000,
    confidence_level DECIMAL(3, 2) DEFAULT 0.95,
    
    -- Status
    status ENUM('planning', 'running', 'paused', 'completed', 'archived') DEFAULT 'planning',
    
    -- Results
    winner_variant VARCHAR(100),
    lift_percentage DECIMAL(5, 2),
    statistical_significance BOOLEAN DEFAULT FALSE,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    started_at TIMESTAMP NULL,
    completed_at TIMESTAMP NULL,
    
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
);

-- A/B test results
CREATE TABLE IF NOT EXISTS ab_test_results (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    test_id VARCHAR(36) NOT NULL,
    variant_id VARCHAR(100) NOT NULL,
    
    -- Metrics
    views INT DEFAULT 0,
    conversions INT DEFAULT 0,
    conversion_rate DECIMAL(5, 2) GENERATED ALWAYS AS 
        (CASE WHEN views > 0 THEN (conversions / views) * 100 ELSE 0 END) STORED,
    
    -- Additional metrics (JSON)
    custom_metrics JSON,
    
    -- Timestamp
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (test_id) REFERENCES ab_tests(id) ON DELETE CASCADE,
    UNIQUE KEY unique_test_variant (test_id, variant_id),
    INDEX idx_test_id (test_id)
);

-- Lead activities log
CREATE TABLE IF NOT EXISTS lead_activities (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    lead_id VARCHAR(36) NOT NULL,
    
    -- Activity details
    type ENUM('email', 'call', 'meeting', 'task', 'note', 'status_change') NOT NULL,
    subject VARCHAR(200),
    description TEXT,
    
    -- Outcome
    outcome VARCHAR(100),
    next_steps TEXT,
    
    -- Metadata
    performed_by VARCHAR(100),
    duration_minutes INT,
    
    -- Timestamp
    activity_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE CASCADE,
    INDEX idx_lead_id (lead_id),
    INDEX idx_type (type),
    INDEX idx_activity_date (activity_date)
);

-- Lead routing and assignment
CREATE TABLE IF NOT EXISTS lead_routing (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    lead_id VARCHAR(36) NOT NULL,
    
    -- Assignment
    assigned_to VARCHAR(100),
    assignment_reason TEXT,
    
    -- Routing details
    notification_channels JSON,
    follow_up_time VARCHAR(50),
    automation_triggers JSON,
    
    -- Status
    status ENUM('pending', 'assigned', 'accepted', 'rejected') DEFAULT 'pending',
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    assigned_at TIMESTAMP NULL,
    accepted_at TIMESTAMP NULL,
    
    FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE CASCADE,
    INDEX idx_lead_id (lead_id),
    INDEX idx_assigned_to (assigned_to),
    INDEX idx_status (status)
);

-- Analytics aggregations (materialized views for performance)
CREATE TABLE IF NOT EXISTS analytics_daily (
    date DATE PRIMARY KEY,
    
    -- Lead metrics
    total_leads INT DEFAULT 0,
    hot_leads INT DEFAULT 0,
    warm_leads INT DEFAULT 0,
    cold_leads INT DEFAULT 0,
    unqualified_leads INT DEFAULT 0,
    
    -- Conversion metrics
    form_views INT DEFAULT 0,
    form_starts INT DEFAULT 0,
    form_completions INT DEFAULT 0,
    conversion_rate DECIMAL(5, 2),
    
    -- Quality metrics
    average_lead_score DECIMAL(5, 2),
    average_time_to_conversion DECIMAL(10, 2), -- in hours
    
    -- Revenue metrics
    estimated_pipeline_value DECIMAL(12, 2),
    predicted_clv DECIMAL(12, 2),
    
    -- Attribution (JSON)
    channel_performance JSON,
    campaign_performance JSON,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_date (date)
);

-- Create views for common queries
CREATE OR REPLACE VIEW lead_overview AS
SELECT 
    l.*,
    ls.total_score as current_score,
    ls.tier as current_tier,
    ls.estimated_value,
    ls.conversion_probability,
    cj.status as journey_status,
    cj.first_touch_channel,
    cj.last_touch_channel
FROM leads l
LEFT JOIN (
    SELECT lead_id, MAX(created_at) as latest
    FROM lead_scores
    GROUP BY lead_id
) latest_score ON l.id = latest_score.lead_id
LEFT JOIN lead_scores ls ON ls.lead_id = l.id AND ls.created_at = latest_score.latest
LEFT JOIN customer_journeys cj ON cj.lead_id = l.id;

-- Create stored procedures for common operations
DELIMITER //

CREATE PROCEDURE update_lead_score(
    IN p_lead_id VARCHAR(36),
    IN p_total_score INT,
    IN p_tier VARCHAR(20)
)
BEGIN
    UPDATE leads 
    SET 
        lead_score = p_total_score,
        lead_tier = p_tier,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = p_lead_id;
END//

CREATE PROCEDURE get_funnel_metrics(
    IN p_start_date DATE,
    IN p_end_date DATE
)
BEGIN
    SELECT 
        'Landing Page' as stage,
        COUNT(DISTINCT session_id) as count,
        100 as conversion_rate
    FROM customer_journeys
    WHERE DATE(start_time) BETWEEN p_start_date AND p_end_date
    
    UNION ALL
    
    SELECT 
        'Form Started' as stage,
        COUNT(DISTINCT journey_id) as count,
        ROUND(COUNT(DISTINCT journey_id) * 100.0 / 
            (SELECT COUNT(DISTINCT session_id) FROM customer_journeys 
             WHERE DATE(start_time) BETWEEN p_start_date AND p_end_date), 2) as conversion_rate
    FROM touchpoints
    WHERE type = 'form_start'
    AND DATE(timestamp) BETWEEN p_start_date AND p_end_date
    
    UNION ALL
    
    SELECT 
        'Form Completed' as stage,
        COUNT(DISTINCT journey_id) as count,
        ROUND(COUNT(DISTINCT journey_id) * 100.0 / 
            (SELECT COUNT(DISTINCT journey_id) FROM touchpoints 
             WHERE type = 'form_start' 
             AND DATE(timestamp) BETWEEN p_start_date AND p_end_date), 2) as conversion_rate
    FROM touchpoints
    WHERE type = 'form_complete'
    AND DATE(timestamp) BETWEEN p_start_date AND p_end_date;
END//

DELIMITER ;

-- Create triggers for automatic updates
DELIMITER //

CREATE TRIGGER update_lead_activity
AFTER INSERT ON touchpoints
FOR EACH ROW
BEGIN
    UPDATE leads l
    INNER JOIN customer_journeys cj ON cj.lead_id = l.id
    SET l.last_activity_at = NEW.timestamp
    WHERE cj.id = NEW.journey_id;
END//

CREATE TRIGGER update_conversion_status
AFTER INSERT ON conversion_events
FOR EACH ROW
BEGIN
    IF NEW.type = 'macro' THEN
        UPDATE leads 
        SET 
            lead_status = 'converted',
            converted_at = NEW.timestamp
        WHERE id = NEW.lead_id;
    END IF;
END//

DELIMITER ;

-- Grant permissions (adjust as needed)
-- GRANT SELECT, INSERT, UPDATE ON reboot_leads.* TO 'app_user'@'localhost';
-- GRANT EXECUTE ON PROCEDURE reboot_leads.* TO 'app_user'@'localhost';