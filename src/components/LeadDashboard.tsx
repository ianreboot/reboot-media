/**
 * Lead Analytics Dashboard
 * Business intelligence and conversion tracking
 */

import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  Target,
  Activity,
  BarChart3,
  PieChart,
  Clock,
  AlertCircle
} from 'lucide-react';

interface LeadMetrics {
  totalLeads: number;
  conversionRate: number;
  averageScore: number;
  estimatedRevenue: number;
  hotLeads: number;
  warmLeads: number;
  coldLeads: number;
  unqualifiedLeads: number;
}

interface FunnelStage {
  name: string;
  count: number;
  conversionRate: number;
  dropoffRate: number;
  averageTime: number;
}

interface TrendData {
  trend: 'improving' | 'stable' | 'declining';
  changePercent: number;
  averageScore: number;
  recommendation: string;
}

interface Recommendation {
  priority: 'high' | 'medium' | 'low';
  area: string;
  issue: string;
  recommendation: string;
  expectedImpact: string;
}

const LeadDashboard: React.FC = () => {
  const [metrics] = useState<LeadMetrics>({
    totalLeads: 247,
    conversionRate: 3.2,
    averageScore: 68,
    estimatedRevenue: 1250000,
    hotLeads: 12,
    warmLeads: 48,
    coldLeads: 132,
    unqualifiedLeads: 55
  });

  const [funnelData] = useState<FunnelStage[]>([
    { name: 'Landing Page Visit', count: 5420, conversionRate: 100, dropoffRate: 0, averageTime: 0 },
    { name: 'Content Engagement', count: 2168, conversionRate: 40, dropoffRate: 60, averageTime: 2.5 },
    { name: 'Form Started', count: 651, conversionRate: 30, dropoffRate: 70, averageTime: 5.2 },
    { name: 'Form Completed', count: 247, conversionRate: 38, dropoffRate: 62, averageTime: 8.7 },
    { name: 'Qualified Lead', count: 89, conversionRate: 36, dropoffRate: 64, averageTime: 24 },
    { name: 'Opportunity Created', count: 32, conversionRate: 36, dropoffRate: 64, averageTime: 72 }
  ]);

  const [trendData] = useState<TrendData>({
    trend: 'improving',
    changePercent: 12.5,
    averageScore: 68,
    recommendation: 'Lead quality improving - maintain current marketing strategy'
  });

  const [recommendations] = useState<Recommendation[]>([
    {
      priority: 'high',
      area: 'Conversion Rate',
      issue: 'Form completion rate below target',
      recommendation: 'Reduce form fields from 10 to 5',
      expectedImpact: '35% increase in completions'
    },
    {
      priority: 'high',
      area: 'Response Time',
      issue: 'Average response time is 4 hours',
      recommendation: 'Implement automated acknowledgment',
      expectedImpact: '25% improvement in engagement'
    },
    {
      priority: 'medium',
      area: 'Lead Quality',
      issue: '22% of leads are unqualified',
      recommendation: 'Add qualifying questions upfront',
      expectedImpact: '40% reduction in unqualified leads'
    }
  ]);

  const [selectedTimeframe, setSelectedTimeframe] = useState<'daily' | 'weekly' | 'monthly'>('weekly');

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  // Format percentage
  const formatPercent = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  // Get priority color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  // Get trend icon
  const getTrendIcon = (trend: string) => {
    if (trend === 'improving') {
      return <TrendingUp className="w-5 h-5 text-green-500" />;
    } else if (trend === 'declining') {
      return <TrendingDown className="w-5 h-5 text-red-500" />;
    }
    return <Activity className="w-5 h-5 text-gray-500" />;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Lead Analytics Dashboard
          </h1>
          <p className="text-gray-600">
            Real-time insights into lead generation and conversion performance
          </p>
        </div>

        {/* Timeframe Selector */}
        <div className="mb-6 flex gap-2">
          {(['daily', 'weekly', 'monthly'] as const).map((timeframe) => (
            <button
              key={timeframe}
              onClick={() => setSelectedTimeframe(timeframe)}
              className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${
                selectedTimeframe === timeframe
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {timeframe}
            </button>
          ))}
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Leads */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-blue-500" />
              {getTrendIcon(trendData.trend)}
            </div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Total Leads</h3>
            <p className="text-2xl font-bold text-gray-900">{metrics.totalLeads}</p>
            <p className={`text-sm mt-2 ${
              trendData.changePercent > 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {trendData.changePercent > 0 ? '+' : ''}{formatPercent(trendData.changePercent)} from last period
            </p>
          </div>

          {/* Conversion Rate */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <Target className="w-8 h-8 text-green-500" />
              <span className={`text-xs font-medium px-2 py-1 rounded ${
                metrics.conversionRate >= 3 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
              }`}>
                {metrics.conversionRate >= 3 ? 'On Target' : 'Below Target'}
              </span>
            </div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Conversion Rate</h3>
            <p className="text-2xl font-bold text-gray-900">{formatPercent(metrics.conversionRate)}</p>
            <p className="text-sm text-gray-500 mt-2">Industry avg: 2.35%</p>
          </div>

          {/* Average Lead Score */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <BarChart3 className="w-8 h-8 text-purple-500" />
              <span className="text-xs font-medium px-2 py-1 rounded bg-purple-100 text-purple-700">
                {metrics.averageScore >= 70 ? 'High Quality' : 
                 metrics.averageScore >= 50 ? 'Medium Quality' : 'Low Quality'}
              </span>
            </div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Avg Lead Score</h3>
            <p className="text-2xl font-bold text-gray-900">{metrics.averageScore}</p>
            <div className="mt-2 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${metrics.averageScore}%` }}
              />
            </div>
          </div>

          {/* Estimated Revenue */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8 text-yellow-500" />
              <Clock className="w-5 h-5 text-gray-400" />
            </div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Pipeline Value</h3>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(metrics.estimatedRevenue)}</p>
            <p className="text-sm text-gray-500 mt-2">Next 12 months</p>
          </div>
        </div>

        {/* Lead Distribution & Funnel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Lead Distribution */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Lead Distribution
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-sm font-medium text-gray-700">Hot Leads</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-gray-900">{metrics.hotLeads}</span>
                  <span className="text-sm text-gray-500">
                    ({formatPercent((metrics.hotLeads / metrics.totalLeads) * 100)})
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <span className="text-sm font-medium text-gray-700">Warm Leads</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-gray-900">{metrics.warmLeads}</span>
                  <span className="text-sm text-gray-500">
                    ({formatPercent((metrics.warmLeads / metrics.totalLeads) * 100)})
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm font-medium text-gray-700">Cold Leads</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-gray-900">{metrics.coldLeads}</span>
                  <span className="text-sm text-gray-500">
                    ({formatPercent((metrics.coldLeads / metrics.totalLeads) * 100)})
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                  <span className="text-sm font-medium text-gray-700">Unqualified</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-gray-900">{metrics.unqualifiedLeads}</span>
                  <span className="text-sm text-gray-500">
                    ({formatPercent((metrics.unqualifiedLeads / metrics.totalLeads) * 100)})
                  </span>
                </div>
              </div>
            </div>

            {/* Visual representation */}
            <div className="mt-6 flex gap-1 h-8 rounded-lg overflow-hidden">
              <div 
                className="bg-red-500 transition-all duration-300"
                style={{ width: `${(metrics.hotLeads / metrics.totalLeads) * 100}%` }}
              />
              <div 
                className="bg-orange-500 transition-all duration-300"
                style={{ width: `${(metrics.warmLeads / metrics.totalLeads) * 100}%` }}
              />
              <div 
                className="bg-blue-500 transition-all duration-300"
                style={{ width: `${(metrics.coldLeads / metrics.totalLeads) * 100}%` }}
              />
              <div 
                className="bg-gray-400 transition-all duration-300"
                style={{ width: `${(metrics.unqualifiedLeads / metrics.totalLeads) * 100}%` }}
              />
            </div>
          </div>

          {/* Conversion Funnel */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Conversion Funnel
            </h3>
            <div className="space-y-3">
              {funnelData.map((stage, index) => (
                <div key={stage.name} className="relative">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{stage.name}</span>
                    <span className="text-sm text-gray-500">{stage.count}</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-6">
                    <div 
                      className={`h-6 rounded-full transition-all duration-300 flex items-center justify-end pr-2 ${
                        index === 0 ? 'bg-blue-600' :
                        stage.conversionRate > 50 ? 'bg-green-500' :
                        stage.conversionRate > 30 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${stage.conversionRate}%` }}
                    >
                      <span className="text-xs text-white font-medium">
                        {formatPercent(stage.conversionRate)}
                      </span>
                    </div>
                  </div>
                  {stage.dropoffRate > 50 && (
                    <p className="text-xs text-red-600 mt-1">
                      High dropoff: {formatPercent(stage.dropoffRate)}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Optimization Recommendations
          </h3>
          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <div 
                key={index}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-medium px-2 py-1 rounded ${getPriorityColor(rec.priority)}`}>
                      {rec.priority.toUpperCase()}
                    </span>
                    <span className="text-sm font-medium text-gray-700">{rec.area}</span>
                  </div>
                  <span className="text-sm text-green-600 font-medium">
                    {rec.expectedImpact}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{rec.issue}</p>
                <p className="text-sm font-medium text-gray-900">
                  → {rec.recommendation}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Lead Quality Trend */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            {getTrendIcon(trendData.trend)}
            Lead Quality Trend
          </h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Current Trend</span>
              <span className={`font-semibold capitalize ${
                trendData.trend === 'improving' ? 'text-green-600' :
                trendData.trend === 'declining' ? 'text-red-600' : 'text-gray-600'
              }`}>
                {trendData.trend}
              </span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Change</span>
              <span className={`font-semibold ${
                trendData.changePercent > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {trendData.changePercent > 0 ? '+' : ''}{formatPercent(trendData.changePercent)}
              </span>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-600">Average Score</span>
              <span className="font-semibold text-gray-900">{trendData.averageScore}/100</span>
            </div>
            <div className="bg-blue-50 rounded-lg p-3">
              <p className="text-sm text-blue-900">
                <strong>Recommendation:</strong> {trendData.recommendation}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadDashboard;