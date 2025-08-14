/**
 * Marketing Attribution Dashboard Component
 * Real-time multi-touch attribution analytics and insights
 */

import React, { useState, useEffect, useCallback } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Target,
  BarChart3,
  ArrowRight,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Info
} from 'lucide-react';

interface AttributionData {
  summary: {
    timeRange: string;
    totalJourneys: number;
    conversions: number;
    conversionRate: number;
    averageTouchpoints: number;
    topChannel: string;
  };
  realTime: {
    activeJourneys: number;
    recentConversions: number;
    currentVisitors: number;
    conversionTrend: number[];
  };
  channels: Array<{
    channel: string;
    conversions: number;
    revenue: number;
    roi: number;
    attribution: number;
  }>;
  modelComparison: Array<{
    model: string;
    confidence: number;
    topChannel: string;
  }> | null;
  topInteractions: Array<{
    channels: string[];
    synergyScore: number;
    conversionLift: number;
  }>;
  journeyStages: Array<{
    stage: string;
    averageDuration: number;
    averageConversionRate: number;
    optimizationOpportunities: string[];
  }>;
  insights: Array<{
    type: string;
    message: string;
    action: string;
    priority: string;
  }>;
}

interface TouchpointData {
  sessionId: string;
  channel: string;
  interaction: string;
  url?: string;
  device?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

const AttributionDashboard: React.FC = () => {
  const [data, setData] = useState<AttributionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<'today' | 'week' | 'month' | 'quarter' | 'year'>('month');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [selectedModel, setSelectedModel] = useState<string>('data-driven');

  // Fetch dashboard data
  const fetchDashboardData = useCallback(async () => {
    try {
      const response = await fetch(`/api/attribution/dashboard?timeRange=${timeRange}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch attribution data');
      }

      const result = await response.json();
      if (result.success) {
        setData(result.data);
      } else {
        throw new Error(result.error);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [timeRange]);

  // Track touchpoint
  const trackTouchpoint = useCallback(async (touchpoint: TouchpointData) => {
    try {
      const response = await fetch('/api/attribution/touchpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(touchpoint)
      });

      if (!response.ok) {
        throw new Error('Failed to track touchpoint');
      }

      // Refresh dashboard if auto-refresh is enabled
      if (autoRefresh) {
        fetchDashboardData();
      }
    } catch (err) {
      console.error('Touchpoint tracking error:', err);
    }
  }, [autoRefresh, fetchDashboardData]);

  // Auto-refresh effect
  useEffect(() => {
    fetchDashboardData();

    if (autoRefresh) {
      const interval = setInterval(fetchDashboardData, 30000); // Refresh every 30 seconds
      return () => clearInterval(interval);
    }
  }, [fetchDashboardData, autoRefresh]);

  // Track page interactions
  useEffect(() => {
    const sessionId = sessionStorage.getItem('sessionId') || `session_${Date.now()}`;
    sessionStorage.setItem('sessionId', sessionId);

    // Track initial page view
    trackTouchpoint({
      sessionId,
      channel: 'direct', // Would be determined from referrer/UTM params
      interaction: 'page_view',
      url: window.location.href,
      device: window.innerWidth < 768 ? 'mobile' : 'desktop'
    });

    // Track form interactions
    const handleFormInteraction = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'FORM') {
        trackTouchpoint({
          sessionId,
          channel: 'direct',
          interaction: e.type === 'submit' ? 'form_complete' : 'form_start',
          url: window.location.href
        });
      }
    };

    document.addEventListener('focusin', handleFormInteraction);
    document.addEventListener('submit', handleFormInteraction);

    return () => {
      document.removeEventListener('focusin', handleFormInteraction);
      document.removeEventListener('submit', handleFormInteraction);
    };
  }, [trackTouchpoint]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600 text-center">
          <AlertCircle className="w-12 h-12 mx-auto mb-4" />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const getChannelColor = (channel: string): string => {
    const colors: Record<string, string> = {
      organic: 'bg-green-500',
      paid: 'bg-blue-500',
      social: 'bg-purple-500',
      email: 'bg-yellow-500',
      direct: 'bg-gray-500',
      referral: 'bg-pink-500'
    };
    return colors[channel] || 'bg-gray-400';
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Marketing Attribution Dashboard</h1>
          <p className="text-gray-600 mt-1">Multi-touch attribution analytics and customer journey insights</p>
        </div>
        <div className="flex items-center gap-4">
          {/* Time Range Selector */}
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="today">Today</option>
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
            <option value="quarter">Last Quarter</option>
            <option value="year">Last Year</option>
          </select>

          {/* Auto-refresh Toggle */}
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              autoRefresh ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
            }`}
          >
            <RefreshCw className={`w-4 h-4 ${autoRefresh ? 'animate-spin' : ''}`} />
            {autoRefresh ? 'Auto-refresh On' : 'Auto-refresh Off'}
          </button>

          {/* Manual Refresh */}
          <button
            onClick={fetchDashboardData}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Refresh Now
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <Users className="w-8 h-8 text-blue-600" />
            <span className="text-sm text-gray-500">{data.summary.timeRange}</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{data.summary.totalJourneys.toLocaleString()}</div>
          <div className="text-sm text-gray-600 mt-1">Total Customer Journeys</div>
          <div className="mt-4 flex items-center gap-2">
            <div className="text-sm text-green-600 flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              {data.realTime.activeJourneys} active
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <Target className="w-8 h-8 text-green-600" />
            <span className={`text-sm font-medium px-2 py-1 rounded ${
              data.summary.conversionRate >= 3 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
            }`}>
              {data.summary.conversionRate >= 3 ? 'On Target' : 'Below Target'}
            </span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{data.summary.conversionRate.toFixed(2)}%</div>
          <div className="text-sm text-gray-600 mt-1">Conversion Rate</div>
          <div className="mt-4">
            <div className="text-xs text-gray-500">{data.summary.conversions} conversions</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <BarChart3 className="w-8 h-8 text-purple-600" />
            <span className="text-sm text-gray-500">Avg</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{data.summary.averageTouchpoints}</div>
          <div className="text-sm text-gray-600 mt-1">Touchpoints per Journey</div>
          <div className="mt-4">
            <div className="text-xs text-gray-500">Top: {data.summary.topChannel}</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="w-8 h-8 text-yellow-600" />
            <span className="text-sm text-gray-500">Real-time</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{data.realTime.currentVisitors}</div>
          <div className="text-sm text-gray-600 mt-1">Current Visitors</div>
          <div className="mt-4 flex items-center gap-2">
            <div className="text-sm text-blue-600">
              {data.realTime.recentConversions} recent conversions
            </div>
          </div>
        </div>
      </div>

      {/* Channel Performance */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Channel Performance</h2>
        <div className="space-y-4">
          {data.channels.map((channel) => (
            <div key={channel.channel} className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <div className={`w-3 h-3 rounded-full ${getChannelColor(channel.channel)}`}></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium capitalize">{channel.channel}</span>
                    <span className="text-sm text-gray-500">{channel.conversions} conversions</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getChannelColor(channel.channel)}`}
                      style={{ width: `${Math.min(channel.attribution, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="ml-6 text-right">
                <div className="text-sm font-medium">${channel.revenue.toLocaleString()}</div>
                <div className={`text-xs ${channel.roi > 100 ? 'text-green-600' : 'text-gray-500'}`}>
                  ROI: {channel.roi.toFixed(0)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Attribution Model Comparison */}
      {data.modelComparison && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Attribution Model Comparison</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {data.modelComparison.map((model) => (
              <button
                key={model.model}
                onClick={() => setSelectedModel(model.model)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedModel === model.model
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-sm font-medium capitalize mb-1">
                  {model.model.replace('-', ' ')}
                </div>
                <div className="text-xs text-gray-500">
                  {(model.confidence * 100).toFixed(0)}% confidence
                </div>
                <div className="text-xs mt-2 font-medium text-blue-600">
                  {model.topChannel}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Cross-Channel Interactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Channel Synergies</h2>
          <div className="space-y-3">
            {data.topInteractions.map((interaction, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  {interaction.channels.map((channel, i) => (
                    <React.Fragment key={channel}>
                      <span className="text-sm font-medium capitalize">{channel}</span>
                      {i < interaction.channels.length - 1 && (
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-green-600">
                    +{interaction.conversionLift.toFixed(0)}% lift
                  </div>
                  <div className="text-xs text-gray-500">
                    Synergy: {interaction.synergyScore.toFixed(2)}x
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Journey Stages */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Customer Journey Stages</h2>
          <div className="space-y-3">
            {data.journeyStages.map((stage) => (
              <div key={stage.stage} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium capitalize">{stage.stage}</span>
                  <span className="text-xs text-gray-500">
                    {stage.averageDuration.toFixed(1)}h avg
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${stage.averageConversionRate}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="ml-3 text-xs font-medium">
                    {stage.averageConversionRate.toFixed(0)}%
                  </span>
                </div>
                {stage.optimizationOpportunities.length > 0 && (
                  <div className="mt-2 text-xs text-gray-600">
                    💡 {stage.optimizationOpportunities[0]}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Insights and Recommendations */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Insights & Recommendations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.insights.map((insight, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${
                insight.priority === 'high'
                  ? 'border-red-200 bg-red-50'
                  : insight.priority === 'medium'
                  ? 'border-yellow-200 bg-yellow-50'
                  : 'border-blue-200 bg-blue-50'
              }`}
            >
              <div className="flex items-start gap-3">
                {getInsightIcon(insight.type)}
                <div className="flex-1">
                  <div className="font-medium text-sm mb-1">{insight.message}</div>
                  <div className="text-xs text-gray-600 mb-2">{insight.action}</div>
                  <span className={`text-xs px-2 py-1 rounded ${
                    insight.priority === 'high'
                      ? 'bg-red-100 text-red-700'
                      : insight.priority === 'medium'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {insight.priority} priority
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Conversion Trend Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Conversion Trend</h2>
        <div className="h-64 flex items-end gap-2">
          {data.realTime.conversionTrend.map((value, index) => (
            <div
              key={index}
              className="flex-1 bg-blue-500 rounded-t hover:bg-blue-600 transition-colors relative group"
              style={{ height: `${(value / Math.max(...data.realTime.conversionTrend)) * 100}%` }}
            >
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                {value}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>24h ago</span>
          <span>12h ago</span>
          <span>Now</span>
        </div>
      </div>
    </div>
  );
};

export default AttributionDashboard;