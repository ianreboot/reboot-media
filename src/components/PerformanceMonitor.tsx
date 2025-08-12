import React, { useState } from 'react';
import { usePerformanceScore, useCoreWebVitals, useMetricOptimization, performanceOptimizations } from '../hooks/useCoreWebVitals';

interface PerformanceMonitorProps {
  showInProduction?: boolean;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  minimized?: boolean;
}

export const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  showInProduction = false,
  position = 'bottom-right',
  minimized = true,
}) => {
  const [isExpanded, setIsExpanded] = useState(!minimized);
  const [activeTab, setActiveTab] = useState<'overview' | 'details' | 'optimizations'>('overview');
  
  const { score, grade, color, isLoading, allGood } = usePerformanceScore();
  const metrics = useCoreWebVitals();

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

  const formatValue = (value: number, unit: string): string => {
    if (unit === 'ms') {
      return `${value.toFixed(0)}${unit}`;
    }
    if (unit === '') {
      return value.toFixed(3);
    }
    return `${value}${unit}`;
  };

  const getMetricColor = (rating?: string): string => {
    switch (rating) {
      case 'good': return '#22c55e';
      case 'needs-improvement': return '#eab308';
      case 'poor': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const MetricRow: React.FC<{ name: string; metric: any; unit: string }> = ({ name, metric, unit }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 0' }}>
      <span style={{ fontSize: '12px', fontWeight: '500' }}>{name}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '12px', color: getMetricColor(metric?.rating) }}>
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
  );

  const OptimizationSection: React.FC<{ metricName: keyof typeof metrics }> = ({ metricName }) => {
    const { metric, optimizations, isGood } = useMetricOptimization(metricName);
    
    if (isGood || !metric) return null;

    return (
      <div style={{ marginBottom: '16px', padding: '12px', backgroundColor: '#f9fafb', borderRadius: '6px' }}>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: '600', color: '#374151' }}>
          {metricName.toUpperCase()} Optimizations
        </h4>
        <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '12px', color: '#6b7280' }}>
          {optimizations?.recommendations.slice(0, 3).map((rec, index) => (
            <li key={index} style={{ marginBottom: '4px' }}>{rec}</li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div
      style={{
        position: 'fixed',
        ...positionStyles[position],
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        border: '1px solid #e5e7eb',
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        zIndex: 10000,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        minWidth: isExpanded ? '320px' : '80px',
        maxHeight: '80vh',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '12px 16px',
          borderBottom: isExpanded ? '1px solid #e5e7eb' : 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '12px',
              fontWeight: '700',
            }}
          >
            {isLoading ? '...' : grade}
          </div>
          {isExpanded && (
            <div>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>
                Performance Score
              </div>
              <div style={{ fontSize: '12px', color: '#6b7280' }}>
                {isLoading ? 'Loading...' : `${score}/100`}
              </div>
            </div>
          )}
        </div>
        <div
          style={{
            fontSize: '16px',
            color: '#6b7280',
            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease',
          }}
        >
          ▼
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div style={{ maxHeight: '400px', overflow: 'auto' }}>
          {/* Tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid #e5e7eb' }}>
            {['overview', 'details', 'optimizations'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  border: 'none',
                  backgroundColor: activeTab === tab ? '#f3f4f6' : 'transparent',
                  fontSize: '12px',
                  fontWeight: '500',
                  color: activeTab === tab ? '#374151' : '#6b7280',
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div style={{ padding: '16px' }}>
            {activeTab === 'overview' && (
              <div>
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '8px' }}>
                    Core Web Vitals
                  </div>
                  <MetricRow name="LCP" metric={metrics.lcp} unit="ms" />
                  <MetricRow name="FID" metric={metrics.fid} unit="ms" />
                  <MetricRow name="CLS" metric={metrics.cls} unit="" />
                  <MetricRow name="TTFB" metric={metrics.ttfb} unit="ms" />
                  <MetricRow name="INP" metric={metrics.inp} unit="ms" />
                </div>
                
                {allGood && (
                  <div
                    style={{
                      padding: '8px 12px',
                      backgroundColor: '#dcfce7',
                      color: '#166534',
                      borderRadius: '6px',
                      fontSize: '12px',
                      textAlign: 'center',
                    }}
                  >
                    🎉 All metrics are in good range!
                  </div>
                )}
              </div>
            )}

            {activeTab === 'details' && (
              <div style={{ fontSize: '12px', color: '#6b7280' }}>
                <div style={{ marginBottom: '12px' }}>
                  <strong>Performance Thresholds:</strong>
                </div>
                <div style={{ marginBottom: '8px' }}>LCP: &lt;2.5s (good), &lt;4s (needs improvement)</div>
                <div style={{ marginBottom: '8px' }}>FID: &lt;100ms (good), &lt;300ms (needs improvement)</div>
                <div style={{ marginBottom: '8px' }}>CLS: &lt;0.1 (good), &lt;0.25 (needs improvement)</div>
                <div style={{ marginBottom: '8px' }}>TTFB: &lt;800ms (good), &lt;1.8s (needs improvement)</div>
                <div style={{ marginBottom: '8px' }}>INP: &lt;200ms (good), &lt;500ms (needs improvement)</div>
              </div>
            )}

            {activeTab === 'optimizations' && (
              <div>
                <button
                  onClick={performanceOptimizations.optimizeAll}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    marginBottom: '16px',
                  }}
                >
                  Apply All Optimizations
                </button>
                
                <OptimizationSection metricName="lcp" />
                <OptimizationSection metricName="fid" />
                <OptimizationSection metricName="cls" />
                <OptimizationSection metricName="ttfb" />
                <OptimizationSection metricName="inp" />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PerformanceMonitor;