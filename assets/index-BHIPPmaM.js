const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/pages-core-BiocblyB.js","assets/react-core-CWvNQPo6.js","assets/components-core-CcwdGS-4.js","assets/router-Up7tU2vJ.js","assets/components-perf-CB4PwQVg.js","assets/components-utils-B8LwQ22Q.js","assets/app-utils-B6wQ-etB.js","assets/app-state-DJgpQx31.js","assets/vendor-WJZsBhsu.js","assets/pages-psychology-BoXS_ujt.js","assets/pages-solutions-p54rnrg0.js","assets/pages-services-2zSd-FbW.js"])))=>i.map(i=>d[i]);
import { r as reactExports, j as jsxDevRuntimeExports, d as clientExports } from "./react-core-CWvNQPo6.js";
import { b as getCanonicalUrl, a as analytics, r as registerServiceWorker, s as setupPerformanceIntegration } from "./app-utils-B6wQ-etB.js";
import { E as ErrorBoundary, B as BackgroundGradient, G as GlobalHeader, a as GlobalFooter } from "./components-core-CcwdGS-4.js";
import { E as EnhancedPricingCards, a as EnhancedLeadForm, L as LeadForm, N as NotificationSystem } from "./components-interactive-D7D-zEKb.js";
import { u as useConversionOptimization, c as useLeadForm, f as useExitIntentOptimization, g as useABTest, h as useTestResults, b as useCTAOptimization, A as ABTestProvider, C as ConversionOptimizationProvider, i as useErrorReporter, a as usePricingOptimization, j as useScrollOptimization, k as useTimeBasedOptimization, l as useClickHeatmap, m as useCoreWebVitals, E as ErrorProvider, L as LeadFormProvider } from "./app-state-DJgpQx31.js";
import { S as SEOHead, a as SchemaMarkup, b as ScrollToTop } from "./components-utils-B8LwQ22Q.js";
import { B as BrowserRouter, R as Routes, b as Route } from "./router-Up7tU2vJ.js";
import "./components-perf-CB4PwQVg.js";
import "./swiper-tqzTYPmW.js";
import "./vendor-WJZsBhsu.js";
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) return;
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) processPreload(link);
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") continue;
      for (const node of mutation.addedNodes) if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
    }
  }).observe(document, {
    childList: true,
    subtree: true
  });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep) return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const scriptRel = "modulepreload";
const assetsURL = function(dep) {
  return "/reboot/" + dep;
};
const seen = {};
const __vitePreload = function preload(baseModule, deps, importerUrl) {
  let promise = Promise.resolve();
  if (deps && deps.length > 0) {
    let allSettled = function(promises$2) {
      return Promise.all(promises$2.map((p$1) => Promise.resolve(p$1).then((value$1) => ({
        status: "fulfilled",
        value: value$1
      }), (reason) => ({
        status: "rejected",
        reason
      }))));
    };
    document.getElementsByTagName("link");
    const cspNonceMeta = document.querySelector("meta[property=csp-nonce]");
    const cspNonce = cspNonceMeta?.nonce || cspNonceMeta?.getAttribute("nonce");
    promise = allSettled(deps.map((dep) => {
      dep = assetsURL(dep);
      if (dep in seen) return;
      seen[dep] = true;
      const isCss = dep.endsWith(".css");
      const cssSelector = isCss ? '[rel="stylesheet"]' : "";
      if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) return;
      const link = document.createElement("link");
      link.rel = isCss ? "stylesheet" : scriptRel;
      if (!isCss) link.as = "script";
      link.crossOrigin = "";
      link.href = dep;
      if (cspNonce) link.setAttribute("nonce", cspNonce);
      document.head.appendChild(link);
      if (isCss) return new Promise((res, rej) => {
        link.addEventListener("load", res);
        link.addEventListener("error", () => rej(/* @__PURE__ */ new Error(`Unable to preload CSS for ${dep}`)));
      });
    }));
  }
  function handlePreloadError(err$2) {
    const e$1 = new Event("vite:preloadError", { cancelable: true });
    e$1.payload = err$2;
    window.dispatchEvent(e$1);
    if (!e$1.defaultPrevented) throw err$2;
  }
  return promise.then((res) => {
    for (const item of res || []) {
      if (item.status !== "rejected") continue;
      handlePreloadError(item.reason);
    }
    return baseModule().catch(handlePreloadError);
  });
};
const ExitIntentModal = ({ isVisible, onClose, onConvert }) => {
  const { leadScore, trackConversion, trackInteraction } = useConversionOptimization();
  const { setShowDropdownForm } = useLeadForm();
  const { isEligible, leadTier } = useExitIntentOptimization();
  const [isClosing, setIsClosing] = reactExports.useState(false);
  if (!isEligible || !isVisible) return null;
  const getTierContent = () => {
    switch (leadTier) {
      case "Hot":
        return {
          icon: "🔥",
          title: "Wait! Let's Schedule Your Priority Strategy Call",
          subtitle: "You're clearly ready for growth. Don't leave without booking your priority consultation.",
          offer: {
            title: "FREE Priority Strategy Session",
            value: "Worth $2,500",
            items: [
              "30-minute strategy consultation",
              "Custom growth plan created in 24 hours",
              "Priority implementation roadmap",
              "Guaranteed response within 1 hour"
            ]
          },
          ctaText: "Book My Priority Call",
          urgency: "Limited to 5 priority consultations per week",
          socialProof: "Join 47 companies that booked priority calls this month",
          ctaStyle: "bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 focus-visible:from-red-600 hover:to-orange-600 focus-visible:to-orange-600 animate-pulse"
        };
      case "Warm":
        return {
          icon: "⚡",
          title: "Before You Go - Get Your Free Growth Audit",
          subtitle: "We can show you exactly what's holding back your marketing.",
          offer: {
            title: "FREE Marketing Growth Audit",
            value: "Worth $2,500",
            items: [
              "Complete marketing audit",
              "Growth opportunity analysis",
              "Competitive positioning review",
              "Personalized recommendations"
            ]
          },
          ctaText: "Get My Free Audit",
          urgency: "Only 10 audits available this month",
          socialProof: "Over 200 companies have received their audit",
          ctaStyle: "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 focus-visible:from-orange-600 hover:to-orange-700 focus-visible:to-orange-700"
        };
      case "Cold":
        return {
          icon: "📈",
          title: "Get Our Proven Marketing Success Framework",
          subtitle: "Download the same framework used by 200+ growing companies.",
          offer: {
            title: "Marketing Growth Framework",
            value: "FREE Download",
            items: [
              "Proven growth framework",
              "Marketing strategy templates",
              "Growth metrics dashboard",
              "Implementation checklist"
            ]
          },
          ctaText: "Download Free Framework",
          urgency: "Downloaded by 1,000+ marketers",
          socialProof: "Join companies already using this framework",
          ctaStyle: "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 focus-visible:from-blue-600 hover:to-blue-700 focus-visible:to-blue-700"
        };
      case "Unqualified":
      default:
        return {
          icon: "📚",
          title: "Stay Updated with Weekly Marketing Insights",
          subtitle: "Get proven marketing strategies delivered to your inbox.",
          offer: {
            title: "Marketing Insights Newsletter",
            value: "FREE",
            items: [
              "Weekly marketing insights",
              "Growth case studies",
              "Strategy breakdowns",
              "Industry trend analysis"
            ]
          },
          ctaText: "Get Weekly Insights",
          urgency: "Join 10,000+ marketers already subscribed",
          socialProof: "Trusted by marketing leaders worldwide",
          ctaStyle: "bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 focus-visible:from-gray-700 hover:to-gray-800 focus-visible:to-gray-800"
        };
    }
  };
  const content = getTierContent();
  reactExports.useEffect(() => {
    if (isVisible) {
      trackInteraction({
        type: "scroll",
        element: "exit_intent_modal",
        value: leadTier,
        metadata: {
          leadTier,
          leadScore: leadScore?.total || 0,
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        }
      });
      trackConversion("form_submission", leadScore?.total || 0);
    }
  }, [isVisible, trackInteraction, trackConversion, leadTier, leadScore]);
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
    trackInteraction({
      type: "click",
      element: "exit_intent_close",
      value: "dismissed",
      metadata: { leadTier, method: "close_button" }
    });
    trackConversion("email_signup", 0);
  };
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      trackInteraction({
        type: "click",
        element: "exit_intent_close",
        value: "dismissed",
        metadata: { leadTier, method: "backdrop_click" }
      });
      trackConversion("email_signup", 0);
      handleClose();
    }
  };
  const handleCTAClick = () => {
    trackInteraction({
      type: "click",
      element: "exit_intent_cta",
      value: "converted",
      metadata: {
        leadTier,
        offer: content.offer.title,
        leadScore: leadScore?.total || 0
      }
    });
    trackConversion("form_submission", leadScore?.total || 0);
    if (leadTier === "Hot" || leadTier === "Warm") {
      setShowDropdownForm(true);
    }
    onConvert();
    handleClose();
  };
  const handleSecondaryAction = () => {
    trackInteraction({
      type: "click",
      element: "exit_intent_secondary",
      value: "maybe_later",
      metadata: { leadTier }
    });
    handleClose();
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "div",
    {
      className: `fixed inset-0 z-[70] flex items-center justify-center p-4 transition-all duration-300 ${isClosing ? "opacity-0" : "opacity-100"}`,
      style: {
        // Consistent exit intent backdrop across browsers
        background: "rgba(0, 0, 0, 0.7)",
        backdropFilter: "blur(8px) saturate(150%)",
        WebkitBackdropFilter: "blur(8px) saturate(150%)"
      },
      onClick: handleBackdropClick,
      children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "div",
        {
          className: `bg-white rounded-2xl shadow-2xl max-w-lg w-full relative transform transition-all duration-300 ${isClosing ? "scale-95 opacity-0" : "scale-100 opacity-100"}`,
          children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "button",
              {
                onClick: handleClose,
                className: "absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 focus-visible:bg-gray-200 flex items-center justify-center transition-colors z-10",
                children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("svg", { className: "w-5 h-5 replace-text-gray-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M6 18L18 6M6 6l12 12" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/components/ExitIntentModal.tsx",
                  lineNumber: 225,
                  columnNumber: 13
                }, void 0) }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/components/ExitIntentModal.tsx",
                  lineNumber: 224,
                  columnNumber: 11
                }, void 0)
              },
              void 0,
              false,
              {
                fileName: "/home/ian/projects/reboot/src/components/ExitIntentModal.tsx",
                lineNumber: 220,
                columnNumber: 9
              },
              void 0
            ),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-8", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center mb-6", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-4xl mb-4", children: content.icon }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/components/ExitIntentModal.tsx",
                  lineNumber: 233,
                  columnNumber: 13
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-2xl font-black text-gray-900 mb-3", children: content.title }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/components/ExitIntentModal.tsx",
                  lineNumber: 234,
                  columnNumber: 13
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "replace-text-gray-600", children: content.subtitle }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/components/ExitIntentModal.tsx",
                  lineNumber: 237,
                  columnNumber: 13
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/components/ExitIntentModal.tsx",
                lineNumber: 232,
                columnNumber: 11
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6 mb-6", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between mb-4", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "text-lg font-bold text-blue-900", children: content.offer.title }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/components/ExitIntentModal.tsx",
                    lineNumber: 245,
                    columnNumber: 15
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: `px-3 py-1 rounded-full text-sm font-bold ${leadTier === "Hot" ? "bg-red-100 text-red-800" : leadTier === "Warm" ? "bg-orange-100 text-orange-800" : "bg-blue-100 text-blue-800"}`, children: content.offer.value }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/components/ExitIntentModal.tsx",
                    lineNumber: 248,
                    columnNumber: 15
                  }, void 0)
                ] }, void 0, true, {
                  fileName: "/home/ian/projects/reboot/src/components/ExitIntentModal.tsx",
                  lineNumber: 244,
                  columnNumber: 13
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("ul", { className: "space-y-2", children: content.offer.items.map((item, index) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { className: "flex items-start text-sm text-blue-800", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("svg", { className: "w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("path", { fillRule: "evenodd", d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z", clipRule: "evenodd" }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/components/ExitIntentModal.tsx",
                    lineNumber: 261,
                    columnNumber: 21
                  }, void 0) }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/components/ExitIntentModal.tsx",
                    lineNumber: 260,
                    columnNumber: 19
                  }, void 0),
                  item
                ] }, index, true, {
                  fileName: "/home/ian/projects/reboot/src/components/ExitIntentModal.tsx",
                  lineNumber: 259,
                  columnNumber: 17
                }, void 0)) }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/components/ExitIntentModal.tsx",
                  lineNumber: 257,
                  columnNumber: 13
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/components/ExitIntentModal.tsx",
                lineNumber: 243,
                columnNumber: 11
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center mb-6", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm replace-text-gray-600 mb-2", children: content.urgency }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/components/ExitIntentModal.tsx",
                  lineNumber: 271,
                  columnNumber: 13
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xs replace-text-gray-500", children: content.socialProof }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/components/ExitIntentModal.tsx",
                  lineNumber: 274,
                  columnNumber: 13
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/components/ExitIntentModal.tsx",
                lineNumber: 270,
                columnNumber: 11
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "button",
                  {
                    onClick: handleCTAClick,
                    className: `w-full py-4 rounded-xl font-bold text-lg text-white transition-all duration-300 transform hover:scale-105 focus-visible:scale-105 shadow-lg ${content.ctaStyle}`,
                    children: content.ctaText
                  },
                  void 0,
                  false,
                  {
                    fileName: "/home/ian/projects/reboot/src/components/ExitIntentModal.tsx",
                    lineNumber: 281,
                    columnNumber: 13
                  },
                  void 0
                ),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "button",
                  {
                    onClick: handleSecondaryAction,
                    className: "w-full py-3 rounded-xl font-medium replace-text-gray-600 border border-gray-300 hover:bg-gray-50 focus-visible:bg-gray-50 transition-all duration-300",
                    children: "Maybe Later"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/home/ian/projects/reboot/src/components/ExitIntentModal.tsx",
                    lineNumber: 288,
                    columnNumber: 13
                  },
                  void 0
                )
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/components/ExitIntentModal.tsx",
                lineNumber: 280,
                columnNumber: 11
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center mt-6 pt-6 border-t border-gray-200", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-center space-x-4 text-xs replace-text-gray-500", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "flex items-center", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("svg", { className: "w-4 h-4 text-green-500 mr-1", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("path", { fillRule: "evenodd", d: "M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z", clipRule: "evenodd" }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/components/ExitIntentModal.tsx",
                    lineNumber: 301,
                    columnNumber: 19
                  }, void 0) }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/components/ExitIntentModal.tsx",
                    lineNumber: 300,
                    columnNumber: 17
                  }, void 0),
                  "No spam, ever"
                ] }, void 0, true, {
                  fileName: "/home/ian/projects/reboot/src/components/ExitIntentModal.tsx",
                  lineNumber: 299,
                  columnNumber: 15
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "flex items-center", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("svg", { className: "w-4 h-4 text-blue-500 mr-1", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("path", { d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/components/ExitIntentModal.tsx",
                    lineNumber: 307,
                    columnNumber: 19
                  }, void 0) }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/components/ExitIntentModal.tsx",
                    lineNumber: 306,
                    columnNumber: 17
                  }, void 0),
                  "Trusted by 200+ companies"
                ] }, void 0, true, {
                  fileName: "/home/ian/projects/reboot/src/components/ExitIntentModal.tsx",
                  lineNumber: 305,
                  columnNumber: 15
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/components/ExitIntentModal.tsx",
                lineNumber: 298,
                columnNumber: 13
              }, void 0) }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/components/ExitIntentModal.tsx",
                lineNumber: 297,
                columnNumber: 11
              }, void 0)
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/components/ExitIntentModal.tsx",
              lineNumber: 230,
              columnNumber: 9
            }, void 0)
          ]
        },
        void 0,
        true,
        {
          fileName: "/home/ian/projects/reboot/src/components/ExitIntentModal.tsx",
          lineNumber: 214,
          columnNumber: 7
        },
        void 0
      )
    },
    void 0,
    false,
    {
      fileName: "/home/ian/projects/reboot/src/components/ExitIntentModal.tsx",
      lineNumber: 202,
      columnNumber: 5
    },
    void 0
  );
};
const ExitIntentManager = () => {
  const [isModalVisible, setIsModalVisible] = reactExports.useState(false);
  const { isExitIntentEligible } = useConversionOptimization();
  reactExports.useEffect(() => {
    const handleShowExitIntent = () => {
      if (isExitIntentEligible()) {
        setIsModalVisible(true);
      }
    };
    const handleDismissExitIntent = () => {
      setIsModalVisible(false);
    };
    window.addEventListener("showExitIntent", handleShowExitIntent);
    window.addEventListener("dismissExitIntent", handleDismissExitIntent);
    return () => {
      window.removeEventListener("showExitIntent", handleShowExitIntent);
      window.removeEventListener("dismissExitIntent", handleDismissExitIntent);
    };
  }, [isExitIntentEligible]);
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    ExitIntentModal,
    {
      isVisible: isModalVisible,
      onClose: () => setIsModalVisible(false),
      onConvert: () => {
        setIsModalVisible(false);
      }
    },
    void 0,
    false,
    {
      fileName: "/home/ian/projects/reboot/src/components/ExitIntentModal.tsx",
      lineNumber: 345,
      columnNumber: 5
    },
    void 0
  );
};
const ABTestingDashboard = ({ isVisible, onClose }) => {
  const { activeTests, createTest, startTest, pauseTest, stopTest } = useABTest();
  const { session, getBehavioralInsights, getConversionFunnelData } = useConversionOptimization();
  const [activeTab, setActiveTab] = reactExports.useState("overview");
  if (!isVisible) return null;
  const TestResults = ({ testId }) => {
    const { test, results, variants, isRunning, hasWinner } = useTestResults(testId);
    if (!test || !results) return null;
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-white border border-gray-200 rounded-lg p-6 mb-4", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-lg font-bold text-critical-accessible", children: test.name }, void 0, false, {
            fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
            lineNumber: 33,
            columnNumber: 13
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm replace-text-gray-600", children: test.description }, void 0, false, {
            fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
            lineNumber: 34,
            columnNumber: 13
          }, void 0)
        ] }, void 0, true, {
          fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
          lineNumber: 32,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: `px-3 py-1 rounded-full text-xs font-bold ${test.status === "running" ? "bg-green-100 text-green-800" : test.status === "paused" ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 text-gray-800"}`, children: test.status.toUpperCase() }, void 0, false, {
            fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
            lineNumber: 37,
            columnNumber: 13
          }, void 0),
          hasWinner && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold", children: "WINNER FOUND" }, void 0, false, {
            fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
            lineNumber: 45,
            columnNumber: 15
          }, void 0)
        ] }, void 0, true, {
          fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
          lineNumber: 36,
          columnNumber: 11
        }, void 0)
      ] }, void 0, true, {
        fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
        lineNumber: 31,
        columnNumber: 9
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-3 mb-4", children: variants.map((variant) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between p-3 bg-gray-50 rounded-lg", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "font-medium text-critical-accessible mr-3", children: variant.name }, void 0, false, {
            fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
            lineNumber: 57,
            columnNumber: 17
          }, void 0),
          variant.isWinner && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "px-2 py-1 bg-gold-100 text-gold-800 rounded text-xs font-bold", children: "🏆 WINNER" }, void 0, false, {
            fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
            lineNumber: 59,
            columnNumber: 19
          }, void 0)
        ] }, void 0, true, {
          fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
          lineNumber: 56,
          columnNumber: 15
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center space-x-6", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-sm replace-text-gray-500", children: "Conversions" }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
              lineNumber: 66,
              columnNumber: 19
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "font-bold", children: variant.conversions }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
              lineNumber: 67,
              columnNumber: 19
            }, void 0)
          ] }, void 0, true, {
            fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
            lineNumber: 65,
            columnNumber: 17
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-sm replace-text-gray-500", children: "Rate" }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
              lineNumber: 70,
              columnNumber: 19
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "font-bold", children: [
              variant.conversionRate.toFixed(2),
              "%"
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
              lineNumber: 71,
              columnNumber: 19
            }, void 0)
          ] }, void 0, true, {
            fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
            lineNumber: 69,
            columnNumber: 17
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-sm replace-text-gray-500", children: "Significant" }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
              lineNumber: 74,
              columnNumber: 19
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: `font-bold ${variant.isSignificant ? "text-green-600" : "replace-text-gray-400"}`, children: variant.isSignificant ? "✓ Yes" : "✗ No" }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
              lineNumber: 75,
              columnNumber: 19
            }, void 0)
          ] }, void 0, true, {
            fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
            lineNumber: 73,
            columnNumber: 17
          }, void 0)
        ] }, void 0, true, {
          fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
          lineNumber: 64,
          columnNumber: 15
        }, void 0)
      ] }, variant.id, true, {
        fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
        lineNumber: 55,
        columnNumber: 13
      }, void 0)) }, void 0, false, {
        fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
        lineNumber: 53,
        columnNumber: 9
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center space-x-2", children: isRunning ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "button",
          {
            onClick: () => pauseTest(testId),
            className: "px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 focus-visible:bg-yellow-600 transition-colors",
            children: "Pause Test"
          },
          void 0,
          false,
          {
            fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
            lineNumber: 88,
            columnNumber: 15
          },
          void 0
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "button",
          {
            onClick: () => stopTest(testId),
            className: "px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus-visible:bg-red-600 transition-colors",
            children: "Stop Test"
          },
          void 0,
          false,
          {
            fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
            lineNumber: 94,
            columnNumber: 15
          },
          void 0
        )
      ] }, void 0, true, {
        fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
        lineNumber: 87,
        columnNumber: 13
      }, void 0) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "button",
        {
          onClick: () => startTest(testId),
          className: "px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus-visible:bg-green-600 transition-colors",
          children: "Start Test"
        },
        void 0,
        false,
        {
          fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
          lineNumber: 102,
          columnNumber: 13
        },
        void 0
      ) }, void 0, false, {
        fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
        lineNumber: 85,
        columnNumber: 9
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
      lineNumber: 30,
      columnNumber: 7
    }, void 0);
  };
  const CreateTestForm = () => {
    const [formData, setFormData] = reactExports.useState({
      name: "",
      description: "",
      variants: [
        { id: "control", name: "Control", weight: 50, config: {} },
        { id: "variant_a", name: "Variant A", weight: 50, config: {} }
      ],
      conversionGoals: ["form_submission"],
      trafficSplit: [50, 50]
    });
    const handleSubmit = (e) => {
      e.preventDefault();
      createTest({
        name: formData.name,
        description: formData.description,
        variants: formData.variants,
        status: "draft",
        trafficSplit: formData.trafficSplit,
        conversionGoals: formData.conversionGoals,
        startDate: /* @__PURE__ */ new Date()
      });
      setActiveTab("tests");
    };
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Test Name" }, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
          lineNumber: 144,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "input",
          {
            type: "text",
            value: formData.name,
            onChange: (e) => setFormData({ ...formData, name: e.target.value }),
            className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
            required: true
          },
          void 0,
          false,
          {
            fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
            lineNumber: 145,
            columnNumber: 11
          },
          void 0
        )
      ] }, void 0, true, {
        fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
        lineNumber: 143,
        columnNumber: 9
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Description" }, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
          lineNumber: 155,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "textarea",
          {
            value: formData.description,
            onChange: (e) => setFormData({ ...formData, description: e.target.value }),
            className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
            rows: 3,
            required: true
          },
          void 0,
          false,
          {
            fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
            lineNumber: 156,
            columnNumber: 11
          },
          void 0
        )
      ] }, void 0, true, {
        fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
        lineNumber: 154,
        columnNumber: 9
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Variants" }, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
          lineNumber: 166,
          columnNumber: 11
        }, void 0),
        formData.variants.map((variant, index) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center space-x-4 mb-3", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "input",
            {
              type: "text",
              value: variant.name,
              onChange: (e) => {
                const newVariants = [...formData.variants];
                newVariants[index].name = e.target.value;
                setFormData({ ...formData, variants: newVariants });
              },
              className: "flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
              placeholder: "Variant name"
            },
            void 0,
            false,
            {
              fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
              lineNumber: 169,
              columnNumber: 15
            },
            void 0
          ),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "input",
            {
              type: "number",
              value: variant.weight,
              onChange: (e) => {
                const newVariants = [...formData.variants];
                newVariants[index].weight = parseInt(e.target.value);
                const newTrafficSplit = [...formData.trafficSplit];
                newTrafficSplit[index] = parseInt(e.target.value);
                setFormData({ ...formData, variants: newVariants, trafficSplit: newTrafficSplit });
              },
              className: "w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
              min: "0",
              max: "100"
            },
            void 0,
            false,
            {
              fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
              lineNumber: 180,
              columnNumber: 15
            },
            void 0
          ),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-sm replace-text-gray-500", children: "%" }, void 0, false, {
            fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
            lineNumber: 194,
            columnNumber: 15
          }, void 0)
        ] }, variant.id, true, {
          fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
          lineNumber: 168,
          columnNumber: 13
        }, void 0))
      ] }, void 0, true, {
        fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
        lineNumber: 165,
        columnNumber: 9
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "button",
        {
          type: "submit",
          className: "w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus-visible:bg-blue-600 transition-colors font-medium",
          children: "Create Test"
        },
        void 0,
        false,
        {
          fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
          lineNumber: 199,
          columnNumber: 9
        },
        void 0
      )
    ] }, void 0, true, {
      fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
      lineNumber: 142,
      columnNumber: 7
    }, void 0);
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "fixed inset-0 bg-black/50 backdrop-blur-sm z-[80] flex items-center justify-center p-4", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-white rounded-2xl shadow-2xl max-w-6xl w-full h-[90vh] flex flex-col", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between p-6 border-b border-gray-200", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "text-2xl font-bold text-gray-900", children: "A/B Testing Dashboard" }, void 0, false, {
        fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
        lineNumber: 214,
        columnNumber: 11
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "button",
        {
          onClick: onClose,
          className: "w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 focus-visible:bg-gray-200 flex items-center justify-center transition-colors",
          children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("svg", { className: "w-5 h-5 replace-text-gray-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M6 18L18 6M6 6l12 12" }, void 0, false, {
            fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
            lineNumber: 220,
            columnNumber: 15
          }, void 0) }, void 0, false, {
            fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
            lineNumber: 219,
            columnNumber: 13
          }, void 0)
        },
        void 0,
        false,
        {
          fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
          lineNumber: 215,
          columnNumber: 11
        },
        void 0
      )
    ] }, void 0, true, {
      fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
      lineNumber: 213,
      columnNumber: 9
    }, void 0),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex border-b border-gray-200", children: [
      { id: "overview", label: "Overview", icon: "📊" },
      { id: "tests", label: "Active Tests", icon: "🧪" },
      { id: "analytics", label: "Analytics", icon: "📈" },
      { id: "create", label: "Create Test", icon: "➕" }
    ].map((tab) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "button",
      {
        onClick: () => setActiveTab(tab.id),
        className: `px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.id ? "border-blue-500 text-blue-accessible" : "border-transparent replace-text-gray-500 hover:text-gray-700 focus-visible:text-gray-700"}`,
        children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "mr-2", children: tab.icon }, void 0, false, {
            fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
            lineNumber: 242,
            columnNumber: 15
          }, void 0),
          tab.label
        ]
      },
      tab.id,
      true,
      {
        fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
        lineNumber: 233,
        columnNumber: 13
      },
      void 0
    )) }, void 0, false, {
      fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
      lineNumber: 226,
      columnNumber: 9
    }, void 0),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex-1 overflow-y-auto p-6", children: [
      activeTab === "overview" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-blue-50 border border-blue-200 rounded-lg p-6", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-lg font-bold text-blue-900 mb-2", children: "Active Tests" }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
              lineNumber: 255,
              columnNumber: 19
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-3xl font-black text-blue-700", children: activeTests.filter((t) => t.status === "running").length }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
              lineNumber: 256,
              columnNumber: 19
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm text-blue-accessible", children: "Currently running" }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
              lineNumber: 259,
              columnNumber: 19
            }, void 0)
          ] }, void 0, true, {
            fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
            lineNumber: 254,
            columnNumber: 17
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-green-50 border border-green-200 rounded-lg p-6", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-lg font-bold text-green-900 mb-2", children: "Total Participants" }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
              lineNumber: 263,
              columnNumber: 19
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-3xl font-black text-green-700", children: activeTests.reduce((sum, test) => sum + test.metrics.participants, 0) }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
              lineNumber: 264,
              columnNumber: 19
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm text-green-600", children: "Across all tests" }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
              lineNumber: 267,
              columnNumber: 19
            }, void 0)
          ] }, void 0, true, {
            fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
            lineNumber: 262,
            columnNumber: 17
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-orange-50 border border-orange-200 rounded-lg p-6", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-lg font-bold text-orange-900 mb-2", children: "Conversions" }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
              lineNumber: 271,
              columnNumber: 19
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-3xl font-black text-orange-700", children: activeTests.reduce(
              (sum, test) => sum + Object.values(test.metrics.conversions).reduce((a, b) => a + b, 0),
              0
            ) }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
              lineNumber: 272,
              columnNumber: 19
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm text-orange-accessible", children: "Total conversions" }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
              lineNumber: 277,
              columnNumber: 19
            }, void 0)
          ] }, void 0, true, {
            fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
            lineNumber: 270,
            columnNumber: 17
          }, void 0)
        ] }, void 0, true, {
          fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
          lineNumber: 253,
          columnNumber: 15
        }, void 0),
        session && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-gray-50 border border-gray-200 rounded-lg p-6", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-lg font-bold text-gray-900 mb-4", children: "Current Session" }, void 0, false, {
            fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
            lineNumber: 284,
            columnNumber: 19
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 text-sm", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "font-medium replace-text-gray-600", children: "Session ID:" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
                lineNumber: 287,
                columnNumber: 23
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "font-mono text-xs", children: [
                session.id.slice(0, 8),
                "..."
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
                lineNumber: 288,
                columnNumber: 23
              }, void 0)
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
              lineNumber: 286,
              columnNumber: 21
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "font-medium replace-text-gray-600", children: "Lead Score:" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
                lineNumber: 291,
                columnNumber: 23
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "font-bold", children: session.leadScore?.total || "Not scored" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
                lineNumber: 292,
                columnNumber: 23
              }, void 0)
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
              lineNumber: 290,
              columnNumber: 21
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "font-medium replace-text-gray-600", children: "Page Views:" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
                lineNumber: 295,
                columnNumber: 23
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "font-bold", children: session.behavioralData.pageViews }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
                lineNumber: 296,
                columnNumber: 23
              }, void 0)
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
              lineNumber: 294,
              columnNumber: 21
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "font-medium replace-text-gray-600", children: "Time on Site:" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
                lineNumber: 299,
                columnNumber: 23
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "font-bold", children: [
                Math.round(session.behavioralData.timeOnSite),
                "s"
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
                lineNumber: 300,
                columnNumber: 23
              }, void 0)
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
              lineNumber: 298,
              columnNumber: 21
            }, void 0)
          ] }, void 0, true, {
            fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
            lineNumber: 285,
            columnNumber: 19
          }, void 0)
        ] }, void 0, true, {
          fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
          lineNumber: 283,
          columnNumber: 17
        }, void 0)
      ] }, void 0, true, {
        fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
        lineNumber: 252,
        columnNumber: 13
      }, void 0),
      activeTab === "tests" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-xl font-bold text-gray-900", children: "Active A/B Tests" }, void 0, false, {
            fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
            lineNumber: 312,
            columnNumber: 17
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "button",
            {
              onClick: () => setActiveTab("create"),
              className: "px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus-visible:bg-blue-600 transition-colors",
              children: "Create New Test"
            },
            void 0,
            false,
            {
              fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
              lineNumber: 313,
              columnNumber: 17
            },
            void 0
          )
        ] }, void 0, true, {
          fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
          lineNumber: 311,
          columnNumber: 15
        }, void 0),
        activeTests.map((test) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TestResults, { testId: test.id }, test.id, false, {
          fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
          lineNumber: 322,
          columnNumber: 17
        }, void 0))
      ] }, void 0, true, {
        fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
        lineNumber: 310,
        columnNumber: 13
      }, void 0),
      activeTab === "analytics" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-xl font-bold text-gray-900", children: "Conversion Analytics" }, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
          lineNumber: 330,
          columnNumber: 15
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-white border border-gray-200 rounded-lg p-6", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "text-lg font-bold text-gray-900 mb-4", children: "Conversion Funnel" }, void 0, false, {
            fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
            lineNumber: 334,
            columnNumber: 17
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-3", children: getConversionFunnelData().map((step, index) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: `w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step.completed ? "bg-green-500 text-white" : "bg-gray-300 replace-text-gray-600"}`, children: index + 1 }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
              lineNumber: 338,
              columnNumber: 23
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "ml-4 flex-1", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "font-medium", children: step.name }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
                lineNumber: 344,
                columnNumber: 25
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-sm replace-text-gray-600", children: step.description }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
                lineNumber: 345,
                columnNumber: 25
              }, void 0)
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
              lineNumber: 343,
              columnNumber: 23
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: `px-3 py-1 rounded-full text-xs font-bold ${step.completed ? "bg-green-100 text-green-800" : "bg-gray-100 replace-text-gray-600"}`, children: step.completed ? "Completed" : "Pending" }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
              lineNumber: 347,
              columnNumber: 23
            }, void 0)
          ] }, step.id, true, {
            fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
            lineNumber: 337,
            columnNumber: 21
          }, void 0)) }, void 0, false, {
            fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
            lineNumber: 335,
            columnNumber: 17
          }, void 0)
        ] }, void 0, true, {
          fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
          lineNumber: 333,
          columnNumber: 15
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-white border border-gray-200 rounded-lg p-6", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "text-lg font-bold text-gray-900 mb-4", children: "Behavioral Insights" }, void 0, false, {
            fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
            lineNumber: 359,
            columnNumber: 17
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: (() => {
            const insights = getBehavioralInsights();
            return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-2xl font-bold text-blue-accessible", children: insights.pageViews }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
                  lineNumber: 366,
                  columnNumber: 27
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-sm replace-text-gray-600", children: "Page Views" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
                  lineNumber: 367,
                  columnNumber: 27
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
                lineNumber: 365,
                columnNumber: 25
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-2xl font-bold text-green-600", children: [
                  Math.round(insights.timeOnSite),
                  "s"
                ] }, void 0, true, {
                  fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
                  lineNumber: 370,
                  columnNumber: 27
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-sm replace-text-gray-600", children: "Time on Site" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
                  lineNumber: 371,
                  columnNumber: 27
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
                lineNumber: 369,
                columnNumber: 25
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-2xl font-bold text-orange-accessible", children: [
                  insights.scrollDepth,
                  "%"
                ] }, void 0, true, {
                  fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
                  lineNumber: 374,
                  columnNumber: 27
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-sm replace-text-gray-600", children: "Scroll Depth" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
                  lineNumber: 375,
                  columnNumber: 27
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
                lineNumber: 373,
                columnNumber: 25
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-2xl font-bold text-purple-600", children: insights.interactions.length }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
                  lineNumber: 378,
                  columnNumber: 27
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-sm replace-text-gray-600", children: "Interactions" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
                  lineNumber: 379,
                  columnNumber: 27
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
                lineNumber: 377,
                columnNumber: 25
              }, void 0)
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
              lineNumber: 364,
              columnNumber: 23
            }, void 0);
          })() }, void 0, false, {
            fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
            lineNumber: 360,
            columnNumber: 17
          }, void 0)
        ] }, void 0, true, {
          fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
          lineNumber: 358,
          columnNumber: 15
        }, void 0)
      ] }, void 0, true, {
        fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
        lineNumber: 329,
        columnNumber: 13
      }, void 0),
      activeTab === "create" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-xl font-bold text-gray-900 mb-6", children: "Create New A/B Test" }, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
          lineNumber: 392,
          columnNumber: 15
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CreateTestForm, {}, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
          lineNumber: 393,
          columnNumber: 15
        }, void 0)
      ] }, void 0, true, {
        fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
        lineNumber: 391,
        columnNumber: 13
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
      lineNumber: 249,
      columnNumber: 9
    }, void 0)
  ] }, void 0, true, {
    fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
    lineNumber: 211,
    columnNumber: 7
  }, void 0) }, void 0, false, {
    fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
    lineNumber: 210,
    columnNumber: 5
  }, void 0);
};
const ABTestingDashboardTrigger = () => {
  const [showDashboard, setShowDashboard] = reactExports.useState(false);
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "button",
      {
        onClick: () => setShowDashboard(true),
        className: "fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 focus-visible:bg-blue-600 transition-colors z-50",
        title: "Open A/B Testing Dashboard",
        children: "📊"
      },
      void 0,
      false,
      {
        fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
        lineNumber: 411,
        columnNumber: 7
      },
      void 0
    ),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      ABTestingDashboard,
      {
        isVisible: showDashboard,
        onClose: () => setShowDashboard(false)
      },
      void 0,
      false,
      {
        fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
        lineNumber: 419,
        columnNumber: 7
      },
      void 0
    )
  ] }, void 0, true, {
    fileName: "/home/ian/projects/reboot/src/components/ABTestingDashboard.tsx",
    lineNumber: 410,
    columnNumber: 5
  }, void 0);
};
const MobileStickyBar = () => {
  const [isVisible, setIsVisible] = reactExports.useState(false);
  const [scrollDirection, setScrollDirection] = reactExports.useState("down");
  const lastScrollY = reactExports.useRef(0);
  const {
    personalization,
    shouldShowUrgency,
    trackInteraction,
    leadScore
  } = useConversionOptimization();
  const { ctaText, trackClick } = useCTAOptimization();
  const isMobile = window.innerWidth <= 768;
  if (!isMobile) return null;
  reactExports.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollThreshold = 200;
      if (currentScrollY > lastScrollY.current) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }
      lastScrollY.current = currentScrollY;
      const shouldShow = currentScrollY > scrollThreshold && scrollDirection === "up";
      setIsVisible(shouldShow);
    };
    const throttledScroll = throttle(handleScroll, 100);
    window.addEventListener("scroll", throttledScroll, { passive: true });
    return () => window.removeEventListener("scroll", throttledScroll);
  }, [scrollDirection]);
  const handleCTAClick = () => {
    trackClick("mobile_sticky_bar");
    trackInteraction({
      type: "click",
      element: "mobile_sticky_cta",
      value: "clicked",
      metadata: {
        scrollY: window.scrollY,
        leadTier: leadScore?.tier || "Unqualified"
      }
    });
  };
  const getCtaColor = () => {
    switch (leadScore?.tier) {
      case "Hot":
        return "bg-gradient-to-r from-red-500 to-orange-500 animate-pulse";
      case "Warm":
        return "bg-gradient-to-r from-orange-500 to-orange-600";
      case "Cold":
        return "bg-gradient-to-r from-blue-500 to-blue-600";
      default:
        return "bg-gradient-to-r from-gray-600 to-gray-700";
    }
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "div",
    {
      className: `fixed bottom-0 left-0 right-0 z-50 transform transition-transform duration-300 ${isVisible ? "translate-y-0" : "translate-y-full"}`,
      children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-white border-t-2 border-gray-200 shadow-2xl p-4", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex-1 mr-4", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-sm font-bold text-gray-900", children: shouldShowUrgency() ? "🔥 Limited Time" : personalization.messaging.heroTitle.split(" ").slice(0, 3).join(" ") }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/components/MobileConversionOptimizer.tsx",
              lineNumber: 88,
              columnNumber: 13
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-xs replace-text-gray-600", children: shouldShowUrgency() ? "Priority response guaranteed" : "Free marketing analysis" }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/components/MobileConversionOptimizer.tsx",
              lineNumber: 91,
              columnNumber: 13
            }, void 0)
          ] }, void 0, true, {
            fileName: "/home/ian/projects/reboot/src/components/MobileConversionOptimizer.tsx",
            lineNumber: 87,
            columnNumber: 11
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "button",
            {
              onClick: handleCTAClick,
              className: `px-6 py-3 rounded-lg font-bold text-white shadow-lg transform active:scale-95 transition-all ${getCtaColor()}`,
              children: ctaText
            },
            void 0,
            false,
            {
              fileName: "/home/ian/projects/reboot/src/components/MobileConversionOptimizer.tsx",
              lineNumber: 95,
              columnNumber: 11
            },
            void 0
          )
        ] }, void 0, true, {
          fileName: "/home/ian/projects/reboot/src/components/MobileConversionOptimizer.tsx",
          lineNumber: 86,
          columnNumber: 9
        }, void 0),
        shouldShowUrgency() && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-2 text-center text-xs text-orange-accessible font-medium", children: "⚡ Response within 1 hour for qualified leads" }, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/components/MobileConversionOptimizer.tsx",
          lineNumber: 104,
          columnNumber: 11
        }, void 0)
      ] }, void 0, true, {
        fileName: "/home/ian/projects/reboot/src/components/MobileConversionOptimizer.tsx",
        lineNumber: 85,
        columnNumber: 7
      }, void 0)
    },
    void 0,
    false,
    {
      fileName: "/home/ian/projects/reboot/src/components/MobileConversionOptimizer.tsx",
      lineNumber: 80,
      columnNumber: 5
    },
    void 0
  );
};
const MobileExitIntentDetector = () => {
  const { showExitIntent, trackInteraction } = useConversionOptimization();
  const touchStartRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    let rapidBackPresses = 0;
    let backPressTimer;
    const handleTouchStart = (e) => {
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        time: Date.now()
      };
    };
    const handleTouchEnd = (e) => {
      if (!touchStartRef.current) return;
      const touchEnd = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY,
        time: Date.now()
      };
      const deltaX = touchEnd.x - touchStartRef.current.x;
      const deltaY = touchEnd.y - touchStartRef.current.y;
      const deltaTime = touchEnd.time - touchStartRef.current.time;
      if (deltaY < -100 && // Swipe up
      Math.abs(deltaX) < 50 && // Mostly vertical
      deltaTime < 300 && // Fast swipe
      touchStartRef.current.y > window.innerHeight * 0.8) {
        trackInteraction({
          type: "scroll",
          element: "mobile_exit_swipe",
          value: "up_swipe",
          metadata: { deltaY, deltaTime, startY: touchStartRef.current.y }
        });
        showExitIntent();
      }
      touchStartRef.current = null;
    };
    const handlePopState = () => {
      rapidBackPresses++;
      if (rapidBackPresses === 1) {
        backPressTimer = setTimeout(() => {
          rapidBackPresses = 0;
        }, 2e3);
      } else if (rapidBackPresses === 2) {
        clearTimeout(backPressTimer);
        rapidBackPresses = 0;
        trackInteraction({
          type: "click",
          element: "mobile_back_button",
          value: "rapid_back",
          metadata: { pattern: "double_back" }
        });
        showExitIntent();
      }
    };
    document.addEventListener("touchstart", handleTouchStart, { passive: true });
    document.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("popstate", handlePopState);
    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("popstate", handlePopState);
      if (backPressTimer) clearTimeout(backPressTimer);
    };
  }, [showExitIntent, trackInteraction]);
  return null;
};
const MobileScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = reactExports.useState(0);
  const { trackScrollDepth } = useConversionOptimization();
  reactExports.useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollTop / docHeight * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
      trackScrollDepth(progress);
    };
    const throttledScroll = throttle(handleScroll, 100);
    window.addEventListener("scroll", throttledScroll, { passive: true });
    return () => window.removeEventListener("scroll", throttledScroll);
  }, [trackScrollDepth]);
  if (window.innerWidth > 768) return null;
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "fixed top-0 left-0 right-0 z-40 h-1 bg-gray-200", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "div",
    {
      className: "h-full bg-gradient-to-r from-blue-500 to-orange-500 transition-all duration-300",
      style: { width: `${scrollProgress}%` }
    },
    void 0,
    false,
    {
      fileName: "/home/ian/projects/reboot/src/components/MobileConversionOptimizer.tsx",
      lineNumber: 350,
      columnNumber: 7
    },
    void 0
  ) }, void 0, false, {
    fileName: "/home/ian/projects/reboot/src/components/MobileConversionOptimizer.tsx",
    lineNumber: 349,
    columnNumber: 5
  }, void 0);
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
const mobileStyles = `
  .mobile-pricing-optimizer .pricing-card {
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
  }

  .mobile-form-optimizer input,
  .mobile-form-optimizer textarea {
    font-size: 16px; /* Prevent zoom on iOS */
    -webkit-appearance: none;
    border-radius: 8px;
  }

  .mobile-form-optimizer.keyboard-open {
    transform: translateY(-25px);
  }

  .mobile-cta-animator {
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
  }

  @media (max-width: 768px) {
    .mobile-sticky-bar-enter {
      animation: slideUpMobile 0.3s ease-out;
    }
    
    .mobile-sticky-bar-exit {
      animation: slideDownMobile 0.3s ease-in;
    }
  }

  @keyframes slideUpMobile {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }

  @keyframes slideDownMobile {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(100%);
    }
  }
`;
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = mobileStyles;
  document.head.appendChild(styleSheet);
}
const lostItems = [
  "Revenue",
  // Primary concern for $500K-$1.5M companies
  "Growth",
  // Hitting growth plateaus is key pain point
  "Customers",
  // Customer acquisition/retention
  "Market Share",
  // Competitive positioning
  "Sales",
  // Psychology-driven approach focus
  "Opportunities",
  // Missing market opportunities
  "Momentum",
  // Business velocity
  "Competitive Edge",
  // Marketing excellence
  "Brand Value",
  // Premium positioning
  "Profit Margins",
  // Cost efficiency
  "Time",
  // Strategic vs tactical focus
  "Direction",
  // Scattered marketing efforts
  "Clarity",
  // Curse of knowledge problem
  "Trust",
  // Customer trust signals
  "Authority",
  // Market leadership
  "Scalability",
  // Sustainable growth systems
  "Innovation"
  // Modern vs traditional approaches
];
const MainApp = () => {
  const [typedWord, setTypedWord] = reactExports.useState("");
  const [wordIndex, setWordIndex] = reactExports.useState(0);
  const [isDeleting, setIsDeleting] = reactExports.useState(false);
  const { setShowDropdownForm } = useLeadForm();
  const reportError = useErrorReporter();
  usePricingOptimization();
  useScrollOptimization();
  useTimeBasedOptimization();
  useClickHeatmap();
  useCoreWebVitals();
  reactExports.useEffect(() => {
    const handleUnhandledRejection = (event) => {
      reportError(new Error(`Unhandled Promise Rejection: ${event.reason}`), {
        type: "promise_rejection",
        reason: event.reason
      });
    };
    window.addEventListener("unhandledrejection", handleUnhandledRejection);
    return () => window.removeEventListener("unhandledrejection", handleUnhandledRejection);
  }, [reportError]);
  reactExports.useEffect(() => {
    const currentWord = lostItems[wordIndex];
    const cycleCount = Math.floor(wordIndex / lostItems.length);
    const baseTypeSpeed = isDeleting ? 50 : 100;
    const basePauseTime = 1500;
    const cycleDelay = Math.min(cycleCount * 500, 2e3);
    const typeSpeed = baseTypeSpeed + cycleCount * 20;
    const pauseTime = basePauseTime + cycleDelay;
    const timer = setTimeout(() => {
      if (!isDeleting && typedWord.length < currentWord.length) {
        setTypedWord(currentWord.slice(0, typedWord.length + 1));
      } else if (isDeleting && typedWord.length > 0) {
        setTypedWord(typedWord.slice(0, -1));
      } else if (!isDeleting && typedWord.length === currentWord.length) {
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && typedWord.length === 0) {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % lostItems.length);
      }
    }, typeSpeed);
    return () => clearTimeout(timer);
  }, [typedWord, wordIndex, isDeleting]);
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ErrorBoundary, { level: "component", name: "SEOComponents", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        SEOHead,
        {
          title: "Fractional CMO Services | Marketing Psychology That Converts | Reboot Media",
          description: "Break through revenue plateaus with psychology-driven fractional CMO services. Transform $500K-$1.5M companies into scalable enterprises. Proven $100K→$3M growth.",
          keywords: "fractional CMO, marketing psychology, revenue growth, growth plateau solutions, marketing strategy consultant",
          canonicalUrl: getCanonicalUrl("")
        },
        void 0,
        false,
        {
          fileName: "/home/ian/projects/reboot/src/App.tsx",
          lineNumber: 119,
          columnNumber: 9
        },
        void 0
      ),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SchemaMarkup, { type: "organization" }, void 0, false, {
        fileName: "/home/ian/projects/reboot/src/App.tsx",
        lineNumber: 125,
        columnNumber: 9
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/ian/projects/reboot/src/App.tsx",
      lineNumber: 118,
      columnNumber: 7
    }, void 0),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "homepage min-h-screen relative overflow-hidden", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ErrorBoundary, { level: "component", name: "BackgroundGradient", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(BackgroundGradient, {}, void 0, false, {
        fileName: "/home/ian/projects/reboot/src/App.tsx",
        lineNumber: 131,
        columnNumber: 11
      }, void 0) }, void 0, false, {
        fileName: "/home/ian/projects/reboot/src/App.tsx",
        lineNumber: 130,
        columnNumber: 9
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "relative z-10", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ErrorBoundary, { level: "component", name: "GlobalHeader", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(GlobalHeader, { onShowForm: () => setShowDropdownForm(true) }, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/App.tsx",
          lineNumber: 137,
          columnNumber: 13
        }, void 0) }, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/App.tsx",
          lineNumber: 136,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { id: "home", className: "min-h-screen flex items-center relative overflow-hidden", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute inset-0 pointer-events-none", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute top-20 left-10 w-20 h-20 bg-orange-400/20 rounded-full blur-xl" }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/App.tsx",
              lineNumber: 144,
              columnNumber: 11
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute top-40 right-20 w-32 h-32 bg-stone-400/10 rounded-full blur-2xl" }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/App.tsx",
              lineNumber: 145,
              columnNumber: 11
            }, void 0)
          ] }, void 0, true, {
            fileName: "/home/ian/projects/reboot/src/App.tsx",
            lineNumber: 143,
            columnNumber: 9
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-full py-8", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h1", { className: "heading-hero text-critical mb-6", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "block", children: "Stop Losing" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/App.tsx",
                lineNumber: 152,
                columnNumber: 13
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "block text-orange-500", children: [
                typedWord,
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "animate-blink", children: "|" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 154,
                  columnNumber: 26
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/App.tsx",
                lineNumber: 153,
                columnNumber: 13
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "block", children: [
                "to ",
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-white line-through decoration-red-500 decoration-4", children: "Broken" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 156,
                  columnNumber: 40
                }, void 0),
                " Marketing"
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/App.tsx",
                lineNumber: 156,
                columnNumber: 13
              }, void 0)
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/App.tsx",
              lineNumber: 151,
              columnNumber: 11
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xl text-standard max-w-4xl mx-auto mb-8", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-white/90", children: "Stop fumbling with amateur advice. Get" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/App.tsx",
                lineNumber: 161,
                columnNumber: 13
              }, void 0),
              " ",
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "font-bold text-important", children: "battle-tested strategies proven at Fortune 500 companies" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/App.tsx",
                lineNumber: 161,
                columnNumber: 91
              }, void 0),
              " ",
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-white/90", children: "that drive explosive growth" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/App.tsx",
                lineNumber: 161,
                columnNumber: 198
              }, void 0)
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/App.tsx",
              lineNumber: 160,
              columnNumber: 11
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "button",
              {
                onClick: () => {
                  analytics.ctaClick("Show Me What's Broken in My Marketing", "hero");
                  setShowDropdownForm(true);
                },
                className: "cta-primary px-8 sm:px-12 py-4 rounded-xl font-black text-lg sm:text-xl transition-all duration-300 transform hover:scale-105 focus-visible:scale-105 shadow-2xl inline-flex items-center gap-3",
                children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-2xl", children: "🔍" }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/App.tsx",
                    lineNumber: 173,
                    columnNumber: 15
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: "Show Me What's Broken in My Marketing" }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/App.tsx",
                    lineNumber: 174,
                    columnNumber: 15
                  }, void 0)
                ]
              },
              void 0,
              true,
              {
                fileName: "/home/ian/projects/reboot/src/App.tsx",
                lineNumber: 166,
                columnNumber: 13
              },
              void 0
            ) }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/App.tsx",
              lineNumber: 165,
              columnNumber: 11
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "group relative bg-white/90 backdrop-blur-sm border-l-4 border-orange-500 rounded-r-xl p-5 shadow-lg hover:shadow-xl focus-visible:shadow-xl transition-all duration-300 hover:scale-105 focus-visible:scale-105 cursor-pointer", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-2xl font-black text-important mb-1", children: "30X Growth" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 182,
                  columnNumber: 17
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-sm text-standard font-medium leading-tight", children: "Companies see explosive revenue growth when psychology replaces guesswork" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 183,
                  columnNumber: 17
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/App.tsx",
                lineNumber: 181,
                columnNumber: 15
              }, void 0) }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/App.tsx",
                lineNumber: 180,
                columnNumber: 13
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "group relative bg-white/90 backdrop-blur-sm border-l-4 border-blue-500 rounded-r-xl p-5 shadow-lg hover:shadow-xl focus-visible:shadow-xl transition-all duration-300 hover:scale-105 focus-visible:scale-105 cursor-pointer", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-2xl font-black text-slate-900 mb-1", children: "Stop the Bleed" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 191,
                  columnNumber: 17
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-sm text-slate-700 font-medium leading-tight", children: "Finally understand why customers don't buy, instead of wondering why" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 192,
                  columnNumber: 17
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/App.tsx",
                lineNumber: 190,
                columnNumber: 15
              }, void 0) }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/App.tsx",
                lineNumber: 189,
                columnNumber: 13
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "group relative bg-white/90 backdrop-blur-sm border-l-4 border-green-500 rounded-r-xl p-5 shadow-lg hover:shadow-xl focus-visible:shadow-xl transition-all duration-300 hover:scale-105 focus-visible:scale-105 cursor-pointer", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-2xl font-black text-slate-900 mb-1", children: "Sleep Better" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 200,
                  columnNumber: 17
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-sm text-slate-700 font-medium leading-tight", children: "No more throwing money at marketing that doesn't bring customers" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 201,
                  columnNumber: 17
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/App.tsx",
                lineNumber: 199,
                columnNumber: 15
              }, void 0) }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/App.tsx",
                lineNumber: 198,
                columnNumber: 13
              }, void 0)
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/App.tsx",
              lineNumber: 179,
              columnNumber: 11
            }, void 0)
          ] }, void 0, true, {
            fileName: "/home/ian/projects/reboot/src/App.tsx",
            lineNumber: 149,
            columnNumber: 11
          }, void 0) }, void 0, false, {
            fileName: "/home/ian/projects/reboot/src/App.tsx",
            lineNumber: 148,
            columnNumber: 9
          }, void 0)
        ] }, void 0, true, {
          fileName: "/home/ian/projects/reboot/src/App.tsx",
          lineNumber: 141,
          columnNumber: 7
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { id: "psychology", className: "px-4 sm:px-6 lg:px-8", style: { paddingTop: "clamp(0.5rem, 1.5vw, 1rem)", paddingBottom: "clamp(3rem, 8vw, 5rem)" }, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "max-w-7xl mx-auto", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center mb-6 sm:mb-8", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "heading-xl text-critical mb-6 sm:mb-8", children: [
              "The ",
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-red-500", children: "$200K" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/App.tsx",
                lineNumber: 216,
                columnNumber: 19
              }, void 0),
              " Marketing Mistake"
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/App.tsx",
              lineNumber: 215,
              columnNumber: 13
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xl text-stone-700 max-w-3xl mx-auto leading-normal", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-white/90", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "font-bold", children: "73% of growing companies" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/App.tsx",
                lineNumber: 219,
                columnNumber: 47
              }, void 0),
              ` can't explain their value clearly to customers. They suffer from the "Curse of Knowledge" - knowing too much about their product to communicate it simply.`
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/App.tsx",
              lineNumber: 219,
              columnNumber: 15
            }, void 0) }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/App.tsx",
              lineNumber: 218,
              columnNumber: 13
            }, void 0)
          ] }, void 0, true, {
            fileName: "/home/ian/projects/reboot/src/App.tsx",
            lineNumber: 214,
            columnNumber: 11
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-16 items-center", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "order-2 lg:order-1", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-stone-200 transform -rotate-1", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-2xl font-bold text-slate-900 mb-6", children: "What Business Owners Say:" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/App.tsx",
                lineNumber: 227,
                columnNumber: 17
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-4 text-stone-700", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "italic", children: '"Our advanced AI-powered customer management platform leverages machine learning algorithms to deliver personalized experiences..."' }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 229,
                  columnNumber: 19
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-red-600 font-semibold", children: "❌ Customers don't understand this" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 230,
                  columnNumber: 19
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/App.tsx",
                lineNumber: 228,
                columnNumber: 17
              }, void 0)
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/App.tsx",
              lineNumber: 226,
              columnNumber: 15
            }, void 0) }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/App.tsx",
              lineNumber: 225,
              columnNumber: 13
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "order-1 lg:order-2", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-white/70 dark:bg-slate-800/70 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-xl border border-orange-200/30 dark:border-orange-400/30 transform rotate-1", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-2xl font-bold mb-6 text-white", children: "What Customers Hear:" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/App.tsx",
                lineNumber: 237,
                columnNumber: 17
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-4 text-stone-700", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "italic text-white/90", children: '"We help you stop losing customers and make more money from the ones you have."' }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 239,
                  columnNumber: 19
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-green-600 font-semibold", children: "✅ Clear, benefits-focused" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 240,
                  columnNumber: 19
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/App.tsx",
                lineNumber: 238,
                columnNumber: 17
              }, void 0)
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/App.tsx",
              lineNumber: 236,
              columnNumber: 15
            }, void 0) }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/App.tsx",
              lineNumber: 235,
              columnNumber: 13
            }, void 0)
          ] }, void 0, true, {
            fileName: "/home/ian/projects/reboot/src/App.tsx",
            lineNumber: 224,
            columnNumber: 11
          }, void 0)
        ] }, void 0, true, {
          fileName: "/home/ian/projects/reboot/src/App.tsx",
          lineNumber: 213,
          columnNumber: 9
        }, void 0) }, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/App.tsx",
          lineNumber: 212,
          columnNumber: 7
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { id: "psychology", className: "px-4 sm:px-6 lg:px-8", style: { paddingTop: "clamp(4rem, 10vw, 6rem)", paddingBottom: "clamp(4rem, 10vw, 6rem)" }, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "max-w-4xl mx-auto", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center mb-12", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "inline-flex items-center bg-blue-500/10 backdrop-blur-sm border border-blue-400/20 rounded-full px-4 py-2 mb-4", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("svg", { className: "w-4 h-4 text-blue-500 mr-2", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("path", { d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/App.tsx",
                lineNumber: 254,
                columnNumber: 17
              }, void 0) }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/App.tsx",
                lineNumber: 253,
                columnNumber: 15
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-blue-accessible text-sm font-semibold", children: "Common Question" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/App.tsx",
                lineNumber: 256,
                columnNumber: 15
              }, void 0)
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/App.tsx",
              lineNumber: 252,
              columnNumber: 13
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "heading-xl text-slate-900 mb-6", style: { marginTop: "0.25rem" }, children: [
              '"Do You Have Experience in ',
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-blue-accessible", children: "My Industry" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/App.tsx",
                lineNumber: 259,
                columnNumber: 42
              }, void 0),
              '?"'
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/App.tsx",
              lineNumber: 258,
              columnNumber: 13
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xl text-slate-600 mb-8", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-white/90", children: "This is the right question to ask. But the answer might surprise you..." }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/App.tsx",
              lineNumber: 262,
              columnNumber: 15
            }, void 0) }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/App.tsx",
              lineNumber: 261,
              columnNumber: 13
            }, void 0)
          ] }, void 0, true, {
            fileName: "/home/ian/projects/reboot/src/App.tsx",
            lineNumber: 251,
            columnNumber: 11
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "max-w-4xl mx-auto", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-12", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center mb-8", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "inline-flex items-center bg-red-100 rounded-full px-4 py-2 mb-4", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("svg", { className: "w-4 h-4 text-red-600 mr-2", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/App.tsx",
                    lineNumber: 274,
                    columnNumber: 21
                  }, void 0) }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/App.tsx",
                    lineNumber: 273,
                    columnNumber: 19
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-red-700 text-sm font-semibold", children: "The Problem" }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/App.tsx",
                    lineNumber: 276,
                    columnNumber: 19
                  }, void 0)
                ] }, void 0, true, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 272,
                  columnNumber: 17
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "heading-md text-red-700 mb-4", style: { marginTop: "0.25rem" }, children: "Why Industry Experts Often Fail" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 278,
                  columnNumber: 17
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/App.tsx",
                lineNumber: 271,
                columnNumber: 15
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-gradient-to-r from-slate-800 to-blue-900 text-white p-6 rounded-2xl", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "text-lg font-bold mb-3", children: "The Curse of Knowledge" }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/App.tsx",
                    lineNumber: 284,
                    columnNumber: 21
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "replace-text-gray-300 text-base leading-relaxed", children: "They're so deep in industry jargon they can't see what confuses customers" }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/App.tsx",
                    lineNumber: 285,
                    columnNumber: 21
                  }, void 0)
                ] }, void 0, true, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 283,
                  columnNumber: 19
                }, void 0) }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 282,
                  columnNumber: 17
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-gradient-to-r from-slate-800 to-blue-900 text-white p-6 rounded-2xl", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "text-lg font-bold mb-3", children: "Replicate Not Customize" }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/App.tsx",
                    lineNumber: 292,
                    columnNumber: 21
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "replace-text-gray-300 text-base leading-relaxed", children: "They copy what worked elsewhere instead of customizing for your unique market" }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/App.tsx",
                    lineNumber: 293,
                    columnNumber: 21
                  }, void 0)
                ] }, void 0, true, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 291,
                  columnNumber: 19
                }, void 0) }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 290,
                  columnNumber: 17
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/App.tsx",
                lineNumber: 281,
                columnNumber: 15
              }, void 0)
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/App.tsx",
              lineNumber: 270,
              columnNumber: 13
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-12", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center mb-8", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "inline-flex items-center bg-green-100 rounded-full px-4 py-2 mb-4", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("svg", { className: "w-4 h-4 text-green-600 mr-2", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/App.tsx",
                    lineNumber: 306,
                    columnNumber: 21
                  }, void 0) }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/App.tsx",
                    lineNumber: 305,
                    columnNumber: 19
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-green-700 text-sm font-semibold", children: "The Solution" }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/App.tsx",
                    lineNumber: 308,
                    columnNumber: 19
                  }, void 0)
                ] }, void 0, true, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 304,
                  columnNumber: 17
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "heading-md text-green-800 mb-4", style: { marginTop: "0.25rem" }, children: "The Fresh Eyes Advantage" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 310,
                  columnNumber: 17
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/App.tsx",
                lineNumber: 303,
                columnNumber: 15
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-gradient-to-r from-slate-800 to-blue-900 text-white p-6 rounded-2xl transition-all duration-300 hover:scale-105 focus-visible:scale-105 hover:shadow-lg focus-visible:shadow-lg cursor-pointer", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "text-lg font-bold mb-3", children: "Customer Perspective" }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/App.tsx",
                    lineNumber: 316,
                    columnNumber: 21
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "replace-text-gray-300 text-base leading-relaxed", children: "I ask the same questions your prospects do, spotting exactly where they get confused" }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/App.tsx",
                    lineNumber: 317,
                    columnNumber: 21
                  }, void 0)
                ] }, void 0, true, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 315,
                  columnNumber: 19
                }, void 0) }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 314,
                  columnNumber: 17
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-gradient-to-r from-slate-800 to-blue-900 text-white p-6 rounded-2xl transition-all duration-300 hover:scale-105 focus-visible:scale-105 hover:shadow-lg focus-visible:shadow-lg cursor-pointer", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "text-lg font-bold mb-3", children: "Question Everything" }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/App.tsx",
                    lineNumber: 324,
                    columnNumber: 21
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "replace-text-gray-300 text-base leading-relaxed", children: `While experts accept "how we've always done it," I ask "why?" and find new opportunities` }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/App.tsx",
                    lineNumber: 325,
                    columnNumber: 21
                  }, void 0)
                ] }, void 0, true, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 323,
                  columnNumber: 19
                }, void 0) }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 322,
                  columnNumber: 17
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-gradient-to-r from-slate-800 to-blue-900 text-white p-6 rounded-2xl transition-all duration-300 hover:scale-105 focus-visible:scale-105 hover:shadow-lg focus-visible:shadow-lg cursor-pointer", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "text-lg font-bold mb-3", children: "Executive Experience" }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/App.tsx",
                    lineNumber: 332,
                    columnNumber: 21
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "replace-text-gray-300 text-base leading-relaxed", children: "C-level strategies that work across industries - proven at 20+ US companies" }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/App.tsx",
                    lineNumber: 333,
                    columnNumber: 21
                  }, void 0)
                ] }, void 0, true, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 331,
                  columnNumber: 19
                }, void 0) }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 330,
                  columnNumber: 17
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/App.tsx",
                lineNumber: 313,
                columnNumber: 15
              }, void 0)
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/App.tsx",
              lineNumber: 302,
              columnNumber: 13
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 rounded-3xl p-8 md:p-12", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "max-w-5xl mx-auto", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8 items-center", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center lg:text-left", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-6", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("svg", { className: "w-4 h-4 mr-2", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("path", { d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/App.tsx",
                    lineNumber: 350,
                    columnNumber: 25
                  }, void 0) }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/App.tsx",
                    lineNumber: 349,
                    columnNumber: 23
                  }, void 0),
                  "Track Record"
                ] }, void 0, true, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 348,
                  columnNumber: 21
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-6", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-7xl font-black text-blue-accessible mb-2", children: "85%" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/App.tsx",
                      lineNumber: 357,
                      columnNumber: 25
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-blue-800 text-lg font-semibold leading-tight", children: 'of breakthrough results come from questioning "industry standards"' }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/App.tsx",
                      lineNumber: 358,
                      columnNumber: 25
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/App.tsx",
                    lineNumber: 356,
                    columnNumber: 23
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-white/70 rounded-2xl p-6 backdrop-blur-sm", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-2 gap-4 text-center", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-2xl font-black text-slate-700", children: "20+" }, void 0, false, {
                        fileName: "/home/ian/projects/reboot/src/App.tsx",
                        lineNumber: 366,
                        columnNumber: 29
                      }, void 0),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-xs text-slate-600 font-medium", children: "US Companies" }, void 0, false, {
                        fileName: "/home/ian/projects/reboot/src/App.tsx",
                        lineNumber: 367,
                        columnNumber: 29
                      }, void 0)
                    ] }, void 0, true, {
                      fileName: "/home/ian/projects/reboot/src/App.tsx",
                      lineNumber: 365,
                      columnNumber: 27
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-2xl font-black text-slate-700", children: "$2B+" }, void 0, false, {
                        fileName: "/home/ian/projects/reboot/src/App.tsx",
                        lineNumber: 370,
                        columnNumber: 29
                      }, void 0),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-xs text-slate-600 font-medium", children: "Revenue Managed" }, void 0, false, {
                        fileName: "/home/ian/projects/reboot/src/App.tsx",
                        lineNumber: 371,
                        columnNumber: 29
                      }, void 0)
                    ] }, void 0, true, {
                      fileName: "/home/ian/projects/reboot/src/App.tsx",
                      lineNumber: 369,
                      columnNumber: 27
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/App.tsx",
                    lineNumber: 364,
                    columnNumber: 25
                  }, void 0) }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/App.tsx",
                    lineNumber: 363,
                    columnNumber: 23
                  }, void 0)
                ] }, void 0, true, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 355,
                  columnNumber: 21
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/App.tsx",
                lineNumber: 347,
                columnNumber: 19
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-6", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "heading-lg text-slate-900 mb-4 leading-tight", children: [
                  "The Real Question Isn't",
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("br", {}, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/App.tsx",
                    lineNumber: 382,
                    columnNumber: 48
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-red-500 line-through decoration-4", children: '"Industry Experience"' }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/App.tsx",
                    lineNumber: 383,
                    columnNumber: 25
                  }, void 0)
                ] }, void 0, true, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 381,
                  columnNumber: 23
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white transform -rotate-1", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xl font-bold mb-3", children: `It's: "Can you see the opportunities I'm blind to?"` }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/App.tsx",
                    lineNumber: 387,
                    columnNumber: 25
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center space-x-2 text-orange-100", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-sm", children: "Fresh perspective + proven psychology" }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/App.tsx",
                    lineNumber: 391,
                    columnNumber: 27
                  }, void 0) }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/App.tsx",
                    lineNumber: 390,
                    columnNumber: 25
                  }, void 0)
                ] }, void 0, true, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 386,
                  columnNumber: 23
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-white/50 rounded-xl p-4 border-l-4 border-orange-500", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-slate-700 text-sm italic", children: [
                  `"The best consultants don't know your industry inside-out. They know `,
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { children: "customers" }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/App.tsx",
                    lineNumber: 398,
                    columnNumber: 37
                  }, void 0),
                  ' inside-out."'
                ] }, void 0, true, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 396,
                  columnNumber: 25
                }, void 0) }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 395,
                  columnNumber: 23
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/App.tsx",
                lineNumber: 380,
                columnNumber: 21
              }, void 0) }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/App.tsx",
                lineNumber: 379,
                columnNumber: 19
              }, void 0)
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/App.tsx",
              lineNumber: 344,
              columnNumber: 17
            }, void 0) }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/App.tsx",
              lineNumber: 343,
              columnNumber: 15
            }, void 0) }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/App.tsx",
              lineNumber: 342,
              columnNumber: 13
            }, void 0)
          ] }, void 0, true, {
            fileName: "/home/ian/projects/reboot/src/App.tsx",
            lineNumber: 266,
            columnNumber: 11
          }, void 0)
        ] }, void 0, true, {
          fileName: "/home/ian/projects/reboot/src/App.tsx",
          lineNumber: 250,
          columnNumber: 9
        }, void 0) }, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/App.tsx",
          lineNumber: 249,
          columnNumber: 7
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { id: "services", className: "px-4 sm:px-6 lg:px-8", style: { paddingTop: "clamp(3rem, 8vw, 5rem)", paddingBottom: "clamp(3rem, 8vw, 5rem)" }, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "max-w-7xl mx-auto", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center mb-6 sm:mb-8", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "heading-xl text-slate-900 mb-6 sm:mb-8", children: [
              "Fractional CMO",
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("br", {}, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/App.tsx",
                lineNumber: 418,
                columnNumber: 15
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-orange-500", children: "Executive" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/App.tsx",
                lineNumber: 419,
                columnNumber: 15
              }, void 0),
              " Services"
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/App.tsx",
              lineNumber: 416,
              columnNumber: 13
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xl text-stone-700 max-w-3xl mx-auto mb-4", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-white/90", children: "Strategic marketing leadership without the $300K+ salary commitment" }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/App.tsx",
              lineNumber: 422,
              columnNumber: 15
            }, void 0) }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/App.tsx",
              lineNumber: 421,
              columnNumber: 13
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-2xl p-6 max-w-4xl mx-auto mb-8", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col md:flex-row items-center justify-between text-center", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-4 md:mb-0", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-lg font-bold text-slate-900 mb-2", children: "Full-Time CMO Cost" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 429,
                  columnNumber: 19
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-3xl font-black text-red-600 line-through", children: "$300K+" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 430,
                  columnNumber: 19
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-sm text-red-700", children: "+ benefits, recruiting, risk" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 431,
                  columnNumber: 19
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/App.tsx",
                lineNumber: 428,
                columnNumber: 17
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-orange-500 text-4xl font-bold mx-8", children: "VS" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/App.tsx",
                lineNumber: 433,
                columnNumber: 17
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-lg font-bold text-slate-900 mb-2", children: "Fractional CMO" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 435,
                  columnNumber: 19
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-3xl font-black text-orange-500", children: "$5K-18K" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 436,
                  columnNumber: 19
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-sm text-orange-700", children: "immediate start, proven results" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 437,
                  columnNumber: 19
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/App.tsx",
                lineNumber: 434,
                columnNumber: 17
              }, void 0)
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/App.tsx",
              lineNumber: 427,
              columnNumber: 15
            }, void 0) }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/App.tsx",
              lineNumber: 426,
              columnNumber: 13
            }, void 0)
          ] }, void 0, true, {
            fileName: "/home/ian/projects/reboot/src/App.tsx",
            lineNumber: 415,
            columnNumber: 11
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ErrorBoundary, { level: "component", name: "EnhancedPricingCards", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(EnhancedPricingCards, {}, void 0, false, {
            fileName: "/home/ian/projects/reboot/src/App.tsx",
            lineNumber: 445,
            columnNumber: 13
          }, void 0) }, void 0, false, {
            fileName: "/home/ian/projects/reboot/src/App.tsx",
            lineNumber: 444,
            columnNumber: 11
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-12 text-center", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-gradient-to-r from-slate-800 to-blue-900 text-white p-8 rounded-3xl max-w-4xl mx-auto", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-2xl font-bold mb-4", children: "Why Fractional CMO Makes Sense" }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/App.tsx",
              lineNumber: 451,
              columnNumber: 15
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-3xl font-black text-orange-400 mb-2", children: "⚡" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 454,
                  columnNumber: 19
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "font-bold mb-1", children: "Immediate Impact" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 455,
                  columnNumber: 19
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "replace-text-gray-300 text-sm", children: "Start seeing results in weeks, not months" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 456,
                  columnNumber: 19
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/App.tsx",
                lineNumber: 453,
                columnNumber: 17
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-3xl font-black text-orange-400 mb-2", children: "💰" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 459,
                  columnNumber: 19
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "font-bold mb-1", children: "Better ROI" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 460,
                  columnNumber: 19
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "replace-text-gray-300 text-sm", children: "Pay for expertise, not overhead and recruiting" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 461,
                  columnNumber: 19
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/App.tsx",
                lineNumber: 458,
                columnNumber: 17
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-3xl font-black text-orange-400 mb-2", children: "🎯" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 464,
                  columnNumber: 19
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "font-bold mb-1", children: "Proven Systems" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 465,
                  columnNumber: 19
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "replace-text-gray-300 text-sm", children: "Battle-tested systems from 20+ years C-level experience" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 466,
                  columnNumber: 19
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/App.tsx",
                lineNumber: 463,
                columnNumber: 17
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-3xl font-black text-orange-400 mb-2", children: "💎" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 469,
                  columnNumber: 19
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "font-bold mb-1", children: "Equity Upside" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 470,
                  columnNumber: 19
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "replace-text-gray-300 text-sm", children: "Potential equity participation for long-term partnerships" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 471,
                  columnNumber: 19
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/App.tsx",
                lineNumber: 468,
                columnNumber: 17
              }, void 0)
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/App.tsx",
              lineNumber: 452,
              columnNumber: 15
            }, void 0)
          ] }, void 0, true, {
            fileName: "/home/ian/projects/reboot/src/App.tsx",
            lineNumber: 450,
            columnNumber: 13
          }, void 0) }, void 0, false, {
            fileName: "/home/ian/projects/reboot/src/App.tsx",
            lineNumber: 449,
            columnNumber: 11
          }, void 0)
        ] }, void 0, true, {
          fileName: "/home/ian/projects/reboot/src/App.tsx",
          lineNumber: 414,
          columnNumber: 9
        }, void 0) }, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/App.tsx",
          lineNumber: 413,
          columnNumber: 7
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { id: "about", className: "px-4 sm:px-6 lg:px-8", style: { paddingTop: "clamp(3rem, 8vw, 5rem)", paddingBottom: "clamp(3rem, 8vw, 5rem)" }, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "max-w-6xl mx-auto", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center mb-12", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "heading-xl text-slate-900 mb-6", children: [
              "Meet Your ",
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-blue-accessible", children: "C-Level Executive" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/App.tsx",
                lineNumber: 484,
                columnNumber: 25
              }, void 0),
              " Partner"
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/App.tsx",
              lineNumber: 483,
              columnNumber: 13
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xl text-slate-600 max-w-3xl mx-auto", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-white/95", children: "20+ years C-level experience driving measurable revenue growth at US companies" }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/App.tsx",
              lineNumber: 487,
              columnNumber: 15
            }, void 0) }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/App.tsx",
              lineNumber: 486,
              columnNumber: 13
            }, void 0)
          ] }, void 0, true, {
            fileName: "/home/ian/projects/reboot/src/App.tsx",
            lineNumber: 482,
            columnNumber: 11
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-16", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border border-white/20 dark:border-slate-700/20 rounded-3xl p-8 sm:p-12 shadow-2xl", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8 items-center", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center lg:col-span-1", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-8 text-white shadow-xl", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-5xl font-black mb-2", children: "$3M+" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/App.tsx",
                lineNumber: 498,
                columnNumber: 21
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-lg font-bold text-orange-100 mb-1", children: "Monthly Revenue Generated" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/App.tsx",
                lineNumber: 499,
                columnNumber: 21
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-orange-200 text-sm", children: "From Leading US Companies" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/App.tsx",
                lineNumber: 500,
                columnNumber: 21
              }, void 0)
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/App.tsx",
              lineNumber: 497,
              columnNumber: 19
            }, void 0) }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/App.tsx",
              lineNumber: 496,
              columnNumber: 17
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "lg:col-span-2", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-gradient-to-br from-blue-50/60 to-blue-100/40 dark:from-blue-900/30 dark:to-blue-800/20 backdrop-blur-sm border border-blue-400/50 dark:border-blue-400/40 rounded-xl p-6 text-center shadow-lg", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-3xl font-black text-blue-accessible mb-1", children: "20+" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 508,
                  columnNumber: 23
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-blue-700 dark:text-blue-300 font-medium text-sm", children: "Years Experience" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 509,
                  columnNumber: 23
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/App.tsx",
                lineNumber: 507,
                columnNumber: 21
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-gradient-to-br from-green-50/60 to-green-100/40 dark:from-green-900/30 dark:to-green-800/20 backdrop-blur-sm border border-green-400/50 dark:border-green-400/40 rounded-xl p-6 text-center shadow-lg", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-3xl font-black text-green-600 mb-1", children: "$500K" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 512,
                  columnNumber: 23
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-green-700 dark:text-green-300 font-medium text-sm", children: "Monthly Ad Testing" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 513,
                  columnNumber: 23
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/App.tsx",
                lineNumber: 511,
                columnNumber: 21
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-gradient-to-br from-purple-50/60 to-purple-100/40 dark:from-purple-900/30 dark:to-purple-800/20 backdrop-blur-sm border border-purple-400/50 dark:border-purple-400/40 rounded-xl p-6 text-center shadow-lg", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-3xl font-black text-purple-600 mb-1", children: "7+" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 516,
                  columnNumber: 23
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-purple-700 dark:text-purple-300 font-medium text-sm", children: "Industries Proven" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 517,
                  columnNumber: 23
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/App.tsx",
                lineNumber: 515,
                columnNumber: 21
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-gradient-to-br from-red-50/60 to-red-100/40 dark:from-red-900/30 dark:to-red-800/20 backdrop-blur-sm border border-red-400/50 dark:border-red-400/40 rounded-xl p-6 text-center shadow-lg", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-3xl font-black text-red-600 mb-1", children: "8" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 520,
                  columnNumber: 23
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-red-700 dark:text-red-300 font-medium text-sm", children: "Client Limit" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 521,
                  columnNumber: 23
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/App.tsx",
                lineNumber: 519,
                columnNumber: 21
              }, void 0)
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/App.tsx",
              lineNumber: 506,
              columnNumber: 19
            }, void 0) }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/App.tsx",
              lineNumber: 505,
              columnNumber: 17
            }, void 0)
          ] }, void 0, true, {
            fileName: "/home/ian/projects/reboot/src/App.tsx",
            lineNumber: 494,
            columnNumber: 15
          }, void 0) }, void 0, false, {
            fileName: "/home/ian/projects/reboot/src/App.tsx",
            lineNumber: 493,
            columnNumber: 13
          }, void 0) }, void 0, false, {
            fileName: "/home/ian/projects/reboot/src/App.tsx",
            lineNumber: 492,
            columnNumber: 11
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8 mb-12", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border border-orange-200/30 dark:border-orange-400/30 rounded-2xl p-6 shadow-xl transition-all duration-500 hover:scale-105 focus-visible:scale-105 hover:-rotate-1 focus-visible:-rotate-1 cursor-pointer", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-12 h-12 bg-orange-100/70 backdrop-blur-sm rounded-lg flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("svg", { className: "w-6 h-6 text-orange-accessible", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M13 10V3L4 14h7v7l9-11h-7z" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/App.tsx",
                lineNumber: 534,
                columnNumber: 19
              }, void 0) }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/App.tsx",
                lineNumber: 533,
                columnNumber: 17
              }, void 0) }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/App.tsx",
                lineNumber: 532,
                columnNumber: 15
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-lg font-bold text-slate-900 mb-3", children: "Battle-Tested Results" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/App.tsx",
                lineNumber: 537,
                columnNumber: 15
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "replace-text-gray-600 text-sm leading-relaxed", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-white/95", children: [
                "I've spent ",
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { children: "$500K/month of my own money" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 539,
                  columnNumber: 60
                }, void 0),
                " testing what actually brings customers. Not theory - real results with real consequences."
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/App.tsx",
                lineNumber: 539,
                columnNumber: 17
              }, void 0) }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/App.tsx",
                lineNumber: 538,
                columnNumber: 15
              }, void 0)
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/App.tsx",
              lineNumber: 531,
              columnNumber: 13
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border border-blue-200/30 dark:border-blue-400/30 rounded-2xl p-6 shadow-xl transition-all duration-500 hover:scale-105 focus-visible:scale-105 hover:rotate-1 focus-visible:rotate-1 cursor-pointer", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-12 h-12 bg-blue-100/70 backdrop-blur-sm rounded-lg flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("svg", { className: "w-6 h-6 text-blue-accessible", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/App.tsx",
                lineNumber: 547,
                columnNumber: 19
              }, void 0) }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/App.tsx",
                lineNumber: 546,
                columnNumber: 17
              }, void 0) }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/App.tsx",
                lineNumber: 545,
                columnNumber: 15
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-lg font-bold text-slate-900 mb-3", children: "Global Reach" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/App.tsx",
                lineNumber: 550,
                columnNumber: 15
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "replace-text-gray-600 text-sm leading-relaxed", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-white/95", children: [
                "Based in Bangkok, I serve companies worldwide who want ",
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { children: "proven marketing excellence" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 552,
                  columnNumber: 104
                }, void 0),
                "at competitive rates. Perfect for US market expansion."
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/App.tsx",
                lineNumber: 552,
                columnNumber: 17
              }, void 0) }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/App.tsx",
                lineNumber: 551,
                columnNumber: 15
              }, void 0)
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/App.tsx",
              lineNumber: 544,
              columnNumber: 13
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border border-green-200/30 dark:border-green-400/30 rounded-2xl p-6 shadow-xl transition-all duration-500 hover:scale-105 focus-visible:scale-105 hover:-rotate-1 focus-visible:-rotate-1 cursor-pointer", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-12 h-12 bg-green-100/70 backdrop-blur-sm rounded-lg flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("svg", { className: "w-6 h-6 text-green-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/App.tsx",
                lineNumber: 560,
                columnNumber: 19
              }, void 0) }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/App.tsx",
                lineNumber: 559,
                columnNumber: 17
              }, void 0) }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/App.tsx",
                lineNumber: 558,
                columnNumber: 15
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-lg font-bold text-slate-900 mb-3", children: "Proven Across Industries" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/App.tsx",
                lineNumber: 563,
                columnNumber: 15
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "replace-text-gray-600 text-sm leading-relaxed", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-white/95", children: [
                "Software, Healthcare, E-commerce, Financial Services, Professional Services, and more. ",
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { children: "Psychology works universally." }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 566,
                  columnNumber: 27
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/App.tsx",
                lineNumber: 565,
                columnNumber: 17
              }, void 0) }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/App.tsx",
                lineNumber: 564,
                columnNumber: 15
              }, void 0)
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/App.tsx",
              lineNumber: 557,
              columnNumber: 13
            }, void 0)
          ] }, void 0, true, {
            fileName: "/home/ian/projects/reboot/src/App.tsx",
            lineNumber: 530,
            columnNumber: 11
          }, void 0)
        ] }, void 0, true, {
          fileName: "/home/ian/projects/reboot/src/App.tsx",
          lineNumber: 481,
          columnNumber: 9
        }, void 0) }, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/App.tsx",
          lineNumber: 480,
          columnNumber: 7
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { className: "px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-blue-950 to-black relative overflow-hidden", style: { paddingTop: "clamp(4rem, 10vw, 5rem)", paddingBottom: "clamp(4rem, 10vw, 5rem)" }, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute inset-0 opacity-10", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute inset-0", style: {
            backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "40px 40px"
          } }, void 0, false, {
            fileName: "/home/ian/projects/reboot/src/App.tsx",
            lineNumber: 577,
            columnNumber: 11
          }, void 0) }, void 0, false, {
            fileName: "/home/ian/projects/reboot/src/App.tsx",
            lineNumber: 576,
            columnNumber: 9
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "max-w-4xl mx-auto relative z-10", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-12", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "inline-flex items-center bg-orange-500/20 backdrop-blur-sm border border-orange-400/30 rounded-full px-4 py-2 mb-6", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("svg", { className: "w-4 h-4 text-orange-400 mr-2", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z", clipRule: "evenodd" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 589,
                  columnNumber: 19
                }, void 0) }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 588,
                  columnNumber: 17
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-orange-300 text-sm font-semibold", children: "Still Thinking About It?" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 591,
                  columnNumber: 17
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/App.tsx",
                lineNumber: 587,
                columnNumber: 15
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "heading-xl mb-6 text-white", style: { marginTop: "0.25rem", color: "white" }, children: [
                "Every Month You Wait Costs You ",
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-orange-400", children: "$47,000" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 595,
                  columnNumber: 48
                }, void 0),
                " in Lost Revenue"
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/App.tsx",
                lineNumber: 594,
                columnNumber: 15
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xl mb-8 max-w-3xl mx-auto replace-text-gray-300", children: [
                "That's the average monthly opportunity cost for businesses operating without proper marketing strategy. Your competitors aren't waiting. ",
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-orange-400 font-semibold", children: "Neither should you." }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 600,
                  columnNumber: 50
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/App.tsx",
                lineNumber: 598,
                columnNumber: 15
              }, void 0)
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/App.tsx",
              lineNumber: 586,
              columnNumber: 13
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-white/5 backdrop-blur-md rounded-3xl p-8 md:p-10 border border-white/10 mb-10", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-2xl font-bold text-white mb-6", children: [
                `"I've Heard It All Before" - `,
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-blue-400", children: "We Get It." }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 607,
                  columnNumber: 46
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/App.tsx",
                lineNumber: 606,
                columnNumber: 15
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-8", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-left", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-red-400 font-bold mb-2", children: "❌ What Others Say:" }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/App.tsx",
                    lineNumber: 612,
                    columnNumber: 19
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "replace-text-gray-400 text-sm", children: `"We'll grow your business" (with no specifics)` }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/App.tsx",
                    lineNumber: 613,
                    columnNumber: 19
                  }, void 0)
                ] }, void 0, true, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 611,
                  columnNumber: 17
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-left", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-red-400 font-bold mb-2", children: "❌ What They Do:" }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/App.tsx",
                    lineNumber: 616,
                    columnNumber: 19
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "replace-text-gray-400 text-sm", children: "Generic templates and hope for the best" }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/App.tsx",
                    lineNumber: 617,
                    columnNumber: 19
                  }, void 0)
                ] }, void 0, true, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 615,
                  columnNumber: 17
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-left", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-green-400 font-bold mb-2", children: "✅ What We Do:" }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/App.tsx",
                    lineNumber: 620,
                    columnNumber: 19
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "replace-text-gray-300 text-sm", children: "Show you exactly what's broken before you pay a dime" }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/App.tsx",
                    lineNumber: 621,
                    columnNumber: 19
                  }, void 0)
                ] }, void 0, true, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 619,
                  columnNumber: 17
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/App.tsx",
                lineNumber: 610,
                columnNumber: 15
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-gradient-to-r from-blue-500/10 to-green-500/10 rounded-2xl p-6 border border-blue-400/20", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "text-lg font-bold text-white mb-3", children: "Here's Why This Analysis is Different:" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 626,
                  columnNumber: 17
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("ul", { className: "text-left space-y-2 replace-text-gray-300 text-sm max-w-2xl mx-auto", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { className: "flex items-start", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-green-400 mr-2 mt-0.5", children: "✓" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/App.tsx",
                      lineNumber: 631,
                      columnNumber: 21
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { children: "No generic advice:" }, void 0, false, {
                        fileName: "/home/ian/projects/reboot/src/App.tsx",
                        lineNumber: 632,
                        columnNumber: 27
                      }, void 0),
                      " Specific to YOUR business, YOUR industry, YOUR competition"
                    ] }, void 0, true, {
                      fileName: "/home/ian/projects/reboot/src/App.tsx",
                      lineNumber: 632,
                      columnNumber: 21
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/App.tsx",
                    lineNumber: 630,
                    columnNumber: 19
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { className: "flex items-start", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-green-400 mr-2 mt-0.5", children: "✓" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/App.tsx",
                      lineNumber: 635,
                      columnNumber: 21
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { children: "No junior marketers:" }, void 0, false, {
                        fileName: "/home/ian/projects/reboot/src/App.tsx",
                        lineNumber: 636,
                        columnNumber: 27
                      }, void 0),
                      " 20+ years C-level experience reviews your business personally"
                    ] }, void 0, true, {
                      fileName: "/home/ian/projects/reboot/src/App.tsx",
                      lineNumber: 636,
                      columnNumber: 21
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/App.tsx",
                    lineNumber: 634,
                    columnNumber: 19
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { className: "flex items-start", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-green-400 mr-2 mt-0.5", children: "✓" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/App.tsx",
                      lineNumber: 639,
                      columnNumber: 21
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { children: "No obligation:" }, void 0, false, {
                        fileName: "/home/ian/projects/reboot/src/App.tsx",
                        lineNumber: 640,
                        columnNumber: 27
                      }, void 0),
                      " Get the analysis, implement it yourself if you want"
                    ] }, void 0, true, {
                      fileName: "/home/ian/projects/reboot/src/App.tsx",
                      lineNumber: 640,
                      columnNumber: 21
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/App.tsx",
                    lineNumber: 638,
                    columnNumber: 19
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { className: "flex items-start", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-green-400 mr-2 mt-0.5", children: "✓" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/App.tsx",
                      lineNumber: 643,
                      columnNumber: 21
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { children: "No BS:" }, void 0, false, {
                        fileName: "/home/ian/projects/reboot/src/App.tsx",
                        lineNumber: 644,
                        columnNumber: 27
                      }, void 0),
                      " If we can't help, we'll tell you straight up"
                    ] }, void 0, true, {
                      fileName: "/home/ian/projects/reboot/src/App.tsx",
                      lineNumber: 644,
                      columnNumber: 21
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/App.tsx",
                    lineNumber: 642,
                    columnNumber: 19
                  }, void 0)
                ] }, void 0, true, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 629,
                  columnNumber: 17
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/App.tsx",
                lineNumber: 625,
                columnNumber: 15
              }, void 0)
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/App.tsx",
              lineNumber: 605,
              columnNumber: 13
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-10", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "inline-flex items-center bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-full px-6 py-3 mb-6", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("svg", { className: "w-5 h-5 text-green-400 mr-2", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("path", { fillRule: "evenodd", d: "M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z", clipRule: "evenodd" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 654,
                  columnNumber: 19
                }, void 0) }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 653,
                  columnNumber: 17
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-green-300 font-bold", children: "Zero Risk Guarantee" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 656,
                  columnNumber: 17
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/App.tsx",
                lineNumber: 652,
                columnNumber: 15
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-2xl font-bold text-white mb-4", style: { marginTop: "0.25rem" }, children: "You Have Nothing to Lose (Except More Revenue)" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/App.tsx",
                lineNumber: 659,
                columnNumber: 15
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "replace-text-gray-300 space-y-0 max-w-2xl mx-auto", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "py-0", children: "🚫 No credit card required" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 664,
                  columnNumber: 17
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "py-0", children: "🚫 No sales pressure" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 665,
                  columnNumber: 17
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "py-0", children: "🚫 No spam emails" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 666,
                  columnNumber: 17
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "py-0", children: "✅ Just honest insights about your marketing gaps" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 667,
                  columnNumber: 17
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/App.tsx",
                lineNumber: 663,
                columnNumber: 15
              }, void 0)
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/App.tsx",
              lineNumber: 651,
              columnNumber: 13
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "button",
                {
                  onClick: () => {
                    analytics.ctaClick("Yes, Show Me What I'm Missing", "final-cta");
                    setShowDropdownForm(true);
                  },
                  className: "bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 hover:from-orange-600 focus-visible:from-orange-600 hover:via-orange-700 focus-visible:via-orange-700 hover:to-red-600 focus-visible:to-red-600 text-white px-10 sm:px-14 py-5 rounded-xl font-black text-xl transition-all duration-300 transform hover:scale-105 focus-visible:scale-105 shadow-2xl inline-flex items-center gap-3 group",
                  children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: "Yes, Show Me What I'm Missing" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/App.tsx",
                      lineNumber: 680,
                      columnNumber: 17
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("svg", { className: "w-6 h-6 group-hover:translate-x-1 group-focus-visible:translate-x-1 focus-visible:translate-x-1 transition-transform", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "3", d: "M13 7l5 5m0 0l-5 5m5-5H6" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/App.tsx",
                      lineNumber: 682,
                      columnNumber: 19
                    }, void 0) }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/App.tsx",
                      lineNumber: 681,
                      columnNumber: 17
                    }, void 0)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 673,
                  columnNumber: 15
                },
                void 0
              ),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "replace-text-gray-400 text-sm mt-6", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-orange-400 font-semibold", children: "While you're reading this" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 687,
                  columnNumber: 17
                }, void 0),
                ", your competitors are fixing their marketing.",
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-white", children: "What are you waiting for?" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/App.tsx",
                  lineNumber: 688,
                  columnNumber: 17
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/App.tsx",
                lineNumber: 686,
                columnNumber: 15
              }, void 0)
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/App.tsx",
              lineNumber: 672,
              columnNumber: 13
            }, void 0)
          ] }, void 0, true, {
            fileName: "/home/ian/projects/reboot/src/App.tsx",
            lineNumber: 584,
            columnNumber: 11
          }, void 0) }, void 0, false, {
            fileName: "/home/ian/projects/reboot/src/App.tsx",
            lineNumber: 583,
            columnNumber: 9
          }, void 0)
        ] }, void 0, true, {
          fileName: "/home/ian/projects/reboot/src/App.tsx",
          lineNumber: 574,
          columnNumber: 7
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ErrorBoundary, { level: "component", name: "GlobalFooter", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(GlobalFooter, { onShowForm: () => setShowDropdownForm(true) }, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/App.tsx",
          lineNumber: 698,
          columnNumber: 9
        }, void 0) }, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/App.tsx",
          lineNumber: 697,
          columnNumber: 7
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ErrorBoundary, { level: "component", name: "EnhancedLeadForm", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(EnhancedLeadForm, {}, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/App.tsx",
          lineNumber: 703,
          columnNumber: 9
        }, void 0) }, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/App.tsx",
          lineNumber: 702,
          columnNumber: 7
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ErrorBoundary, { level: "component", name: "ExitIntentManager", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ExitIntentManager, {}, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/App.tsx",
          lineNumber: 708,
          columnNumber: 9
        }, void 0) }, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/App.tsx",
          lineNumber: 707,
          columnNumber: 7
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ErrorBoundary, { level: "component", name: "MobileOptimization", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(MobileStickyBar, {}, void 0, false, {
            fileName: "/home/ian/projects/reboot/src/App.tsx",
            lineNumber: 713,
            columnNumber: 9
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(MobileScrollProgress, {}, void 0, false, {
            fileName: "/home/ian/projects/reboot/src/App.tsx",
            lineNumber: 714,
            columnNumber: 9
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(MobileExitIntentDetector, {}, void 0, false, {
            fileName: "/home/ian/projects/reboot/src/App.tsx",
            lineNumber: 715,
            columnNumber: 9
          }, void 0)
        ] }, void 0, true, {
          fileName: "/home/ian/projects/reboot/src/App.tsx",
          lineNumber: 712,
          columnNumber: 7
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ABTestingDashboardTrigger, {}, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/App.tsx",
          lineNumber: 719,
          columnNumber: 7
        }, void 0)
      ] }, void 0, true, {
        fileName: "/home/ian/projects/reboot/src/App.tsx",
        lineNumber: 135,
        columnNumber: 9
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/ian/projects/reboot/src/App.tsx",
      lineNumber: 128,
      columnNumber: 7
    }, void 0)
  ] }, void 0, true, {
    fileName: "/home/ian/projects/reboot/src/App.tsx",
    lineNumber: 116,
    columnNumber: 5
  }, void 0);
};
function App() {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ABTestProvider, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ConversionOptimizationProvider, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(MainApp, {}, void 0, false, {
    fileName: "/home/ian/projects/reboot/src/App.tsx",
    lineNumber: 731,
    columnNumber: 9
  }, this) }, void 0, false, {
    fileName: "/home/ian/projects/reboot/src/App.tsx",
    lineNumber: 730,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/home/ian/projects/reboot/src/App.tsx",
    lineNumber: 729,
    columnNumber: 5
  }, this);
}
const PageLoadingSpinner = ({ pageName }) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-gray-100", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center max-w-md mx-auto px-6", children: [
  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-8 animate-pulse", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4" }, void 0, false, {
      fileName: "/home/ian/projects/reboot/src/components/LoadingComponents.tsx",
      lineNumber: 9,
      columnNumber: 9
    }, void 0),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "h-4 bg-gray-200 rounded w-32 mx-auto mb-2" }, void 0, false, {
      fileName: "/home/ian/projects/reboot/src/components/LoadingComponents.tsx",
      lineNumber: 10,
      columnNumber: 9
    }, void 0),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "h-3 bg-gray-100 rounded w-48 mx-auto" }, void 0, false, {
      fileName: "/home/ian/projects/reboot/src/components/LoadingComponents.tsx",
      lineNumber: 11,
      columnNumber: 9
    }, void 0)
  ] }, void 0, true, {
    fileName: "/home/ian/projects/reboot/src/components/LoadingComponents.tsx",
    lineNumber: 8,
    columnNumber: 7
  }, void 0),
  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "relative mb-6", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "animate-spin rounded-full h-12 w-12 border-2 border-gray-200 border-t-blue-600 mx-auto" }, void 0, false, {
      fileName: "/home/ian/projects/reboot/src/components/LoadingComponents.tsx",
      lineNumber: 16,
      columnNumber: 9
    }, void 0),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute inset-0 rounded-full bg-blue-50 opacity-20 animate-pulse" }, void 0, false, {
      fileName: "/home/ian/projects/reboot/src/components/LoadingComponents.tsx",
      lineNumber: 17,
      columnNumber: 9
    }, void 0)
  ] }, void 0, true, {
    fileName: "/home/ian/projects/reboot/src/components/LoadingComponents.tsx",
    lineNumber: 15,
    columnNumber: 7
  }, void 0),
  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-gray-700 font-medium", children: pageName ? `Loading ${pageName}...` : "Loading page..." }, void 0, false, {
      fileName: "/home/ian/projects/reboot/src/components/LoadingComponents.tsx",
      lineNumber: 22,
      columnNumber: 9
    }, void 0),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "replace-text-gray-500 text-sm", children: "Optimizing your experience" }, void 0, false, {
      fileName: "/home/ian/projects/reboot/src/components/LoadingComponents.tsx",
      lineNumber: 25,
      columnNumber: 9
    }, void 0)
  ] }, void 0, true, {
    fileName: "/home/ian/projects/reboot/src/components/LoadingComponents.tsx",
    lineNumber: 21,
    columnNumber: 7
  }, void 0),
  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-6 w-full bg-gray-200 rounded-full h-1", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-blue-600 h-1 rounded-full animate-pulse", style: { width: "45%" } }, void 0, false, {
    fileName: "/home/ian/projects/reboot/src/components/LoadingComponents.tsx",
    lineNumber: 32,
    columnNumber: 9
  }, void 0) }, void 0, false, {
    fileName: "/home/ian/projects/reboot/src/components/LoadingComponents.tsx",
    lineNumber: 31,
    columnNumber: 7
  }, void 0)
] }, void 0, true, {
  fileName: "/home/ian/projects/reboot/src/components/LoadingComponents.tsx",
  lineNumber: 6,
  columnNumber: 5
}, void 0) }, void 0, false, {
  fileName: "/home/ian/projects/reboot/src/components/LoadingComponents.tsx",
  lineNumber: 5,
  columnNumber: 3
}, void 0);
const LazyLoadErrorFallback = ({
  error,
  retry
}) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-pink-50", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center max-w-md mx-auto px-6", children: [
  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-6", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-red-600 text-2xl", children: "⚠" }, void 0, false, {
      fileName: "/home/ian/projects/reboot/src/components/LoadingComponents.tsx",
      lineNumber: 89,
      columnNumber: 11
    }, void 0) }, void 0, false, {
      fileName: "/home/ian/projects/reboot/src/components/LoadingComponents.tsx",
      lineNumber: 88,
      columnNumber: 9
    }, void 0),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "text-xl font-semibold text-gray-800 mb-2", children: "Loading Failed" }, void 0, false, {
      fileName: "/home/ian/projects/reboot/src/components/LoadingComponents.tsx",
      lineNumber: 91,
      columnNumber: 9
    }, void 0),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "replace-text-gray-600 text-sm mb-4", children: "We encountered an issue loading this page. Please try again." }, void 0, false, {
      fileName: "/home/ian/projects/reboot/src/components/LoadingComponents.tsx",
      lineNumber: 94,
      columnNumber: 9
    }, void 0),
    error && true && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("details", { className: "text-left bg-gray-100 rounded p-3 mb-4", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("summary", { className: "cursor-pointer text-xs font-medium text-gray-700", children: "Error Details" }, void 0, false, {
        fileName: "/home/ian/projects/reboot/src/components/LoadingComponents.tsx",
        lineNumber: 99,
        columnNumber: 13
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("pre", { className: "text-xs replace-text-gray-600 mt-2 whitespace-pre-wrap", children: error.message }, void 0, false, {
        fileName: "/home/ian/projects/reboot/src/components/LoadingComponents.tsx",
        lineNumber: 102,
        columnNumber: 13
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/ian/projects/reboot/src/components/LoadingComponents.tsx",
      lineNumber: 98,
      columnNumber: 11
    }, void 0)
  ] }, void 0, true, {
    fileName: "/home/ian/projects/reboot/src/components/LoadingComponents.tsx",
    lineNumber: 87,
    columnNumber: 7
  }, void 0),
  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-3", children: [
    retry && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "button",
      {
        onClick: retry,
        className: "w-full bg-blue-600 hover:bg-blue-700 focus-visible:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium",
        children: "Try Again"
      },
      void 0,
      false,
      {
        fileName: "/home/ian/projects/reboot/src/components/LoadingComponents.tsx",
        lineNumber: 111,
        columnNumber: 11
      },
      void 0
    ),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "button",
      {
        onClick: () => window.location.reload(),
        className: "w-full bg-gray-200 hover:bg-gray-300 focus-visible:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition-colors duration-200 font-medium",
        children: "Refresh Page"
      },
      void 0,
      false,
      {
        fileName: "/home/ian/projects/reboot/src/components/LoadingComponents.tsx",
        lineNumber: 118,
        columnNumber: 9
      },
      void 0
    ),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "button",
      {
        onClick: () => window.history.back(),
        className: "text-blue-accessible hover:text-blue-700 focus-visible:text-blue-700 text-sm font-medium",
        children: "← Go Back"
      },
      void 0,
      false,
      {
        fileName: "/home/ian/projects/reboot/src/components/LoadingComponents.tsx",
        lineNumber: 124,
        columnNumber: 9
      },
      void 0
    )
  ] }, void 0, true, {
    fileName: "/home/ian/projects/reboot/src/components/LoadingComponents.tsx",
    lineNumber: 109,
    columnNumber: 7
  }, void 0)
] }, void 0, true, {
  fileName: "/home/ian/projects/reboot/src/components/LoadingComponents.tsx",
  lineNumber: 86,
  columnNumber: 5
}, void 0) }, void 0, false, {
  fileName: "/home/ian/projects/reboot/src/components/LoadingComponents.tsx",
  lineNumber: 85,
  columnNumber: 3
}, void 0);
const About = reactExports.lazy(() => __vitePreload(() => import("./pages-core-BiocblyB.js").then((n) => n.A), true ? __vite__mapDeps([0,1,2,3,4,5,6,7,8]) : void 0));
const Contact = reactExports.lazy(() => __vitePreload(() => import("./pages-core-BiocblyB.js").then((n) => n.C), true ? __vite__mapDeps([0,1,2,3,4,5,6,7,8]) : void 0));
const Privacy = reactExports.lazy(() => __vitePreload(() => import("./pages-core-BiocblyB.js").then((n) => n.P), true ? __vite__mapDeps([0,1,2,3,4,5,6,7,8]) : void 0));
const Terms = reactExports.lazy(() => __vitePreload(() => import("./pages-core-BiocblyB.js").then((n) => n.T), true ? __vite__mapDeps([0,1,2,3,4,5,6,7,8]) : void 0));
const MarketingPsychology = reactExports.lazy(() => __vitePreload(() => import("./pages-psychology-BoXS_ujt.js").then((n) => n.M), true ? __vite__mapDeps([9,1,2,3,4,5,6,7,8]) : void 0));
const UnawareStageCustomers = reactExports.lazy(() => __vitePreload(() => import("./pages-psychology-BoXS_ujt.js").then((n) => n.U), true ? __vite__mapDeps([9,1,2,3,4,5,6,7,8]) : void 0));
const ProblemAwareStageCustomers = reactExports.lazy(() => __vitePreload(() => import("./pages-psychology-BoXS_ujt.js").then((n) => n.P), true ? __vite__mapDeps([9,1,2,3,4,5,6,7,8]) : void 0));
const SolutionAwareStageCustomers = reactExports.lazy(() => __vitePreload(() => import("./pages-psychology-BoXS_ujt.js").then((n) => n.S), true ? __vite__mapDeps([9,1,2,3,4,5,6,7,8]) : void 0));
const ProductAwareStageCustomers = reactExports.lazy(() => __vitePreload(() => import("./pages-psychology-BoXS_ujt.js").then((n) => n.a), true ? __vite__mapDeps([9,1,2,3,4,5,6,7,8]) : void 0));
const MostAwareStageCustomers = reactExports.lazy(() => __vitePreload(() => import("./pages-psychology-BoXS_ujt.js").then((n) => n.b), true ? __vite__mapDeps([9,1,2,3,4,5,6,7,8]) : void 0));
const GrowthPlateauSolutions = reactExports.lazy(() => __vitePreload(() => import("./pages-solutions-p54rnrg0.js").then((n) => n.G), true ? __vite__mapDeps([10,1,6,2,3,4,5,7,8]) : void 0));
const RevenueCeilingBreakthrough = reactExports.lazy(() => __vitePreload(() => import("./pages-solutions-p54rnrg0.js").then((n) => n.R), true ? __vite__mapDeps([10,1,6,2,3,4,5,7,8]) : void 0));
const CustomerAcquisitionStall = reactExports.lazy(() => __vitePreload(() => import("./pages-solutions-p54rnrg0.js").then((n) => n.C), true ? __vite__mapDeps([10,1,6,2,3,4,5,7,8]) : void 0));
const MarketExpansionBarriers = reactExports.lazy(() => __vitePreload(() => import("./pages-solutions-p54rnrg0.js").then((n) => n.M), true ? __vite__mapDeps([10,1,6,2,3,4,5,7,8]) : void 0));
const OperationalScalingCrisis = reactExports.lazy(() => __vitePreload(() => import("./pages-solutions-p54rnrg0.js").then((n) => n.O), true ? __vite__mapDeps([10,1,6,2,3,4,5,7,8]) : void 0));
const TeamGrowthBottlenecks = reactExports.lazy(() => __vitePreload(() => import("./pages-solutions-p54rnrg0.js").then((n) => n.T), true ? __vite__mapDeps([10,1,6,2,3,4,5,7,8]) : void 0));
const ProductMarketFitErosion = reactExports.lazy(() => __vitePreload(() => import("./pages-solutions-p54rnrg0.js").then((n) => n.P), true ? __vite__mapDeps([10,1,6,2,3,4,5,7,8]) : void 0));
const CompetitivePressurePlateau = reactExports.lazy(() => __vitePreload(() => import("./pages-solutions-p54rnrg0.js").then((n) => n.a), true ? __vite__mapDeps([10,1,6,2,3,4,5,7,8]) : void 0));
const FractionalCMOGuide = reactExports.lazy(() => __vitePreload(() => import("./pages-services-2zSd-FbW.js").then((n) => n.F), true ? __vite__mapDeps([11,1,6,2,3,4,5,7,8]) : void 0));
const FractionalCMOVsAgency = reactExports.lazy(() => __vitePreload(() => import("./pages-services-2zSd-FbW.js").then((n) => n.a), true ? __vite__mapDeps([11,1,6,2,3,4,5,7,8]) : void 0));
const FractionalCMOVsFullTime = reactExports.lazy(() => __vitePreload(() => import("./pages-services-2zSd-FbW.js").then((n) => n.b), true ? __vite__mapDeps([11,1,6,2,3,4,5,7,8]) : void 0));
const FractionalCMOVsConsultant = reactExports.lazy(() => __vitePreload(() => import("./pages-services-2zSd-FbW.js").then((n) => n.c), true ? __vite__mapDeps([11,1,6,2,3,4,5,7,8]) : void 0));
const FractionalCMOVsInHouse = reactExports.lazy(() => __vitePreload(() => import("./pages-services-2zSd-FbW.js").then((n) => n.d), true ? __vite__mapDeps([11,1,6,2,3,4,5,7,8]) : void 0));
const TransitionStrategies = reactExports.lazy(() => __vitePreload(() => import("./pages-services-2zSd-FbW.js").then((n) => n.T), true ? __vite__mapDeps([11,1,6,2,3,4,5,7,8]) : void 0));
const WhenToChooseEach = reactExports.lazy(() => __vitePreload(() => import("./pages-services-2zSd-FbW.js").then((n) => n.W), true ? __vite__mapDeps([11,1,6,2,3,4,5,7,8]) : void 0));
const CostROIAnalysis = reactExports.lazy(() => __vitePreload(() => import("./pages-services-2zSd-FbW.js").then((n) => n.C), true ? __vite__mapDeps([11,1,6,2,3,4,5,7,8]) : void 0));
const Router = () => {
  const basename = "/reboot";
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ErrorProvider, { enableErrorReporting: true, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    ErrorBoundary,
    {
      level: "page",
      name: "ApplicationRootBoundary",
      showDetails: true,
      children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(BrowserRouter, { basename, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(LeadFormProvider, { children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ScrollToTop, {}, void 0, false, {
            fileName: "/home/ian/projects/reboot/src/Router.tsx",
            lineNumber: 59,
            columnNumber: 13
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            ErrorBoundary,
            {
              level: "page",
              name: "RouterBoundary",
              showDetails: true,
              children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                reactExports.Suspense,
                {
                  fallback: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                    ErrorBoundary,
                    {
                      level: "component",
                      name: "LoadingSpinnerBoundary",
                      fallback: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(LazyLoadErrorFallback, {}, void 0, false, {
                        fileName: "/home/ian/projects/reboot/src/Router.tsx",
                        lineNumber: 72,
                        columnNumber: 31
                      }, void 0),
                      children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(PageLoadingSpinner, {}, void 0, false, {
                        fileName: "/home/ian/projects/reboot/src/Router.tsx",
                        lineNumber: 74,
                        columnNumber: 21
                      }, void 0)
                    },
                    void 0,
                    false,
                    {
                      fileName: "/home/ian/projects/reboot/src/Router.tsx",
                      lineNumber: 69,
                      columnNumber: 19
                    },
                    void 0
                  ),
                  children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Routes, { children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                      Route,
                      {
                        path: "/",
                        element: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ErrorBoundary, { level: "page", name: "HomePage", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(App, {}, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/Router.tsx",
                          lineNumber: 84,
                          columnNumber: 25
                        }, void 0) }, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/Router.tsx",
                          lineNumber: 83,
                          columnNumber: 23
                        }, void 0)
                      },
                      void 0,
                      false,
                      {
                        fileName: "/home/ian/projects/reboot/src/Router.tsx",
                        lineNumber: 80,
                        columnNumber: 19
                      },
                      void 0
                    ),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                      Route,
                      {
                        path: "/about",
                        element: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ErrorBoundary, { level: "page", name: "AboutPage", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(About, {}, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/Router.tsx",
                          lineNumber: 92,
                          columnNumber: 25
                        }, void 0) }, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/Router.tsx",
                          lineNumber: 91,
                          columnNumber: 23
                        }, void 0)
                      },
                      void 0,
                      false,
                      {
                        fileName: "/home/ian/projects/reboot/src/Router.tsx",
                        lineNumber: 88,
                        columnNumber: 19
                      },
                      void 0
                    ),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                      Route,
                      {
                        path: "/contact",
                        element: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ErrorBoundary, { level: "page", name: "ContactPage", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Contact, {}, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/Router.tsx",
                          lineNumber: 100,
                          columnNumber: 25
                        }, void 0) }, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/Router.tsx",
                          lineNumber: 99,
                          columnNumber: 23
                        }, void 0)
                      },
                      void 0,
                      false,
                      {
                        fileName: "/home/ian/projects/reboot/src/Router.tsx",
                        lineNumber: 96,
                        columnNumber: 19
                      },
                      void 0
                    ),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                      Route,
                      {
                        path: "/privacy",
                        element: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ErrorBoundary, { level: "page", name: "PrivacyPage", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Privacy, {}, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/Router.tsx",
                          lineNumber: 108,
                          columnNumber: 25
                        }, void 0) }, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/Router.tsx",
                          lineNumber: 107,
                          columnNumber: 23
                        }, void 0)
                      },
                      void 0,
                      false,
                      {
                        fileName: "/home/ian/projects/reboot/src/Router.tsx",
                        lineNumber: 104,
                        columnNumber: 19
                      },
                      void 0
                    ),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                      Route,
                      {
                        path: "/terms",
                        element: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ErrorBoundary, { level: "page", name: "TermsPage", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Terms, {}, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/Router.tsx",
                          lineNumber: 116,
                          columnNumber: 25
                        }, void 0) }, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/Router.tsx",
                          lineNumber: 115,
                          columnNumber: 23
                        }, void 0)
                      },
                      void 0,
                      false,
                      {
                        fileName: "/home/ian/projects/reboot/src/Router.tsx",
                        lineNumber: 112,
                        columnNumber: 19
                      },
                      void 0
                    ),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                      Route,
                      {
                        path: "/marketing-psychology",
                        element: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ErrorBoundary, { level: "page", name: "MarketingPsychologyPage", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(MarketingPsychology, {}, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/Router.tsx",
                          lineNumber: 126,
                          columnNumber: 25
                        }, void 0) }, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/Router.tsx",
                          lineNumber: 125,
                          columnNumber: 23
                        }, void 0)
                      },
                      void 0,
                      false,
                      {
                        fileName: "/home/ian/projects/reboot/src/Router.tsx",
                        lineNumber: 122,
                        columnNumber: 19
                      },
                      void 0
                    ),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                      Route,
                      {
                        path: "/marketing-psychology/unaware-stage-customers",
                        element: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ErrorBoundary, { level: "page", name: "UnawareStageCustomersPage", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(UnawareStageCustomers, {}, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/Router.tsx",
                          lineNumber: 134,
                          columnNumber: 25
                        }, void 0) }, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/Router.tsx",
                          lineNumber: 133,
                          columnNumber: 23
                        }, void 0)
                      },
                      void 0,
                      false,
                      {
                        fileName: "/home/ian/projects/reboot/src/Router.tsx",
                        lineNumber: 130,
                        columnNumber: 19
                      },
                      void 0
                    ),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                      Route,
                      {
                        path: "/marketing-psychology/problem-aware-stage-customers",
                        element: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ErrorBoundary, { level: "page", name: "ProblemAwareStageCustomersPage", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ProblemAwareStageCustomers, {}, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/Router.tsx",
                          lineNumber: 142,
                          columnNumber: 25
                        }, void 0) }, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/Router.tsx",
                          lineNumber: 141,
                          columnNumber: 23
                        }, void 0)
                      },
                      void 0,
                      false,
                      {
                        fileName: "/home/ian/projects/reboot/src/Router.tsx",
                        lineNumber: 138,
                        columnNumber: 19
                      },
                      void 0
                    ),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                      Route,
                      {
                        path: "/marketing-psychology/solution-aware-stage-customers",
                        element: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ErrorBoundary, { level: "page", name: "SolutionAwareStageCustomersPage", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SolutionAwareStageCustomers, {}, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/Router.tsx",
                          lineNumber: 150,
                          columnNumber: 25
                        }, void 0) }, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/Router.tsx",
                          lineNumber: 149,
                          columnNumber: 23
                        }, void 0)
                      },
                      void 0,
                      false,
                      {
                        fileName: "/home/ian/projects/reboot/src/Router.tsx",
                        lineNumber: 146,
                        columnNumber: 19
                      },
                      void 0
                    ),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                      Route,
                      {
                        path: "/marketing-psychology/product-aware-stage-customers",
                        element: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ErrorBoundary, { level: "page", name: "ProductAwareStageCustomersPage", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ProductAwareStageCustomers, {}, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/Router.tsx",
                          lineNumber: 158,
                          columnNumber: 25
                        }, void 0) }, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/Router.tsx",
                          lineNumber: 157,
                          columnNumber: 23
                        }, void 0)
                      },
                      void 0,
                      false,
                      {
                        fileName: "/home/ian/projects/reboot/src/Router.tsx",
                        lineNumber: 154,
                        columnNumber: 19
                      },
                      void 0
                    ),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                      Route,
                      {
                        path: "/marketing-psychology/most-aware-stage-customers",
                        element: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ErrorBoundary, { level: "page", name: "MostAwareStageCustomersPage", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(MostAwareStageCustomers, {}, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/Router.tsx",
                          lineNumber: 166,
                          columnNumber: 25
                        }, void 0) }, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/Router.tsx",
                          lineNumber: 165,
                          columnNumber: 23
                        }, void 0)
                      },
                      void 0,
                      false,
                      {
                        fileName: "/home/ian/projects/reboot/src/Router.tsx",
                        lineNumber: 162,
                        columnNumber: 19
                      },
                      void 0
                    ),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                      Route,
                      {
                        path: "/growth-plateau-solutions",
                        element: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ErrorBoundary, { level: "page", name: "GrowthPlateauSolutionsPage", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(GrowthPlateauSolutions, {}, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/Router.tsx",
                          lineNumber: 176,
                          columnNumber: 25
                        }, void 0) }, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/Router.tsx",
                          lineNumber: 175,
                          columnNumber: 23
                        }, void 0)
                      },
                      void 0,
                      false,
                      {
                        fileName: "/home/ian/projects/reboot/src/Router.tsx",
                        lineNumber: 172,
                        columnNumber: 19
                      },
                      void 0
                    ),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                      Route,
                      {
                        path: "/growth-plateau-solutions/revenue-ceiling-breakthrough",
                        element: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ErrorBoundary, { level: "page", name: "RevenueCeilingBreakthroughPage", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(RevenueCeilingBreakthrough, {}, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/Router.tsx",
                          lineNumber: 184,
                          columnNumber: 25
                        }, void 0) }, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/Router.tsx",
                          lineNumber: 183,
                          columnNumber: 23
                        }, void 0)
                      },
                      void 0,
                      false,
                      {
                        fileName: "/home/ian/projects/reboot/src/Router.tsx",
                        lineNumber: 180,
                        columnNumber: 19
                      },
                      void 0
                    ),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                      Route,
                      {
                        path: "/growth-plateau-solutions/customer-acquisition-stall",
                        element: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ErrorBoundary, { level: "page", name: "CustomerAcquisitionStallPage", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CustomerAcquisitionStall, {}, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/Router.tsx",
                          lineNumber: 192,
                          columnNumber: 25
                        }, void 0) }, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/Router.tsx",
                          lineNumber: 191,
                          columnNumber: 23
                        }, void 0)
                      },
                      void 0,
                      false,
                      {
                        fileName: "/home/ian/projects/reboot/src/Router.tsx",
                        lineNumber: 188,
                        columnNumber: 19
                      },
                      void 0
                    ),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                      Route,
                      {
                        path: "/growth-plateau-solutions/market-expansion-barriers",
                        element: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ErrorBoundary, { level: "page", name: "MarketExpansionBarriersPage", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(MarketExpansionBarriers, {}, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/Router.tsx",
                          lineNumber: 200,
                          columnNumber: 25
                        }, void 0) }, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/Router.tsx",
                          lineNumber: 199,
                          columnNumber: 23
                        }, void 0)
                      },
                      void 0,
                      false,
                      {
                        fileName: "/home/ian/projects/reboot/src/Router.tsx",
                        lineNumber: 196,
                        columnNumber: 19
                      },
                      void 0
                    ),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                      Route,
                      {
                        path: "/growth-plateau-solutions/operational-scaling-crisis",
                        element: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ErrorBoundary, { level: "page", name: "OperationalScalingCrisisPage", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(OperationalScalingCrisis, {}, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/Router.tsx",
                          lineNumber: 208,
                          columnNumber: 25
                        }, void 0) }, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/Router.tsx",
                          lineNumber: 207,
                          columnNumber: 23
                        }, void 0)
                      },
                      void 0,
                      false,
                      {
                        fileName: "/home/ian/projects/reboot/src/Router.tsx",
                        lineNumber: 204,
                        columnNumber: 19
                      },
                      void 0
                    ),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                      Route,
                      {
                        path: "/growth-plateau-solutions/team-growth-bottlenecks",
                        element: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ErrorBoundary, { level: "page", name: "TeamGrowthBottlenecksPage", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TeamGrowthBottlenecks, {}, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/Router.tsx",
                          lineNumber: 216,
                          columnNumber: 25
                        }, void 0) }, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/Router.tsx",
                          lineNumber: 215,
                          columnNumber: 23
                        }, void 0)
                      },
                      void 0,
                      false,
                      {
                        fileName: "/home/ian/projects/reboot/src/Router.tsx",
                        lineNumber: 212,
                        columnNumber: 19
                      },
                      void 0
                    ),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                      Route,
                      {
                        path: "/growth-plateau-solutions/product-market-fit-erosion",
                        element: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ErrorBoundary, { level: "page", name: "ProductMarketFitErosionPage", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ProductMarketFitErosion, {}, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/Router.tsx",
                          lineNumber: 224,
                          columnNumber: 25
                        }, void 0) }, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/Router.tsx",
                          lineNumber: 223,
                          columnNumber: 23
                        }, void 0)
                      },
                      void 0,
                      false,
                      {
                        fileName: "/home/ian/projects/reboot/src/Router.tsx",
                        lineNumber: 220,
                        columnNumber: 19
                      },
                      void 0
                    ),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                      Route,
                      {
                        path: "/growth-plateau-solutions/competitive-pressure-plateau",
                        element: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ErrorBoundary, { level: "page", name: "CompetitivePressurePlateauPage", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CompetitivePressurePlateau, {}, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/Router.tsx",
                          lineNumber: 232,
                          columnNumber: 25
                        }, void 0) }, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/Router.tsx",
                          lineNumber: 231,
                          columnNumber: 23
                        }, void 0)
                      },
                      void 0,
                      false,
                      {
                        fileName: "/home/ian/projects/reboot/src/Router.tsx",
                        lineNumber: 228,
                        columnNumber: 19
                      },
                      void 0
                    ),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                      Route,
                      {
                        path: "/fractional-cmo-guide",
                        element: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ErrorBoundary, { level: "page", name: "FractionalCMOGuidePage", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(FractionalCMOGuide, {}, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/Router.tsx",
                          lineNumber: 242,
                          columnNumber: 25
                        }, void 0) }, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/Router.tsx",
                          lineNumber: 241,
                          columnNumber: 23
                        }, void 0)
                      },
                      void 0,
                      false,
                      {
                        fileName: "/home/ian/projects/reboot/src/Router.tsx",
                        lineNumber: 238,
                        columnNumber: 19
                      },
                      void 0
                    ),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                      Route,
                      {
                        path: "/fractional-cmo-guide/vs-marketing-agency",
                        element: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ErrorBoundary, { level: "page", name: "FractionalCMOVsAgencyPage", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(FractionalCMOVsAgency, {}, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/Router.tsx",
                          lineNumber: 250,
                          columnNumber: 25
                        }, void 0) }, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/Router.tsx",
                          lineNumber: 249,
                          columnNumber: 23
                        }, void 0)
                      },
                      void 0,
                      false,
                      {
                        fileName: "/home/ian/projects/reboot/src/Router.tsx",
                        lineNumber: 246,
                        columnNumber: 19
                      },
                      void 0
                    ),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                      Route,
                      {
                        path: "/fractional-cmo-guide/vs-full-time-cmo",
                        element: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ErrorBoundary, { level: "page", name: "FractionalCMOVsFullTimePage", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(FractionalCMOVsFullTime, {}, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/Router.tsx",
                          lineNumber: 258,
                          columnNumber: 25
                        }, void 0) }, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/Router.tsx",
                          lineNumber: 257,
                          columnNumber: 23
                        }, void 0)
                      },
                      void 0,
                      false,
                      {
                        fileName: "/home/ian/projects/reboot/src/Router.tsx",
                        lineNumber: 254,
                        columnNumber: 19
                      },
                      void 0
                    ),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                      Route,
                      {
                        path: "/fractional-cmo-guide/vs-consultant",
                        element: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ErrorBoundary, { level: "page", name: "FractionalCMOVsConsultantPage", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(FractionalCMOVsConsultant, {}, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/Router.tsx",
                          lineNumber: 266,
                          columnNumber: 25
                        }, void 0) }, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/Router.tsx",
                          lineNumber: 265,
                          columnNumber: 23
                        }, void 0)
                      },
                      void 0,
                      false,
                      {
                        fileName: "/home/ian/projects/reboot/src/Router.tsx",
                        lineNumber: 262,
                        columnNumber: 19
                      },
                      void 0
                    ),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                      Route,
                      {
                        path: "/fractional-cmo-guide/vs-in-house-team",
                        element: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ErrorBoundary, { level: "page", name: "FractionalCMOVsInHousePage", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(FractionalCMOVsInHouse, {}, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/Router.tsx",
                          lineNumber: 274,
                          columnNumber: 25
                        }, void 0) }, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/Router.tsx",
                          lineNumber: 273,
                          columnNumber: 23
                        }, void 0)
                      },
                      void 0,
                      false,
                      {
                        fileName: "/home/ian/projects/reboot/src/Router.tsx",
                        lineNumber: 270,
                        columnNumber: 19
                      },
                      void 0
                    ),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                      Route,
                      {
                        path: "/fractional-cmo-guide/transition-strategies",
                        element: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ErrorBoundary, { level: "page", name: "TransitionStrategiesPage", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TransitionStrategies, {}, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/Router.tsx",
                          lineNumber: 282,
                          columnNumber: 25
                        }, void 0) }, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/Router.tsx",
                          lineNumber: 281,
                          columnNumber: 23
                        }, void 0)
                      },
                      void 0,
                      false,
                      {
                        fileName: "/home/ian/projects/reboot/src/Router.tsx",
                        lineNumber: 278,
                        columnNumber: 19
                      },
                      void 0
                    ),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                      Route,
                      {
                        path: "/fractional-cmo-guide/when-to-choose-each",
                        element: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ErrorBoundary, { level: "page", name: "WhenToChooseEachPage", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(WhenToChooseEach, {}, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/Router.tsx",
                          lineNumber: 290,
                          columnNumber: 25
                        }, void 0) }, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/Router.tsx",
                          lineNumber: 289,
                          columnNumber: 23
                        }, void 0)
                      },
                      void 0,
                      false,
                      {
                        fileName: "/home/ian/projects/reboot/src/Router.tsx",
                        lineNumber: 286,
                        columnNumber: 19
                      },
                      void 0
                    ),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                      Route,
                      {
                        path: "/fractional-cmo-guide/cost-roi-analysis",
                        element: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ErrorBoundary, { level: "page", name: "CostROIAnalysisPage", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CostROIAnalysis, {}, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/Router.tsx",
                          lineNumber: 298,
                          columnNumber: 25
                        }, void 0) }, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/Router.tsx",
                          lineNumber: 297,
                          columnNumber: 23
                        }, void 0)
                      },
                      void 0,
                      false,
                      {
                        fileName: "/home/ian/projects/reboot/src/Router.tsx",
                        lineNumber: 294,
                        columnNumber: 19
                      },
                      void 0
                    )
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/Router.tsx",
                    lineNumber: 78,
                    columnNumber: 17
                  }, void 0)
                },
                void 0,
                false,
                {
                  fileName: "/home/ian/projects/reboot/src/Router.tsx",
                  lineNumber: 67,
                  columnNumber: 15
                },
                void 0
              )
            },
            void 0,
            false,
            {
              fileName: "/home/ian/projects/reboot/src/Router.tsx",
              lineNumber: 62,
              columnNumber: 13
            },
            void 0
          ),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ErrorBoundary, { level: "component", name: "LeadFormBoundary", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(LeadForm, {}, void 0, false, {
            fileName: "/home/ian/projects/reboot/src/Router.tsx",
            lineNumber: 310,
            columnNumber: 15
          }, void 0) }, void 0, false, {
            fileName: "/home/ian/projects/reboot/src/Router.tsx",
            lineNumber: 309,
            columnNumber: 13
          }, void 0)
        ] }, void 0, true, {
          fileName: "/home/ian/projects/reboot/src/Router.tsx",
          lineNumber: 58,
          columnNumber: 11
        }, void 0) }, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/Router.tsx",
          lineNumber: 57,
          columnNumber: 9
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(NotificationSystem, {}, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/Router.tsx",
          lineNumber: 317,
          columnNumber: 9
        }, void 0)
      ]
    },
    void 0,
    true,
    {
      fileName: "/home/ian/projects/reboot/src/Router.tsx",
      lineNumber: 52,
      columnNumber: 7
    },
    void 0
  ) }, void 0, false, {
    fileName: "/home/ian/projects/reboot/src/Router.tsx",
    lineNumber: 51,
    columnNumber: 5
  }, void 0);
};
registerServiceWorker({
  onSuccess: () => {
    console.log("[App] Service Worker registered successfully");
  },
  onUpdate: () => {
    console.log("[App] New content available, will update on next visit");
  },
  onOfflineReady: () => {
    console.log("[App] App is ready to work offline");
  }
});
setupPerformanceIntegration();
clientExports.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(reactExports.StrictMode, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Router, {}, void 0, false, {
    fileName: "/home/ian/projects/reboot/src/main.tsx",
    lineNumber: 26,
    columnNumber: 5
  }, void 0) }, void 0, false, {
    fileName: "/home/ian/projects/reboot/src/main.tsx",
    lineNumber: 25,
    columnNumber: 3
  }, void 0)
);
//# sourceMappingURL=index-BHIPPmaM.js.map
