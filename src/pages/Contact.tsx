import { useState } from 'react';
import { Mail, MapPin, Globe, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';
import SEOHead from '../components/SEOHead';
import BackgroundGradient from '../components/BackgroundGradient';
import { useLeadForm } from '../contexts/LeadFormContext';

const Contact = () => {
  const { setShowDropdownForm } = useLeadForm();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    website: '',
    phone: '',
    subject: '',
    message: '',
    serviceInterest: '',
    honeypot: '', // Bot detection field
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) return 'Name is required';
    if (!formData.email.trim()) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return 'Please enter a valid email address';
    if (!formData.message.trim()) return 'Message is required';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setStatus('error');
      setErrorMessage(validationError);
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      // Prepare data for server submission
      const submissionData = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        subject: formData.subject.trim() || 'Contact Form Submission',
        message: formData.message.trim(),
        // Include additional context in message if provided
        ...(formData.company && { company: formData.company.trim() }),
        ...(formData.website && { website: formData.website.trim() }),
        ...(formData.phone && { phone: formData.phone.trim() }),
        ...(formData.serviceInterest && { serviceInterest: formData.serviceInterest }),
      };

      // Enhanced message with context
      let enhancedMessage = submissionData.message;
      if (formData.company) enhancedMessage += `\n\nCompany: ${formData.company}`;
      if (formData.website) enhancedMessage += `\nWebsite: ${formData.website}`;
      if (formData.phone) enhancedMessage += `\nPhone: ${formData.phone}`;
      if (formData.serviceInterest) enhancedMessage += `\nService Interest: ${formData.serviceInterest}`;

      // Submit to server endpoint
      const apiUrl = import.meta.env.DEV 
        ? 'http://localhost:3002/api/forms/contact'
        : '/api/forms/contact';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: submissionData.name,
          email: submissionData.email,
          subject: submissionData.subject,
          message: enhancedMessage,
          honeypot: formData.honeypot, // Bot detection
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Form submission failed');
      }

      const result = await response.json();
      console.log('Contact form submitted successfully:', result.data?.message);
      
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        website: '',
        phone: '',
        subject: '',
        message: '',
        serviceInterest: '',
        honeypot: '',
      });
    } catch (error) {
      console.error('Contact form submission error:', error);
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to send message. Please try again later.');
    }
  };

  // Structured data now handled automatically by SEOHead component


  return (
    <div className="contact-page min-h-screen relative overflow-hidden">
      {/* Screen Reader Status Announcements */}
      <div 
        aria-live="polite" 
        aria-atomic="true" 
        className="sr-only"
        id="status-announcer"
      >
        <span className="sr-only">Content loaded successfully</span>
      </div>
      
      {/* Sophisticated Background Gradient */}
      <BackgroundGradient />
      
      {/* Enhanced SEO Head */}
      <SEOHead 
        pageSlug="contact"
        structuredDataType="contact"
        enableCoreWebVitalsOptimization={true}
      />
      
      {/* Global Header */}
      <div className="relative z-10">
        <GlobalHeader showProgressBar={true} />

      {/* Main Content */}
      <div className="pt-20 md:pt-24 pb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="heading-hero text-gradient-critical mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-gradient-safe max-w-3xl mx-auto leading-relaxed">
              Ready to transform your marketing strategy? Let's discuss how our fractional CMO services 
              can drive measurable growth for your business.
            </p>
          </div>

          {/* Form Usage Guidance */}
          <div className="glass-card-orange rounded-2xl p-6 mb-8 text-center">
            <h2 className="heading-sm text-white mb-3">
              Looking for Marketing Help?
            </h2>
            <p className="text-orange-900 mb-4">
              If you're looking to improve your marketing, grow your revenue, or get a free marketing analysis, 
              please use our Marketing Analysis form for the fastest response and personalized recommendations.
            </p>
            <button aria-label="Opens contact form for free marketing analysis"
              onClick={() => setShowDropdownForm(true)}
              className="bg-orange-500 hover:bg-orange-600 focus-visible:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Get Your Free Marketing Analysis →
            </button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="glass-card-light rounded-2xl shadow-xl border border-white/20 p-6">
                <h2 className="heading-lg text-gradient-critical mb-6">General Inquiries</h2>
            <p className="text-white/90 mb-4 text-sm">
              Use this form for legal inquiries, privacy questions, technical support, or other non-marketing matters.
            </p>
                
                {status === 'success' && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                      <span className="text-green-800 font-medium">
                        Message sent successfully! We'll get back to you within 24 hours.
                      </span>
                    </div>
                  </div>
                )}

                {status === 'error' && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center">
                      <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                      <span className="text-red-800 font-medium">
                        {errorMessage}
                      </span>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6" role="form" aria-label="Lead generation form">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-white mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white border border-gray-400 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white border border-gray-400 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="company" className="block text-sm font-semibold text-white mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border border-gray-400 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900"
                        placeholder="Your company"
                      />
                    </div>
                    <div>
                      <label htmlFor="website" className="block text-sm font-semibold text-white mb-2">
                        Website URL
                      </label>
                      <input
                        type="url"
                        id="website"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border border-gray-400 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900"
                        placeholder="https://yourwebsite.com"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-white mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border border-gray-400 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    <div>
                      <label htmlFor="serviceInterest" className="block text-sm font-semibold text-white mb-2">
                        Service Interest
                      </label>
                      <select
                        id="serviceInterest"
                        name="serviceInterest"
                        value={formData.serviceInterest}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border border-gray-400 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900"
                       aria-label="Select an option">
                        <option value="">Select a service</option>
                        <option value="quick-win">Quick-Win Strategy ($5K-8K/month)</option>
                        <option value="growth-strategy">Growth Strategy ($8K-12K/month)</option>
                        <option value="fractional-cmo">Fractional CMO ($12K-18K/month)</option>
                        <option value="consultation">Free Consultation</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-white mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border border-gray-400 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900"
                      placeholder="What can we help you with?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-white mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-white border border-gray-400 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900"
                      placeholder="Tell us about your business challenges and goals..."
                      aria-label="Text input field">
                    </textarea>
                  </div>

                  {/* Honeypot field for bot detection - hidden from users */}
                  <div style={{ display: 'none' }}>
                    <label htmlFor="honeypot">Leave this field empty</label>
                    <input
                      type="text"
                      id="honeypot"
                      name="honeypot"
                      value={formData.honeypot}
                      onChange={handleInputChange}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full px-8 py-4 bg-orange-500 hover:bg-orange-600 focus-visible:bg-orange-600 disabled:bg-orange-300 text-white font-semibold rounded-lg transition-colors flex items-center justify-center"
                  >
                    {status === 'loading' ? (
                      <>

                        <Loader2 className="w-5 h-5 mr-2 motion-safe:animate-spin motion-reduce:animate-none" />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Mail className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              
              {/* Company Info */}
              <div className="glass-card-light rounded-2xl shadow-xl border border-white/20 p-6">
                <h3 className="heading-md text-white mb-4">Get in Touch</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-orange-500 mr-3 mt-1" />
                    <div>
                      <p className="font-semibold text-white">Address</p>
                      <p className="text-sm text-white/80">
                        17595 Harvard Ave C-738<br />
                        Irvine, CA 92614<br />
                        United States
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Globe className="w-5 h-5 text-orange-500 mr-3 mt-1" />
                    <div>
                      <p className="font-semibold text-white">Service Areas</p>
                      <p className="text-sm text-white/80">
                        USA • Bangkok • Singapore<br />
                        Global services available
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Response Time */}
              <div className="glass-card-orange rounded-2xl p-6">
                <h3 className="heading-md text-orange-900 mb-2">Response Time</h3>
                <p className="text-orange-800 text-sm">
                  We typically respond to all inquiries within 24 hours during business days. 
                  For urgent matters, please mention it in your message subject line.
                </p>
              </div>

              {/* Free Consultation CTA */}
              <div className="glass-card-blue rounded-2xl p-6">
                <h3 className="heading-md text-blue-900 mb-2">Free Marketing Analysis</h3>
                <p className="text-blue-800 text-sm mb-4">
                  Ready to transform your marketing? Get a personalized analysis 
                  that shows exactly how to accelerate your business growth.
                </p>
                <button aria-label="Opens contact form for free marketing analysis" 
                  onClick={() => setShowDropdownForm(true)}
                  className="inline-block px-4 py-2 bg-blue-700 hover:bg-blue-800 focus-visible:bg-blue-800 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
                >
                  Get Your Free Analysis
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Global Footer */}
      <GlobalFooter />
      </div>
    </div>
  );
};

export default Contact;