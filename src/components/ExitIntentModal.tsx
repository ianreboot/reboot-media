/**
 * Exit Intent Modal with Lead Tier Personalization
 * Shows personalized offers based on lead scoring and behavior
 */

import React, { useState, useEffect } from 'react';
import { useConversionOptimization } from '../contexts/ConversionOptimizationContext';
import { useLeadForm } from '../contexts/LeadFormContext';
import { useExitIntentOptimization } from '../hooks/useABTestHooks';

interface ExitIntentModalProps {
  isVisible: boolean;
  onClose: () => void;
  onConvert: () => void;
}

const ExitIntentModal: React.FC<ExitIntentModalProps> = ({ isVisible, onClose, onConvert }) => {
  const { leadScore, trackConversion, trackInteraction } = useConversionOptimization();
  const { setShowDropdownForm } = useLeadForm();
  const { isEligible, leadTier } = useExitIntentOptimization();
  const [isClosing, setIsClosing] = useState(false);

  // Don't render if not eligible or not visible
  if (!isEligible || !isVisible) return null;

  // Get tier-specific content
  const getTierContent = () => {
    switch (leadTier) {
      case 'Hot':
        return {
          icon: '🔥',
          title: 'Wait! Let\'s Schedule Your Priority Strategy Call',
          subtitle: 'You\'re clearly ready for growth. Don\'t leave without booking your priority consultation.',
          offer: {
            title: 'FREE Priority Strategy Session',
            value: 'Worth $2,500',
            items: [
              '30-minute strategy consultation',
              'Custom growth plan created in 24 hours',
              'Priority implementation roadmap',
              'Guaranteed response within 1 hour'
            ]
          },
          ctaText: 'Book My Priority Call',
          urgency: 'Limited to 5 priority consultations per week',
          socialProof: 'Join 47 companies that booked priority calls this month',
          ctaStyle: 'bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 animate-pulse'
        };
        
      case 'Warm':
        return {
          icon: '⚡',
          title: 'Before You Go - Get Your Free Growth Audit',
          subtitle: 'We can show you exactly what\'s holding back your marketing.',
          offer: {
            title: 'FREE Marketing Growth Audit',
            value: 'Worth $2,500',
            items: [
              'Complete marketing audit',
              'Growth opportunity analysis',
              'Competitive positioning review',
              'Personalized recommendations'
            ]
          },
          ctaText: 'Get My Free Audit',
          urgency: 'Only 10 audits available this month',
          socialProof: 'Over 200 companies have received their audit',
          ctaStyle: 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700'
        };
        
      case 'Cold':
        return {
          icon: '📈',
          title: 'Get Our Proven Marketing Success Framework',
          subtitle: 'Download the same framework used by 200+ growing companies.',
          offer: {
            title: 'Marketing Growth Framework',
            value: 'FREE Download',
            items: [
              'Proven growth framework',
              'Marketing strategy templates',
              'Growth metrics dashboard',
              'Implementation checklist'
            ]
          },
          ctaText: 'Download Free Framework',
          urgency: 'Downloaded by 1,000+ marketers',
          socialProof: 'Join companies already using this framework',
          ctaStyle: 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
        };
        
      case 'Unqualified':
      default:
        return {
          icon: '📚',
          title: 'Stay Updated with Weekly Marketing Insights',
          subtitle: 'Get proven marketing strategies delivered to your inbox.',
          offer: {
            title: 'Marketing Insights Newsletter',
            value: 'FREE',
            items: [
              'Weekly marketing insights',
              'Growth case studies',
              'Strategy breakdowns',
              'Industry trend analysis'
            ]
          },
          ctaText: 'Get Weekly Insights',
          urgency: 'Join 10,000+ marketers already subscribed',
          socialProof: 'Trusted by marketing leaders worldwide',
          ctaStyle: 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800'
        };
    }
  };

  const content = getTierContent();

  useEffect(() => {
    if (isVisible) {
      // Track exit intent shown
      trackInteraction({
        type: 'scroll',
        element: 'exit_intent_modal',
        value: leadTier,
        metadata: { 
          leadTier,
          leadScore: leadScore?.total || 0,
          timestamp: new Date().toISOString()
        }
      });
      
      trackConversion('form_submission', leadScore?.total || 0);
    }
  }, [isVisible, trackInteraction, trackConversion, leadTier, leadScore]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);

    trackInteraction({
      type: 'click',
      element: 'exit_intent_close',
      value: 'dismissed',
      metadata: { leadTier, method: 'close_button' }
    });
    
    trackConversion('email_signup', 0);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      trackInteraction({
        type: 'click',
        element: 'exit_intent_close',
        value: 'dismissed',
        metadata: { leadTier, method: 'backdrop_click' }
      });
      
      trackConversion('email_signup', 0);
      handleClose();
    }
  };

  const handleCTAClick = () => {
    trackInteraction({
      type: 'click',
      element: 'exit_intent_cta',
      value: 'converted',
      metadata: { 
        leadTier, 
        offer: content.offer.title,
        leadScore: leadScore?.total || 0
      }
    });
    
    trackConversion('form_submission', leadScore?.total || 0);

    // For Hot and Warm leads, show the lead form
    if (leadTier === 'Hot' || leadTier === 'Warm') {
      setShowDropdownForm(true);
    }
    
    onConvert();
    handleClose();
  };

  const handleSecondaryAction = () => {
    trackInteraction({
      type: 'click',
      element: 'exit_intent_secondary',
      value: 'maybe_later',
      metadata: { leadTier }
    });
    
    handleClose();
  };

  return (
    <div 
      className={`fixed inset-0 z-[70] flex items-center justify-center p-4 transition-all duration-300 ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`}
      style={{
        // Consistent exit intent backdrop across browsers
        background: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(8px) saturate(150%)',
        WebkitBackdropFilter: 'blur(8px) saturate(150%)'
      }}
      onClick={handleBackdropClick}
    >
      <div 
        className={`bg-white rounded-2xl shadow-2xl max-w-lg w-full relative transform transition-all duration-300 ${
          isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors z-10"
        >
          <svg className="w-5 h-5 replace-text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>

        {/* Content */}
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="text-4xl mb-4">{content.icon}</div>
            <h3 className="text-2xl font-black replace-text-gray-900 mb-3">
              {content.title}
            </h3>
            <p className="replace-text-gray-600">
              {content.subtitle}
            </p>
          </div>

          {/* Offer Box */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-bold text-blue-900">
                {content.offer.title}
              </h4>
              <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                leadTier === 'Hot' ? 'bg-red-100 text-red-800' :
                leadTier === 'Warm' ? 'bg-orange-100 text-orange-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {content.offer.value}
              </span>
            </div>
            
            <ul className="space-y-2">
              {content.offer.items.map((item, index) => (
                <li key={index} className="flex items-start text-sm text-blue-800">
                  <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Urgency/Social Proof */}
          <div className="text-center mb-6">
            <p className="text-sm replace-text-gray-600 mb-2">
              {content.urgency}
            </p>
            <p className="text-xs replace-text-gray-500">
              {content.socialProof}
            </p>
          </div>

          {/* CTAs */}
          <div className="space-y-3">
            <button
              onClick={handleCTAClick}
              className={`w-full py-4 rounded-xl font-bold text-lg text-white transition-all duration-300 transform hover:scale-105 shadow-lg ${content.ctaStyle}`}
            >
              {content.ctaText}
            </button>
            
            <button
              onClick={handleSecondaryAction}
              className="w-full py-3 rounded-xl font-medium replace-text-gray-600 border border-gray-300 hover:bg-gray-50 transition-all duration-300"
            >
              Maybe Later
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="text-center mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center space-x-4 text-xs replace-text-gray-500">
              <span className="flex items-center">
                <svg className="w-4 h-4 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                No spam, ever
              </span>
              <span className="flex items-center">
                <svg className="w-4 h-4 text-blue-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Trusted by 200+ companies
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Exit Intent Manager Component
const ExitIntentManager: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { isExitIntentEligible } = useConversionOptimization();

  useEffect(() => {
    const handleShowExitIntent = () => {
      if (isExitIntentEligible()) {
        setIsModalVisible(true);
      }
    };

    const handleDismissExitIntent = () => {
      setIsModalVisible(false);
    };

    window.addEventListener('showExitIntent', handleShowExitIntent);
    window.addEventListener('dismissExitIntent', handleDismissExitIntent);

    return () => {
      window.removeEventListener('showExitIntent', handleShowExitIntent);
      window.removeEventListener('dismissExitIntent', handleDismissExitIntent);
    };
  }, [isExitIntentEligible]);

  return (
    <ExitIntentModal
      isVisible={isModalVisible}
      onClose={() => setIsModalVisible(false)}
      onConvert={() => {
        // Handle conversion - could trigger additional analytics, etc.
        setIsModalVisible(false);
      }}
    />
  );
};

export default ExitIntentManager;