import React, { useState } from 'react';
import { 
  useEnhancedWebVitals, 
  usePerformanceBudgets, 
  useRealTimePerformance,
  type EnhancedMetric,
  type PerformanceBudgetAlert 
} from '../hooks/useEnhancedWebVitals';
// import { useBundleAnalysis } from '../hooks/useCoreWebVitals'; // TODO: Re-enable if needed

interface EnhancedPerformanceMonitorProps {
  showInProduction?: boolean;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  minimized?: boolean;
  enableAlerts?: boolean;
  enableTrends?: boolean;
  enableBudgets?: boolean;
}

export const EnhancedPerformanceMonitor: React.FC<EnhancedPerformanceMonitorProps> = ({
  showInProduction = false,
  position = 'bottom-right',
  minimized = true,
  enableAlerts = true,
  enableTrends = true,
  enableBudgets = true,
}) => {
  const [isExpanded, setIsExpanded] = useState(!minimized);
  const [activeTab, setActiveTab] = useState<'overview' | 'budgets' | 'trends' | 'network' | 'recommendations'>('overview');
  
  const metrics = useEnhancedWebVitals();
  const budgets = usePerformanceBudgets();
  const network = useRealTimePerformance();
  // const bundleData = useBundleAnalysis(); // TODO: Re-enable if needed

  // Don't show in production unless explicitly enabled
  if (process.env.NODE_ENV === 'production' && !showInProduction) {
    return null;
  }

  const positionStyles = {
    'top-left': { top: '20px', left: '20px' },
    'top-right': { top: '20px', right: '20px' },
    'bottom-left': { bottom: '20px', left: '20px' },
    'bottom-right': { bottom: '20px', right: '20px' },
  };

  // Color utilities
  const getMetricColor = (rating?: string): string => {
    switch (rating) {
      case 'good': return '#22c55e';
      case 'needs-improvement': return '#eab308';
      case 'poor': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getBudgetStatusColor = (status: string): string => {
    switch (status) {
      case 'within-budget': return '#22c55e';
      case 'at-risk': return '#eab308';
      case 'over-budget': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getTrendIcon = (trend?: string): string => {
    switch (trend) {
      case 'improving': return '📈';
      case 'degrading': return '📉';
      case 'stable': return '➡️';
      default: return '⭐';
    }
  };

  const getGradeColor = (grade: string): string => {
    switch (grade) {
      case 'A': return '#22c55e';
      case 'B': return '#84cc16';
      case 'C': return '#eab308';
      case 'D': return '#f97316';
      case 'F': return '#ef4444';
      default: return '#6b7280';
    }
  };

  // Format values
  const formatValue = (value: number, unit: string): string => {
    if (unit === 'ms') return `${value.toFixed(0)}${unit}`;
    if (unit === '') return value.toFixed(3);
    return `${value}${unit}`;
  };

  // const formatBytes = (bytes: number): string => {
  //   return `${(bytes / 1024).toFixed(0)}KB`;
  // };

  // Enhanced metric row with budget and trend
  const EnhancedMetricRow: React.FC<{ 
    name: string; 
    metric: EnhancedMetric | null; 
    unit: string;
    showBudget?: boolean;
    showTrend?: boolean;
  }> = ({ name, metric, unit, showBudget = true, showTrend = true }) => (
    <div style={{ 
      padding: '8px 0', 
      borderBottom: '1px solid #f3f4f6',
      fontSize: '12px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontWeight: '600', color: '#374151' }}>{name}</span>
          {showTrend && metric?.trend && (
            <span title={`Trend: ${metric.trend}`}>{getTrendIcon(metric.trend)}</span>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: getMetricColor(metric?.rating), fontWeight: '500' }}>
            {metric ? formatValue(metric.value, unit) : '-'}
          </span>
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: getMetricColor(metric?.rating),
            }}
          />
        </div>
      </div>
      
      {showBudget && metric?.budget && (
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#6b7280' }}>
          <span>Budget: {formatValue(metric.budget.target, unit)}</span>
          <span style={{ color: getBudgetStatusColor(metric.budget.status) }}>
            {metric.budget.status.replace('-', ' ')}
          </span>
        </div>
      )}
    </div>
  );

  // Budget alert component
  const BudgetAlert: React.FC<{ alert: PerformanceBudgetAlert }> = ({ alert }) => (
    <div style={{
      padding: '8px 12px',
      backgroundColor: alert.severity === 'critical' ? '#fef2f2' : '#fffbeb',
      borderLeft: `4px solid ${alert.severity === 'critical' ? '#ef4444' : '#eab308'}`,
      borderRadius: '4px',
      marginBottom: '8px',
    }}>
      <div style={{ 
        fontSize: '11px', 
        fontWeight: '600', 
        color: alert.severity === 'critical' ? '#dc2626' : '#d97706',
        marginBottom: '2px'
      }}>
        {alert.severity === 'critical' ? '🚨' : '⚠️'} {alert.message}
      </div>
      <div style={{ fontSize: '10px', color: '#6b7280' }}>
        {alert.recommendation}
      </div>
    </div>
  );

  // Network status indicator
  const NetworkIndicator: React.FC = () => (
    <div style={{ padding: '12px 0' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
        <div style={{ padding: '8px', backgroundColor: '#f9fafb', borderRadius: '4px' }}>
          <div style={{ fontSize: '10px', color: '#6b7280' }}>Connection</div>
          <div style={{ fontSize: '12px', fontWeight: '600', color: '#374151' }}>
            {network.connectionType}
          </div>
        </div>
        <div style={{ padding: '8px', backgroundColor: '#f9fafb', borderRadius: '4px' }}>
          <div style={{ fontSize: '10px', color: '#6b7280' }}>Status</div>
          <div style={{ 
            fontSize: '12px', 
            fontWeight: '600', 
            color: network.isOnline ? '#22c55e' : '#ef4444' 
          }}>
            {network.isOnline ? '🟢 Online' : '🔴 Offline'}
          </div>
        </div>
        <div style={{ padding: '8px', backgroundColor: '#f9fafb', borderRadius: '4px' }}>
          <div style={{ fontSize: '10px', color: '#6b7280' }}>Bandwidth</div>
          <div style={{ fontSize: '12px', fontWeight: '600', color: '#374151' }}>
            {network.bandwidth ? `${network.bandwidth} Mbps` : 'Unknown'}
          </div>
        </div>
        <div style={{ padding: '8px', backgroundColor: '#f9fafb', borderRadius: '4px' }}>
          <div style={{ fontSize: '10px', color: '#6b7280' }}>Latency</div>
          <div style={{ fontSize: '12px', fontWeight: '600', color: '#374151' }}>
            {network.latency ? `${network.latency.toFixed(0)}ms` : 'Unknown'}
          </div>
        </div>
      </div>
    </div>
  );

  // Performance recommendations
  const RecommendationsPanel: React.FC = () => (
    <div>
      {metrics.recommendations.length > 0 ? (
        <div>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600', color: '#374151' }}>
            🎯 Performance Recommendations
          </h4>
          <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '12px', color: '#6b7280' }}>
            {metrics.recommendations.map((rec: string, index: number) => (
              <li key={index} style={{ marginBottom: '6px' }}>{rec}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div style={{
          padding: '16px',
          textAlign: 'center',
          backgroundColor: '#f0fdf4',
          borderRadius: '6px',
          color: '#166534',
        }}>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>🎉</div>
          <div style={{ fontSize: '12px', fontWeight: '600' }}>All metrics performing well!</div>
          <div style={{ fontSize: '11px', marginTop: '4px' }}>No recommendations at this time.</div>
        </div>
      )}
    </div>
  );

  // Trend analysis panel
  const TrendAnalysisPanel: React.FC = () => (
    <div>
      <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600', color: '#374151' }}>
        📊 Trend Analysis
      </h4>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '16px' }}>
        <div style={{ padding: '8px', backgroundColor: '#f0fdf4', borderRadius: '4px', textAlign: 'center' }}>
          <div style={{ fontSize: '18px', fontWeight: '700', color: '#166534' }}>
            {metrics.trendAnalysis.improving}
          </div>
          <div style={{ fontSize: '10px', color: '#166534' }}>Improving</div>
        </div>
        <div style={{ padding: '8px', backgroundColor: '#fef2f2', borderRadius: '4px', textAlign: 'center' }}>
          <div style={{ fontSize: '18px', fontWeight: '700', color: '#dc2626' }}>
            {metrics.trendAnalysis.degrading}
          </div>
          <div style={{ fontSize: '10px', color: '#dc2626' }}>Degrading</div>
        </div>
        <div style={{ padding: '8px', backgroundColor: '#f9fafb', borderRadius: '4px', textAlign: 'center' }}>
          <div style={{ fontSize: '18px', fontWeight: '700', color: '#6b7280' }}>
            {metrics.trendAnalysis.stable}
          </div>
          <div style={{ fontSize: '10px', color: '#6b7280' }}>Stable</div>
        </div>
      </div>
      
      <div style={{ fontSize: '11px', color: '#6b7280' }}>
        <strong>Trend Analysis:</strong> Based on the last 10 measurements per metric. 
        Improving means performance is getting better over time.
      </div>
    </div>
  );

  return (
    <div
      style={{
        position: 'fixed',
        ...positionStyles[position],
        backgroundColor: 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(12px)',
        border: '1px solid #e5e7eb',
        borderRadius: '16px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        zIndex: 10000,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        minWidth: isExpanded ? '400px' : '120px',
        maxWidth: '500px',
        maxHeight: '90vh',
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '16px 20px',
          borderBottom: isExpanded ? '1px solid #e5e7eb' : 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: isExpanded 
            ? `linear-gradient(135deg, ${getGradeColor(metrics.grade)}15, transparent)`
            : 'transparent',
        }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: getGradeColor(metrics.grade),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '14px',
              fontWeight: '700',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
          >
            {metrics.isLoading ? '...' : metrics.grade}
          </div>
          {isExpanded && (
            <div>
              <div style={{ fontSize: '16px', fontWeight: '600', color: '#111827', marginBottom: '2px' }}>
                Performance Score
              </div>
              <div style={{ fontSize: '13px', color: '#6b7280' }}>
                {metrics.isLoading ? 'Loading...' : `${metrics.score}/100`}
                {enableBudgets && (
                  <span style={{ marginLeft: '8px', fontSize: '11px' }}>
                    • Budget: {budgets.budgetCompliance}%
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* Status indicators */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {enableAlerts && budgets.violations.length > 0 && (
            <div
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#ef4444',
                animation: 'pulse 2s infinite',
              }}
              title={`${budgets.violations.length} budget violation(s)`}
            />
          )}
          <div
            style={{
              fontSize: '18px',
              color: '#6b7280',
              transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease',
            }}
          >
            ▼
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div style={{ maxHeight: 'calc(90vh - 80px)', overflow: 'auto' }}>
          {/* Tabs */}
          <div style={{ 
            display: 'flex', 
            borderBottom: '1px solid #e5e7eb', 
            backgroundColor: '#fafafa',
            flexWrap: 'wrap',
          }}>
            {[
              { key: 'overview', label: 'Overview', icon: '📊' },
              { key: 'budgets', label: 'Budgets', icon: '💰', enabled: enableBudgets },
              { key: 'trends', label: 'Trends', icon: '📈', enabled: enableTrends },
              { key: 'network', label: 'Network', icon: '🌐' },
              { key: 'recommendations', label: 'Tips', icon: '💡' },
            ]
              .filter(tab => tab.enabled !== false)
              .map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                style={{
                  flex: '1 1 auto',
                  minWidth: '70px',
                  padding: '8px 6px',
                  border: 'none',
                  backgroundColor: activeTab === tab.key ? '#ffffff' : 'transparent',
                  fontSize: '10px',
                  fontWeight: '600',
                  color: activeTab === tab.key ? '#111827' : '#6b7280',
                  cursor: 'pointer',
                  borderBottom: activeTab === tab.key ? '2px solid #3b82f6' : 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '2px',
                }}
              >
                <span style={{ fontSize: '12px' }}>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div style={{ padding: '20px' }}>
            {activeTab === 'overview' && (
              <div>
                {/* Core Web Vitals */}
                <div style={{ marginBottom: '20px' }}>
                  <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600', color: '#374151' }}>
                    🚀 Core Web Vitals
                  </h4>
                  <EnhancedMetricRow 
                    name="LCP" 
                    metric={metrics.lcp} 
                    unit="ms" 
                    showBudget={enableBudgets}
                    showTrend={enableTrends}
                  />
                  <EnhancedMetricRow 
                    name="CLS" 
                    metric={metrics.cls} 
                    unit="" 
                    showBudget={enableBudgets}
                    showTrend={enableTrends}
                  />
                  <EnhancedMetricRow 
                    name="FID" 
                    metric={metrics.fid} 
                    unit="ms" 
                    showBudget={enableBudgets}
                    showTrend={enableTrends}
                  />
                  <EnhancedMetricRow 
                    name="TTFB" 
                    metric={metrics.ttfb} 
                    unit="ms" 
                    showBudget={enableBudgets}
                    showTrend={enableTrends}
                  />
                  <EnhancedMetricRow 
                    name="INP" 
                    metric={metrics.inp} 
                    unit="ms" 
                    showBudget={enableBudgets}
                    showTrend={enableTrends}
                  />
                </div>

                {/* Overall status */}
                {metrics.allGood ? (
                  <div
                    style={{
                      padding: '12px 16px',
                      backgroundColor: '#f0fdf4',
                      color: '#166534',
                      borderRadius: '8px',
                      fontSize: '12px',
                      textAlign: 'center',
                      fontWeight: '600',
                    }}
                  >
                    🎉 All metrics are performing excellently!
                  </div>
                ) : (
                  <div
                    style={{
                      padding: '12px 16px',
                      backgroundColor: '#fffbeb',
                      color: '#d97706',
                      borderRadius: '8px',
                      fontSize: '11px',
                      textAlign: 'center',
                    }}
                  >
                    ⚠️ Some metrics need attention. Check recommendations.
                  </div>
                )}
              </div>
            )}

            {activeTab === 'budgets' && enableBudgets && (
              <div>
                <div style={{ marginBottom: '16px' }}>
                  <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600', color: '#374151' }}>
                    💰 Performance Budgets
                  </h4>
                  <div style={{ 
                    padding: '12px 16px', 
                    backgroundColor: getBudgetStatusColor(budgets.overall) + '15',
                    borderRadius: '8px',
                    marginBottom: '16px'
                  }}>
                    <div style={{ fontSize: '12px', fontWeight: '600', color: '#374151' }}>
                      Budget Compliance: {budgets.budgetCompliance}%
                    </div>
                    <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '4px' }}>
                      {budgets.metricsWithinBudget}/{budgets.totalMetrics} metrics within budget
                    </div>
                  </div>
                </div>

                {/* Budget violations */}
                {budgets.violations.length > 0 ? (
                  <div>
                    <h5 style={{ margin: '0 0 8px 0', fontSize: '12px', fontWeight: '600', color: '#dc2626' }}>
                      Budget Violations ({budgets.violations.length})
                    </h5>
                    {budgets.violations.map((alert, index) => (
                      <BudgetAlert key={index} alert={alert} />
                    ))}
                  </div>
                ) : (
                  <div style={{
                    padding: '16px',
                    textAlign: 'center',
                    backgroundColor: '#f0fdf4',
                    borderRadius: '6px',
                    color: '#166534',
                  }}>
                    <div style={{ fontSize: '24px', marginBottom: '8px' }}>✅</div>
                    <div style={{ fontSize: '12px', fontWeight: '600' }}>All budgets satisfied!</div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'trends' && enableTrends && <TrendAnalysisPanel />}

            {activeTab === 'network' && <NetworkIndicator />}

            {activeTab === 'recommendations' && <RecommendationsPanel />}
          </div>
        </div>
      )}
      
      {/* Add keyframes for pulse animation */}
      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}
      </style>
    </div>
  );
};

export default EnhancedPerformanceMonitor;