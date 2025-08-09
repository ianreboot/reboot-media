import { useState } from 'react';
import { Mail, MapPin, Globe, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { getCanonicalUrl } from '../utils/urls';
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';
import SEOHead from '../components/SEOHead';
import BackgroundGradient from '../components/BackgroundGradient';
import { generateEmailContent } from '../utils/emailUtils';
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
      // Create email content using utility
      const emailContent = generateEmailContent(formData, 'Contact');

      // Here you would typically integrate with your email service
      // For now, we'll simulate a successful submission
      console.log('Contact form submission:', { 
        formData, 
        emailContent,
        destination: 'Contact Form Submission' 
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
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
      });
    } catch (error) {
      console.error('Contact form submission error:', error);
      setStatus('error');
      setErrorMessage('Failed to send message. Please try again later.');
    }
  };

  // SEO structured data
  const contactPageStructuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "mainEntity": {
      "@type": "Organization",
      "name": "Reboot Media, Inc.",
      "url": "https://www.rebootmedia.net/contact",
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "availableLanguage": ["English"],
        "areaServed": ["US", "TH", "SG", "MY", "ID", "PH", "VN"]
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "17595 Harvard Ave C-738",
        "addressLocality": "Irvine",
        "addressRegion": "CA",
        "postalCode": "92614",
        "addressCountry": "US"
      }
    }
  };


  return (
    <div className="contact-page min-h-screen relative overflow-hidden dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Sophisticated Background Gradient */}
      <BackgroundGradient />
      
      {/* SEO Head */}
      <SEOHead 
        title="Contact Fractional CMO Services | Schedule Free Consultation | Reboot Media"
        description="Contact our fractional CMO consultants for executive-level marketing strategy. Schedule your free consultation with Fortune 500-experienced C-level marketing leaders. Available globally with offices in USA, Bangkok, and Singapore."
        keywords="contact fractional CMO, schedule CMO consultation, hire fractional Chief Marketing Officer, marketing executive consultant contact, C-level marketing strategy consultation, Fortune 500 marketing consultant"
        canonicalUrl={getCanonicalUrl('contact')}
        ogTitle="Contact Fractional CMO Services - Free Strategy Consultation"
        ogDescription="Schedule your free consultation with Fortune 500-experienced fractional CMO consultants. Get executive-level marketing leadership for your growing business."
        structuredData={contactPageStructuredData}
      />
      
      {/* Global Header */}
      <div className="relative z-10">
        <GlobalHeader showProgressBar={true} />

      {/* Main Content */}
      <div className="pt-20 sm:pt-16 pb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="heading-hero text-critical dark:text-white mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-important dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Ready to transform your marketing strategy? Let's discuss how our fractional CMO services 
              can drive measurable growth for your business.
            </p>
          </div>

          {/* Form Usage Guidance */}
          <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-2xl p-6 mb-8">
            <h2 className="heading-sm text-important dark:text-orange-100 mb-3">
              Looking for Marketing Help?
            </h2>
            <p className="text-orange-800 dark:text-orange-200 mb-4">
              If you're looking to improve your marketing, grow your revenue, or get a free marketing analysis, 
              please use our Marketing Analysis form for the fastest response and personalized recommendations.
            </p>
            <button
              onClick={() => setShowDropdownForm(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Get Your Free Marketing Analysis →
            </button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/20 p-6">
                <h2 className="heading-lg text-critical dark:text-white mb-6">General Inquiries</h2>
            <p className="text-standard dark:text-gray-300 mb-4 text-sm">
              Use this form for legal inquiries, privacy questions, technical support, or other non-marketing matters.
            </p>
                
                {status === 'success' && (
                  <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
                      <span className="text-green-800 dark:text-green-200 font-medium">
                        Message sent successfully! We'll get back to you within 24 hours.
                      </span>
                    </div>
                  </div>
                )}

                {status === 'error' && (
                  <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <div className="flex items-center">
                      <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mr-2" />
                      <span className="text-red-800 dark:text-red-200 font-medium">
                        {errorMessage}
                      </span>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-standard dark:text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:text-white"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-standard dark:text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:text-white"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-standard dark:text-gray-300 mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:text-white"
                        placeholder="Your company"
                      />
                    </div>
                    <div>
                      <label htmlFor="website" className="block text-sm font-medium text-standard dark:text-gray-300 mb-2">
                        Website URL
                      </label>
                      <input
                        type="url"
                        id="website"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:text-white"
                        placeholder="https://yourwebsite.com"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-standard dark:text-gray-300 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:text-white"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    <div>
                      <label htmlFor="serviceInterest" className="block text-sm font-medium text-standard dark:text-gray-300 mb-2">
                        Service Interest
                      </label>
                      <select
                        id="serviceInterest"
                        name="serviceInterest"
                        value={formData.serviceInterest}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:text-white"
                      >
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
                    <label htmlFor="subject" className="block text-sm font-medium text-standard dark:text-gray-300 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:text-white"
                      placeholder="What can we help you with?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-standard dark:text-gray-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:text-white"
                      placeholder="Tell us about your business challenges and goals..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full px-8 py-4 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-semibold rounded-lg transition-colors flex items-center justify-center"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
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
              <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/20 p-6">
                <h3 className="heading-md text-important dark:text-white mb-4">Get in Touch</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-orange-500 mr-3 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Address</p>
                      <p className="text-sm text-optional dark:text-gray-300">
                        17595 Harvard Ave C-738<br />
                        Irvine, CA 92614<br />
                        United States
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Globe className="w-5 h-5 text-orange-500 mr-3 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Service Areas</p>
                      <p className="text-sm text-optional dark:text-gray-300">
                        USA • Bangkok • Singapore<br />
                        Global services available
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Response Time */}
              <div className="bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900 dark:to-amber-900 rounded-2xl p-6">
                <h3 className="heading-md text-important dark:text-white mb-2">Response Time</h3>
                <p className="text-standard dark:text-gray-300 text-sm">
                  We typically respond to all inquiries within 24 hours during business days. 
                  For urgent matters, please mention it in your message subject line.
                </p>
              </div>

              {/* Free Consultation CTA */}
              <div className="bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 rounded-2xl p-6">
                <h3 className="heading-md text-important dark:text-white mb-2">Free Marketing Analysis</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                  Ready to transform your marketing? Get a personalized analysis 
                  that shows exactly how to accelerate your business growth.
                </p>
                <button 
                  onClick={() => setShowDropdownForm(true)}
                  className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
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