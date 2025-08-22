import { c as createLucideIcon, u as useLeadForm, r as reactExports, j as jsxDevRuntimeExports, B as BackgroundGradient, S as SEOHead, G as GlobalHeader, a as GlobalFooter } from "./index.dev-Nzo4c0vq.js";
import { C as CircleCheckBig, G as Globe } from "./globe-C6tuYBpO.js";
/**
 * @license lucide-react v0.536.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode$3);
/**
 * @license lucide-react v0.536.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = createLucideIcon("loader-circle", __iconNode$2);
/**
 * @license lucide-react v0.536.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7", key: "132q7q" }],
  ["rect", { x: "2", y: "4", width: "20", height: "16", rx: "2", key: "izxlao" }]
];
const Mail = createLucideIcon("mail", __iconNode$1);
/**
 * @license lucide-react v0.536.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z"
    }
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }]
];
const MapPin = createLucideIcon("map-pin", __iconNode);
const Contact = () => {
  const { setShowDropdownForm } = useLeadForm();
  const [formData, setFormData] = reactExports.useState({
    name: "",
    email: "",
    company: "",
    website: "",
    phone: "",
    subject: "",
    message: "",
    serviceInterest: "",
    honeypot: ""
    // Bot detection field
  });
  const [status, setStatus] = reactExports.useState("idle");
  const [errorMessage, setErrorMessage] = reactExports.useState("");
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const validateForm = () => {
    if (!formData.name.trim()) return "Name is required";
    if (!formData.email.trim()) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return "Please enter a valid email address";
    if (!formData.message.trim()) return "Message is required";
    return null;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setStatus("error");
      setErrorMessage(validationError);
      return;
    }
    setStatus("loading");
    setErrorMessage("");
    try {
      const submissionData = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        subject: formData.subject.trim() || "Contact Form Submission",
        message: formData.message.trim(),
        // Include additional context in message if provided
        ...formData.company && { company: formData.company.trim() },
        ...formData.website && { website: formData.website.trim() },
        ...formData.phone && { phone: formData.phone.trim() },
        ...formData.serviceInterest && { serviceInterest: formData.serviceInterest }
      };
      let enhancedMessage = submissionData.message;
      if (formData.company) enhancedMessage += `

Company: ${formData.company}`;
      if (formData.website) enhancedMessage += `
Website: ${formData.website}`;
      if (formData.phone) enhancedMessage += `
Phone: ${formData.phone}`;
      if (formData.serviceInterest) enhancedMessage += `
Service Interest: ${formData.serviceInterest}`;
      const apiUrl = true ? "http://localhost:3002/api/forms/contact" : "/api/forms/contact";
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: submissionData.name,
          email: submissionData.email,
          subject: submissionData.subject,
          message: enhancedMessage,
          honeypot: formData.honeypot
          // Bot detection
        })
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Form submission failed");
      }
      const result = await response.json();
      console.log("Contact form submitted successfully:", result.data?.message);
      setStatus("success");
      setFormData({
        name: "",
        email: "",
        company: "",
        website: "",
        phone: "",
        subject: "",
        message: "",
        serviceInterest: "",
        honeypot: ""
      });
    } catch (error) {
      console.error("Contact form submission error:", error);
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Failed to send message. Please try again later.");
    }
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "contact-page min-h-screen relative overflow-hidden dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "div",
      {
        "aria-live": "polite",
        "aria-atomic": "true",
        className: "sr-only",
        id: "status-announcer",
        children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "sr-only", children: "Content loaded successfully" }, void 0, false, {
          fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
          lineNumber: 134,
          columnNumber: 9
        }, void 0)
      },
      void 0,
      false,
      {
        fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
        lineNumber: 128,
        columnNumber: 7
      },
      void 0
    ),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(BackgroundGradient, {}, void 0, false, {
      fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
      lineNumber: 138,
      columnNumber: 7
    }, void 0),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      SEOHead,
      {
        pageSlug: "contact",
        structuredDataType: "contact",
        enableCoreWebVitalsOptimization: true
      },
      void 0,
      false,
      {
        fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
        lineNumber: 141,
        columnNumber: 7
      },
      void 0
    ),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "relative z-10", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(GlobalHeader, { showProgressBar: true }, void 0, false, {
        fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
        lineNumber: 149,
        columnNumber: 9
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "pt-20 md:pt-24 pb-8", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center mb-12", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h1", { className: "heading-hero text-gradient-critical mb-6", children: "Contact Us" }, void 0, false, {
            fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
            lineNumber: 157,
            columnNumber: 13
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xl text-gradient-safe max-w-3xl mx-auto leading-relaxed", children: "Ready to transform your marketing strategy? Let's discuss how our fractional CMO services can drive measurable growth for your business." }, void 0, false, {
            fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
            lineNumber: 160,
            columnNumber: 13
          }, void 0)
        ] }, void 0, true, {
          fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
          lineNumber: 156,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-2xl p-6 mb-8 text-center", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "heading-sm text-black-critical dark:text-orange-50 mb-3", children: "Looking for Marketing Help?" }, void 0, false, {
            fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
            lineNumber: 168,
            columnNumber: 13
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-orange-900 dark:text-orange-100 mb-4", children: "If you're looking to improve your marketing, grow your revenue, or get a free marketing analysis, please use our Marketing Analysis form for the fastest response and personalized recommendations." }, void 0, false, {
            fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
            lineNumber: 171,
            columnNumber: 13
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "button",
            {
              "aria-label": "Opens contact form for free marketing analysis",
              onClick: () => setShowDropdownForm(true),
              className: "bg-orange-500 hover:bg-orange-600 focus-visible:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors",
              children: "Get Your Free Marketing Analysis →"
            },
            void 0,
            false,
            {
              fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
              lineNumber: 175,
              columnNumber: 13
            },
            void 0
          )
        ] }, void 0, true, {
          fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
          lineNumber: 167,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid lg:grid-cols-3 gap-8", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "lg:col-span-2", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "glass-card-light rounded-2xl shadow-xl border border-white/30 dark:border-slate-700/30 p-6", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "heading-lg text-gradient-critical mb-6", children: "General Inquiries" }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
              lineNumber: 188,
              columnNumber: 17
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-gray-700 dark:text-gray-200 mb-4 text-sm", children: "Use this form for legal inquiries, privacy questions, technical support, or other non-marketing matters." }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
              lineNumber: 189,
              columnNumber: 13
            }, void 0),
            status === "success" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CircleCheckBig, { className: "w-5 h-5 text-green-600 dark:text-green-400 mr-2" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
                lineNumber: 196,
                columnNumber: 23
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-green-800 dark:text-green-200 font-medium", children: "Message sent successfully! We'll get back to you within 24 hours." }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
                lineNumber: 197,
                columnNumber: 23
              }, void 0)
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
              lineNumber: 195,
              columnNumber: 21
            }, void 0) }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
              lineNumber: 194,
              columnNumber: 19
            }, void 0),
            status === "error" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CircleAlert, { className: "w-5 h-5 text-red-600 dark:text-red-400 mr-2" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
                lineNumber: 207,
                columnNumber: 23
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-red-800 dark:text-red-200 font-medium", children: errorMessage }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
                lineNumber: 208,
                columnNumber: 23
              }, void 0)
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
              lineNumber: 206,
              columnNumber: 21
            }, void 0) }, void 0, false, {
              fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
              lineNumber: 205,
              columnNumber: 19
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("form", { onSubmit: handleSubmit, className: "space-y-6", role: "form", "aria-label": "Lead generation form", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid sm:grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { htmlFor: "name", className: "block text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2", children: "Full Name *" }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
                    lineNumber: 218,
                    columnNumber: 23
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                    "input",
                    {
                      type: "text",
                      id: "name",
                      name: "name",
                      value: formData.name,
                      onChange: handleInputChange,
                      required: true,
                      className: "w-full px-4 py-3 bg-white dark:bg-slate-700 border border-gray-400 dark:border-slate-500 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 dark:text-white",
                      placeholder: "Your full name"
                    },
                    void 0,
                    false,
                    {
                      fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
                      lineNumber: 221,
                      columnNumber: 23
                    },
                    void 0
                  )
                ] }, void 0, true, {
                  fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
                  lineNumber: 217,
                  columnNumber: 21
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { htmlFor: "email", className: "block text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2", children: "Email Address *" }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
                    lineNumber: 233,
                    columnNumber: 23
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                    "input",
                    {
                      type: "email",
                      id: "email",
                      name: "email",
                      value: formData.email,
                      onChange: handleInputChange,
                      required: true,
                      className: "w-full px-4 py-3 bg-white dark:bg-slate-700 border border-gray-400 dark:border-slate-500 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 dark:text-white",
                      placeholder: "your@email.com"
                    },
                    void 0,
                    false,
                    {
                      fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
                      lineNumber: 236,
                      columnNumber: 23
                    },
                    void 0
                  )
                ] }, void 0, true, {
                  fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
                  lineNumber: 232,
                  columnNumber: 21
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
                lineNumber: 216,
                columnNumber: 19
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid sm:grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { htmlFor: "company", className: "block text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2", children: "Company Name" }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
                    lineNumber: 251,
                    columnNumber: 23
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                    "input",
                    {
                      type: "text",
                      id: "company",
                      name: "company",
                      value: formData.company,
                      onChange: handleInputChange,
                      className: "w-full px-4 py-3 bg-white dark:bg-slate-700 border border-gray-400 dark:border-slate-500 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 dark:text-white",
                      placeholder: "Your company"
                    },
                    void 0,
                    false,
                    {
                      fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
                      lineNumber: 254,
                      columnNumber: 23
                    },
                    void 0
                  )
                ] }, void 0, true, {
                  fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
                  lineNumber: 250,
                  columnNumber: 21
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { htmlFor: "website", className: "block text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2", children: "Website URL" }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
                    lineNumber: 265,
                    columnNumber: 23
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                    "input",
                    {
                      type: "url",
                      id: "website",
                      name: "website",
                      value: formData.website,
                      onChange: handleInputChange,
                      className: "w-full px-4 py-3 bg-white dark:bg-slate-700 border border-gray-400 dark:border-slate-500 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 dark:text-white",
                      placeholder: "https://yourwebsite.com"
                    },
                    void 0,
                    false,
                    {
                      fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
                      lineNumber: 268,
                      columnNumber: 23
                    },
                    void 0
                  )
                ] }, void 0, true, {
                  fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
                  lineNumber: 264,
                  columnNumber: 21
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
                lineNumber: 249,
                columnNumber: 19
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid sm:grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { htmlFor: "phone", className: "block text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2", children: "Phone Number" }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
                    lineNumber: 282,
                    columnNumber: 23
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                    "input",
                    {
                      type: "tel",
                      id: "phone",
                      name: "phone",
                      value: formData.phone,
                      onChange: handleInputChange,
                      className: "w-full px-4 py-3 bg-white dark:bg-slate-700 border border-gray-400 dark:border-slate-500 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 dark:text-white",
                      placeholder: "(555) 123-4567"
                    },
                    void 0,
                    false,
                    {
                      fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
                      lineNumber: 285,
                      columnNumber: 23
                    },
                    void 0
                  )
                ] }, void 0, true, {
                  fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
                  lineNumber: 281,
                  columnNumber: 21
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { htmlFor: "serviceInterest", className: "block text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2", children: "Service Interest" }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
                    lineNumber: 296,
                    columnNumber: 23
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                    "select",
                    {
                      id: "serviceInterest",
                      name: "serviceInterest",
                      value: formData.serviceInterest,
                      onChange: handleInputChange,
                      className: "w-full px-4 py-3 bg-white dark:bg-slate-700 border border-gray-400 dark:border-slate-500 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 dark:text-white",
                      "aria-label": "Select an option",
                      children: [
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "", children: "Select a service" }, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
                          lineNumber: 306,
                          columnNumber: 25
                        }, void 0),
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "quick-win", children: "Quick-Win Strategy ($5K-8K/month)" }, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
                          lineNumber: 307,
                          columnNumber: 25
                        }, void 0),
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "growth-strategy", children: "Growth Strategy ($8K-12K/month)" }, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
                          lineNumber: 308,
                          columnNumber: 25
                        }, void 0),
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "fractional-cmo", children: "Fractional CMO ($12K-18K/month)" }, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
                          lineNumber: 309,
                          columnNumber: 25
                        }, void 0),
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "consultation", children: "Free Consultation" }, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
                          lineNumber: 310,
                          columnNumber: 25
                        }, void 0),
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "other", children: "Other" }, void 0, false, {
                          fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
                          lineNumber: 311,
                          columnNumber: 25
                        }, void 0)
                      ]
                    },
                    void 0,
                    true,
                    {
                      fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
                      lineNumber: 299,
                      columnNumber: 23
                    },
                    void 0
                  )
                ] }, void 0, true, {
                  fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
                  lineNumber: 295,
                  columnNumber: 21
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
                lineNumber: 280,
                columnNumber: 19
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { htmlFor: "subject", className: "block text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2", children: "Subject" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
                  lineNumber: 317,
                  columnNumber: 21
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "input",
                  {
                    type: "text",
                    id: "subject",
                    name: "subject",
                    value: formData.subject,
                    onChange: handleInputChange,
                    className: "w-full px-4 py-3 bg-white dark:bg-slate-700 border border-gray-400 dark:border-slate-500 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 dark:text-white",
                    placeholder: "What can we help you with?"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
                    lineNumber: 320,
                    columnNumber: 21
                  },
                  void 0
                )
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
                lineNumber: 316,
                columnNumber: 19
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { htmlFor: "message", className: "block text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2", children: "Message *" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
                  lineNumber: 332,
                  columnNumber: 21
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "textarea",
                  {
                    id: "message",
                    name: "message",
                    value: formData.message,
                    onChange: handleInputChange,
                    required: true,
                    rows: 6,
                    className: "w-full px-4 py-3 bg-white dark:bg-slate-700 border border-gray-400 dark:border-slate-500 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 dark:text-white",
                    placeholder: "Tell us about your business challenges and goals...",
                    "aria-label": "Text input field"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
                    lineNumber: 335,
                    columnNumber: 21
                  },
                  void 0
                )
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
                lineNumber: 331,
                columnNumber: 19
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { display: "none" }, children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { htmlFor: "honeypot", children: "Leave this field empty" }, void 0, false, {
                  fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
                  lineNumber: 350,
                  columnNumber: 21
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "input",
                  {
                    type: "text",
                    id: "honeypot",
                    name: "honeypot",
                    value: formData.honeypot,
                    onChange: handleInputChange,
                    tabIndex: -1,
                    autoComplete: "off"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
                    lineNumber: 351,
                    columnNumber: 21
                  },
                  void 0
                )
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
                lineNumber: 349,
                columnNumber: 19
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "button",
                {
                  type: "submit",
                  disabled: status === "loading",
                  className: "w-full px-8 py-4 bg-orange-500 hover:bg-orange-600 focus-visible:bg-orange-600 disabled:bg-orange-300 text-white font-semibold rounded-lg transition-colors flex items-center justify-center",
                  children: status === "loading" ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(LoaderCircle, { className: "w-5 h-5 mr-2 motion-safe:animate-spin motion-reduce:animate-none" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
                      lineNumber: 370,
                      columnNumber: 25
                    }, void 0),
                    "Sending Message..."
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
                    lineNumber: 368,
                    columnNumber: 23
                  }, void 0) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Mail, { className: "w-5 h-5 mr-2" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
                      lineNumber: 375,
                      columnNumber: 25
                    }, void 0),
                    "Send Message"
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
                    lineNumber: 374,
                    columnNumber: 23
                  }, void 0)
                },
                void 0,
                false,
                {
                  fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
                  lineNumber: 362,
                  columnNumber: 19
                },
                void 0
              )
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
              lineNumber: 215,
              columnNumber: 17
            }, void 0)
          ] }, void 0, true, {
            fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
            lineNumber: 187,
            columnNumber: 15
          }, void 0) }, void 0, false, {
            fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
            lineNumber: 186,
            columnNumber: 13
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "glass-card-light rounded-2xl shadow-xl border border-white/30 dark:border-slate-700/30 p-6", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "heading-md text-gray-900 dark:text-white mb-4", children: "Get in Touch" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
                lineNumber: 389,
                columnNumber: 17
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-start", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(MapPin, { className: "w-5 h-5 text-orange-500 mr-3 mt-1" }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
                    lineNumber: 392,
                    columnNumber: 21
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "font-semibold text-gray-800 dark:text-white", children: "Address" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
                      lineNumber: 394,
                      columnNumber: 23
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm text-gray-700 dark:text-gray-200", children: [
                      "17595 Harvard Ave C-738",
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("br", {}, void 0, false, {
                        fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
                        lineNumber: 396,
                        columnNumber: 48
                      }, void 0),
                      "Irvine, CA 92614",
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("br", {}, void 0, false, {
                        fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
                        lineNumber: 397,
                        columnNumber: 41
                      }, void 0),
                      "United States"
                    ] }, void 0, true, {
                      fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
                      lineNumber: 395,
                      columnNumber: 23
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
                    lineNumber: 393,
                    columnNumber: 21
                  }, void 0)
                ] }, void 0, true, {
                  fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
                  lineNumber: 391,
                  columnNumber: 19
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-start", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Globe, { className: "w-5 h-5 text-orange-500 mr-3 mt-1" }, void 0, false, {
                    fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
                    lineNumber: 403,
                    columnNumber: 21
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "font-semibold text-gray-800 dark:text-white", children: "Service Areas" }, void 0, false, {
                      fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
                      lineNumber: 405,
                      columnNumber: 23
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm text-gray-700 dark:text-gray-200", children: [
                      "USA • Bangkok • Singapore",
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("br", {}, void 0, false, {
                        fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
                        lineNumber: 407,
                        columnNumber: 50
                      }, void 0),
                      "Global services available"
                    ] }, void 0, true, {
                      fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
                      lineNumber: 406,
                      columnNumber: 23
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
                    lineNumber: 404,
                    columnNumber: 21
                  }, void 0)
                ] }, void 0, true, {
                  fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
                  lineNumber: 402,
                  columnNumber: 19
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
                lineNumber: 390,
                columnNumber: 17
              }, void 0)
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
              lineNumber: 388,
              columnNumber: 15
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900 dark:to-amber-900 rounded-2xl p-6", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "heading-md text-orange-900 dark:text-orange-50 mb-2", children: "Response Time" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
                lineNumber: 417,
                columnNumber: 17
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-orange-800 dark:text-orange-100 text-sm", children: "We typically respond to all inquiries within 24 hours during business days. For urgent matters, please mention it in your message subject line." }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
                lineNumber: 418,
                columnNumber: 17
              }, void 0)
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
              lineNumber: 416,
              columnNumber: 15
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 rounded-2xl p-6", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "heading-md text-blue-900 dark:text-blue-50 mb-2", children: "Free Marketing Analysis" }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
                lineNumber: 426,
                columnNumber: 17
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-blue-800 dark:text-blue-100 text-sm mb-4", children: "Ready to transform your marketing? Get a personalized analysis that shows exactly how to accelerate your business growth." }, void 0, false, {
                fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
                lineNumber: 427,
                columnNumber: 17
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "button",
                {
                  "aria-label": "Opens contact form for free marketing analysis",
                  onClick: () => setShowDropdownForm(true),
                  className: "inline-block px-4 py-2 bg-blue-700 hover:bg-blue-800 focus-visible:bg-blue-800 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm",
                  children: "Get Your Free Analysis"
                },
                void 0,
                false,
                {
                  fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
                  lineNumber: 431,
                  columnNumber: 17
                },
                void 0
              )
            ] }, void 0, true, {
              fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
              lineNumber: 425,
              columnNumber: 15
            }, void 0)
          ] }, void 0, true, {
            fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
            lineNumber: 385,
            columnNumber: 13
          }, void 0)
        ] }, void 0, true, {
          fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
          lineNumber: 183,
          columnNumber: 11
        }, void 0)
      ] }, void 0, true, {
        fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
        lineNumber: 153,
        columnNumber: 9
      }, void 0) }, void 0, false, {
        fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
        lineNumber: 152,
        columnNumber: 7
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(GlobalFooter, {}, void 0, false, {
        fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
        lineNumber: 445,
        columnNumber: 7
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
      lineNumber: 148,
      columnNumber: 7
    }, void 0)
  ] }, void 0, true, {
    fileName: "/home/ian/projects/reboot/src/pages/Contact.tsx",
    lineNumber: 126,
    columnNumber: 5
  }, void 0);
};
export {
  Contact as default
};
//# sourceMappingURL=Contact-Cm1dUEms.js.map
