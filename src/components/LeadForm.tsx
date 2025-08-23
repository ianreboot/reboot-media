import { useState } from 'react';
import { useLeadForm } from '../contexts/LeadFormContext';

const LeadForm = () => {
  const { showDropdownForm, setShowDropdownForm } = useLeadForm();
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
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

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleFieldBlur = (field: string, value: string) => {
    if (field === 'website' && value) {
      const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
      setFieldValidation({
        ...fieldValidation,
        [field]: urlPattern.test(value) ? 'valid' : 'invalid'
      });
    }
  };

  const handleCheckboxChange = (option: string) => {
    setSelectedOptions({
      ...selectedOptions,
      [option]: !selectedOptions[option]
    });
  };

  const submitFormToServer = async (formData: {
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
  }) => {
    const apiUrl = import.meta.env.DEV 
      ? 'http://localhost:3002/api/forms/lead'
      : '/api/forms/lead';

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Form submission failed');
    }

    return await response.json();
  };

  if (!showDropdownForm) return null;

  return (
    <div className="fixed inset-0 modal-backdrop-dark z-[60] flex items-start justify-center pt-4 md:pt-10 px-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full flex flex-col relative" style={{ maxHeight: '92vh' }}>
        <div className="absolute top-2 right-2 z-10">
          <button 
            onClick={() => {
              setShowDropdownForm(false);
              setFormStep(1);
              setFormData({
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
            }}
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 focus-visible:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <div className="p-4 md:p-6 overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: '#CBD5E0 transparent' }}>
          {/* Step 1: Marketing Anxiety Acknowledgment */}
          {formStep === 1 && (
            <div className="text-center" aria-current="step" aria-label="Step 1 of form">
              <h3 className="text-2xl font-black replace-text-slate-900 mb-4">
                Is Your Marketing <span className="text-orange-500">Keeping You</span> Up at Night?
              </h3>
              <p className="text-gray-600 mb-8">
                You're not alone. 87% of growth-stage companies struggle with the same marketing challenges.
              </p>
              
              <div className="space-y-3 mb-8">
                <label className="flex items-start text-left p-4 bg-gray-50 rounded-xl hover:bg-gray-100 focus-visible:bg-gray-100 cursor-pointer transition-colors">
                  <input 
                    type="checkbox" 
                    className="mt-1 mr-3 w-5 h-5"
                    checked={selectedOptions['notWorking']}
                    onChange={() => handleCheckboxChange('notWorking')}
                  />
                  <span className="text-gray-700">
                    <strong>Marketing isn't working</strong> - You're spending money but not seeing results
                  </span>
                </label>
                
                <label className="flex items-start text-left p-4 bg-gray-50 rounded-xl hover:bg-gray-100 focus-visible:bg-gray-100 cursor-pointer transition-colors">
                  <input 
                    type="checkbox" 
                    className="mt-1 mr-3 w-5 h-5"
                    checked={selectedOptions['plateau']}
                    onChange={() => handleCheckboxChange('plateau')}
                  />
                  <span className="text-gray-700">
                    <strong>Hit a growth plateau</strong> - What worked before isn't working anymore
                  </span>
                </label>
                
                <label className="flex items-start text-left p-4 bg-gray-50 rounded-xl hover:bg-gray-100 focus-visible:bg-gray-100 cursor-pointer transition-colors">
                  <input 
                    type="checkbox" 
                    className="mt-1 mr-3 w-5 h-5"
                    checked={selectedOptions['competition']}
                    onChange={() => handleCheckboxChange('competition')}
                  />
                  <span className="text-gray-700">
                    <strong>Losing to competition</strong> - Competitors are growing while you're stuck
                  </span>
                </label>
                
                <label className="flex items-start text-left p-4 bg-gray-50 rounded-xl hover:bg-gray-100 focus-visible:bg-gray-100 cursor-pointer transition-colors">
                  <input 
                    type="checkbox" 
                    className="mt-1 mr-3 w-5 h-5"
                    checked={selectedOptions['clarity']}
                    onChange={() => handleCheckboxChange('clarity')}
                  />
                  <span className="text-gray-700">
                    <strong>No clear strategy</strong> - You're trying everything but nothing sticks
                  </span>
                </label>
              </div>
              
              <button 
                onClick={() => setFormStep(2)}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 focus-visible:from-orange-600 hover:to-orange-700 focus-visible:to-orange-700 text-white px-8 py-4 rounded-xl font-bold text-lg motion-safe:transition-all motion-reduce:transition-none motion-safe:duration-300 motion-reduce:duration-0 motion-safe:transform motion-safe:hover:scale-105 motion-reduce:transform-none motion-safe:focus-visible:scale-105 motion-reduce:transform-none shadow-xl"
              >
                Yes, I Need Help With This →
              </button>
              
              <p className="text-gray-500 text-sm mt-6">
                Takes 60 seconds • No sales pressure • Get real solutions
              </p>
            </div>
          )}
          
          {/* Step 2: Revenue Stage Qualification */}
          {formStep === 2 && (
            <div aria-current="step" aria-label="Step 2 of form">
              <button 
                onClick={() => setFormStep(1)}
                className="text-gray-500 hover:text-gray-700 focus-visible:text-gray-700 mb-4 flex items-center transition-colors"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
                </svg>
                Back
              </button>
              
              <div className="bg-white rounded-2xl p-6 max-w-lg mx-auto shadow-2xl">
                <h3 className="text-2xl font-black replace-text-slate-900 mb-4">
                  I Feel You. Let's <span className="text-orange-500">Identify</span> Your Growth Stage
                </h3>
                <p className="text-gray-600 mb-6">
                  Different revenue levels need different psychology approaches
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
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-500 font-bold">
                      3
                    </div>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h4 className="font-bold text-gray-900 mb-4">Step 2: Your Revenue Stage</h4>
                  <p className="text-sm text-gray-600 mb-4">What's your current annual revenue?</p>
                  
                  <div className="space-y-3">
                    <label className="block">
                      <input 
                        type="radio" 
                        name="revenue" 
                        value="500k-1m"
                        onChange={(e) => setFormData({...formData, revenue: e.target.value})}
                        className="mr-3 w-4 h-4"
                      />
                      <span className="text-gray-700">
                        <strong>$500K - $1M</strong><br />
                        <span className="text-sm text-gray-500 ml-7">Growing but hitting walls</span>
                      </span>
                    </label>
                    
                    <label className="block">
                      <input 
                        type="radio" 
                        name="revenue" 
                        value="1m-3m"
                        onChange={(e) => setFormData({...formData, revenue: e.target.value})}
                        className="mr-3 w-4 h-4"
                      />
                      <span className="text-gray-700">
                        <strong>$1M - $3M</strong><br />
                        <span className="text-sm text-gray-500 ml-7">Scaling but inconsistent</span>
                      </span>
                    </label>
                    
                    <label className="block">
                      <input 
                        type="radio" 
                        name="revenue" 
                        value="3m-10m"
                        onChange={(e) => setFormData({...formData, revenue: e.target.value})}
                        className="mr-3 w-4 h-4"
                      />
                      <span className="text-gray-700">
                        <strong>$3M - $10M</strong><br />
                        <span className="text-sm text-gray-500 ml-7">Need systematic growth</span>
                      </span>
                    </label>
                    
                    <label className="block">
                      <input 
                        type="radio" 
                        name="revenue" 
                        value="10m+"
                        onChange={(e) => setFormData({...formData, revenue: e.target.value})}
                        className="mr-3 w-4 h-4"
                      />
                      <span className="text-gray-700">
                        <strong>$10M+</strong><br />
                        <span className="text-sm text-gray-500 ml-7">Ready for transformation</span>
                      </span>
                    </label>
                  </div>
                </div>
                
                <button 
                  onClick={() => {
                    if (formData.revenue) {
                      setFormStep(3);
                    } else {
                      // Use a custom notification instead of alert for better security
                      console.error('Please select your revenue range');
                      return;
                    }
                  }}
                  disabled={!formData.revenue}
                  className={`w-full py-4 rounded-xl font-bold text-lg motion-safe:transition-all motion-reduce:transition-none motion-safe:duration-300 motion-reduce:duration-0 motion-safe:transform motion-safe:hover:scale-105 motion-reduce:transform-none motion-safe:focus-visible:scale-105 motion-reduce:transform-none shadow-xl ${
                    formData.revenue 
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 focus-visible:from-orange-600 hover:to-orange-700 focus-visible:to-orange-700 text-white' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Continue to Final Step →
                </button>
              </div>
            </div>
          )}
          
          {/* Step 3: Contact Information */}
          {formStep === 3 && (
            <div aria-current="step" aria-label="Step 3 of form">
              <button 
                onClick={() => setFormStep(2)}
                className="text-gray-500 hover:text-gray-700 focus-visible:text-gray-700 mb-4 flex items-center transition-colors"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
                </svg>
                Back
              </button>
              
              <div className="max-w-2xl mx-auto">
                <h3 className="text-2xl font-black replace-text-slate-900 mb-4 text-center">
                  Perfect! Let's Get Your <span className="text-orange-500">Free Analysis</span>
                </h3>
                <p className="text-gray-600 mb-8 text-center">
                  I'll personally review your situation and send you a custom growth strategy within 24 hours
                </p>
                
                {/* Progress Bar */}
                <div className="flex items-center justify-center mb-8">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                      ✓
                    </div>
                    <div className="w-20 h-1 bg-green-500"></div>
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                      ✓
                    </div>
                    <div className="w-20 h-1 bg-orange-500"></div>
                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                      3
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {/* Contact Information */}
                  <div className="bg-white/95 dark:bg-slate-700/95 rounded-xl p-4 border border-gray-200/30 dark:border-slate-600/30">
                    <h4 className="font-bold text-blue-900 mb-3 flex items-center">
                      <span className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs mr-2">1</span>
                      Contact Information
                    </h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold replace-text-slate-700 mb-2">Your Name *</label>
                        <input 
                          type="text" 
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 motion-safe:transition-all motion-reduce:transition-none motion-safe:duration-300 motion-reduce:duration-0 text-sm" 
                          placeholder="John Smith"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold replace-text-slate-700 mb-2">Company Name *</label>
                        <input 
                          type="text" 
                          value={formData.company}
                          onChange={(e) => setFormData({...formData, company: e.target.value})}
                          className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 motion-safe:transition-all motion-reduce:transition-none motion-safe:duration-300 motion-reduce:duration-0 text-sm" 
                          placeholder="Acme Corp"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold replace-text-slate-700 mb-2">Business Email *</label>
                      <input 
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 motion-safe:transition-all motion-reduce:transition-none motion-safe:duration-300 motion-reduce:duration-0 text-sm" 
                        placeholder="your@company.com"
                      />
                    </div>
                  </div>

                  {/* Business Details */}
                  <div className="bg-white/95 dark:bg-slate-700/95 rounded-xl p-4 border border-gray-200/30 dark:border-slate-600/30">
                    <h4 className="font-bold text-green-900 mb-3 flex items-center">
                      <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs mr-2">2</span>
                      Business Details
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-bold replace-text-slate-700 mb-2">Website URL</label>
                        <input 
                          type="url" 
                          value={formData.website}
                          onChange={(e) => setFormData({...formData, website: e.target.value})}
                          onBlur={(e) => handleFieldBlur('website', e.target.value)}
                          className={`w-full px-3 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 motion-safe:transition-all motion-reduce:transition-none motion-safe:duration-300 motion-reduce:duration-0 text-sm ${
                            fieldValidation.website === 'valid' ? 'border-green-500' : 
                            fieldValidation.website === 'invalid' ? 'border-red-500' : 'border-gray-200'
                          }`}
                          placeholder="https://yourcompany.com"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold replace-text-slate-700 mb-2">Industry</label>
                          <select 
                            value={formData.industry}
                            onChange={(e) => setFormData({...formData, industry: e.target.value})}
                            className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 motion-safe:transition-all motion-reduce:transition-none motion-safe:duration-300 motion-reduce:duration-0 text-sm"
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
                          <label className="block text-xs font-bold replace-text-slate-700 mb-2">Team Size</label>
                          <select 
                            value={formData.teamSize}
                            onChange={(e) => setFormData({...formData, teamSize: e.target.value})}
                            className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 motion-safe:transition-all motion-reduce:transition-none motion-safe:duration-300 motion-reduce:duration-0 text-sm"
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
                  <div className="bg-white/95 dark:bg-slate-700/95 rounded-xl p-4 border border-gray-200/30 dark:border-slate-600/30">
                    <h4 className="font-bold text-yellow-900 mb-3 flex items-center">
                      <span className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xs mr-2">3</span>
                      Your Marketing Challenge
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-bold replace-text-slate-700 mb-2">What's your biggest marketing pain right now? *</label>
                        <textarea 
                          value={formData.specificIssue}
                          onChange={(e) => setFormData({...formData, specificIssue: e.target.value})}
                          className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 motion-safe:transition-all motion-reduce:transition-none motion-safe:duration-300 motion-reduce:duration-0 text-sm placeholder:text-xs" 
                          placeholder="e.g., Not getting enough leads, poor conversion rates, unclear messaging, competitors beating us, website visitors not buying..."
                          rows={3}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold replace-text-slate-700 mb-2">What marketing are you currently doing?</label>
                        <textarea 
                          value={formData.currentMarketing}
                          onChange={(e) => setFormData({...formData, currentMarketing: e.target.value})}
                          className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 motion-safe:transition-all motion-reduce:transition-none motion-safe:duration-300 motion-reduce:duration-0 text-sm placeholder:text-xs" 
                          placeholder="e.g., Google Ads, social media, content marketing, email campaigns, SEO..."
                          rows={2}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="bg-white/95 dark:bg-slate-700/95 rounded-xl p-4 border border-gray-200/30 dark:border-slate-600/30">
                    <h4 className="font-bold text-purple-900 mb-3 flex items-center">
                      <span className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs mr-2">4</span>
                      Timeline
                    </h4>
                    <p className="text-xs text-gray-600 mb-3">When do you need to see marketing results?</p>
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
                          className={`px-3 py-2 rounded-lg border-2 text-xs font-medium motion-safe:transition-all motion-reduce:transition-none motion-safe:duration-300 motion-reduce:duration-0 ${
                            formData.timeline === option.value 
                              ? 'border-orange-500 bg-orange-50 dark:bg-slate-700/95 text-orange-700 dark:text-orange-300' 
                              : 'border-gray-200 hover:border-gray-300 focus-visible:border-gray-300'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Error message */}
                {submitError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                    <p className="text-sm">{submitError}</p>
                  </div>
                )}

                {/* Submit button */}
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
                      // Submit to server
                      const result = await submitFormToServer(formData);
                      
                      console.log('Form submitted successfully:', result.data?.message);
                      
                      // Reset form and close modal
                      setShowDropdownForm(false);
                      setFormStep(1);
                      setFormData({
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
                      
                      // You could show a success toast here instead of console.log
                      
                    } catch (error) {
                      console.error('Error submitting form:', error);
                      setSubmitError(error instanceof Error ? error.message : 'Failed to submit form. Please try again.');
                    } finally {
                      setIsSubmitting(false);
                    }
                  }}
                  disabled={isSubmitting}
                  className={`w-full mt-6 px-8 py-4 rounded-xl font-black text-lg motion-safe:transition-all motion-reduce:transition-none motion-safe:duration-300 motion-reduce:duration-0 transform shadow-2xl ${
                    isSubmitting 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 hover:from-orange-600 focus-visible:from-orange-600 hover:via-orange-700 focus-visible:via-orange-700 hover:to-red-600 focus-visible:to-red-600 hover:scale-105 motion-safe:focus-visible:scale-105 motion-reduce:transform-none'
                  } text-white`}
                >
                  {isSubmitting ? 'Submitting...' : 'Get My Free Marketing Analysis →'}
                </button>
                
                <p className="text-gray-500 text-xs text-center mt-4">
                  🔒 Your information is 100% secure. No spam, ever.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadForm;