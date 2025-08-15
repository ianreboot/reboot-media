/**
 * Enhanced Lead Form with A/B Testing and Conversion Optimization
 * Features progressive disclosure, personalization, and advanced tracking
 */

import { useState, useEffect, useRef } from 'react';
import { useLeadForm } from '../contexts/LeadFormContext';
import { useConversionOptimization } from '../contexts/ConversionOptimizationContext';
import { useFormOptimization, useCTAOptimization } from '../hooks/useABTestHooks';

interface FormData {
  email: string;
  challenge: string;
  revenue: string;
  name: string;
  company: string;
  timeline: string;
  website: string;
  specificIssue: string;
  industry: string;
  teamSize: string;
  currentMarketing: string;
}

const EnhancedLeadForm = () => {
  const { showDropdownForm, setShowDropdownForm } = useLeadForm();
  const { 
    trackConversion, 
    trackInteraction,
    shouldShowUrgency,
    getRecommendedNextAction
  } = useConversionOptimization();
  
  const { 
    formStyle, 
    trackFormStart, 
    trackFormStep, 
    trackAbandonment, 
    trackCompletion 
  } = useFormOptimization();
  
  const { ctaText, trackClick } = useCTAOptimization();
  
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    challenge: '',
    revenue: '',
    name: '',
    company: '',
    timeline: '',
    website: '',
    specificIssue: '',
    industry: '',
    teamSize: '',
    currentMarketing: ''
  });
  
  const [fieldValidation, setFieldValidation] = useState<{[key: string]: 'valid' | 'invalid' | ''}>({});
  const [selectedOptions, setSelectedOptions] = useState<{[key: string]: boolean}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>('');
  const [isProgressive, setIsProgressive] = useState(false);
  const [leadScorePrediction, setLeadScorePrediction] = useState<number>(0);
  
  const formStartTime = useRef<Date | null>(null);
  const fieldFocusTimes = useRef<{[key: string]: Date}>({});

  // Set form style based on A/B test
  useEffect(() => {
    setIsProgressive(formStyle === 'progressive');
  }, [formStyle]);

  // Real-time lead score prediction
  useEffect(() => {
    const calculatePredictedScore = () => {
      let score = 30; // Base score
      
      // Revenue contribution
      const revenueScores: Record<string, number> = {
        '10m+': 40,
        '3m-10m': 32,
        '1m-3m': 24,
        '500k-1m': 16
      };
      score += revenueScores[formData.revenue] || 0;
      
      // Industry contribution
      const industryBonus: Record<string, number> = {
        'software': 15,
        'financial': 12,
        'healthcare': 10,
        'ecommerce': 8
      };
      score += industryBonus[formData.industry] || 0;
      
      // Timeline urgency
      const timelineBonus: Record<string, number> = {
        'asap': 15,
        '1-3months': 10,
        '3-6months': 5
      };
      score += timelineBonus[formData.timeline] || 0;
      
      // Completeness bonus
      const completedFields = Object.values(formData).filter(Boolean).length;
      score += Math.min(20, (completedFields / 11) * 20);
      
      setLeadScorePrediction(Math.min(100, score));
    };
    
    calculatePredictedScore();
  }, [formData]);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleFieldFocus = (field: string) => {
    fieldFocusTimes.current[field] = new Date();
    if (!formStartTime.current) {
      formStartTime.current = new Date();
      trackFormStart();
    }
  };

  const handleFieldBlur = (field: string, value: string) => {
    const focusTime = fieldFocusTimes.current[field];
    if (focusTime) {
      const timeSpent = Date.now() - focusTime.getTime();
      trackInteraction({
        type: 'form_focus',
        element: field,
        value: timeSpent,
        metadata: { fieldValue: value.length, timeSpent }
      });
    }

    // Field-specific validation
    if (field === 'website' && value) {
      const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
      setFieldValidation({
        ...fieldValidation,
        [field]: urlPattern.test(value) ? 'valid' : 'invalid'
      });
    }
    
    if (field === 'email' && value) {
      setFieldValidation({
        ...fieldValidation,
        [field]: validateEmail(value) ? 'valid' : 'invalid'
      });
    }
  };

  const handleStepChange = (newStep: number) => {
    trackFormStep(newStep, Object.values(formData).filter(Boolean).length);
    setFormStep(newStep);
  };

  const handleCheckboxChange = (option: string) => {
    setSelectedOptions({
      ...selectedOptions,
      [option]: !selectedOptions[option]
    });
  };

  const submitFormToServer = async (formData: FormData) => {
    const apiUrl = import.meta.env.DEV 
      ? 'http://localhost:3002/api/forms/lead'
      : '/api/forms/lead';

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        formStyle,
        leadScorePrediction,
        selectedOptions,
        sessionData: {
          formStartTime: formStartTime.current,
          completionTime: Date.now() - (formStartTime.current?.getTime() || Date.now())
        }
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Form submission failed');
    }

    return await response.json();
  };

  if (!showDropdownForm) return null;

  const getPersonalizedContent = () => {
    const tier = leadScorePrediction >= 80 ? 'Hot' : 
                 leadScorePrediction >= 60 ? 'Warm' : 
                 leadScorePrediction >= 40 ? 'Cold' : 'Unqualified';
                 
    const messages = {
      Hot: {
        title: "Transform Your Marketing Today",
        subtitle: "High-growth companies need strategic leadership. Let's discuss your priority needs.",
        urgency: "⚡ Priority Response: We'll contact you within 1 hour"
      },
      Warm: {
        title: "Scale Your Marketing Strategically",
        subtitle: "Growth-stage companies trust us for consistent results.",
        urgency: ""
      },
      Cold: {
        title: "Build Marketing That Works",
        subtitle: "Stop wasting money. Get a proven system.",
        urgency: ""
      },
      Unqualified: {
        title: "Marketing Insights for Growth",
        subtitle: "Learn proven strategies for sustainable growth.",
        urgency: ""
      }
    };
    
    return messages[tier];
  };

  const personalizedContent = getPersonalizedContent();

  return (
    <div 
      className="fixed inset-0 z-[60] flex items-start justify-center pt-4 md:pt-10 px-4"
      style={{
        // Consistent modal backdrop across browsers
        background: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(6px) saturate(120%)',
        WebkitBackdropFilter: 'blur(6px) saturate(120%)'
      }}
    >
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full flex flex-col relative" style={{ maxHeight: '92vh' }}>
        
        {/* Lead Score Indicator (Hot leads only) */}
        {leadScorePrediction >= 80 && (
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-1 rounded-full text-xs font-bold animate-pulse">
            🔥 HIGH-PRIORITY LEAD
          </div>
        )}
        
        {/* Close Button */}
        <div className="absolute top-4 right-4 z-10">
          <button 
            onClick={() => {
              if (formStartTime.current) {
                Date.now() - formStartTime.current.getTime();
                trackAbandonment(formStep, 'close_button');
              }
              setShowDropdownForm(false);
              setFormStep(1);
              setFormData({
                email: '', challenge: '', revenue: '', name: '', company: '',
                timeline: '', website: '', specificIssue: '', industry: '',
                teamSize: '', currentMarketing: ''
              });
            }}
            className="w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center transition-all"
          >
            <svg className="w-6 h-6 replace-text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div className="p-4 md:p-6 overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: '#CBD5E0 transparent' }}>
          
          {/* Step 1: Pain Point Acknowledgment with Personalization */}
          {formStep === 1 && (
            <div className="text-center">
              <h3 className="text-2xl font-black text-slate-900 mb-4">
                {personalizedContent.title}
              </h3>
              <p className="replace-text-gray-600 mb-4">
                {personalizedContent.subtitle}
              </p>
              {shouldShowUrgency() && personalizedContent.urgency && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-6">
                  <p className="text-orange-800 text-sm font-medium">
                    {personalizedContent.urgency}
                  </p>
                </div>
              )}
              
              <p className="replace-text-gray-600 mb-8">
                87% of growth-stage companies struggle with these marketing challenges:
              </p>
              
              <div className="space-y-3 mb-8">
                {[
                  { key: 'notWorking', label: 'Marketing isn\'t working', desc: 'Spending money but not seeing results' },
                  { key: 'plateau', label: 'Hit a growth plateau', desc: 'What worked before isn\'t working anymore' },
                  { key: 'competition', label: 'Losing to competition', desc: 'Competitors growing while you\'re stuck' },
                  { key: 'clarity', label: 'No clear strategy', desc: 'Trying everything but nothing sticks' }
                ].map((option) => (
                  <label key={option.key} className="flex items-start text-left p-4 bg-gray-50 rounded-xl hover:bg-gray-100 cursor-pointer transition-colors">
                    <input 
                      type="checkbox" 
                      className="mt-1 mr-3 w-5 h-5"
                      checked={selectedOptions[option.key] || false}
                      onChange={() => {
                        handleCheckboxChange(option.key);
                        trackInteraction({
                          type: 'click',
                          element: `pain_point_${option.key}`,
                          value: !selectedOptions[option.key] ? 'selected' : 'unselected'
                        });
                      }}
                    />
                    <span className="text-gray-700">
                      <strong>{option.label}</strong> - {option.desc}
                    </span>
                  </label>
                ))}
              </div>
              
              <button 
                onClick={() => {
                  handleStepChange(2);
                  trackClick('pain_acknowledgment');
                }}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                {ctaText || 'Yes, I Need Help With This'} →
              </button>
              
              <p className="replace-text-gray-500 text-sm mt-6">
                Takes 60 seconds • No sales pressure • Get real solutions
              </p>
            </div>
          )}
          
          {/* Step 2: Revenue Qualification */}
          {formStep === 2 && (
            <div>
              <button 
                onClick={() => handleStepChange(1)}
                className="replace-text-gray-500 hover:text-gray-700 mb-4 flex items-center transition-colors"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
                </svg>
                Back
              </button>
              
              <div className="bg-white rounded-2xl p-6 max-w-lg mx-auto shadow-2xl">
                <h3 className="text-2xl font-black text-slate-900 mb-4">
                  Perfect! Let's <span className="text-orange-500">Identify</span> Your Growth Stage
                </h3>
                <p className="replace-text-gray-600 mb-6">
                  Different revenue levels need different strategic approaches
                </p>
                
                {/* Progress Bar */}
                <div className="flex items-center justify-center mb-8">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                      ✓
                    </div>
                    <div className="w-20 h-1 bg-orange-500"></div>
                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                      2
                    </div>
                    <div className="w-20 h-1 bg-gray-300"></div>
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center replace-text-gray-500 font-bold">
                      3
                    </div>
                  </div>
                </div>
                
                {/* Lead Score Prediction */}
                {leadScorePrediction > 40 && (
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-green-800">Lead Score Prediction</span>
                      <span className="text-2xl font-bold text-green-700">{leadScorePrediction}/100</span>
                    </div>
                    <div className="w-full bg-green-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${leadScorePrediction}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                
                <div className="mb-8">
                  <h4 className="font-bold text-gray-900 mb-4">Step 2: Your Revenue Stage</h4>
                  <p className="text-sm replace-text-gray-600 mb-4">What's your current annual revenue?</p>
                  
                  <div className="space-y-3">
                    {[
                      { value: '500k-1m', label: '$500K - $1M', desc: 'Growing but hitting walls', score: 16 },
                      { value: '1m-3m', label: '$1M - $3M', desc: 'Scaling but inconsistent', score: 24 },
                      { value: '3m-10m', label: '$3M - $10M', desc: 'Need systematic growth', score: 32 },
                      { value: '10m+', label: '$10M+', desc: 'Ready for transformation', score: 40 }
                    ].map((option) => (
                      <label key={option.value} className="block">
                        <input 
                          type="radio" 
                          name="revenue" 
                          value={option.value}
                          onChange={(e) => {
                            setFormData({...formData, revenue: e.target.value});
                            trackInteraction({
                              type: 'click',
                              element: 'revenue_selection',
                              value: e.target.value,
                              metadata: { predictedScore: option.score }
                            });
                          }}
                          onFocus={() => handleFieldFocus('revenue')}
                          className="mr-3 w-4 h-4"
                        />
                        <span className="text-gray-700">
                          <strong>{option.label}</strong><br />
                          <span className="text-sm replace-text-gray-500 ml-7">{option.desc}</span>
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <button 
                  onClick={() => {
                    if (formData.revenue) {
                      handleStepChange(isProgressive ? 3 : 3); // Progressive form skips to step 3, standard continues
                    } else {
                      setSubmitError('Please select your revenue range');
                      return;
                    }
                  }}
                  disabled={!formData.revenue}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl ${
                    formData.revenue 
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white' 
                      : 'bg-gray-300 replace-text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Continue to {isProgressive ? 'Contact Info' : 'Final Step'} →
                </button>
              </div>
            </div>
          )}
          
          {/* Step 3: Enhanced Contact Information with Progressive Disclosure */}
          {formStep === 3 && (
            <div>
              <button 
                onClick={() => handleStepChange(2)}
                className="replace-text-gray-500 hover:text-gray-700 mb-4 flex items-center transition-colors"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
                </svg>
                Back
              </button>
              
              <div className="max-w-2xl mx-auto">
                <h3 className="text-2xl font-black text-slate-900 mb-4 text-center">
                  Perfect! Let's Get Your <span className="text-orange-500">Free Analysis</span>
                </h3>
                <p className="replace-text-gray-600 mb-8 text-center">
                  {getRecommendedNextAction()}
                </p>
                
                {/* Progress Bar */}
                <div className="flex items-center justify-center mb-8">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">✓</div>
                    <div className="w-20 h-1 bg-green-500"></div>
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">✓</div>
                    <div className="w-20 h-1 bg-orange-500"></div>
                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">3</div>
                  </div>
                </div>
                
                {/* Real-time Lead Score Display */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-blue-800">Your Lead Quality Score</span>
                    <span className="text-2xl font-bold text-blue-700">{leadScorePrediction}/100</span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${leadScorePrediction}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-blue-accessible mt-2">
                    {leadScorePrediction >= 80 ? '🔥 High Priority - Immediate Response' :
                     leadScorePrediction >= 60 ? '⚡ Priority Response Within 4 Hours' :
                     leadScorePrediction >= 40 ? '📈 Added to Growth Program' :
                     '📚 Educational Resources Recommended'}
                  </p>
                </div>

                {/* Progressive Form Fields */}
                <div className="space-y-4">
                  {/* Contact Information */}
                  <div className="bg-white/60 dark:bg-slate-700/60 backdrop-blur-fallback-sm transparency-normalized rounded-xl p-4 border border-white/30 dark:border-slate-600/30">
                    <h4 className="font-bold text-blue-900 mb-3 flex items-center">
                      <span className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs mr-2">1</span>
                      Contact Information
                    </h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-2">Your Name *</label>
                        <input 
                          type="text" 
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          onFocus={() => handleFieldFocus('name')}
                          onBlur={(e) => handleFieldBlur('name', e.target.value)}
                          className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 text-sm" 
                          placeholder="John Smith"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-2">Company Name *</label>
                        <input 
                          type="text" 
                          value={formData.company}
                          onChange={(e) => setFormData({...formData, company: e.target.value})}
                          onFocus={() => handleFieldFocus('company')}
                          onBlur={(e) => handleFieldBlur('company', e.target.value)}
                          className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 text-sm" 
                          placeholder="Acme Corp"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">Business Email *</label>
                      <input 
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        onFocus={() => handleFieldFocus('email')}
                        onBlur={(e) => handleFieldBlur('email', e.target.value)}
                        className={`w-full px-3 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 text-sm ${
                          fieldValidation.email === 'valid' ? 'border-green-500' : 
                          fieldValidation.email === 'invalid' ? 'border-red-500' : 'border-gray-200'
                        }`}
                        placeholder="your@company.com"
                      />
                      {fieldValidation.email === 'valid' && (
                        <p className="text-xs text-green-600 mt-1">✓ Valid email format</p>
                      )}
                      {fieldValidation.email === 'invalid' && (
                        <p className="text-xs text-red-600 mt-1">Please enter a valid email address</p>
                      )}
                    </div>
                  </div>

                  {/* Progressive Disclosure: Only show if form style is progressive */}
                  {isProgressive && formData.name && formData.email && (
                    <>
                      {/* Business Details */}
                      <div className="bg-white/60 dark:bg-slate-700/60 backdrop-blur-fallback-sm transparency-normalized rounded-xl p-4 border border-white/30 dark:border-slate-600/30">
                        <h4 className="font-bold text-green-900 mb-3 flex items-center">
                          <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs mr-2">2</span>
                          Business Details
                        </h4>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-2">Website URL</label>
                            <input 
                              type="url" 
                              value={formData.website}
                              onChange={(e) => setFormData({...formData, website: e.target.value})}
                              onFocus={() => handleFieldFocus('website')}
                              onBlur={(e) => handleFieldBlur('website', e.target.value)}
                              className={`w-full px-3 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 text-sm ${
                                fieldValidation.website === 'valid' ? 'border-green-500' : 
                                fieldValidation.website === 'invalid' ? 'border-red-500' : 'border-gray-200'
                              }`}
                              placeholder="https://yourcompany.com"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-bold text-slate-700 mb-2">Industry</label>
                              <select 
                                value={formData.industry}
                                onChange={(e) => {
                                  setFormData({...formData, industry: e.target.value});
                                  trackInteraction({
                                    type: 'click',
                                    element: 'industry_select',
                                    value: e.target.value
                                  });
                                }}
                                onFocus={() => handleFieldFocus('industry')}
                                className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 text-sm"
                              >
                                <option value="">Select industry</option>
                                <option value="software">Software/SaaS</option>
                                <option value="healthcare">Healthcare</option>
                                <option value="ecommerce">E-commerce</option>
                                <option value="financial">Financial Services</option>
                                <option value="professional">Professional Services</option>
                                <option value="manufacturing">Manufacturing</option>
                                <option value="other">Other</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-slate-700 mb-2">Team Size</label>
                              <select 
                                value={formData.teamSize}
                                onChange={(e) => {
                                  setFormData({...formData, teamSize: e.target.value});
                                  trackInteraction({
                                    type: 'click',
                                    element: 'team_size_select',
                                    value: e.target.value
                                  });
                                }}
                                onFocus={() => handleFieldFocus('teamSize')}
                                className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 text-sm"
                              >
                                <option value="">Select size</option>
                                <option value="1-10">1-10 employees</option>
                                <option value="11-50">11-50 employees</option>
                                <option value="51-200">51-200 employees</option>
                                <option value="200+">200+ employees</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Marketing Challenge - Only if basic info is complete */}
                      {formData.industry && (
                        <div className="bg-white/60 dark:bg-slate-700/60 backdrop-blur-fallback-sm transparency-normalized rounded-xl p-4 border border-white/30 dark:border-slate-600/30">
                          <h4 className="font-bold text-yellow-900 mb-3 flex items-center">
                            <span className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xs mr-2">3</span>
                            Your Marketing Challenge
                          </h4>
                          <div className="space-y-3">
                            <div>
                              <label className="block text-xs font-bold text-slate-700 mb-2">What's your biggest marketing pain right now? *</label>
                              <textarea 
                                value={formData.specificIssue}
                                onChange={(e) => setFormData({...formData, specificIssue: e.target.value})}
                                onFocus={() => handleFieldFocus('specificIssue')}
                                onBlur={(e) => handleFieldBlur('specificIssue', e.target.value)}
                                className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 text-sm placeholder:text-xs" 
                                placeholder="e.g., Not getting enough leads, poor conversion rates, unclear messaging, competitors beating us, website visitors not buying..."
                                rows={3}
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Timeline - Final step */}
                      {formData.specificIssue && (
                        <div className="bg-white/60 dark:bg-slate-700/60 backdrop-blur-fallback-sm transparency-normalized rounded-xl p-4 border border-white/30 dark:border-slate-600/30">
                          <h4 className="font-bold text-purple-900 mb-3 flex items-center">
                            <span className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs mr-2">4</span>
                            Timeline
                          </h4>
                          <p className="text-xs replace-text-gray-600 mb-3">When do you need to see marketing results?</p>
                          <div className="grid grid-cols-2 gap-2">
                            {[
                              { value: 'asap', label: 'ASAP' },
                              { value: '1-3months', label: '1-3 months' },
                              { value: '3-6months', label: '3-6 months' },
                              { value: '6months+', label: '6+ months' }
                            ].map(option => (
                              <button
                                key={option.value}
                                onClick={() => {
                                  setFormData({...formData, timeline: option.value});
                                  trackInteraction({
                                    type: 'click',
                                    element: 'timeline_select',
                                    value: option.value
                                  });
                                }}
                                className={`px-3 py-2 rounded-lg border-2 text-xs font-medium transition-all duration-300 ${
                                  formData.timeline === option.value 
                                    ? 'border-orange-500 bg-white/60 dark:bg-slate-700/60 backdrop-blur-fallback-sm transparency-normalized text-orange-700 dark:text-orange-300' 
                                    : 'border-gray-200 hover:border-gray-300'
                                }`}
                              >
                                {option.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {/* Standard form shows all fields at once */}
                  {!isProgressive && (
                    <>
                      {/* All sections shown for standard form */}
                      <div className="bg-white/60 dark:bg-slate-700/60 backdrop-blur-fallback-sm transparency-normalized rounded-xl p-4 border border-white/30 dark:border-slate-600/30">
                        <h4 className="font-bold text-green-900 mb-3 flex items-center">
                          <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs mr-2">2</span>
                          Business Details
                        </h4>
                        {/* Same fields as progressive version */}
                        <div className="space-y-3">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-2">Website URL</label>
                            <input 
                              type="url" 
                              value={formData.website}
                              onChange={(e) => setFormData({...formData, website: e.target.value})}
                              onFocus={() => handleFieldFocus('website')}
                              onBlur={(e) => handleFieldBlur('website', e.target.value)}
                              className={`w-full px-3 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 text-sm ${
                                fieldValidation.website === 'valid' ? 'border-green-500' : 
                                fieldValidation.website === 'invalid' ? 'border-red-500' : 'border-gray-200'
                              }`}
                              placeholder="https://yourcompany.com"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-bold text-slate-700 mb-2">Industry</label>
                              <select 
                                value={formData.industry}
                                onChange={(e) => setFormData({...formData, industry: e.target.value})}
                                onFocus={() => handleFieldFocus('industry')}
                                className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 text-sm"
                              >
                                <option value="">Select industry</option>
                                <option value="software">Software/SaaS</option>
                                <option value="healthcare">Healthcare</option>
                                <option value="ecommerce">E-commerce</option>
                                <option value="financial">Financial Services</option>
                                <option value="professional">Professional Services</option>
                                <option value="manufacturing">Manufacturing</option>
                                <option value="other">Other</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-slate-700 mb-2">Team Size</label>
                              <select 
                                value={formData.teamSize}
                                onChange={(e) => setFormData({...formData, teamSize: e.target.value})}
                                onFocus={() => handleFieldFocus('teamSize')}
                                className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 text-sm"
                              >
                                <option value="">Select size</option>
                                <option value="1-10">1-10 employees</option>
                                <option value="11-50">11-50 employees</option>
                                <option value="51-200">51-200 employees</option>
                                <option value="200+">200+ employees</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Marketing Challenge */}
                      <div className="bg-white/60 dark:bg-slate-700/60 backdrop-blur-fallback-sm transparency-normalized rounded-xl p-4 border border-white/30 dark:border-slate-600/30">
                        <h4 className="font-bold text-yellow-900 mb-3 flex items-center">
                          <span className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xs mr-2">3</span>
                          Your Marketing Challenge
                        </h4>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-2">What's your biggest marketing pain right now? *</label>
                            <textarea 
                              value={formData.specificIssue}
                              onChange={(e) => setFormData({...formData, specificIssue: e.target.value})}
                              onFocus={() => handleFieldFocus('specificIssue')}
                              onBlur={(e) => handleFieldBlur('specificIssue', e.target.value)}
                              className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 text-sm placeholder:text-xs" 
                              placeholder="e.g., Not getting enough leads, poor conversion rates, unclear messaging, competitors beating us, website visitors not buying..."
                              rows={3}
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-2">What marketing are you currently doing?</label>
                            <textarea 
                              value={formData.currentMarketing}
                              onChange={(e) => setFormData({...formData, currentMarketing: e.target.value})}
                              onFocus={() => handleFieldFocus('currentMarketing')}
                              onBlur={(e) => handleFieldBlur('currentMarketing', e.target.value)}
                              className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 text-sm placeholder:text-xs" 
                              placeholder="e.g., Google Ads, social media, content marketing, email campaigns, SEO..."
                              rows={2}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Timeline */}
                      <div className="bg-white/60 dark:bg-slate-700/60 backdrop-blur-fallback-sm transparency-normalized rounded-xl p-4 border border-white/30 dark:border-slate-600/30">
                        <h4 className="font-bold text-purple-900 mb-3 flex items-center">
                          <span className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs mr-2">4</span>
                          Timeline
                        </h4>
                        <p className="text-xs replace-text-gray-600 mb-3">When do you need to see marketing results?</p>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { value: 'asap', label: 'ASAP' },
                            { value: '1-3months', label: '1-3 months' },
                            { value: '3-6months', label: '3-6 months' },
                            { value: '6months+', label: '6+ months' }
                          ].map(option => (
                            <button
                              key={option.value}
                              onClick={() => setFormData({...formData, timeline: option.value})}
                              className={`px-3 py-2 rounded-lg border-2 text-xs font-medium transition-all duration-300 ${
                                formData.timeline === option.value 
                                  ? 'border-orange-500 bg-white/60 dark:bg-slate-700/60 backdrop-blur-fallback-sm transparency-normalized text-orange-700 dark:text-orange-300' 
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Error message */}
                {submitError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                    <p className="text-sm">{submitError}</p>
                  </div>
                )}

                {/* Smart Submit Button - Only show when ready */}
                {((!isProgressive) || (isProgressive && formData.specificIssue)) && (
                  <button 
                    onClick={async () => {
                      // Clear previous error
                      setSubmitError('');
                      
                      // Validate required fields
                      if (!formData.name || !formData.company || !formData.email || !formData.specificIssue) {
                        setSubmitError('Please fill in all required fields');
                        return;
                      }

                      // Validate email format
                      if (!validateEmail(formData.email)) {
                        setSubmitError('Please enter a valid email address');
                        return;
                      }

                      setIsSubmitting(true);

                      try {
                        // Calculate completion time
                        const completionTime = formStartTime.current 
                          ? (Date.now() - formStartTime.current.getTime()) / 1000 
                          : 0;

                        // Track form completion
                        trackCompletion(completionTime);
                        
                        // Submit to server
                        const result = await submitFormToServer(formData);
                        
                        console.log('Enhanced form submitted successfully:', result.data?.message);
                        
                        // Track conversion
                        trackConversion('form_submission', leadScorePrediction, {
                          formStyle,
                          completionTime,
                          leadScore: leadScorePrediction
                        });
                        
                        // Reset form and close modal
                        setShowDropdownForm(false);
                        setFormStep(1);
                        setFormData({
                          email: '', challenge: '', revenue: '', name: '', company: '',
                          timeline: '', website: '', specificIssue: '', industry: '',
                          teamSize: '', currentMarketing: ''
                        });
                        
                      } catch (error) {
                        console.error('Error submitting enhanced form:', error);
                        setSubmitError(error instanceof Error ? error.message : 'Failed to submit form. Please try again.');
                      } finally {
                        setIsSubmitting(false);
                      }
                    }}
                    disabled={isSubmitting}
                    className={`w-full mt-6 px-8 py-4 rounded-xl font-black text-lg transition-all duration-300 transform shadow-2xl ${
                      isSubmitting 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : leadScorePrediction >= 80
                        ? 'bg-gradient-to-r from-red-500 via-orange-600 to-red-600 hover:from-red-600 hover:via-orange-700 hover:to-red-700 hover:scale-105 animate-pulse'
                        : 'bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 hover:from-orange-600 hover:via-orange-700 hover:to-red-600 hover:scale-105'
                    } text-white`}
                  >
                    {isSubmitting ? 'Submitting...' : 
                     leadScorePrediction >= 80 ? '🚀 Get Priority Analysis Now →' :
                     leadScorePrediction >= 60 ? 'Get My Growth Strategy →' :
                     'Get My Free Marketing Analysis →'}
                  </button>
                )}
                
                <p className="replace-text-gray-500 text-xs text-center mt-4">
                  🔒 Your information is 100% secure. No spam, ever.
                  {leadScorePrediction >= 80 && (
                    <>
                      <br />
                      <span className="text-orange-accessible font-medium">⚡ Priority leads get response within 1 hour</span>
                    </>
                  )}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnhancedLeadForm;