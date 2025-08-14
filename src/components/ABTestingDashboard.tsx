/**
 * A/B Testing Dashboard
 * Admin interface for managing tests and viewing results
 */

import React, { useState } from 'react';
import { useABTest } from '../contexts/ABTestContext';
import { useConversionOptimization } from '../contexts/ConversionOptimizationContext';
import { useTestResults } from '../hooks/useABTestHooks';

interface DashboardProps {
  isVisible: boolean;
  onClose: () => void;
}

const ABTestingDashboard: React.FC<DashboardProps> = ({ isVisible, onClose }) => {
  const { activeTests, createTest, startTest, pauseTest, stopTest } = useABTest();
  const { session, getBehavioralInsights, getConversionFunnelData } = useConversionOptimization();
  const [activeTab, setActiveTab] = useState<'overview' | 'tests' | 'analytics' | 'create'>('overview');

  if (!isVisible) return null;

  // Test Results Component
  const TestResults: React.FC<{ testId: string }> = ({ testId }) => {
    const { test, results, variants, isRunning, hasWinner } = useTestResults(testId);

    if (!test || !results) return null;

    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900">{test.name}</h3>
            <p className="text-sm text-gray-600">{test.description}</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              test.status === 'running' ? 'bg-green-100 text-green-800' :
              test.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {test.status.toUpperCase()}
            </span>
            {hasWinner && (
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold">
                WINNER FOUND
              </span>
            )}
          </div>
        </div>

        {/* Variants Performance */}
        <div className="space-y-3 mb-4">
          {variants.map((variant) => (
            <div key={variant.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <span className="font-medium text-gray-900 mr-3">{variant.name}</span>
                {variant.isWinner && (
                  <span className="px-2 py-1 bg-gold-100 text-gold-800 rounded text-xs font-bold">
                    🏆 WINNER
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-sm text-gray-500">Conversions</div>
                  <div className="font-bold">{variant.conversions}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-500">Rate</div>
                  <div className="font-bold">{variant.conversionRate.toFixed(2)}%</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-500">Significant</div>
                  <div className={`font-bold ${variant.isSignificant ? 'text-green-600' : 'text-gray-400'}`}>
                    {variant.isSignificant ? '✓ Yes' : '✗ No'}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Test Controls */}
        <div className="flex items-center space-x-2">
          {isRunning ? (
            <>
              <button
                onClick={() => pauseTest(testId)}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
              >
                Pause Test
              </button>
              <button
                onClick={() => stopTest(testId)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Stop Test
              </button>
            </>
          ) : (
            <button
              onClick={() => startTest(testId)}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Start Test
            </button>
          )}
        </div>
      </div>
    );
  };

  // Create Test Form
  const CreateTestForm: React.FC = () => {
    const [formData, setFormData] = useState({
      name: '',
      description: '',
      variants: [
        { id: 'control', name: 'Control', weight: 50, config: {} },
        { id: 'variant_a', name: 'Variant A', weight: 50, config: {} }
      ],
      conversionGoals: ['form_submission'],
      trafficSplit: [50, 50]
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      createTest({
        name: formData.name,
        description: formData.description,
        variants: formData.variants,
        status: 'draft',
        trafficSplit: formData.trafficSplit,
        conversionGoals: formData.conversionGoals,
        startDate: new Date()
      });
      setActiveTab('tests');
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Test Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={3}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Variants</label>
          {formData.variants.map((variant, index) => (
            <div key={variant.id} className="flex items-center space-x-4 mb-3">
              <input
                type="text"
                value={variant.name}
                onChange={(e) => {
                  const newVariants = [...formData.variants];
                  newVariants[index].name = e.target.value;
                  setFormData({ ...formData, variants: newVariants });
                }}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Variant name"
              />
              <input
                type="number"
                value={variant.weight}
                onChange={(e) => {
                  const newVariants = [...formData.variants];
                  newVariants[index].weight = parseInt(e.target.value);
                  const newTrafficSplit = [...formData.trafficSplit];
                  newTrafficSplit[index] = parseInt(e.target.value);
                  setFormData({ ...formData, variants: newVariants, trafficSplit: newTrafficSplit });
                }}
                className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="0"
                max="100"
              />
              <span className="text-sm text-gray-500">%</span>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
        >
          Create Test
        </button>
      </form>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[80] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">A/B Testing Dashboard</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-200">
          {[
            { id: 'overview', label: 'Overview', icon: '📊' },
            { id: 'tests', label: 'Active Tests', icon: '🧪' },
            { id: 'analytics', label: 'Analytics', icon: '📈' },
            { id: 'create', label: 'Create Test', icon: '➕' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-blue-900 mb-2">Active Tests</h3>
                  <div className="text-3xl font-black text-blue-700">
                    {activeTests.filter(t => t.status === 'running').length}
                  </div>
                  <p className="text-sm text-blue-600">Currently running</p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-green-900 mb-2">Total Participants</h3>
                  <div className="text-3xl font-black text-green-700">
                    {activeTests.reduce((sum, test) => sum + test.metrics.participants, 0)}
                  </div>
                  <p className="text-sm text-green-600">Across all tests</p>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-orange-900 mb-2">Conversions</h3>
                  <div className="text-3xl font-black text-orange-700">
                    {activeTests.reduce((sum, test) => 
                      sum + Object.values(test.metrics.conversions).reduce((a, b) => a + b, 0), 0
                    )}
                  </div>
                  <p className="text-sm text-orange-600">Total conversions</p>
                </div>
              </div>

              {/* Current Session Info */}
              {session && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Current Session</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-600">Session ID:</span>
                      <div className="font-mono text-xs">{session.id.slice(0, 8)}...</div>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Lead Score:</span>
                      <div className="font-bold">{session.leadScore?.total || 'Not scored'}</div>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Page Views:</span>
                      <div className="font-bold">{session.behavioralData.pageViews}</div>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Time on Site:</span>
                      <div className="font-bold">{Math.round(session.behavioralData.timeOnSite)}s</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tests Tab */}
          {activeTab === 'tests' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Active A/B Tests</h3>
                <button
                  onClick={() => setActiveTab('create')}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Create New Test
                </button>
              </div>

              {activeTests.map((test) => (
                <TestResults key={test.id} testId={test.id} />
              ))}
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900">Conversion Analytics</h3>
              
              {/* Funnel Analysis */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-bold text-gray-900 mb-4">Conversion Funnel</h4>
                <div className="space-y-3">
                  {getConversionFunnelData().map((step, index) => (
                    <div key={step.id} className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        step.completed ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
                      }`}>
                        {index + 1}
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="font-medium">{step.name}</div>
                        <div className="text-sm text-gray-600">{step.description}</div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                        step.completed ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {step.completed ? 'Completed' : 'Pending'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Behavioral Insights */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-bold text-gray-900 mb-4">Behavioral Insights</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {(() => {
                    const insights = getBehavioralInsights();
                    return (
                      <>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">{insights.pageViews}</div>
                          <div className="text-sm text-gray-600">Page Views</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">{Math.round(insights.timeOnSite)}s</div>
                          <div className="text-sm text-gray-600">Time on Site</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-orange-600">{insights.scrollDepth}%</div>
                          <div className="text-sm text-gray-600">Scroll Depth</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600">{insights.interactions.length}</div>
                          <div className="text-sm text-gray-600">Interactions</div>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>
          )}

          {/* Create Test Tab */}
          {activeTab === 'create' && (
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Create New A/B Test</h3>
              <CreateTestForm />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Dashboard Trigger Component (for development/testing)
export const ABTestingDashboardTrigger: React.FC = () => {
  const [showDashboard, setShowDashboard] = useState(false);

  // Only show in development
  if (!import.meta.env.DEV) return null;

  return (
    <>
      <button
        onClick={() => setShowDashboard(true)}
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors z-50"
        title="Open A/B Testing Dashboard"
      >
        📊
      </button>
      
      <ABTestingDashboard
        isVisible={showDashboard}
        onClose={() => setShowDashboard(false)}
      />
    </>
  );
};

export default ABTestingDashboard;