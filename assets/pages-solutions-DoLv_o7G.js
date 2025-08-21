import { r as reactExports, j as jsxDevRuntimeExports } from "./react-core-CWvNQPo6.js";
import { b as getCanonicalUrl } from "./app-utils-B6wQ-etB.js";
import { B as BackgroundGradient, G as GlobalHeader, a as GlobalFooter } from "./components-core-xXGIfVLZ.js";
import { S as SEOHead } from "./components-utils-B8LwQ22Q.js";
import { c as useLeadForm } from "./app-state-DidY2Q5Y.js";
const GrowthPlateauSolutions = () => {
  const { setShowDropdownForm } = useLeadForm();
  reactExports.useEffect(() => {
    document.title = "Stuck at $1M Revenue? Growth Plateau Solutions That Work | Reboot Media";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Why 67% of growth-stage companies hit revenue plateaus between $500K-$1.5M and the proven marketing psychology fixes that break through to predictable scaling.");
    }
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement("meta");
      metaKeywords.setAttribute("name", "keywords");
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute("content", "growth plateau solutions, revenue stuck marketing problems, business growth plateau, marketing not working growth stage, scale past million dollar revenue");
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Stuck at $1M Revenue? Growth Plateau Solutions That Work",
      "description": "Why 67% of growth-stage companies hit revenue plateaus between $500K-$1.5M and the proven marketing psychology fixes that break through to predictable scaling.",
      "author": {
        "@type": "Person",
        "name": "Ian Ho",
        "url": "https://www.linkedin.com/in/ian-ho/"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Reboot Media",
        "url": "https://www.rebootmedia.net"
      },
      "mainEntityOfPage": getCanonicalUrl("growth-plateau-solutions"),
      "datePublished": "2025-01-01",
      "dateModified": "2025-01-01"
    });
    document.head.appendChild(script);
    return () => {
      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript && existingScript.textContent?.includes("Growth Plateau Solutions")) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);
  const plateauTypes = [
    {
      id: "revenue-ceiling",
      title: "Revenue Ceiling Breakthrough",
      description: "Stuck at $500K, $1M, or $1.5M for months? The problem isn't your product—it's that founder-led sales can't scale without documented processes.",
      link: "/growth-plateau-solutions/revenue-ceiling-breakthrough",
      gradient: "from-red-500 to-red-600",
      icon: "📊"
    },
    {
      id: "customer-acquisition",
      title: "Customer Acquisition Stall",
      description: "CAC keeps rising while conversion stays flat? You're competing on the same channels with the same message as everyone else.",
      link: "/growth-plateau-solutions/customer-acquisition-stall",
      gradient: "from-orange-500 to-orange-600",
      icon: "🎯"
    },
    {
      id: "market-expansion",
      title: "Market Expansion Barriers",
      description: "Core market feels saturated? The issue isn't market size—it's that you've defined your market by product category instead of problems solved.",
      link: "/growth-plateau-solutions/market-expansion-barriers",
      gradient: "from-yellow-500 to-yellow-600",
      icon: "🌍"
    },
    {
      id: "operational-scaling",
      title: "Operational Scaling Crisis",
      description: "Growth feels like everything's breaking? Manual processes that worked at $500K fail spectacularly at $2M+ without systems.",
      link: "/growth-plateau-solutions/operational-scaling-crisis",
      gradient: "from-green-500 to-green-600",
      icon: "⚙️"
    },
    {
      id: "team-bottlenecks",
      title: "Team Growth Bottlenecks",
      description: "Can't hire fast enough or new people aren't working out? The founder bottleneck kills scaling when everything still goes through you.",
      link: "/growth-plateau-solutions/team-growth-bottlenecks",
      gradient: "from-blue-500 to-blue-600",
      icon: "👥"
    },
    {
      id: "product-market-fit",
      title: "Product-Market Fit Erosion",
      description: "What worked before isn't working now? Markets evolve faster than products—your messaging may be stuck in the past.",
      link: "/growth-plateau-solutions/product-market-fit-erosion",
      gradient: "from-purple-500 to-purple-600",
      icon: "🎭"
    },
    {
      id: "competitive-pressure",
      title: "Competitive Pressure Plateau",
      description: "Bigger competitors crushing you? Stop competing on their terms—unique positioning beats feature wars every time.",
      link: "/growth-plateau-solutions/competitive-pressure-plateau",
      gradient: "from-pink-500 to-pink-600",
      icon: "⚔️"
    }
  ];
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "div",
      {
        "aria-live": "polite",
        "aria-atomic": "true",
        className: "sr-only",
        id: "status-announcer",
        children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "sr-only", children: "Content loaded successfully" }, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
          lineNumber: 131,
          columnNumber: 9
        }, void 0)
      },
      void 0,
      false,
      {
        fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
        lineNumber: 125,
        columnNumber: 7
      },
      void 0
    ),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      SEOHead,
      {
        title: "Stuck at $1M Revenue? Growth Plateau Solutions That Work | Reboot Media",
        description: "Why 67% of growth-stage companies hit revenue plateaus between $500K-$1.5M and the proven marketing psychology fixes that break through to predictable scaling.",
        canonicalUrl: getCanonicalUrl("growth-plateau-solutions")
      },
      void 0,
      false,
      {
        fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
        lineNumber: 134,
        columnNumber: 7
      },
      void 0
    ),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "growth-plateau-page min-h-screen relative overflow-hidden dark:bg-gray-900", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(BackgroundGradient, {}, void 0, false, {
        fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
        lineNumber: 142,
        columnNumber: 9
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "relative z-10", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(GlobalHeader, { onShowForm: () => setShowDropdownForm(true), showProgressBar: true }, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
          lineNumber: 145,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { className: "pt-20 md:pt-24 pb-16 bg-gradient-to-br from-red-900 via-red-950 to-black relative overflow-hidden", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(220,38,38,0.1)_0%,transparent_50%)]" }, void 0, false, {
            fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
            lineNumber: 149,
            columnNumber: 11
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "relative max-w-6xl mx-auto px-6 lg:px-8 text-center", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "inline-flex items-center gap-2 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 px-4 py-2 rounded-full text-sm font-semibold mb-6", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "w-2 h-2 bg-red-500 rounded-full animate-pulse" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                lineNumber: 152,
                columnNumber: 15
              }, void 0),
              "Revenue Stalled? You're Not Alone"
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
              lineNumber: 151,
              columnNumber: 13
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h1", { className: "heading-hero text-gradient-critical mb-6 leading-tight", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-red-400", children: "67% of Companies" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                lineNumber: 156,
                columnNumber: 15
              }, void 0),
              " Hit the",
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "block text-white mt-2", children: "$1M Revenue Wall" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                lineNumber: 157,
                columnNumber: 15
              }, void 0)
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
              lineNumber: 155,
              columnNumber: 13
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xl md:text-2xl text-important-accessible dark:text-gradient-safe mb-12 max-w-4xl mx-auto leading-relaxed", children: [
              "Your product works. Your team works hard. But revenue is stuck between $500K-$1.5M. The problem isn't your business model—it's your ",
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-red-400 font-semibold", children: "marketing psychology" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                lineNumber: 161,
                columnNumber: 63
              }, void 0),
              ". Here's how the 33% break through."
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
              lineNumber: 159,
              columnNumber: 13
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "button",
                {
                  "aria-label": "Opens contact form for free marketing analysis",
                  onClick: () => setShowDropdownForm(true),
                  className: "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 focus-visible:from-red-600 hover:to-red-700 focus-visible:to-red-700 text-white px-10 py-5 rounded-xl font-bold text-xl transition-all duration-300 transform hover:scale-105 focus-visible:scale-105 shadow-2xl",
                  children: "Break Through Your Plateau"
                },
                void 0,
                false,
                {
                  fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                  lineNumber: 165,
                  columnNumber: 15
                },
                void 0
              ),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "a",
                {
                  href: "#plateau-types",
                  className: "border-2 border-red-500 text-red-400 hover:bg-red-500 focus-visible:bg-red-500 hover:text-white focus-visible:text-white px-10 py-5 rounded-xl font-bold text-xl transition-all duration-300",
                  children: "Diagnose Your Plateau"
                },
                void 0,
                false,
                {
                  fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                  lineNumber: 171,
                  columnNumber: 15
                },
                void 0
              )
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
              lineNumber: 164,
              columnNumber: 13
            }, void 0)
          ] }, void 0, true, {
            fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
            lineNumber: 150,
            columnNumber: 11
          }, void 0)
        ] }, void 0, true, {
          fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
          lineNumber: 148,
          columnNumber: 9
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "main",
          {
            id: "main-content",
            className: "max-w-6xl mx-auto px-6 lg:px-8 py-20",
            role: "main",
            "aria-label": "Growth plateau solutions and strategies",
            children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { className: "mb-20 text-center", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "heading-xl text-gradient-critical mb-8", children: "The Revenue Plateau Crisis" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                  lineNumber: 191,
                  columnNumber: 13
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid md:grid-cols-3 gap-8 mb-16", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "glass-card-light rounded-2xl shadow-xl border border-red-200/50 dark:border-red-800/50 p-8", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-4xl font-black text-red-600 mb-4", children: "67%" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                      lineNumber: 196,
                      columnNumber: 17
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-lg font-semibold text-important-accessible dark:text-white mb-2", children: "Companies Plateau" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                      lineNumber: 197,
                      columnNumber: 17
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-optional dark:text-gradient-safe", children: "Between $500K-$1.5M revenue" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                      lineNumber: 198,
                      columnNumber: 17
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                    lineNumber: 195,
                    columnNumber: 15
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "glass-card-light rounded-2xl shadow-xl border border-orange-200/50 dark:border-orange-800/50 p-8", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-4xl font-black text-orange-accessible mb-4", children: "14mo" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                      lineNumber: 201,
                      columnNumber: 17
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-lg font-semibold text-important-accessible dark:text-white mb-2", children: "Average Stuck Time" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                      lineNumber: 202,
                      columnNumber: 17
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-optional dark:text-gradient-safe", children: "Before breaking through" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                      lineNumber: 203,
                      columnNumber: 17
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                    lineNumber: 200,
                    columnNumber: 15
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "glass-card-light rounded-2xl shadow-xl border border-green-200/50 dark:border-green-800/50 p-8", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-4xl font-black text-green-600 mb-4", children: "$47K" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                      lineNumber: 206,
                      columnNumber: 17
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-lg font-semibold text-important-accessible dark:text-white mb-2", children: "Monthly Cost" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                      lineNumber: 207,
                      columnNumber: 17
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-optional dark:text-gradient-safe", children: "Of staying plateaued" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                      lineNumber: 208,
                      columnNumber: 17
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                    lineNumber: 205,
                    columnNumber: 15
                  }, void 0)
                ] }, void 0, true, {
                  fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                  lineNumber: 194,
                  columnNumber: 13
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl p-8 border border-red-200/50 dark:border-red-800/50", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "heading-lg text-black-important dark:text-white mb-4", children: "🚨 Every Month You Wait Costs You $47,000+" }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                    lineNumber: 213,
                    columnNumber: 15
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-lg text-black-standard dark:text-gradient-safe mb-6 max-w-3xl mx-auto", children: "While you're stuck at $1M, you should be at $1.5M+ with proper marketing psychology. That's $500K+ annual difference. Every month of delay costs you qualified opportunities competitors are capturing." }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                    lineNumber: 216,
                    columnNumber: 15
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                    "button",
                    {
                      "aria-label": "Opens contact form for free marketing analysis",
                      onClick: () => setShowDropdownForm(true),
                      className: "text-red-600 dark:text-red-400 font-bold hover:underline focus-visible:underline text-lg",
                      children: "Get your plateau breakthrough analysis →"
                    },
                    void 0,
                    false,
                    {
                      fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                      lineNumber: 220,
                      columnNumber: 15
                    },
                    void 0
                  )
                ] }, void 0, true, {
                  fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                  lineNumber: 212,
                  columnNumber: 13
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                lineNumber: 190,
                columnNumber: 11
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { id: "plateau-types", className: "mb-20", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "heading-xl text-gradient-critical mb-8 text-center", children: "7 Plateau Types (Which is Yours?)" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                  lineNumber: 231,
                  columnNumber: 13
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xl text-important-accessible dark:text-gradient-safe mb-16 text-center max-w-4xl mx-auto", children: "After analyzing 200+ growth-stage companies, we've identified exactly why companies get stuck. Each plateau type has specific psychology fixes that unlock the next revenue level." }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                  lineNumber: 234,
                  columnNumber: 13
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6", children: plateauTypes.map((plateau) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "group", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "a",
                  {
                    href: `${"/reboot"}${plateau.link}`,
                    className: "block glass-card-light rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-8 transition-all duration-300 hover:shadow-2xl focus-visible:shadow-2xl hover:scale-105 focus-visible:scale-105 hover:bg-white focus-visible:bg-white dark:hover:bg-slate-700 focus-visible:bg-slate-700/80",
                    children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center mb-6", children: [
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-4xl mb-4", children: plateau.icon }, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                          lineNumber: 247,
                          columnNumber: 23
                        }, void 0),
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "heading-md text-important-accessible dark:text-white mb-3 group-hover:text-transparent group-focus-visible:text-transparent focus-visible:text-transparent group-hover:bg-gradient-to-r group-focus-visible:bg-gradient-to-r focus-visible:bg-gradient-to-r group-hover:bg-clip-text group-focus-visible:bg-clip-text focus-visible:bg-clip-text group-hover:from-red-500 group-focus-visible:from-red-500 focus-visible:from-red-500 group-hover:to-orange-500 group-focus-visible:to-orange-500 focus-visible:to-orange-500 transition-all duration-300", children: plateau.title }, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                          lineNumber: 248,
                          columnNumber: 23
                        }, void 0)
                      ] }, void 0, true, {
                        fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                        lineNumber: 246,
                        columnNumber: 21
                      }, void 0),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-standard-accessible dark:text-gradient-safe text-base leading-relaxed mb-6 text-center", children: plateau.description }, void 0, false, {
                        fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                        lineNumber: 252,
                        columnNumber: 21
                      }, void 0),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-center text-red-600 dark:text-red-400 font-semibold group-hover:text-red-700 group-focus-visible:text-red-700 focus-visible:text-red-700 dark:group-hover:text-red-300 group-focus-visible:text-red-300 focus-visible:text-red-300 transition-colors", children: "Discover Your Breakthrough →" }, void 0, false, {
                        fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                        lineNumber: 255,
                        columnNumber: 21
                      }, void 0)
                    ]
                  },
                  void 0,
                  true,
                  {
                    fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                    lineNumber: 242,
                    columnNumber: 19
                  },
                  void 0
                ) }, plateau.id, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                  lineNumber: 241,
                  columnNumber: 17
                }, void 0)) }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                  lineNumber: 239,
                  columnNumber: 13
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                lineNumber: 230,
                columnNumber: 11
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { className: "mb-20", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "glass-card-light rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-12", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "heading-xl text-gradient-critical mb-8 text-center", children: "The Psychology-Driven Breakthrough Framework" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                  lineNumber: 267,
                  columnNumber: 15
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xl text-standard-accessible dark:text-gradient-safe mb-12 text-center max-w-4xl mx-auto", children: [
                  "The 33% of companies that break through plateaus use this systematic approach. It's not about working harder—it's about ",
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "font-semibold text-red-600 dark:text-red-400", children: "marketing psychology that actually converts" }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                    lineNumber: 272,
                    columnNumber: 58
                  }, void 0),
                  "."
                ] }, void 0, true, {
                  fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                  lineNumber: 270,
                  columnNumber: 15
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid md:grid-cols-2 lg:grid-cols-4 gap-8", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mx-auto mb-4", children: "1" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                      lineNumber: 277,
                      columnNumber: 19
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "font-bold text-lg text-important-accessible dark:text-white mb-3", children: "Customer Says" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                      lineNumber: 278,
                      columnNumber: 19
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-optional dark:luminescence-layer-3 text-sm", children: "Exact language your stuck customers use" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                      lineNumber: 279,
                      columnNumber: 19
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                    lineNumber: 276,
                    columnNumber: 17
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mx-auto mb-4", children: "2" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                      lineNumber: 282,
                      columnNumber: 19
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "font-bold text-lg text-important-accessible dark:text-white mb-3", children: "Real Problem" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                      lineNumber: 283,
                      columnNumber: 19
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-optional dark:luminescence-layer-3 text-sm", children: "Hidden psychological root cause" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                      lineNumber: 284,
                      columnNumber: 19
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                    lineNumber: 281,
                    columnNumber: 17
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mx-auto mb-4", children: "3" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                      lineNumber: 287,
                      columnNumber: 19
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "font-bold text-lg text-important-accessible dark:text-white mb-3", children: "Solution" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                      lineNumber: 288,
                      columnNumber: 19
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-optional dark:luminescence-layer-3 text-sm", children: "Systems + psychology fix" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                      lineNumber: 289,
                      columnNumber: 19
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                    lineNumber: 286,
                    columnNumber: 17
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mx-auto mb-4", children: "4" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                      lineNumber: 292,
                      columnNumber: 19
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "font-bold text-lg text-important-accessible dark:text-white mb-3", children: "Why It Works" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                      lineNumber: 293,
                      columnNumber: 19
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-optional dark:luminescence-layer-3 text-sm", children: "Psychology principle explained" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                      lineNumber: 294,
                      columnNumber: 19
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                    lineNumber: 291,
                    columnNumber: 17
                  }, void 0)
                ] }, void 0, true, {
                  fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                  lineNumber: 275,
                  columnNumber: 15
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                lineNumber: 266,
                columnNumber: 13
              }, void 0) }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                lineNumber: 265,
                columnNumber: 11
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { className: "mb-16", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "heading-xl text-gradient-critical mb-12 text-center", children: "Master the Psychology Behind Breakthrough Growth" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                  lineNumber: 302,
                  columnNumber: 13
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid md:grid-cols-2 gap-8", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "glass-card-light rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-8 hover:shadow-2xl focus-visible:shadow-2xl transition-shadow", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "heading-lg text-important-accessible dark:text-white mb-4", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: `${"/reboot"}/marketing-psychology`, className: "hover:text-red-600 focus-visible:text-red-600 transition-colors", children: "Marketing Psychology Fundamentals →" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                      lineNumber: 308,
                      columnNumber: 19
                    }, void 0) }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                      lineNumber: 307,
                      columnNumber: 17
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-lg text-important-accessible dark:text-gradient-safe mb-6", children: "Master the 5 customer awareness stages and conversion psychology principles that transform scattered marketing into predictable revenue growth." }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                      lineNumber: 312,
                      columnNumber: 17
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                      "a",
                      {
                        href: `${"/reboot"}/marketing-psychology`,
                        className: "flex items-center text-red-600 dark:text-red-400 font-semibold hover:text-red-700 focus-visible:text-red-700 dark:hover:text-red-300 focus-visible:text-red-300 transition-colors",
                        children: [
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "mr-2", children: "📚" }, void 0, false, {
                            fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                            lineNumber: 319,
                            columnNumber: 19
                          }, void 0),
                          "Master $47K/Month Psychology"
                        ]
                      },
                      void 0,
                      true,
                      {
                        fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                        lineNumber: 315,
                        columnNumber: 17
                      },
                      void 0
                    )
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                    lineNumber: 306,
                    columnNumber: 15
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "glass-card-light rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-8 hover:shadow-2xl focus-visible:shadow-2xl transition-shadow", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "heading-lg text-important-accessible dark:text-white mb-4", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: `${"/reboot"}/fractional-cmo-guide`, className: "hover:text-red-600 focus-visible:text-red-600 transition-colors", children: "Need Strategic Marketing Leadership? →" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                      lineNumber: 326,
                      columnNumber: 19
                    }, void 0) }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                      lineNumber: 325,
                      columnNumber: 17
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-lg text-important-accessible dark:text-gradient-safe mb-6", children: "Compare fractional CMO vs agency approaches and discover which delivers faster plateau breakthrough results for your specific situation." }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                      lineNumber: 330,
                      columnNumber: 17
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                      "a",
                      {
                        href: `${"/reboot"}/fractional-cmo-guide/vs-marketing-agency`,
                        className: "flex items-center text-red-600 dark:text-red-400 font-semibold hover:text-red-700 focus-visible:text-red-700 dark:hover:text-red-300 focus-visible:text-red-300 transition-colors group",
                        children: [
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "mr-2", children: "🎯" }, void 0, false, {
                            fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                            lineNumber: 337,
                            columnNumber: 19
                          }, void 0),
                          "Get Your CMO vs Agency Answer",
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "ml-1 transform transition-transform group-hover:translate-x-1 group-focus-visible:translate-x-1 focus-visible:translate-x-1", children: "→" }, void 0, false, {
                            fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                            lineNumber: 339,
                            columnNumber: 19
                          }, void 0)
                        ]
                      },
                      void 0,
                      true,
                      {
                        fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                        lineNumber: 333,
                        columnNumber: 17
                      },
                      void 0
                    )
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                    lineNumber: 324,
                    columnNumber: 15
                  }, void 0)
                ] }, void 0, true, {
                  fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                  lineNumber: 305,
                  columnNumber: 13
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                lineNumber: 301,
                columnNumber: 11
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { className: "text-center bg-gradient-to-br from-red-900 via-red-950 to-black text-white rounded-2xl p-16", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "text-3xl md:text-5xl font-bold mb-8", children: 'Stop Accepting Plateau Revenue as "Normal"' }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                  lineNumber: 347,
                  columnNumber: 13
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xl text-gradient-safe mb-12 max-w-4xl mx-auto leading-relaxed", children: "The 33% who break through aren't smarter—they just understand marketing psychology. Every month you wait is another $47K+ of growth your competitors capture instead." }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                  lineNumber: 350,
                  columnNumber: 13
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex justify-center mb-8", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "button",
                  {
                    "aria-label": "Opens contact form for free marketing analysis",
                    onClick: () => setShowDropdownForm(true),
                    className: "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 focus-visible:from-red-600 hover:to-red-700 focus-visible:to-red-700 text-white px-12 py-6 rounded-xl font-bold text-2xl transition-all duration-300 transform hover:scale-105 focus-visible:scale-105 shadow-2xl",
                    children: "Get Your Free Plateau Breakthrough Analysis →"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                    lineNumber: 355,
                    columnNumber: 15
                  },
                  void 0
                ) }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                  lineNumber: 354,
                  columnNumber: 13
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "luminescence-layer-3 text-lg", children: "✅ Free plateau analysis • ✅ Psychology-driven roadmap • ✅ No obligation • ✅ 67% breakthrough rate" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                  lineNumber: 362,
                  columnNumber: 13
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
                lineNumber: 346,
                columnNumber: 11
              }, void 0)
            ]
          },
          void 0,
          true,
          {
            fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
            lineNumber: 182,
            columnNumber: 9
          },
          void 0
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(GlobalFooter, { onShowForm: () => setShowDropdownForm(true) }, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
          lineNumber: 369,
          columnNumber: 9
        }, void 0)
      ] }, void 0, true, {
        fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
        lineNumber: 144,
        columnNumber: 9
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
      lineNumber: 140,
      columnNumber: 7
    }, void 0)
  ] }, void 0, true, {
    fileName: "/home/ian/projects/reboot/src/pages/GrowthPlateauSolutions.tsx",
    lineNumber: 123,
    columnNumber: 5
  }, void 0);
};
const GrowthPlateauSolutions$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: GrowthPlateauSolutions
}, Symbol.toStringTag, { value: "Module" }));
const RevenueCeilingBreakthrough = () => {
  const { setShowDropdownForm } = useLeadForm();
  reactExports.useEffect(() => {
    document.title = "Stuck at $500K, $1M, or $1.5M Revenue? Revenue Ceiling Breakthrough | Reboot Media";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Revenue stuck at predictable milestones? 5 real scenarios showing why founder-led sales can't scale without documented processes and psychology-driven systems.");
    }
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement("meta");
      metaKeywords.setAttribute("name", "keywords");
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute("content", "revenue ceiling breakthrough, stuck at 1 million revenue, founder led sales scaling problems, sales process documentation");
  }, []);
  const scenarios = [
    {
      id: 1,
      title: "$500K-750K Plateau: The Founder Sales Trap",
      customerSays: "I'm still closing every deal personally",
      customerThinks: "I need more leads to grow, but I can't train anyone to sell like I do",
      realProblem: "No documented sales process means the founder's intuition can't be replicated",
      solution: "Document discovery questions, objection responses, and pricing conversations as decision trees",
      whyItWorks: "Makes founder's sales intuition transferable and scalable to other team members",
      painLevel: "High",
      timeStuck: "8-12 months",
      gradient: "from-red-500 to-red-600"
    },
    {
      id: 2,
      title: "$1M-1.2M Plateau: Wrong Lead Quality",
      customerSays: "We have leads but they don't convert like they used to",
      customerThinks: "We need better lead generation or our product isn't competitive",
      realProblem: "Broad targeting attracts unqualified prospects to hit volume goals",
      solution: "Narrow ICP definition, qualify harder upfront, say no to poor-fit prospects",
      whyItWorks: "Better to have 10 perfect-fit prospects than 100 poor-fit ones",
      painLevel: "Medium",
      timeStuck: "6-10 months",
      gradient: "from-orange-500 to-orange-600"
    },
    {
      id: 3,
      title: "$1.2M-1.5M Plateau: Pricing Model Breakdown",
      customerSays: "We win deals but margins keep shrinking",
      customerThinks: "Market is getting more competitive, we need to be more flexible on pricing",
      realProblem: "Custom pricing and negotiation erode unit economics at scale",
      solution: "Standardize offerings into 3 tiers, value-based pricing, remove negotiation",
      whyItWorks: "Predictable revenue requires predictable pricing without exceptions",
      painLevel: "High",
      timeStuck: "12-18 months",
      gradient: "from-yellow-500 to-yellow-600"
    },
    {
      id: 4,
      title: "$1.5M-2M Plateau: Sales Team Scaling Crisis",
      customerSays: "New salespeople aren't hitting quota consistently",
      customerThinks: "We hired the wrong people or our market is getting saturated",
      realProblem: "No systematic onboarding or sales playbook for new reps",
      solution: "Create 90-day rep onboarding, record founder's best sales calls, build objection library",
      whyItWorks: "New reps can learn proven patterns instead of starting from scratch",
      painLevel: "Very High",
      timeStuck: "18-24 months",
      gradient: "from-green-500 to-green-600"
    },
    {
      id: 5,
      title: "$2M+ Plateau: Market Positioning Confusion",
      customerSays: "We're losing deals to competitors we used to beat easily",
      customerThinks: "Competitors have caught up or we need better features",
      realProblem: "Messaging hasn't evolved with company size - still sounds like startup",
      solution: "Reposition as established player, emphasize stability and track record",
      whyItWorks: "Buyer psychology changes - at $2M+ they want proven, not innovative",
      painLevel: "Medium",
      timeStuck: "6-12 months",
      gradient: "from-purple-500 to-purple-600"
    }
  ];
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "div",
      {
        "aria-live": "polite",
        "aria-atomic": "true",
        className: "sr-only",
        id: "status-announcer",
        children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "sr-only", children: "Content loaded successfully" }, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
          lineNumber: 101,
          columnNumber: 9
        }, void 0)
      },
      void 0,
      false,
      {
        fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
        lineNumber: 95,
        columnNumber: 7
      },
      void 0
    ),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      SEOHead,
      {
        title: "Stuck at $500K, $1M, or $1.5M Revenue? Revenue Ceiling Breakthrough | Reboot Media",
        description: "Revenue stuck at predictable milestones? 5 real scenarios showing why founder-led sales can't scale without documented processes and psychology-driven systems.",
        canonicalUrl: getCanonicalUrl("revenue-ceiling-breakthrough")
      },
      void 0,
      false,
      {
        fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
        lineNumber: 104,
        columnNumber: 7
      },
      void 0
    ),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "revenue-ceiling-page min-h-screen relative overflow-hidden dark:bg-gray-900", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(BackgroundGradient, {}, void 0, false, {
        fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
        lineNumber: 111,
        columnNumber: 9
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "relative z-10", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(GlobalHeader, { onShowForm: () => setShowDropdownForm(true), showProgressBar: true }, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
          lineNumber: 114,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { className: "pt-20 md:pt-24 pb-16 bg-gradient-to-br from-red-900 via-red-950 to-black relative overflow-hidden", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(220,38,38,0.1)_0%,transparent_50%)]" }, void 0, false, {
            fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
            lineNumber: 118,
            columnNumber: 13
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "relative max-w-5xl mx-auto px-6 lg:px-8", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-8", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("nav", { className: "flex items-center space-x-2 text-gradient-safe", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: `${"/reboot"}/growth-plateau-solutions`, className: "hover:text-red-400 focus-visible:text-red-400 transition-colors", children: "Growth Plateau Solutions" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                lineNumber: 124,
                columnNumber: 19
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: "→" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                lineNumber: 125,
                columnNumber: 19
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-red-400 font-semibold", children: "Revenue Ceiling Breakthrough" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                lineNumber: 126,
                columnNumber: 19
              }, void 0)
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
              lineNumber: 123,
              columnNumber: 17
            }, void 0) }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
              lineNumber: 122,
              columnNumber: 15
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "inline-flex items-center gap-2 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 px-4 py-2 rounded-full text-sm font-semibold mb-6", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "w-2 h-2 bg-red-500 rounded-full motion-safe:animate-pulse motion-reduce:animate-none" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                  lineNumber: 132,
                  columnNumber: 19
                }, void 0),
                "Revenue Stuck at Predictable Milestones"
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                lineNumber: 131,
                columnNumber: 17
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h1", { className: "heading-hero text-gradient-critical text-4xl md:text-6xl font-black mb-6 leading-tight", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-red-400", children: "Revenue Ceiling" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                  lineNumber: 136,
                  columnNumber: 19
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "block text-white mt-2", children: "Breakthrough Guide" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                  lineNumber: 137,
                  columnNumber: 19
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                lineNumber: 135,
                columnNumber: 17
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-black-important dark:text-gradient-critical text-xl text-gradient-safe mb-8 max-w-3xl mx-auto leading-relaxed", children: [
                "Stuck at $500K, $1M, or $1.5M for months? The problem isn't your product or market—it's that",
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-red-400 font-semibold", children: " founder-led sales can't scale" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                  lineNumber: 141,
                  columnNumber: 19
                }, void 0),
                " without documented processes."
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                lineNumber: 139,
                columnNumber: 17
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "button",
                {
                  "aria-label": "Opens contact form for free marketing analysis",
                  onClick: () => setShowDropdownForm(true),
                  className: "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 focus-visible:from-red-600 hover:to-red-700 focus-visible:to-red-700 text-white px-8 py-4 rounded-xl font-bold text-lg motion-safe:transition-all motion-reduce:transition-none motion-safe:duration-300 motion-reduce:duration-0 motion-safe:transform motion-safe:hover:scale-105 motion-reduce:transform-none motion-safe:focus-visible:scale-105 motion-reduce:transform-none shadow-xl",
                  children: "Break Through Your Revenue Ceiling"
                },
                void 0,
                false,
                {
                  fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                  lineNumber: 143,
                  columnNumber: 17
                },
                void 0
              )
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
              lineNumber: 130,
              columnNumber: 15
            }, void 0)
          ] }, void 0, true, {
            fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
            lineNumber: 119,
            columnNumber: 13
          }, void 0)
        ] }, void 0, true, {
          fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
          lineNumber: 117,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "main",
          {
            id: "main-content",
            role: "main",
            "aria-label": "Main content",
            className: "max-w-5xl mx-auto px-6 lg:px-8 py-16",
            children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { className: "mb-16", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "glass-card-light rounded-2xl shadow-xl border border-red-200/50 dark:border-red-800/50 p-8", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "heading-xl text-gradient-critical text-2xl font-bold replace-text-gray-900 dark:text-white mb-6 text-center", children: "Why Revenue Gets Stuck at Predictable Dollar Amounts" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                  lineNumber: 163,
                  columnNumber: 17
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-black-important dark:text-gradient-critical text-lg text-standard dark:text-gradient-safe mb-6 leading-relaxed text-center", children: "After analyzing 200+ growth-stage companies, we discovered that revenue plateaus happen at predictable milestones: $500K, $1M, $1.2M, $1.5M, and $2M. Each ceiling has a specific psychological and systems cause." }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                  lineNumber: 166,
                  columnNumber: 17
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid md:grid-cols-3 gap-6 mb-6", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-2xl font-bold text-red-600 mb-1", children: "67%" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                      lineNumber: 172,
                      columnNumber: 21
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm text-optional dark:luminescence-layer-3", children: "Hit predictable ceilings" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                      lineNumber: 173,
                      columnNumber: 21
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                    lineNumber: 171,
                    columnNumber: 19
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-2xl font-bold text-orange-accessible mb-1", children: "14mo" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                      lineNumber: 176,
                      columnNumber: 21
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm text-optional dark:luminescence-layer-3", children: "Average time stuck" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                      lineNumber: 177,
                      columnNumber: 21
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                    lineNumber: 175,
                    columnNumber: 19
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-2xl font-bold text-green-600 mb-1", children: "33%" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                      lineNumber: 180,
                      columnNumber: 21
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm text-optional dark:luminescence-layer-3", children: "Break through with systems" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                      lineNumber: 181,
                      columnNumber: 21
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                    lineNumber: 179,
                    columnNumber: 19
                  }, void 0)
                ] }, void 0, true, {
                  fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                  lineNumber: 170,
                  columnNumber: 17
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-black-important dark:text-gradient-critical text-standard dark:text-gradient-safe font-semibold text-center", children: "The root cause? What works at $500K breaks at $1M. What works at $1M breaks at $2M." }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                  lineNumber: 184,
                  columnNumber: 17
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                lineNumber: 162,
                columnNumber: 15
              }, void 0) }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                lineNumber: 161,
                columnNumber: 13
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { className: "mb-16", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "heading-xl text-gradient-critical text-3xl md:text-4xl font-bold replace-text-gray-900 dark:text-white mb-12 text-center", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "block", children: "5 Revenue Ceiling Scenarios" }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                    lineNumber: 193,
                    columnNumber: 17
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "block", children: "(Which is Yours?)" }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                    lineNumber: 194,
                    columnNumber: 17
                  }, void 0)
                ] }, void 0, true, {
                  fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                  lineNumber: 192,
                  columnNumber: 15
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-8", children: scenarios.map((scenario) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "glass-card-light rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: `bg-gradient-to-r ${scenario.gradient} p-6`, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex justify-between items-start", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "heading-lg text-black-important dark:text-white text-2xl font-bold text-white mb-2", children: scenario.title }, void 0, false, {
                        fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                        lineNumber: 203,
                        columnNumber: 27
                      }, void 0),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex gap-4 text-sm text-red-100", children: [
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: [
                          "Pain Level: ",
                          scenario.painLevel
                        ] }, void 0, true, {
                          fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                          lineNumber: 207,
                          columnNumber: 29
                        }, void 0),
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: [
                          "Typical Time Stuck: ",
                          scenario.timeStuck
                        ] }, void 0, true, {
                          fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                          lineNumber: 208,
                          columnNumber: 29
                        }, void 0)
                      ] }, void 0, true, {
                        fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                        lineNumber: 206,
                        columnNumber: 27
                      }, void 0)
                    ] }, void 0, true, {
                      fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                      lineNumber: 202,
                      columnNumber: 25
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "glass-panel rounded-full w-12 h-12 flex items-center justify-center text-white font-bold text-xl", children: scenario.id }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                      lineNumber: 211,
                      columnNumber: 25
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                    lineNumber: 201,
                    columnNumber: 23
                  }, void 0) }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                    lineNumber: 200,
                    columnNumber: 21
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-8", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid md:grid-cols-2 gap-8", children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-6", children: [
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border-l-4 border-red-500", children: [
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "heading-md text-black-important dark:text-white font-bold text-red-800 dark:text-red-300 mb-2 flex items-center", children: [
                            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "mr-2", children: "💬" }, void 0, false, {
                              fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                              lineNumber: 224,
                              columnNumber: 31
                            }, void 0),
                            "Customer Says:"
                          ] }, void 0, true, {
                            fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                            lineNumber: 223,
                            columnNumber: 29
                          }, void 0),
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-standard dark:text-gradient-safe italic", children: [
                            '"',
                            scenario.customerSays,
                            '"'
                          ] }, void 0, true, {
                            fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                            lineNumber: 227,
                            columnNumber: 29
                          }, void 0)
                        ] }, void 0, true, {
                          fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                          lineNumber: 222,
                          columnNumber: 27
                        }, void 0),
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 border-l-4 border-orange-500", children: [
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "heading-md text-black-important dark:text-white font-bold text-orange-800 dark:text-orange-300 mb-2 flex items-center", children: [
                            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "mr-2", children: "💭" }, void 0, false, {
                              fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                              lineNumber: 234,
                              columnNumber: 31
                            }, void 0),
                            "Customer Thinks:"
                          ] }, void 0, true, {
                            fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                            lineNumber: 233,
                            columnNumber: 29
                          }, void 0),
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-standard dark:text-gradient-safe", children: scenario.customerThinks }, void 0, false, {
                            fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                            lineNumber: 237,
                            columnNumber: 29
                          }, void 0)
                        ] }, void 0, true, {
                          fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                          lineNumber: 232,
                          columnNumber: 27
                        }, void 0)
                      ] }, void 0, true, {
                        fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                        lineNumber: 221,
                        columnNumber: 25
                      }, void 0),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-6", children: [
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-l-4 border-yellow-500", children: [
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "heading-md text-black-important dark:text-white font-bold text-yellow-800 dark:text-yellow-300 mb-2 flex items-center", children: [
                            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "mr-2", children: "🔍" }, void 0, false, {
                              fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                              lineNumber: 247,
                              columnNumber: 31
                            }, void 0),
                            "Real Problem:"
                          ] }, void 0, true, {
                            fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                            lineNumber: 246,
                            columnNumber: 29
                          }, void 0),
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-standard dark:text-gradient-safe", children: scenario.realProblem }, void 0, false, {
                            fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                            lineNumber: 250,
                            columnNumber: 29
                          }, void 0)
                        ] }, void 0, true, {
                          fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                          lineNumber: 245,
                          columnNumber: 27
                        }, void 0),
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500", children: [
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "heading-md text-black-important dark:text-white font-bold text-green-800 dark:text-green-300 mb-2 flex items-center", children: [
                            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "mr-2", children: "✅" }, void 0, false, {
                              fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                              lineNumber: 257,
                              columnNumber: 31
                            }, void 0),
                            "Solution:"
                          ] }, void 0, true, {
                            fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                            lineNumber: 256,
                            columnNumber: 29
                          }, void 0),
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-standard dark:text-gradient-safe", children: scenario.solution }, void 0, false, {
                            fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                            lineNumber: 260,
                            columnNumber: 29
                          }, void 0)
                        ] }, void 0, true, {
                          fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                          lineNumber: 255,
                          columnNumber: 27
                        }, void 0)
                      ] }, void 0, true, {
                        fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                        lineNumber: 244,
                        columnNumber: 25
                      }, void 0)
                    ] }, void 0, true, {
                      fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                      lineNumber: 218,
                      columnNumber: 23
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800", children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "heading-md text-black-important dark:text-white font-bold text-blue-800 dark:text-blue-300 mb-2 flex items-center", children: [
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "mr-2", children: "🧠" }, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                          lineNumber: 270,
                          columnNumber: 27
                        }, void 0),
                        "Why This Works:"
                      ] }, void 0, true, {
                        fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                        lineNumber: 269,
                        columnNumber: 25
                      }, void 0),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-black-standard dark:text-gradient-safe font-medium", children: scenario.whyItWorks }, void 0, false, {
                        fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                        lineNumber: 273,
                        columnNumber: 25
                      }, void 0)
                    ] }, void 0, true, {
                      fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                      lineNumber: 268,
                      columnNumber: 23
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                    lineNumber: 217,
                    columnNumber: 21
                  }, void 0)
                ] }, scenario.id, true, {
                  fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                  lineNumber: 199,
                  columnNumber: 19
                }, void 0)) }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                  lineNumber: 197,
                  columnNumber: 15
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                lineNumber: 191,
                columnNumber: 13
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { className: "mb-16", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl p-8 border border-red-200/50 dark:border-red-800/50", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-2xl font-bold replace-text-gray-900 dark:text-white mb-4", children: "🚨 Tired of Founder-Led Sales Bottlenecks?" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                  lineNumber: 286,
                  columnNumber: 17
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-lg text-black-standard dark:text-gradient-safe mb-6 max-w-3xl mx-auto", children: "Every month you stay stuck at your revenue ceiling, competitors with documented sales processes are capturing the growth that should be yours. Get your free plateau analysis and discover which ceiling scenario matches your situation." }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                  lineNumber: 289,
                  columnNumber: 17
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "button",
                  {
                    "aria-label": "Opens contact form for free marketing analysis",
                    onClick: () => setShowDropdownForm(true),
                    className: "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 focus-visible:from-red-600 hover:to-red-700 focus-visible:to-red-700 text-white px-8 py-4 rounded-xl font-bold text-lg motion-safe:transition-all motion-reduce:transition-none motion-safe:duration-300 motion-reduce:duration-0 motion-safe:transform motion-safe:hover:scale-105 motion-reduce:transform-none motion-safe:focus-visible:scale-105 motion-reduce:transform-none shadow-lg mr-4",
                    children: "Get Free Revenue Ceiling Analysis"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                    lineNumber: 293,
                    columnNumber: 17
                  },
                  void 0
                ),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "a",
                  {
                    href: `${"/reboot"}/growth-plateau-solutions`,
                    className: "border-2 border-red-500 text-red-600 hover:bg-red-500 focus-visible:bg-red-500 hover:text-white focus-visible:text-white px-8 py-4 rounded-xl font-bold text-lg motion-safe:transition-all motion-reduce:transition-none motion-safe:duration-300 motion-reduce:duration-0 inline-block",
                    children: "See All Plateau Types"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                    lineNumber: 299,
                    columnNumber: 17
                  },
                  void 0
                )
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                lineNumber: 285,
                columnNumber: 15
              }, void 0) }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                lineNumber: 284,
                columnNumber: 13
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { className: "mb-16", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "heading-xl text-gradient-critical text-3xl font-bold replace-text-gray-900 dark:text-white mb-8 text-center", children: "Related Growth Plateau Solutions" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                  lineNumber: 310,
                  columnNumber: 15
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid md:grid-cols-2 gap-6", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "glass-card-light rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-xl focus-visible:shadow-xl transition-shadow", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "heading-lg text-black-important dark:text-white text-xl font-bold replace-text-gray-900 dark:text-white mb-3", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: `${"/reboot"}/growth-plateau-solutions/customer-acquisition-stall`, className: "hover:text-red-600 focus-visible:text-red-600 transition-colors", children: "Customer Acquisition Stall →" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                      lineNumber: 316,
                      columnNumber: 21
                    }, void 0) }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                      lineNumber: 315,
                      columnNumber: 19
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-standard dark:text-gradient-safe", children: "CAC keeps rising while conversion stays flat? You're competing on the same channels with the same message as everyone else." }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                      lineNumber: 320,
                      columnNumber: 19
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                    lineNumber: 314,
                    columnNumber: 17
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "glass-card-light rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-xl focus-visible:shadow-xl transition-shadow", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "heading-lg text-black-important dark:text-white text-xl font-bold replace-text-gray-900 dark:text-white mb-3", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: `${"/reboot"}/marketing-psychology`, className: "hover:text-red-600 focus-visible:text-red-600 transition-colors", children: "Marketing Psychology Fundamentals →" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                      lineNumber: 326,
                      columnNumber: 21
                    }, void 0) }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                      lineNumber: 325,
                      columnNumber: 19
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-standard dark:text-gradient-safe", children: "Master the 5 customer awareness stages that transform scattered marketing into predictable revenue systems." }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                      lineNumber: 330,
                      columnNumber: 19
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                    lineNumber: 324,
                    columnNumber: 17
                  }, void 0)
                ] }, void 0, true, {
                  fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                  lineNumber: 313,
                  columnNumber: 15
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
                lineNumber: 309,
                columnNumber: 13
              }, void 0)
            ]
          },
          void 0,
          true,
          {
            fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
            lineNumber: 154,
            columnNumber: 11
          },
          void 0
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(GlobalFooter, { onShowForm: () => setShowDropdownForm(true) }, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
          lineNumber: 339,
          columnNumber: 11
        }, void 0)
      ] }, void 0, true, {
        fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
        lineNumber: 113,
        columnNumber: 9
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
      lineNumber: 110,
      columnNumber: 7
    }, void 0)
  ] }, void 0, true, {
    fileName: "/home/ian/projects/reboot/src/pages/RevenueCeilingBreakthrough.tsx",
    lineNumber: 93,
    columnNumber: 5
  }, void 0);
};
const RevenueCeilingBreakthrough$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: RevenueCeilingBreakthrough
}, Symbol.toStringTag, { value: "Module" }));
const CustomerAcquisitionStall = () => {
  const { setShowDropdownForm } = useLeadForm();
  reactExports.useEffect(() => {
    document.title = "CAC Rising, Conversion Flat? Customer Acquisition Stall Solutions | Reboot Media";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "CAC inflation killing growth? 7 customer acquisition stall patterns and psychology fixes that break through the same-channel, same-message competition trap.");
    }
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement("meta");
      metaKeywords.setAttribute("name", "keywords");
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute("content", "customer acquisition cost rising, CAC inflation, lead generation problems, conversion rate stuck, customer acquisition stall");
  }, []);
  const scenarios = [
    {
      id: 1,
      title: 'The "More Leads" Trap',
      customerSays: "Our CAC keeps rising but MQLs are flat",
      customerThinks: "We need more volume to hit our growth targets",
      realProblem: "Broad targeting to hit lead volume goals attracts unqualified prospects",
      solution: "Narrow ICP, qualify harder before handoff, focus on revenue per lead not total leads",
      whyItWorks: "Better to pay $200 for qualified lead than $50 for junk that wastes sales time",
      painLevel: "High",
      timeStuck: "6-12 months",
      gradient: "from-red-500 to-red-600"
    },
    {
      id: 2,
      title: 'The "Best Practice" Copying Trap',
      customerSays: "We're doing everything competitors do",
      customerThinks: "If it works for them, it should work for us",
      realProblem: "Same channels, same message, same prospects = commodity competition",
      solution: "Find overlooked channels where your ICP hangs out, differentiated messaging",
      whyItWorks: "Blue ocean in channel strategy, not product features",
      painLevel: "Medium",
      timeStuck: "8-14 months",
      gradient: "from-orange-500 to-orange-600"
    },
    {
      id: 3,
      title: 'The "Features War" Messaging Trap',
      customerSays: "Our product is clearly superior",
      customerThinks: "Prospects should see how much better our features are",
      realProblem: "Prospects don't care about features, they care about outcomes",
      solution: "Outcome-focused messaging matched to customer awareness stages",
      whyItWorks: "People buy results and risk reduction, not feature lists",
      painLevel: "Very High",
      timeStuck: "12-18 months",
      gradient: "from-yellow-500 to-yellow-600"
    },
    {
      id: 4,
      title: 'The "Spray and Pray" Testing Trap',
      customerSays: "We try different things but nothing sticks",
      customerThinks: "We need to test more channels and tactics",
      realProblem: "Random testing without hypothesis or systematic measurement",
      solution: "Scientific approach: hypothesis → test → measure → scale what works",
      whyItWorks: "Compound improvement from systematic testing beats random changes",
      painLevel: "High",
      timeStuck: "10-16 months",
      gradient: "from-green-500 to-green-600"
    },
    {
      id: 5,
      title: 'The "Vanity Metrics" Focus Trap',
      customerSays: "Our website traffic is growing nicely",
      customerThinks: "More visitors should equal more customers",
      realProblem: "Traffic doesn't equal revenue if visitors aren't qualified",
      solution: "Focus on revenue-driving metrics: revenue per visitor, qualified leads, close rates",
      whyItWorks: "Revenue per visitor > total visitors for sustainable growth",
      painLevel: "Medium",
      timeStuck: "6-10 months",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      id: 6,
      title: 'The "One-Size-Fits-All" Funnel Trap',
      customerSays: "Our conversion rate is stuck",
      customerThinks: "We need better landing pages or offers",
      realProblem: "Unaware prospects get 'buy now' messaging, aware prospects get education",
      solution: "Different funnels for different awareness stages and traffic sources",
      whyItWorks: "Right message, right stage, right time = higher conversion",
      painLevel: "High",
      timeStuck: "8-14 months",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      id: 7,
      title: 'The "Discount Dependency" Trap',
      customerSays: "We have to discount to close deals",
      customerThinks: "Market is getting more price sensitive",
      realProblem: "Value proposition isn't compelling enough without price reduction",
      solution: "Reframe around ROI and risk reduction, remove negotiation options",
      whyItWorks: "Value > Price when communicated through loss aversion psychology",
      painLevel: "Very High",
      timeStuck: "12-24 months",
      gradient: "from-pink-500 to-pink-600"
    }
  ];
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "div",
      {
        "aria-live": "polite",
        "aria-atomic": "true",
        className: "sr-only",
        id: "status-announcer",
        children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "sr-only", children: "Content loaded successfully" }, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
          lineNumber: 125,
          columnNumber: 9
        }, void 0)
      },
      void 0,
      false,
      {
        fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
        lineNumber: 119,
        columnNumber: 7
      },
      void 0
    ),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      SEOHead,
      {
        title: "CAC Rising, Conversion Flat? Customer Acquisition Stall Solutions | Reboot Media",
        description: "CAC inflation killing growth? 7 customer acquisition stall patterns and psychology fixes that break through the same-channel, same-message competition trap.",
        canonicalUrl: getCanonicalUrl("customer-acquisition-stall")
      },
      void 0,
      false,
      {
        fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
        lineNumber: 128,
        columnNumber: 7
      },
      void 0
    ),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "customer-acquisition-page min-h-screen relative overflow-hidden dark:bg-gray-900", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(BackgroundGradient, {}, void 0, false, {
        fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
        lineNumber: 135,
        columnNumber: 9
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "relative z-10", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(GlobalHeader, { onShowForm: () => setShowDropdownForm(true), showProgressBar: true }, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
          lineNumber: 138,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { className: "pt-20 md:pt-24 pb-16 bg-gradient-to-br from-orange-900 via-orange-950 to-black relative overflow-hidden", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(234,88,12,0.1)_0%,transparent_50%)]" }, void 0, false, {
            fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
            lineNumber: 142,
            columnNumber: 13
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "relative max-w-5xl mx-auto px-6 lg:px-8", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-8", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("nav", { className: "flex items-center space-x-2 text-gradient-safe", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: `${"/reboot"}/growth-plateau-solutions`, className: "hover:text-orange-400 focus-visible:text-orange-400 transition-colors", children: "Growth Plateau Solutions" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                lineNumber: 148,
                columnNumber: 19
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: "→" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                lineNumber: 149,
                columnNumber: 19
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-orange-400 font-semibold", children: "Customer Acquisition Stall" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                lineNumber: 150,
                columnNumber: 19
              }, void 0)
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
              lineNumber: 147,
              columnNumber: 17
            }, void 0) }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
              lineNumber: 146,
              columnNumber: 15
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "inline-flex items-center gap-2 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 px-4 py-2 rounded-full text-sm font-semibold mb-6", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "w-2 h-2 bg-orange-500 rounded-full animate-pulse" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                  lineNumber: 156,
                  columnNumber: 19
                }, void 0),
                "CAC Rising, Conversion Flat"
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                lineNumber: 155,
                columnNumber: 17
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h1", { className: "heading-hero text-gradient-critical text-4xl md:text-6xl font-black mb-6 leading-tight", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-orange-400", children: "Customer Acquisition" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                  lineNumber: 160,
                  columnNumber: 19
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "block text-white mt-2", children: "Stall Solutions" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                  lineNumber: 161,
                  columnNumber: 19
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                lineNumber: 159,
                columnNumber: 17
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-black-important dark:text-gradient-critical text-xl text-gradient-safe mb-8 max-w-3xl mx-auto leading-relaxed", children: [
                "CAC keeps rising while conversion stays flat? The problem isn't your product or budget—it's that you're",
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-orange-400 font-semibold", children: " competing on the same channels with the same message" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                  lineNumber: 165,
                  columnNumber: 19
                }, void 0),
                " as everyone else."
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                lineNumber: 163,
                columnNumber: 17
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "button",
                {
                  "aria-label": "Opens contact form for free marketing analysis",
                  onClick: () => setShowDropdownForm(true),
                  className: "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 focus-visible:from-orange-600 hover:to-orange-700 focus-visible:to-orange-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 focus-visible:scale-105 shadow-xl",
                  children: "Fix Your CAC Inflation"
                },
                void 0,
                false,
                {
                  fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                  lineNumber: 167,
                  columnNumber: 17
                },
                void 0
              )
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
              lineNumber: 154,
              columnNumber: 15
            }, void 0)
          ] }, void 0, true, {
            fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
            lineNumber: 143,
            columnNumber: 13
          }, void 0)
        ] }, void 0, true, {
          fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
          lineNumber: 141,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "main",
          {
            id: "main-content",
            role: "main",
            "aria-label": "Main content",
            className: "max-w-5xl mx-auto px-6 lg:px-8 py-16",
            children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { className: "mb-16", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "glass-card-light rounded-2xl shadow-xl border border-orange-200/50 dark:border-orange-800/50 p-8", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "heading-xl text-gradient-critical text-2xl font-bold replace-text-gray-900 dark:text-white mb-6 text-center", children: "Why Customer Acquisition Costs Keep Rising" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                  lineNumber: 187,
                  columnNumber: 17
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-black-important dark:text-gradient-critical text-lg text-standard dark:text-gradient-safe mb-6 leading-relaxed text-center", children: "CAC inflation isn't random—it follows predictable patterns. When everyone competes on the same channels with similar messaging, costs go up and quality goes down. The solution isn't more budget; it's psychology-driven differentiation." }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                  lineNumber: 190,
                  columnNumber: 17
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid md:grid-cols-3 gap-6 mb-6", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-2xl font-bold text-orange-accessible mb-1", children: "73%" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                      lineNumber: 196,
                      columnNumber: 21
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm text-optional dark:luminescence-layer-3", children: "Experience CAC inflation" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                      lineNumber: 197,
                      columnNumber: 21
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                    lineNumber: 195,
                    columnNumber: 19
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-2xl font-bold text-red-600 mb-1", children: "156%" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                      lineNumber: 200,
                      columnNumber: 21
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm text-optional dark:luminescence-layer-3", children: "Average CAC increase" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                      lineNumber: 201,
                      columnNumber: 21
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                    lineNumber: 199,
                    columnNumber: 19
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-2xl font-bold text-green-600 mb-1", children: "27%" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                      lineNumber: 204,
                      columnNumber: 21
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm text-optional dark:luminescence-layer-3", children: "Break cycle with differentiation" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                      lineNumber: 205,
                      columnNumber: 21
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                    lineNumber: 203,
                    columnNumber: 19
                  }, void 0)
                ] }, void 0, true, {
                  fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                  lineNumber: 194,
                  columnNumber: 17
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-black-important dark:text-gradient-critical text-standard dark:text-gradient-safe font-semibold text-center", children: "The pattern: Same channels → Same message → Same prospects → Price competition" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                  lineNumber: 208,
                  columnNumber: 17
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                lineNumber: 186,
                columnNumber: 15
              }, void 0) }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                lineNumber: 185,
                columnNumber: 13
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { className: "mb-16", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "heading-xl text-gradient-critical text-3xl md:text-4xl font-bold replace-text-gray-900 dark:text-white mb-12 text-center", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "block", children: "7 CAC Inflation Patterns" }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                    lineNumber: 217,
                    columnNumber: 17
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "block", children: "(Which is Yours?)" }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                    lineNumber: 218,
                    columnNumber: 17
                  }, void 0)
                ] }, void 0, true, {
                  fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                  lineNumber: 216,
                  columnNumber: 15
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-8", children: scenarios.map((scenario) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "glass-card-light rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: `bg-gradient-to-r ${scenario.gradient} p-6`, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex justify-between items-start", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "heading-lg text-black-important dark:text-white text-2xl font-bold text-white mb-2", children: scenario.title }, void 0, false, {
                        fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                        lineNumber: 227,
                        columnNumber: 27
                      }, void 0),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex gap-4 text-sm text-orange-100", children: [
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: [
                          "Pain Level: ",
                          scenario.painLevel
                        ] }, void 0, true, {
                          fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                          lineNumber: 231,
                          columnNumber: 29
                        }, void 0),
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: [
                          "Typical Time Stuck: ",
                          scenario.timeStuck
                        ] }, void 0, true, {
                          fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                          lineNumber: 232,
                          columnNumber: 29
                        }, void 0)
                      ] }, void 0, true, {
                        fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                        lineNumber: 230,
                        columnNumber: 27
                      }, void 0)
                    ] }, void 0, true, {
                      fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                      lineNumber: 226,
                      columnNumber: 25
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "glass-panel rounded-full w-12 h-12 flex items-center justify-center text-white font-bold text-xl", children: scenario.id }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                      lineNumber: 235,
                      columnNumber: 25
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                    lineNumber: 225,
                    columnNumber: 23
                  }, void 0) }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                    lineNumber: 224,
                    columnNumber: 21
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-8", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid md:grid-cols-2 gap-8", children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-6", children: [
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border-l-4 border-red-500", children: [
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "heading-md text-black-important dark:text-white font-bold text-red-800 dark:text-red-300 mb-2 flex items-center", children: [
                            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "mr-2", children: "💬" }, void 0, false, {
                              fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                              lineNumber: 248,
                              columnNumber: 31
                            }, void 0),
                            "Customer Says:"
                          ] }, void 0, true, {
                            fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                            lineNumber: 247,
                            columnNumber: 29
                          }, void 0),
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-standard dark:text-gradient-safe italic", children: [
                            '"',
                            scenario.customerSays,
                            '"'
                          ] }, void 0, true, {
                            fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                            lineNumber: 251,
                            columnNumber: 29
                          }, void 0)
                        ] }, void 0, true, {
                          fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                          lineNumber: 246,
                          columnNumber: 27
                        }, void 0),
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 border-l-4 border-orange-500", children: [
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "heading-md text-black-important dark:text-white font-bold text-orange-800 dark:text-orange-300 mb-2 flex items-center", children: [
                            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "mr-2", children: "💭" }, void 0, false, {
                              fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                              lineNumber: 258,
                              columnNumber: 31
                            }, void 0),
                            "Customer Thinks:"
                          ] }, void 0, true, {
                            fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                            lineNumber: 257,
                            columnNumber: 29
                          }, void 0),
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-standard dark:text-gradient-safe", children: scenario.customerThinks }, void 0, false, {
                            fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                            lineNumber: 261,
                            columnNumber: 29
                          }, void 0)
                        ] }, void 0, true, {
                          fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                          lineNumber: 256,
                          columnNumber: 27
                        }, void 0)
                      ] }, void 0, true, {
                        fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                        lineNumber: 245,
                        columnNumber: 25
                      }, void 0),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-6", children: [
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-l-4 border-yellow-500", children: [
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "heading-md text-black-important dark:text-white font-bold text-yellow-800 dark:text-yellow-300 mb-2 flex items-center", children: [
                            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "mr-2", children: "🔍" }, void 0, false, {
                              fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                              lineNumber: 271,
                              columnNumber: 31
                            }, void 0),
                            "Real Problem:"
                          ] }, void 0, true, {
                            fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                            lineNumber: 270,
                            columnNumber: 29
                          }, void 0),
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-standard dark:text-gradient-safe", children: scenario.realProblem }, void 0, false, {
                            fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                            lineNumber: 274,
                            columnNumber: 29
                          }, void 0)
                        ] }, void 0, true, {
                          fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                          lineNumber: 269,
                          columnNumber: 27
                        }, void 0),
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500", children: [
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "heading-md text-black-important dark:text-white font-bold text-green-800 dark:text-green-300 mb-2 flex items-center", children: [
                            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "mr-2", children: "✅" }, void 0, false, {
                              fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                              lineNumber: 281,
                              columnNumber: 31
                            }, void 0),
                            "Solution:"
                          ] }, void 0, true, {
                            fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                            lineNumber: 280,
                            columnNumber: 29
                          }, void 0),
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-standard dark:text-gradient-safe", children: scenario.solution }, void 0, false, {
                            fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                            lineNumber: 284,
                            columnNumber: 29
                          }, void 0)
                        ] }, void 0, true, {
                          fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                          lineNumber: 279,
                          columnNumber: 27
                        }, void 0)
                      ] }, void 0, true, {
                        fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                        lineNumber: 268,
                        columnNumber: 25
                      }, void 0)
                    ] }, void 0, true, {
                      fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                      lineNumber: 242,
                      columnNumber: 23
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800", children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "heading-md text-black-important dark:text-white font-bold text-blue-800 dark:text-blue-300 mb-2 flex items-center", children: [
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "mr-2", children: "🧠" }, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                          lineNumber: 294,
                          columnNumber: 27
                        }, void 0),
                        "Why This Works:"
                      ] }, void 0, true, {
                        fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                        lineNumber: 293,
                        columnNumber: 25
                      }, void 0),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-black-standard dark:text-gradient-safe font-medium", children: scenario.whyItWorks }, void 0, false, {
                        fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                        lineNumber: 297,
                        columnNumber: 25
                      }, void 0)
                    ] }, void 0, true, {
                      fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                      lineNumber: 292,
                      columnNumber: 23
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                    lineNumber: 241,
                    columnNumber: 21
                  }, void 0)
                ] }, scenario.id, true, {
                  fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                  lineNumber: 223,
                  columnNumber: 19
                }, void 0)) }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                  lineNumber: 221,
                  columnNumber: 15
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                lineNumber: 215,
                columnNumber: 13
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { className: "mb-16", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl p-8 border border-orange-200/50 dark:border-orange-800/50", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-2xl font-bold replace-text-gray-900 dark:text-white mb-4", children: "🚨 Stop Competing on Price in Saturated Channels" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                  lineNumber: 310,
                  columnNumber: 17
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-black-important dark:text-gradient-critical text-lg text-black-standard dark:text-gradient-safe mb-6 max-w-3xl mx-auto", children: "Every month you compete on the same channels with the same message, your CAC gets worse while competitors with differentiated psychology capture qualified prospects. Get your free acquisition analysis and discover which pattern is killing your efficiency." }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                  lineNumber: 313,
                  columnNumber: 17
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "button",
                  {
                    "aria-label": "Opens contact form for free marketing analysis",
                    onClick: () => setShowDropdownForm(true),
                    className: "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 focus-visible:from-orange-600 hover:to-orange-700 focus-visible:to-orange-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 focus-visible:scale-105 shadow-lg mr-4",
                    children: "Get Free CAC Analysis"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                    lineNumber: 317,
                    columnNumber: 17
                  },
                  void 0
                ),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "a",
                  {
                    href: `${"/reboot"}/growth-plateau-solutions`,
                    className: "border-2 border-orange-500 text-orange-accessible hover:bg-orange-500 focus-visible:bg-orange-500 hover:text-white focus-visible:text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 inline-block",
                    children: "See All Plateau Types"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                    lineNumber: 323,
                    columnNumber: 17
                  },
                  void 0
                )
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                lineNumber: 309,
                columnNumber: 15
              }, void 0) }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                lineNumber: 308,
                columnNumber: 13
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { className: "mb-16", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "heading-xl text-gradient-critical text-3xl font-bold replace-text-gray-900 dark:text-white mb-8 text-center", children: "Related Growth Plateau Solutions" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                  lineNumber: 334,
                  columnNumber: 15
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid md:grid-cols-2 gap-6", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "glass-card-light rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-xl focus-visible:shadow-xl transition-shadow", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "heading-lg text-black-important dark:text-white text-xl font-bold replace-text-gray-900 dark:text-white mb-3", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: `${"/reboot"}/growth-plateau-solutions/revenue-ceiling-breakthrough`, className: "hover:text-orange-accessible focus-visible:text-orange-accessible transition-colors", children: "Revenue Ceiling Breakthrough →" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                      lineNumber: 340,
                      columnNumber: 21
                    }, void 0) }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                      lineNumber: 339,
                      columnNumber: 19
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-standard dark:text-gradient-safe", children: "Revenue stuck at $500K, $1M, or $1.5M? The problem isn't your product—founder-led sales can't scale without documented processes." }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                      lineNumber: 344,
                      columnNumber: 19
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                    lineNumber: 338,
                    columnNumber: 17
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "glass-card-light rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-xl focus-visible:shadow-xl transition-shadow", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "heading-lg text-black-important dark:text-white text-xl font-bold replace-text-gray-900 dark:text-white mb-3", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: `${"/reboot"}/marketing-psychology`, className: "hover:text-orange-accessible focus-visible:text-orange-accessible transition-colors", children: "Marketing Psychology Fundamentals →" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                      lineNumber: 350,
                      columnNumber: 21
                    }, void 0) }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                      lineNumber: 349,
                      columnNumber: 19
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-standard dark:text-gradient-safe", children: "Master the 5 customer awareness stages that break through commodity competition with psychology-driven differentiation." }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                      lineNumber: 354,
                      columnNumber: 19
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                    lineNumber: 348,
                    columnNumber: 17
                  }, void 0)
                ] }, void 0, true, {
                  fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                  lineNumber: 337,
                  columnNumber: 15
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
                lineNumber: 333,
                columnNumber: 13
              }, void 0)
            ]
          },
          void 0,
          true,
          {
            fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
            lineNumber: 178,
            columnNumber: 11
          },
          void 0
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(GlobalFooter, { onShowForm: () => setShowDropdownForm(true) }, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
          lineNumber: 363,
          columnNumber: 11
        }, void 0)
      ] }, void 0, true, {
        fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
        lineNumber: 137,
        columnNumber: 9
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
      lineNumber: 134,
      columnNumber: 7
    }, void 0)
  ] }, void 0, true, {
    fileName: "/home/ian/projects/reboot/src/pages/CustomerAcquisitionStall.tsx",
    lineNumber: 117,
    columnNumber: 5
  }, void 0);
};
const CustomerAcquisitionStall$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CustomerAcquisitionStall
}, Symbol.toStringTag, { value: "Module" }));
const MarketExpansionBarriers = () => {
  const { setShowDropdownForm } = useLeadForm();
  reactExports.useEffect(() => {
    document.title = "Market Saturated? Market Expansion Barriers & Psychology Solutions | Reboot Media";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Core market feels saturated? 7 market expansion barriers and positioning psychology that breaks through the TAM limitation mindset.");
    }
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement("meta");
      metaKeywords.setAttribute("name", "keywords");
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute("content", "market expansion barriers, market saturation problems, TAM limitations, market expansion strategy, positioning psychology");
  }, []);
  const scenarios = [
    {
      id: 1,
      title: 'The "Our Market is Tapped Out" Myth',
      customerSays: "Everyone in our industry already knows us",
      customerThinks: "We need to find new industries or geographic markets",
      realProblem: "Defined market by product category, not by problems solved",
      solution: "Reframe around jobs-to-be-done, find new use cases for same product",
      whyItWorks: "Same product, different problems = new markets without new development",
      painLevel: "Medium",
      timeStuck: "8-14 months",
      gradient: "from-yellow-500 to-yellow-600"
    },
    {
      id: 2,
      title: 'The "Geographic Expansion" Trap',
      customerSays: "We need to expand to new cities/regions",
      customerThinks: "Location equals market opportunity",
      realProblem: "Geographic thinking instead of psychographic market definition",
      solution: "Find similar customer types in different industries/segments locally first",
      whyItWorks: "Customer psychology doesn't change with location, but logistics do",
      painLevel: "High",
      timeStuck: "12-18 months",
      gradient: "from-green-500 to-green-600"
    },
    {
      id: 3,
      title: 'The "Feature Expansion" Delusion',
      customerSays: "We need more functionality to compete in new markets",
      customerThinks: "More features = more markets we can serve",
      realProblem: "Feature bloat confuses core value proposition for all markets",
      solution: "Same features, different positioning and messaging for adjacent markets",
      whyItWorks: "Clarity > complexity for new market penetration psychology",
      painLevel: "Very High",
      timeStuck: "18-24 months",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      id: 4,
      title: 'The "Big Fish, Small Pond" Comfort Trap',
      customerSays: "We dominate our niche, why risk expanding?",
      customerThinks: "Expansion might hurt our current market position",
      realProblem: "Risk aversion and ego protection override growth opportunities",
      solution: "Test adjacent markets without abandoning core, portfolio approach",
      whyItWorks: "Diversification reduces risk rather than increasing it",
      painLevel: "Low",
      timeStuck: "6-12 months",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      id: 5,
      title: 'The "Brand Perception Lock-In" Barrier',
      customerSays: "People only see us as [specific category]",
      customerThinks: "We need to rebrand to expand markets",
      realProblem: "Messaging consistency valued over market opportunity",
      solution: "Umbrella positioning that encompasses multiple markets naturally",
      whyItWorks: "Brand evolution > revolution in customer perception psychology",
      painLevel: "High",
      timeStuck: "10-16 months",
      gradient: "from-pink-500 to-pink-600"
    },
    {
      id: 6,
      title: 'The "Validation Paralysis" Trap',
      customerSays: "We need more market research before expanding",
      customerThinks: "We don't have enough data to make expansion decisions",
      realProblem: "Analysis paralysis disguised as diligence and risk management",
      solution: "Small tests with existing customers in adjacent use cases",
      whyItWorks: "Speed to market > perfect market research in fast-changing landscapes",
      painLevel: "Medium",
      timeStuck: "8-12 months",
      gradient: "from-indigo-500 to-indigo-600"
    },
    {
      id: 7,
      title: 'The "Price Point Mismatch" Barrier',
      customerSays: "New markets won't pay our prices",
      customerThinks: "We need to lower prices to enter new markets",
      realProblem: "Same value proposition, different value perception by segment",
      solution: "Value ladder with different packages for different market segments",
      whyItWorks: "Same product, different value framing = segment-appropriate pricing",
      painLevel: "High",
      timeStuck: "12-18 months",
      gradient: "from-red-500 to-red-600"
    }
  ];
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "div",
      {
        "aria-live": "polite",
        "aria-atomic": "true",
        className: "sr-only",
        id: "status-announcer",
        children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "sr-only", children: "Content loaded successfully" }, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
          lineNumber: 125,
          columnNumber: 9
        }, void 0)
      },
      void 0,
      false,
      {
        fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
        lineNumber: 119,
        columnNumber: 7
      },
      void 0
    ),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      SEOHead,
      {
        title: "Market Saturated? Market Expansion Barriers & Psychology Solutions | Reboot Media",
        description: "Core market feels saturated? 7 market expansion barriers and positioning psychology that breaks through the TAM limitation mindset.",
        canonicalUrl: getCanonicalUrl("market-expansion-barriers")
      },
      void 0,
      false,
      {
        fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
        lineNumber: 128,
        columnNumber: 7
      },
      void 0
    ),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "market-expansion-page min-h-screen relative overflow-hidden dark:bg-gray-900", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(BackgroundGradient, {}, void 0, false, {
        fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
        lineNumber: 135,
        columnNumber: 9
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "relative z-10", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(GlobalHeader, { onShowForm: () => setShowDropdownForm(true), showProgressBar: true }, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
          lineNumber: 138,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { className: "pt-20 md:pt-24 pb-16 bg-gradient-to-br from-yellow-900 via-yellow-950 to-black relative overflow-hidden", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(202,138,4,0.1)_0%,transparent_50%)]" }, void 0, false, {
            fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
            lineNumber: 142,
            columnNumber: 13
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "relative max-w-5xl mx-auto px-6 lg:px-8", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-8", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("nav", { className: "flex items-center space-x-2 text-gradient-safe", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: `${"/reboot"}/growth-plateau-solutions`, className: "hover:text-yellow-400 focus-visible:text-yellow-400 transition-colors", children: "Growth Plateau Solutions" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                lineNumber: 148,
                columnNumber: 19
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: "→" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                lineNumber: 149,
                columnNumber: 19
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-yellow-400 font-semibold", children: "Market Expansion Barriers" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                lineNumber: 150,
                columnNumber: 19
              }, void 0)
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
              lineNumber: 147,
              columnNumber: 17
            }, void 0) }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
              lineNumber: 146,
              columnNumber: 15
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "inline-flex items-center gap-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 px-4 py-2 rounded-full text-sm font-semibold mb-6", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "w-2 h-2 bg-yellow-500 rounded-full animate-pulse" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                  lineNumber: 156,
                  columnNumber: 19
                }, void 0),
                "Market Feels Saturated"
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                lineNumber: 155,
                columnNumber: 17
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h1", { className: "heading-hero text-gradient-critical text-4xl md:text-6xl font-black text-white mb-6 leading-tight", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-yellow-400", children: "Market Expansion" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                  lineNumber: 160,
                  columnNumber: 19
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "block text-white mt-2", children: "Barrier Solutions" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                  lineNumber: 161,
                  columnNumber: 19
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                lineNumber: 159,
                columnNumber: 17
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-black-important dark:text-gradient-critical text-xl text-gradient-safe mb-8 max-w-3xl mx-auto leading-relaxed", children: [
                "Core market feels saturated? The issue isn't market size—it's that you've",
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-yellow-400 font-semibold", children: " defined your market by product category" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                  lineNumber: 165,
                  columnNumber: 19
                }, void 0),
                " instead of problems solved."
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                lineNumber: 163,
                columnNumber: 17
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "button",
                {
                  "aria-label": "Opens contact form for free marketing analysis",
                  onClick: () => setShowDropdownForm(true),
                  className: "bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 focus-visible:from-yellow-600 hover:to-yellow-700 focus-visible:to-yellow-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 focus-visible:scale-105 shadow-xl",
                  children: "Break Market Barriers"
                },
                void 0,
                false,
                {
                  fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                  lineNumber: 167,
                  columnNumber: 17
                },
                void 0
              )
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
              lineNumber: 154,
              columnNumber: 15
            }, void 0)
          ] }, void 0, true, {
            fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
            lineNumber: 143,
            columnNumber: 13
          }, void 0)
        ] }, void 0, true, {
          fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
          lineNumber: 141,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "main",
          {
            id: "main-content",
            role: "main",
            "aria-label": "Main content",
            className: "max-w-5xl mx-auto px-6 lg:px-8 py-16",
            children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { className: "mb-16", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "glass-card-light rounded-2xl shadow-xl border border-yellow-200/50 dark:border-yellow-800/50 p-8", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "heading-xl text-gradient-critical text-2xl font-bold replace-text-gray-900 dark:text-white mb-6 text-center", children: 'Why Market "Saturation" is Usually a Positioning Problem' }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                  lineNumber: 187,
                  columnNumber: 17
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-black-important dark:text-gradient-critical text-lg text-standard dark:text-gradient-safe mb-6 leading-relaxed text-center", children: `Most "saturated" markets aren't actually saturated—companies have just defined their addressable market too narrowly. The solution isn't finding new markets; it's redefining your current one through psychology and positioning.` }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                  lineNumber: 190,
                  columnNumber: 17
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid md:grid-cols-3 gap-6 mb-6", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-2xl font-bold text-yellow-600 mb-1", children: "78%" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                      lineNumber: 196,
                      columnNumber: 21
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm text-optional dark:luminescence-layer-3", children: "Feel market constrained" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                      lineNumber: 197,
                      columnNumber: 21
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                    lineNumber: 195,
                    columnNumber: 19
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-2xl font-bold text-red-600 mb-1", children: "3.4x" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                      lineNumber: 200,
                      columnNumber: 21
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm text-optional dark:luminescence-layer-3", children: "Larger addressable market" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                      lineNumber: 201,
                      columnNumber: 21
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                    lineNumber: 199,
                    columnNumber: 19
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-2xl font-bold text-green-600 mb-1", children: "22%" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                      lineNumber: 204,
                      columnNumber: 21
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm text-optional dark:luminescence-layer-3", children: "Succeed with repositioning" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                      lineNumber: 205,
                      columnNumber: 21
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                    lineNumber: 203,
                    columnNumber: 19
                  }, void 0)
                ] }, void 0, true, {
                  fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                  lineNumber: 194,
                  columnNumber: 17
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-black-important dark:text-gradient-critical text-standard dark:text-gradient-safe font-semibold text-center", children: "Pattern: Same product → Different problems → New markets" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                  lineNumber: 208,
                  columnNumber: 17
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                lineNumber: 186,
                columnNumber: 15
              }, void 0) }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                lineNumber: 185,
                columnNumber: 13
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { className: "mb-16", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "heading-xl text-gradient-critical text-3xl md:text-4xl font-bold replace-text-gray-900 dark:text-white mb-12 text-center", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "block", children: "7 Market Expansion Barriers" }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                    lineNumber: 217,
                    columnNumber: 17
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "block", children: "(Which is Yours?)" }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                    lineNumber: 218,
                    columnNumber: 17
                  }, void 0)
                ] }, void 0, true, {
                  fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                  lineNumber: 216,
                  columnNumber: 15
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-8", children: scenarios.map((scenario) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "glass-card-light rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: `bg-gradient-to-r ${scenario.gradient} p-6`, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex justify-between items-start", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "heading-lg text-black-important dark:text-white text-2xl font-bold text-white mb-2", children: scenario.title }, void 0, false, {
                        fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                        lineNumber: 227,
                        columnNumber: 27
                      }, void 0),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex gap-4 text-sm text-yellow-100", children: [
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: [
                          "Pain Level: ",
                          scenario.painLevel
                        ] }, void 0, true, {
                          fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                          lineNumber: 231,
                          columnNumber: 29
                        }, void 0),
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: [
                          "Typical Time Stuck: ",
                          scenario.timeStuck
                        ] }, void 0, true, {
                          fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                          lineNumber: 232,
                          columnNumber: 29
                        }, void 0)
                      ] }, void 0, true, {
                        fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                        lineNumber: 230,
                        columnNumber: 27
                      }, void 0)
                    ] }, void 0, true, {
                      fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                      lineNumber: 226,
                      columnNumber: 25
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "glass-panel rounded-full w-12 h-12 flex items-center justify-center text-white font-bold text-xl", children: scenario.id }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                      lineNumber: 235,
                      columnNumber: 25
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                    lineNumber: 225,
                    columnNumber: 23
                  }, void 0) }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                    lineNumber: 224,
                    columnNumber: 21
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-8", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid md:grid-cols-2 gap-8", children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-6", children: [
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border-l-4 border-red-500", children: [
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "heading-md text-black-important dark:text-white font-bold text-red-800 dark:text-red-300 mb-2 flex items-center", children: [
                            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "mr-2", children: "💬" }, void 0, false, {
                              fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                              lineNumber: 248,
                              columnNumber: 31
                            }, void 0),
                            "Customer Says:"
                          ] }, void 0, true, {
                            fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                            lineNumber: 247,
                            columnNumber: 29
                          }, void 0),
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-standard dark:text-gradient-safe italic", children: [
                            '"',
                            scenario.customerSays,
                            '"'
                          ] }, void 0, true, {
                            fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                            lineNumber: 251,
                            columnNumber: 29
                          }, void 0)
                        ] }, void 0, true, {
                          fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                          lineNumber: 246,
                          columnNumber: 27
                        }, void 0),
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-l-4 border-yellow-500", children: [
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "heading-md text-black-important dark:text-white font-bold text-yellow-800 dark:text-yellow-300 mb-2 flex items-center", children: [
                            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "mr-2", children: "💭" }, void 0, false, {
                              fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                              lineNumber: 258,
                              columnNumber: 31
                            }, void 0),
                            "Customer Thinks:"
                          ] }, void 0, true, {
                            fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                            lineNumber: 257,
                            columnNumber: 29
                          }, void 0),
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-standard dark:text-gradient-safe", children: scenario.customerThinks }, void 0, false, {
                            fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                            lineNumber: 261,
                            columnNumber: 29
                          }, void 0)
                        ] }, void 0, true, {
                          fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                          lineNumber: 256,
                          columnNumber: 27
                        }, void 0)
                      ] }, void 0, true, {
                        fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                        lineNumber: 245,
                        columnNumber: 25
                      }, void 0),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-6", children: [
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 border-l-4 border-orange-500", children: [
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "heading-md text-black-important dark:text-white font-bold text-orange-800 dark:text-orange-300 mb-2 flex items-center", children: [
                            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "mr-2", children: "🔍" }, void 0, false, {
                              fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                              lineNumber: 271,
                              columnNumber: 31
                            }, void 0),
                            "Real Problem:"
                          ] }, void 0, true, {
                            fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                            lineNumber: 270,
                            columnNumber: 29
                          }, void 0),
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-standard dark:text-gradient-safe", children: scenario.realProblem }, void 0, false, {
                            fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                            lineNumber: 274,
                            columnNumber: 29
                          }, void 0)
                        ] }, void 0, true, {
                          fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                          lineNumber: 269,
                          columnNumber: 27
                        }, void 0),
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500", children: [
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "heading-md text-black-important dark:text-white font-bold text-green-800 dark:text-green-300 mb-2 flex items-center", children: [
                            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "mr-2", children: "✅" }, void 0, false, {
                              fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                              lineNumber: 281,
                              columnNumber: 31
                            }, void 0),
                            "Solution:"
                          ] }, void 0, true, {
                            fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                            lineNumber: 280,
                            columnNumber: 29
                          }, void 0),
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-standard dark:text-gradient-safe", children: scenario.solution }, void 0, false, {
                            fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                            lineNumber: 284,
                            columnNumber: 29
                          }, void 0)
                        ] }, void 0, true, {
                          fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                          lineNumber: 279,
                          columnNumber: 27
                        }, void 0)
                      ] }, void 0, true, {
                        fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                        lineNumber: 268,
                        columnNumber: 25
                      }, void 0)
                    ] }, void 0, true, {
                      fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                      lineNumber: 242,
                      columnNumber: 23
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800", children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "heading-md text-black-important dark:text-white font-bold text-blue-800 dark:text-blue-300 mb-2 flex items-center", children: [
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "mr-2", children: "🧠" }, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                          lineNumber: 294,
                          columnNumber: 27
                        }, void 0),
                        "Why This Works:"
                      ] }, void 0, true, {
                        fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                        lineNumber: 293,
                        columnNumber: 25
                      }, void 0),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-black-standard dark:text-gradient-safe font-medium", children: scenario.whyItWorks }, void 0, false, {
                        fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                        lineNumber: 297,
                        columnNumber: 25
                      }, void 0)
                    ] }, void 0, true, {
                      fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                      lineNumber: 292,
                      columnNumber: 23
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                    lineNumber: 241,
                    columnNumber: 21
                  }, void 0)
                ] }, scenario.id, true, {
                  fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                  lineNumber: 223,
                  columnNumber: 19
                }, void 0)) }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                  lineNumber: 221,
                  columnNumber: 15
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                lineNumber: 215,
                columnNumber: 13
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { className: "mb-16", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl p-8 border border-yellow-200/50 dark:border-yellow-800/50", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-2xl font-bold replace-text-gray-900 dark:text-white mb-4", children: '🚨 Stop Accepting Market "Limitations" as Reality' }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                  lineNumber: 310,
                  columnNumber: 17
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-black-important dark:text-gradient-critical text-lg text-black-standard dark:text-gradient-safe mb-6 max-w-3xl mx-auto", children: "Every month you stay trapped by narrow market definitions, competitors with better positioning psychology are capturing expansion opportunities you can't see. Get your free expansion analysis and discover which barriers are limiting your growth." }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                  lineNumber: 313,
                  columnNumber: 17
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "button",
                  {
                    "aria-label": "Opens contact form for free marketing analysis",
                    onClick: () => setShowDropdownForm(true),
                    className: "bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 focus-visible:from-yellow-600 hover:to-yellow-700 focus-visible:to-yellow-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 focus-visible:scale-105 shadow-lg mr-4",
                    children: "Get Free Market Expansion Analysis"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                    lineNumber: 317,
                    columnNumber: 17
                  },
                  void 0
                ),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "a",
                  {
                    href: `${"/reboot"}/growth-plateau-solutions`,
                    className: "border-2 border-yellow-500 text-yellow-600 hover:bg-yellow-500 focus-visible:bg-yellow-500 hover:text-white focus-visible:text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 inline-block",
                    children: "See All Plateau Types"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                    lineNumber: 323,
                    columnNumber: 17
                  },
                  void 0
                )
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                lineNumber: 309,
                columnNumber: 15
              }, void 0) }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                lineNumber: 308,
                columnNumber: 13
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { className: "mb-16", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "heading-xl text-gradient-critical text-3xl font-bold replace-text-gray-900 dark:text-white mb-8 text-center", children: "Related Growth Plateau Solutions" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                  lineNumber: 334,
                  columnNumber: 15
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid md:grid-cols-2 gap-6", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "glass-card-light rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-xl focus-visible:shadow-xl transition-shadow", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "heading-lg text-black-important dark:text-white text-xl font-bold replace-text-gray-900 dark:text-white mb-3", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: `${"/reboot"}/growth-plateau-solutions/customer-acquisition-stall`, className: "hover:text-yellow-600 focus-visible:text-yellow-600 transition-colors", children: "Customer Acquisition Stall →" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                      lineNumber: 340,
                      columnNumber: 21
                    }, void 0) }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                      lineNumber: 339,
                      columnNumber: 19
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-standard dark:text-gradient-safe", children: "CAC rising while conversion stays flat? Stop competing on the same channels with the same message as everyone else." }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                      lineNumber: 344,
                      columnNumber: 19
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                    lineNumber: 338,
                    columnNumber: 17
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "glass-card-light rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-xl focus-visible:shadow-xl transition-shadow", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "heading-lg text-black-important dark:text-white text-xl font-bold replace-text-gray-900 dark:text-white mb-3", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: `${"/reboot"}/marketing-psychology`, className: "hover:text-yellow-600 focus-visible:text-yellow-600 transition-colors", children: "Marketing Psychology Fundamentals →" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                      lineNumber: 350,
                      columnNumber: 21
                    }, void 0) }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                      lineNumber: 349,
                      columnNumber: 19
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-standard dark:text-gradient-safe", children: "Master positioning psychology and awareness stages that reveal hidden market expansion opportunities." }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                      lineNumber: 354,
                      columnNumber: 19
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                    lineNumber: 348,
                    columnNumber: 17
                  }, void 0)
                ] }, void 0, true, {
                  fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                  lineNumber: 337,
                  columnNumber: 15
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
                lineNumber: 333,
                columnNumber: 13
              }, void 0)
            ]
          },
          void 0,
          true,
          {
            fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
            lineNumber: 178,
            columnNumber: 11
          },
          void 0
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(GlobalFooter, { onShowForm: () => setShowDropdownForm(true) }, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
          lineNumber: 363,
          columnNumber: 11
        }, void 0)
      ] }, void 0, true, {
        fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
        lineNumber: 137,
        columnNumber: 9
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
      lineNumber: 134,
      columnNumber: 7
    }, void 0)
  ] }, void 0, true, {
    fileName: "/home/ian/projects/reboot/src/pages/MarketExpansionBarriers.tsx",
    lineNumber: 117,
    columnNumber: 5
  }, void 0);
};
const MarketExpansionBarriers$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: MarketExpansionBarriers
}, Symbol.toStringTag, { value: "Module" }));
const OperationalScalingCrisis = () => {
  const { setShowDropdownForm } = useLeadForm();
  reactExports.useEffect(() => {
    document.title = "Growth Breaking Everything? Operational Scaling Crisis Solutions | Reboot Media";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Growth feels like everything's breaking? 7 operational scaling crisis patterns where manual processes that worked at $500K fail at $2M+.");
    }
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement("meta");
      metaKeywords.setAttribute("name", "keywords");
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute("content", "operational scaling problems, business operations breaking, scaling crisis, manual processes failing, operational bottlenecks");
  }, []);
  const scenarios = [
    {
      id: 1,
      title: 'The "Hero Dependency" Crisis',
      customerSays: "Everything has to go through me or Sarah",
      customerThinks: "We need to hire more people who can handle complex decisions",
      realProblem: "No documented processes - institutional knowledge trapped in key people's heads",
      solution: "Document processes and decision frameworks, not just outcomes",
      whyItWorks: "Systems > heroes for sustainable scaling - replicates thinking patterns",
      painLevel: "Very High",
      timeStuck: "12-18 months",
      gradient: "from-green-500 to-green-600"
    },
    {
      id: 2,
      title: 'The "Quality Erosion" Crisis',
      customerSays: "Our quality isn't what it used to be",
      customerThinks: "Growth is forcing us to compromise on standards",
      realProblem: "Manual QC processes don't scale with volume increases",
      solution: "Automate quality checkpoints, standardize delivery workflows",
      whyItWorks: "Consistent systems maintain consistent quality at any scale",
      painLevel: "High",
      timeStuck: "8-14 months",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      id: 3,
      title: 'The "Customer Experience Decay" Crisis',
      customerSays: "Customers complain we're not responsive anymore",
      customerThinks: "We need more customer service people",
      realProblem: "Same service model for 10 customers applied to 100 customers",
      solution: "Tiered service levels, self-service options, automation for routine tasks",
      whyItWorks: "Right service level for right customer segment preserves experience",
      painLevel: "High",
      timeStuck: "6-12 months",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      id: 4,
      title: 'The "Manual Process Breakdown" Crisis',
      customerSays: "We're drowning in manual work",
      customerThinks: "We need better project management or more organized people",
      realProblem: "Startup tools (spreadsheets, email) used for scale-up operations",
      solution: "Purpose-built systems for current scale, not future dreams",
      whyItWorks: "Right tool for right stage - efficiency follows appropriate systems",
      painLevel: "Very High",
      timeStuck: "10-16 months",
      gradient: "from-red-500 to-red-600"
    },
    {
      id: 5,
      title: 'The "Communication Chaos" Crisis',
      customerSays: "The right hand doesn't know what the left is doing",
      customerThinks: "People aren't communicating well enough",
      realProblem: "Informal communication worked at 5 people, fails at 50 people",
      solution: "Structured communication rhythms, regular updates, shared dashboards",
      whyItWorks: "Information flow enables operational flow at scale",
      painLevel: "Medium",
      timeStuck: "8-12 months",
      gradient: "from-orange-500 to-orange-600"
    },
    {
      id: 6,
      title: 'The "Capacity Crunch" Crisis',
      customerSays: "We're turning away business because we can't handle more",
      customerThinks: "We need to hire more people fast",
      realProblem: "Linear thinking about capacity vs exponential demand growth",
      solution: "Modular capacity planning, outsource non-core functions",
      whyItWorks: "Flexibility > fixed capacity during rapid growth phases",
      painLevel: "High",
      timeStuck: "6-10 months",
      gradient: "from-yellow-500 to-yellow-600"
    },
    {
      id: 7,
      title: 'The "Integration Nightmare" Crisis',
      customerSays: "We have data everywhere but insights nowhere",
      customerThinks: "We need better reporting or analytics tools",
      realProblem: "Piecemeal tool adoption without integration planning",
      solution: "API-first tool selection, data centralization, unified dashboards",
      whyItWorks: "Connected systems enable data-driven decisions at scale",
      painLevel: "High",
      timeStuck: "12-18 months",
      gradient: "from-pink-500 to-pink-600"
    }
  ];
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "div",
      {
        "aria-live": "polite",
        "aria-atomic": "true",
        className: "sr-only",
        id: "status-announcer",
        children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "sr-only", children: "Content loaded successfully" }, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
          lineNumber: 125,
          columnNumber: 9
        }, void 0)
      },
      void 0,
      false,
      {
        fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
        lineNumber: 119,
        columnNumber: 7
      },
      void 0
    ),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      SEOHead,
      {
        title: "Growth Breaking Everything? Operational Scaling Crisis Solutions | Reboot Media",
        description: "Growth feels like everything's breaking? 7 operational scaling crisis patterns where manual processes that worked at $500K fail at $2M+.",
        canonicalUrl: getCanonicalUrl("operational-scaling-crisis")
      },
      void 0,
      false,
      {
        fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
        lineNumber: 128,
        columnNumber: 7
      },
      void 0
    ),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "operational-scaling-page min-h-screen relative overflow-hidden dark:bg-gray-900", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(BackgroundGradient, {}, void 0, false, {
        fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
        lineNumber: 135,
        columnNumber: 9
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "relative z-10", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(GlobalHeader, { onShowForm: () => setShowDropdownForm(true), showProgressBar: true }, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
          lineNumber: 138,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { className: "pt-20 md:pt-24 pb-16 bg-gradient-to-br from-green-900 via-green-950 to-black relative overflow-hidden", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(34,197,94,0.1)_0%,transparent_50%)]" }, void 0, false, {
            fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
            lineNumber: 142,
            columnNumber: 13
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "relative max-w-5xl mx-auto px-6 lg:px-8", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-8", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("nav", { className: "flex items-center space-x-2 text-gradient-safe", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: `${"/reboot"}/growth-plateau-solutions`, className: "hover:text-green-400 focus-visible:text-green-400 transition-colors", children: "Growth Plateau Solutions" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                lineNumber: 148,
                columnNumber: 19
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: "→" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                lineNumber: 149,
                columnNumber: 19
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-green-400 font-semibold", children: "Operational Scaling Crisis" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                lineNumber: 150,
                columnNumber: 19
              }, void 0)
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
              lineNumber: 147,
              columnNumber: 17
            }, void 0) }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
              lineNumber: 146,
              columnNumber: 15
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-4 py-2 rounded-full text-sm font-semibold mb-6", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "w-2 h-2 bg-green-500 rounded-full animate-pulse" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                  lineNumber: 156,
                  columnNumber: 19
                }, void 0),
                "Growth Breaking Everything"
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                lineNumber: 155,
                columnNumber: 17
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h1", { className: "heading-hero text-gradient-critical text-4xl md:text-6xl font-black text-white mb-6 leading-tight", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-green-400", children: "Operational Scaling" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                  lineNumber: 160,
                  columnNumber: 19
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "block text-white mt-2", children: "Crisis Solutions" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                  lineNumber: 161,
                  columnNumber: 19
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                lineNumber: 159,
                columnNumber: 17
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-black-important dark:text-gradient-critical text-xl text-gradient-safe mb-8 max-w-3xl mx-auto leading-relaxed", children: [
                "Growth feels like everything's breaking? The problem isn't your team or timing—it's that",
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-green-400 font-semibold", children: " manual processes that worked at $500K" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                  lineNumber: 165,
                  columnNumber: 19
                }, void 0),
                " fail spectacularly at $2M+ without systems."
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                lineNumber: 163,
                columnNumber: 17
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "button",
                {
                  "aria-label": "Opens contact form for free marketing analysis",
                  onClick: () => setShowDropdownForm(true),
                  className: "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 focus-visible:from-green-600 hover:to-green-700 focus-visible:to-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 focus-visible:scale-105 shadow-xl",
                  children: "Fix Your Scaling Crisis"
                },
                void 0,
                false,
                {
                  fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                  lineNumber: 167,
                  columnNumber: 17
                },
                void 0
              )
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
              lineNumber: 154,
              columnNumber: 15
            }, void 0)
          ] }, void 0, true, {
            fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
            lineNumber: 143,
            columnNumber: 13
          }, void 0)
        ] }, void 0, true, {
          fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
          lineNumber: 141,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "main",
          {
            id: "main-content",
            role: "main",
            "aria-label": "Main content",
            className: "max-w-5xl mx-auto px-6 lg:px-8 py-16",
            children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { className: "mb-16", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "glass-card-light rounded-2xl shadow-xl border border-green-200/50 dark:border-green-800/50 p-8", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "heading-xl text-gradient-critical text-2xl font-bold replace-text-gray-900 dark:text-white mb-6 text-center", children: "Why Growth Breaks Operations (And How to Fix It)" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                  lineNumber: 187,
                  columnNumber: 17
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-black-important dark:text-gradient-critical text-lg text-standard dark:text-gradient-safe mb-6 leading-relaxed text-center", children: "Operational scaling crises aren't random—they follow predictable patterns. What works at $500K breaks at $2M+ because manual processes hit exponential complexity while systems thinking provides linear solutions." }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                  lineNumber: 190,
                  columnNumber: 17
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid md:grid-cols-3 gap-6 mb-6", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-2xl font-bold text-green-600 mb-1", children: "84%" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                      lineNumber: 196,
                      columnNumber: 21
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm text-optional dark:luminescence-layer-3", children: "Experience scaling crisis" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                      lineNumber: 197,
                      columnNumber: 21
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                    lineNumber: 195,
                    columnNumber: 19
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-2xl font-bold text-red-600 mb-1", children: "267%" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                      lineNumber: 200,
                      columnNumber: 21
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm text-optional dark:luminescence-layer-3", children: "Complexity increase" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                      lineNumber: 201,
                      columnNumber: 21
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                    lineNumber: 199,
                    columnNumber: 19
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-2xl font-bold text-blue-accessible mb-1", children: "16%" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                      lineNumber: 204,
                      columnNumber: 21
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm text-optional dark:luminescence-layer-3", children: "Solve with systems first" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                      lineNumber: 205,
                      columnNumber: 21
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                    lineNumber: 203,
                    columnNumber: 19
                  }, void 0)
                ] }, void 0, true, {
                  fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                  lineNumber: 194,
                  columnNumber: 17
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-black-important dark:text-gradient-critical text-standard dark:text-gradient-safe font-semibold text-center", children: "The pattern: Manual processes → Exponential complexity → Systems breakdown" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                  lineNumber: 208,
                  columnNumber: 17
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                lineNumber: 186,
                columnNumber: 15
              }, void 0) }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                lineNumber: 185,
                columnNumber: 13
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { className: "mb-16", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "heading-xl text-gradient-critical text-3xl md:text-4xl font-bold replace-text-gray-900 dark:text-white mb-12 text-center", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "block", children: "7 Operational Crisis Patterns" }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                    lineNumber: 217,
                    columnNumber: 17
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "block", children: "(Which is Yours?)" }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                    lineNumber: 218,
                    columnNumber: 17
                  }, void 0)
                ] }, void 0, true, {
                  fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                  lineNumber: 216,
                  columnNumber: 15
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-8", children: scenarios.map((scenario) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "glass-card-light rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: `bg-gradient-to-r ${scenario.gradient} p-6`, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex justify-between items-start", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "heading-lg text-black-important dark:text-white text-2xl font-bold text-white mb-2", children: scenario.title }, void 0, false, {
                        fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                        lineNumber: 227,
                        columnNumber: 27
                      }, void 0),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex gap-4 text-sm text-green-100", children: [
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: [
                          "Pain Level: ",
                          scenario.painLevel
                        ] }, void 0, true, {
                          fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                          lineNumber: 231,
                          columnNumber: 29
                        }, void 0),
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: [
                          "Typical Time Stuck: ",
                          scenario.timeStuck
                        ] }, void 0, true, {
                          fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                          lineNumber: 232,
                          columnNumber: 29
                        }, void 0)
                      ] }, void 0, true, {
                        fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                        lineNumber: 230,
                        columnNumber: 27
                      }, void 0)
                    ] }, void 0, true, {
                      fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                      lineNumber: 226,
                      columnNumber: 25
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "glass-panel rounded-full w-12 h-12 flex items-center justify-center text-white font-bold text-xl", children: scenario.id }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                      lineNumber: 235,
                      columnNumber: 25
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                    lineNumber: 225,
                    columnNumber: 23
                  }, void 0) }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                    lineNumber: 224,
                    columnNumber: 21
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-8", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid md:grid-cols-2 gap-8", children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-6", children: [
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border-l-4 border-red-500", children: [
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "heading-md text-black-important dark:text-white font-bold text-red-800 dark:text-red-300 mb-2 flex items-center", children: [
                            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "mr-2", children: "💬" }, void 0, false, {
                              fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                              lineNumber: 248,
                              columnNumber: 31
                            }, void 0),
                            "Customer Says:"
                          ] }, void 0, true, {
                            fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                            lineNumber: 247,
                            columnNumber: 29
                          }, void 0),
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-standard dark:text-gradient-safe italic", children: [
                            '"',
                            scenario.customerSays,
                            '"'
                          ] }, void 0, true, {
                            fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                            lineNumber: 251,
                            columnNumber: 29
                          }, void 0)
                        ] }, void 0, true, {
                          fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                          lineNumber: 246,
                          columnNumber: 27
                        }, void 0),
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500", children: [
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "heading-md text-black-important dark:text-white font-bold text-green-800 dark:text-green-300 mb-2 flex items-center", children: [
                            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "mr-2", children: "💭" }, void 0, false, {
                              fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                              lineNumber: 258,
                              columnNumber: 31
                            }, void 0),
                            "Customer Thinks:"
                          ] }, void 0, true, {
                            fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                            lineNumber: 257,
                            columnNumber: 29
                          }, void 0),
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-standard dark:text-gradient-safe", children: scenario.customerThinks }, void 0, false, {
                            fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                            lineNumber: 261,
                            columnNumber: 29
                          }, void 0)
                        ] }, void 0, true, {
                          fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                          lineNumber: 256,
                          columnNumber: 27
                        }, void 0)
                      ] }, void 0, true, {
                        fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                        lineNumber: 245,
                        columnNumber: 25
                      }, void 0),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-6", children: [
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 border-l-4 border-orange-500", children: [
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "heading-md text-black-important dark:text-white font-bold text-orange-800 dark:text-orange-300 mb-2 flex items-center", children: [
                            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "mr-2", children: "🔍" }, void 0, false, {
                              fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                              lineNumber: 271,
                              columnNumber: 31
                            }, void 0),
                            "Real Problem:"
                          ] }, void 0, true, {
                            fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                            lineNumber: 270,
                            columnNumber: 29
                          }, void 0),
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-standard dark:text-gradient-safe", children: scenario.realProblem }, void 0, false, {
                            fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                            lineNumber: 274,
                            columnNumber: 29
                          }, void 0)
                        ] }, void 0, true, {
                          fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                          lineNumber: 269,
                          columnNumber: 27
                        }, void 0),
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500", children: [
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "heading-md text-black-important dark:text-white font-bold text-blue-800 dark:text-blue-300 mb-2 flex items-center", children: [
                            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "mr-2", children: "✅" }, void 0, false, {
                              fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                              lineNumber: 281,
                              columnNumber: 31
                            }, void 0),
                            "Solution:"
                          ] }, void 0, true, {
                            fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                            lineNumber: 280,
                            columnNumber: 29
                          }, void 0),
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-standard dark:text-gradient-safe", children: scenario.solution }, void 0, false, {
                            fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                            lineNumber: 284,
                            columnNumber: 29
                          }, void 0)
                        ] }, void 0, true, {
                          fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                          lineNumber: 279,
                          columnNumber: 27
                        }, void 0)
                      ] }, void 0, true, {
                        fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                        lineNumber: 268,
                        columnNumber: 25
                      }, void 0)
                    ] }, void 0, true, {
                      fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                      lineNumber: 242,
                      columnNumber: 23
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800", children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "heading-md text-black-important dark:text-white font-bold text-purple-800 dark:text-purple-300 mb-2 flex items-center", children: [
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "mr-2", children: "🧠" }, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                          lineNumber: 294,
                          columnNumber: 27
                        }, void 0),
                        "Why This Works:"
                      ] }, void 0, true, {
                        fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                        lineNumber: 293,
                        columnNumber: 25
                      }, void 0),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-black-standard dark:text-gradient-safe font-medium", children: scenario.whyItWorks }, void 0, false, {
                        fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                        lineNumber: 297,
                        columnNumber: 25
                      }, void 0)
                    ] }, void 0, true, {
                      fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                      lineNumber: 292,
                      columnNumber: 23
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                    lineNumber: 241,
                    columnNumber: 21
                  }, void 0)
                ] }, scenario.id, true, {
                  fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                  lineNumber: 223,
                  columnNumber: 19
                }, void 0)) }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                  lineNumber: 221,
                  columnNumber: 15
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                lineNumber: 215,
                columnNumber: 13
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { className: "mb-16", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl p-8 border border-green-200/50 dark:border-green-800/50", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-2xl font-bold replace-text-gray-900 dark:text-white mb-4", children: "🚨 Stop Letting Growth Break Your Operations" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                  lineNumber: 310,
                  columnNumber: 17
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-black-important dark:text-gradient-critical text-lg text-black-standard dark:text-gradient-safe mb-6 max-w-3xl mx-auto", children: "Every month you operate with manual processes designed for smaller scale, operational inefficiencies compound exponentially. Get your free scaling analysis and discover which crisis patterns are limiting your growth capacity." }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                  lineNumber: 313,
                  columnNumber: 17
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "button",
                  {
                    "aria-label": "Opens contact form for free marketing analysis",
                    onClick: () => setShowDropdownForm(true),
                    className: "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 focus-visible:from-green-600 hover:to-green-700 focus-visible:to-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 focus-visible:scale-105 shadow-lg mr-4",
                    children: "Get Free Scaling Crisis Analysis"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                    lineNumber: 317,
                    columnNumber: 17
                  },
                  void 0
                ),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "a",
                  {
                    href: `${"/reboot"}/growth-plateau-solutions`,
                    className: "border-2 border-green-500 text-green-600 hover:bg-green-500 focus-visible:bg-green-500 hover:text-white focus-visible:text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 inline-block",
                    children: "See All Plateau Types"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                    lineNumber: 323,
                    columnNumber: 17
                  },
                  void 0
                )
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                lineNumber: 309,
                columnNumber: 15
              }, void 0) }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                lineNumber: 308,
                columnNumber: 13
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { className: "mb-16", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "heading-xl text-gradient-critical text-3xl font-bold replace-text-gray-900 dark:text-white mb-8 text-center", children: "Related Growth Plateau Solutions" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                  lineNumber: 334,
                  columnNumber: 15
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid md:grid-cols-2 gap-6", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "glass-card-light rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-xl focus-visible:shadow-xl transition-shadow", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "heading-lg text-black-important dark:text-white text-xl font-bold replace-text-gray-900 dark:text-white mb-3", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: `${"/reboot"}/growth-plateau-solutions/team-growth-bottlenecks`, className: "hover:text-green-600 focus-visible:text-green-600 transition-colors", children: "Team Growth Bottlenecks →" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                      lineNumber: 340,
                      columnNumber: 21
                    }, void 0) }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                      lineNumber: 339,
                      columnNumber: 19
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-standard dark:text-gradient-safe", children: "Can't hire fast enough or new people aren't working out? The founder bottleneck kills scaling when everything goes through you." }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                      lineNumber: 344,
                      columnNumber: 19
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                    lineNumber: 338,
                    columnNumber: 17
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "glass-card-light rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-xl focus-visible:shadow-xl transition-shadow", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "heading-lg text-black-important dark:text-white text-xl font-bold replace-text-gray-900 dark:text-white mb-3", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: `${"/reboot"}/fractional-cmo-guide`, className: "hover:text-green-600 focus-visible:text-green-600 transition-colors", children: "Need Strategic Marketing Leadership? →" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                      lineNumber: 350,
                      columnNumber: 21
                    }, void 0) }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                      lineNumber: 349,
                      columnNumber: 19
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-standard dark:text-gradient-safe", children: "Systems thinking requires strategic leadership. Discover if fractional CMO services can accelerate your scaling solutions." }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                      lineNumber: 354,
                      columnNumber: 19
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                    lineNumber: 348,
                    columnNumber: 17
                  }, void 0)
                ] }, void 0, true, {
                  fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                  lineNumber: 337,
                  columnNumber: 15
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
                lineNumber: 333,
                columnNumber: 13
              }, void 0)
            ]
          },
          void 0,
          true,
          {
            fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
            lineNumber: 178,
            columnNumber: 11
          },
          void 0
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(GlobalFooter, { onShowForm: () => setShowDropdownForm(true) }, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
          lineNumber: 363,
          columnNumber: 11
        }, void 0)
      ] }, void 0, true, {
        fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
        lineNumber: 137,
        columnNumber: 9
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
      lineNumber: 134,
      columnNumber: 7
    }, void 0)
  ] }, void 0, true, {
    fileName: "/home/ian/projects/reboot/src/pages/OperationalScalingCrisis.tsx",
    lineNumber: 117,
    columnNumber: 5
  }, void 0);
};
const OperationalScalingCrisis$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: OperationalScalingCrisis
}, Symbol.toStringTag, { value: "Module" }));
const TeamGrowthBottlenecks = () => {
  const { setShowDropdownForm } = useLeadForm();
  reactExports.useEffect(() => {
    document.title = "Can't Hire Fast Enough? Team Growth Bottleneck Solutions | Reboot Media";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Can't hire fast enough or new people aren't working out? 7 team growth bottleneck patterns where founder dependency kills scaling.");
    }
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement("meta");
      metaKeywords.setAttribute("name", "keywords");
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute("content", "team growth bottlenecks, hiring problems scaling, founder bottleneck, culture dilution fears, team scaling issues");
  }, []);
  const scenarios = [
    {
      id: 1,
      title: 'The "Founder Bottleneck" Crisis',
      customerSays: "I'm still involved in every decision",
      customerThinks: "I need to find people who think like me",
      realProblem: "Can't delegate because no one understands decision frameworks, just outcomes",
      solution: "Document decision frameworks and thinking patterns, not just final decisions",
      whyItWorks: "Replicates thinking patterns so others can make founder-quality decisions",
      painLevel: "Very High",
      timeStuck: "12-24 months",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      title: 'The "Cultural Dilution" Fear',
      customerSays: "New people just don't get our culture",
      customerThinks: "Hiring too fast is destroying what makes us special",
      realProblem: "Culture was never explicitly defined, just assumed and absorbed",
      solution: "Document culture explicitly, hire for cultural adds not just fits",
      whyItWorks: "Intentional culture evolution vs accidental drift preserves core values",
      painLevel: "High",
      timeStuck: "8-14 months",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      id: 3,
      title: 'The "Wrong Hiring Priorities" Trap',
      customerSays: "These senior hires aren't working out",
      customerThinks: "We need more experienced people to handle growth",
      realProblem: "Hiring for future scale instead of current stage needs",
      solution: "Hire for 18-month horizon, not 5-year vision - stage-appropriate talent",
      whyItWorks: "Right skills for right stage reduces friction and hiring costs",
      painLevel: "High",
      timeStuck: "10-16 months",
      gradient: "from-green-500 to-green-600"
    },
    {
      id: 4,
      title: 'The "Communication Breakdown" Crisis',
      customerSays: "Teams don't talk to each other anymore",
      customerThinks: "People are getting territorial or political",
      realProblem: "No communication systems as team size crosses coordination limits",
      solution: "Regular cross-team updates, shared metrics, transparent communication tools",
      whyItWorks: "Transparency reduces politics and increases efficiency at scale",
      painLevel: "Medium",
      timeStuck: "6-10 months",
      gradient: "from-orange-500 to-orange-600"
    },
    {
      id: 5,
      title: 'The "No Process Documentation" Crisis',
      customerSays: "Only Jenny knows how to do X",
      customerThinks: "We need backup people for key functions",
      realProblem: "Growth outpaced process documentation - tribal knowledge everywhere",
      solution: "Process documentation sprints, knowledge transfer sessions, redundancy planning",
      whyItWorks: "Documented processes enable consistent execution regardless of personnel",
      painLevel: "High",
      timeStuck: "8-12 months",
      gradient: "from-red-500 to-red-600"
    },
    {
      id: 6,
      title: 'The "Management Skills Gap" Crisis',
      customerSays: "Our managers don't know how to manage",
      customerThinks: "We promoted the wrong people or hired bad managers",
      realProblem: "Technical skills ≠ management skills, but no training provided",
      solution: "Management training, external coaching, clear management expectations",
      whyItWorks: "Management is a learned skill, not an inherent talent",
      painLevel: "Very High",
      timeStuck: "12-18 months",
      gradient: "from-yellow-500 to-yellow-600"
    },
    {
      id: 7,
      title: 'The "Performance Standard Drift" Crisis',
      customerSays: "Some people aren't keeping up with growth",
      customerThinks: "We hired some low performers or people are getting complacent",
      realProblem: "Performance standards weren't raised as company expectations evolved",
      solution: "Regular performance recalibration, explicit growth expectations, coaching plans",
      whyItWorks: "Explicit standards prevent performance drift and maintain quality",
      painLevel: "Medium",
      timeStuck: "6-12 months",
      gradient: "from-pink-500 to-pink-600"
    }
  ];
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "div",
      {
        "aria-live": "polite",
        "aria-atomic": "true",
        className: "sr-only",
        id: "status-announcer",
        children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "sr-only", children: "Content loaded successfully" }, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
          lineNumber: 125,
          columnNumber: 9
        }, void 0)
      },
      void 0,
      false,
      {
        fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
        lineNumber: 119,
        columnNumber: 7
      },
      void 0
    ),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      SEOHead,
      {
        title: "Can't Hire Fast Enough? Team Growth Bottleneck Solutions | Reboot Media",
        description: "Can't hire fast enough or new people aren't working out? 7 team growth bottleneck patterns where founder dependency kills scaling.",
        canonicalUrl: getCanonicalUrl("team-growth-bottlenecks")
      },
      void 0,
      false,
      {
        fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
        lineNumber: 128,
        columnNumber: 7
      },
      void 0
    ),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "team-growth-page min-h-screen relative overflow-hidden dark:bg-gray-900", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(BackgroundGradient, {}, void 0, false, {
        fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
        lineNumber: 135,
        columnNumber: 9
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "relative z-10", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(GlobalHeader, { onShowForm: () => setShowDropdownForm(true), showProgressBar: true }, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
          lineNumber: 138,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { className: "pt-20 md:pt-24 pb-16 bg-gradient-to-br from-blue-900 via-blue-950 to-black relative overflow-hidden", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(59,130,246,0.1)_0%,transparent_50%)]" }, void 0, false, {
            fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
            lineNumber: 142,
            columnNumber: 13
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "relative max-w-5xl mx-auto px-6 lg:px-8", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-8", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("nav", { className: "flex items-center space-x-2 text-gradient-safe", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: `${"/reboot"}/growth-plateau-solutions`, className: "hover:text-blue-400 focus-visible:text-blue-400 transition-colors", children: "Growth Plateau Solutions" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                lineNumber: 148,
                columnNumber: 19
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: "→" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                lineNumber: 149,
                columnNumber: 19
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-blue-400 font-semibold", children: "Team Growth Bottlenecks" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                lineNumber: 150,
                columnNumber: 19
              }, void 0)
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
              lineNumber: 147,
              columnNumber: 17
            }, void 0) }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
              lineNumber: 146,
              columnNumber: 15
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-semibold mb-6", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "w-2 h-2 bg-blue-500 rounded-full animate-pulse" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                  lineNumber: 156,
                  columnNumber: 19
                }, void 0),
                "Can't Hire Fast Enough"
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                lineNumber: 155,
                columnNumber: 17
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h1", { className: "heading-hero text-gradient-critical text-4xl md:text-6xl font-black text-white mb-6 leading-tight", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-blue-400", children: "Team Growth" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                  lineNumber: 160,
                  columnNumber: 19
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "block text-white mt-2", children: "Bottleneck Solutions" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                  lineNumber: 161,
                  columnNumber: 19
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                lineNumber: 159,
                columnNumber: 17
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-black-important dark:text-gradient-critical text-xl text-gradient-safe mb-8 max-w-3xl mx-auto leading-relaxed", children: [
                "Can't hire fast enough or new people aren't working out? The problem isn't talent availability—it's that",
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-blue-400 font-semibold", children: " the founder bottleneck" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                  lineNumber: 165,
                  columnNumber: 19
                }, void 0),
                " kills scaling when everything still goes through you."
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                lineNumber: 163,
                columnNumber: 17
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "button",
                {
                  "aria-label": "Opens contact form for free marketing analysis",
                  onClick: () => setShowDropdownForm(true),
                  className: "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 focus-visible:from-blue-600 hover:to-blue-700 focus-visible:to-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 focus-visible:scale-105 shadow-xl",
                  children: "Fix Your Team Bottlenecks"
                },
                void 0,
                false,
                {
                  fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                  lineNumber: 167,
                  columnNumber: 17
                },
                void 0
              )
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
              lineNumber: 154,
              columnNumber: 15
            }, void 0)
          ] }, void 0, true, {
            fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
            lineNumber: 143,
            columnNumber: 13
          }, void 0)
        ] }, void 0, true, {
          fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
          lineNumber: 141,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "main",
          {
            id: "main-content",
            role: "main",
            "aria-label": "Main content",
            className: "max-w-5xl mx-auto px-6 lg:px-8 py-16",
            children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { className: "mb-16", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "glass-card-light rounded-2xl shadow-xl border border-blue-200/50 dark:border-blue-800/50 p-8", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "heading-xl text-gradient-critical text-2xl font-bold replace-text-gray-900 dark:text-white mb-6 text-center", children: "Why Team Growth Gets Stuck (And How Culture Really Scales)" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                  lineNumber: 187,
                  columnNumber: 17
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-black-important dark:text-gradient-critical text-lg text-standard dark:text-gradient-safe mb-6 leading-relaxed text-center", children: `Team growth bottlenecks aren't about finding "good people"—they're about systems that enable people to succeed. Culture shifts with size, and what worked at 5 people breaks at 50 without intentional frameworks.` }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                  lineNumber: 190,
                  columnNumber: 17
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid md:grid-cols-3 gap-6 mb-6", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-2xl font-bold text-blue-accessible mb-1", children: "89%" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                      lineNumber: 196,
                      columnNumber: 21
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm text-optional dark:luminescence-layer-3", children: "Struggle with team scaling" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                      lineNumber: 197,
                      columnNumber: 21
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                    lineNumber: 195,
                    columnNumber: 19
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-2xl font-bold text-red-600 mb-1", children: "43%" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                      lineNumber: 200,
                      columnNumber: 21
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm text-optional dark:luminescence-layer-3", children: "New hire failure rate" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                      lineNumber: 201,
                      columnNumber: 21
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                    lineNumber: 199,
                    columnNumber: 19
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-2xl font-bold text-green-600 mb-1", children: "11%" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                      lineNumber: 204,
                      columnNumber: 21
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm text-optional dark:luminescence-layer-3", children: "Break founder dependency" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                      lineNumber: 205,
                      columnNumber: 21
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                    lineNumber: 203,
                    columnNumber: 19
                  }, void 0)
                ] }, void 0, true, {
                  fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                  lineNumber: 194,
                  columnNumber: 17
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-black-important dark:text-gradient-critical text-standard dark:text-gradient-safe font-semibold text-center", children: "The pattern: Founder dependency → Team growth → Systems breakdown" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                  lineNumber: 208,
                  columnNumber: 17
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                lineNumber: 186,
                columnNumber: 15
              }, void 0) }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                lineNumber: 185,
                columnNumber: 13
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { className: "mb-16", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "heading-xl text-gradient-critical text-3xl md:text-4xl font-bold replace-text-gray-900 dark:text-white mb-12 text-center", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "block", children: "7 Team Bottleneck Patterns" }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                    lineNumber: 217,
                    columnNumber: 17
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "block", children: "(Which is Yours?)" }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                    lineNumber: 218,
                    columnNumber: 17
                  }, void 0)
                ] }, void 0, true, {
                  fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                  lineNumber: 216,
                  columnNumber: 15
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-8", children: scenarios.map((scenario) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "glass-card-light rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: `bg-gradient-to-r ${scenario.gradient} p-6`, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex justify-between items-start", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "heading-lg text-black-important dark:text-white text-2xl font-bold text-white mb-2", children: scenario.title }, void 0, false, {
                        fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                        lineNumber: 227,
                        columnNumber: 27
                      }, void 0),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex gap-4 text-sm text-blue-100", children: [
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: [
                          "Pain Level: ",
                          scenario.painLevel
                        ] }, void 0, true, {
                          fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                          lineNumber: 231,
                          columnNumber: 29
                        }, void 0),
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: [
                          "Typical Time Stuck: ",
                          scenario.timeStuck
                        ] }, void 0, true, {
                          fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                          lineNumber: 232,
                          columnNumber: 29
                        }, void 0)
                      ] }, void 0, true, {
                        fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                        lineNumber: 230,
                        columnNumber: 27
                      }, void 0)
                    ] }, void 0, true, {
                      fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                      lineNumber: 226,
                      columnNumber: 25
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "glass-panel rounded-full w-12 h-12 flex items-center justify-center text-white font-bold text-xl", children: scenario.id }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                      lineNumber: 235,
                      columnNumber: 25
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                    lineNumber: 225,
                    columnNumber: 23
                  }, void 0) }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                    lineNumber: 224,
                    columnNumber: 21
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-8", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid md:grid-cols-2 gap-8", children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-6", children: [
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border-l-4 border-red-500", children: [
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "heading-md text-black-important dark:text-white font-bold text-red-800 dark:text-red-300 mb-2 flex items-center", children: [
                            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "mr-2", children: "💬" }, void 0, false, {
                              fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                              lineNumber: 248,
                              columnNumber: 31
                            }, void 0),
                            "Customer Says:"
                          ] }, void 0, true, {
                            fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                            lineNumber: 247,
                            columnNumber: 29
                          }, void 0),
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-standard dark:text-gradient-safe italic", children: [
                            '"',
                            scenario.customerSays,
                            '"'
                          ] }, void 0, true, {
                            fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                            lineNumber: 251,
                            columnNumber: 29
                          }, void 0)
                        ] }, void 0, true, {
                          fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                          lineNumber: 246,
                          columnNumber: 27
                        }, void 0),
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500", children: [
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "heading-md text-black-important dark:text-white font-bold text-blue-800 dark:text-blue-300 mb-2 flex items-center", children: [
                            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "mr-2", children: "💭" }, void 0, false, {
                              fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                              lineNumber: 258,
                              columnNumber: 31
                            }, void 0),
                            "Customer Thinks:"
                          ] }, void 0, true, {
                            fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                            lineNumber: 257,
                            columnNumber: 29
                          }, void 0),
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-standard dark:text-gradient-safe", children: scenario.customerThinks }, void 0, false, {
                            fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                            lineNumber: 261,
                            columnNumber: 29
                          }, void 0)
                        ] }, void 0, true, {
                          fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                          lineNumber: 256,
                          columnNumber: 27
                        }, void 0)
                      ] }, void 0, true, {
                        fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                        lineNumber: 245,
                        columnNumber: 25
                      }, void 0),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-6", children: [
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 border-l-4 border-orange-500", children: [
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "heading-md text-black-important dark:text-white font-bold text-orange-800 dark:text-orange-300 mb-2 flex items-center", children: [
                            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "mr-2", children: "🔍" }, void 0, false, {
                              fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                              lineNumber: 271,
                              columnNumber: 31
                            }, void 0),
                            "Real Problem:"
                          ] }, void 0, true, {
                            fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                            lineNumber: 270,
                            columnNumber: 29
                          }, void 0),
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-standard dark:text-gradient-safe", children: scenario.realProblem }, void 0, false, {
                            fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                            lineNumber: 274,
                            columnNumber: 29
                          }, void 0)
                        ] }, void 0, true, {
                          fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                          lineNumber: 269,
                          columnNumber: 27
                        }, void 0),
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500", children: [
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "heading-md text-black-important dark:text-white font-bold text-green-800 dark:text-green-300 mb-2 flex items-center", children: [
                            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "mr-2", children: "✅" }, void 0, false, {
                              fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                              lineNumber: 281,
                              columnNumber: 31
                            }, void 0),
                            "Solution:"
                          ] }, void 0, true, {
                            fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                            lineNumber: 280,
                            columnNumber: 29
                          }, void 0),
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-standard dark:text-gradient-safe", children: scenario.solution }, void 0, false, {
                            fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                            lineNumber: 284,
                            columnNumber: 29
                          }, void 0)
                        ] }, void 0, true, {
                          fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                          lineNumber: 279,
                          columnNumber: 27
                        }, void 0)
                      ] }, void 0, true, {
                        fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                        lineNumber: 268,
                        columnNumber: 25
                      }, void 0)
                    ] }, void 0, true, {
                      fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                      lineNumber: 242,
                      columnNumber: 23
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800", children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "heading-md text-black-important dark:text-white font-bold text-purple-800 dark:text-purple-300 mb-2 flex items-center", children: [
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "mr-2", children: "🧠" }, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                          lineNumber: 294,
                          columnNumber: 27
                        }, void 0),
                        "Why This Works:"
                      ] }, void 0, true, {
                        fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                        lineNumber: 293,
                        columnNumber: 25
                      }, void 0),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-black-standard dark:text-gradient-safe font-medium", children: scenario.whyItWorks }, void 0, false, {
                        fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                        lineNumber: 297,
                        columnNumber: 25
                      }, void 0)
                    ] }, void 0, true, {
                      fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                      lineNumber: 292,
                      columnNumber: 23
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                    lineNumber: 241,
                    columnNumber: 21
                  }, void 0)
                ] }, scenario.id, true, {
                  fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                  lineNumber: 223,
                  columnNumber: 19
                }, void 0)) }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                  lineNumber: 221,
                  columnNumber: 15
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                lineNumber: 215,
                columnNumber: 13
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { className: "mb-16", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 border border-blue-200/50 dark:border-blue-800/50", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-2xl font-bold replace-text-gray-900 dark:text-white mb-4", children: "🚨 Stop Being the Bottleneck to Your Own Growth" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                  lineNumber: 310,
                  columnNumber: 17
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-black-important dark:text-gradient-critical text-lg text-black-standard dark:text-gradient-safe mb-6 max-w-3xl mx-auto", children: "Every month you stay trapped in founder dependency patterns, your team's growth potential stagnates while competitors with documented systems scale efficiently. Get your free team analysis and discover which bottleneck patterns are limiting your scaling." }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                  lineNumber: 313,
                  columnNumber: 17
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "button",
                  {
                    "aria-label": "Opens contact form for free marketing analysis",
                    onClick: () => setShowDropdownForm(true),
                    className: "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 focus-visible:from-blue-600 hover:to-blue-700 focus-visible:to-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 focus-visible:scale-105 shadow-lg mr-4",
                    children: "Get Free Team Bottleneck Analysis"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                    lineNumber: 317,
                    columnNumber: 17
                  },
                  void 0
                ),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "a",
                  {
                    href: `${"/reboot"}/growth-plateau-solutions`,
                    className: "border-2 border-blue-500 text-blue-accessible hover:bg-blue-500 focus-visible:bg-blue-500 hover:text-white focus-visible:text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 inline-block",
                    children: "See All Plateau Types"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                    lineNumber: 323,
                    columnNumber: 17
                  },
                  void 0
                )
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                lineNumber: 309,
                columnNumber: 15
              }, void 0) }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                lineNumber: 308,
                columnNumber: 13
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { className: "mb-16", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "heading-xl text-gradient-critical text-3xl font-bold replace-text-gray-900 dark:text-white mb-8 text-center", children: "Related Growth Plateau Solutions" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                  lineNumber: 334,
                  columnNumber: 15
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid md:grid-cols-2 gap-6", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "glass-card-light rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-xl focus-visible:shadow-xl transition-shadow", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "heading-lg text-black-important dark:text-white text-xl font-bold replace-text-gray-900 dark:text-white mb-3", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: `${"/reboot"}/growth-plateau-solutions/operational-scaling-crisis`, className: "hover:text-blue-accessible focus-visible:text-blue-accessible transition-colors", children: "Operational Scaling Crisis →" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                      lineNumber: 340,
                      columnNumber: 21
                    }, void 0) }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                      lineNumber: 339,
                      columnNumber: 19
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-standard dark:text-gradient-safe", children: "Growth breaking operations? Manual processes that worked at $500K fail at $2M+ without systems thinking." }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                      lineNumber: 344,
                      columnNumber: 19
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                    lineNumber: 338,
                    columnNumber: 17
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "glass-card-light rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-xl focus-visible:shadow-xl transition-shadow", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "heading-lg text-black-important dark:text-white text-xl font-bold replace-text-gray-900 dark:text-white mb-3", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: `${"/reboot"}/fractional-cmo-guide`, className: "hover:text-blue-accessible focus-visible:text-blue-accessible transition-colors", children: "Need Strategic Marketing Leadership? →" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                      lineNumber: 350,
                      columnNumber: 21
                    }, void 0) }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                      lineNumber: 349,
                      columnNumber: 19
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-standard dark:text-gradient-safe", children: "Team bottlenecks often start with marketing leadership gaps. Discover if fractional CMO services can break your founder dependency." }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                      lineNumber: 354,
                      columnNumber: 19
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                    lineNumber: 348,
                    columnNumber: 17
                  }, void 0)
                ] }, void 0, true, {
                  fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                  lineNumber: 337,
                  columnNumber: 15
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
                lineNumber: 333,
                columnNumber: 13
              }, void 0)
            ]
          },
          void 0,
          true,
          {
            fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
            lineNumber: 178,
            columnNumber: 11
          },
          void 0
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(GlobalFooter, { onShowForm: () => setShowDropdownForm(true) }, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
          lineNumber: 363,
          columnNumber: 11
        }, void 0)
      ] }, void 0, true, {
        fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
        lineNumber: 137,
        columnNumber: 9
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
      lineNumber: 134,
      columnNumber: 7
    }, void 0)
  ] }, void 0, true, {
    fileName: "/home/ian/projects/reboot/src/pages/TeamGrowthBottlenecks.tsx",
    lineNumber: 117,
    columnNumber: 5
  }, void 0);
};
const TeamGrowthBottlenecks$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: TeamGrowthBottlenecks
}, Symbol.toStringTag, { value: "Module" }));
const ProductMarketFitErosion = () => {
  const { setShowDropdownForm } = useLeadForm();
  reactExports.useEffect(() => {
    document.title = "What Worked Before Isn't Working Now? Product-Market Fit Erosion | Reboot Media";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "What worked before isn't working now? 6 product-market fit erosion patterns where markets evolve faster than products and messaging.");
    }
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement("meta");
      metaKeywords.setAttribute("name", "keywords");
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute("content", "product market fit erosion, what worked before stopped working, market evolution problems, PMF decay, market fit lost");
  }, []);
  const scenarios = [
    {
      id: 1,
      title: 'The "Market Evolution" Disconnect',
      customerSays: "What worked before isn't working now",
      customerThinks: "Maybe we need to update our product features",
      realProblem: "Market evolved faster than product positioning and messaging",
      solution: "Reposition existing product for current market needs and pain points",
      whyItWorks: "Same product, updated positioning = restored market fit without development",
      painLevel: "High",
      timeStuck: "8-14 months",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      id: 2,
      title: 'The "Competitor Catchup" Erosion',
      customerSays: "Competitors are somehow winning deals we used to win easily",
      customerThinks: "We need better features or lower prices to compete",
      realProblem: "Competitors caught up to your advantages, but you didn't evolve differentiation",
      solution: "Identify new differentiation points based on current capabilities vs market",
      whyItWorks: "Continuous differentiation evolution maintains competitive advantage",
      painLevel: "High",
      timeStuck: "6-12 months",
      gradient: "from-pink-500 to-pink-600"
    },
    {
      id: 3,
      title: 'The "Customer Needs Shift" Gap',
      customerSays: "Customers are asking for things we don't do",
      customerThinks: "We need to build new features to stay relevant",
      realProblem: "Customer priorities shifted but messaging still addresses old priorities",
      solution: "Reframe existing capabilities around new customer priorities and outcomes",
      whyItWorks: "Messaging pivot > product pivot for addressing evolved customer needs",
      painLevel: "Medium",
      timeStuck: "6-10 months",
      gradient: "from-indigo-500 to-indigo-600"
    },
    {
      id: 4,
      title: 'The "Lost Touch with Audience" Drift',
      customerSays: "Prospects don't seem to understand what we do",
      customerThinks: "We need clearer marketing or better sales materials",
      realProblem: "Lost connection with core audience language and current pain points",
      solution: "Customer research to understand current language and priority shifts",
      whyItWorks: "Speaking current customer language restores connection and conversion",
      painLevel: "Medium",
      timeStuck: "8-12 months",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      id: 5,
      title: 'The "Success Plateau" Complacency',
      customerSays: "We had great product-market fit, but growth is slowing",
      customerThinks: "Maybe the market is just saturating naturally",
      realProblem: "Stopped iterating on positioning and messaging after initial success",
      solution: "Continuous market feedback loops and positioning optimization",
      whyItWorks: "Product-market fit requires ongoing maintenance, not one-time achievement",
      painLevel: "Low",
      timeStuck: "12-18 months",
      gradient: "from-green-500 to-green-600"
    },
    {
      id: 6,
      title: 'The "Feature Creep" Confusion',
      customerSays: "Our product does more than ever but conversions are down",
      customerThinks: "We need better onboarding or user experience",
      realProblem: "Added features confused core value proposition and market positioning",
      solution: "Simplify messaging back to core value, position features as supporting benefits",
      whyItWorks: "Clarity > complexity - confused prospects don't buy",
      painLevel: "High",
      timeStuck: "10-16 months",
      gradient: "from-red-500 to-red-600"
    }
  ];
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "div",
      {
        "aria-live": "polite",
        "aria-atomic": "true",
        className: "sr-only",
        id: "status-announcer",
        children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "sr-only", children: "Content loaded successfully" }, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
          lineNumber: 113,
          columnNumber: 9
        }, void 0)
      },
      void 0,
      false,
      {
        fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
        lineNumber: 107,
        columnNumber: 7
      },
      void 0
    ),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      SEOHead,
      {
        title: "What Worked Before Isn't Working Now? Product-Market Fit Erosion | Reboot Media",
        description: "What worked before isn't working now? 6 product-market fit erosion patterns where markets evolve faster than products and messaging.",
        canonicalUrl: getCanonicalUrl("product-market-fit-erosion")
      },
      void 0,
      false,
      {
        fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
        lineNumber: 116,
        columnNumber: 7
      },
      void 0
    ),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "pmf-erosion-page min-h-screen relative overflow-hidden dark:bg-gray-900", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(BackgroundGradient, {}, void 0, false, {
        fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
        lineNumber: 123,
        columnNumber: 9
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "relative z-10", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(GlobalHeader, { onShowForm: () => setShowDropdownForm(true), showProgressBar: true }, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
          lineNumber: 126,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { className: "pt-20 md:pt-24 pb-16 bg-gradient-to-br from-purple-900 via-purple-950 to-black relative overflow-hidden", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(147,51,234,0.1)_0%,transparent_50%)]" }, void 0, false, {
            fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
            lineNumber: 130,
            columnNumber: 13
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "relative max-w-5xl mx-auto px-6 lg:px-8", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-8", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("nav", { className: "flex items-center space-x-2 text-gradient-safe", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: `${"/reboot"}/growth-plateau-solutions`, className: "hover:text-purple-400 focus-visible:text-purple-400 transition-colors", children: "Growth Plateau Solutions" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                lineNumber: 136,
                columnNumber: 19
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: "→" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                lineNumber: 137,
                columnNumber: 19
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-purple-400 font-semibold", children: "Product-Market Fit Erosion" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                lineNumber: 138,
                columnNumber: 19
              }, void 0)
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
              lineNumber: 135,
              columnNumber: 17
            }, void 0) }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
              lineNumber: 134,
              columnNumber: 15
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "inline-flex items-center gap-2 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-4 py-2 rounded-full text-sm font-semibold mb-6", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "w-2 h-2 bg-purple-500 rounded-full motion-safe:animate-pulse motion-reduce:animate-none" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                  lineNumber: 144,
                  columnNumber: 19
                }, void 0),
                "What Worked Before Stopped Working"
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                lineNumber: 143,
                columnNumber: 17
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h1", { className: "heading-hero text-gradient-critical text-4xl md:text-6xl font-black mb-6 leading-tight", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-purple-400", children: "Product-Market Fit" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                  lineNumber: 148,
                  columnNumber: 19
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "block text-white mt-2", children: "Erosion Solutions" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                  lineNumber: 149,
                  columnNumber: 19
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                lineNumber: 147,
                columnNumber: 17
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-important-accessible text-xl text-gradient-safe mb-8 max-w-3xl mx-auto leading-relaxed", children: [
                "What worked before isn't working now? The problem isn't your product losing relevance—it's that",
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-purple-400 font-semibold", children: " markets evolve faster than products" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                  lineNumber: 153,
                  columnNumber: 19
                }, void 0),
                ", and your messaging may be stuck in the past."
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                lineNumber: 151,
                columnNumber: 17
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "button",
                {
                  "aria-label": "Opens contact form for free marketing analysis",
                  onClick: () => setShowDropdownForm(true),
                  className: "bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 focus-visible:from-purple-600 hover:to-purple-700 focus-visible:to-purple-700 text-white px-8 py-4 rounded-xl font-bold text-lg motion-safe:transition-all motion-reduce:transition-none motion-safe:duration-300 motion-reduce:duration-0 motion-safe:transform motion-safe:hover:scale-105 motion-reduce:transform-none motion-safe:focus-visible:scale-105 motion-reduce:transform-none shadow-xl",
                  children: "Restore Your Market Fit"
                },
                void 0,
                false,
                {
                  fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                  lineNumber: 155,
                  columnNumber: 17
                },
                void 0
              )
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
              lineNumber: 142,
              columnNumber: 15
            }, void 0)
          ] }, void 0, true, {
            fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
            lineNumber: 131,
            columnNumber: 13
          }, void 0)
        ] }, void 0, true, {
          fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
          lineNumber: 129,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "main",
          {
            id: "main-content",
            role: "main",
            "aria-label": "Main content",
            className: "max-w-5xl mx-auto px-6 lg:px-8 py-16",
            children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { className: "mb-16", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "glass-card-light rounded-2xl shadow-xl border border-purple-200/50 dark:border-purple-800/50 p-8", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "heading-xl text-gradient-critical text-2xl font-bold mb-6 text-center", children: "Why Product-Market Fit Erodes (And How to Restore It)" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                  lineNumber: 175,
                  columnNumber: 17
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-important-accessible text-lg text-standard dark:text-gradient-safe mb-6 leading-relaxed text-center", children: "Product-market fit isn't a permanent achievement—it requires ongoing maintenance. Markets, customers, and competitive landscapes evolve constantly, but many companies assume their initial PMF will last forever without iteration." }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                  lineNumber: 178,
                  columnNumber: 17
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid md:grid-cols-3 gap-6 mb-6", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-2xl font-bold text-purple-600 mb-1", children: "71%" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                      lineNumber: 184,
                      columnNumber: 21
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm text-optional dark:luminescence-layer-3", children: "Experience PMF erosion" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                      lineNumber: 185,
                      columnNumber: 21
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                    lineNumber: 183,
                    columnNumber: 19
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-2xl font-bold text-red-600 mb-1", children: "18mo" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                      lineNumber: 188,
                      columnNumber: 21
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm text-optional dark:luminescence-layer-3", children: "Average fit decay time" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                      lineNumber: 189,
                      columnNumber: 21
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                    lineNumber: 187,
                    columnNumber: 19
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-2xl font-bold text-green-600 mb-1", children: "29%" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                      lineNumber: 192,
                      columnNumber: 21
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm text-optional dark:luminescence-layer-3", children: "Restore with repositioning" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                      lineNumber: 193,
                      columnNumber: 21
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                    lineNumber: 191,
                    columnNumber: 19
                  }, void 0)
                ] }, void 0, true, {
                  fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                  lineNumber: 182,
                  columnNumber: 17
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-important-accessible text-standard dark:text-gradient-safe font-semibold text-center", children: "The pattern: Initial success → Market evolution → Messaging lag → Fit erosion" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                  lineNumber: 196,
                  columnNumber: 17
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                lineNumber: 174,
                columnNumber: 15
              }, void 0) }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                lineNumber: 173,
                columnNumber: 13
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { className: "mb-16", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "heading-xl text-gradient-critical text-3xl md:text-4xl font-bold mb-12 text-center", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "block", children: "6 PMF Erosion Patterns" }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                    lineNumber: 205,
                    columnNumber: 17
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "block", children: "(Which is Yours?)" }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                    lineNumber: 206,
                    columnNumber: 17
                  }, void 0)
                ] }, void 0, true, {
                  fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                  lineNumber: 204,
                  columnNumber: 15
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-8", children: scenarios.map((scenario) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "glass-card-light rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: `bg-gradient-to-r ${scenario.gradient} p-6`, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex justify-between items-start", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "heading-lg text-important-accessible dark:text-white text-2xl font-bold text-white mb-2", children: scenario.title }, void 0, false, {
                        fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                        lineNumber: 215,
                        columnNumber: 27
                      }, void 0),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex gap-4 text-sm text-purple-100", children: [
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: [
                          "Pain Level: ",
                          scenario.painLevel
                        ] }, void 0, true, {
                          fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                          lineNumber: 219,
                          columnNumber: 29
                        }, void 0),
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: [
                          "Typical Time Stuck: ",
                          scenario.timeStuck
                        ] }, void 0, true, {
                          fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                          lineNumber: 220,
                          columnNumber: 29
                        }, void 0)
                      ] }, void 0, true, {
                        fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                        lineNumber: 218,
                        columnNumber: 27
                      }, void 0)
                    ] }, void 0, true, {
                      fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                      lineNumber: 214,
                      columnNumber: 25
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "glass-panel rounded-full w-12 h-12 flex items-center justify-center text-white font-bold text-xl", children: scenario.id }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                      lineNumber: 223,
                      columnNumber: 25
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                    lineNumber: 213,
                    columnNumber: 23
                  }, void 0) }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                    lineNumber: 212,
                    columnNumber: 21
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-8", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid md:grid-cols-2 gap-8", children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-6", children: [
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border-l-4 border-red-500", children: [
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "heading-md text-important-accessible dark:text-white font-bold text-red-800 dark:text-red-300 mb-2 flex items-center", children: [
                            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "mr-2", children: "💬" }, void 0, false, {
                              fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                              lineNumber: 236,
                              columnNumber: 31
                            }, void 0),
                            "Customer Says:"
                          ] }, void 0, true, {
                            fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                            lineNumber: 235,
                            columnNumber: 29
                          }, void 0),
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-standard dark:text-gradient-safe italic", children: [
                            '"',
                            scenario.customerSays,
                            '"'
                          ] }, void 0, true, {
                            fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                            lineNumber: 239,
                            columnNumber: 29
                          }, void 0)
                        ] }, void 0, true, {
                          fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                          lineNumber: 234,
                          columnNumber: 27
                        }, void 0),
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-l-4 border-purple-500", children: [
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "heading-md text-important-accessible dark:text-white font-bold text-purple-800 dark:text-purple-300 mb-2 flex items-center", children: [
                            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "mr-2", children: "💭" }, void 0, false, {
                              fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                              lineNumber: 246,
                              columnNumber: 31
                            }, void 0),
                            "Customer Thinks:"
                          ] }, void 0, true, {
                            fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                            lineNumber: 245,
                            columnNumber: 29
                          }, void 0),
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-standard dark:text-gradient-safe", children: scenario.customerThinks }, void 0, false, {
                            fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                            lineNumber: 249,
                            columnNumber: 29
                          }, void 0)
                        ] }, void 0, true, {
                          fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                          lineNumber: 244,
                          columnNumber: 27
                        }, void 0)
                      ] }, void 0, true, {
                        fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                        lineNumber: 233,
                        columnNumber: 25
                      }, void 0),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-6", children: [
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 border-l-4 border-orange-500", children: [
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "heading-md text-important-accessible dark:text-white font-bold text-orange-800 dark:text-orange-300 mb-2 flex items-center", children: [
                            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "mr-2", children: "🔍" }, void 0, false, {
                              fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                              lineNumber: 259,
                              columnNumber: 31
                            }, void 0),
                            "Real Problem:"
                          ] }, void 0, true, {
                            fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                            lineNumber: 258,
                            columnNumber: 29
                          }, void 0),
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-standard dark:text-gradient-safe", children: scenario.realProblem }, void 0, false, {
                            fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                            lineNumber: 262,
                            columnNumber: 29
                          }, void 0)
                        ] }, void 0, true, {
                          fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                          lineNumber: 257,
                          columnNumber: 27
                        }, void 0),
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500", children: [
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "heading-md text-important-accessible dark:text-white font-bold text-green-800 dark:text-green-300 mb-2 flex items-center", children: [
                            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "mr-2", children: "✅" }, void 0, false, {
                              fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                              lineNumber: 269,
                              columnNumber: 31
                            }, void 0),
                            "Solution:"
                          ] }, void 0, true, {
                            fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                            lineNumber: 268,
                            columnNumber: 29
                          }, void 0),
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-standard dark:text-gradient-safe", children: scenario.solution }, void 0, false, {
                            fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                            lineNumber: 272,
                            columnNumber: 29
                          }, void 0)
                        ] }, void 0, true, {
                          fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                          lineNumber: 267,
                          columnNumber: 27
                        }, void 0)
                      ] }, void 0, true, {
                        fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                        lineNumber: 256,
                        columnNumber: 25
                      }, void 0)
                    ] }, void 0, true, {
                      fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                      lineNumber: 230,
                      columnNumber: 23
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800", children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "heading-md text-important-accessible dark:text-white font-bold text-blue-800 dark:text-blue-300 mb-2 flex items-center", children: [
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "mr-2", children: "🧠" }, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                          lineNumber: 282,
                          columnNumber: 27
                        }, void 0),
                        "Why This Works:"
                      ] }, void 0, true, {
                        fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                        lineNumber: 281,
                        columnNumber: 25
                      }, void 0),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-black-standard dark:text-gradient-safe font-medium", children: scenario.whyItWorks }, void 0, false, {
                        fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                        lineNumber: 285,
                        columnNumber: 25
                      }, void 0)
                    ] }, void 0, true, {
                      fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                      lineNumber: 280,
                      columnNumber: 23
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                    lineNumber: 229,
                    columnNumber: 21
                  }, void 0)
                ] }, scenario.id, true, {
                  fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                  lineNumber: 211,
                  columnNumber: 19
                }, void 0)) }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                  lineNumber: 209,
                  columnNumber: 15
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                lineNumber: 203,
                columnNumber: 13
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { className: "mb-16", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-8 border border-purple-200/50 dark:border-purple-800/50", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "heading-lg text-important-accessible dark:text-white text-2xl font-bold mb-4", children: "🚨 Stop Watching Your Market Fit Decay" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                  lineNumber: 298,
                  columnNumber: 17
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-lg text-black-standard dark:text-gradient-safe mb-6 max-w-3xl mx-auto", children: "Every month your messaging stays frozen while markets evolve, competitors with current positioning capture opportunities you're missing. Get your free PMF analysis and discover which erosion patterns are disconnecting you from your market." }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                  lineNumber: 301,
                  columnNumber: 17
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "button",
                  {
                    "aria-label": "Opens contact form for free marketing analysis",
                    onClick: () => setShowDropdownForm(true),
                    className: "bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 focus-visible:from-purple-600 hover:to-purple-700 focus-visible:to-purple-700 text-white px-8 py-4 rounded-xl font-bold text-lg motion-safe:transition-all motion-reduce:transition-none motion-safe:duration-300 motion-reduce:duration-0 motion-safe:transform motion-safe:hover:scale-105 motion-reduce:transform-none motion-safe:focus-visible:scale-105 motion-reduce:transform-none shadow-lg mr-4",
                    children: "Get Free PMF Restoration Analysis"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                    lineNumber: 305,
                    columnNumber: 17
                  },
                  void 0
                ),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "a",
                  {
                    href: `${"/reboot"}/growth-plateau-solutions`,
                    className: "border-2 border-purple-500 text-purple-600 hover:bg-purple-500 focus-visible:bg-purple-500 hover:text-white focus-visible:text-white px-8 py-4 rounded-xl font-bold text-lg motion-safe:transition-all motion-reduce:transition-none motion-safe:duration-300 motion-reduce:duration-0 inline-block",
                    children: "See All Plateau Types"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                    lineNumber: 311,
                    columnNumber: 17
                  },
                  void 0
                )
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                lineNumber: 297,
                columnNumber: 15
              }, void 0) }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                lineNumber: 296,
                columnNumber: 13
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { className: "mb-16", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "heading-xl text-gradient-critical text-3xl font-bold mb-8 text-center", children: "Related Growth Plateau Solutions" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                  lineNumber: 322,
                  columnNumber: 15
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid md:grid-cols-2 gap-6", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "glass-card-light rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-xl focus-visible:shadow-xl transition-shadow", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "heading-lg text-important-accessible dark:text-white text-xl font-bold mb-3", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: `${"/reboot"}/growth-plateau-solutions/market-expansion-barriers`, className: "hover:text-purple-600 focus-visible:text-purple-600 transition-colors", children: "Market Expansion Barriers →" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                      lineNumber: 328,
                      columnNumber: 21
                    }, void 0) }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                      lineNumber: 327,
                      columnNumber: 19
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-standard dark:text-gradient-safe", children: "Fit erosion often reveals expansion opportunities. Discover how positioning psychology unlocks adjacent markets." }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                      lineNumber: 332,
                      columnNumber: 19
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                    lineNumber: 326,
                    columnNumber: 17
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "glass-card-light rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-xl focus-visible:shadow-xl transition-shadow", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "heading-lg text-important-accessible dark:text-white text-xl font-bold mb-3", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: `${"/reboot"}/marketing-psychology`, className: "hover:text-purple-600 focus-visible:text-purple-600 transition-colors", children: "Marketing Psychology Fundamentals →" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                      lineNumber: 338,
                      columnNumber: 21
                    }, void 0) }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                      lineNumber: 337,
                      columnNumber: 19
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-standard dark:text-gradient-safe", children: "Master customer awareness stages and positioning psychology that prevents and reverses market fit erosion." }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                      lineNumber: 342,
                      columnNumber: 19
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                    lineNumber: 336,
                    columnNumber: 17
                  }, void 0)
                ] }, void 0, true, {
                  fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                  lineNumber: 325,
                  columnNumber: 15
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
                lineNumber: 321,
                columnNumber: 13
              }, void 0)
            ]
          },
          void 0,
          true,
          {
            fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
            lineNumber: 166,
            columnNumber: 11
          },
          void 0
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(GlobalFooter, { onShowForm: () => setShowDropdownForm(true) }, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
          lineNumber: 351,
          columnNumber: 11
        }, void 0)
      ] }, void 0, true, {
        fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
        lineNumber: 125,
        columnNumber: 9
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
      lineNumber: 122,
      columnNumber: 7
    }, void 0)
  ] }, void 0, true, {
    fileName: "/home/ian/projects/reboot/src/pages/ProductMarketFitErosion.tsx",
    lineNumber: 105,
    columnNumber: 5
  }, void 0);
};
const ProductMarketFitErosion$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ProductMarketFitErosion
}, Symbol.toStringTag, { value: "Module" }));
const CompetitivePressurePlateau = () => {
  const { setShowDropdownForm } = useLeadForm();
  reactExports.useEffect(() => {
    document.title = "Bigger Competitors Crushing You? Competitive Pressure Plateau Solutions | Reboot Media";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Bigger competitors crushing you? 6 competitive pressure plateau patterns where companies try to compete on competitors' terms instead of unique positioning.");
    }
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement("meta");
      metaKeywords.setAttribute("name", "keywords");
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute("content", "competitive pressure plateau, bigger competitors winning, competitive disadvantage, unique positioning, competitor differentiation");
  }, []);
  const scenarios = [
    {
      id: 1,
      title: 'The "Competing on Their Terms" Trap',
      customerSays: "Bigger competitors are crushing us",
      customerThinks: "We need to match their features and prices to compete",
      realProblem: "Trying to compete on competitors' strengths instead of your unique advantages",
      solution: "Identify and amplify your unique positioning advantages they can't match",
      whyItWorks: "Unique positioning beats feature matching - compete where you win",
      painLevel: "Very High",
      timeStuck: "12-18 months",
      gradient: "from-red-500 to-red-600"
    },
    {
      id: 2,
      title: 'The "Feature War" Futility',
      customerSays: "We keep adding features but still lose deals",
      customerThinks: "Our product isn't competitive enough feature-wise",
      realProblem: "Features wars favor companies with bigger budgets, not better solutions",
      solution: "Compete on outcomes and experience, not feature checklists",
      whyItWorks: "Customers buy results and peace of mind, not feature counts",
      painLevel: "High",
      timeStuck: "10-16 months",
      gradient: "from-orange-500 to-orange-600"
    },
    {
      id: 3,
      title: 'The "Price Race to Bottom" Trap',
      customerSays: "We have to discount heavily to win deals",
      customerThinks: "Price is the only way to compete with bigger players",
      realProblem: "Commoditized positioning forces price competition instead of value competition",
      solution: "Differentiate on value dimensions where size doesn't matter",
      whyItWorks: "Value > Price when positioning emphasizes unique outcomes",
      painLevel: "Very High",
      timeStuck: "6-12 months",
      gradient: "from-yellow-500 to-yellow-600"
    },
    {
      id: 4,
      title: 'The "Resource Allocation" Mistake',
      customerSays: "We can't compete with their marketing budget",
      customerThinks: "We need more money to compete effectively",
      realProblem: "Trying to out-spend instead of out-smart with better positioning",
      solution: "Focus resources on defensible positioning advantages and niche dominance",
      whyItWorks: "Strategic focus > budget size when targeting underserved segments",
      painLevel: "Medium",
      timeStuck: "8-14 months",
      gradient: "from-green-500 to-green-600"
    },
    {
      id: 5,
      title: 'The "Me-Too" Positioning Problem',
      customerSays: "Prospects say we're similar to [big competitor]",
      customerThinks: "We need to explain our differences better",
      realProblem: "Positioning sounds like competitor with minor variations",
      solution: "Create category of one positioning that makes comparison irrelevant",
      whyItWorks: "When you're the only option for specific outcome, price becomes secondary",
      painLevel: "High",
      timeStuck: "12-18 months",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      id: 6,
      title: 'The "Fear-Based Decision Making" Paralysis',
      customerSays: "Every move we make, they counter with something bigger",
      customerThinks: "Maybe we should avoid competing directly",
      realProblem: "Fear-based decisions instead of strategic advantage-based moves",
      solution: "Compete in spaces where your advantages matter most, avoid their strengths",
      whyItWorks: "Strategic positioning > defensive reactions in competitive dynamics",
      painLevel: "Medium",
      timeStuck: "6-10 months",
      gradient: "from-purple-500 to-purple-600"
    }
  ];
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "div",
      {
        "aria-live": "polite",
        "aria-atomic": "true",
        className: "sr-only",
        id: "status-announcer",
        children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "sr-only", children: "Content loaded successfully" }, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
          lineNumber: 113,
          columnNumber: 9
        }, void 0)
      },
      void 0,
      false,
      {
        fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
        lineNumber: 107,
        columnNumber: 7
      },
      void 0
    ),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      SEOHead,
      {
        title: "Bigger Competitors Crushing You? Competitive Pressure Plateau Solutions | Reboot Media",
        description: "Bigger competitors crushing you? 6 competitive pressure plateau patterns where companies try to compete on competitors' terms instead of unique positioning.",
        canonicalUrl: getCanonicalUrl("competitive-pressure-plateau")
      },
      void 0,
      false,
      {
        fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
        lineNumber: 116,
        columnNumber: 7
      },
      void 0
    ),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "competitive-pressure-page min-h-screen relative overflow-hidden dark:bg-gray-900", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(BackgroundGradient, {}, void 0, false, {
        fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
        lineNumber: 123,
        columnNumber: 9
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "relative z-10", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(GlobalHeader, { onShowForm: () => setShowDropdownForm(true), showProgressBar: true }, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
          lineNumber: 126,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { className: "pt-20 md:pt-24 pb-16 bg-gradient-to-br from-red-900 via-red-950 to-black relative overflow-hidden", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(220,38,38,0.1)_0%,transparent_50%)]" }, void 0, false, {
            fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
            lineNumber: 130,
            columnNumber: 13
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "relative max-w-5xl mx-auto px-6 lg:px-8", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-8", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("nav", { className: "flex items-center space-x-2 text-gradient-safe", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: `${"/reboot"}/growth-plateau-solutions`, className: "hover:text-red-400 focus-visible:text-red-400 transition-colors", children: "Growth Plateau Solutions" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                lineNumber: 136,
                columnNumber: 19
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: "→" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                lineNumber: 137,
                columnNumber: 19
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-red-400 font-semibold", children: "Competitive Pressure Plateau" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                lineNumber: 138,
                columnNumber: 19
              }, void 0)
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
              lineNumber: 135,
              columnNumber: 17
            }, void 0) }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
              lineNumber: 134,
              columnNumber: 15
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "inline-flex items-center gap-2 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 px-4 py-2 rounded-full text-sm font-semibold mb-6", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "w-2 h-2 bg-red-500 rounded-full animate-pulse" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                  lineNumber: 144,
                  columnNumber: 19
                }, void 0),
                "Bigger Competitors Winning"
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                lineNumber: 143,
                columnNumber: 17
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h1", { className: "heading-hero text-gradient-critical text-4xl md:text-6xl font-black mb-6 leading-tight", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-red-400", children: "Competitive Pressure" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                  lineNumber: 148,
                  columnNumber: 19
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "block text-white mt-2", children: "Plateau Solutions" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                  lineNumber: 149,
                  columnNumber: 19
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                lineNumber: 147,
                columnNumber: 17
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-black-important dark:text-gradient-critical text-xl text-gradient-safe mb-8 max-w-3xl mx-auto leading-relaxed", children: [
                "Bigger competitors crushing you? The problem isn't their size or budget—it's that you're trying to",
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-red-400 font-semibold", children: " compete on their terms" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                  lineNumber: 153,
                  columnNumber: 19
                }, void 0),
                " instead of creating unique positioning where you win."
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                lineNumber: 151,
                columnNumber: 17
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "button",
                {
                  "aria-label": "Opens contact form for free marketing analysis",
                  onClick: () => setShowDropdownForm(true),
                  className: "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 focus-visible:from-red-600 hover:to-red-700 focus-visible:to-red-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 focus-visible:scale-105 shadow-xl",
                  children: "Beat Bigger Competitors"
                },
                void 0,
                false,
                {
                  fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                  lineNumber: 155,
                  columnNumber: 17
                },
                void 0
              )
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
              lineNumber: 142,
              columnNumber: 15
            }, void 0)
          ] }, void 0, true, {
            fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
            lineNumber: 131,
            columnNumber: 13
          }, void 0)
        ] }, void 0, true, {
          fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
          lineNumber: 129,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "main",
          {
            id: "main-content",
            role: "main",
            "aria-label": "Main content",
            className: "max-w-5xl mx-auto px-6 lg:px-8 py-16",
            children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { className: "mb-16", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "glass-card-light rounded-2xl shadow-xl border border-red-200/50 dark:border-red-800/50 p-8", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "heading-xl text-gradient-critical text-2xl font-bold replace-text-gray-900 dark:text-white mb-6 text-center", children: "Why David Beats Goliath (Strategic Positioning Over Brute Force)" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                  lineNumber: 175,
                  columnNumber: 17
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-black-important dark:text-gradient-critical text-lg text-standard dark:text-gradient-safe mb-6 leading-relaxed text-center", children: "Competitive pressure plateaus happen when smaller companies try to compete on bigger companies' terms—features, price, or scale. The solution isn't bigger budgets; it's smarter positioning that makes their advantages irrelevant." }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                  lineNumber: 178,
                  columnNumber: 17
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid md:grid-cols-3 gap-6 mb-6", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-2xl font-bold text-red-600 mb-1", children: "76%" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                      lineNumber: 184,
                      columnNumber: 21
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm text-optional dark:luminescence-layer-3", children: "Feel competitor pressure" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                      lineNumber: 185,
                      columnNumber: 21
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                    lineNumber: 183,
                    columnNumber: 19
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-2xl font-bold text-orange-accessible mb-1", children: "38%" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                      lineNumber: 188,
                      columnNumber: 21
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm text-optional dark:luminescence-layer-3", children: "Try to match features" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                      lineNumber: 189,
                      columnNumber: 21
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                    lineNumber: 187,
                    columnNumber: 19
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-2xl font-bold text-green-600 mb-1", children: "14%" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                      lineNumber: 192,
                      columnNumber: 21
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm text-optional dark:luminescence-layer-3", children: "Win with unique positioning" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                      lineNumber: 193,
                      columnNumber: 21
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                    lineNumber: 191,
                    columnNumber: 19
                  }, void 0)
                ] }, void 0, true, {
                  fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                  lineNumber: 182,
                  columnNumber: 17
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-black-important dark:text-gradient-critical text-standard dark:text-gradient-safe font-semibold text-center", children: "The pattern: Competitor pressure → Feature matching → Price competition → Plateau" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                  lineNumber: 196,
                  columnNumber: 17
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                lineNumber: 174,
                columnNumber: 15
              }, void 0) }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                lineNumber: 173,
                columnNumber: 13
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { className: "mb-16", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "heading-xl text-gradient-critical text-3xl md:text-4xl font-bold replace-text-gray-900 dark:text-white mb-12 text-center", children: "6 Competitive Pressure Patterns (Which is Yours?)" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                  lineNumber: 204,
                  columnNumber: 15
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-8", children: scenarios.map((scenario) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "glass-card-light rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: `bg-gradient-to-r ${scenario.gradient} p-6`, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex justify-between items-start", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "heading-lg text-black-important dark:text-white text-2xl font-bold text-white mb-2", children: scenario.title }, void 0, false, {
                        fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                        lineNumber: 214,
                        columnNumber: 27
                      }, void 0),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex gap-4 text-sm text-red-100", children: [
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: [
                          "Pain Level: ",
                          scenario.painLevel
                        ] }, void 0, true, {
                          fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                          lineNumber: 218,
                          columnNumber: 29
                        }, void 0),
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: [
                          "Typical Time Stuck: ",
                          scenario.timeStuck
                        ] }, void 0, true, {
                          fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                          lineNumber: 219,
                          columnNumber: 29
                        }, void 0)
                      ] }, void 0, true, {
                        fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                        lineNumber: 217,
                        columnNumber: 27
                      }, void 0)
                    ] }, void 0, true, {
                      fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                      lineNumber: 213,
                      columnNumber: 25
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "glass-panel rounded-full w-12 h-12 flex items-center justify-center text-white font-bold text-xl", children: scenario.id }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                      lineNumber: 222,
                      columnNumber: 25
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                    lineNumber: 212,
                    columnNumber: 23
                  }, void 0) }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                    lineNumber: 211,
                    columnNumber: 21
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-8", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid md:grid-cols-2 gap-8", children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-6", children: [
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border-l-4 border-red-500", children: [
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "heading-md text-black-important dark:text-white font-bold text-red-800 dark:text-red-300 mb-2 flex items-center", children: [
                            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "mr-2", children: "💬" }, void 0, false, {
                              fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                              lineNumber: 235,
                              columnNumber: 31
                            }, void 0),
                            "Customer Says:"
                          ] }, void 0, true, {
                            fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                            lineNumber: 234,
                            columnNumber: 29
                          }, void 0),
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-standard dark:text-gradient-safe italic", children: [
                            '"',
                            scenario.customerSays,
                            '"'
                          ] }, void 0, true, {
                            fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                            lineNumber: 238,
                            columnNumber: 29
                          }, void 0)
                        ] }, void 0, true, {
                          fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                          lineNumber: 233,
                          columnNumber: 27
                        }, void 0),
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 border-l-4 border-orange-500", children: [
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "heading-md text-black-important dark:text-white font-bold text-orange-800 dark:text-orange-300 mb-2 flex items-center", children: [
                            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "mr-2", children: "💭" }, void 0, false, {
                              fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                              lineNumber: 245,
                              columnNumber: 31
                            }, void 0),
                            "Customer Thinks:"
                          ] }, void 0, true, {
                            fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                            lineNumber: 244,
                            columnNumber: 29
                          }, void 0),
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-standard dark:text-gradient-safe", children: scenario.customerThinks }, void 0, false, {
                            fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                            lineNumber: 248,
                            columnNumber: 29
                          }, void 0)
                        ] }, void 0, true, {
                          fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                          lineNumber: 243,
                          columnNumber: 27
                        }, void 0)
                      ] }, void 0, true, {
                        fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                        lineNumber: 232,
                        columnNumber: 25
                      }, void 0),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-6", children: [
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-l-4 border-yellow-500", children: [
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "heading-md text-black-important dark:text-white font-bold text-yellow-800 dark:text-yellow-300 mb-2 flex items-center", children: [
                            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "mr-2", children: "🔍" }, void 0, false, {
                              fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                              lineNumber: 258,
                              columnNumber: 31
                            }, void 0),
                            "Real Problem:"
                          ] }, void 0, true, {
                            fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                            lineNumber: 257,
                            columnNumber: 29
                          }, void 0),
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-standard dark:text-gradient-safe", children: scenario.realProblem }, void 0, false, {
                            fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                            lineNumber: 261,
                            columnNumber: 29
                          }, void 0)
                        ] }, void 0, true, {
                          fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                          lineNumber: 256,
                          columnNumber: 27
                        }, void 0),
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500", children: [
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "heading-md text-black-important dark:text-white font-bold text-green-800 dark:text-green-300 mb-2 flex items-center", children: [
                            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "mr-2", children: "✅" }, void 0, false, {
                              fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                              lineNumber: 268,
                              columnNumber: 31
                            }, void 0),
                            "Solution:"
                          ] }, void 0, true, {
                            fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                            lineNumber: 267,
                            columnNumber: 29
                          }, void 0),
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-standard dark:text-gradient-safe", children: scenario.solution }, void 0, false, {
                            fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                            lineNumber: 271,
                            columnNumber: 29
                          }, void 0)
                        ] }, void 0, true, {
                          fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                          lineNumber: 266,
                          columnNumber: 27
                        }, void 0)
                      ] }, void 0, true, {
                        fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                        lineNumber: 255,
                        columnNumber: 25
                      }, void 0)
                    ] }, void 0, true, {
                      fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                      lineNumber: 229,
                      columnNumber: 23
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800", children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "heading-md text-black-important dark:text-white font-bold text-blue-800 dark:text-blue-300 mb-2 flex items-center", children: [
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "mr-2", children: "🧠" }, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                          lineNumber: 281,
                          columnNumber: 27
                        }, void 0),
                        "Why This Works:"
                      ] }, void 0, true, {
                        fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                        lineNumber: 280,
                        columnNumber: 25
                      }, void 0),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-black-standard dark:text-gradient-safe font-medium", children: scenario.whyItWorks }, void 0, false, {
                        fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                        lineNumber: 284,
                        columnNumber: 25
                      }, void 0)
                    ] }, void 0, true, {
                      fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                      lineNumber: 279,
                      columnNumber: 23
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                    lineNumber: 228,
                    columnNumber: 21
                  }, void 0)
                ] }, scenario.id, true, {
                  fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                  lineNumber: 210,
                  columnNumber: 19
                }, void 0)) }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                  lineNumber: 208,
                  columnNumber: 15
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                lineNumber: 203,
                columnNumber: 13
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { className: "mb-16", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl p-8 border border-red-200/50 dark:border-red-800/50", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-2xl font-bold replace-text-gray-900 dark:text-white mb-4", children: "🚨 Stop Playing by Their Rules" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                  lineNumber: 297,
                  columnNumber: 17
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-black-important dark:text-gradient-critical text-lg text-black-standard dark:text-gradient-safe mb-6 max-w-3xl mx-auto", children: "Every month you compete on their terms—features, price, scale—you're fighting a battle you can't win. Get your free competitive analysis and discover unique positioning angles that make their size irrelevant." }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                  lineNumber: 300,
                  columnNumber: 17
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "button",
                  {
                    "aria-label": "Opens contact form for free marketing analysis",
                    onClick: () => setShowDropdownForm(true),
                    className: "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 focus-visible:from-red-600 hover:to-red-700 focus-visible:to-red-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 focus-visible:scale-105 shadow-lg mr-4",
                    children: "Get Free Competitive Analysis"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                    lineNumber: 304,
                    columnNumber: 17
                  },
                  void 0
                ),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "a",
                  {
                    href: `${"/reboot"}/growth-plateau-solutions`,
                    className: "border-2 border-red-500 text-red-600 hover:bg-red-500 focus-visible:bg-red-500 hover:text-white focus-visible:text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 inline-block",
                    children: "See All Plateau Types"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                    lineNumber: 310,
                    columnNumber: 17
                  },
                  void 0
                )
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                lineNumber: 296,
                columnNumber: 15
              }, void 0) }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                lineNumber: 295,
                columnNumber: 13
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { className: "mb-16", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "heading-xl text-gradient-critical text-3xl font-bold replace-text-gray-900 dark:text-white mb-8 text-center", children: "Related Growth Plateau Solutions" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                  lineNumber: 321,
                  columnNumber: 15
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid md:grid-cols-2 gap-6", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "glass-card-light rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-xl focus-visible:shadow-xl transition-shadow", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "heading-lg text-black-important dark:text-white text-xl font-bold replace-text-gray-900 dark:text-white mb-3", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: `${"/reboot"}/growth-plateau-solutions/customer-acquisition-stall`, className: "hover:text-red-600 focus-visible:text-red-600 transition-colors", children: "Customer Acquisition Stall →" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                      lineNumber: 327,
                      columnNumber: 21
                    }, void 0) }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                      lineNumber: 326,
                      columnNumber: 19
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-standard dark:text-gradient-safe", children: "Competitive pressure often drives CAC inflation. Learn psychology-driven acquisition that sidesteps competitor wars." }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                      lineNumber: 331,
                      columnNumber: 19
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                    lineNumber: 325,
                    columnNumber: 17
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "glass-card-light rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-xl focus-visible:shadow-xl transition-shadow", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "heading-lg text-black-important dark:text-white text-xl font-bold replace-text-gray-900 dark:text-white mb-3", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: `${"/reboot"}/fractional-cmo-guide`, className: "hover:text-red-600 focus-visible:text-red-600 transition-colors", children: "Need Strategic Marketing Leadership? →" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                      lineNumber: 337,
                      columnNumber: 21
                    }, void 0) }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                      lineNumber: 336,
                      columnNumber: 19
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-standard dark:text-gradient-safe", children: "Competitive positioning requires strategic thinking. Discover if fractional CMO expertise can create winning differentiation." }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                      lineNumber: 341,
                      columnNumber: 19
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                    lineNumber: 335,
                    columnNumber: 17
                  }, void 0)
                ] }, void 0, true, {
                  fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                  lineNumber: 324,
                  columnNumber: 15
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
                lineNumber: 320,
                columnNumber: 13
              }, void 0)
            ]
          },
          void 0,
          true,
          {
            fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
            lineNumber: 166,
            columnNumber: 11
          },
          void 0
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(GlobalFooter, { onShowForm: () => setShowDropdownForm(true) }, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
          lineNumber: 350,
          columnNumber: 11
        }, void 0)
      ] }, void 0, true, {
        fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
        lineNumber: 125,
        columnNumber: 9
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
      lineNumber: 122,
      columnNumber: 7
    }, void 0)
  ] }, void 0, true, {
    fileName: "/home/ian/projects/reboot/src/pages/CompetitivePressurePlateau.tsx",
    lineNumber: 105,
    columnNumber: 5
  }, void 0);
};
const CompetitivePressurePlateau$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CompetitivePressurePlateau
}, Symbol.toStringTag, { value: "Module" }));
export {
  CustomerAcquisitionStall$1 as C,
  GrowthPlateauSolutions$1 as G,
  MarketExpansionBarriers$1 as M,
  OperationalScalingCrisis$1 as O,
  ProductMarketFitErosion$1 as P,
  RevenueCeilingBreakthrough$1 as R,
  TeamGrowthBottlenecks$1 as T,
  CompetitivePressurePlateau$1 as a
};
//# sourceMappingURL=pages-solutions-DoLv_o7G.js.map
