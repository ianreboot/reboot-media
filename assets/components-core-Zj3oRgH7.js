import { r as reactExports, j as jsxDevRuntimeExports } from "./react-core-CWvNQPo6.js";
import { u as useLocation, a as useNavigate } from "./router-Up7tU2vJ.js";
import { B as BackToTopButton } from "./components-perf-CB4PwQVg.js";
const GlobalHeader = ({ onShowForm, showProgressBar = false }) => {
  const [scrollY, setScrollY] = reactExports.useState(0);
  const [readingProgress, setReadingProgress] = reactExports.useState(0);
  const [showDevDropdown, setShowDevDropdown] = reactExports.useState(false);
  const [showMobileMenu, setShowMobileMenu] = reactExports.useState(false);
  const [isScrollingUp, setIsScrollingUp] = reactExports.useState(true);
  const [lastScrollY, setLastScrollY] = reactExports.useState(0);
  const dropdownRef = reactExports.useRef(null);
  const mobileMenuRef = reactExports.useRef(null);
  const location = useLocation();
  const getProgressBarGradient = () => {
    const path = location.pathname;
    if (path.includes("/fractional-cmo-guide")) return "from-blue-500 to-purple-600";
    if (path.includes("/marketing-psychology")) return "from-orange-500 to-orange-600";
    if (path.includes("/growth-plateau-solutions")) return "from-red-500 to-red-600";
    if (path.includes("/about")) return "from-blue-500 to-indigo-600";
    if (path.includes("/contact")) return "from-green-500 to-green-600";
    if (path.includes("/privacy") || path.includes("/terms")) return "from-slate-500 to-slate-600";
    return "from-orange-500 to-orange-600";
  };
  reactExports.useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          setIsScrollingUp(currentScrollY < lastScrollY || currentScrollY < 100);
          setLastScrollY(currentScrollY);
          setScrollY(currentScrollY);
          if (showProgressBar) {
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = currentScrollY / docHeight * 100;
            setReadingProgress(Math.min(100, Math.max(0, progress)));
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showProgressBar, lastScrollY]);
  reactExports.useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDevDropdown(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setShowMobileMenu(false);
      }
    };
    if (showDevDropdown || showMobileMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDevDropdown, showMobileMenu]);
  reactExports.useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setShowDevDropdown(false);
        setShowMobileMenu(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);
  reactExports.useEffect(() => {
    if (showMobileMenu) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [showMobileMenu]);
  const handleMenuItemClick = reactExports.useCallback(() => {
    setShowDevDropdown(false);
    setShowMobileMenu(false);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  }, []);
  const navigationItems = [
    { path: "/", label: "Home", icon: "🏠" },
    { path: "/about", label: "About", icon: "👥" },
    { path: "/contact", label: "Contact", icon: "📧" }
  ];
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "nav",
      {
        className: `fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ease-out ${!isScrollingUp && scrollY > 100 ? "-translate-y-full" : "translate-y-0"}`,
        role: "navigation",
        "aria-label": "Main navigation",
        style: { pointerEvents: "auto" },
        children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: `transition-all duration-300 ${scrollY > 50 ? "bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-xl border-b border-gray-200/50 dark:border-gray-700/50" : "bg-white/85 backdrop-blur-md border-b border-white/20"}`, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex justify-between items-center h-16 sm:h-18", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-6", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "a",
                {
                  href: "/",
                  className: "group flex items-center text-xl sm:text-2xl font-black focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-lg p-1",
                  "aria-label": "Reboot Media - Go to homepage",
                  children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: `transition-all duration-300 group-hover:scale-105 ${scrollY > 50 ? "text-gray-900 dark:text-white" : "text-gray-800 dark:text-white"}`, children: [
                    "REBOOT ",
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-orange-500", children: "MEDIA" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
                      lineNumber: 184,
                      columnNumber: 28
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
                    lineNumber: 179,
                    columnNumber: 19
                  }, void 0)
                },
                void 0,
                false,
                {
                  fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
                  lineNumber: 174,
                  columnNumber: 17
                },
                void 0
              ),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "relative hidden sm:block", ref: dropdownRef, children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "button",
                  {
                    onClick: () => setShowDevDropdown(!showDevDropdown),
                    className: "px-3 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 font-medium flex items-center gap-2 shadow-md hover:shadow-lg",
                    title: "Quick Navigation (Dev Only)",
                    "aria-expanded": showDevDropdown,
                    "aria-haspopup": "true",
                    children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: "Dev Nav" }, void 0, false, {
                        fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
                        lineNumber: 198,
                        columnNumber: 23
                      }, void 0),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                        "svg",
                        {
                          className: `w-4 h-4 transition-transform duration-200 ${showDevDropdown ? "rotate-180" : ""}`,
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24",
                          "aria-hidden": "true",
                          children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" }, void 0, false, {
                            fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
                            lineNumber: 206,
                            columnNumber: 25
                          }, void 0)
                        },
                        void 0,
                        false,
                        {
                          fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
                          lineNumber: 199,
                          columnNumber: 23
                        },
                        void 0
                      )
                    ]
                  },
                  void 0,
                  true,
                  {
                    fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
                    lineNumber: 191,
                    columnNumber: 21
                  },
                  void 0
                ),
                showDevDropdown && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "div",
                  {
                    className: "absolute top-full left-0 mt-3 w-80 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 max-h-[70vh] overflow-y-auto z-[80] backdrop-blur-md",
                    role: "menu",
                    "aria-labelledby": "dev-nav-button",
                    style: { pointerEvents: "auto" },
                    children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-3 dev-nav-links", style: { pointerEvents: "auto" }, children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-xs font-bold text-purple-600 dark:text-purple-400 px-3 py-2 border-b border-gray-100 dark:border-gray-700 mb-3 bg-purple-50/50 dark:bg-purple-900/20 rounded-lg", children: "DEVELOPMENT NAVIGATION" }, void 0, false, {
                        fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
                        lineNumber: 218,
                        columnNumber: 27
                      }, void 0),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-3", children: [
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-xs font-semibold text-gray-500 dark:text-gray-400 px-3 py-1", children: "MAIN" }, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
                          lineNumber: 224,
                          columnNumber: 29
                        }, void 0),
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                          "a",
                          {
                            href: "/",
                            onClick: handleMenuItemClick,
                            className: "block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-all duration-200 hover:translate-x-1",
                            role: "menuitem",
                            children: "🏠 Home"
                          },
                          void 0,
                          false,
                          {
                            fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
                            lineNumber: 225,
                            columnNumber: 29
                          },
                          void 0
                        ),
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                          "a",
                          {
                            href: `${"/reboot"}/about`,
                            onClick: handleMenuItemClick,
                            className: "block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-all duration-200 hover:translate-x-1",
                            role: "menuitem",
                            children: "👥 About"
                          },
                          void 0,
                          false,
                          {
                            fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
                            lineNumber: 233,
                            columnNumber: 29
                          },
                          void 0
                        ),
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                          "a",
                          {
                            href: `${"/reboot"}/contact`,
                            onClick: handleMenuItemClick,
                            className: "block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-all duration-200 hover:translate-x-1",
                            role: "menuitem",
                            children: "📧 Contact"
                          },
                          void 0,
                          false,
                          {
                            fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
                            lineNumber: 241,
                            columnNumber: 29
                          },
                          void 0
                        )
                      ] }, void 0, true, {
                        fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
                        lineNumber: 223,
                        columnNumber: 27
                      }, void 0),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-3", children: [
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-xs font-semibold text-gray-500 dark:text-gray-400 px-3 py-1", children: "MARKETING PSYCHOLOGY" }, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
                          lineNumber: 253,
                          columnNumber: 29
                        }, void 0),
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: `${"/reboot"}/marketing-psychology`, onClick: () => setShowDevDropdown(false), className: "block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors", children: "🧠 Marketing Psychology" }, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
                          lineNumber: 254,
                          columnNumber: 29
                        }, void 0),
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: `${"/reboot"}/marketing-psychology/unaware-stage-customers`, onClick: () => setShowDevDropdown(false), className: "block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors ml-4", children: "→ Unaware Stage" }, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
                          lineNumber: 255,
                          columnNumber: 29
                        }, void 0),
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: `${"/reboot"}/marketing-psychology/problem-aware-stage-customers`, onClick: () => setShowDevDropdown(false), className: "block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors ml-4", children: "→ Problem-Aware Stage" }, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
                          lineNumber: 256,
                          columnNumber: 29
                        }, void 0),
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: `${"/reboot"}/marketing-psychology/solution-aware-stage-customers`, onClick: () => setShowDevDropdown(false), className: "block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors ml-4", children: "→ Solution-Aware Stage" }, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
                          lineNumber: 257,
                          columnNumber: 29
                        }, void 0),
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: `${"/reboot"}/marketing-psychology/product-aware-stage-customers`, onClick: () => setShowDevDropdown(false), className: "block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors ml-4", children: "→ Product-Aware Stage" }, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
                          lineNumber: 258,
                          columnNumber: 29
                        }, void 0),
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: `${"/reboot"}/marketing-psychology/most-aware-stage-customers`, onClick: () => setShowDevDropdown(false), className: "block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors ml-4", children: "→ Most-Aware Stage" }, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
                          lineNumber: 259,
                          columnNumber: 29
                        }, void 0)
                      ] }, void 0, true, {
                        fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
                        lineNumber: 252,
                        columnNumber: 27
                      }, void 0),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-3", children: [
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-xs font-semibold text-gray-500 dark:text-gray-400 px-3 py-1", children: "GROWTH PLATEAU" }, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
                          lineNumber: 264,
                          columnNumber: 29
                        }, void 0),
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: `${"/reboot"}/growth-plateau-solutions`, onClick: () => setShowDevDropdown(false), className: "block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors", children: "📈 Growth Plateau Solutions" }, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
                          lineNumber: 265,
                          columnNumber: 29
                        }, void 0),
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: `${"/reboot"}/growth-plateau-solutions/product-market-fit-erosion`, onClick: () => setShowDevDropdown(false), className: "block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors ml-4", children: "→ Product-Market Fit Erosion" }, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
                          lineNumber: 266,
                          columnNumber: 29
                        }, void 0),
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: `${"/reboot"}/growth-plateau-solutions/customer-acquisition-stall`, onClick: () => setShowDevDropdown(false), className: "block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors ml-4", children: "→ Customer Acquisition Stall" }, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
                          lineNumber: 267,
                          columnNumber: 29
                        }, void 0),
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: `${"/reboot"}/growth-plateau-solutions/competitive-pressure-plateau`, onClick: () => setShowDevDropdown(false), className: "block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors ml-4", children: "→ Competitive Pressure" }, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
                          lineNumber: 268,
                          columnNumber: 29
                        }, void 0),
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: `${"/reboot"}/growth-plateau-solutions/revenue-ceiling-breakthrough`, onClick: () => setShowDevDropdown(false), className: "block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors ml-4", children: "→ Revenue Ceiling" }, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
                          lineNumber: 269,
                          columnNumber: 29
                        }, void 0),
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: `${"/reboot"}/growth-plateau-solutions/operational-scaling-crisis`, onClick: () => setShowDevDropdown(false), className: "block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors ml-4", children: "→ Operational Scaling" }, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
                          lineNumber: 270,
                          columnNumber: 29
                        }, void 0),
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: `${"/reboot"}/growth-plateau-solutions/team-growth-bottlenecks`, onClick: () => setShowDevDropdown(false), className: "block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors ml-4", children: "→ Team Growth Bottlenecks" }, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
                          lineNumber: 271,
                          columnNumber: 29
                        }, void 0),
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: `${"/reboot"}/growth-plateau-solutions/market-expansion-barriers`, onClick: () => setShowDevDropdown(false), className: "block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors ml-4", children: "→ Market Expansion" }, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
                          lineNumber: 272,
                          columnNumber: 29
                        }, void 0)
                      ] }, void 0, true, {
                        fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
                        lineNumber: 263,
                        columnNumber: 27
                      }, void 0),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-3", children: [
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-xs font-semibold text-gray-500 dark:text-gray-400 px-3 py-1", children: "FRACTIONAL CMO" }, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
                          lineNumber: 277,
                          columnNumber: 29
                        }, void 0),
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: `${"/reboot"}/fractional-cmo-guide`, onClick: () => setShowDevDropdown(false), className: "block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors", children: "💼 Fractional CMO Guide" }, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
                          lineNumber: 278,
                          columnNumber: 29
                        }, void 0),
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: `${"/reboot"}/fractional-cmo-guide/vs-marketing-agency`, onClick: () => setShowDevDropdown(false), className: "block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors ml-4", children: "→ vs Agency" }, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
                          lineNumber: 279,
                          columnNumber: 29
                        }, void 0),
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: `${"/reboot"}/fractional-cmo-guide/vs-full-time-cmo`, onClick: () => setShowDevDropdown(false), className: "block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors ml-4", children: "→ vs Full-Time CMO" }, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
                          lineNumber: 280,
                          columnNumber: 29
                        }, void 0),
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: `${"/reboot"}/fractional-cmo-guide/vs-consultant`, onClick: () => setShowDevDropdown(false), className: "block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors ml-4", children: "→ vs Consultant" }, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
                          lineNumber: 281,
                          columnNumber: 29
                        }, void 0),
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: `${"/reboot"}/fractional-cmo-guide/vs-in-house-team`, onClick: () => setShowDevDropdown(false), className: "block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors ml-4", children: "→ vs In-House Team" }, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
                          lineNumber: 282,
                          columnNumber: 29
                        }, void 0),
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: `${"/reboot"}/fractional-cmo-guide/when-to-choose-each`, onClick: () => setShowDevDropdown(false), className: "block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors ml-4", children: "→ When to Choose Each" }, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
                          lineNumber: 283,
                          columnNumber: 29
                        }, void 0),
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: `${"/reboot"}/fractional-cmo-guide/cost-roi-analysis`, onClick: () => setShowDevDropdown(false), className: "block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors ml-4", children: "→ Cost & ROI Analysis" }, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
                          lineNumber: 284,
                          columnNumber: 29
                        }, void 0),
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: `${"/reboot"}/fractional-cmo-guide/transition-strategies`, onClick: () => setShowDevDropdown(false), className: "block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors ml-4", children: "→ Transition Strategies" }, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
                          lineNumber: 285,
                          columnNumber: 29
                        }, void 0)
                      ] }, void 0, true, {
                        fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
                        lineNumber: 276,
                        columnNumber: 27
                      }, void 0),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-xs font-semibold text-gray-500 dark:text-gray-400 px-3 py-1", children: "LEGAL" }, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
                          lineNumber: 290,
                          columnNumber: 29
                        }, void 0),
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: `${"/reboot"}/privacy`, onClick: () => setShowDevDropdown(false), className: "block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors", children: "🔒 Privacy Policy" }, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
                          lineNumber: 291,
                          columnNumber: 29
                        }, void 0),
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: `${"/reboot"}/terms`, onClick: () => setShowDevDropdown(false), className: "block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors", children: "📜 Terms of Service" }, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
                          lineNumber: 292,
                          columnNumber: 29
                        }, void 0)
                      ] }, void 0, true, {
                        fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
                        lineNumber: 289,
                        columnNumber: 27
                      }, void 0)
                    ] }, void 0, true, {
                      fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
                      lineNumber: 217,
                      columnNumber: 25
                    }, void 0)
                  },
                  void 0,
                  false,
                  {
                    fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
                    lineNumber: 211,
                    columnNumber: 23
                  },
                  void 0
                )
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
                lineNumber: 190,
                columnNumber: 19
              }, void 0)
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
              lineNumber: 173,
              columnNumber: 15
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "hidden lg:flex items-center gap-6", style: { pointerEvents: "auto" }, children: navigationItems.map((item) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "a",
                {
                  href: `${"/reboot"}${item.path}`,
                  className: `relative px-3 py-2 text-sm font-medium transition-all duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${location.pathname === item.path ? "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20" : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"}`,
                  style: {
                    pointerEvents: "auto",
                    zIndex: 70,
                    position: "relative"
                  },
                  children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "hidden xl:inline", children: [
                      item.icon,
                      " "
                    ] }, void 0, true, {
                      fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
                      lineNumber: 321,
                      columnNumber: 23
                    }, void 0),
                    item.label,
                    location.pathname === item.path && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-orange-500 rounded-full" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
                      lineNumber: 324,
                      columnNumber: 25
                    }, void 0)
                  ]
                },
                item.path,
                true,
                {
                  fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
                  lineNumber: 307,
                  columnNumber: 21
                },
                void 0
              )) }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
                lineNumber: 305,
                columnNumber: 17
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "button",
                {
                  onClick: onShowForm,
                  className: "hidden md:flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-2.5 rounded-full font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2",
                  "aria-label": "Open growth analysis form",
                  style: {
                    pointerEvents: "auto",
                    zIndex: 65,
                    position: "relative"
                  },
                  children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-sm", children: "🚀" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
                      lineNumber: 341,
                      columnNumber: 19
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: "Unlock Growth Now" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
                      lineNumber: 342,
                      columnNumber: 19
                    }, void 0)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
                  lineNumber: 331,
                  columnNumber: 17
                },
                void 0
              ),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "button",
                {
                  onClick: () => setShowMobileMenu(!showMobileMenu),
                  className: "lg:hidden p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-200",
                  "aria-expanded": showMobileMenu,
                  "aria-label": "Toggle mobile menu",
                  children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "relative w-6 h-6", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: `absolute block w-6 h-0.5 bg-current transform transition-all duration-300 ${showMobileMenu ? "rotate-45 translate-y-0" : "-translate-y-2"}` }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
                      lineNumber: 353,
                      columnNumber: 21
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: `absolute block w-6 h-0.5 bg-current transform transition-all duration-300 ${showMobileMenu ? "opacity-0" : "opacity-100"}` }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
                      lineNumber: 356,
                      columnNumber: 21
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: `absolute block w-6 h-0.5 bg-current transform transition-all duration-300 ${showMobileMenu ? "-rotate-45 translate-y-0" : "translate-y-2"}` }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
                      lineNumber: 359,
                      columnNumber: 21
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
                    lineNumber: 352,
                    columnNumber: 19
                  }, void 0)
                },
                void 0,
                false,
                {
                  fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
                  lineNumber: 346,
                  columnNumber: 17
                },
                void 0
              )
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
              lineNumber: 302,
              columnNumber: 15
            }, void 0)
          ] }, void 0, true, {
            fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
            lineNumber: 170,
            columnNumber: 13
          }, void 0) }, void 0, false, {
            fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
            lineNumber: 169,
            columnNumber: 11
          }, void 0),
          showProgressBar && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-full h-1 bg-gray-200 dark:bg-gray-800", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "div",
            {
              className: `h-full bg-gradient-to-r ${getProgressBarGradient()} transition-all duration-150 ease-out`,
              style: { width: `${readingProgress}%` }
            },
            void 0,
            false,
            {
              fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
              lineNumber: 371,
              columnNumber: 15
            },
            void 0
          ) }, void 0, false, {
            fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
            lineNumber: 370,
            columnNumber: 13
          }, void 0)
        ] }, void 0, true, {
          fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
          lineNumber: 164,
          columnNumber: 9
        }, void 0)
      },
      void 0,
      false,
      {
        fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
        lineNumber: 156,
        columnNumber: 7
      },
      void 0
    ),
    showMobileMenu && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "div",
      {
        className: "fixed inset-0 z-40 lg:hidden",
        "aria-hidden": "true",
        children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "div",
          {
            className: "fixed inset-0 bg-black/50 backdrop-blur-sm",
            onClick: () => setShowMobileMenu(false)
          },
          void 0,
          false,
          {
            fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
            lineNumber: 386,
            columnNumber: 11
          },
          void 0
        )
      },
      void 0,
      false,
      {
        fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
        lineNumber: 382,
        columnNumber: 9
      },
      void 0
    ),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "div",
      {
        ref: mobileMenuRef,
        className: `fixed top-0 right-0 z-[70] h-full w-80 max-w-[90vw] bg-white dark:bg-slate-900 shadow-2xl transform transition-transform duration-300 ease-out lg:hidden ${showMobileMenu ? "translate-x-0" : "translate-x-full"}`,
        role: "dialog",
        "aria-modal": "true",
        "aria-label": "Mobile navigation menu",
        style: { pointerEvents: "auto" },
        children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col h-full", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "text-lg font-bold text-gray-900 dark:text-white", children: "Navigation" }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
              lineNumber: 407,
              columnNumber: 13
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "button",
              {
                onClick: () => setShowMobileMenu(false),
                className: "p-2 rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500",
                "aria-label": "Close mobile menu",
                children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
                  lineNumber: 414,
                  columnNumber: 17
                }, void 0) }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
                  lineNumber: 413,
                  columnNumber: 15
                }, void 0)
              },
              void 0,
              false,
              {
                fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
                lineNumber: 408,
                columnNumber: 13
              },
              void 0
            )
          ] }, void 0, true, {
            fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
            lineNumber: 406,
            columnNumber: 11
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex-1 overflow-y-auto py-6", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("nav", { className: "px-6 space-y-2", children: navigationItems.map((item) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "a",
              {
                href: `${"/reboot"}${item.path}`,
                onClick: handleMenuItemClick,
                className: `flex items-center gap-3 px-4 py-3 text-base font-medium rounded-xl transition-all duration-200 ${location.pathname === item.path ? "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-500" : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"}`,
                children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-xl", children: item.icon }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
                    lineNumber: 433,
                    columnNumber: 19
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: item.label }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
                    lineNumber: 434,
                    columnNumber: 19
                  }, void 0),
                  location.pathname === item.path && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "ml-auto w-2 h-2 bg-orange-500 rounded-full" }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
                    lineNumber: 436,
                    columnNumber: 21
                  }, void 0)
                ]
              },
              item.path,
              true,
              {
                fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
                lineNumber: 423,
                columnNumber: 17
              },
              void 0
            )) }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
              lineNumber: 421,
              columnNumber: 13
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-8 px-6", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "border-t border-gray-200 dark:border-gray-700 pt-6", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-sm font-semibold text-purple-600 dark:text-purple-400 mb-4 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "w-2 h-2 bg-purple-500 rounded-full" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
                  lineNumber: 447,
                  columnNumber: 21
                }, void 0),
                "DEVELOPMENT SHORTCUTS"
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
                lineNumber: 446,
                columnNumber: 19
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-1 dev-nav-links", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: `${"/reboot"}/marketing-psychology`, onClick: handleMenuItemClick, className: "block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors", children: "🧠 Marketing Psychology" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
                  lineNumber: 451,
                  columnNumber: 21
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: `${"/reboot"}/growth-plateau-solutions`, onClick: handleMenuItemClick, className: "block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors", children: "📈 Growth Plateau" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
                  lineNumber: 452,
                  columnNumber: 21
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: `${"/reboot"}/fractional-cmo-guide`, onClick: handleMenuItemClick, className: "block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors", children: "💼 Fractional CMO" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
                  lineNumber: 453,
                  columnNumber: 21
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
                lineNumber: 450,
                columnNumber: 19
              }, void 0)
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
              lineNumber: 445,
              columnNumber: 17
            }, void 0) }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
              lineNumber: 444,
              columnNumber: 15
            }, void 0)
          ] }, void 0, true, {
            fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
            lineNumber: 420,
            columnNumber: 11
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "button",
              {
                onClick: () => {
                  onShowForm?.();
                  setShowMobileMenu(false);
                },
                className: "w-full flex items-center justify-center gap-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-4 rounded-xl font-bold text-base transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2",
                children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-lg", children: "🚀" }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
                    lineNumber: 469,
                    columnNumber: 15
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: "Unlock Growth Now" }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
                    lineNumber: 470,
                    columnNumber: 15
                  }, void 0)
                ]
              },
              void 0,
              true,
              {
                fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
                lineNumber: 462,
                columnNumber: 13
              },
              void 0
            ),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xs text-center text-gray-500 dark:text-gray-400 mt-3", children: "Free marketing analysis • No commitment" }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
              lineNumber: 472,
              columnNumber: 13
            }, void 0)
          ] }, void 0, true, {
            fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
            lineNumber: 461,
            columnNumber: 11
          }, void 0)
        ] }, void 0, true, {
          fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
          lineNumber: 404,
          columnNumber: 9
        }, void 0)
      },
      void 0,
      false,
      {
        fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
        lineNumber: 394,
        columnNumber: 7
      },
      void 0
    ),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: `fixed bottom-0 left-0 right-0 z-40 md:hidden transition-all duration-300 ${showMobileMenu ? "translate-y-full opacity-0" : "translate-y-0 opacity-100"}`, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-gray-200/50 dark:border-gray-700/50 shadow-lg", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "px-4 py-3", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "button",
      {
        onClick: onShowForm,
        className: "w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 shadow-lg hover:shadow-xl transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2",
        children: "🚀 Unlock Growth Now"
      },
      void 0,
      false,
      {
        fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
        lineNumber: 485,
        columnNumber: 13
      },
      void 0
    ) }, void 0, false, {
      fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
      lineNumber: 484,
      columnNumber: 11
    }, void 0) }, void 0, false, {
      fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
      lineNumber: 483,
      columnNumber: 9
    }, void 0) }, void 0, false, {
      fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
      lineNumber: 480,
      columnNumber: 7
    }, void 0)
  ] }, void 0, true, {
    fileName: "/home/ian/projects/reboot/src/components/GlobalHeader.tsx",
    lineNumber: 154,
    columnNumber: 5
  }, void 0);
};
const GlobalFooter = (_props) => {
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = reactExports.useState({});
  const handleHashNavigation = (e, sectionId) => {
    e.preventDefault();
    if (window.location.pathname !== "/" && window.location.pathname !== "/reboot/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };
  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("footer", { className: "relative bg-gradient-to-br from-slate-900 via-slate-950 to-black text-white overflow-hidden", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute inset-0 opacity-5", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute inset-0", style: {
      backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
      backgroundSize: "40px 40px"
    } }, void 0, false, {
      fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
      lineNumber: 46,
      columnNumber: 9
    }, void 0) }, void 0, false, {
      fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
      lineNumber: 45,
      columnNumber: 7
    }, void 0),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "relative z-10", style: { pointerEvents: "auto" }, children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "hidden lg:block", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "max-w-7xl mx-auto px-8", style: { paddingTop: "clamp(3rem, 5vw, 5rem)", paddingBottom: "clamp(2rem, 3vw, 3rem)" }, children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-12 gap-8 mb-12", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "col-span-8", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "a",
              {
                href: "/",
                className: "inline-block mb-6 hover:scale-105 transition-transform duration-300",
                children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-5xl font-black", children: [
                  "REBOOT ",
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-orange-500", children: "MEDIA" }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                    lineNumber: 66,
                    columnNumber: 28
                  }, void 0)
                ] }, void 0, true, {
                  fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                  lineNumber: 65,
                  columnNumber: 19
                }, void 0)
              },
              void 0,
              false,
              {
                fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                lineNumber: 61,
                columnNumber: 17
              },
              void 0
            ),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "max-w-2xl", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-2xl font-light text-gray-300 leading-relaxed mb-4", children: "Fortune 500 marketing expertise without the corporate price tag." }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                lineNumber: 71,
                columnNumber: 19
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-base text-gray-400 leading-relaxed", children: "We transform ambitious companies with proven C-level strategies that actually work. No fluff, no theory – just battle-tested approaches from managing $2B+ in revenue." }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                lineNumber: 74,
                columnNumber: 19
              }, void 0)
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
              lineNumber: 70,
              columnNumber: 17
            }, void 0)
          ] }, void 0, true, {
            fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
            lineNumber: 60,
            columnNumber: 15
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "col-span-4", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 h-full flex flex-col justify-between", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "text-sm font-medium text-gray-400 mb-4", children: "Global Headquarters" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                lineNumber: 85,
                columnNumber: 21
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xs text-gray-300 leading-relaxed", children: [
                "17595 Harvard Ave C-738",
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("br", {}, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                  lineNumber: 87,
                  columnNumber: 46
                }, void 0),
                "Irvine, California 92614",
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("br", {}, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                  lineNumber: 88,
                  columnNumber: 47
                }, void 0),
                "United States of America"
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                lineNumber: 86,
                columnNumber: 21
              }, void 0)
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
              lineNumber: 84,
              columnNumber: 19
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "pt-4 border-t border-white/10", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xs text-gray-400 uppercase tracking-wider mb-2", children: "Operating Globally" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                lineNumber: 93,
                columnNumber: 21
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-2 h-2 bg-green-400 rounded-full animate-pulse" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                  lineNumber: 95,
                  columnNumber: 23
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-xs text-gray-300", children: "USA • Bangkok • Singapore" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                  lineNumber: 96,
                  columnNumber: 23
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                lineNumber: 94,
                columnNumber: 21
              }, void 0)
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
              lineNumber: 92,
              columnNumber: 19
            }, void 0)
          ] }, void 0, true, {
            fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
            lineNumber: 83,
            columnNumber: 17
          }, void 0) }, void 0, false, {
            fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
            lineNumber: 82,
            columnNumber: 15
          }, void 0)
        ] }, void 0, true, {
          fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
          lineNumber: 58,
          columnNumber: 13
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-4 gap-8 pt-8 border-t border-white/10", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "col-span-1", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "text-sm font-medium text-gray-400 mb-4", children: "Company" }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
              lineNumber: 107,
              columnNumber: 17
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("ul", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "a",
                {
                  href: `${"/reboot"}/about`,
                  className: "text-sm text-gray-300 hover:text-white transition-colors",
                  style: { pointerEvents: "auto", zIndex: 50, position: "relative" },
                  children: "About"
                },
                void 0,
                false,
                {
                  fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                  lineNumber: 110,
                  columnNumber: 21
                },
                void 0
              ) }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                lineNumber: 109,
                columnNumber: 19
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "a",
                {
                  href: "#services",
                  onClick: (e) => handleHashNavigation(e, "services"),
                  className: "text-sm text-gray-300 hover:text-white transition-colors cursor-pointer",
                  style: { pointerEvents: "auto", zIndex: 50, position: "relative" },
                  children: "Services"
                },
                void 0,
                false,
                {
                  fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                  lineNumber: 117,
                  columnNumber: 21
                },
                void 0
              ) }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                lineNumber: 116,
                columnNumber: 19
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "a",
                {
                  href: `${"/reboot"}/contact`,
                  className: "text-sm text-gray-300 hover:text-white transition-colors",
                  style: { pointerEvents: "auto", zIndex: 50, position: "relative" },
                  children: "Contact"
                },
                void 0,
                false,
                {
                  fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                  lineNumber: 124,
                  columnNumber: 21
                },
                void 0
              ) }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                lineNumber: 123,
                columnNumber: 19
              }, void 0)
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
              lineNumber: 108,
              columnNumber: 17
            }, void 0)
          ] }, void 0, true, {
            fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
            lineNumber: 106,
            columnNumber: 15
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "col-span-1", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "text-sm font-medium text-gray-400 mb-4", children: "Legal" }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
              lineNumber: 135,
              columnNumber: 17
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("ul", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "a",
                {
                  href: `${"/reboot"}/privacy`,
                  className: "text-sm text-gray-300 hover:text-white transition-colors",
                  style: { pointerEvents: "auto", zIndex: 50, position: "relative" },
                  children: "Privacy Policy"
                },
                void 0,
                false,
                {
                  fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                  lineNumber: 138,
                  columnNumber: 21
                },
                void 0
              ) }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                lineNumber: 137,
                columnNumber: 19
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "a",
                {
                  href: `${"/reboot"}/terms`,
                  className: "text-sm text-gray-300 hover:text-white transition-colors",
                  style: { pointerEvents: "auto", zIndex: 50, position: "relative" },
                  children: "Terms of Service"
                },
                void 0,
                false,
                {
                  fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                  lineNumber: 145,
                  columnNumber: 21
                },
                void 0
              ) }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                lineNumber: 144,
                columnNumber: 19
              }, void 0)
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
              lineNumber: 136,
              columnNumber: 17
            }, void 0)
          ] }, void 0, true, {
            fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
            lineNumber: 134,
            columnNumber: 15
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "col-span-2", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "text-sm font-medium text-gray-400 mb-4", children: "Resources & Insights" }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
              lineNumber: 156,
              columnNumber: 17
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-2 gap-x-8 gap-y-2", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("ul", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "a",
                  {
                    href: `${"/reboot"}/marketing-psychology`,
                    className: "text-sm text-gray-300 hover:text-white transition-colors",
                    style: { pointerEvents: "auto", zIndex: 50, position: "relative" },
                    children: "Marketing Psychology Guide"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                    lineNumber: 161,
                    columnNumber: 25
                  },
                  void 0
                ) }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                  lineNumber: 160,
                  columnNumber: 23
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "a",
                  {
                    href: `${"/reboot"}/growth-plateau-solutions`,
                    className: "text-sm text-gray-300 hover:text-white transition-colors",
                    style: { pointerEvents: "auto", zIndex: 50, position: "relative" },
                    children: "Breaking Growth Plateaus"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                    lineNumber: 168,
                    columnNumber: 25
                  },
                  void 0
                ) }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                  lineNumber: 167,
                  columnNumber: 23
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "a",
                  {
                    href: `${"/reboot"}/fractional-cmo-guide`,
                    className: "text-sm text-gray-300 hover:text-white transition-colors",
                    style: { pointerEvents: "auto", zIndex: 50, position: "relative" },
                    children: "Fractional CMO vs Agency"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                    lineNumber: 175,
                    columnNumber: 25
                  },
                  void 0
                ) }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                  lineNumber: 174,
                  columnNumber: 23
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                lineNumber: 159,
                columnNumber: 21
              }, void 0) }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                lineNumber: 158,
                columnNumber: 19
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("ul", { className: "space-y-2" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                lineNumber: 185,
                columnNumber: 21
              }, void 0) }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                lineNumber: 183,
                columnNumber: 19
              }, void 0)
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
              lineNumber: 157,
              columnNumber: 17
            }, void 0)
          ] }, void 0, true, {
            fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
            lineNumber: 155,
            columnNumber: 15
          }, void 0)
        ] }, void 0, true, {
          fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
          lineNumber: 104,
          columnNumber: 13
        }, void 0)
      ] }, void 0, true, {
        fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
        lineNumber: 55,
        columnNumber: 11
      }, void 0) }, void 0, false, {
        fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
        lineNumber: 54,
        columnNumber: 9
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "lg:hidden", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "px-6 py-8", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "a",
            {
              href: "/",
              className: "inline-block cursor-pointer hover:scale-105 transition-transform duration-300",
              style: { pointerEvents: "auto", zIndex: 50, position: "relative" },
              children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-3xl font-black mb-3", children: [
                "REBOOT ",
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-orange-500", children: "MEDIA" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                  lineNumber: 206,
                  columnNumber: 26
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                lineNumber: 205,
                columnNumber: 17
              }, void 0)
            },
            void 0,
            false,
            {
              fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
              lineNumber: 200,
              columnNumber: 15
            },
            void 0
          ),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-gray-400 text-sm leading-relaxed", children: "Fractional CMO services with proven C-level executive experience driving transformational growth for ambitious companies." }, void 0, false, {
            fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
            lineNumber: 209,
            columnNumber: 15
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-gray-500 text-xs mt-4", children: "USA • Bangkok • Singapore • Global" }, void 0, false, {
            fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
            lineNumber: 212,
            columnNumber: 15
          }, void 0)
        ] }, void 0, true, {
          fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
          lineNumber: 199,
          columnNumber: 13
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "border border-white/10 rounded-lg overflow-hidden", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "button",
              {
                onClick: () => toggleSection("services"),
                className: "w-full px-4 py-3 bg-white/5 backdrop-blur-sm flex items-center justify-between hover:bg-white/10 transition-colors",
                children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "font-bold text-white text-sm uppercase tracking-wider", children: "Fractional CMO Services" }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                    lineNumber: 226,
                    columnNumber: 19
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                    "svg",
                    {
                      className: `w-5 h-5 text-gray-400 transition-transform duration-300 ${expandedSections["services"] ? "rotate-180" : ""}`,
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24",
                      children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M19 9l-7 7-7-7" }, void 0, false, {
                        fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                        lineNumber: 233,
                        columnNumber: 21
                      }, void 0)
                    },
                    void 0,
                    false,
                    {
                      fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                      lineNumber: 227,
                      columnNumber: 19
                    },
                    void 0
                  )
                ]
              },
              void 0,
              true,
              {
                fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                lineNumber: 222,
                columnNumber: 17
              },
              void 0
            ),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: `transition-all duration-300 ${expandedSections["services"] ? "max-h-96" : "max-h-0"} overflow-hidden`, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("ul", { className: "px-4 py-3 space-y-2 bg-white/5", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: "#services", onClick: (e) => handleHashNavigation(e, "services"), className: "text-gray-400 hover:text-orange-400 transition-colors text-sm", style: { pointerEvents: "auto", zIndex: 50, position: "relative" }, children: "Quick-Win Strategy" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                lineNumber: 239,
                columnNumber: 23
              }, void 0) }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                lineNumber: 238,
                columnNumber: 21
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: "#services", onClick: (e) => handleHashNavigation(e, "services"), className: "text-gray-400 hover:text-orange-400 transition-colors text-sm", style: { pointerEvents: "auto", zIndex: 50, position: "relative" }, children: "Growth Strategy" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                lineNumber: 244,
                columnNumber: 23
              }, void 0) }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                lineNumber: 243,
                columnNumber: 21
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: "#services", onClick: (e) => handleHashNavigation(e, "services"), className: "text-gray-400 hover:text-orange-400 transition-colors text-sm", style: { pointerEvents: "auto", zIndex: 50, position: "relative" }, children: "Executive Leadership" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                lineNumber: 249,
                columnNumber: 23
              }, void 0) }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                lineNumber: 248,
                columnNumber: 21
              }, void 0)
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
              lineNumber: 237,
              columnNumber: 19
            }, void 0) }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
              lineNumber: 236,
              columnNumber: 17
            }, void 0)
          ] }, void 0, true, {
            fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
            lineNumber: 221,
            columnNumber: 15
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "border border-white/10 rounded-lg overflow-hidden", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "button",
              {
                onClick: () => toggleSection("track"),
                className: "w-full px-4 py-3 bg-white/5 backdrop-blur-sm flex items-center justify-between hover:bg-white/10 transition-colors",
                children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "font-bold text-white text-sm uppercase tracking-wider", children: "Proven Track Record" }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                    lineNumber: 263,
                    columnNumber: 19
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                    "svg",
                    {
                      className: `w-5 h-5 text-gray-400 transition-transform duration-300 ${expandedSections["track"] ? "rotate-180" : ""}`,
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24",
                      children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M19 9l-7 7-7-7" }, void 0, false, {
                        fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                        lineNumber: 270,
                        columnNumber: 21
                      }, void 0)
                    },
                    void 0,
                    false,
                    {
                      fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                      lineNumber: 264,
                      columnNumber: 19
                    },
                    void 0
                  )
                ]
              },
              void 0,
              true,
              {
                fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                lineNumber: 259,
                columnNumber: 17
              },
              void 0
            ),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: `transition-all duration-300 ${expandedSections["track"] ? "max-h-96" : "max-h-0"} overflow-hidden`, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("ul", { className: "px-4 py-3 space-y-2 bg-white/5", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { className: "text-gray-400 text-sm flex items-start", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-orange-500 mr-2", children: "20+" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                  lineNumber: 276,
                  columnNumber: 23
                }, void 0),
                "Fortune 500 Companies"
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                lineNumber: 275,
                columnNumber: 21
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { className: "text-gray-400 text-sm flex items-start", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-orange-500 mr-2", children: "$2B+" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                  lineNumber: 280,
                  columnNumber: 23
                }, void 0),
                "Revenue Under Management"
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                lineNumber: 279,
                columnNumber: 21
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { className: "text-gray-400 text-sm flex items-start", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-orange-500 mr-2", children: "3X" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                  lineNumber: 284,
                  columnNumber: 23
                }, void 0),
                "Average Revenue Growth"
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                lineNumber: 283,
                columnNumber: 21
              }, void 0)
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
              lineNumber: 274,
              columnNumber: 19
            }, void 0) }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
              lineNumber: 273,
              columnNumber: 17
            }, void 0)
          ] }, void 0, true, {
            fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
            lineNumber: 258,
            columnNumber: 15
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "border border-white/10 rounded-lg overflow-hidden", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "button",
              {
                onClick: () => toggleSection("resources"),
                className: "w-full px-4 py-3 bg-white/5 backdrop-blur-sm flex items-center justify-between hover:bg-white/10 transition-colors",
                children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "font-bold text-white text-sm uppercase tracking-wider", children: "Resources & Insights" }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                    lineNumber: 297,
                    columnNumber: 19
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                    "svg",
                    {
                      className: `w-5 h-5 text-gray-400 transition-transform duration-300 ${expandedSections["resources"] ? "rotate-180" : ""}`,
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24",
                      children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M19 9l-7 7-7-7" }, void 0, false, {
                        fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                        lineNumber: 304,
                        columnNumber: 21
                      }, void 0)
                    },
                    void 0,
                    false,
                    {
                      fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                      lineNumber: 298,
                      columnNumber: 19
                    },
                    void 0
                  )
                ]
              },
              void 0,
              true,
              {
                fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                lineNumber: 293,
                columnNumber: 17
              },
              void 0
            ),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: `transition-all duration-300 ${expandedSections["resources"] ? "max-h-96" : "max-h-0"} overflow-hidden`, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("ul", { className: "px-4 py-3 space-y-2 bg-white/5", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: `${"/reboot"}/marketing-psychology`, className: "text-gray-400 hover:text-orange-400 transition-colors text-sm", style: { pointerEvents: "auto", zIndex: 50, position: "relative" }, children: "Marketing Psychology Guide" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                lineNumber: 310,
                columnNumber: 23
              }, void 0) }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                lineNumber: 309,
                columnNumber: 21
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: `${"/reboot"}/growth-plateau-solutions`, className: "text-gray-400 hover:text-orange-400 transition-colors text-sm", style: { pointerEvents: "auto", zIndex: 50, position: "relative" }, children: "Break Growth Plateaus" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                lineNumber: 315,
                columnNumber: 23
              }, void 0) }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                lineNumber: 314,
                columnNumber: 21
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: `${"/reboot"}/fractional-cmo-guide`, className: "text-gray-400 hover:text-orange-400 transition-colors text-sm", style: { pointerEvents: "auto", zIndex: 50, position: "relative" }, children: "Fractional CMO vs Agency" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                lineNumber: 320,
                columnNumber: 23
              }, void 0) }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                lineNumber: 319,
                columnNumber: 21
              }, void 0)
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
              lineNumber: 308,
              columnNumber: 19
            }, void 0) }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
              lineNumber: 307,
              columnNumber: 17
            }, void 0)
          ] }, void 0, true, {
            fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
            lineNumber: 292,
            columnNumber: 15
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "border border-white/10 rounded-lg overflow-hidden", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "button",
              {
                onClick: () => toggleSection("company"),
                className: "w-full px-4 py-3 bg-white/5 backdrop-blur-sm flex items-center justify-between hover:bg-white/10 transition-colors",
                children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "font-bold text-white text-sm uppercase tracking-wider", children: "Company" }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                    lineNumber: 334,
                    columnNumber: 19
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                    "svg",
                    {
                      className: `w-5 h-5 text-gray-400 transition-transform duration-300 ${expandedSections["company"] ? "rotate-180" : ""}`,
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24",
                      children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M19 9l-7 7-7-7" }, void 0, false, {
                        fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                        lineNumber: 341,
                        columnNumber: 21
                      }, void 0)
                    },
                    void 0,
                    false,
                    {
                      fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                      lineNumber: 335,
                      columnNumber: 19
                    },
                    void 0
                  )
                ]
              },
              void 0,
              true,
              {
                fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                lineNumber: 330,
                columnNumber: 17
              },
              void 0
            ),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: `transition-all duration-300 ${expandedSections["company"] ? "max-h-96" : "max-h-0"} overflow-hidden`, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("ul", { className: "px-4 py-3 space-y-2 bg-white/5", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: `${"/reboot"}/about`, className: "text-gray-400 hover:text-orange-400 transition-colors text-sm", style: { pointerEvents: "auto", zIndex: 50, position: "relative" }, children: "About" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                lineNumber: 347,
                columnNumber: 23
              }, void 0) }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                lineNumber: 346,
                columnNumber: 21
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: "#services", onClick: (e) => handleHashNavigation(e, "services"), className: "text-gray-400 hover:text-orange-400 transition-colors text-sm", style: { pointerEvents: "auto", zIndex: 50, position: "relative" }, children: "Services" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                lineNumber: 352,
                columnNumber: 23
              }, void 0) }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                lineNumber: 351,
                columnNumber: 21
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: `${"/reboot"}/contact`, className: "text-gray-400 hover:text-orange-400 transition-colors text-sm", style: { pointerEvents: "auto", zIndex: 50, position: "relative" }, children: "Contact" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                lineNumber: 357,
                columnNumber: 23
              }, void 0) }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                lineNumber: 356,
                columnNumber: 21
              }, void 0)
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
              lineNumber: 345,
              columnNumber: 19
            }, void 0) }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
              lineNumber: 344,
              columnNumber: 17
            }, void 0)
          ] }, void 0, true, {
            fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
            lineNumber: 329,
            columnNumber: 15
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "border border-white/10 rounded-lg overflow-hidden", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "button",
              {
                onClick: () => toggleSection("legal"),
                className: "w-full px-4 py-3 bg-white/5 backdrop-blur-sm flex items-center justify-between hover:bg-white/10 transition-colors",
                children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "font-bold text-white text-sm uppercase tracking-wider", children: "Legal" }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                    lineNumber: 371,
                    columnNumber: 19
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                    "svg",
                    {
                      className: `w-5 h-5 text-gray-400 transition-transform duration-300 ${expandedSections["legal"] ? "rotate-180" : ""}`,
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24",
                      children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M19 9l-7 7-7-7" }, void 0, false, {
                        fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                        lineNumber: 378,
                        columnNumber: 21
                      }, void 0)
                    },
                    void 0,
                    false,
                    {
                      fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                      lineNumber: 372,
                      columnNumber: 19
                    },
                    void 0
                  )
                ]
              },
              void 0,
              true,
              {
                fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                lineNumber: 367,
                columnNumber: 17
              },
              void 0
            ),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: `transition-all duration-300 ${expandedSections["legal"] ? "max-h-96" : "max-h-0"} overflow-hidden`, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("ul", { className: "px-4 py-3 space-y-2 bg-white/5", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: `${"/reboot"}/privacy`, className: "text-gray-400 hover:text-orange-400 transition-colors text-sm", style: { pointerEvents: "auto", zIndex: 50, position: "relative" }, children: "Privacy Policy" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                lineNumber: 384,
                columnNumber: 23
              }, void 0) }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                lineNumber: 383,
                columnNumber: 21
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: `${"/reboot"}/terms`, className: "text-gray-400 hover:text-orange-400 transition-colors text-sm", style: { pointerEvents: "auto", zIndex: 50, position: "relative" }, children: "Terms of Service" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                lineNumber: 389,
                columnNumber: 23
              }, void 0) }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
                lineNumber: 388,
                columnNumber: 21
              }, void 0)
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
              lineNumber: 382,
              columnNumber: 19
            }, void 0) }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
              lineNumber: 381,
              columnNumber: 17
            }, void 0)
          ] }, void 0, true, {
            fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
            lineNumber: 366,
            columnNumber: 15
          }, void 0)
        ] }, void 0, true, {
          fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
          lineNumber: 218,
          columnNumber: 13
        }, void 0)
      ] }, void 0, true, {
        fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
        lineNumber: 198,
        columnNumber: 11
      }, void 0) }, void 0, false, {
        fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
        lineNumber: 197,
        columnNumber: 9
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "border-t border-white/10 backdrop-blur-sm mt-8", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "max-w-7xl mx-auto px-6 lg:px-8 py-4", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-gray-500 text-xs", children: "© 2025 Reboot Media, Inc. All rights reserved." }, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
          lineNumber: 405,
          columnNumber: 15
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center space-x-4 text-gray-500 text-xs", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: "A Global Marketing Leadership Company" }, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
          lineNumber: 409,
          columnNumber: 17
        }, void 0) }, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
          lineNumber: 408,
          columnNumber: 15
        }, void 0)
      ] }, void 0, true, {
        fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
        lineNumber: 404,
        columnNumber: 13
      }, void 0) }, void 0, false, {
        fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
        lineNumber: 403,
        columnNumber: 11
      }, void 0) }, void 0, false, {
        fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
        lineNumber: 402,
        columnNumber: 9
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
      lineNumber: 52,
      columnNumber: 7
    }, void 0),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(BackToTopButton, {}, void 0, false, {
      fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
      lineNumber: 417,
      columnNumber: 7
    }, void 0)
  ] }, void 0, true, {
    fileName: "/home/ian/projects/reboot/src/components/GlobalFooter.tsx",
    lineNumber: 43,
    columnNumber: 5
  }, void 0);
};
function BackgroundGradient({ className = "" }) {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "div",
    {
      className: `fixed inset-0 w-full h-full ${className}`,
      style: {
        background: `
          radial-gradient(circle at 15% 15%, rgba(216, 201, 155, 0.4) 0%, rgba(216, 201, 155, 0.2) 20%, rgba(216, 201, 155, 0.1) 35%, transparent 50%),
          radial-gradient(circle at 85% 85%, rgba(216, 201, 155, 0.35) 0%, rgba(216, 201, 155, 0.18) 18%, rgba(216, 201, 155, 0.08) 32%, transparent 45%),
          radial-gradient(circle at 25% 75%, rgba(216, 201, 155, 0.3) 0%, rgba(216, 201, 155, 0.15) 22%, rgba(216, 201, 155, 0.06) 36%, transparent 48%),
          radial-gradient(circle at 75% 25%, rgba(216, 201, 155, 0.32) 0%, rgba(216, 201, 155, 0.16) 19%, rgba(216, 201, 155, 0.07) 33%, transparent 42%),
          
          radial-gradient(circle at 60% 15%, rgba(39, 62, 71, 0.35) 0%, rgba(39, 62, 71, 0.18) 15%, rgba(39, 62, 71, 0.09) 25%, transparent 35%),
          radial-gradient(circle at 25% 40%, rgba(39, 62, 71, 0.4) 0%, rgba(39, 62, 71, 0.2) 18%, rgba(39, 62, 71, 0.1) 28%, transparent 40%),
          radial-gradient(circle at 85% 60%, rgba(39, 62, 71, 0.32) 0%, rgba(39, 62, 71, 0.16) 14%, rgba(39, 62, 71, 0.08) 24%, transparent 32%),
          radial-gradient(circle at 15% 85%, rgba(39, 62, 71, 0.38) 0%, rgba(39, 62, 71, 0.19) 16%, rgba(39, 62, 71, 0.09) 26%, transparent 38%),
          
          radial-gradient(circle at 35% 25%, rgba(216, 151, 60, 0.3) 0%, rgba(216, 151, 60, 0.15) 10%, rgba(216, 151, 60, 0.07) 18%, transparent 25%),
          radial-gradient(circle at 70% 35%, rgba(216, 151, 60, 0.35) 0%, rgba(216, 151, 60, 0.18) 12%, rgba(216, 151, 60, 0.08) 20%, transparent 28%),
          radial-gradient(circle at 20% 60%, rgba(216, 151, 60, 0.28) 0%, rgba(216, 151, 60, 0.14) 8%, rgba(216, 151, 60, 0.06) 16%, transparent 22%),
          radial-gradient(circle at 80% 70%, rgba(216, 151, 60, 0.33) 0%, rgba(216, 151, 60, 0.17) 11%, rgba(216, 151, 60, 0.07) 19%, transparent 30%)
        `,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        zIndex: -1
      }
    },
    void 0,
    false,
    {
      fileName: "/home/ian/projects/reboot/src/components/BackgroundGradient.tsx",
      lineNumber: 10,
      columnNumber: 5
    },
    this
  );
}
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
const generateSessionId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
const SESSION_ID = generateSessionId();
const MAX_RETRY_COUNT = 3;
const logError = (errorDetails) => {
  console.group("🚨 Error Boundary Caught Error");
  console.error("Error:", errorDetails.error);
  console.error("Component Stack:", errorDetails.errorInfo.componentStack);
  console.error("Error Boundary:", errorDetails.errorBoundary);
  console.error("Timestamp:", errorDetails.timestamp.toISOString());
  console.error("Session ID:", errorDetails.sessionId);
  console.groupEnd();
};
class ErrorBoundary extends reactExports.Component {
  constructor(props) {
    super(props);
    __publicField(this, "retryTimeouts", /* @__PURE__ */ new Set());
    __publicField(this, "handleRetry", () => {
      const { retryCount } = this.state;
      if (retryCount < MAX_RETRY_COUNT) {
        console.log(`🔄 Retrying... (Attempt ${retryCount + 1}/${MAX_RETRY_COUNT})`);
        this.setState((prevState) => ({
          hasError: false,
          error: null,
          errorInfo: null,
          retryCount: prevState.retryCount + 1
        }));
      }
    });
    __publicField(this, "handleRefresh", () => {
      window.location.reload();
    });
    __publicField(this, "handleGoHome", () => {
      window.location.href = "/";
    });
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0
    };
  }
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error
    };
  }
  componentDidCatch(error, errorInfo) {
    const errorDetails = {
      error,
      errorInfo,
      timestamp: /* @__PURE__ */ new Date(),
      componentStack: errorInfo.componentStack ?? "No component stack available",
      sessionId: SESSION_ID,
      errorBoundary: this.props.name ?? "UnnamedErrorBoundary"
    };
    logError(errorDetails);
    this.setState({
      errorInfo
    });
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }
  /**
   * Component cleanup
   */
  componentWillUnmount() {
    this.retryTimeouts.forEach((timeout) => clearTimeout(timeout));
    this.retryTimeouts.clear();
  }
  render() {
    const { hasError, error, errorInfo, retryCount } = this.state;
    const { children, fallback, level = "component", name, showDetails = false } = this.props;
    if (hasError) {
      if (fallback) {
        return fallback;
      }
      if (level === "page") {
        return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          PageErrorFallback,
          {
            error,
            errorInfo,
            retryCount,
            onRetry: retryCount < MAX_RETRY_COUNT ? this.handleRetry : void 0,
            onRefresh: this.handleRefresh,
            onGoHome: this.handleGoHome,
            showDetails,
            errorBoundaryName: name
          },
          void 0,
          false,
          {
            fileName: "/home/ian/projects/reboot/src/components/ErrorBoundary.tsx",
            lineNumber: 210,
            columnNumber: 11
          },
          this
        );
      }
      return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        ComponentErrorFallback,
        {
          error,
          errorInfo,
          retryCount,
          onRetry: retryCount < MAX_RETRY_COUNT ? this.handleRetry : void 0,
          showDetails,
          errorBoundaryName: name
        },
        void 0,
        false,
        {
          fileName: "/home/ian/projects/reboot/src/components/ErrorBoundary.tsx",
          lineNumber: 224,
          columnNumber: 9
        },
        this
      );
    }
    return children;
  }
}
const PageErrorFallback = ({
  error,
  errorInfo,
  retryCount,
  onRetry,
  onRefresh,
  onGoHome,
  showDetails = false,
  errorBoundaryName
}) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "max-w-2xl w-full", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-white rounded-2xl shadow-xl border border-red-100 overflow-hidden", children: [
  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-gradient-to-r from-red-500 to-red-600 p-6 text-white", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-3", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "svg",
      {
        className: "w-8 h-8",
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24",
        "aria-hidden": "true",
        children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "path",
          {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "2",
            d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.732 15.5c-.77.833.192 2.5 1.732 2.5z"
          },
          void 0,
          false,
          {
            fileName: "/home/ian/projects/reboot/src/components/ErrorBoundary.tsx",
            lineNumber: 278,
            columnNumber: 17
          },
          void 0
        )
      },
      void 0,
      false,
      {
        fileName: "/home/ian/projects/reboot/src/components/ErrorBoundary.tsx",
        lineNumber: 271,
        columnNumber: 15
      },
      void 0
    ) }, void 0, false, {
      fileName: "/home/ian/projects/reboot/src/components/ErrorBoundary.tsx",
      lineNumber: 270,
      columnNumber: 13
    }, void 0),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h1", { className: "text-xl font-bold", children: "Something Went Wrong" }, void 0, false, {
        fileName: "/home/ian/projects/reboot/src/components/ErrorBoundary.tsx",
        lineNumber: 287,
        columnNumber: 15
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-red-100 text-sm", children: "We apologize for the inconvenience. The page encountered an error." }, void 0, false, {
        fileName: "/home/ian/projects/reboot/src/components/ErrorBoundary.tsx",
        lineNumber: 288,
        columnNumber: 15
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/ian/projects/reboot/src/components/ErrorBoundary.tsx",
      lineNumber: 286,
      columnNumber: 13
    }, void 0)
  ] }, void 0, true, {
    fileName: "/home/ian/projects/reboot/src/components/ErrorBoundary.tsx",
    lineNumber: 269,
    columnNumber: 11
  }, void 0) }, void 0, false, {
    fileName: "/home/ian/projects/reboot/src/components/ErrorBoundary.tsx",
    lineNumber: 268,
    columnNumber: 9
  }, void 0),
  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-6", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-gray-600 mb-4", children: "Don't worry - this happens sometimes. We've been notified and are working on a fix. In the meantime, you can try one of the options below." }, void 0, false, {
        fileName: "/home/ian/projects/reboot/src/components/ErrorBoundary.tsx",
        lineNumber: 298,
        columnNumber: 13
      }, void 0),
      retryCount > 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("svg", { className: "w-5 h-5 text-orange-500", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z", clipRule: "evenodd" }, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/components/ErrorBoundary.tsx",
          lineNumber: 307,
          columnNumber: 21
        }, void 0) }, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/components/ErrorBoundary.tsx",
          lineNumber: 306,
          columnNumber: 19
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-orange-700 font-medium", children: [
          "Retry attempts: ",
          retryCount,
          "/",
          MAX_RETRY_COUNT
        ] }, void 0, true, {
          fileName: "/home/ian/projects/reboot/src/components/ErrorBoundary.tsx",
          lineNumber: 309,
          columnNumber: 19
        }, void 0)
      ] }, void 0, true, {
        fileName: "/home/ian/projects/reboot/src/components/ErrorBoundary.tsx",
        lineNumber: 305,
        columnNumber: 17
      }, void 0) }, void 0, false, {
        fileName: "/home/ian/projects/reboot/src/components/ErrorBoundary.tsx",
        lineNumber: 304,
        columnNumber: 15
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/ian/projects/reboot/src/components/ErrorBoundary.tsx",
      lineNumber: 297,
      columnNumber: 11
    }, void 0),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-wrap gap-3 mb-6", children: [
      onRetry && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "button",
        {
          onClick: onRetry,
          className: "bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2",
          children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/components/ErrorBoundary.tsx",
              lineNumber: 325,
              columnNumber: 19
            }, void 0) }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/components/ErrorBoundary.tsx",
              lineNumber: 324,
              columnNumber: 17
            }, void 0),
            "Try Again"
          ]
        },
        void 0,
        true,
        {
          fileName: "/home/ian/projects/reboot/src/components/ErrorBoundary.tsx",
          lineNumber: 320,
          columnNumber: 15
        },
        void 0
      ),
      onRefresh && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "button",
        {
          onClick: onRefresh,
          className: "bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2",
          children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/components/ErrorBoundary.tsx",
              lineNumber: 337,
              columnNumber: 19
            }, void 0) }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/components/ErrorBoundary.tsx",
              lineNumber: 336,
              columnNumber: 17
            }, void 0),
            "Refresh Page"
          ]
        },
        void 0,
        true,
        {
          fileName: "/home/ian/projects/reboot/src/components/ErrorBoundary.tsx",
          lineNumber: 332,
          columnNumber: 15
        },
        void 0
      ),
      onGoHome && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "button",
        {
          onClick: onGoHome,
          className: "bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2",
          children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/components/ErrorBoundary.tsx",
              lineNumber: 349,
              columnNumber: 19
            }, void 0) }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/components/ErrorBoundary.tsx",
              lineNumber: 348,
              columnNumber: 17
            }, void 0),
            "Go Home"
          ]
        },
        void 0,
        true,
        {
          fileName: "/home/ian/projects/reboot/src/components/ErrorBoundary.tsx",
          lineNumber: 344,
          columnNumber: 15
        },
        void 0
      )
    ] }, void 0, true, {
      fileName: "/home/ian/projects/reboot/src/components/ErrorBoundary.tsx",
      lineNumber: 318,
      columnNumber: 11
    }, void 0),
    showDetails && error && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("details", { className: "bg-gray-50 rounded-lg", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("summary", { className: "p-4 cursor-pointer font-medium text-gray-700 hover:bg-gray-100 rounded-lg", children: "Technical Details (for developers)" }, void 0, false, {
        fileName: "/home/ian/projects/reboot/src/components/ErrorBoundary.tsx",
        lineNumber: 359,
        columnNumber: 15
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-4 pt-0", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-red-50 rounded-lg p-4 mb-4", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "font-medium text-red-800 mb-2", children: "Error Message" }, void 0, false, {
            fileName: "/home/ian/projects/reboot/src/components/ErrorBoundary.tsx",
            lineNumber: 364,
            columnNumber: 19
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("code", { className: "text-sm text-red-700 break-all", children: error.message }, void 0, false, {
            fileName: "/home/ian/projects/reboot/src/components/ErrorBoundary.tsx",
            lineNumber: 365,
            columnNumber: 19
          }, void 0)
        ] }, void 0, true, {
          fileName: "/home/ian/projects/reboot/src/components/ErrorBoundary.tsx",
          lineNumber: 363,
          columnNumber: 17
        }, void 0),
        error.stack && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-gray-100 rounded-lg p-4 mb-4", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "font-medium text-gray-800 mb-2", children: "Stack Trace" }, void 0, false, {
            fileName: "/home/ian/projects/reboot/src/components/ErrorBoundary.tsx",
            lineNumber: 370,
            columnNumber: 21
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("pre", { className: "text-xs text-gray-600 whitespace-pre-wrap break-all overflow-x-auto", children: error.stack }, void 0, false, {
            fileName: "/home/ian/projects/reboot/src/components/ErrorBoundary.tsx",
            lineNumber: 371,
            columnNumber: 21
          }, void 0)
        ] }, void 0, true, {
          fileName: "/home/ian/projects/reboot/src/components/ErrorBoundary.tsx",
          lineNumber: 369,
          columnNumber: 19
        }, void 0),
        errorInfo?.componentStack && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-blue-50 rounded-lg p-4", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "font-medium text-blue-800 mb-2", children: "Component Stack" }, void 0, false, {
            fileName: "/home/ian/projects/reboot/src/components/ErrorBoundary.tsx",
            lineNumber: 379,
            columnNumber: 21
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("pre", { className: "text-xs text-blue-600 whitespace-pre-wrap break-all overflow-x-auto", children: errorInfo.componentStack }, void 0, false, {
            fileName: "/home/ian/projects/reboot/src/components/ErrorBoundary.tsx",
            lineNumber: 380,
            columnNumber: 21
          }, void 0)
        ] }, void 0, true, {
          fileName: "/home/ian/projects/reboot/src/components/ErrorBoundary.tsx",
          lineNumber: 378,
          columnNumber: 19
        }, void 0),
        errorBoundaryName && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-4 text-xs text-gray-500", children: [
          "Error Boundary: ",
          errorBoundaryName
        ] }, void 0, true, {
          fileName: "/home/ian/projects/reboot/src/components/ErrorBoundary.tsx",
          lineNumber: 387,
          columnNumber: 19
        }, void 0)
      ] }, void 0, true, {
        fileName: "/home/ian/projects/reboot/src/components/ErrorBoundary.tsx",
        lineNumber: 362,
        columnNumber: 15
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/ian/projects/reboot/src/components/ErrorBoundary.tsx",
      lineNumber: 358,
      columnNumber: 13
    }, void 0),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-blue-50 rounded-lg p-4 mt-6", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "font-medium text-blue-800 mb-2", children: "Still Having Issues?" }, void 0, false, {
        fileName: "/home/ian/projects/reboot/src/components/ErrorBoundary.tsx",
        lineNumber: 397,
        columnNumber: 13
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-blue-700 text-sm mb-3", children: "If this problem persists, please contact our support team." }, void 0, false, {
        fileName: "/home/ian/projects/reboot/src/components/ErrorBoundary.tsx",
        lineNumber: 398,
        columnNumber: 13
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xs text-blue-600", children: [
        "Session ID: ",
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("code", { className: "bg-blue-100 px-2 py-1 rounded", children: SESSION_ID }, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/components/ErrorBoundary.tsx",
          lineNumber: 402,
          columnNumber: 27
        }, void 0)
      ] }, void 0, true, {
        fileName: "/home/ian/projects/reboot/src/components/ErrorBoundary.tsx",
        lineNumber: 401,
        columnNumber: 13
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/ian/projects/reboot/src/components/ErrorBoundary.tsx",
      lineNumber: 396,
      columnNumber: 11
    }, void 0)
  ] }, void 0, true, {
    fileName: "/home/ian/projects/reboot/src/components/ErrorBoundary.tsx",
    lineNumber: 296,
    columnNumber: 9
  }, void 0)
] }, void 0, true, {
  fileName: "/home/ian/projects/reboot/src/components/ErrorBoundary.tsx",
  lineNumber: 266,
  columnNumber: 7
}, void 0) }, void 0, false, {
  fileName: "/home/ian/projects/reboot/src/components/ErrorBoundary.tsx",
  lineNumber: 264,
  columnNumber: 5
}, void 0) }, void 0, false, {
  fileName: "/home/ian/projects/reboot/src/components/ErrorBoundary.tsx",
  lineNumber: 263,
  columnNumber: 3
}, void 0);
const ComponentErrorFallback = ({
  error,
  errorInfo,
  retryCount,
  onRetry,
  showDetails = false,
  errorBoundaryName
}) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-red-50 border border-red-200 rounded-lg p-6 m-4", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-start gap-3", children: [
  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "svg",
    {
      className: "w-6 h-6 text-red-500",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24",
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "path",
        {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "2",
          d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.732 15.5c-.77.833.192 2.5 1.732 2.5z"
        },
        void 0,
        false,
        {
          fileName: "/home/ian/projects/reboot/src/components/ErrorBoundary.tsx",
          lineNumber: 432,
          columnNumber: 11
        },
        void 0
      )
    },
    void 0,
    false,
    {
      fileName: "/home/ian/projects/reboot/src/components/ErrorBoundary.tsx",
      lineNumber: 425,
      columnNumber: 9
    },
    void 0
  ) }, void 0, false, {
    fileName: "/home/ian/projects/reboot/src/components/ErrorBoundary.tsx",
    lineNumber: 424,
    columnNumber: 7
  }, void 0),
  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex-1", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-red-800 font-medium mb-2", children: "Component Error" }, void 0, false, {
      fileName: "/home/ian/projects/reboot/src/components/ErrorBoundary.tsx",
      lineNumber: 442,
      columnNumber: 9
    }, void 0),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-red-700 text-sm mb-4", children: "This component encountered an error and couldn't render properly." }, void 0, false, {
      fileName: "/home/ian/projects/reboot/src/components/ErrorBoundary.tsx",
      lineNumber: 443,
      columnNumber: 9
    }, void 0),
    retryCount > 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-orange-100 border border-orange-200 rounded p-3 mb-4", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-orange-700 text-sm", children: [
      "Retry attempts: ",
      retryCount,
      "/",
      MAX_RETRY_COUNT
    ] }, void 0, true, {
      fileName: "/home/ian/projects/reboot/src/components/ErrorBoundary.tsx",
      lineNumber: 449,
      columnNumber: 13
    }, void 0) }, void 0, false, {
      fileName: "/home/ian/projects/reboot/src/components/ErrorBoundary.tsx",
      lineNumber: 448,
      columnNumber: 11
    }, void 0),
    onRetry && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "button",
      {
        onClick: onRetry,
        className: "bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-medium transition-colors duration-200 text-sm flex items-center gap-2",
        children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" }, void 0, false, {
            fileName: "/home/ian/projects/reboot/src/components/ErrorBoundary.tsx",
            lineNumber: 461,
            columnNumber: 15
          }, void 0) }, void 0, false, {
            fileName: "/home/ian/projects/reboot/src/components/ErrorBoundary.tsx",
            lineNumber: 460,
            columnNumber: 13
          }, void 0),
          "Retry Component"
        ]
      },
      void 0,
      true,
      {
        fileName: "/home/ian/projects/reboot/src/components/ErrorBoundary.tsx",
        lineNumber: 456,
        columnNumber: 11
      },
      void 0
    ),
    showDetails && error && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("details", { className: "mt-4 bg-white rounded border", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("summary", { className: "p-3 cursor-pointer text-sm font-medium text-gray-700 hover:bg-gray-50", children: "Technical Details" }, void 0, false, {
        fileName: "/home/ian/projects/reboot/src/components/ErrorBoundary.tsx",
        lineNumber: 470,
        columnNumber: 13
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-3 pt-0 border-t", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-xs text-gray-600 mb-2", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { children: "Error:" }, void 0, false, {
            fileName: "/home/ian/projects/reboot/src/components/ErrorBoundary.tsx",
            lineNumber: 475,
            columnNumber: 17
          }, void 0),
          " ",
          error.message
        ] }, void 0, true, {
          fileName: "/home/ian/projects/reboot/src/components/ErrorBoundary.tsx",
          lineNumber: 474,
          columnNumber: 15
        }, void 0),
        errorInfo && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-xs text-gray-500 mb-2", children: "Component Stack Available" }, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/components/ErrorBoundary.tsx",
          lineNumber: 478,
          columnNumber: 17
        }, void 0),
        errorBoundaryName && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-xs text-gray-500", children: [
          "Boundary: ",
          errorBoundaryName
        ] }, void 0, true, {
          fileName: "/home/ian/projects/reboot/src/components/ErrorBoundary.tsx",
          lineNumber: 483,
          columnNumber: 17
        }, void 0)
      ] }, void 0, true, {
        fileName: "/home/ian/projects/reboot/src/components/ErrorBoundary.tsx",
        lineNumber: 473,
        columnNumber: 13
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/ian/projects/reboot/src/components/ErrorBoundary.tsx",
      lineNumber: 469,
      columnNumber: 11
    }, void 0)
  ] }, void 0, true, {
    fileName: "/home/ian/projects/reboot/src/components/ErrorBoundary.tsx",
    lineNumber: 441,
    columnNumber: 7
  }, void 0)
] }, void 0, true, {
  fileName: "/home/ian/projects/reboot/src/components/ErrorBoundary.tsx",
  lineNumber: 423,
  columnNumber: 5
}, void 0) }, void 0, false, {
  fileName: "/home/ian/projects/reboot/src/components/ErrorBoundary.tsx",
  lineNumber: 422,
  columnNumber: 3
}, void 0);
export {
  BackgroundGradient as B,
  ErrorBoundary as E,
  GlobalHeader as G,
  GlobalFooter as a
};
//# sourceMappingURL=components-core-Zj3oRgH7.js.map
