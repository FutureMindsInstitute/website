'use client';

import React from 'react';

const CallToAction = () => {
  return (
    <section id="cta" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #64748b 0%, transparent 50%), 
                           radial-gradient(circle at 75% 75%, #475569 0%, transparent 50%)`
        }}></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main CTA Content */}
          <div className="max-w-4xl mx-auto mb-12 sm:mb-16">
            {/* Badge */}
            <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 border border-emerald-500/30 rounded-full text-emerald-400 text-xs sm:text-sm font-medium mb-6 sm:mb-8">
              <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2 sm:mr-3 animate-pulse"></span>
              Limited Time Student Offer - 68% OFF
            </div>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              Register <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">NOW</span>
            </h2>
            
            <p className="text-lg sm:text-xl md:text-2xl text-slate-300 mb-3 sm:mb-4 font-medium">
              Take your first step into the world of AI agents
            </p>

            <p className="text-base sm:text-lg text-slate-400 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
              Don't miss out on this transformative opportunity. Secure your spot today and join the next generation of AI builders.
            </p>

            {/* Price Highlight */}
            <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-slate-600 rounded-2xl p-6 sm:p-8 mb-8 sm:mb-12 max-w-2xl mx-auto mx-4 sm:mx-auto">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-4 sm:mb-6">
                <div className="text-slate-400 text-xl sm:text-2xl line-through">₹5,497</div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-emerald-400">₹1,749</div>
                <div className="bg-red-500 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full text-sm sm:text-lg font-bold animate-pulse">
                  68% OFF
                </div>
              </div>
              <p className="text-slate-300 text-sm sm:text-base lg:text-lg">
                Complete workshop + ₹1,998 worth of exclusive bonuses + lifetime community access
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-8 sm:mb-12 px-4">
              <button className="group bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-8 sm:px-12 py-4 sm:py-6 rounded-full text-lg sm:text-xl font-bold hover:from-emerald-400 hover:to-blue-400 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-emerald-500/25 w-full sm:w-auto">
                <span className="flex items-center justify-center">
                  Register Now
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 ml-2 sm:ml-3 group-hover:translate-x-2 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
              
              <button className="group border-2 border-slate-400 text-slate-300 px-6 sm:px-8 py-4 sm:py-6 rounded-full text-base sm:text-lg font-semibold hover:border-white hover:text-white hover:bg-slate-800/50 transition-all duration-300 w-full sm:w-auto">
                <span className="flex items-center justify-center">
                  Contact Us
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:rotate-12 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center text-slate-400 text-sm sm:text-base px-4">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></div>
                Secure Payment
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></div>
                Instant Confirmation
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></div>
                Money Back Guarantee
              </div>
            </div>
          </div>

          {/* Urgency Section */}
          <div className="max-w-5xl mx-auto px-4">
            {/* Final Value Props */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-blue-500 rounded-full"></div>
                  </div>
                </div>
                <h4 className="text-lg sm:text-xl font-semibold text-white mb-2">Immediate Impact</h4>
                <p className="text-slate-400 text-sm sm:text-base">Start building AI agents from day one</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-purple-500 rounded-full"></div>
                  </div>
                </div>
                <h4 className="text-lg sm:text-xl font-semibold text-white mb-2">Expert Network</h4>
                <p className="text-slate-400 text-sm sm:text-base">Connect with industry professionals</p>
              </div>

              <div className="text-center sm:col-span-2 lg:col-span-1">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-emerald-500 rounded-full"></div>
                  </div>
                </div>
                <h4 className="text-lg sm:text-xl font-semibold text-white mb-2">Lifetime Value</h4>
                <p className="text-slate-400 text-sm sm:text-base">Skills that grow with the industry</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;

