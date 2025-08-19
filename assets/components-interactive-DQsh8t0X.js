import { r as reactExports, j as jsxDevRuntimeExports } from "./react-core-CWvNQPo6.js";
import { S as Swiper, a as SwiperSlide } from "./swiper-tqzTYPmW.js";
import { u as useConversionOptimization, a as usePricingOptimization, b as useCTAOptimization, c as useLeadForm, d as useFormOptimization, e as useError } from "./app-state-BEk9Y_gq.js";
const services = [
  {
    title: "STARTER",
    size: "Small",
    subtitle: "Quick-Win Strategy",
    duration: "3-month minimum",
    originalPrice: "$12K",
    price: "$5K-8K",
    priceNote: "/month",
    savings: "Save $4K+/mo",
    features: [
      "🔍 Strategic market positioning",
      "🧠 Executive-level growth strategy",
      "💬 Value proposition reconstruction",
      "🛡️ Building customer trust and credibility",
      "👥 Executive team development",
      "📊 Comprehensive audit report"
    ],
    color: "gray",
    popular: false,
    valueProposition: "Get unstuck and start growing again",
    roi: "2-3x revenue increase typical"
  },
  {
    title: "GROWTH",
    size: "Medium",
    subtitle: "Complete Strategy",
    duration: "6-month engagement",
    originalPrice: "$18K",
    price: "$8K-12K",
    priceNote: "/month",
    savings: "Save $6K+/mo",
    features: [
      "✅ Everything in Starter",
      "🎯 Monthly strategy sessions",
      "📈 Data-driven optimization strategies",
      "💰 Increasing customer lifetime value",
      "🏆 Team coaching program",
      "📋 Quarterly business reviews"
    ],
    color: "orange",
    popular: true,
    valueProposition: "Scale systematically with proven systems",
    roi: "4-6x revenue growth common"
  },
  {
    title: "ENTERPRISE",
    size: "Large",
    subtitle: "Full CMO Leadership",
    duration: "12-month partnership",
    originalPrice: "$25K",
    price: "$12K-18K",
    priceNote: "/month",
    savings: "Save $7K+/mo",
    features: [
      "✅ Everything in Growth",
      "👔 Weekly leadership participation",
      "🎯 Team hiring & management guidance",
      "📊 Board presentation preparation",
      "🏢 Complete marketing transformation",
      "🤝 Strategic partnership development"
    ],
    color: "blue",
    popular: false,
    valueProposition: "Complete marketing leadership & transformation",
    roi: "10x+ revenue scaling achieved"
  }
];
const PricingCard = ({
  service,
  leadTier,
  pricingStyle,
  shouldShowSavings,
  shouldEmphasizeValue,
  onEngagement,
  onCTAClick
}) => {
  const [hovered, setHovered] = reactExports.useState(false);
  const [viewed, setViewed] = reactExports.useState(false);
  const cardRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !viewed) {
          setViewed(true);
          onEngagement("card_view", service.title);
        }
      },
      { threshold: 0.5 }
    );
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    return () => observer.disconnect();
  }, [viewed, onEngagement, service.title]);
  const getCTAText = () => {
    switch (leadTier) {
      case "Hot":
        return "Schedule Strategy Call";
      case "Warm":
        return "Get Started";
      case "Cold":
        return "Learn More";
      case "Unqualified":
        return "View Details";
      default:
        return "Get Started";
    }
  };
  const getTierMessage = () => {
    if (leadTier === "Hot" && service.popular) {
      return {
        badge: "🔥 RECOMMENDED FOR YOU",
        message: "Based on your profile, this plan delivers maximum ROI",
        urgency: "Priority setup - implementation starts this week"
      };
    }
    if (leadTier === "Warm" && service.popular) {
      return {
        badge: "⭐ BEST VALUE",
        message: "Most companies at your stage choose this plan",
        urgency: ""
      };
    }
    return null;
  };
  const tierMessage = getTierMessage();
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "div",
    {
      ref: cardRef,
      className: "flex flex-col w-full",
      style: {
        height: service.popular ? "100%" : "auto",
        alignSelf: service.popular ? "stretch" : "center",
        marginTop: service.popular ? "0" : "3rem",
        marginBottom: service.popular ? "1rem" : "2rem"
      },
      onMouseEnter: () => {
        setHovered(true);
        onEngagement("card_hover", service.title);
      },
      onMouseLeave: () => setHovered(false),
      children: [
        tierMessage && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex justify-center mb-3", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: `text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg ${leadTier === "Hot" ? "bg-gradient-to-r from-red-500 to-orange-500 animate-pulse" : "bg-orange-500"}`, children: tierMessage.badge }, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/components/EnhancedPricingCards.tsx",
          lineNumber: 200,
          columnNumber: 11
        }, void 0) }, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/components/EnhancedPricingCards.tsx",
          lineNumber: 199,
          columnNumber: 9
        }, void 0),
        service.popular && !tierMessage && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex justify-center mb-3", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-orange-500 text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse", children: "MOST POPULAR" }, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/components/EnhancedPricingCards.tsx",
          lineNumber: 212,
          columnNumber: 11
        }, void 0) }, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/components/EnhancedPricingCards.tsx",
          lineNumber: 211,
          columnNumber: 9
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: `rounded-3xl border-2 ${service.popular ? "p-6" : "p-5"} text-center flex flex-col transition-all duration-500 ${service.popular ? "flex-1" : ""} ${service.color === "orange" ? `bg-gradient-to-br from-orange-500 to-orange-600 text-white border-orange-400 shadow-2xl ${hovered ? "scale-105" : "lg:scale-[1.02]"}` : service.color === "blue" ? `bg-gradient-to-br from-blue-600 to-blue-700 text-white border-blue-400 shadow-xl ${hovered ? "scale-105" : ""}` : `bg-white border-gray-200 shadow-lg ${hovered ? "scale-105 shadow-2xl" : ""}`}`, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: `inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 ${service.color === "orange" || service.color === "blue" ? "bg-white/20 text-white" : "bg-gray-100 replace-text-gray-600"}`, children: [
              service.size,
              " Business"
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/components/EnhancedPricingCards.tsx",
              lineNumber: 231,
              columnNumber: 11
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: `text-2xl font-black mb-1 ${service.color === "gray" ? "replace-text-slate-900" : "text-white"}`, children: service.title }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/components/EnhancedPricingCards.tsx",
              lineNumber: 239,
              columnNumber: 11
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: `text-sm ${service.color === "gray" ? "replace-" : "text-white/90"}`, children: service.subtitle }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/components/EnhancedPricingCards.tsx",
              lineNumber: 242,
              columnNumber: 11
            }, void 0)
          ] }, void 0, true, {
            fileName: "/home/ian/projects/reboot/src/components/EnhancedPricingCards.tsx",
            lineNumber: 230,
            columnNumber: 9
          }, void 0),
          pricingStyle === "value_first" && shouldEmphasizeValue && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: `mb-4 p-3 rounded-lg ${service.color === "orange" || service.color === "blue" ? "bg-white/10 border border-white/20" : "bg-blue-50 border border-blue-200"}`, children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: `text-sm font-bold ${service.color === "gray" ? "text-blue-800" : "text-white"}`, children: service.valueProposition }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/components/EnhancedPricingCards.tsx",
              lineNumber: 254,
              columnNumber: 13
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: `text-xs mt-1 ${service.color === "gray" ? "text-blue-accessible" : "text-white/80"}`, children: service.roi }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/components/EnhancedPricingCards.tsx",
              lineNumber: 259,
              columnNumber: 13
            }, void 0)
          ] }, void 0, true, {
            fileName: "/home/ian/projects/reboot/src/components/EnhancedPricingCards.tsx",
            lineNumber: 249,
            columnNumber: 11
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: `text-sm line-through mb-1 ${service.color === "gray" ? "replace-text-gray-500" : "text-white/60"}`, children: [
              service.originalPrice,
              "/mo"
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/components/EnhancedPricingCards.tsx",
              lineNumber: 269,
              columnNumber: 11
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-baseline justify-center gap-1", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: `text-3xl font-black ${service.color === "gray" ? "text-orange-accessible" : "text-white"}`, children: service.price }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/components/EnhancedPricingCards.tsx",
                lineNumber: 273,
                columnNumber: 13
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: `text-sm ${service.color === "gray" ? "replace-text-gray-600" : "text-white/90"}`, children: service.priceNote }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/components/EnhancedPricingCards.tsx",
                lineNumber: 276,
                columnNumber: 13
              }, void 0)
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/components/EnhancedPricingCards.tsx",
              lineNumber: 272,
              columnNumber: 11
            }, void 0),
            shouldShowSavings && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: `inline-block px-3 py-1 rounded-full text-xs font-bold mt-2 ${service.color === "orange" || service.color === "blue" ? "bg-green-400/20 text-green-100" : "bg-green-100 text-green-800"}`, children: service.savings }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/components/EnhancedPricingCards.tsx",
              lineNumber: 283,
              columnNumber: 13
            }, void 0),
            leadTier === "Hot" && service.popular && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: `text-xs mt-2 p-2 rounded ${service.color === "orange" || service.color === "blue" ? "bg-white/10 text-white/90" : "bg-orange-50 text-orange-700"}`, children: "🎯 Enterprise pricing negotiable for qualified companies" }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/components/EnhancedPricingCards.tsx",
              lineNumber: 294,
              columnNumber: 13
            }, void 0)
          ] }, void 0, true, {
            fileName: "/home/ian/projects/reboot/src/components/EnhancedPricingCards.tsx",
            lineNumber: 268,
            columnNumber: 9
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: `text-xs mb-4 ${service.color === "gray" ? "replace-" : "text-white/80"}`, children: service.duration }, void 0, false, {
            fileName: "/home/ian/projects/reboot/src/components/EnhancedPricingCards.tsx",
            lineNumber: 304,
            columnNumber: 9
          }, void 0),
          tierMessage?.message && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: `mb-4 p-3 rounded-lg text-sm ${service.color === "orange" || service.color === "blue" ? "bg-white/10 text-white/90" : "bg-blue-50 text-blue-700"}`, children: tierMessage.message }, void 0, false, {
            fileName: "/home/ian/projects/reboot/src/components/EnhancedPricingCards.tsx",
            lineNumber: 310,
            columnNumber: 11
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("ul", { className: `${service.popular ? "space-y-2 mb-6" : "space-y-1.5 mb-4"} text-left ${service.popular ? "flex-1" : ""}`, children: service.features.map((feature, idx) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { className: `${service.popular ? "text-sm" : "text-xs"} flex items-start ${service.color === "orange" || service.color === "blue" ? "text-white/90" : "replace-text-slate-700"}`, children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "mr-2 flex-shrink-0", children: feature.split(" ")[0] }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/components/EnhancedPricingCards.tsx",
              lineNumber: 325,
              columnNumber: 15
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: feature.split(" ").slice(1).join(" ") }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/components/EnhancedPricingCards.tsx",
              lineNumber: 326,
              columnNumber: 15
            }, void 0)
          ] }, idx, true, {
            fileName: "/home/ian/projects/reboot/src/components/EnhancedPricingCards.tsx",
            lineNumber: 322,
            columnNumber: 13
          }, void 0)) }, void 0, false, {
            fileName: "/home/ian/projects/reboot/src/components/EnhancedPricingCards.tsx",
            lineNumber: 320,
            columnNumber: 9
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "button",
            {
              onClick: () => {
                onCTAClick(service.title);
                onEngagement("cta_click", service.title);
              },
              onMouseEnter: () => onEngagement("cta_hover", service.title),
              className: `w-full py-3 rounded-xl font-bold transition-all duration-300 ${service.color === "orange" ? "bg-white text-orange-accessible hover:bg-orange-50 focus-visible:bg-orange-50" : service.color === "blue" ? "bg-white text-blue-700 hover:bg-blue-50 focus-visible:bg-blue-50" : leadTier === "Hot" ? "bg-red-600 text-white hover:bg-red-700 focus-visible:bg-red-700 animate-pulse" : "bg-blue-900 text-white hover:bg-blue-800 focus-visible:bg-blue-800"}`,
              children: getCTAText()
            },
            void 0,
            false,
            {
              fileName: "/home/ian/projects/reboot/src/components/EnhancedPricingCards.tsx",
              lineNumber: 332,
              columnNumber: 9
            },
            void 0
          ),
          tierMessage?.urgency && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-3 text-center text-xs", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: `font-bold ${service.color === "orange" || service.color === "blue" ? "text-yellow-200" : "text-orange-accessible"}`, children: [
            "⚡ ",
            tierMessage.urgency
          ] }, void 0, true, {
            fileName: "/home/ian/projects/reboot/src/components/EnhancedPricingCards.tsx",
            lineNumber: 354,
            columnNumber: 13
          }, void 0) }, void 0, false, {
            fileName: "/home/ian/projects/reboot/src/components/EnhancedPricingCards.tsx",
            lineNumber: 353,
            columnNumber: 11
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: `mt-4 text-center text-xs ${service.color === "orange" || service.color === "blue" ? "text-white/70" : "replace-text-gray-500"}`, children: "90-day improvement guarantee" }, void 0, false, {
            fileName: "/home/ian/projects/reboot/src/components/EnhancedPricingCards.tsx",
            lineNumber: 363,
            columnNumber: 9
          }, void 0)
        ] }, void 0, true, {
          fileName: "/home/ian/projects/reboot/src/components/EnhancedPricingCards.tsx",
          lineNumber: 219,
          columnNumber: 7
        }, void 0)
      ]
    },
    void 0,
    true,
    {
      fileName: "/home/ian/projects/reboot/src/components/EnhancedPricingCards.tsx",
      lineNumber: 182,
      columnNumber: 5
    },
    void 0
  );
};
const EnhancedPricingCards = () => {
  const swiperRef = reactExports.useRef(null);
  const { leadScore, trackInteraction } = useConversionOptimization();
  const {
    pricingStyle,
    shouldShowSavings,
    shouldEmphasizeValue,
    trackEngagement
  } = usePricingOptimization();
  const { trackClick } = useCTAOptimization();
  const { setShowDropdownForm } = useLeadForm();
  reactExports.useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      if (swiperRef.current && newWidth < 1024) {
        setTimeout(() => {
          swiperRef.current?.slideTo(1, 300);
        }, 100);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  reactExports.useEffect(() => {
    trackInteraction({
      type: "scroll",
      element: "pricing_section",
      metadata: {
        pricingStyle,
        leadTier: leadScore?.tier || "Unqualified",
        shouldShowSavings,
        shouldEmphasizeValue
      }
    });
  }, [trackInteraction, pricingStyle, leadScore, shouldShowSavings, shouldEmphasizeValue]);
  const handleEngagement = (action, plan) => {
    trackEngagement(action, plan);
    trackInteraction({
      type: "click",
      element: `pricing_${action}`,
      value: plan,
      metadata: {
        pricingStyle,
        leadTier: leadScore?.tier || "Unqualified",
        action,
        plan
      }
    });
  };
  const handleCTAClick = (plan) => {
    handleEngagement("get_started", plan);
    trackClick("pricing_cards");
    setShowDropdownForm(true);
    trackInteraction({
      type: "click",
      element: "pricing_cta",
      value: plan,
      metadata: {
        source: "pricing_cards",
        plan,
        leadTier: leadScore?.tier || "Unqualified"
      }
    });
  };
  const getSectionTitle = () => {
    switch (leadScore?.tier) {
      case "Hot":
        return {
          title: "Choose Your Growth Acceleration Plan",
          subtitle: "Priority onboarding available for qualified companies"
        };
      case "Warm":
        return {
          title: "Investment Options for Strategic Growth",
          subtitle: "Choose the engagement level that matches your growth goals"
        };
      case "Cold":
        return {
          title: "Flexible Marketing Leadership Options",
          subtitle: "Start with what works best for your current situation"
        };
      default:
        return {
          title: "Fractional CMO Services",
          subtitle: "Choose the right level of strategic marketing support"
        };
    }
  };
  const sectionContent = getSectionTitle();
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { className: "py-16", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center mb-12", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "text-3xl md:text-4xl font-black replace-text-slate-900 mb-4", children: sectionContent.title }, void 0, false, {
        fileName: "/home/ian/projects/reboot/src/components/EnhancedPricingCards.tsx",
        lineNumber: 483,
        columnNumber: 9
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-lg replace-text-gray-600 mb-8", children: sectionContent.subtitle }, void 0, false, {
        fileName: "/home/ian/projects/reboot/src/components/EnhancedPricingCards.tsx",
        lineNumber: 486,
        columnNumber: 9
      }, void 0),
      leadScore?.tier === "Hot" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "inline-flex items-center bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-full px-6 py-2 mb-6", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "w-3 h-3 bg-red-500 rounded-full mr-3 animate-pulse" }, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/components/EnhancedPricingCards.tsx",
          lineNumber: 493,
          columnNumber: 13
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-red-800 font-bold text-sm", children: "High-Priority Lead - Priority Response Guaranteed" }, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/components/EnhancedPricingCards.tsx",
          lineNumber: 494,
          columnNumber: 13
        }, void 0)
      ] }, void 0, true, {
        fileName: "/home/ian/projects/reboot/src/components/EnhancedPricingCards.tsx",
        lineNumber: 492,
        columnNumber: 11
      }, void 0),
      pricingStyle === "value_first" && shouldEmphasizeValue && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 max-w-2xl mx-auto", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-lg font-bold text-blue-900 mb-2", children: "ROI-Focused Investment" }, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/components/EnhancedPricingCards.tsx",
          lineNumber: 503,
          columnNumber: 13
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-blue-700", children: "Our clients typically see 3-10x ROI on their fractional CMO investment. Compare that to a full-time CMO at $200K+ with no guarantee of results." }, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/components/EnhancedPricingCards.tsx",
          lineNumber: 506,
          columnNumber: 13
        }, void 0)
      ] }, void 0, true, {
        fileName: "/home/ian/projects/reboot/src/components/EnhancedPricingCards.tsx",
        lineNumber: 502,
        columnNumber: 11
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/ian/projects/reboot/src/components/EnhancedPricingCards.tsx",
      lineNumber: 482,
      columnNumber: 7
    }, void 0),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      Swiper,
      {
        onSwiper: (swiper) => {
          swiperRef.current = swiper;
        },
        spaceBetween: 24,
        slidesPerView: "auto",
        centeredSlides: true,
        initialSlide: 1,
        breakpoints: {
          // Fully fluid breakpoints
          320: {
            slidesPerView: 1.1,
            spaceBetween: 16,
            centeredSlides: true
          },
          480: {
            slidesPerView: 1.3,
            spaceBetween: 20,
            centeredSlides: true
          },
          640: {
            slidesPerView: 1.6,
            spaceBetween: 24,
            centeredSlides: true
          },
          768: {
            slidesPerView: 2.2,
            spaceBetween: 24,
            centeredSlides: true
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 24,
            centeredSlides: false
          },
          1280: {
            slidesPerView: 3,
            spaceBetween: 32,
            centeredSlides: false
          }
        },
        className: "!py-12",
        onSlideChange: (swiper) => {
          trackInteraction({
            type: "click",
            element: "pricing_carousel",
            value: swiper.activeIndex,
            metadata: { direction: "slide_change" }
          });
        },
        children: services.map((service, index) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          SwiperSlide,
          {
            className: "!flex !items-stretch !h-auto !pb-4",
            children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              PricingCard,
              {
                service,
                leadTier: leadScore?.tier || "Unqualified",
                pricingStyle,
                shouldShowSavings,
                shouldEmphasizeValue,
                onEngagement: handleEngagement,
                onCTAClick: handleCTAClick
              },
              void 0,
              false,
              {
                fileName: "/home/ian/projects/reboot/src/components/EnhancedPricingCards.tsx",
                lineNumber: 571,
                columnNumber: 13
              },
              void 0
            )
          },
          index,
          false,
          {
            fileName: "/home/ian/projects/reboot/src/components/EnhancedPricingCards.tsx",
            lineNumber: 567,
            columnNumber: 11
          },
          void 0
        ))
      },
      void 0,
      false,
      {
        fileName: "/home/ian/projects/reboot/src/components/EnhancedPricingCards.tsx",
        lineNumber: 515,
        columnNumber: 7
      },
      void 0
    ),
    leadScore?.tier === "Hot" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center mt-12", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-2xl p-6 max-w-lg mx-auto", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-xl font-black text-red-900 mb-3", children: "🔥 High-Priority Lead Detected" }, void 0, false, {
        fileName: "/home/ian/projects/reboot/src/components/EnhancedPricingCards.tsx",
        lineNumber: 588,
        columnNumber: 13
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-red-700 mb-4", children: "Based on your profile, you qualify for our priority onboarding program. We'll have a custom strategy ready within 24 hours." }, void 0, false, {
        fileName: "/home/ian/projects/reboot/src/components/EnhancedPricingCards.tsx",
        lineNumber: 591,
        columnNumber: 13
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "button",
        {
          onClick: () => handleCTAClick("Priority"),
          className: "bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 focus-visible:from-red-600 hover:to-orange-600 focus-visible:to-orange-600 text-white px-8 py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 focus-visible:scale-105 shadow-xl animate-pulse",
          children: "Claim Priority Onboarding →"
        },
        void 0,
        false,
        {
          fileName: "/home/ian/projects/reboot/src/components/EnhancedPricingCards.tsx",
          lineNumber: 595,
          columnNumber: 13
        },
        void 0
      )
    ] }, void 0, true, {
      fileName: "/home/ian/projects/reboot/src/components/EnhancedPricingCards.tsx",
      lineNumber: 587,
      columnNumber: 11
    }, void 0) }, void 0, false, {
      fileName: "/home/ian/projects/reboot/src/components/EnhancedPricingCards.tsx",
      lineNumber: 586,
      columnNumber: 9
    }, void 0),
    (leadScore?.tier === "Warm" || leadScore?.tier === "Cold") && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center mt-12", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-gray-50 rounded-xl p-6 max-w-2xl mx-auto", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "replace-text-gray-700 font-medium mb-2", children: '"We saw a 340% increase in qualified leads within 90 days"' }, void 0, false, {
        fileName: "/home/ian/projects/reboot/src/components/EnhancedPricingCards.tsx",
        lineNumber: 609,
        columnNumber: 13
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm replace-text-gray-600", children: "- Sarah Chen, CEO of TechScale (Similar company size and industry)" }, void 0, false, {
        fileName: "/home/ian/projects/reboot/src/components/EnhancedPricingCards.tsx",
        lineNumber: 612,
        columnNumber: 13
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex justify-center mt-4", children: [1, 2, 3, 4, 5].map((star) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("svg", { className: "w-5 h-5 text-yellow-400", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" }, void 0, false, {
        fileName: "/home/ian/projects/reboot/src/components/EnhancedPricingCards.tsx",
        lineNumber: 618,
        columnNumber: 19
      }, void 0) }, star, false, {
        fileName: "/home/ian/projects/reboot/src/components/EnhancedPricingCards.tsx",
        lineNumber: 617,
        columnNumber: 17
      }, void 0)) }, void 0, false, {
        fileName: "/home/ian/projects/reboot/src/components/EnhancedPricingCards.tsx",
        lineNumber: 615,
        columnNumber: 13
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/ian/projects/reboot/src/components/EnhancedPricingCards.tsx",
      lineNumber: 608,
      columnNumber: 11
    }, void 0) }, void 0, false, {
      fileName: "/home/ian/projects/reboot/src/components/EnhancedPricingCards.tsx",
      lineNumber: 607,
      columnNumber: 9
    }, void 0)
  ] }, void 0, true, {
    fileName: "/home/ian/projects/reboot/src/components/EnhancedPricingCards.tsx",
    lineNumber: 480,
    columnNumber: 5
  }, void 0);
};
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
  const [formStep, setFormStep] = reactExports.useState(1);
  const [formData, setFormData] = reactExports.useState({
    email: "",
    challenge: "",
    revenue: "",
    name: "",
    company: "",
    timeline: "",
    website: "",
    specificIssue: "",
    industry: "",
    teamSize: "",
    currentMarketing: ""
  });
  const [fieldValidation, setFieldValidation] = reactExports.useState({});
  const [selectedOptions, setSelectedOptions] = reactExports.useState({});
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const [submitError, setSubmitError] = reactExports.useState("");
  const [isProgressive, setIsProgressive] = reactExports.useState(false);
  const [leadScorePrediction, setLeadScorePrediction] = reactExports.useState(0);
  const formStartTime = reactExports.useRef(null);
  const fieldFocusTimes = reactExports.useRef({});
  reactExports.useEffect(() => {
    setIsProgressive(formStyle === "progressive");
  }, [formStyle]);
  reactExports.useEffect(() => {
    const calculatePredictedScore = () => {
      let score = 30;
      const revenueScores = {
        "10m+": 40,
        "3m-10m": 32,
        "1m-3m": 24,
        "500k-1m": 16
      };
      score += revenueScores[formData.revenue] || 0;
      const industryBonus = {
        "software": 15,
        "financial": 12,
        "healthcare": 10,
        "ecommerce": 8
      };
      score += industryBonus[formData.industry] || 0;
      const timelineBonus = {
        "asap": 15,
        "1-3months": 10,
        "3-6months": 5
      };
      score += timelineBonus[formData.timeline] || 0;
      const completedFields = Object.values(formData).filter(Boolean).length;
      score += Math.min(20, completedFields / 11 * 20);
      setLeadScorePrediction(Math.min(100, score));
    };
    calculatePredictedScore();
  }, [formData]);
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  const handleFieldFocus = (field) => {
    fieldFocusTimes.current[field] = /* @__PURE__ */ new Date();
    if (!formStartTime.current) {
      formStartTime.current = /* @__PURE__ */ new Date();
      trackFormStart();
    }
  };
  const handleFieldBlur = (field, value) => {
    const focusTime = fieldFocusTimes.current[field];
    if (focusTime) {
      const timeSpent = Date.now() - focusTime.getTime();
      trackInteraction({
        type: "form_focus",
        element: field,
        value: timeSpent,
        metadata: { fieldValue: value.length, timeSpent }
      });
    }
    if (field === "website" && value) {
      const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
      setFieldValidation({
        ...fieldValidation,
        [field]: urlPattern.test(value) ? "valid" : "invalid"
      });
    }
    if (field === "email" && value) {
      setFieldValidation({
        ...fieldValidation,
        [field]: validateEmail(value) ? "valid" : "invalid"
      });
    }
  };
  const handleStepChange = (newStep) => {
    trackFormStep(newStep, Object.values(formData).filter(Boolean).length);
    setFormStep(newStep);
  };
  const handleCheckboxChange = (option) => {
    setSelectedOptions({
      ...selectedOptions,
      [option]: !selectedOptions[option]
    });
  };
  const submitFormToServer = async (formData2) => {
    const apiUrl = "http://localhost:3002/api/forms/lead";
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...formData2,
        formStyle,
        leadScorePrediction,
        selectedOptions,
        sessionData: {
          formStartTime: formStartTime.current,
          completionTime: Date.now() - (formStartTime.current?.getTime() || Date.now())
        }
      })
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Form submission failed");
    }
    return await response.json();
  };
  if (!showDropdownForm) return null;
  const getPersonalizedContent = () => {
    const tier = leadScorePrediction >= 80 ? "Hot" : leadScorePrediction >= 60 ? "Warm" : leadScorePrediction >= 40 ? "Cold" : "Unqualified";
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
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "div",
    {
      className: "fixed inset-0 z-[60] flex items-start justify-center pt-4 md:pt-10 px-4",
      style: {
        // Consistent modal backdrop across browsers
        background: "rgba(0, 0, 0, 0.65)",
        backdropFilter: "blur(6px) saturate(120%)",
        WebkitBackdropFilter: "blur(6px) saturate(120%)"
      },
      children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-white rounded-3xl shadow-2xl max-w-2xl w-full flex flex-col relative", style: { maxHeight: "92vh" }, children: [
        leadScorePrediction >= 80 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-1 rounded-full text-xs font-bold motion-safe:animate-pulse motion-reduce:animate-none", children: "🔥 HIGH-PRIORITY LEAD" }, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
          lineNumber: 248,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute top-4 right-4 z-10", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "button",
          {
            onClick: () => {
              if (formStartTime.current) {
                Date.now() - formStartTime.current.getTime();
                trackAbandonment(formStep, "close_button");
              }
              setShowDropdownForm(false);
              setFormStep(1);
              setFormData({
                email: "",
                challenge: "",
                revenue: "",
                name: "",
                company: "",
                timeline: "",
                website: "",
                specificIssue: "",
                industry: "",
                teamSize: "",
                currentMarketing: ""
              });
            },
            className: "w-10 h-10 rounded-full bg-white/90 hover:bg-white focus-visible:bg-white shadow-lg flex items-center justify-center motion-safe:transition-all motion-reduce:transition-none",
            children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("svg", { className: "w-6 h-6 replace-text-gray-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M6 18L18 6M6 6l12 12" }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
              lineNumber: 272,
              columnNumber: 15
            }, void 0) }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
              lineNumber: 271,
              columnNumber: 13
            }, void 0)
          },
          void 0,
          false,
          {
            fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
            lineNumber: 255,
            columnNumber: 11
          },
          void 0
        ) }, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
          lineNumber: 254,
          columnNumber: 9
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-4 md:p-6 overflow-y-auto", style: { scrollbarWidth: "thin", scrollbarColor: "#CBD5E0 transparent" }, children: [
          formStep === 1 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center", "aria-current": "step", "aria-label": "Step 1 of form", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-2xl font-black replace-text-slate-900 mb-4", children: personalizedContent.title }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
              lineNumber: 282,
              columnNumber: 15
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "replace-text-gray-600 mb-4", children: personalizedContent.subtitle }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
              lineNumber: 285,
              columnNumber: 15
            }, void 0),
            shouldShowUrgency() && personalizedContent.urgency && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-orange-50 border border-orange-200 rounded-lg p-3 mb-6", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-orange-800 text-sm font-medium", children: personalizedContent.urgency }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
              lineNumber: 290,
              columnNumber: 19
            }, void 0) }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
              lineNumber: 289,
              columnNumber: 17
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "replace-text-gray-600 mb-8", children: "87% of growth-stage companies struggle with these marketing challenges:" }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
              lineNumber: 296,
              columnNumber: 15
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-3 mb-8", children: [
              { key: "notWorking", label: "Marketing isn't working", desc: "Spending money but not seeing results" },
              { key: "plateau", label: "Hit a growth plateau", desc: "What worked before isn't working anymore" },
              { key: "competition", label: "Losing to competition", desc: "Competitors growing while you're stuck" },
              { key: "clarity", label: "No clear strategy", desc: "Trying everything but nothing sticks" }
            ].map((option) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "flex items-start text-left p-4 bg-gray-50 rounded-xl hover:bg-gray-100 focus-visible:bg-gray-100 cursor-pointer transition-colors", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "input",
                {
                  type: "checkbox",
                  className: "mt-1 mr-3 w-5 h-5",
                  checked: selectedOptions[option.key] || false,
                  onChange: () => {
                    handleCheckboxChange(option.key);
                    trackInteraction({
                      type: "click",
                      element: `pain_point_${option.key}`,
                      value: !selectedOptions[option.key] ? "selected" : "unselected"
                    });
                  }
                },
                void 0,
                false,
                {
                  fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                  lineNumber: 308,
                  columnNumber: 21
                },
                void 0
              ),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "replace-text-gray-700", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { children: option.label }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                  lineNumber: 322,
                  columnNumber: 23
                }, void 0),
                " - ",
                option.desc
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                lineNumber: 321,
                columnNumber: 21
              }, void 0)
            ] }, option.key, true, {
              fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
              lineNumber: 307,
              columnNumber: 19
            }, void 0)) }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
              lineNumber: 300,
              columnNumber: 15
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "button",
              {
                onClick: () => {
                  handleStepChange(2);
                  trackClick("pain_acknowledgment");
                },
                className: "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 focus-visible:from-orange-600 hover:to-orange-700 focus-visible:to-orange-700 text-white px-8 py-4 rounded-xl font-bold text-lg motion-safe:transition-all motion-reduce:transition-none motion-safe:duration-300 motion-reduce:duration-0 motion-safe:transform motion-safe:hover:scale-105 motion-reduce:transform-none motion-safe:focus-visible:scale-105 motion-reduce:transform-none shadow-xl",
                children: [
                  ctaText || "Yes, I Need Help With This",
                  " →"
                ]
              },
              void 0,
              true,
              {
                fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                lineNumber: 328,
                columnNumber: 15
              },
              void 0
            ),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "replace-text-gray-500 text-sm mt-6", children: "Takes 60 seconds • No sales pressure • Get real solutions" }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
              lineNumber: 338,
              columnNumber: 15
            }, void 0)
          ] }, void 0, true, {
            fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
            lineNumber: 281,
            columnNumber: 13
          }, void 0),
          formStep === 2 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { "aria-current": "step", "aria-label": "Step 2 of form", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "button",
              {
                onClick: () => handleStepChange(1),
                className: "replace-text-gray-500 hover:replace-text-gray-700 focus-visible:replace-text-gray-700 mb-4 flex items-center transition-colors",
                children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("svg", { className: "w-4 h-4 mr-1", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M15 19l-7-7 7-7" }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                    lineNumber: 352,
                    columnNumber: 19
                  }, void 0) }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                    lineNumber: 351,
                    columnNumber: 17
                  }, void 0),
                  "Back"
                ]
              },
              void 0,
              true,
              {
                fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                lineNumber: 347,
                columnNumber: 15
              },
              void 0
            ),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-white rounded-2xl p-6 max-w-lg mx-auto shadow-2xl", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-2xl font-black replace-text-slate-900 mb-4", children: [
                "Perfect! Let's ",
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-orange-500", children: "Identify" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                  lineNumber: 359,
                  columnNumber: 34
                }, void 0),
                " Your Growth Stage"
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                lineNumber: 358,
                columnNumber: 17
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "replace-text-gray-600 mb-6", children: "Different revenue levels need different strategic approaches" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                lineNumber: 361,
                columnNumber: 17
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-center mb-8", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold", children: "✓" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                  lineNumber: 368,
                  columnNumber: 21
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-20 h-1 bg-orange-500" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                  lineNumber: 371,
                  columnNumber: 21
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold", children: "2" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                  lineNumber: 372,
                  columnNumber: 21
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-20 h-1 bg-gray-300" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                  lineNumber: 375,
                  columnNumber: 21
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center replace-text-gray-500 font-bold", children: "3" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                  lineNumber: 376,
                  columnNumber: 21
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                lineNumber: 367,
                columnNumber: 19
              }, void 0) }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                lineNumber: 366,
                columnNumber: 17
              }, void 0),
              leadScorePrediction > 40 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4 mb-6", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-sm font-medium text-green-800", children: "Lead Score Prediction" }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                    lineNumber: 386,
                    columnNumber: 23
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-2xl font-bold text-green-700", children: [
                    leadScorePrediction,
                    "/100"
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                    lineNumber: 387,
                    columnNumber: 23
                  }, void 0)
                ] }, void 0, true, {
                  fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                  lineNumber: 385,
                  columnNumber: 21
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-full bg-green-200 rounded-full h-2 mt-2", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "div",
                  {
                    className: "bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full motion-safe:transition-all motion-reduce:transition-none motion-safe:duration-500 motion-reduce:duration-0",
                    style: { width: `${leadScorePrediction}%` }
                  },
                  void 0,
                  false,
                  {
                    fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                    lineNumber: 390,
                    columnNumber: 23
                  },
                  void 0
                ) }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                  lineNumber: 389,
                  columnNumber: 21
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                lineNumber: 384,
                columnNumber: 19
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-8", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "font-bold replace-text-gray-900 mb-4", children: "Step 2: Your Revenue Stage" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                  lineNumber: 399,
                  columnNumber: 19
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm replace-text-gray-600 mb-4", children: "What's your current annual revenue?" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                  lineNumber: 400,
                  columnNumber: 19
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-3", children: [
                  { value: "500k-1m", label: "$500K - $1M", desc: "Growing but hitting walls", score: 16 },
                  { value: "1m-3m", label: "$1M - $3M", desc: "Scaling but inconsistent", score: 24 },
                  { value: "3m-10m", label: "$3M - $10M", desc: "Need systematic growth", score: 32 },
                  { value: "10m+", label: "$10M+", desc: "Ready for transformation", score: 40 }
                ].map((option) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "block", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                    "input",
                    {
                      type: "radio",
                      name: "revenue",
                      value: option.value,
                      onChange: (e) => {
                        setFormData({ ...formData, revenue: e.target.value });
                        trackInteraction({
                          type: "click",
                          element: "revenue_selection",
                          value: e.target.value,
                          metadata: { predictedScore: option.score }
                        });
                      },
                      onFocus: () => handleFieldFocus("revenue"),
                      className: "mr-3 w-4 h-4"
                    },
                    void 0,
                    false,
                    {
                      fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                      lineNumber: 410,
                      columnNumber: 25
                    },
                    void 0
                  ),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "replace-text-gray-700", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { children: option.label }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                      lineNumber: 427,
                      columnNumber: 27
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("br", {}, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                      lineNumber: 427,
                      columnNumber: 58
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-sm replace-text-gray-500 ml-7", children: option.desc }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                      lineNumber: 428,
                      columnNumber: 27
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                    lineNumber: 426,
                    columnNumber: 25
                  }, void 0)
                ] }, option.value, true, {
                  fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                  lineNumber: 409,
                  columnNumber: 23
                }, void 0)) }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                  lineNumber: 402,
                  columnNumber: 19
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                lineNumber: 398,
                columnNumber: 17
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "button",
                {
                  onClick: () => {
                    if (formData.revenue) {
                      handleStepChange(isProgressive ? 3 : 3);
                    } else {
                      setSubmitError("Please select your revenue range");
                      return;
                    }
                  },
                  disabled: !formData.revenue,
                  className: `w-full py-4 rounded-xl font-bold text-lg motion-safe:transition-all motion-reduce:transition-none motion-safe:duration-300 motion-reduce:duration-0 motion-safe:transform motion-safe:hover:scale-105 motion-reduce:transform-none motion-safe:focus-visible:scale-105 motion-reduce:transform-none shadow-xl ${formData.revenue ? "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 focus-visible:from-orange-600 hover:to-orange-700 focus-visible:to-orange-700 text-white" : "bg-gray-300 replace-text-gray-500 cursor-not-allowed"}`,
                  children: [
                    "Continue to ",
                    isProgressive ? "Contact Info" : "Final Step",
                    " →"
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                  lineNumber: 435,
                  columnNumber: 17
                },
                void 0
              )
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
              lineNumber: 357,
              columnNumber: 15
            }, void 0)
          ] }, void 0, true, {
            fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
            lineNumber: 346,
            columnNumber: 13
          }, void 0),
          formStep === 3 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { "aria-current": "step", "aria-label": "Step 3 of form", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "button",
              {
                onClick: () => handleStepChange(2),
                className: "replace-text-gray-500 hover:replace-text-gray-700 focus-visible:replace-text-gray-700 mb-4 flex items-center transition-colors",
                children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("svg", { className: "w-4 h-4 mr-1", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M15 19l-7-7 7-7" }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                    lineNumber: 465,
                    columnNumber: 19
                  }, void 0) }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                    lineNumber: 464,
                    columnNumber: 17
                  }, void 0),
                  "Back"
                ]
              },
              void 0,
              true,
              {
                fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                lineNumber: 460,
                columnNumber: 15
              },
              void 0
            ),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "max-w-2xl mx-auto", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-2xl font-black replace-text-slate-900 mb-4 text-center", children: [
                "Perfect! Let's Get Your ",
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-orange-500", children: "Free Analysis" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                  lineNumber: 472,
                  columnNumber: 43
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                lineNumber: 471,
                columnNumber: 17
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "replace-text-gray-600 mb-8 text-center", children: getRecommendedNextAction() }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                lineNumber: 474,
                columnNumber: 17
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-center mb-8", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold", children: "✓" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                  lineNumber: 481,
                  columnNumber: 21
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-20 h-1 bg-green-500" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                  lineNumber: 482,
                  columnNumber: 21
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold", children: "✓" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                  lineNumber: 483,
                  columnNumber: 21
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-20 h-1 bg-orange-500" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                  lineNumber: 484,
                  columnNumber: 21
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold", children: "3" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                  lineNumber: 485,
                  columnNumber: 21
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                lineNumber: 480,
                columnNumber: 19
              }, void 0) }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                lineNumber: 479,
                columnNumber: 17
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4 mb-6", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between mb-2", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-sm font-medium text-blue-800", children: "Your Lead Quality Score" }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                    lineNumber: 492,
                    columnNumber: 21
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-2xl font-bold text-blue-700", children: [
                    leadScorePrediction,
                    "/100"
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                    lineNumber: 493,
                    columnNumber: 21
                  }, void 0)
                ] }, void 0, true, {
                  fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                  lineNumber: 491,
                  columnNumber: 19
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-full bg-blue-200 rounded-full h-3", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "div",
                  {
                    className: "bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full motion-safe:transition-all motion-reduce:transition-none motion-safe:duration-500 motion-reduce:duration-0",
                    style: { width: `${leadScorePrediction}%` }
                  },
                  void 0,
                  false,
                  {
                    fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                    lineNumber: 496,
                    columnNumber: 21
                  },
                  void 0
                ) }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                  lineNumber: 495,
                  columnNumber: 19
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xs text-blue-accessible mt-2", children: leadScorePrediction >= 80 ? "🔥 High Priority - Immediate Response" : leadScorePrediction >= 60 ? "⚡ Priority Response Within 4 Hours" : leadScorePrediction >= 40 ? "📈 Added to Growth Program" : "📚 Educational Resources Recommended" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                  lineNumber: 501,
                  columnNumber: 19
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                lineNumber: 490,
                columnNumber: 17
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-white/60 dark:bg-slate-700/60 backdrop-blur-fallback-sm transparency-normalized rounded-xl p-4 border border-white/30 dark:border-slate-600/30", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "font-bold text-blue-900 mb-3 flex items-center", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs mr-2", children: "1" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                      lineNumber: 514,
                      columnNumber: 23
                    }, void 0),
                    "Contact Information"
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                    lineNumber: 513,
                    columnNumber: 21
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid md:grid-cols-2 gap-3", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "block text-xs font-bold replace-text-slate-700 mb-2", children: "Your Name *" }, void 0, false, {
                        fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                        lineNumber: 519,
                        columnNumber: 25
                      }, void 0),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                        "input",
                        {
                          type: "text",
                          value: formData.name,
                          onChange: (e) => setFormData({ ...formData, name: e.target.value }),
                          onFocus: () => handleFieldFocus("name"),
                          onBlur: (e) => handleFieldBlur("name", e.target.value),
                          className: "w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 motion-safe:transition-all motion-reduce:transition-none motion-safe:duration-300 motion-reduce:duration-0 text-sm",
                          placeholder: "John Smith"
                        },
                        void 0,
                        false,
                        {
                          fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                          lineNumber: 520,
                          columnNumber: 25
                        },
                        void 0
                      )
                    ] }, void 0, true, {
                      fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                      lineNumber: 518,
                      columnNumber: 23
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "block text-xs font-bold replace-text-slate-700 mb-2", children: "Company Name *" }, void 0, false, {
                        fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                        lineNumber: 531,
                        columnNumber: 25
                      }, void 0),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                        "input",
                        {
                          type: "text",
                          value: formData.company,
                          onChange: (e) => setFormData({ ...formData, company: e.target.value }),
                          onFocus: () => handleFieldFocus("company"),
                          onBlur: (e) => handleFieldBlur("company", e.target.value),
                          className: "w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 motion-safe:transition-all motion-reduce:transition-none motion-safe:duration-300 motion-reduce:duration-0 text-sm",
                          placeholder: "Acme Corp"
                        },
                        void 0,
                        false,
                        {
                          fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                          lineNumber: 532,
                          columnNumber: 25
                        },
                        void 0
                      )
                    ] }, void 0, true, {
                      fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                      lineNumber: 530,
                      columnNumber: 23
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                    lineNumber: 517,
                    columnNumber: 21
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "block text-xs font-bold replace-text-slate-700 mb-2", children: "Business Email *" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                      lineNumber: 544,
                      columnNumber: 23
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                      "input",
                      {
                        type: "email",
                        value: formData.email,
                        onChange: (e) => setFormData({ ...formData, email: e.target.value }),
                        onFocus: () => handleFieldFocus("email"),
                        onBlur: (e) => handleFieldBlur("email", e.target.value),
                        className: `w-full px-3 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 motion-safe:transition-all motion-reduce:transition-none motion-safe:duration-300 motion-reduce:duration-0 text-sm ${fieldValidation.email === "valid" ? "border-green-500" : fieldValidation.email === "invalid" ? "border-red-500" : "border-gray-200"}`,
                        placeholder: "your@company.com"
                      },
                      void 0,
                      false,
                      {
                        fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                        lineNumber: 545,
                        columnNumber: 23
                      },
                      void 0
                    ),
                    fieldValidation.email === "valid" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xs text-green-600 mt-1", children: "✓ Valid email format" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                      lineNumber: 558,
                      columnNumber: 25
                    }, void 0),
                    fieldValidation.email === "invalid" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xs text-red-600 mt-1", children: "Please enter a valid email address" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                      lineNumber: 561,
                      columnNumber: 25
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                    lineNumber: 543,
                    columnNumber: 21
                  }, void 0)
                ] }, void 0, true, {
                  fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                  lineNumber: 512,
                  columnNumber: 19
                }, void 0),
                isProgressive && formData.name && formData.email && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { "aria-live": "assertive", "aria-atomic": "true", className: "sr-only", id: "form-error-announcer", children: submitError && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: submitError }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                    lineNumber: 571,
                    columnNumber: 21
                  }, void 0) }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                    lineNumber: 570,
                    columnNumber: 3
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { "aria-live": "polite", "aria-atomic": "true", className: "sr-only", id: "form-status-announcer", children: isSubmitting && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: "Form is being submitted, please wait..." }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                    lineNumber: 574,
                    columnNumber: 22
                  }, void 0) }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                    lineNumber: 573,
                    columnNumber: 3
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-white/60 dark:bg-slate-700/60 backdrop-blur-fallback-sm transparency-normalized rounded-xl p-4 border border-white/30 dark:border-slate-600/30", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "font-bold text-green-900 mb-3 flex items-center", children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs mr-2", children: "2" }, void 0, false, {
                        fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                        lineNumber: 580,
                        columnNumber: 27
                      }, void 0),
                      "Business Details"
                    ] }, void 0, true, {
                      fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                      lineNumber: 579,
                      columnNumber: 25
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-3", children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "block text-xs font-bold replace-text-slate-700 mb-2", children: "Website URL" }, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                          lineNumber: 585,
                          columnNumber: 29
                        }, void 0),
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                          "input",
                          {
                            type: "url",
                            value: formData.website,
                            onChange: (e) => setFormData({ ...formData, website: e.target.value }),
                            onFocus: () => handleFieldFocus("website"),
                            onBlur: (e) => handleFieldBlur("website", e.target.value),
                            className: `w-full px-3 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 motion-safe:transition-all motion-reduce:transition-none motion-safe:duration-300 motion-reduce:duration-0 text-sm ${fieldValidation.website === "valid" ? "border-green-500" : fieldValidation.website === "invalid" ? "border-red-500" : "border-gray-200"}`,
                            placeholder: "https://yourcompany.com"
                          },
                          void 0,
                          false,
                          {
                            fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                            lineNumber: 586,
                            columnNumber: 29
                          },
                          void 0
                        )
                      ] }, void 0, true, {
                        fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                        lineNumber: 584,
                        columnNumber: 27
                      }, void 0),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-2 gap-3", children: [
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "block text-xs font-bold replace-text-slate-700 mb-2", children: "Industry" }, void 0, false, {
                            fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                            lineNumber: 601,
                            columnNumber: 31
                          }, void 0),
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                            "select",
                            {
                              value: formData.industry,
                              onChange: (e) => {
                                setFormData({ ...formData, industry: e.target.value });
                                trackInteraction({
                                  type: "click",
                                  element: "industry_select",
                                  value: e.target.value
                                });
                              },
                              onFocus: () => handleFieldFocus("industry"),
                              className: "w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 motion-safe:transition-all motion-reduce:transition-none motion-safe:duration-300 motion-reduce:duration-0 text-sm",
                              children: [
                                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "", children: "Select industry" }, void 0, false, {
                                  fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                                  lineNumber: 615,
                                  columnNumber: 33
                                }, void 0),
                                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "software", children: "Software/SaaS" }, void 0, false, {
                                  fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                                  lineNumber: 616,
                                  columnNumber: 33
                                }, void 0),
                                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "healthcare", children: "Healthcare" }, void 0, false, {
                                  fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                                  lineNumber: 617,
                                  columnNumber: 33
                                }, void 0),
                                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "ecommerce", children: "E-commerce" }, void 0, false, {
                                  fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                                  lineNumber: 618,
                                  columnNumber: 33
                                }, void 0),
                                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "financial", children: "Financial Services" }, void 0, false, {
                                  fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                                  lineNumber: 619,
                                  columnNumber: 33
                                }, void 0),
                                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "professional", children: "Professional Services" }, void 0, false, {
                                  fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                                  lineNumber: 620,
                                  columnNumber: 33
                                }, void 0),
                                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "manufacturing", children: "Manufacturing" }, void 0, false, {
                                  fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                                  lineNumber: 621,
                                  columnNumber: 33
                                }, void 0),
                                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "other", children: "Other" }, void 0, false, {
                                  fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                                  lineNumber: 622,
                                  columnNumber: 33
                                }, void 0)
                              ]
                            },
                            void 0,
                            true,
                            {
                              fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                              lineNumber: 602,
                              columnNumber: 31
                            },
                            void 0
                          )
                        ] }, void 0, true, {
                          fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                          lineNumber: 600,
                          columnNumber: 29
                        }, void 0),
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "block text-xs font-bold replace-text-slate-700 mb-2", children: "Team Size" }, void 0, false, {
                            fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                            lineNumber: 626,
                            columnNumber: 31
                          }, void 0),
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                            "select",
                            {
                              value: formData.teamSize,
                              onChange: (e) => {
                                setFormData({ ...formData, teamSize: e.target.value });
                                trackInteraction({
                                  type: "click",
                                  element: "team_size_select",
                                  value: e.target.value
                                });
                              },
                              onFocus: () => handleFieldFocus("teamSize"),
                              className: "w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 motion-safe:transition-all motion-reduce:transition-none motion-safe:duration-300 motion-reduce:duration-0 text-sm",
                              children: [
                                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "", children: "Select size" }, void 0, false, {
                                  fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                                  lineNumber: 640,
                                  columnNumber: 33
                                }, void 0),
                                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "1-10", children: "1-10 employees" }, void 0, false, {
                                  fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                                  lineNumber: 641,
                                  columnNumber: 33
                                }, void 0),
                                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "11-50", children: "11-50 employees" }, void 0, false, {
                                  fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                                  lineNumber: 642,
                                  columnNumber: 33
                                }, void 0),
                                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "51-200", children: "51-200 employees" }, void 0, false, {
                                  fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                                  lineNumber: 643,
                                  columnNumber: 33
                                }, void 0),
                                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "200+", children: "200+ employees" }, void 0, false, {
                                  fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                                  lineNumber: 644,
                                  columnNumber: 33
                                }, void 0)
                              ]
                            },
                            void 0,
                            true,
                            {
                              fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                              lineNumber: 627,
                              columnNumber: 31
                            },
                            void 0
                          )
                        ] }, void 0, true, {
                          fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                          lineNumber: 625,
                          columnNumber: 29
                        }, void 0)
                      ] }, void 0, true, {
                        fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                        lineNumber: 599,
                        columnNumber: 27
                      }, void 0)
                    ] }, void 0, true, {
                      fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                      lineNumber: 583,
                      columnNumber: 25
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                    lineNumber: 578,
                    columnNumber: 23
                  }, void 0),
                  formData.industry && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-white/60 dark:bg-slate-700/60 backdrop-blur-fallback-sm transparency-normalized rounded-xl p-4 border border-white/30 dark:border-slate-600/30", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "font-bold text-yellow-900 mb-3 flex items-center", children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xs mr-2", children: "3" }, void 0, false, {
                        fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                        lineNumber: 655,
                        columnNumber: 29
                      }, void 0),
                      "Your Marketing Challenge"
                    ] }, void 0, true, {
                      fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                      lineNumber: 654,
                      columnNumber: 27
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-3", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "block text-xs font-bold replace-text-slate-700 mb-2", children: "What's your biggest marketing pain right now? *" }, void 0, false, {
                        fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                        lineNumber: 660,
                        columnNumber: 31
                      }, void 0),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                        "textarea",
                        {
                          value: formData.specificIssue,
                          onChange: (e) => setFormData({ ...formData, specificIssue: e.target.value }),
                          onFocus: () => handleFieldFocus("specificIssue"),
                          onBlur: (e) => handleFieldBlur("specificIssue", e.target.value),
                          className: "w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 motion-safe:transition-all motion-reduce:transition-none motion-safe:duration-300 motion-reduce:duration-0 text-sm placeholder:text-xs",
                          placeholder: "e.g., Not getting enough leads, poor conversion rates, unclear messaging, competitors beating us, website visitors not buying...",
                          rows: 3
                        },
                        void 0,
                        false,
                        {
                          fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                          lineNumber: 661,
                          columnNumber: 31
                        },
                        void 0
                      )
                    ] }, void 0, true, {
                      fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                      lineNumber: 659,
                      columnNumber: 29
                    }, void 0) }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                      lineNumber: 658,
                      columnNumber: 27
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                    lineNumber: 653,
                    columnNumber: 25
                  }, void 0),
                  formData.specificIssue && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-white/60 dark:bg-slate-700/60 backdrop-blur-fallback-sm transparency-normalized rounded-xl p-4 border border-white/30 dark:border-slate-600/30", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "font-bold text-purple-900 mb-3 flex items-center", children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs mr-2", children: "4" }, void 0, false, {
                        fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                        lineNumber: 679,
                        columnNumber: 29
                      }, void 0),
                      "Timeline"
                    ] }, void 0, true, {
                      fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                      lineNumber: 678,
                      columnNumber: 27
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xs replace-text-gray-600 mb-3", children: "When do you need to see marketing results?" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                      lineNumber: 682,
                      columnNumber: 27
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-2 gap-2", children: [
                      { value: "asap", label: "ASAP" },
                      { value: "1-3months", label: "1-3 months" },
                      { value: "3-6months", label: "3-6 months" },
                      { value: "6months+", label: "6+ months" }
                    ].map((option) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                      "button",
                      {
                        onClick: () => {
                          setFormData({ ...formData, timeline: option.value });
                          trackInteraction({
                            type: "click",
                            element: "timeline_select",
                            value: option.value
                          });
                        },
                        className: `px-3 py-2 rounded-lg border-2 text-xs font-medium motion-safe:transition-all motion-reduce:transition-none motion-safe:duration-300 motion-reduce:duration-0 ${formData.timeline === option.value ? "border-orange-500 bg-white/60 dark:bg-slate-700/60 backdrop-blur-fallback-sm transparency-normalized text-orange-700 dark:text-orange-300" : "border-gray-200 hover:border-gray-300 focus-visible:border-gray-300"}`,
                        children: option.label
                      },
                      option.value,
                      false,
                      {
                        fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                        lineNumber: 690,
                        columnNumber: 31
                      },
                      void 0
                    )) }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                      lineNumber: 683,
                      columnNumber: 27
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                    lineNumber: 677,
                    columnNumber: 25
                  }, void 0)
                ] }, void 0, true, {
                  fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                  lineNumber: 568,
                  columnNumber: 21
                }, void 0),
                !isProgressive && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-white/60 dark:bg-slate-700/60 backdrop-blur-fallback-sm transparency-normalized rounded-xl p-4 border border-white/30 dark:border-slate-600/30", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "font-bold text-green-900 mb-3 flex items-center", children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs mr-2", children: "2" }, void 0, false, {
                        fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                        lineNumber: 721,
                        columnNumber: 27
                      }, void 0),
                      "Business Details"
                    ] }, void 0, true, {
                      fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                      lineNumber: 720,
                      columnNumber: 25
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-3", children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "block text-xs font-bold replace-text-slate-700 mb-2", children: "Website URL" }, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                          lineNumber: 727,
                          columnNumber: 29
                        }, void 0),
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                          "input",
                          {
                            type: "url",
                            value: formData.website,
                            onChange: (e) => setFormData({ ...formData, website: e.target.value }),
                            onFocus: () => handleFieldFocus("website"),
                            onBlur: (e) => handleFieldBlur("website", e.target.value),
                            className: `w-full px-3 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 motion-safe:transition-all motion-reduce:transition-none motion-safe:duration-300 motion-reduce:duration-0 text-sm ${fieldValidation.website === "valid" ? "border-green-500" : fieldValidation.website === "invalid" ? "border-red-500" : "border-gray-200"}`,
                            placeholder: "https://yourcompany.com"
                          },
                          void 0,
                          false,
                          {
                            fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                            lineNumber: 728,
                            columnNumber: 29
                          },
                          void 0
                        )
                      ] }, void 0, true, {
                        fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                        lineNumber: 726,
                        columnNumber: 27
                      }, void 0),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-2 gap-3", children: [
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "block text-xs font-bold replace-text-slate-700 mb-2", children: "Industry" }, void 0, false, {
                            fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                            lineNumber: 743,
                            columnNumber: 31
                          }, void 0),
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                            "select",
                            {
                              value: formData.industry,
                              onChange: (e) => setFormData({ ...formData, industry: e.target.value }),
                              onFocus: () => handleFieldFocus("industry"),
                              className: "w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 motion-safe:transition-all motion-reduce:transition-none motion-safe:duration-300 motion-reduce:duration-0 text-sm",
                              children: [
                                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "", children: "Select industry" }, void 0, false, {
                                  fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                                  lineNumber: 750,
                                  columnNumber: 33
                                }, void 0),
                                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "software", children: "Software/SaaS" }, void 0, false, {
                                  fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                                  lineNumber: 751,
                                  columnNumber: 33
                                }, void 0),
                                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "healthcare", children: "Healthcare" }, void 0, false, {
                                  fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                                  lineNumber: 752,
                                  columnNumber: 33
                                }, void 0),
                                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "ecommerce", children: "E-commerce" }, void 0, false, {
                                  fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                                  lineNumber: 753,
                                  columnNumber: 33
                                }, void 0),
                                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "financial", children: "Financial Services" }, void 0, false, {
                                  fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                                  lineNumber: 754,
                                  columnNumber: 33
                                }, void 0),
                                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "professional", children: "Professional Services" }, void 0, false, {
                                  fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                                  lineNumber: 755,
                                  columnNumber: 33
                                }, void 0),
                                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "manufacturing", children: "Manufacturing" }, void 0, false, {
                                  fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                                  lineNumber: 756,
                                  columnNumber: 33
                                }, void 0),
                                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "other", children: "Other" }, void 0, false, {
                                  fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                                  lineNumber: 757,
                                  columnNumber: 33
                                }, void 0)
                              ]
                            },
                            void 0,
                            true,
                            {
                              fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                              lineNumber: 744,
                              columnNumber: 31
                            },
                            void 0
                          )
                        ] }, void 0, true, {
                          fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                          lineNumber: 742,
                          columnNumber: 29
                        }, void 0),
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "block text-xs font-bold replace-text-slate-700 mb-2", children: "Team Size" }, void 0, false, {
                            fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                            lineNumber: 761,
                            columnNumber: 31
                          }, void 0),
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                            "select",
                            {
                              value: formData.teamSize,
                              onChange: (e) => setFormData({ ...formData, teamSize: e.target.value }),
                              onFocus: () => handleFieldFocus("teamSize"),
                              className: "w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 motion-safe:transition-all motion-reduce:transition-none motion-safe:duration-300 motion-reduce:duration-0 text-sm",
                              children: [
                                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "", children: "Select size" }, void 0, false, {
                                  fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                                  lineNumber: 768,
                                  columnNumber: 33
                                }, void 0),
                                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "1-10", children: "1-10 employees" }, void 0, false, {
                                  fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                                  lineNumber: 769,
                                  columnNumber: 33
                                }, void 0),
                                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "11-50", children: "11-50 employees" }, void 0, false, {
                                  fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                                  lineNumber: 770,
                                  columnNumber: 33
                                }, void 0),
                                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "51-200", children: "51-200 employees" }, void 0, false, {
                                  fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                                  lineNumber: 771,
                                  columnNumber: 33
                                }, void 0),
                                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "200+", children: "200+ employees" }, void 0, false, {
                                  fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                                  lineNumber: 772,
                                  columnNumber: 33
                                }, void 0)
                              ]
                            },
                            void 0,
                            true,
                            {
                              fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                              lineNumber: 762,
                              columnNumber: 31
                            },
                            void 0
                          )
                        ] }, void 0, true, {
                          fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                          lineNumber: 760,
                          columnNumber: 29
                        }, void 0)
                      ] }, void 0, true, {
                        fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                        lineNumber: 741,
                        columnNumber: 27
                      }, void 0)
                    ] }, void 0, true, {
                      fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                      lineNumber: 725,
                      columnNumber: 25
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                    lineNumber: 719,
                    columnNumber: 23
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-white/60 dark:bg-slate-700/60 backdrop-blur-fallback-sm transparency-normalized rounded-xl p-4 border border-white/30 dark:border-slate-600/30", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "font-bold text-yellow-900 mb-3 flex items-center", children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xs mr-2", children: "3" }, void 0, false, {
                        fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                        lineNumber: 782,
                        columnNumber: 27
                      }, void 0),
                      "Your Marketing Challenge"
                    ] }, void 0, true, {
                      fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                      lineNumber: 781,
                      columnNumber: 25
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-3", children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "block text-xs font-bold replace-text-slate-700 mb-2", children: "What's your biggest marketing pain right now? *" }, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                          lineNumber: 787,
                          columnNumber: 29
                        }, void 0),
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                          "textarea",
                          {
                            value: formData.specificIssue,
                            onChange: (e) => setFormData({ ...formData, specificIssue: e.target.value }),
                            onFocus: () => handleFieldFocus("specificIssue"),
                            onBlur: (e) => handleFieldBlur("specificIssue", e.target.value),
                            className: "w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 motion-safe:transition-all motion-reduce:transition-none motion-safe:duration-300 motion-reduce:duration-0 text-sm placeholder:text-xs",
                            placeholder: "e.g., Not getting enough leads, poor conversion rates, unclear messaging, competitors beating us, website visitors not buying...",
                            rows: 3
                          },
                          void 0,
                          false,
                          {
                            fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                            lineNumber: 788,
                            columnNumber: 29
                          },
                          void 0
                        )
                      ] }, void 0, true, {
                        fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                        lineNumber: 786,
                        columnNumber: 27
                      }, void 0),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "block text-xs font-bold replace-text-slate-700 mb-2", children: "What marketing are you currently doing?" }, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                          lineNumber: 799,
                          columnNumber: 29
                        }, void 0),
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                          "textarea",
                          {
                            value: formData.currentMarketing,
                            onChange: (e) => setFormData({ ...formData, currentMarketing: e.target.value }),
                            onFocus: () => handleFieldFocus("currentMarketing"),
                            onBlur: (e) => handleFieldBlur("currentMarketing", e.target.value),
                            className: "w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 motion-safe:transition-all motion-reduce:transition-none motion-safe:duration-300 motion-reduce:duration-0 text-sm placeholder:text-xs",
                            placeholder: "e.g., Google Ads, social media, content marketing, email campaigns, SEO...",
                            rows: 2
                          },
                          void 0,
                          false,
                          {
                            fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                            lineNumber: 800,
                            columnNumber: 29
                          },
                          void 0
                        )
                      ] }, void 0, true, {
                        fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                        lineNumber: 798,
                        columnNumber: 27
                      }, void 0)
                    ] }, void 0, true, {
                      fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                      lineNumber: 785,
                      columnNumber: 25
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                    lineNumber: 780,
                    columnNumber: 23
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-white/60 dark:bg-slate-700/60 backdrop-blur-fallback-sm transparency-normalized rounded-xl p-4 border border-white/30 dark:border-slate-600/30", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "font-bold text-purple-900 mb-3 flex items-center", children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs mr-2", children: "4" }, void 0, false, {
                        fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                        lineNumber: 816,
                        columnNumber: 27
                      }, void 0),
                      "Timeline"
                    ] }, void 0, true, {
                      fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                      lineNumber: 815,
                      columnNumber: 25
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xs replace-text-gray-600 mb-3", children: "When do you need to see marketing results?" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                      lineNumber: 819,
                      columnNumber: 25
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-2 gap-2", children: [
                      { value: "asap", label: "ASAP" },
                      { value: "1-3months", label: "1-3 months" },
                      { value: "3-6months", label: "3-6 months" },
                      { value: "6months+", label: "6+ months" }
                    ].map((option) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                      "button",
                      {
                        onClick: () => setFormData({ ...formData, timeline: option.value }),
                        className: `px-3 py-2 rounded-lg border-2 text-xs font-medium motion-safe:transition-all motion-reduce:transition-none motion-safe:duration-300 motion-reduce:duration-0 ${formData.timeline === option.value ? "border-orange-500 bg-white/60 dark:bg-slate-700/60 backdrop-blur-fallback-sm transparency-normalized text-orange-700 dark:text-orange-300" : "border-gray-200 hover:border-gray-300 focus-visible:border-gray-300"}`,
                        children: option.label
                      },
                      option.value,
                      false,
                      {
                        fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                        lineNumber: 827,
                        columnNumber: 29
                      },
                      void 0
                    )) }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                      lineNumber: 820,
                      columnNumber: 25
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                    lineNumber: 814,
                    columnNumber: 23
                  }, void 0)
                ] }, void 0, true, {
                  fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                  lineNumber: 717,
                  columnNumber: 21
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                lineNumber: 510,
                columnNumber: 17
              }, void 0),
              submitError && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm", children: submitError }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                lineNumber: 848,
                columnNumber: 21
              }, void 0) }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                lineNumber: 847,
                columnNumber: 19
              }, void 0),
              (!isProgressive || isProgressive && formData.specificIssue) && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "button",
                {
                  onClick: async () => {
                    setSubmitError("");
                    if (!formData.name || !formData.company || !formData.email || !formData.specificIssue) {
                      setSubmitError("Please fill in all required fields");
                      return;
                    }
                    if (!validateEmail(formData.email)) {
                      setSubmitError("Please enter a valid email address");
                      return;
                    }
                    setIsSubmitting(true);
                    try {
                      const completionTime = formStartTime.current ? (Date.now() - formStartTime.current.getTime()) / 1e3 : 0;
                      trackCompletion(completionTime);
                      const result = await submitFormToServer(formData);
                      console.log("Enhanced form submitted successfully:", result.data?.message);
                      trackConversion("form_submission", leadScorePrediction, {
                        formStyle,
                        completionTime,
                        leadScore: leadScorePrediction
                      });
                      setShowDropdownForm(false);
                      setFormStep(1);
                      setFormData({
                        email: "",
                        challenge: "",
                        revenue: "",
                        name: "",
                        company: "",
                        timeline: "",
                        website: "",
                        specificIssue: "",
                        industry: "",
                        teamSize: "",
                        currentMarketing: ""
                      });
                    } catch (error) {
                      console.error("Error submitting enhanced form:", error);
                      setSubmitError(error instanceof Error ? error.message : "Failed to submit form. Please try again.");
                    } finally {
                      setIsSubmitting(false);
                    }
                  },
                  disabled: isSubmitting,
                  className: `w-full mt-6 px-8 py-4 rounded-xl font-black text-lg motion-safe:transition-all motion-reduce:transition-none motion-safe:duration-300 motion-reduce:duration-0 transform shadow-2xl ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : leadScorePrediction >= 80 ? "bg-gradient-to-r from-red-500 via-orange-600 to-red-600 hover:from-red-600 focus-visible:from-red-600 hover:via-orange-700 focus-visible:via-orange-700 hover:to-red-700 focus-visible:to-red-700 hover:scale-105 motion-safe:focus-visible:scale-105 motion-reduce:transform-none motion-safe:animate-pulse motion-reduce:animate-none" : "bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 hover:from-orange-600 focus-visible:from-orange-600 hover:via-orange-700 focus-visible:via-orange-700 hover:to-red-600 focus-visible:to-red-600 hover:scale-105 motion-safe:focus-visible:scale-105 motion-reduce:transform-none"} text-white`,
                  children: isSubmitting ? "Submitting..." : leadScorePrediction >= 80 ? "🚀 Get Priority Analysis Now →" : leadScorePrediction >= 60 ? "Get My Growth Strategy →" : "Get My Free Marketing Analysis →"
                },
                void 0,
                false,
                {
                  fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                  lineNumber: 854,
                  columnNumber: 19
                },
                void 0
              ),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "replace-text-gray-500 text-xs text-center mt-4", children: [
                "🔒 Your information is 100% secure. No spam, ever.",
                leadScorePrediction >= 80 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("br", {}, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                    lineNumber: 930,
                    columnNumber: 23
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-orange-accessible font-medium", children: "⚡ Priority leads get response within 1 hour" }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                    lineNumber: 931,
                    columnNumber: 23
                  }, void 0)
                ] }, void 0, true, {
                  fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                  lineNumber: 929,
                  columnNumber: 21
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
                lineNumber: 926,
                columnNumber: 17
              }, void 0)
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
              lineNumber: 470,
              columnNumber: 15
            }, void 0)
          ] }, void 0, true, {
            fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
            lineNumber: 459,
            columnNumber: 13
          }, void 0)
        ] }, void 0, true, {
          fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
          lineNumber: 277,
          columnNumber: 9
        }, void 0)
      ] }, void 0, true, {
        fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
        lineNumber: 244,
        columnNumber: 7
      }, void 0)
    },
    void 0,
    false,
    {
      fileName: "/home/ian/projects/reboot/src/components/EnhancedLeadForm.tsx",
      lineNumber: 235,
      columnNumber: 5
    },
    void 0
  );
};
const NotificationItem = ({ notification, onDismiss }) => {
  const [isVisible, setIsVisible] = reactExports.useState(false);
  const [isLeaving, setIsLeaving] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);
  const handleDismiss = () => {
    setIsLeaving(true);
    setTimeout(() => onDismiss(notification.id), 300);
  };
  const getNotificationStyles = (type) => {
    const baseStyles = "border rounded-lg shadow-lg backdrop-blur-sm transition-all duration-300 ease-out";
    switch (type) {
      case "error":
        return `${baseStyles} bg-red-50/95 border-red-200 text-red-800`;
      case "warning":
        return `${baseStyles} bg-orange-50/95 border-orange-200 text-orange-800`;
      case "success":
        return `${baseStyles} bg-green-50/95 border-green-200 text-green-800`;
      case "info":
      default:
        return `${baseStyles} bg-blue-50/95 border-blue-200 text-blue-800`;
    }
  };
  const getIconForType = (type) => {
    switch (type) {
      case "error":
        return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("svg", { className: "w-5 h-5 text-red-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.732 15.5c-.77.833.192 2.5 1.732 2.5z" }, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/components/NotificationSystem.tsx",
          lineNumber: 49,
          columnNumber: 13
        }, void 0) }, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/components/NotificationSystem.tsx",
          lineNumber: 48,
          columnNumber: 11
        }, void 0);
      case "warning":
        return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("svg", { className: "w-5 h-5 text-orange-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/components/NotificationSystem.tsx",
          lineNumber: 55,
          columnNumber: 13
        }, void 0) }, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/components/NotificationSystem.tsx",
          lineNumber: 54,
          columnNumber: 11
        }, void 0);
      case "success":
        return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("svg", { className: "w-5 h-5 text-green-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/components/NotificationSystem.tsx",
          lineNumber: 61,
          columnNumber: 13
        }, void 0) }, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/components/NotificationSystem.tsx",
          lineNumber: 60,
          columnNumber: 11
        }, void 0);
      case "info":
      default:
        return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("svg", { className: "w-5 h-5 text-blue-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/components/NotificationSystem.tsx",
          lineNumber: 68,
          columnNumber: 13
        }, void 0) }, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/components/NotificationSystem.tsx",
          lineNumber: 67,
          columnNumber: 11
        }, void 0);
    }
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "div",
    {
      className: `
        ${getNotificationStyles(notification.type)}
        transform transition-all duration-300 ease-out
        ${isVisible && !isLeaving ? "translate-x-0 opacity-100 scale-100" : isLeaving ? "translate-x-full opacity-0 scale-95" : "translate-x-full opacity-0 scale-95"}
      `,
      role: "alert",
      "aria-live": "assertive",
      "aria-atomic": "true",
      children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-4", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-start gap-3", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex-shrink-0 mt-0.5", children: getIconForType(notification.type) }, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/components/NotificationSystem.tsx",
          lineNumber: 93,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex-1 min-w-0", children: [
          notification.title && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "font-semibold mb-1", children: notification.title }, void 0, false, {
            fileName: "/home/ian/projects/reboot/src/components/NotificationSystem.tsx",
            lineNumber: 100,
            columnNumber: 15
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm opacity-90", children: notification.message }, void 0, false, {
            fileName: "/home/ian/projects/reboot/src/components/NotificationSystem.tsx",
            lineNumber: 102,
            columnNumber: 13
          }, void 0),
          notification.actions && notification.actions.length > 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-3 flex flex-wrap gap-2", children: notification.actions.map((action, index) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "button",
            {
              onClick: action.action,
              className: `
                      px-3 py-1 text-xs font-medium rounded transition-colors duration-200
                      ${action.variant === "primary" ? notification.type === "error" ? "bg-red-600 hover:bg-red-700 focus-visible:bg-red-700 text-white" : notification.type === "warning" ? "bg-orange-600 hover:bg-orange-700 focus-visible:bg-orange-700 text-white" : notification.type === "success" ? "bg-green-600 hover:bg-green-700 focus-visible:bg-green-700 text-white" : "bg-blue-600 hover:bg-blue-700 focus-visible:bg-blue-700 text-white" : notification.type === "error" ? "bg-red-100 hover:bg-red-200 focus-visible:bg-red-200 text-red-800" : notification.type === "warning" ? "bg-orange-100 hover:bg-orange-200 focus-visible:bg-orange-200 text-orange-800" : notification.type === "success" ? "bg-green-100 hover:bg-green-200 focus-visible:bg-green-200 text-green-800" : "bg-blue-100 hover:bg-blue-200 focus-visible:bg-blue-200 text-blue-800"}
                    `,
              children: action.label
            },
            index,
            false,
            {
              fileName: "/home/ian/projects/reboot/src/components/NotificationSystem.tsx",
              lineNumber: 108,
              columnNumber: 19
            },
            void 0
          )) }, void 0, false, {
            fileName: "/home/ian/projects/reboot/src/components/NotificationSystem.tsx",
            lineNumber: 106,
            columnNumber: 15
          }, void 0)
        ] }, void 0, true, {
          fileName: "/home/ian/projects/reboot/src/components/NotificationSystem.tsx",
          lineNumber: 98,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "button",
          {
            onClick: handleDismiss,
            className: "flex-shrink-0 ml-2 p-1 rounded-full hover:bg-black focus-visible:bg-black/5 transition-colors duration-200",
            "aria-label": "Dismiss notification",
            children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("svg", { className: "w-4 h-4 opacity-60 hover:opacity-100 focus-visible:opacity-100", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M6 18L18 6M6 6l12 12" }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/components/NotificationSystem.tsx",
              lineNumber: 145,
              columnNumber: 15
            }, void 0) }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/components/NotificationSystem.tsx",
              lineNumber: 144,
              columnNumber: 13
            }, void 0)
          },
          void 0,
          false,
          {
            fileName: "/home/ian/projects/reboot/src/components/NotificationSystem.tsx",
            lineNumber: 139,
            columnNumber: 11
          },
          void 0
        )
      ] }, void 0, true, {
        fileName: "/home/ian/projects/reboot/src/components/NotificationSystem.tsx",
        lineNumber: 91,
        columnNumber: 9
      }, void 0) }, void 0, false, {
        fileName: "/home/ian/projects/reboot/src/components/NotificationSystem.tsx",
        lineNumber: 90,
        columnNumber: 7
      }, void 0)
    },
    void 0,
    false,
    {
      fileName: "/home/ian/projects/reboot/src/components/NotificationSystem.tsx",
      lineNumber: 75,
      columnNumber: 5
    },
    void 0
  );
};
const NotificationSystem = () => {
  const { state, hideNotification } = useError();
  const { notifications } = state;
  reactExports.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && notifications.length > 0) {
        hideNotification(notifications[notifications.length - 1].id);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [notifications, hideNotification]);
  if (notifications.length === 0) {
    return null;
  }
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "div",
      {
        className: "fixed top-4 right-4 z-50 w-96 max-w-[calc(100vw-2rem)] space-y-2",
        role: "region",
        "aria-label": "Notifications",
        "aria-live": "polite",
        children: notifications.map((notification) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          NotificationItem,
          {
            notification,
            onDismiss: hideNotification
          },
          notification.id,
          false,
          {
            fileName: "/home/ian/projects/reboot/src/components/NotificationSystem.tsx",
            lineNumber: 200,
            columnNumber: 11
          },
          void 0
        ))
      },
      void 0,
      false,
      {
        fileName: "/home/ian/projects/reboot/src/components/NotificationSystem.tsx",
        lineNumber: 193,
        columnNumber: 7
      },
      void 0
    ),
    notifications.length > 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "sm:hidden fixed inset-0 z-40 pointer-events-none", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute top-4 left-4 right-4", children: notifications.map((notification) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-2", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      NotificationItem,
      {
        notification,
        onDismiss: hideNotification
      },
      void 0,
      false,
      {
        fileName: "/home/ian/projects/reboot/src/components/NotificationSystem.tsx",
        lineNumber: 214,
        columnNumber: 17
      },
      void 0
    ) }, `mobile-${notification.id}`, false, {
      fileName: "/home/ian/projects/reboot/src/components/NotificationSystem.tsx",
      lineNumber: 213,
      columnNumber: 15
    }, void 0)) }, void 0, false, {
      fileName: "/home/ian/projects/reboot/src/components/NotificationSystem.tsx",
      lineNumber: 211,
      columnNumber: 11
    }, void 0) }, void 0, false, {
      fileName: "/home/ian/projects/reboot/src/components/NotificationSystem.tsx",
      lineNumber: 210,
      columnNumber: 9
    }, void 0)
  ] }, void 0, true, {
    fileName: "/home/ian/projects/reboot/src/components/NotificationSystem.tsx",
    lineNumber: 191,
    columnNumber: 5
  }, void 0);
};
const LeadForm = () => {
  const { showDropdownForm, setShowDropdownForm } = useLeadForm();
  const [formStep, setFormStep] = reactExports.useState(1);
  const [formData, setFormData] = reactExports.useState({
    email: "",
    challenge: "",
    revenue: "",
    name: "",
    company: "",
    timeline: "",
    website: "",
    specificIssue: "",
    industry: "",
    teamSize: "",
    currentMarketing: ""
  });
  const [fieldValidation, setFieldValidation] = reactExports.useState({});
  const [selectedOptions, setSelectedOptions] = reactExports.useState({});
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const [submitError, setSubmitError] = reactExports.useState("");
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  const handleFieldBlur = (field, value) => {
    if (value) {
      const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
      setFieldValidation({
        ...fieldValidation,
        [field]: urlPattern.test(value) ? "valid" : "invalid"
      });
    }
  };
  const handleCheckboxChange = (option) => {
    setSelectedOptions({
      ...selectedOptions,
      [option]: !selectedOptions[option]
    });
  };
  const submitFormToServer = async (formData2) => {
    const apiUrl = "http://localhost:3002/api/forms/lead";
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData2)
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Form submission failed");
    }
    return await response.json();
  };
  if (!showDropdownForm) return null;
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "fixed inset-0 modal-backdrop-dark z-[60] flex items-start justify-center pt-4 md:pt-10 px-4", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-white rounded-3xl shadow-2xl max-w-2xl w-full flex flex-col relative", style: { maxHeight: "92vh" }, children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute top-4 right-4 z-10", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "button",
      {
        onClick: () => {
          setShowDropdownForm(false);
          setFormStep(1);
          setFormData({
            email: "",
            challenge: "",
            revenue: "",
            name: "",
            company: "",
            timeline: "",
            website: "",
            specificIssue: "",
            industry: "",
            teamSize: "",
            currentMarketing: ""
          });
        },
        className: "w-10 h-10 rounded-full bg-white/90 hover:bg-white focus-visible:bg-white shadow-lg flex items-center justify-center motion-safe:transition-all motion-reduce:transition-none",
        children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("svg", { className: "w-6 h-6 replace-text-gray-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M6 18L18 6M6 6l12 12" }, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
          lineNumber: 107,
          columnNumber: 15
        }, void 0) }, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
          lineNumber: 106,
          columnNumber: 13
        }, void 0)
      },
      void 0,
      false,
      {
        fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
        lineNumber: 86,
        columnNumber: 11
      },
      void 0
    ) }, void 0, false, {
      fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
      lineNumber: 85,
      columnNumber: 9
    }, void 0),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-4 md:p-6 overflow-y-auto", style: { scrollbarWidth: "thin", scrollbarColor: "#CBD5E0 transparent" }, children: [
      formStep === 1 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center", "aria-current": "step", "aria-label": "Step 1 of form", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-2xl font-black replace-text-slate-900 mb-4", children: [
          "Is Your Marketing ",
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-orange-500", children: "Keeping You" }, void 0, false, {
            fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
            lineNumber: 116,
            columnNumber: 35
          }, void 0),
          " Up at Night?"
        ] }, void 0, true, {
          fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
          lineNumber: 115,
          columnNumber: 15
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "replace-text-gray-600 mb-8", children: "You're not alone. 87% of growth-stage companies struggle with the same marketing challenges." }, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
          lineNumber: 118,
          columnNumber: 15
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-3 mb-8", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "flex items-start text-left p-4 bg-gray-50 rounded-xl hover:bg-gray-100 focus-visible:bg-gray-100 cursor-pointer transition-colors", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "input",
              {
                type: "checkbox",
                className: "mt-1 mr-3 w-5 h-5",
                checked: selectedOptions["notWorking"],
                onChange: () => handleCheckboxChange("notWorking")
              },
              void 0,
              false,
              {
                fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                lineNumber: 124,
                columnNumber: 19
              },
              void 0
            ),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "replace-text-gray-700", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { children: "Marketing isn't working" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                lineNumber: 131,
                columnNumber: 21
              }, void 0),
              " - You're spending money but not seeing results"
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
              lineNumber: 130,
              columnNumber: 19
            }, void 0)
          ] }, void 0, true, {
            fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
            lineNumber: 123,
            columnNumber: 17
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "flex items-start text-left p-4 bg-gray-50 rounded-xl hover:bg-gray-100 focus-visible:bg-gray-100 cursor-pointer transition-colors", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "input",
              {
                type: "checkbox",
                className: "mt-1 mr-3 w-5 h-5",
                checked: selectedOptions["plateau"],
                onChange: () => handleCheckboxChange("plateau")
              },
              void 0,
              false,
              {
                fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                lineNumber: 136,
                columnNumber: 19
              },
              void 0
            ),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "replace-text-gray-700", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { children: "Hit a growth plateau" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                lineNumber: 143,
                columnNumber: 21
              }, void 0),
              " - What worked before isn't working anymore"
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
              lineNumber: 142,
              columnNumber: 19
            }, void 0)
          ] }, void 0, true, {
            fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
            lineNumber: 135,
            columnNumber: 17
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "flex items-start text-left p-4 bg-gray-50 rounded-xl hover:bg-gray-100 focus-visible:bg-gray-100 cursor-pointer transition-colors", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "input",
              {
                type: "checkbox",
                className: "mt-1 mr-3 w-5 h-5",
                checked: selectedOptions["competition"],
                onChange: () => handleCheckboxChange("competition")
              },
              void 0,
              false,
              {
                fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                lineNumber: 148,
                columnNumber: 19
              },
              void 0
            ),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "replace-text-gray-700", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { children: "Losing to competition" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                lineNumber: 155,
                columnNumber: 21
              }, void 0),
              " - Competitors are growing while you're stuck"
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
              lineNumber: 154,
              columnNumber: 19
            }, void 0)
          ] }, void 0, true, {
            fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
            lineNumber: 147,
            columnNumber: 17
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "flex items-start text-left p-4 bg-gray-50 rounded-xl hover:bg-gray-100 focus-visible:bg-gray-100 cursor-pointer transition-colors", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "input",
              {
                type: "checkbox",
                className: "mt-1 mr-3 w-5 h-5",
                checked: selectedOptions["clarity"],
                onChange: () => handleCheckboxChange("clarity")
              },
              void 0,
              false,
              {
                fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                lineNumber: 160,
                columnNumber: 19
              },
              void 0
            ),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "replace-text-gray-700", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { children: "No clear strategy" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                lineNumber: 167,
                columnNumber: 21
              }, void 0),
              " - You're trying everything but nothing sticks"
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
              lineNumber: 166,
              columnNumber: 19
            }, void 0)
          ] }, void 0, true, {
            fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
            lineNumber: 159,
            columnNumber: 17
          }, void 0)
        ] }, void 0, true, {
          fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
          lineNumber: 122,
          columnNumber: 15
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "button",
          {
            onClick: () => setFormStep(2),
            className: "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 focus-visible:from-orange-600 hover:to-orange-700 focus-visible:to-orange-700 text-white px-8 py-4 rounded-xl font-bold text-lg motion-safe:transition-all motion-reduce:transition-none motion-safe:duration-300 motion-reduce:duration-0 motion-safe:transform motion-safe:hover:scale-105 motion-reduce:transform-none motion-safe:focus-visible:scale-105 motion-reduce:transform-none shadow-xl",
            children: "Yes, I Need Help With This →"
          },
          void 0,
          false,
          {
            fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
            lineNumber: 172,
            columnNumber: 15
          },
          void 0
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "replace-text-gray-500 text-sm mt-6", children: "Takes 60 seconds • No sales pressure • Get real solutions" }, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
          lineNumber: 179,
          columnNumber: 15
        }, void 0)
      ] }, void 0, true, {
        fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
        lineNumber: 114,
        columnNumber: 13
      }, void 0),
      formStep === 2 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { "aria-current": "step", "aria-label": "Step 2 of form", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "button",
          {
            onClick: () => setFormStep(1),
            className: "replace-text-gray-500 hover:replace-text-gray-700 focus-visible:replace-text-gray-700 mb-4 flex items-center transition-colors",
            children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("svg", { className: "w-4 h-4 mr-1", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M15 19l-7-7 7-7" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                lineNumber: 193,
                columnNumber: 19
              }, void 0) }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                lineNumber: 192,
                columnNumber: 17
              }, void 0),
              "Back"
            ]
          },
          void 0,
          true,
          {
            fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
            lineNumber: 188,
            columnNumber: 15
          },
          void 0
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-white rounded-2xl p-6 max-w-lg mx-auto shadow-2xl", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-2xl font-black replace-text-slate-900 mb-4", children: [
            "I Feel You. Let's ",
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-orange-500", children: "Identify" }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
              lineNumber: 200,
              columnNumber: 37
            }, void 0),
            " Your Growth Stage"
          ] }, void 0, true, {
            fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
            lineNumber: 199,
            columnNumber: 17
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "replace-text-gray-600 mb-6", children: "Different revenue levels need different psychology approaches" }, void 0, false, {
            fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
            lineNumber: 202,
            columnNumber: 17
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-center mb-8", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold", children: "✓" }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
              lineNumber: 209,
              columnNumber: 21
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-20 h-1 bg-orange-500" }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
              lineNumber: 212,
              columnNumber: 21
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold", children: "2" }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
              lineNumber: 213,
              columnNumber: 21
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-20 h-1 bg-gray-300" }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
              lineNumber: 216,
              columnNumber: 21
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center replace-text-gray-500 font-bold", children: "3" }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
              lineNumber: 217,
              columnNumber: 21
            }, void 0)
          ] }, void 0, true, {
            fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
            lineNumber: 208,
            columnNumber: 19
          }, void 0) }, void 0, false, {
            fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
            lineNumber: 207,
            columnNumber: 17
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-8", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "font-bold replace-text-gray-900 mb-4", children: "Step 2: Your Revenue Stage" }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
              lineNumber: 224,
              columnNumber: 19
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm replace-text-gray-600 mb-4", children: "What's your current annual revenue?" }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
              lineNumber: 225,
              columnNumber: 19
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "block", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "input",
                  {
                    type: "radio",
                    name: "revenue",
                    value: "500k-1m",
                    onChange: (e) => setFormData({ ...formData, revenue: e.target.value }),
                    className: "mr-3 w-4 h-4"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                    lineNumber: 229,
                    columnNumber: 23
                  },
                  void 0
                ),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "replace-text-gray-700", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { children: "$500K - $1M" }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                    lineNumber: 237,
                    columnNumber: 25
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("br", {}, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                    lineNumber: 237,
                    columnNumber: 53
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-sm replace-text-gray-500 ml-7", children: "Growing but hitting walls" }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                    lineNumber: 238,
                    columnNumber: 25
                  }, void 0)
                ] }, void 0, true, {
                  fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                  lineNumber: 236,
                  columnNumber: 23
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                lineNumber: 228,
                columnNumber: 21
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "block", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "input",
                  {
                    type: "radio",
                    name: "revenue",
                    value: "1m-3m",
                    onChange: (e) => setFormData({ ...formData, revenue: e.target.value }),
                    className: "mr-3 w-4 h-4"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                    lineNumber: 243,
                    columnNumber: 23
                  },
                  void 0
                ),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "replace-text-gray-700", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { children: "$1M - $3M" }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                    lineNumber: 251,
                    columnNumber: 25
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("br", {}, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                    lineNumber: 251,
                    columnNumber: 51
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-sm replace-text-gray-500 ml-7", children: "Scaling but inconsistent" }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                    lineNumber: 252,
                    columnNumber: 25
                  }, void 0)
                ] }, void 0, true, {
                  fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                  lineNumber: 250,
                  columnNumber: 23
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                lineNumber: 242,
                columnNumber: 21
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "block", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "input",
                  {
                    type: "radio",
                    name: "revenue",
                    value: "3m-10m",
                    onChange: (e) => setFormData({ ...formData, revenue: e.target.value }),
                    className: "mr-3 w-4 h-4"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                    lineNumber: 257,
                    columnNumber: 23
                  },
                  void 0
                ),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "replace-text-gray-700", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { children: "$3M - $10M" }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                    lineNumber: 265,
                    columnNumber: 25
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("br", {}, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                    lineNumber: 265,
                    columnNumber: 52
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-sm replace-text-gray-500 ml-7", children: "Need systematic growth" }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                    lineNumber: 266,
                    columnNumber: 25
                  }, void 0)
                ] }, void 0, true, {
                  fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                  lineNumber: 264,
                  columnNumber: 23
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                lineNumber: 256,
                columnNumber: 21
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "block", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "input",
                  {
                    type: "radio",
                    name: "revenue",
                    value: "10m+",
                    onChange: (e) => setFormData({ ...formData, revenue: e.target.value }),
                    className: "mr-3 w-4 h-4"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                    lineNumber: 271,
                    columnNumber: 23
                  },
                  void 0
                ),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "replace-text-gray-700", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { children: "$10M+" }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                    lineNumber: 279,
                    columnNumber: 25
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("br", {}, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                    lineNumber: 279,
                    columnNumber: 47
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-sm replace-text-gray-500 ml-7", children: "Ready for transformation" }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                    lineNumber: 280,
                    columnNumber: 25
                  }, void 0)
                ] }, void 0, true, {
                  fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                  lineNumber: 278,
                  columnNumber: 23
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                lineNumber: 270,
                columnNumber: 21
              }, void 0)
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
              lineNumber: 227,
              columnNumber: 19
            }, void 0)
          ] }, void 0, true, {
            fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
            lineNumber: 223,
            columnNumber: 17
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "button",
            {
              onClick: () => {
                if (formData.revenue) {
                  setFormStep(3);
                } else {
                  console.error("Please select your revenue range");
                  return;
                }
              },
              disabled: !formData.revenue,
              className: `w-full py-4 rounded-xl font-bold text-lg motion-safe:transition-all motion-reduce:transition-none motion-safe:duration-300 motion-reduce:duration-0 motion-safe:transform motion-safe:hover:scale-105 motion-reduce:transform-none motion-safe:focus-visible:scale-105 motion-reduce:transform-none shadow-xl ${formData.revenue ? "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 focus-visible:from-orange-600 hover:to-orange-700 focus-visible:to-orange-700 text-white" : "bg-gray-300 replace-text-gray-500 cursor-not-allowed"}`,
              children: "Continue to Final Step →"
            },
            void 0,
            false,
            {
              fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
              lineNumber: 286,
              columnNumber: 17
            },
            void 0
          )
        ] }, void 0, true, {
          fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
          lineNumber: 198,
          columnNumber: 15
        }, void 0)
      ] }, void 0, true, {
        fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
        lineNumber: 187,
        columnNumber: 13
      }, void 0),
      formStep === 3 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { "aria-current": "step", "aria-label": "Step 3 of form", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "button",
          {
            onClick: () => setFormStep(2),
            className: "replace-text-gray-500 hover:replace-text-gray-700 focus-visible:replace-text-gray-700 mb-4 flex items-center transition-colors",
            children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("svg", { className: "w-4 h-4 mr-1", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M15 19l-7-7 7-7" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                lineNumber: 317,
                columnNumber: 19
              }, void 0) }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                lineNumber: 316,
                columnNumber: 17
              }, void 0),
              "Back"
            ]
          },
          void 0,
          true,
          {
            fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
            lineNumber: 312,
            columnNumber: 15
          },
          void 0
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "max-w-2xl mx-auto", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-2xl font-black replace-text-slate-900 mb-4 text-center", children: [
            "Perfect! Let's Get Your ",
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-orange-500", children: "Free Analysis" }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
              lineNumber: 324,
              columnNumber: 43
            }, void 0)
          ] }, void 0, true, {
            fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
            lineNumber: 323,
            columnNumber: 17
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "replace-text-gray-600 mb-8 text-center", children: "I'll personally review your situation and send you a custom growth strategy within 24 hours" }, void 0, false, {
            fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
            lineNumber: 326,
            columnNumber: 17
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-center mb-8", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold", children: "✓" }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
              lineNumber: 333,
              columnNumber: 21
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-20 h-1 bg-green-500" }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
              lineNumber: 336,
              columnNumber: 21
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold", children: "✓" }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
              lineNumber: 337,
              columnNumber: 21
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-20 h-1 bg-orange-500" }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
              lineNumber: 340,
              columnNumber: 21
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold", children: "3" }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
              lineNumber: 341,
              columnNumber: 21
            }, void 0)
          ] }, void 0, true, {
            fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
            lineNumber: 332,
            columnNumber: 19
          }, void 0) }, void 0, false, {
            fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
            lineNumber: 331,
            columnNumber: 17
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-white/95 dark:bg-slate-700/95 rounded-xl p-4 border border-gray-200/30 dark:border-slate-600/30", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "font-bold text-blue-900 mb-3 flex items-center", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs mr-2", children: "1" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                  lineNumber: 351,
                  columnNumber: 23
                }, void 0),
                "Contact Information"
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                lineNumber: 350,
                columnNumber: 21
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid md:grid-cols-2 gap-3", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "block text-xs font-bold replace-text-slate-700 mb-2", children: "Your Name *" }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                    lineNumber: 356,
                    columnNumber: 25
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                    "input",
                    {
                      type: "text",
                      value: formData.name,
                      onChange: (e) => setFormData({ ...formData, name: e.target.value }),
                      className: "w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 motion-safe:transition-all motion-reduce:transition-none motion-safe:duration-300 motion-reduce:duration-0 text-sm",
                      placeholder: "John Smith"
                    },
                    void 0,
                    false,
                    {
                      fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                      lineNumber: 357,
                      columnNumber: 25
                    },
                    void 0
                  )
                ] }, void 0, true, {
                  fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                  lineNumber: 355,
                  columnNumber: 23
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "block text-xs font-bold replace-text-slate-700 mb-2", children: "Company Name *" }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                    lineNumber: 366,
                    columnNumber: 25
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                    "input",
                    {
                      type: "text",
                      value: formData.company,
                      onChange: (e) => setFormData({ ...formData, company: e.target.value }),
                      className: "w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 motion-safe:transition-all motion-reduce:transition-none motion-safe:duration-300 motion-reduce:duration-0 text-sm",
                      placeholder: "Acme Corp"
                    },
                    void 0,
                    false,
                    {
                      fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                      lineNumber: 367,
                      columnNumber: 25
                    },
                    void 0
                  )
                ] }, void 0, true, {
                  fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                  lineNumber: 365,
                  columnNumber: 23
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                lineNumber: 354,
                columnNumber: 21
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "block text-xs font-bold replace-text-slate-700 mb-2", children: "Business Email *" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                  lineNumber: 377,
                  columnNumber: 23
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "input",
                  {
                    type: "email",
                    value: formData.email,
                    onChange: (e) => setFormData({ ...formData, email: e.target.value }),
                    className: "w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 motion-safe:transition-all motion-reduce:transition-none motion-safe:duration-300 motion-reduce:duration-0 text-sm",
                    placeholder: "your@company.com"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                    lineNumber: 378,
                    columnNumber: 23
                  },
                  void 0
                )
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                lineNumber: 376,
                columnNumber: 21
              }, void 0)
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
              lineNumber: 349,
              columnNumber: 19
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-white/95 dark:bg-slate-700/95 rounded-xl p-4 border border-gray-200/30 dark:border-slate-600/30", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "font-bold text-green-900 mb-3 flex items-center", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs mr-2", children: "2" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                  lineNumber: 391,
                  columnNumber: 23
                }, void 0),
                "Business Details"
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                lineNumber: 390,
                columnNumber: 21
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "block text-xs font-bold replace-text-slate-700 mb-2", children: "Website URL" }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                    lineNumber: 396,
                    columnNumber: 25
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                    "input",
                    {
                      type: "url",
                      value: formData.website,
                      onChange: (e) => setFormData({ ...formData, website: e.target.value }),
                      onBlur: (e) => handleFieldBlur("website", e.target.value),
                      className: `w-full px-3 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 motion-safe:transition-all motion-reduce:transition-none motion-safe:duration-300 motion-reduce:duration-0 text-sm ${fieldValidation.website === "valid" ? "border-green-500" : fieldValidation.website === "invalid" ? "border-red-500" : "border-gray-200"}`,
                      placeholder: "https://yourcompany.com"
                    },
                    void 0,
                    false,
                    {
                      fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                      lineNumber: 397,
                      columnNumber: 25
                    },
                    void 0
                  )
                ] }, void 0, true, {
                  fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                  lineNumber: 395,
                  columnNumber: 23
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-2 gap-3", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "block text-xs font-bold replace-text-slate-700 mb-2", children: "Industry" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                      lineNumber: 411,
                      columnNumber: 27
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                      "select",
                      {
                        value: formData.industry,
                        onChange: (e) => setFormData({ ...formData, industry: e.target.value }),
                        className: "w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 motion-safe:transition-all motion-reduce:transition-none motion-safe:duration-300 motion-reduce:duration-0 text-sm",
                        children: [
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "", children: "Select industry" }, void 0, false, {
                            fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                            lineNumber: 417,
                            columnNumber: 29
                          }, void 0),
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "software", children: "Software/SaaS" }, void 0, false, {
                            fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                            lineNumber: 418,
                            columnNumber: 29
                          }, void 0),
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "healthcare", children: "Healthcare" }, void 0, false, {
                            fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                            lineNumber: 419,
                            columnNumber: 29
                          }, void 0),
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "ecommerce", children: "E-commerce" }, void 0, false, {
                            fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                            lineNumber: 420,
                            columnNumber: 29
                          }, void 0),
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "financial", children: "Financial Services" }, void 0, false, {
                            fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                            lineNumber: 421,
                            columnNumber: 29
                          }, void 0),
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "professional", children: "Professional Services" }, void 0, false, {
                            fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                            lineNumber: 422,
                            columnNumber: 29
                          }, void 0),
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "manufacturing", children: "Manufacturing" }, void 0, false, {
                            fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                            lineNumber: 423,
                            columnNumber: 29
                          }, void 0),
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "other", children: "Other" }, void 0, false, {
                            fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                            lineNumber: 424,
                            columnNumber: 29
                          }, void 0)
                        ]
                      },
                      void 0,
                      true,
                      {
                        fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                        lineNumber: 412,
                        columnNumber: 27
                      },
                      void 0
                    )
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                    lineNumber: 410,
                    columnNumber: 25
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "block text-xs font-bold replace-text-slate-700 mb-2", children: "Team Size" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                      lineNumber: 428,
                      columnNumber: 27
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                      "select",
                      {
                        value: formData.teamSize,
                        onChange: (e) => setFormData({ ...formData, teamSize: e.target.value }),
                        className: "w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 motion-safe:transition-all motion-reduce:transition-none motion-safe:duration-300 motion-reduce:duration-0 text-sm",
                        children: [
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "", children: "Select size" }, void 0, false, {
                            fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                            lineNumber: 434,
                            columnNumber: 29
                          }, void 0),
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "1-10", children: "1-10 employees" }, void 0, false, {
                            fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                            lineNumber: 435,
                            columnNumber: 29
                          }, void 0),
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "11-50", children: "11-50 employees" }, void 0, false, {
                            fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                            lineNumber: 436,
                            columnNumber: 29
                          }, void 0),
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "51-200", children: "51-200 employees" }, void 0, false, {
                            fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                            lineNumber: 437,
                            columnNumber: 29
                          }, void 0),
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "200+", children: "200+ employees" }, void 0, false, {
                            fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                            lineNumber: 438,
                            columnNumber: 29
                          }, void 0)
                        ]
                      },
                      void 0,
                      true,
                      {
                        fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                        lineNumber: 429,
                        columnNumber: 27
                      },
                      void 0
                    )
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                    lineNumber: 427,
                    columnNumber: 25
                  }, void 0)
                ] }, void 0, true, {
                  fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                  lineNumber: 409,
                  columnNumber: 23
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                lineNumber: 394,
                columnNumber: 21
              }, void 0)
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
              lineNumber: 389,
              columnNumber: 19
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-white/95 dark:bg-slate-700/95 rounded-xl p-4 border border-gray-200/30 dark:border-slate-600/30", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "font-bold text-yellow-900 mb-3 flex items-center", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xs mr-2", children: "3" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                  lineNumber: 448,
                  columnNumber: 23
                }, void 0),
                "Your Marketing Challenge"
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                lineNumber: 447,
                columnNumber: 21
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "block text-xs font-bold replace-text-slate-700 mb-2", children: "What's your biggest marketing pain right now? *" }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                    lineNumber: 453,
                    columnNumber: 25
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                    "textarea",
                    {
                      value: formData.specificIssue,
                      onChange: (e) => setFormData({ ...formData, specificIssue: e.target.value }),
                      className: "w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 motion-safe:transition-all motion-reduce:transition-none motion-safe:duration-300 motion-reduce:duration-0 text-sm placeholder:text-xs",
                      placeholder: "e.g., Not getting enough leads, poor conversion rates, unclear messaging, competitors beating us, website visitors not buying...",
                      rows: 3
                    },
                    void 0,
                    false,
                    {
                      fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                      lineNumber: 454,
                      columnNumber: 25
                    },
                    void 0
                  )
                ] }, void 0, true, {
                  fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                  lineNumber: 452,
                  columnNumber: 23
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "block text-xs font-bold replace-text-slate-700 mb-2", children: "What marketing are you currently doing?" }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                    lineNumber: 463,
                    columnNumber: 25
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                    "textarea",
                    {
                      value: formData.currentMarketing,
                      onChange: (e) => setFormData({ ...formData, currentMarketing: e.target.value }),
                      className: "w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 motion-safe:transition-all motion-reduce:transition-none motion-safe:duration-300 motion-reduce:duration-0 text-sm placeholder:text-xs",
                      placeholder: "e.g., Google Ads, social media, content marketing, email campaigns, SEO...",
                      rows: 2
                    },
                    void 0,
                    false,
                    {
                      fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                      lineNumber: 464,
                      columnNumber: 25
                    },
                    void 0
                  )
                ] }, void 0, true, {
                  fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                  lineNumber: 462,
                  columnNumber: 23
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                lineNumber: 451,
                columnNumber: 21
              }, void 0)
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
              lineNumber: 446,
              columnNumber: 19
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-white/95 dark:bg-slate-700/95 rounded-xl p-4 border border-gray-200/30 dark:border-slate-600/30", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "font-bold text-purple-900 mb-3 flex items-center", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs mr-2", children: "4" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                  lineNumber: 478,
                  columnNumber: 23
                }, void 0),
                "Timeline"
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                lineNumber: 477,
                columnNumber: 21
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xs replace-text-gray-600 mb-3", children: "When do you need to see marketing results?" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                lineNumber: 481,
                columnNumber: 21
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-2 gap-2", children: [
                { value: "asap", label: "ASAP" },
                { value: "1-3months", label: "1-3 months" },
                { value: "3-6months", label: "3-6 months" },
                { value: "6months+", label: "6+ months" }
              ].map((option) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "button",
                {
                  onClick: () => setFormData({ ...formData, timeline: option.value }),
                  className: `px-3 py-2 rounded-lg border-2 text-xs font-medium motion-safe:transition-all motion-reduce:transition-none motion-safe:duration-300 motion-reduce:duration-0 ${formData.timeline === option.value ? "border-orange-500 bg-orange-50 dark:bg-slate-700/95 text-orange-700 dark:text-orange-300" : "border-gray-200 hover:border-gray-300 focus-visible:border-gray-300"}`,
                  children: option.label
                },
                option.value,
                false,
                {
                  fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                  lineNumber: 489,
                  columnNumber: 25
                },
                void 0
              )) }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
                lineNumber: 482,
                columnNumber: 21
              }, void 0)
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
              lineNumber: 476,
              columnNumber: 19
            }, void 0)
          ] }, void 0, true, {
            fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
            lineNumber: 347,
            columnNumber: 17
          }, void 0),
          submitError && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm", children: submitError }, void 0, false, {
            fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
            lineNumber: 508,
            columnNumber: 21
          }, void 0) }, void 0, false, {
            fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
            lineNumber: 507,
            columnNumber: 19
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "button",
            {
              onClick: async () => {
                setSubmitError("");
                if (!formData.name || !formData.company || !formData.email || !formData.specificIssue) {
                  setSubmitError("Please fill in all required fields");
                  return;
                }
                if (!validateEmail(formData.email)) {
                  setSubmitError("Please enter a valid email address");
                  return;
                }
                setIsSubmitting(true);
                try {
                  const result = await submitFormToServer(formData);
                  console.log("Form submitted successfully:", result.data?.message);
                  setShowDropdownForm(false);
                  setFormStep(1);
                  setFormData({
                    email: "",
                    challenge: "",
                    revenue: "",
                    name: "",
                    company: "",
                    timeline: "",
                    website: "",
                    specificIssue: "",
                    industry: "",
                    teamSize: "",
                    currentMarketing: ""
                  });
                } catch (error) {
                  console.error("Error submitting form:", error);
                  setSubmitError(error instanceof Error ? error.message : "Failed to submit form. Please try again.");
                } finally {
                  setIsSubmitting(false);
                }
              },
              disabled: isSubmitting,
              className: `w-full mt-6 px-8 py-4 rounded-xl font-black text-lg motion-safe:transition-all motion-reduce:transition-none motion-safe:duration-300 motion-reduce:duration-0 transform shadow-2xl ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 hover:from-orange-600 focus-visible:from-orange-600 hover:via-orange-700 focus-visible:via-orange-700 hover:to-red-600 focus-visible:to-red-600 hover:scale-105 motion-safe:focus-visible:scale-105 motion-reduce:transform-none"} text-white`,
              children: isSubmitting ? "Submitting..." : "Get My Free Marketing Analysis →"
            },
            void 0,
            false,
            {
              fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
              lineNumber: 513,
              columnNumber: 17
            },
            void 0
          ),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "replace-text-gray-500 text-xs text-center mt-4", children: "🔒 Your information is 100% secure. No spam, ever." }, void 0, false, {
            fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
            lineNumber: 574,
            columnNumber: 17
          }, void 0)
        ] }, void 0, true, {
          fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
          lineNumber: 322,
          columnNumber: 15
        }, void 0)
      ] }, void 0, true, {
        fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
        lineNumber: 311,
        columnNumber: 13
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
      lineNumber: 111,
      columnNumber: 9
    }, void 0)
  ] }, void 0, true, {
    fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
    lineNumber: 84,
    columnNumber: 7
  }, void 0) }, void 0, false, {
    fileName: "/home/ian/projects/reboot/src/components/LeadForm.tsx",
    lineNumber: 83,
    columnNumber: 5
  }, void 0);
};
export {
  EnhancedPricingCards as E,
  LeadForm as L,
  NotificationSystem as N,
  EnhancedLeadForm as a
};
//# sourceMappingURL=components-interactive-DQsh8t0X.js.map
