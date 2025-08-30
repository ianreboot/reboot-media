import { u as useLeadForm, r as reactExports, j as jsxDevRuntimeExports, S as SEOHead, g as getCanonicalUrl, B as BackgroundGradient, G as GlobalHeader, a as GlobalFooter } from "./index.dev-CuFpdffV.js";
const WhenToChooseEach = () => {
  const { setShowDropdownForm } = useLeadForm();
  reactExports.useEffect(() => {
    document.title = "When to Choose Each Marketing Model: Decision Matrix | Reboot Media";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Clear decision matrix for choosing between Fractional CMO, agency, consultant, or in-house team. 7 business situations with definitive recommendations.");
    }
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement("meta");
      metaKeywords.setAttribute("name", "keywords");
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute("content", "marketing model decision matrix, when to hire fractional cmo, marketing leadership options, choose marketing approach");
  }, []);
  const scenarios = [
    {
      id: 1,
      title: 'The "Pre-Revenue Startup" Stage',
      companySays: "We need marketing but have no revenue",
      companyThinks: "We can't afford professional marketing",
      realConsideration: "MVP validation vs growth engine building",
      evaluationFramework: "Product-market fit testing needs",
      outcome: "DIY until MVP proven; Consultant for validation; Fractional CMO at $500K revenue",
      painLevel: "Medium",
      timeStuck: "3-6 months",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      id: 2,
      title: 'The "First Million Revenue" Milestone',
      companySays: "Marketing got us here, but growth is slowing",
      companyThinks: "We need more of what we've been doing",
      realConsideration: "Tactical execution vs strategic shift needs",
      evaluationFramework: "Growth ceiling indicators",
      outcome: "Agency for more tactics; Fractional CMO for breakthrough strategy",
      painLevel: "High",
      timeStuck: "8-12 months",
      gradient: "from-blue-500 to-indigo-500"
    },
    {
      id: 3,
      title: 'The "Rapid Scaling" Pressure',
      companySays: "We just raised funding and need to grow fast",
      companyThinks: "We need a full marketing team immediately",
      realConsideration: "Speed vs sustainable growth infrastructure",
      evaluationFramework: "Burn rate vs growth efficiency",
      outcome: "Fractional CMO to build strategy + Agency for execution speed",
      painLevel: "Very High",
      timeStuck: "6-10 months",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      id: 4,
      title: 'The "Marketing Crisis" Emergency',
      companySays: "Our marketing completely stopped working",
      companyThinks: "We need to change everything",
      realConsideration: "Diagnosis vs panic reaction",
      evaluationFramework: "Root cause analysis requirements",
      outcome: "Consultant for audit; Fractional CMO for turnaround; New agency for fresh tactics",
      painLevel: "Critical",
      timeStuck: "2-4 months",
      gradient: "from-red-500 to-pink-500"
    },
    {
      id: 5,
      title: 'The "Mature Business Plateau" Challenge',
      companySays: "We've been at the same revenue for years",
      companyThinks: "Marketing isn't the problem",
      realConsideration: "Market evolution vs internal stagnation",
      evaluationFramework: "Innovation capacity assessment",
      outcome: "Full-time CMO for transformation; Fractional for targeted breakthrough",
      painLevel: "High",
      timeStuck: "24-36 months",
      gradient: "from-purple-500 to-violet-500"
    },
    {
      id: 6,
      title: 'The "Geographic Expansion" Opportunity',
      companySays: "We want to expand to new markets",
      companyThinks: "We'll replicate what works here",
      realConsideration: "Market differences vs universal principles",
      evaluationFramework: "Localization vs standardization needs",
      outcome: "Consultant for market research; Fractional CMO for strategy; Local agency for execution",
      painLevel: "Medium",
      timeStuck: "12-18 months",
      gradient: "from-teal-500 to-cyan-500"
    },
    {
      id: 7,
      title: 'The "Digital Transformation" Imperative',
      companySays: "We need to modernize our marketing",
      companyThinks: "We need younger marketers",
      realConsideration: "Technology adoption vs strategic thinking",
      evaluationFramework: "Digital maturity assessment",
      outcome: "In-house for daily digital; Fractional CMO for transformation strategy",
      painLevel: "High",
      timeStuck: "18-24 months",
      gradient: "from-gray-500 to-slate-500"
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
          fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
          lineNumber: 125,
          columnNumber: 9
        }, void 0)
      },
      void 0,
      false,
      {
        fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
        lineNumber: 119,
        columnNumber: 7
      },
      void 0
    ),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      SEOHead,
      {
        title: "When to Choose Each Marketing Model: Decision Matrix | Reboot Media",
        description: "Clear decision matrix for choosing between Fractional CMO, agency, consultant, or in-house team. 7 business situations with definitive recommendations.",
        canonicalUrl: getCanonicalUrl("when-to-choose-each")
      },
      void 0,
      false,
      {
        fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
        lineNumber: 128,
        columnNumber: 7
      },
      void 0
    ),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "when-to-choose-page min-h-screen relative overflow-hidden", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(BackgroundGradient, {}, void 0, false, {
        fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
        lineNumber: 135,
        columnNumber: 9
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "relative z-10", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(GlobalHeader, { onShowForm: () => setShowDropdownForm(true), showProgressBar: true }, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
          lineNumber: 138,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { className: "pt-20 md:pt-24 pb-16 bg-gradient-to-br from-indigo-900 via-purple-950 to-black relative overflow-hidden", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(129,140,248,0.1)_0%,transparent_50%)]" }, void 0, false, {
            fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
            lineNumber: 142,
            columnNumber: 13
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "relative max-w-5xl mx-auto px-6 lg:px-8", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-8", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("nav", { className: "flex items-center space-x-2 text-gradient-safe", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: `${"/reboot"}/fractional-cmo-guide`, className: "hover:text-indigo-400 focus-visible:text-indigo-400 transition-colors", children: "Fractional CMO Guide" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                lineNumber: 148,
                columnNumber: 19
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: "→" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                lineNumber: 149,
                columnNumber: 19
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-indigo-400 font-semibold", children: "When to Choose Each" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                lineNumber: 150,
                columnNumber: 19
              }, void 0)
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
              lineNumber: 147,
              columnNumber: 17
            }, void 0) }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
              lineNumber: 146,
              columnNumber: 15
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "inline-flex items-center gap-2 bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-semibold mb-6", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "w-2 h-2 bg-indigo-500 rounded-full animate-pulse" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                  lineNumber: 156,
                  columnNumber: 19
                }, void 0),
                "Clear Decision Matrix for Every Situation"
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                lineNumber: 155,
                columnNumber: 17
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h1", { className: "heading-hero text-gradient-critical mb-6 leading-tight", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-indigo-400", children: "When to Choose" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                  lineNumber: 160,
                  columnNumber: 19
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "block text-purple-400 mt-2", children: "Each Marketing Model" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                  lineNumber: 161,
                  columnNumber: 19
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                lineNumber: 159,
                columnNumber: 17
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xl text-gradient-safe mb-8 max-w-3xl mx-auto leading-relaxed", children: [
                "Stop guessing. Every business situation has an optimal marketing model.",
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-indigo-400 font-semibold", children: " Match your stage, challenge, and goals to the right approach." }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                  lineNumber: 165,
                  columnNumber: 19
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                lineNumber: 163,
                columnNumber: 17
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "button",
                {
                  "aria-label": "Opens contact form for free marketing analysis",
                  onClick: () => setShowDropdownForm(true),
                  className: "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 focus-visible:from-indigo-600 hover:to-purple-700 focus-visible:to-purple-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 focus-visible:scale-105 shadow-xl",
                  children: "Get Your Custom Recommendation"
                },
                void 0,
                false,
                {
                  fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                  lineNumber: 167,
                  columnNumber: 17
                },
                void 0
              )
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
              lineNumber: 154,
              columnNumber: 15
            }, void 0)
          ] }, void 0, true, {
            fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
            lineNumber: 143,
            columnNumber: 13
          }, void 0)
        ] }, void 0, true, {
          fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
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
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { className: "mb-16", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "glass-card-light rounded-2xl shadow-xl border border-indigo-200/50 p-8", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "heading-xl text-gradient-critical mb-6", children: "Quick Decision Matrix (Your Situation → Best Model)" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                  lineNumber: 187,
                  columnNumber: 17
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid md:grid-cols-2 gap-4 text-sm", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-4 glass-card-medium rounded-lg", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { className: "text-orange-800", children: "Pre-revenue/MVP Stage:" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                      lineNumber: 192,
                      columnNumber: 21
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-standard mt-1", children: "DIY → Consultant for validation" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                      lineNumber: 193,
                      columnNumber: 21
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                    lineNumber: 191,
                    columnNumber: 19
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-4 glass-card-solid rounded-lg", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { className: "text-blue-800", children: "$500K-1M Revenue:" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                      lineNumber: 196,
                      columnNumber: 21
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-standard mt-1", children: "Fractional CMO + Tactical agency" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                      lineNumber: 197,
                      columnNumber: 21
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                    lineNumber: 195,
                    columnNumber: 19
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-4 glass-card-solid rounded-lg", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { className: "text-green-800", children: "$1M-3M Scaling:" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                      lineNumber: 200,
                      columnNumber: 21
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-standard mt-1", children: "Fractional CMO leading strategy" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                      lineNumber: 201,
                      columnNumber: 21
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                    lineNumber: 199,
                    columnNumber: 19
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-4 glass-card-solid rounded-lg", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { className: "text-purple-800", children: "$3M-5M Growth:" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                      lineNumber: 204,
                      columnNumber: 21
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-standard mt-1", children: "Fractional + In-house team" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                      lineNumber: 205,
                      columnNumber: 21
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                    lineNumber: 203,
                    columnNumber: 19
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-4 glass-card-solid rounded-lg", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { className: "text-red-800", children: "Crisis/Turnaround:" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                      lineNumber: 208,
                      columnNumber: 21
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-standard mt-1", children: "Fractional CMO immediately" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                      lineNumber: 209,
                      columnNumber: 21
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                    lineNumber: 207,
                    columnNumber: 19
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-4 glass-card-medium rounded-lg", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { className: "text-indigo-800", children: "$5M+ Established:" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                      lineNumber: 212,
                      columnNumber: 21
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-standard mt-1", children: "Full-time CMO + complete team" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                      lineNumber: 213,
                      columnNumber: 21
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                    lineNumber: 211,
                    columnNumber: 19
                  }, void 0)
                ] }, void 0, true, {
                  fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                  lineNumber: 190,
                  columnNumber: 17
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                lineNumber: 186,
                columnNumber: 15
              }, void 0) }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                lineNumber: 185,
                columnNumber: 13
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { className: "mb-16", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "heading-xl text-gradient-critical mb-12 text-center", children: "7 Business Situations With Clear Recommendations" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                  lineNumber: 221,
                  columnNumber: 15
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-8", children: scenarios.map((scenario) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "glass-card-light rounded-2xl shadow-xl border border-white/20 overflow-hidden", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: `bg-gradient-to-r ${scenario.gradient} p-6`, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex justify-between items-start", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "heading-lg text-white mb-2", children: scenario.title }, void 0, false, {
                        fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                        lineNumber: 231,
                        columnNumber: 27
                      }, void 0),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex gap-4 text-sm text-white/90", children: [
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: [
                          "Pain Level: ",
                          scenario.painLevel
                        ] }, void 0, true, {
                          fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                          lineNumber: 235,
                          columnNumber: 29
                        }, void 0),
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: [
                          "Decision Delay: ",
                          scenario.timeStuck
                        ] }, void 0, true, {
                          fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                          lineNumber: 236,
                          columnNumber: 29
                        }, void 0)
                      ] }, void 0, true, {
                        fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                        lineNumber: 234,
                        columnNumber: 27
                      }, void 0)
                    ] }, void 0, true, {
                      fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                      lineNumber: 230,
                      columnNumber: 25
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-white/20 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center text-white font-bold text-xl", children: scenario.id }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                      lineNumber: 239,
                      columnNumber: 25
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                    lineNumber: 229,
                    columnNumber: 23
                  }, void 0) }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                    lineNumber: 228,
                    columnNumber: 21
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-8", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid md:grid-cols-2 gap-8", children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-6", children: [
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "glass-card-light rounded-lg p-4 border-l-4 border-red-500", children: [
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "heading-md text-red-800 mb-2 flex items-center", children: [
                            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "mr-2", children: "💬" }, void 0, false, {
                              fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                              lineNumber: 252,
                              columnNumber: 31
                            }, void 0),
                            "Company Says:"
                          ] }, void 0, true, {
                            fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                            lineNumber: 251,
                            columnNumber: 29
                          }, void 0),
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-standard italic", children: [
                            '"',
                            scenario.companySays,
                            '"'
                          ] }, void 0, true, {
                            fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                            lineNumber: 255,
                            columnNumber: 29
                          }, void 0)
                        ] }, void 0, true, {
                          fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                          lineNumber: 250,
                          columnNumber: 27
                        }, void 0),
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "glass-card-solid rounded-lg p-4 border-l-4 border-indigo-500", children: [
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "heading-md text-indigo-800 mb-2 flex items-center", children: [
                            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "mr-2", children: "💭" }, void 0, false, {
                              fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                              lineNumber: 262,
                              columnNumber: 31
                            }, void 0),
                            "Company Thinks:"
                          ] }, void 0, true, {
                            fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                            lineNumber: 261,
                            columnNumber: 29
                          }, void 0),
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-standard", children: scenario.companyThinks }, void 0, false, {
                            fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                            lineNumber: 265,
                            columnNumber: 29
                          }, void 0)
                        ] }, void 0, true, {
                          fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                          lineNumber: 260,
                          columnNumber: 27
                        }, void 0)
                      ] }, void 0, true, {
                        fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                        lineNumber: 249,
                        columnNumber: 25
                      }, void 0),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-6", children: [
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "glass-card-medium rounded-lg p-4 border-l-4 border-orange-500", children: [
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "heading-md text-orange-800 mb-2 flex items-center", children: [
                            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "mr-2", children: "🔍" }, void 0, false, {
                              fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                              lineNumber: 275,
                              columnNumber: 31
                            }, void 0),
                            "Real Consideration:"
                          ] }, void 0, true, {
                            fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                            lineNumber: 274,
                            columnNumber: 29
                          }, void 0),
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-standard", children: scenario.realConsideration }, void 0, false, {
                            fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                            lineNumber: 278,
                            columnNumber: 29
                          }, void 0)
                        ] }, void 0, true, {
                          fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                          lineNumber: 273,
                          columnNumber: 27
                        }, void 0),
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "glass-card-solid rounded-lg p-4 border-l-4 border-purple-500", children: [
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "heading-md text-purple-800 mb-2 flex items-center", children: [
                            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "mr-2", children: "⚖️" }, void 0, false, {
                              fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                              lineNumber: 285,
                              columnNumber: 31
                            }, void 0),
                            "Evaluation Framework:"
                          ] }, void 0, true, {
                            fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                            lineNumber: 284,
                            columnNumber: 29
                          }, void 0),
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-standard", children: scenario.evaluationFramework }, void 0, false, {
                            fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                            lineNumber: 288,
                            columnNumber: 29
                          }, void 0)
                        ] }, void 0, true, {
                          fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                          lineNumber: 283,
                          columnNumber: 27
                        }, void 0)
                      ] }, void 0, true, {
                        fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                        lineNumber: 272,
                        columnNumber: 25
                      }, void 0)
                    ] }, void 0, true, {
                      fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                      lineNumber: 246,
                      columnNumber: 23
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-6 glass-card-solid rounded-lg p-4 border border-green-200", children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "heading-md text-green-800 mb-2 flex items-center", children: [
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "mr-2", children: "🎯" }, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                          lineNumber: 298,
                          columnNumber: 27
                        }, void 0),
                        "Clear Recommendation:"
                      ] }, void 0, true, {
                        fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                        lineNumber: 297,
                        columnNumber: 25
                      }, void 0),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-gray-900 font-medium", children: scenario.outcome }, void 0, false, {
                        fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                        lineNumber: 301,
                        columnNumber: 25
                      }, void 0)
                    ] }, void 0, true, {
                      fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                      lineNumber: 296,
                      columnNumber: 23
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                    lineNumber: 245,
                    columnNumber: 21
                  }, void 0)
                ] }, scenario.id, true, {
                  fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                  lineNumber: 227,
                  columnNumber: 19
                }, void 0)) }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                  lineNumber: 225,
                  columnNumber: 15
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                lineNumber: 220,
                columnNumber: 13
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { className: "mb-16", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "glass-card-light rounded-2xl shadow-xl border border-white/20 p-8 overflow-x-auto", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "heading-xl text-gradient-critical mb-6", children: "Marketing Model Comparison Matrix" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                  lineNumber: 314,
                  columnNumber: 17
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("table", { className: "w-full text-sm", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("thead", { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("tr", { className: "border-b border-gray-200", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("th", { className: "text-left py-3 px-2 font-bold text-gray-900", children: "Factor" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                      lineNumber: 320,
                      columnNumber: 23
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("th", { className: "text-center py-3 px-2 text-blue-accessible", children: "Fractional CMO" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                      lineNumber: 321,
                      columnNumber: 23
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("th", { className: "text-center py-3 px-2 text-orange-accessible", children: "Agency" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                      lineNumber: 322,
                      columnNumber: 23
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("th", { className: "text-center py-3 px-2 text-purple-600", children: "Consultant" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                      lineNumber: 323,
                      columnNumber: 23
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("th", { className: "text-center py-3 px-2 text-green-600", children: "In-House" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                      lineNumber: 324,
                      columnNumber: 23
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                    lineNumber: 319,
                    columnNumber: 21
                  }, void 0) }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                    lineNumber: 318,
                    columnNumber: 19
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("tbody", { children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("tr", { className: "border-b border-gray-100", children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("td", { className: "py-3 px-2 font-medium", children: "Best For Revenue" }, void 0, false, {
                        fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                        lineNumber: 329,
                        columnNumber: 23
                      }, void 0),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("td", { className: "text-center py-3 px-2", children: "$500K-5M" }, void 0, false, {
                        fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                        lineNumber: 330,
                        columnNumber: 23
                      }, void 0),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("td", { className: "text-center py-3 px-2", children: "Any" }, void 0, false, {
                        fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                        lineNumber: 331,
                        columnNumber: 23
                      }, void 0),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("td", { className: "text-center py-3 px-2", children: "$1M+" }, void 0, false, {
                        fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                        lineNumber: 332,
                        columnNumber: 23
                      }, void 0),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("td", { className: "text-center py-3 px-2", children: "$3M+" }, void 0, false, {
                        fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                        lineNumber: 333,
                        columnNumber: 23
                      }, void 0)
                    ] }, void 0, true, {
                      fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                      lineNumber: 328,
                      columnNumber: 21
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("tr", { className: "border-b border-gray-100", children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("td", { className: "py-3 px-2 font-medium", children: "Primary Value" }, void 0, false, {
                        fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                        lineNumber: 336,
                        columnNumber: 23
                      }, void 0),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("td", { className: "text-center py-3 px-2", children: "Strategy + Execution" }, void 0, false, {
                        fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                        lineNumber: 337,
                        columnNumber: 23
                      }, void 0),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("td", { className: "text-center py-3 px-2", children: "Execution" }, void 0, false, {
                        fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                        lineNumber: 338,
                        columnNumber: 23
                      }, void 0),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("td", { className: "text-center py-3 px-2", children: "Analysis" }, void 0, false, {
                        fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                        lineNumber: 339,
                        columnNumber: 23
                      }, void 0),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("td", { className: "text-center py-3 px-2", children: "Continuity" }, void 0, false, {
                        fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                        lineNumber: 340,
                        columnNumber: 23
                      }, void 0)
                    ] }, void 0, true, {
                      fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                      lineNumber: 335,
                      columnNumber: 21
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("tr", { className: "border-b border-gray-100 glass-card-solid", children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("td", { className: "py-3 px-2 font-medium", children: "Time to Impact" }, void 0, false, {
                        fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                        lineNumber: 343,
                        columnNumber: 23
                      }, void 0),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("td", { className: "text-center py-3 px-2 font-semibold", children: "30-60 days" }, void 0, false, {
                        fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                        lineNumber: 344,
                        columnNumber: 23
                      }, void 0),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("td", { className: "text-center py-3 px-2 font-semibold", children: "60-90 days" }, void 0, false, {
                        fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                        lineNumber: 345,
                        columnNumber: 23
                      }, void 0),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("td", { className: "text-center py-3 px-2 font-semibold", children: "90-120 days" }, void 0, false, {
                        fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                        lineNumber: 346,
                        columnNumber: 23
                      }, void 0),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("td", { className: "text-center py-3 px-2 font-semibold", children: "180+ days" }, void 0, false, {
                        fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                        lineNumber: 347,
                        columnNumber: 23
                      }, void 0)
                    ] }, void 0, true, {
                      fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                      lineNumber: 342,
                      columnNumber: 21
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("tr", { className: "border-b border-gray-100 glass-card-solid", children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("td", { className: "py-3 px-2 font-medium", children: "Cost Structure" }, void 0, false, {
                        fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                        lineNumber: 350,
                        columnNumber: 23
                      }, void 0),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("td", { className: "text-center py-3 px-2 font-semibold", children: "$5-15K/month" }, void 0, false, {
                        fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                        lineNumber: 351,
                        columnNumber: 23
                      }, void 0),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("td", { className: "text-center py-3 px-2 font-semibold", children: "$3-20K/month" }, void 0, false, {
                        fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                        lineNumber: 352,
                        columnNumber: 23
                      }, void 0),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("td", { className: "text-center py-3 px-2 font-semibold", children: "$25-75K project" }, void 0, false, {
                        fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                        lineNumber: 353,
                        columnNumber: 23
                      }, void 0),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("td", { className: "text-center py-3 px-2 font-semibold", children: "$8-25K/month" }, void 0, false, {
                        fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                        lineNumber: 354,
                        columnNumber: 23
                      }, void 0)
                    ] }, void 0, true, {
                      fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                      lineNumber: 349,
                      columnNumber: 21
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("tr", { children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("td", { className: "py-3 px-2 font-medium", children: "Accountability" }, void 0, false, {
                        fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                        lineNumber: 357,
                        columnNumber: 23
                      }, void 0),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("td", { className: "text-center py-3 px-2", children: "✅ Results" }, void 0, false, {
                        fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                        lineNumber: 358,
                        columnNumber: 23
                      }, void 0),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("td", { className: "text-center py-3 px-2", children: "⚠️ Tasks" }, void 0, false, {
                        fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                        lineNumber: 359,
                        columnNumber: 23
                      }, void 0),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("td", { className: "text-center py-3 px-2", children: "❌ Advice" }, void 0, false, {
                        fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                        lineNumber: 360,
                        columnNumber: 23
                      }, void 0),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("td", { className: "text-center py-3 px-2", children: "⚠️ Effort" }, void 0, false, {
                        fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                        lineNumber: 361,
                        columnNumber: 23
                      }, void 0)
                    ] }, void 0, true, {
                      fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                      lineNumber: 356,
                      columnNumber: 21
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                    lineNumber: 327,
                    columnNumber: 19
                  }, void 0)
                ] }, void 0, true, {
                  fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                  lineNumber: 317,
                  columnNumber: 17
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                lineNumber: 313,
                columnNumber: 15
              }, void 0) }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                lineNumber: 312,
                columnNumber: 13
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { className: "mb-16", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center glass-card-light rounded-2xl p-8 border border-indigo-200/50", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "heading-lg text-gradient-critical mb-4", children: "🚨 Stop Choosing the Wrong Marketing Model" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                  lineNumber: 371,
                  columnNumber: 17
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-lg text-black-standard mb-6 max-w-3xl mx-auto", children: "Every month with the wrong model costs you growth, money, and momentum. Get your personalized recommendation based on your specific situation, budget, and goals." }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                  lineNumber: 374,
                  columnNumber: 17
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "button",
                  {
                    "aria-label": "Opens contact form for free marketing analysis",
                    onClick: () => setShowDropdownForm(true),
                    className: "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 focus-visible:from-indigo-600 hover:to-purple-700 focus-visible:to-purple-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 focus-visible:scale-105 shadow-lg mr-4",
                    children: "Get Personalized Recommendation"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                    lineNumber: 378,
                    columnNumber: 17
                  },
                  void 0
                ),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: `${"/reboot"}/fractional-cmo-guide/cost-roi-analysis`, className: "border-2 border-indigo-500 text-indigo-600 hover:bg-indigo-500 focus-visible:bg-indigo-500 hover:text-white focus-visible:text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 inline-block", children: "See Cost Analysis" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                  lineNumber: 384,
                  columnNumber: 17
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                lineNumber: 370,
                columnNumber: 15
              }, void 0) }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                lineNumber: 369,
                columnNumber: 13
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { className: "mb-16", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "heading-xl text-gradient-critical mb-8 text-center", children: "Related Decision Resources" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                  lineNumber: 392,
                  columnNumber: 15
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid md:grid-cols-2 gap-6", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "glass-card-light rounded-xl shadow-lg border border-white/20 p-6 hover:shadow-xl focus-visible:shadow-xl transition-shadow", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "heading-lg text-gradient-critical mb-3", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: `${"/reboot"}/fractional-cmo-guide/transition-strategies`, className: "hover:text-indigo-600 focus-visible:text-indigo-600 transition-colors", children: "How to Transition Between Models →" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                      lineNumber: 398,
                      columnNumber: 21
                    }, void 0) }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                      lineNumber: 397,
                      columnNumber: 19
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-standard", children: "Growth requires different models at different stages. Learn how to transition smoothly without losing momentum." }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                      lineNumber: 402,
                      columnNumber: 19
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                    lineNumber: 396,
                    columnNumber: 17
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "glass-card-light rounded-xl shadow-lg border border-white/20 p-6 hover:shadow-xl focus-visible:shadow-xl transition-shadow", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "heading-lg text-gradient-critical mb-3", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: `${"/reboot"}/growth-plateau-solutions`, className: "hover:text-indigo-600 focus-visible:text-indigo-600 transition-colors", children: "Stuck at Current Model? →" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                      lineNumber: 408,
                      columnNumber: 21
                    }, void 0) }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                      lineNumber: 407,
                      columnNumber: 19
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-standard", children: "Growth plateaus often signal the need for a different marketing model. Identify your plateau and solution." }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                      lineNumber: 412,
                      columnNumber: 19
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                    lineNumber: 406,
                    columnNumber: 17
                  }, void 0)
                ] }, void 0, true, {
                  fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                  lineNumber: 395,
                  columnNumber: 15
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
                lineNumber: 391,
                columnNumber: 13
              }, void 0)
            ]
          },
          void 0,
          true,
          {
            fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
            lineNumber: 178,
            columnNumber: 11
          },
          void 0
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(GlobalFooter, { onShowForm: () => setShowDropdownForm(true) }, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
          lineNumber: 421,
          columnNumber: 11
        }, void 0)
      ] }, void 0, true, {
        fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
        lineNumber: 137,
        columnNumber: 9
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
      lineNumber: 134,
      columnNumber: 7
    }, void 0)
  ] }, void 0, true, {
    fileName: "/home/ian/projects/reboot/src/pages/WhenToChooseEach.tsx",
    lineNumber: 117,
    columnNumber: 5
  }, void 0);
};
export {
  WhenToChooseEach as default
};
//# sourceMappingURL=WhenToChooseEach-CL6hpXVV.js.map
