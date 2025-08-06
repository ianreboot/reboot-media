import { useState, useEffect } from 'react';

function App() {
  const [scrollY, setScrollY] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [typedWord, setTypedWord] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Words to cycle through - what businesses lose
  const lostItems = ['Revenue', 'Customers', 'Growth', 'Market Share', 'Opportunities'];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Typewriter effect
  useEffect(() => {
    const currentWord = lostItems[wordIndex];
    const typeSpeed = isDeleting ? 50 : 100;
    
    const timer = setTimeout(() => {
      if (!isDeleting && typedWord.length < currentWord.length) {
        // Typing
        setTypedWord(currentWord.slice(0, typedWord.length + 1));
      } else if (isDeleting && typedWord.length > 0) {
        // Deleting
        setTypedWord(typedWord.slice(0, -1));
      } else if (!isDeleting && typedWord.length === currentWord.length) {
        // Pause before deleting
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && typedWord.length === 0) {
        // Move to next word
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % lostItems.length);
      }
    }, typeSpeed);
    
    return () => clearTimeout(timer);
  }, [typedWord, wordIndex, isDeleting, lostItems]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-gray-50">
      {/* Transparent Fixed Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        <div className={`${scrollY > 50 ? 'bg-blue-900/85 backdrop-blur-lg shadow-lg' : 'bg-transparent'} transition-all duration-300`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className={`text-2xl font-bold ${scrollY > 50 ? 'text-white' : 'text-stone-900'}`}>REBOOT <span className="text-orange-500">MEDIA</span></span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#psychology" className={`${scrollY > 50 ? 'text-stone-300' : 'text-stone-700'} hover:text-orange-500 transition-all duration-300 font-medium relative group`}>
                Psychology
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#results" className={`${scrollY > 50 ? 'text-stone-300' : 'text-stone-700'} hover:text-orange-500 transition-all duration-300 font-medium relative group`}>
                Results
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#services" className={`${scrollY > 50 ? 'text-stone-300' : 'text-stone-700'} hover:text-orange-500 transition-all duration-300 font-medium relative group`}>
                Services
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#about" className={`${scrollY > 50 ? 'text-stone-300' : 'text-stone-700'} hover:text-orange-500 transition-all duration-300 font-medium relative group`}>
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </div>
            {/* Traditional CTA Button */}
            <a href="#contact" className="bg-orange-500 text-sm sm:text-base hover:bg-orange-600 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg inline-block">
              Get Results
            </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Parallax Effect */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute top-20 left-10 w-20 h-20 bg-orange-400/20 rounded-full blur-xl"
            style={{ transform: `translateY(${scrollY * 0.3}px) rotate(${scrollY * 0.1}deg)` }}
          ></div>
          <div 
            className="absolute top-40 right-20 w-32 h-32 bg-stone-400/10 rounded-full blur-2xl"
            style={{ transform: `translateY(${scrollY * 0.5}px) rotate(${-scrollY * 0.1}deg)` }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Loss Aversion Headline */}
          <div className="mb-4 sm:mb-6">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-slate-900 leading-[0.9]">
              <span className="block">Stop Losing</span>
              <span className="block mt-2">
                <span className="text-orange-500 relative inline-block min-h-[1.2em]">
                  {typedWord}
                  <span className="animate-blink ml-0.5">|</span>
                  <div className="absolute -inset-2 bg-orange-100 -skew-y-1 -z-10 rounded-lg"></div>
                </span>
              </span>
              <span className="block mt-2">to <span className="text-gray-600 line-through decoration-red-500 decoration-4">Broken</span></span>
              <span className="block mt-1">Marketing</span>
            </h1>
          </div>
          
          {/* Authority Subheadline */}
          <div className="mb-6 sm:mb-8">
            <p className="text-base sm:text-lg md:text-xl text-slate-700 font-medium max-w-4xl mx-auto leading-relaxed">
              Asian companies hire <span className="font-bold text-stone-900">American marketing psychology expertise</span> to break through growth plateaus
            </p>
            <div className="mt-3 text-lg text-slate-600">
              <span className="font-semibold">Proven:</span> $500K/month ad spend • 7 industries • $100K→$3M growth
            </div>
          </div>

          {/* Micro-Commitment CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            <button className="bg-blue-900 hover:bg-blue-800 text-white px-6 sm:px-8 py-3 rounded-lg font-bold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-xl w-full sm:w-auto">
              📊 Free Psychology Audit
            </button>
            <button className="border-2 border-stone-900 hover:bg-stone-900 hover:text-white text-stone-900 px-6 sm:px-8 py-3 rounded-lg font-bold text-base sm:text-lg transition-all duration-300 w-full sm:w-auto">
              💡 See Case Studies
            </button>
          </div>

          {/* Social Proof */}
          <div className="mt-8 sm:mt-12 flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-stone-600">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-500">$3M+</div>
              <div className="text-sm">Monthly Revenue Generated</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-500">7</div>
              <div className="text-sm">Industries Proven</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-500">20+</div>
              <div className="text-sm">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section - Customer Awareness Stage 1 */}
      <section id="psychology" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-100/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-stone-900 mb-6 sm:mb-8">
              The <span className="text-red-500">$200K</span> Marketing Mistake
            </h2>
            <p className="text-xl text-stone-700 max-w-3xl mx-auto leading-normal">
              <span className="font-bold">73% of Asian companies</span> can't explain their value clearly to customers. They suffer from the "Curse of Knowledge" - knowing too much about their product to communicate it simply.
            </p>
          </div>

          {/* Asymmetrical Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-stone-200 transform -rotate-1">
                <h3 className="text-2xl font-bold text-stone-900 mb-6">What Business Owners Say:</h3>
                <div className="space-y-4 text-stone-700">
                  <p className="italic">"Our advanced AI-powered customer lifecycle optimization platform leverages machine learning algorithms to deliver personalized experiences..."</p>
                  <p className="text-red-600 font-semibold">❌ Customers don't understand this</p>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="bg-orange-50 p-6 sm:p-8 rounded-2xl shadow-xl border border-orange-200 transform rotate-1">
                <h3 className="text-2xl font-bold text-stone-900 mb-6">What Customers Hear:</h3>
                <div className="space-y-4 text-stone-700">
                  <p className="italic">"We help you stop losing customers and make more money from the ones you have."</p>
                  <p className="text-green-600 font-semibold">✅ Clear, benefits-focused</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section - Norton Case Study */}
      <section id="results" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-stone-900 mb-6 sm:mb-8">
              <span className="text-electric-blue-500">Marketing Psychology</span>
              <br />That Actually Works
            </h2>
          </div>

          {/* Norton Case Study Card */}
          <div className="bg-gradient-to-br from-blue-800 to-slate-700 p-6 sm:p-8 rounded-3xl shadow-2xl text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-6 sm:mb-8">
                <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mr-6">
                  <span className="text-2xl font-black">N</span>
                </div>
                <div>
                  <h3 className="text-3xl font-bold">Norton Antivirus</h3>
                  <p className="text-stone-300">Global Affiliate Program Transformation</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className="text-center">
                  <div className="text-4xl font-black text-red-400 mb-2">$100K</div>
                  <div className="text-stone-300">Monthly Revenue</div>
                  <div className="text-sm text-stone-400">Before Psychology</div>
                </div>
                <div className="text-center">
                  <div className="text-6xl text-orange-400 mb-2">→</div>
                  <div className="text-stone-300 font-bold">Applied Marketing</div>
                  <div className="text-sm text-stone-400">Psychology Principles</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-black text-green-400 mb-2">$3M+</div>
                  <div className="text-stone-300">Monthly Revenue</div>
                  <div className="text-sm text-stone-400">After Psychology</div>
                </div>
              </div>
              
              <div className="bg-slate-800/50 p-6 rounded-xl">
                <h4 className="text-xl font-bold mb-4 text-orange-400">Psychology Principles Applied:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>• Loss aversion messaging</div>
                  <div>• Social proof integration</div>
                  <div>• Authority positioning</div>
                  <div>• Scarcity triggers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section with Interactive Cards */}
      <section id="services" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-stone-900 mb-6 sm:mb-8">
              Fractional CMO
              <br />
              <span className="text-orange-500">Psychology</span> Services
            </h2>
            <p className="text-xl text-stone-700 max-w-3xl mx-auto">
              Strategic marketing leadership without the $300K+ salary commitment
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                title: "Psychology Audit",
                subtitle: "3-month minimum",
                price: "$5K-8K/month",
                features: [
                  "Customer awareness analysis",
                  "Conversion funnel psychology",
                  "Value proposition reconstruction",
                  "Trust signal optimization",
                  "Team psychology training"
                ],
                color: "stone",
                index: 0
              },
              {
                title: "Growth Strategy",
                subtitle: "6-month engagement",
                price: "$8K-12K/month",
                features: [
                  "Everything in Audit",
                  "Monthly strategy sessions",
                  "A/B testing psychology",
                  "Customer lifetime value",
                  "Team coaching program"
                ],
                color: "orange",
                index: 1
              },
              {
                title: "Fractional CMO",
                subtitle: "12-month partnership",
                price: "$12K-18K/month",
                features: [
                  "Everything in Growth",
                  "Weekly leadership participation",
                  "Team hiring guidance",
                  "Board presentations",
                  "Complete transformation"
                ],
                color: "stone",
                index: 2
              }
            ].map((service) => (
              <div 
                key={service.index}
                className={`relative group cursor-pointer transition-all duration-500 transform ${
                  hoveredCard === service.index ? 'scale-105 -rotate-1' : 'hover:scale-102'
                }`}
                onMouseEnter={() => setHoveredCard(service.index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className={`p-6 sm:p-8 rounded-3xl shadow-xl border-2 transition-all duration-500 ${
                  service.color === 'orange' 
                    ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white border-orange-400'
                    : 'bg-white border-gray-200 hover:border-orange-300'
                }`}>
                  <div className="mb-6">
                    <h3 className={`text-2xl font-black mb-2 ${
                      service.color === 'orange' ? 'text-white' : 'text-slate-900'
                    }`}>
                      {service.title}
                    </h3>
                    <p className={`text-sm font-medium ${
                      service.color === 'orange' ? 'text-orange-100' : 'text-slate-600'
                    }`}>
                      {service.subtitle}
                    </p>
                    <div className={`text-3xl font-black mt-4 ${
                      service.color === 'orange' ? 'text-white' : 'text-orange-500'
                    }`}>
                      {service.price}
                    </div>
                  </div>
                  
                  <ul className="space-y-3 mb-6 sm:mb-8">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className={`flex items-center ${
                        service.color === 'orange' ? 'text-orange-100' : 'text-slate-700'
                      }`}>
                        <span className={`mr-3 ${
                          service.color === 'orange' ? 'text-orange-200' : 'text-orange-500'
                        }`}>•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <button className={`w-full py-3 rounded-xl font-bold transition-all duration-300 ${
                    service.color === 'orange'
                      ? 'bg-white text-orange-600 hover:bg-orange-50'
                      : 'bg-blue-900 text-white hover:bg-blue-800'
                  }`}>
                    Get Started
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section - Ian's Background */}
      <section id="about" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-900 via-slate-800 to-blue-900 text-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-40 h-40 bg-orange-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-60 h-60 bg-orange-500/3 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-4xl md:text-5xl font-black mb-6 sm:mb-8">
              Meet Your <span className="text-orange-400">American</span>
              <br />Marketing Expert
            </h2>
            <p className="text-xl text-stone-300 max-w-3xl mx-auto">
              20+ years turning marketing psychology into measurable revenue growth
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Ian's Story */}
            <div className="space-y-8">
              <div className="bg-slate-800/50 p-6 sm:p-8 rounded-2xl border border-slate-700/50">
                <h3 className="text-2xl font-bold text-orange-400 mb-4">The \"Super Affiliate\" Background</h3>
                <p className="text-stone-300 leading-normal mb-4">
                  I've spent <span className="font-bold text-white">$500K/month of my own money</span> testing what actually converts customers. Not theory - real results with real consequences.
                </p>
                <p className="text-stone-300 leading-normal">
                  Now I bring those battle-tested psychology principles to help business owners communicate their value in ways that actually drive revenue.
                </p>
              </div>

              <div className="bg-slate-800/50 p-6 sm:p-8 rounded-2xl border border-slate-700/50">
                <h3 className="text-2xl font-bold text-orange-400 mb-4">The Bangkok Advantage</h3>
                <p className="text-stone-300 leading-normal mb-4">
                  Based in Bangkok, I serve Asian companies who want <span className="font-bold text-white">American marketing excellence</span> at regional rates.
                </p>
                <p className="text-stone-300 leading-normal">
                  Perfect for companies expanding to US markets or those seeking proven Western marketing psychology expertise.
                </p>
              </div>

              <div className="bg-slate-800/50 p-6 sm:p-8 rounded-2xl border border-slate-700/50">
                <h3 className="text-2xl font-bold text-orange-400 mb-4">Industries Proven In</h3>
                <div className="grid grid-cols-2 gap-4 text-stone-300">
                  <div>• Software/SaaS</div>
                  <div>• Healthcare</div>
                  <div>• Fashion/E-commerce</div>
                  <div>• Financial Services</div>
                  <div>• Fitness/Wellness</div>
                  <div>• Legal Services</div>
                  <div>• Food & Beverage</div>
                  <div>• Professional Services</div>
                </div>
              </div>
            </div>

            {/* Right: Stats & Credibility */}
            <div className="space-y-8">
              <div className="text-center p-6 sm:p-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl shadow-2xl">
                <div className="text-6xl font-black text-white mb-4">$3M+</div>
                <div className="text-xl font-bold text-orange-100 mb-2">Monthly Revenue Generated</div>
                <div className="text-orange-200">Norton Antivirus Case Study</div>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <div className="text-center p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50">
                  <div className="text-3xl font-black text-orange-400 mb-2">20+</div>
                  <div className="text-stone-300">Years Experience</div>
                </div>
                <div className="text-center p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50">
                  <div className="text-3xl font-black text-orange-400 mb-2">7</div>
                  <div className="text-stone-300">Industries</div>
                </div>
                <div className="text-center p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50">
                  <div className="text-3xl font-black text-orange-400 mb-2">$500K</div>
                  <div className="text-stone-300">Monthly Ad Spend</div>
                </div>
                <div className="text-center p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50">
                  <div className="text-3xl font-black text-orange-400 mb-2">8</div>
                  <div className="text-stone-300">Client Limit</div>
                </div>
              </div>

              {/* LinkedIn Connection */}
              <div className="bg-slate-800/50 p-6 sm:p-8 rounded-2xl border border-slate-700/50 text-center">
                <h4 className="text-xl font-bold text-white mb-4">Connect & Verify</h4>
                <p className="text-stone-300 mb-6">
                  See my full background and recommendations on LinkedIn
                </p>
                <a 
                  href="https://www.linkedin.com/in/ian-ho/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                  </svg>
                  View LinkedIn Profile
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section with Traditional CTA */}
      <section id="contact" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-800 to-blue-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6 sm:mb-8">
            Ready to <span className="text-orange-400">Stop</span>
            <br />Losing Revenue?
          </h2>
          <p className="text-xl text-stone-300 mb-6 sm:mb-8">
            Get your free marketing psychology audit and see exactly where your messaging is broken
          </p>
          
          {/* Traditional Contact Form */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-2xl max-w-lg mx-auto">
            <form className="space-y-6">
              <div className="text-left">
                <label htmlFor="name" className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300" 
                  placeholder="Your name"
                />
              </div>
              
              <div className="text-left">
                <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-2">Business Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300" 
                  placeholder="your@company.com"
                />
              </div>
              
              <div className="text-left">
                <label htmlFor="revenue" className="block text-sm font-bold text-slate-700 mb-2">Annual Revenue</label>
                <select 
                  id="revenue" 
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300"
                >
                  <option value="">Select range</option>
                  <option value="500k-1m">$500K - $1M</option>
                  <option value="1m-5m">$1M - $5M</option>
                  <option value="5m+">$5M+</option>
                </select>
              </div>
              
              <div className="text-left">
                <label htmlFor="challenge" className="block text-sm font-bold text-slate-700 mb-2">Biggest Marketing Challenge</label>
                <textarea 
                  id="challenge" 
                  rows={4} 
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300" 
                  placeholder="Describe your main marketing challenge..."
                ></textarea>
              </div>
              
              {/* Traditional CTA Button */}
              <button 
                type="submit" 
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-black text-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                🚀 Get My Free Psychology Audit
              </button>
              
              <p className="text-xs text-gray-500 mt-4">
                Limited to 8 clients • Bangkok timezone • 90-day improvement guarantee
              </p>
            </form>
          </div>
          
          {/* Alternative CTA */}
          <div className="mt-8 sm:mt-12">
            <button className="bg-transparent border-2 border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white px-8 py-3 rounded-xl font-bold transition-all duration-300">
              📅 Schedule 30-Min Strategy Call
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-slate-800 to-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <div className="flex items-center justify-center mb-4">
              <h2 className="text-3xl font-bold text-white">REBOOT <span className="text-orange-500">MEDIA</span></h2>
            </div>
            <p className="text-stone-400 max-w-2xl mx-auto">
              American marketing psychology expertise for Asian companies ready to break through growth plateaus
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="text-center">
              <h4 className="font-bold mb-4 text-orange-400">Services</h4>
              <ul className="space-y-2 text-stone-400">
                <li>Marketing Psychology Audit</li>
                <li>Growth Strategy</li>
                <li>Fractional CMO</li>
              </ul>
            </div>
            
            <div className="text-center">
              <h4 className="font-bold mb-4 text-orange-400">Company</h4>
              <ul className="space-y-2 text-stone-400">
                <li>Reboot Media, Inc.</li>
                <li>Bangkok, Thailand</li>
                <li>American Expertise</li>
              </ul>
            </div>
            
            <div className="text-center">
              <h4 className="font-bold mb-4 text-orange-400">Proven Results</h4>
              <ul className="space-y-2 text-stone-400">
                <li>$100K → $3M Growth</li>
                <li>7 Industries</li>
                <li>20+ Years Experience</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 text-center">
            <p className="text-stone-500">&copy; 2025 Reboot Media, Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App