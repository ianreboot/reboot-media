import { r as reactExports, j as jsxDevRuntimeExports, C as ChevronUp } from "./react-core-CWvNQPo6.js";
const BackToTopButton = () => {
  const [isVisible, setIsVisible] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "button",
    {
      onClick: scrollToTop,
      className: `fixed bottom-20 sm:bottom-6 right-6 z-40 p-3 bg-orange-500/60 hover:bg-orange-600 focus-visible:bg-orange-600/80 text-white rounded-full shadow-md transition-all duration-300 transform ${isVisible ? "translate-y-0 opacity-60 hover:opacity-90 focus-visible:opacity-90" : "translate-y-16 opacity-0"}`,
      style: {
        visibility: isVisible ? "visible" : "hidden"
      },
      "aria-label": "Back to top",
      children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ChevronUp, { className: "w-5 h-5" }, void 0, false, {
        fileName: "/home/ian/projects/reboot/src/components/BackToTopButton.tsx",
        lineNumber: 35,
        columnNumber: 7
      }, void 0)
    },
    void 0,
    false,
    {
      fileName: "/home/ian/projects/reboot/src/components/BackToTopButton.tsx",
      lineNumber: 25,
      columnNumber: 5
    },
    void 0
  );
};
export {
  BackToTopButton as B
};
//# sourceMappingURL=components-perf-CB4PwQVg.js.map
