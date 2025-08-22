import { r as reactExports, j as jsxDevRuntimeExports } from "./react-core-BlMi_X7P.js";
import { G, e as ee, w, Q, j, S } from "./vendor-WJZsBhsu.js";
import { a as analytics } from "./app-utils-B6wQ-etB.js";
import "./components-core-CHKRUzvV.js";
const ConversionOptimizationContext = reactExports.createContext(null);
const TIER_PERSONALIZATION = {
  Hot: {
    leadTier: "Hot",
    messaging: {
      heroTitle: "Ready to Transform Your Marketing? Let's Talk Today.",
      heroSubtitle: "High-growth companies need strategic marketing leadership. Get your custom growth plan in 24 hours.",
      ctaText: "Schedule Strategy Call Now",
      urgencyMessage: "⚡ Priority Response: We'll contact you within 1 hour",
      socialProof: "Join 200+ companies already accelerating growth"
    },
    pricing: {
      showDiscount: true,
      emphasizeValue: true,
      highlightSavings: true,
      customMessage: "Enterprise pricing available - significant savings for qualified companies"
    },
    content: {
      testimonials: ["enterprise_success", "fast_results", "roi_focused"],
      caseStudies: ["enterprise_transformation", "rapid_scale"],
      features: ["strategic_leadership", "executive_support", "rapid_implementation"]
    }
  },
  Warm: {
    leadTier: "Warm",
    messaging: {
      heroTitle: "Scale Your Marketing with Expert CMO Guidance",
      heroSubtitle: "Growth-stage companies trust us to build marketing systems that deliver consistent results.",
      ctaText: "Get My Growth Strategy",
      socialProof: "Trusted by 200+ growing companies"
    },
    pricing: {
      showDiscount: false,
      emphasizeValue: true,
      highlightSavings: false
    },
    content: {
      testimonials: ["growth_success", "system_building", "team_development"],
      caseStudies: ["growth_acceleration", "system_optimization"],
      features: ["strategic_planning", "team_coaching", "system_building"]
    }
  },
  Cold: {
    leadTier: "Cold",
    messaging: {
      heroTitle: "Build Marketing That Actually Drives Growth",
      heroSubtitle: "Stop wasting money on marketing that doesn't work. Get a proven system that delivers results.",
      ctaText: "Learn More",
      socialProof: "Used by companies at every growth stage"
    },
    pricing: {
      showDiscount: false,
      emphasizeValue: true,
      highlightSavings: false
    },
    content: {
      testimonials: ["foundational_success", "problem_solving", "education"],
      caseStudies: ["foundation_building", "problem_diagnosis"],
      features: ["strategic_foundation", "problem_diagnosis", "education"]
    }
  },
  Unqualified: {
    leadTier: "Unqualified",
    messaging: {
      heroTitle: "Marketing Insights for Growing Businesses",
      heroSubtitle: "Learn proven strategies used by successful companies to build sustainable growth.",
      ctaText: "Get Free Resources",
      socialProof: "Join thousands learning marketing strategy"
    },
    pricing: {
      showDiscount: false,
      emphasizeValue: false,
      highlightSavings: false
    },
    content: {
      testimonials: ["educational", "inspiration", "accessibility"],
      caseStudies: ["educational_content", "inspiration"],
      features: ["educational_resources", "foundational_guidance", "community_access"]
    }
  }
};
const EXIT_INTENT_CONFIG = {
  delay: 500,
  maxShows: 2,
  leadTierSpecific: {
    Hot: {
      title: "Wait! Let's Schedule Your Strategy Call",
      message: "You're clearly ready for growth. Don't leave without booking your priority consultation.",
      offer: "Free 30-minute strategy session + custom growth plan",
      ctaText: "Book My Priority Call"
    },
    Warm: {
      title: "Before You Go - Get Your Free Growth Audit",
      message: "We can show you exactly what's holding back your marketing.",
      offer: "Free marketing audit + recommendations (normally $2,500)",
      ctaText: "Get My Free Audit"
    },
    Cold: {
      title: "Get Our Marketing Success Framework",
      message: "Download our proven framework used by 200+ companies.",
      offer: "Free Marketing Growth Framework + Templates",
      ctaText: "Download Free Framework"
    },
    Unqualified: {
      title: "Stay Updated with Marketing Insights",
      message: "Get weekly insights on marketing strategy and growth.",
      offer: "Join our marketing insights newsletter",
      ctaText: "Get Weekly Insights"
    }
  }
};
const DEFAULT_FUNNEL_STEPS = [
  { id: "page_view", name: "Page View", description: "Visitor viewed the page", completed: false },
  { id: "engagement", name: "Content Engagement", description: "Engaged with content for 30+ seconds", completed: false },
  { id: "pricing_view", name: "Pricing View", description: "Viewed pricing information", completed: false },
  { id: "form_start", name: "Form Started", description: "Started lead form", completed: false },
  { id: "form_complete", name: "Form Completed", description: "Completed lead form", completed: false },
  { id: "conversion", name: "Conversion", description: "Completed primary conversion action", completed: false }
];
const ConversionOptimizationProvider = ({ children }) => {
  const [session, setSession] = reactExports.useState(null);
  const [leadScore, setLeadScore] = reactExports.useState(null);
  const [personalization, setPersonalization] = reactExports.useState(TIER_PERSONALIZATION.Unqualified);
  reactExports.useEffect(() => {
    const initializeSession = () => {
      const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const userId = localStorage.getItem("ab_test_user_id") || `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const newSession = {
        id: sessionId,
        userId,
        startTime: /* @__PURE__ */ new Date(),
        pageViews: [window.location.pathname],
        interactions: [],
        behavioralData: {
          pageViews: 1,
          timeOnSite: 0,
          contentEngagement: [],
          formAbandonment: false,
          returnVisit: localStorage.getItem(`visited_${userId}`) !== null,
          referralSource: document.referrer || "direct",
          deviceType: getDeviceType(),
          scrollDepth: 0,
          interactions: []
        },
        conversionFunnel: DEFAULT_FUNNEL_STEPS.map(
          (step) => step.id === "page_view" ? { ...step, completed: true, timestamp: /* @__PURE__ */ new Date() } : { ...step }
        ),
        personalization: TIER_PERSONALIZATION.Unqualified,
        exitIntentShown: 0,
        conversions: []
      };
      localStorage.setItem(`visited_${userId}`, "true");
      setSession(newSession);
    };
    initializeSession();
  }, []);
  reactExports.useEffect(() => {
    const interval = setInterval(() => {
      if (session) {
        setSession((prev) => prev ? {
          ...prev,
          behavioralData: {
            ...prev.behavioralData,
            timeOnSite: (Date.now() - prev.startTime.getTime()) / 1e3
          }
        } : null);
      }
    }, 5e3);
    return () => clearInterval(interval);
  }, [session]);
  reactExports.useEffect(() => {
    let timeoutId;
    const handleMouseLeave = (event) => {
      if (event.clientY <= 0 && isExitIntentEligible()) {
        timeoutId = setTimeout(() => {
          showExitIntent();
        }, EXIT_INTENT_CONFIG.delay);
      }
    };
    const handleMouseEnter = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [session]);
  const getDeviceType = () => {
    const width = window.innerWidth;
    if (width <= 768) return "mobile";
    if (width <= 1024) return "tablet";
    return "desktop";
  };
  const trackInteraction = reactExports.useCallback((interaction) => {
    const fullInteraction = {
      ...interaction,
      timestamp: /* @__PURE__ */ new Date()
    };
    setSession((prev) => {
      if (!prev) return null;
      const updatedSession = {
        ...prev,
        interactions: [...prev.interactions, fullInteraction],
        behavioralData: {
          ...prev.behavioralData,
          interactions: [...prev.behavioralData.interactions, fullInteraction]
        }
      };
      if (updatedSession.behavioralData.timeOnSite >= 30 && !updatedSession.conversionFunnel.find((s) => s.id === "engagement")?.completed) {
        updatedSession.conversionFunnel = updatedSession.conversionFunnel.map(
          (step) => step.id === "engagement" ? { ...step, completed: true, timestamp: /* @__PURE__ */ new Date() } : step
        );
      }
      return updatedSession;
    });
  }, []);
  const trackPageView = reactExports.useCallback((page) => {
    setSession((prev) => prev ? {
      ...prev,
      pageViews: [...prev.pageViews, page],
      behavioralData: {
        ...prev.behavioralData,
        pageViews: prev.behavioralData.pageViews + 1,
        contentEngagement: [...prev.behavioralData.contentEngagement, page]
      }
    } : null);
  }, []);
  const trackScrollDepth = reactExports.useCallback((depth) => {
    setSession((prev) => prev ? {
      ...prev,
      behavioralData: {
        ...prev.behavioralData,
        scrollDepth: Math.max(prev.behavioralData.scrollDepth, depth)
      }
    } : null);
  }, []);
  const trackFormAbandonment = reactExports.useCallback((formId, fieldName) => {
    const abandonInteraction = {
      type: "form_abandon",
      element: formId,
      value: fieldName,
      metadata: { abandonedAt: fieldName },
      timestamp: /* @__PURE__ */ new Date()
    };
    setSession((prev) => prev ? {
      ...prev,
      interactions: [...prev.interactions, abandonInteraction],
      behavioralData: {
        ...prev.behavioralData,
        formAbandonment: true,
        interactions: [...prev.behavioralData.interactions, abandonInteraction]
      }
    } : null);
  }, []);
  const trackConversion = reactExports.useCallback((type, value = 0, metadata) => {
    const conversion = {
      id: `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      timestamp: /* @__PURE__ */ new Date(),
      value,
      metadata
    };
    setSession((prev) => {
      if (!prev) return null;
      let updatedFunnel = prev.conversionFunnel;
      if (type === "form_submission") {
        updatedFunnel = updatedFunnel.map((step) => {
          if (step.id === "form_complete" || step.id === "conversion") {
            return { ...step, completed: true, timestamp: /* @__PURE__ */ new Date(), value };
          }
          return step;
        });
      }
      return {
        ...prev,
        conversions: [...prev.conversions, conversion],
        conversionFunnel: updatedFunnel
      };
    });
  }, []);
  const updateFunnelStep = reactExports.useCallback((stepId, completed, value, metadata) => {
    setSession((prev) => prev ? {
      ...prev,
      conversionFunnel: prev.conversionFunnel.map(
        (step) => step.id === stepId ? { ...step, completed, timestamp: completed ? /* @__PURE__ */ new Date() : step.timestamp, value, metadata } : step
      )
    } : null);
  }, []);
  const updateLeadScore = reactExports.useCallback((score) => {
    setLeadScore(score);
    setPersonalization(TIER_PERSONALIZATION[score.tier]);
    setSession((prev) => prev ? {
      ...prev,
      leadScore: score,
      personalization: TIER_PERSONALIZATION[score.tier]
    } : null);
  }, []);
  const getPersonalizedContent = reactExports.useCallback((contentType) => {
    return personalization.content[contentType] || null;
  }, [personalization]);
  const getTierSpecificMessage = reactExports.useCallback((messageType) => {
    return personalization.messaging[messageType] || "";
  }, [personalization]);
  const showExitIntent = reactExports.useCallback(() => {
    if (!isExitIntentEligible()) return;
    setSession((prev) => prev ? {
      ...prev,
      exitIntentShown: prev.exitIntentShown + 1
    } : null);
    window.dispatchEvent(new CustomEvent("showExitIntent", {
      detail: {
        config: EXIT_INTENT_CONFIG.leadTierSpecific[leadScore?.tier || "Unqualified"],
        leadTier: leadScore?.tier || "Unqualified"
      }
    }));
  }, [leadScore, session]);
  const dismissExitIntent = reactExports.useCallback(() => {
    window.dispatchEvent(new CustomEvent("dismissExitIntent"));
  }, []);
  const isExitIntentEligible = reactExports.useCallback(() => {
    if (!session) return false;
    return session.exitIntentShown < EXIT_INTENT_CONFIG.maxShows;
  }, [session]);
  const getConversionFunnelData = reactExports.useCallback(() => {
    return session?.conversionFunnel || [];
  }, [session]);
  const getBehavioralInsights = reactExports.useCallback(() => {
    return session?.behavioralData || {
      pageViews: 0,
      timeOnSite: 0,
      contentEngagement: [],
      formAbandonment: false,
      returnVisit: false,
      referralSource: "unknown",
      deviceType: "desktop",
      scrollDepth: 0,
      interactions: []
    };
  }, [session]);
  const getSessionDuration = reactExports.useCallback(() => {
    return session ? (Date.now() - session.startTime.getTime()) / 1e3 : 0;
  }, [session]);
  const shouldShowUrgency = reactExports.useCallback(() => {
    return Boolean(leadScore?.tier === "Hot" || leadScore?.intent && leadScore.intent >= 75);
  }, [leadScore]);
  const getOptimalCTAText = reactExports.useCallback(() => {
    return personalization.messaging.ctaText;
  }, [personalization]);
  const getRecommendedNextAction = reactExports.useCallback(() => {
    return leadScore?.recommendedAction || "Learn more about our services";
  }, [leadScore]);
  if (!session) {
    return null;
  }
  const contextValue = {
    session,
    leadScore,
    personalization,
    trackInteraction,
    trackPageView,
    trackScrollDepth,
    trackFormAbandonment,
    trackConversion,
    updateFunnelStep,
    updateLeadScore,
    getPersonalizedContent,
    getTierSpecificMessage,
    showExitIntent,
    dismissExitIntent,
    isExitIntentEligible,
    getConversionFunnelData,
    getBehavioralInsights,
    getSessionDuration,
    shouldShowUrgency,
    getOptimalCTAText,
    getRecommendedNextAction
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ConversionOptimizationContext.Provider, { value: contextValue, children }, void 0, false, {
    fileName: "/tmp/reboot-dev-build-20250821-152047/src/contexts/ConversionOptimizationContext.tsx",
    lineNumber: 621,
    columnNumber: 5
  }, void 0);
};
const useConversionOptimization = () => {
  const context = reactExports.useContext(ConversionOptimizationContext);
  if (!context) {
    throw new Error("useConversionOptimization must be used within a ConversionOptimizationProvider");
  }
  return context;
};
const ABTestContext = reactExports.createContext(null);
const DEFAULT_TESTS = [
  {
    id: "hero_cta_test",
    name: "Hero CTA Button Text",
    description: "Testing different hero CTA button text for conversion optimization",
    variants: [
      { id: "control", name: "Get Free Analysis", weight: 50, config: { text: "Get Free Analysis" } },
      { id: "variant_a", name: "Unlock Growth Strategy", weight: 25, config: { text: "Unlock Growth Strategy" } },
      { id: "variant_b", name: "Get My Custom Plan", weight: 25, config: { text: "Get My Custom Plan" } }
    ],
    status: "running",
    trafficSplit: [50, 25, 25],
    conversionGoals: ["form_submission", "email_signup"],
    startDate: /* @__PURE__ */ new Date(),
    metrics: {
      participants: 0,
      conversions: {},
      conversionRate: {},
      statisticalSignificance: {},
      confidence: {}
    }
  },
  {
    id: "pricing_display_test",
    name: "Pricing Display Strategy",
    description: "Testing different pricing presentation approaches",
    variants: [
      { id: "control", name: "Standard Pricing", weight: 50, config: { style: "standard" } },
      { id: "variant_a", name: "Value-First Pricing", weight: 50, config: { style: "value_first" } }
    ],
    status: "running",
    trafficSplit: [50, 50],
    conversionGoals: ["pricing_engagement", "form_submission"],
    startDate: /* @__PURE__ */ new Date(),
    metrics: {
      participants: 0,
      conversions: {},
      conversionRate: {},
      statisticalSignificance: {},
      confidence: {}
    }
  },
  {
    id: "form_optimization_test",
    name: "Lead Form Optimization",
    description: "Testing progressive form disclosure vs standard form",
    variants: [
      { id: "control", name: "Standard Form", weight: 50, config: { style: "standard" } },
      { id: "variant_a", name: "Progressive Form", weight: 50, config: { style: "progressive" } }
    ],
    status: "running",
    trafficSplit: [50, 50],
    conversionGoals: ["form_completion", "form_submission"],
    targetAudience: {
      userType: ["new"],
      deviceType: ["desktop", "mobile"]
    },
    startDate: /* @__PURE__ */ new Date(),
    metrics: {
      participants: 0,
      conversions: {},
      conversionRate: {},
      statisticalSignificance: {},
      confidence: {}
    }
  }
];
const ABTestProvider = ({ children }) => {
  const [activeTests, setActiveTests] = reactExports.useState(DEFAULT_TESTS);
  const [userAssignments, setUserAssignments] = reactExports.useState({
    userId: "",
    assignments: {},
    createdAt: /* @__PURE__ */ new Date()
  });
  const [userId, setUserId] = reactExports.useState("");
  reactExports.useEffect(() => {
    const initializeUser = () => {
      let storedUserId = localStorage.getItem("ab_test_user_id");
      if (!storedUserId) {
        storedUserId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem("ab_test_user_id", storedUserId);
      }
      setUserId(storedUserId);
      const storedAssignments = localStorage.getItem(`ab_assignments_${storedUserId}`);
      if (storedAssignments) {
        try {
          const assignments = JSON.parse(storedAssignments);
          setUserAssignments(assignments);
        } catch (error) {
          console.error("Failed to parse stored A/B test assignments:", error);
        }
      } else {
        setUserAssignments({
          userId: storedUserId,
          assignments: {},
          createdAt: /* @__PURE__ */ new Date()
        });
      }
    };
    initializeUser();
  }, []);
  reactExports.useEffect(() => {
    if (userId && userAssignments.assignments) {
      localStorage.setItem(`ab_assignments_${userId}`, JSON.stringify(userAssignments));
    }
  }, [userId, userAssignments]);
  const hashUserId = (userId2, testId) => {
    const str = `${userId2}_${testId}`;
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  };
  const assignVariant = (test) => {
    if (userAssignments.assignments[test.id]) {
      return userAssignments.assignments[test.id];
    }
    if (test.targetAudience) ;
    const hash = hashUserId(userId, test.id);
    const bucket = hash % 100;
    let cumulativeWeight = 0;
    for (let i = 0; i < test.variants.length; i++) {
      cumulativeWeight += test.trafficSplit[i];
      if (bucket < cumulativeWeight) {
        const variantId = test.variants[i].id;
        setUserAssignments((prev) => ({
          ...prev,
          assignments: {
            ...prev.assignments,
            [test.id]: variantId
          }
        }));
        trackParticipation(test.id, variantId);
        return variantId;
      }
    }
    return test.variants[0].id;
  };
  const trackParticipation = (testId, variantId) => {
    setActiveTests((prev) => prev.map((test) => {
      if (test.id === testId) {
        return {
          ...test,
          metrics: {
            ...test.metrics,
            participants: test.metrics.participants + 1
          }
        };
      }
      return test;
    }));
    if (typeof window !== "undefined") {
      console.log(`A/B Test Participation: ${testId} -> ${variantId}`);
    }
  };
  const getVariant = (testId) => {
    const test = activeTests.find((t) => t.id === testId);
    if (!test || test.status !== "running") {
      return null;
    }
    return assignVariant(test);
  };
  const trackConversion = (testId, eventType, value) => {
    const variantId = userAssignments.assignments[testId];
    if (!variantId) {
      return;
    }
    const conversionEvent = {
      testId,
      variantId,
      userId,
      eventType,
      timestamp: /* @__PURE__ */ new Date(),
      value,
      metadata: { userAgent: navigator.userAgent, url: window.location.href }
    };
    setActiveTests((prev) => prev.map((test) => {
      if (test.id === testId) {
        const updatedConversions = {
          ...test.metrics.conversions,
          [variantId]: (test.metrics.conversions[variantId] || 0) + 1
        };
        const variantParticipants = Object.values(userAssignments.assignments).filter((v) => v === variantId).length;
        const conversionRate = variantParticipants > 0 ? updatedConversions[variantId] / variantParticipants * 100 : 0;
        return {
          ...test,
          metrics: {
            ...test.metrics,
            conversions: updatedConversions,
            conversionRate: {
              ...test.metrics.conversionRate,
              [variantId]: conversionRate
            }
          }
        };
      }
      return test;
    }));
    console.log("A/B Test Conversion:", conversionEvent);
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "ab_test_conversion", {
        test_id: testId,
        variant_id: variantId,
        event_type: eventType,
        value: value || 0
      });
    }
  };
  const calculateSignificance = (testId, variantId) => {
    const test = activeTests.find((t) => t.id === testId);
    if (!test) return 0;
    const controlVariant = test.variants[0];
    if (variantId === controlVariant.id) return 0;
    const controlConversions = test.metrics.conversions[controlVariant.id] || 0;
    const variantConversions = test.metrics.conversions[variantId] || 0;
    const controlParticipants = 100;
    const variantParticipants = 100;
    const p1 = controlConversions / controlParticipants;
    const p2 = variantConversions / variantParticipants;
    const pooledP = (controlConversions + variantConversions) / (controlParticipants + variantParticipants);
    const se = Math.sqrt(pooledP * (1 - pooledP) * (1 / controlParticipants + 1 / variantParticipants));
    if (se === 0) return 0;
    const zScore = Math.abs(p2 - p1) / se;
    const pValue = 2 * (1 - normalCdf(Math.abs(zScore)));
    return pValue;
  };
  const normalCdf = (x) => {
    return 0.5 * (1 + erf(x / Math.sqrt(2)));
  };
  const erf = (x) => {
    const a1 = 0.254829592;
    const a2 = -0.284496736;
    const a3 = 1.421413741;
    const a4 = -1.453152027;
    const a5 = 1.061405429;
    const p = 0.3275911;
    const sign = x >= 0 ? 1 : -1;
    x = Math.abs(x);
    const t = 1 / (1 + p * x);
    const y = 1 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
    return sign * y;
  };
  const createTest = (testConfig) => {
    const newTest = {
      ...testConfig,
      id: `test_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      metrics: {
        participants: 0,
        conversions: {},
        conversionRate: {},
        statisticalSignificance: {},
        confidence: {}
      }
    };
    setActiveTests((prev) => [...prev, newTest]);
  };
  const updateTest = (testId, updates) => {
    setActiveTests((prev) => prev.map(
      (test) => test.id === testId ? { ...test, ...updates } : test
    ));
  };
  const startTest = (testId) => {
    updateTest(testId, { status: "running", startDate: /* @__PURE__ */ new Date() });
  };
  const pauseTest = (testId) => {
    updateTest(testId, { status: "paused" });
  };
  const stopTest = (testId) => {
    updateTest(testId, { status: "completed", endDate: /* @__PURE__ */ new Date() });
  };
  const getTestResults = (testId) => {
    const test = activeTests.find((t) => t.id === testId);
    return test ? test.metrics : null;
  };
  const getConversionRate = (testId, variantId) => {
    const test = activeTests.find((t) => t.id === testId);
    return test?.metrics.conversionRate[variantId] || 0;
  };
  const isStatisticallySignificant = (testId, variantId) => {
    const pValue = calculateSignificance(testId, variantId);
    return pValue < 0.05;
  };
  const isUserInTest = (testId) => {
    return !!userAssignments.assignments[testId];
  };
  const getUserId = () => {
    return userId;
  };
  const contextValue = {
    activeTests,
    userAssignments,
    getVariant,
    trackConversion,
    createTest,
    updateTest,
    startTest,
    pauseTest,
    stopTest,
    getTestResults,
    getConversionRate,
    isStatisticallySignificant,
    isUserInTest,
    getUserId
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ABTestContext.Provider, { value: contextValue, children }, void 0, false, {
    fileName: "/tmp/reboot-dev-build-20250821-152047/src/contexts/ABTestContext.tsx",
    lineNumber: 482,
    columnNumber: 5
  }, void 0);
};
const useABTest = () => {
  const context = reactExports.useContext(ABTestContext);
  if (!context) {
    throw new Error("useABTest must be used within an ABTestProvider");
  }
  return context;
};
const useVariant = (testId) => {
  const { getVariant, trackConversion, isUserInTest } = useABTest();
  const variant = getVariant(testId);
  const track = (eventType, value) => {
    trackConversion(testId, eventType, value);
  };
  return {
    variant,
    isInTest: isUserInTest(testId),
    track
  };
};
const useCTAOptimization = (testId = "hero_cta_test") => {
  const { variant, track, isInTest } = useVariant(testId);
  const { getOptimalCTAText, trackInteraction } = useConversionOptimization();
  const getCTAText = reactExports.useCallback(() => {
    if (!isInTest || !variant) return getOptimalCTAText();
    const testVariants = {
      control: "Get Free Analysis",
      variant_a: "Unlock Growth Strategy",
      variant_b: "Get My Custom Plan"
    };
    return testVariants[variant] || getOptimalCTAText();
  }, [variant, isInTest, getOptimalCTAText]);
  const trackCTAClick = reactExports.useCallback((location) => {
    trackInteraction({
      type: "click",
      element: `cta_button_${location}`,
      value: variant || "default",
      metadata: { testId, location }
    });
    track("cta_click", 1);
  }, [track, trackInteraction, variant, testId]);
  const trackCTAView = reactExports.useCallback((location) => {
    trackInteraction({
      type: "cta_view",
      element: `cta_button_${location}`,
      value: variant || "default",
      metadata: { testId, location }
    });
  }, [trackInteraction, variant, testId]);
  return {
    ctaText: getCTAText(),
    variant,
    isInTest,
    trackClick: trackCTAClick,
    trackView: trackCTAView
  };
};
const usePricingOptimization = (testId = "pricing_display_test") => {
  const { variant, track, isInTest } = useVariant(testId);
  const { personalization, trackInteraction } = useConversionOptimization();
  const getPricingStyle = reactExports.useCallback(() => {
    if (!isInTest || !variant) return "standard";
    return variant === "variant_a" ? "value_first" : "standard";
  }, [variant, isInTest]);
  const shouldShowSavings = reactExports.useCallback(() => {
    const style = getPricingStyle();
    return style === "value_first" || personalization.pricing.highlightSavings;
  }, [getPricingStyle, personalization]);
  const shouldEmphasizeValue = reactExports.useCallback(() => {
    return getPricingStyle() === "value_first" || personalization.pricing.emphasizeValue;
  }, [getPricingStyle, personalization]);
  const trackPricingEngagement = reactExports.useCallback((action, plan) => {
    trackInteraction({
      type: "click",
      element: `pricing_${action}`,
      value: plan,
      metadata: { testId, variant, action }
    });
    track("pricing_engagement", 1);
  }, [track, trackInteraction, variant, testId]);
  return {
    pricingStyle: getPricingStyle(),
    variant,
    isInTest,
    shouldShowSavings: shouldShowSavings(),
    shouldEmphasizeValue: shouldEmphasizeValue(),
    trackEngagement: trackPricingEngagement
  };
};
const useFormOptimization = (testId = "form_optimization_test") => {
  const { variant, track, isInTest } = useVariant(testId);
  const { trackInteraction, updateFunnelStep, trackFormAbandonment } = useConversionOptimization();
  const formStartTime = reactExports.useRef(null);
  const getFormStyle = reactExports.useCallback(() => {
    if (!isInTest || !variant) return "standard";
    return variant === "variant_a" ? "progressive" : "standard";
  }, [variant, isInTest]);
  const trackFormStart = reactExports.useCallback(() => {
    formStartTime.current = /* @__PURE__ */ new Date();
    updateFunnelStep("form_start", true);
    trackInteraction({
      type: "form_focus",
      element: "lead_form",
      metadata: { testId, variant }
    });
    track("form_start", 1);
  }, [track, trackInteraction, updateFunnelStep, variant, testId]);
  const trackFormStep = reactExports.useCallback((stepNumber, fieldsCompleted) => {
    trackInteraction({
      type: "form_focus",
      element: `form_step_${stepNumber}`,
      value: fieldsCompleted,
      metadata: { testId, variant, stepNumber }
    });
  }, [trackInteraction, variant, testId]);
  const trackFormAbandonmentEvent = reactExports.useCallback((stepNumber, fieldName) => {
    const timeSpent = formStartTime.current ? Date.now() - formStartTime.current.getTime() : 0;
    trackFormAbandonment(`form_step_${stepNumber}`, fieldName);
    track("form_abandon", timeSpent / 1e3);
  }, [trackFormAbandonment, track]);
  const trackFormCompletion = reactExports.useCallback((completionTime) => {
    updateFunnelStep("form_complete", true, completionTime);
    trackInteraction({
      type: "form_focus",
      element: "form_complete",
      value: completionTime,
      metadata: { testId, variant, completionTime }
    });
    track("form_completion", completionTime);
  }, [track, trackInteraction, updateFunnelStep, variant, testId]);
  return {
    formStyle: getFormStyle(),
    variant,
    isInTest,
    trackFormStart,
    trackFormStep,
    trackAbandonment: trackFormAbandonmentEvent,
    trackCompletion: trackFormCompletion
  };
};
const useExitIntentOptimization = () => {
  const { leadScore, isExitIntentEligible } = useConversionOptimization();
  const { trackConversion } = useABTest();
  reactExports.useEffect(() => {
    const handleExitIntent = (event) => {
      const { config, leadTier } = event.detail;
      trackConversion("exit_intent_test", "exit_intent_shown", 1);
      console.log("Exit intent triggered for tier:", leadTier, config);
    };
    const handleExitDismiss = () => {
      trackConversion("exit_intent_test", "exit_intent_dismissed", 1);
    };
    window.addEventListener("showExitIntent", handleExitIntent);
    window.addEventListener("dismissExitIntent", handleExitDismiss);
    return () => {
      window.removeEventListener("showExitIntent", handleExitIntent);
      window.removeEventListener("dismissExitIntent", handleExitDismiss);
    };
  }, [trackConversion]);
  return {
    isEligible: isExitIntentEligible(),
    leadTier: leadScore?.tier || "Unqualified"
  };
};
const useScrollOptimization = () => {
  const { trackScrollDepth, trackInteraction } = useConversionOptimization();
  const scrollMilestones = reactExports.useRef(/* @__PURE__ */ new Set());
  reactExports.useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round(scrollTop / docHeight * 100);
      const milestones = [25, 50, 75, 90];
      milestones.forEach((milestone) => {
        if (scrollPercent >= milestone && !scrollMilestones.current.has(milestone)) {
          scrollMilestones.current.add(milestone);
          trackScrollDepth(scrollPercent);
          trackInteraction({
            type: "scroll",
            element: "page",
            value: milestone,
            metadata: { scrollPercent, milestone }
          });
        }
      });
    };
    const throttledScroll = throttle(handleScroll, 100);
    window.addEventListener("scroll", throttledScroll);
    return () => window.removeEventListener("scroll", throttledScroll);
  }, [trackScrollDepth, trackInteraction]);
  return {
    milestones: Array.from(scrollMilestones.current)
  };
};
const useTimeBasedOptimization = () => {
  const { trackInteraction } = useConversionOptimization();
  const timeMilestones = reactExports.useRef(/* @__PURE__ */ new Set());
  reactExports.useEffect(() => {
    const intervals = [30, 60, 120, 300];
    intervals.forEach((seconds) => {
      const timeoutId = setTimeout(() => {
        if (!timeMilestones.current.has(seconds)) {
          timeMilestones.current.add(seconds);
          trackInteraction({
            type: "scroll",
            // Using scroll type for time engagement
            element: "time_milestone",
            value: seconds,
            metadata: { type: "time_engagement", seconds }
          });
        }
      }, seconds * 1e3);
      return () => clearTimeout(timeoutId);
    });
  }, [trackInteraction]);
  return {
    engagementMilestones: Array.from(timeMilestones.current)
  };
};
const useClickHeatmap = () => {
  const { trackInteraction } = useConversionOptimization();
  reactExports.useEffect(() => {
    const handleClick = (event) => {
      const target = event.target;
      const rect = target.getBoundingClientRect();
      trackInteraction({
        type: "click",
        element: target.tagName.toLowerCase(),
        metadata: {
          x: event.clientX,
          y: event.clientY,
          elementX: rect.left,
          elementY: rect.top,
          elementWidth: rect.width,
          elementHeight: rect.height,
          className: target.className,
          id: target.id,
          textContent: target.textContent?.substring(0, 100)
        }
      });
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [trackInteraction]);
};
const useTestResults = (testId) => {
  const { getTestResults, getConversionRate, isStatisticallySignificant, activeTests } = useABTest();
  const test = activeTests.find((t) => t.id === testId);
  const results = getTestResults(testId);
  const getVariantPerformance = reactExports.useCallback(() => {
    if (!test || !results) return [];
    return test.variants.map((variant) => ({
      id: variant.id,
      name: variant.name,
      conversionRate: getConversionRate(testId, variant.id),
      conversions: results.conversions[variant.id] || 0,
      isSignificant: isStatisticallySignificant(testId, variant.id),
      isWinner: results.winner === variant.id
    }));
  }, [test, results, testId, getConversionRate, isStatisticallySignificant]);
  return {
    test,
    results,
    variants: getVariantPerformance(),
    isRunning: test?.status === "running",
    hasWinner: !!results?.winner
  };
};
const throttle = (func, delay) => {
  let timeoutId;
  let lastExecTime = 0;
  return function(...args) {
    const currentTime = Date.now();
    if (currentTime - lastExecTime > delay) {
      func(...args);
      lastExecTime = currentTime;
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
        lastExecTime = Date.now();
      }, delay - (currentTime - lastExecTime));
    }
  };
};
const LeadFormContext = reactExports.createContext(void 0);
const LeadFormProvider = ({ children }) => {
  const [showDropdownForm, setShowDropdownForm] = reactExports.useState(false);
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(LeadFormContext.Provider, { value: { showDropdownForm, setShowDropdownForm }, children }, void 0, false, {
    fileName: "/tmp/reboot-dev-build-20250821-152047/src/contexts/LeadFormContext.tsx",
    lineNumber: 15,
    columnNumber: 5
  }, void 0);
};
const useLeadForm = () => {
  const context = reactExports.useContext(LeadFormContext);
  if (!context) {
    throw new Error("useLeadForm must be used within a LeadFormProvider");
  }
  return context;
};
function useCoreWebVitals() {
  reactExports.useEffect(() => {
    G((metric) => {
      analytics.coreWebVital("lcp", metric.value, metric.rating);
    });
    ee((metric) => {
      analytics.coreWebVital("fid", metric.value, metric.rating);
    });
    w((metric) => {
      analytics.coreWebVital("cls", metric.value, metric.rating);
    });
    Q((metric) => {
      analytics.coreWebVital("ttfb", metric.value, metric.rating);
    });
    j((metric) => {
      analytics.coreWebVital("inp", metric.value, metric.rating);
    });
    S((metric) => {
      analytics.coreWebVital("fcp", metric.value, metric.rating);
    });
    let maxScroll = 0;
    const trackedDepths = /* @__PURE__ */ new Set();
    const handleScroll = () => {
      const scrollPercent = Math.round(
        window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100
      );
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        [25, 50, 75, 100].forEach((depth) => {
          if (scrollPercent >= depth && !trackedDepths.has(depth)) {
            trackedDepths.add(depth);
            analytics.scrollDepth(depth);
          }
        });
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
}
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
const initialState = {
  errors: [],
  notifications: [],
  isReporting: false,
  globalErrorCount: 0
};
const errorReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ERROR": {
      const newError = {
        ...action.payload,
        id: generateId(),
        timestamp: /* @__PURE__ */ new Date(),
        resolved: false
      };
      return {
        ...state,
        errors: [...state.errors, newError],
        globalErrorCount: state.globalErrorCount + 1
      };
    }
    case "RESOLVE_ERROR": {
      return {
        ...state,
        errors: state.errors.map(
          (error) => error.id === action.payload.id ? { ...error, resolved: true } : error
        )
      };
    }
    case "CLEAR_ERRORS": {
      return {
        ...state,
        errors: []
      };
    }
    case "ADD_NOTIFICATION": {
      const newNotification = {
        ...action.payload,
        id: generateId()
      };
      return {
        ...state,
        notifications: [...state.notifications, newNotification]
      };
    }
    case "REMOVE_NOTIFICATION": {
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification.id !== action.payload.id
        )
      };
    }
    case "CLEAR_NOTIFICATIONS": {
      return {
        ...state,
        notifications: []
      };
    }
    case "SET_REPORTING": {
      return {
        ...state,
        isReporting: action.payload.isReporting
      };
    }
    case "INCREMENT_GLOBAL_ERROR_COUNT": {
      return {
        ...state,
        globalErrorCount: state.globalErrorCount + 1
      };
    }
    default:
      return state;
  }
};
const ErrorContext = reactExports.createContext(null);
const ErrorProvider = ({
  children,
  enableErrorReporting = true
}) => {
  const [state, dispatch] = reactExports.useReducer(errorReducer, initialState);
  const addError = reactExports.useCallback((error) => {
    const errorId = generateId();
    dispatch({
      type: "ADD_ERROR",
      payload: error
    });
    if (error.severity === "high" || error.severity === "critical") {
      const notificationTitle = error.severity === "critical" ? "Critical Error" : "Error Occurred";
      showNotification({
        title: notificationTitle,
        message: error.message,
        type: "error",
        duration: error.severity === "critical" ? 0 : 5e3,
        // Critical errors are persistent
        actions: [
          {
            label: "Dismiss",
            action: () => hideNotification(errorId),
            variant: "secondary"
          },
          {
            label: "Retry",
            action: () => {
              window.location.reload();
            },
            variant: "primary"
          }
        ]
      });
    }
    return errorId;
  }, []);
  const resolveError = reactExports.useCallback((id) => {
    dispatch({ type: "RESOLVE_ERROR", payload: { id } });
  }, []);
  const clearErrors = reactExports.useCallback(() => {
    dispatch({ type: "CLEAR_ERRORS" });
  }, []);
  const showNotification = reactExports.useCallback((notification) => {
    const notificationId = generateId();
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: notification
    });
    if (notification.duration && notification.duration > 0) {
      setTimeout(() => {
        hideNotification(notificationId);
      }, notification.duration);
    }
    return notificationId;
  }, []);
  const hideNotification = reactExports.useCallback((id) => {
    dispatch({ type: "REMOVE_NOTIFICATION", payload: { id } });
  }, []);
  const clearNotifications = reactExports.useCallback(() => {
    dispatch({ type: "CLEAR_NOTIFICATIONS" });
  }, []);
  const reportError = reactExports.useCallback(async (error, context) => {
    if (!enableErrorReporting) return;
    dispatch({ type: "SET_REPORTING", payload: { isReporting: true } });
    try {
      const errorData = {
        message: error.message,
        stack: error.stack,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent,
        context: context || {}
      };
      console.group("🚨 Reporting Error to External Service");
      console.error("Error Data:", errorData);
      console.groupEnd();
      if (false) ;
      addError({
        message: error.message,
        severity: "high",
        source: "ErrorReporting",
        details: { context, stack: error.stack }
      });
    } catch (reportingError) {
      console.error("Failed to report error:", reportingError);
      showNotification({
        title: "Reporting Failed",
        message: "Unable to report error. Please try again or contact support.",
        type: "warning",
        duration: 5e3
      });
    } finally {
      dispatch({ type: "SET_REPORTING", payload: { isReporting: false } });
    }
  }, [enableErrorReporting, addError, showNotification]);
  const getErrorStats = reactExports.useCallback(() => {
    const stats = {
      total: state.errors.length,
      bySource: {},
      bySeverity: {}
    };
    state.errors.forEach((error) => {
      stats.bySource[error.source] = (stats.bySource[error.source] || 0) + 1;
      stats.bySeverity[error.severity] = (stats.bySeverity[error.severity] || 0) + 1;
    });
    return stats;
  }, [state.errors]);
  const contextValue = {
    state,
    addError,
    resolveError,
    clearErrors,
    showNotification,
    hideNotification,
    clearNotifications,
    reportError,
    getErrorStats
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ErrorContext.Provider, { value: contextValue, children }, void 0, false, {
    fileName: "/tmp/reboot-dev-build-20250821-152047/src/contexts/ErrorContext.tsx",
    lineNumber: 396,
    columnNumber: 5
  }, void 0);
};
const useError = () => {
  const context = reactExports.useContext(ErrorContext);
  if (!context) {
    throw new Error("useError must be used within an ErrorProvider");
  }
  return context;
};
const useErrorReporter = () => {
  const { reportError } = useError();
  return reactExports.useCallback((error, additionalContext) => {
    const context = {
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      url: window.location.href,
      pathname: window.location.pathname,
      userAgent: navigator.userAgent,
      ...additionalContext
    };
    return reportError(error, context);
  }, [reportError]);
};
export {
  ABTestProvider as A,
  ConversionOptimizationProvider as C,
  ErrorProvider as E,
  LeadFormProvider as L,
  usePricingOptimization as a,
  useCTAOptimization as b,
  useLeadForm as c,
  useFormOptimization as d,
  useError as e,
  useExitIntentOptimization as f,
  useABTest as g,
  useTestResults as h,
  useErrorReporter as i,
  useScrollOptimization as j,
  useTimeBasedOptimization as k,
  useClickHeatmap as l,
  useCoreWebVitals as m,
  useConversionOptimization as u
};
//# sourceMappingURL=app-state-r1lWMrhg.js.map
