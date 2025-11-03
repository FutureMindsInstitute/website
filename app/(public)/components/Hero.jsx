'use client';

import React from "react";

const Hero = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className=" bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 30%, #64748b 0%, transparent 50%), 
                           radial-gradient(circle at 70% 70%, #475569 0%, transparent 50%)`,
          }}
        ></div>
      </div>

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-slate-600/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-slate-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-32 pb-16 sm:pb-20 lg:pb-24">
        <div className="text-center">
          <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-slate-800/50 backdrop-blur-sm border border-slate-600/30 rounded-full text-slate-200 text-xs sm:text-sm font-medium mb-8 sm:mb-12">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-400 rounded-full mr-2 sm:mr-3"></span>
            <span className="hidden sm:inline">
              Powered By WIP(Women In Product) India
            </span>
            <span className="sm:hidden">AI Agent Workshop</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 sm:mb-8 leading-tight tracking-tight">
            <span className="text-white">
              Master Tomorrow's Essential Skills Today
            </span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-slate-300 mb-6 sm:mb-8 font-light tracking-wide">
            Design. Deploy. Dominate the AI Era
          </p>

          <p className="text-sm sm:text-base md:text-lg text-slate-400 mb-12 sm:mb-16 max-w-xs sm:max-w-2xl lg:max-w-4xl mx-auto leading-relaxed px-4">
            Join Future Minds Institute, powered by Women in Product India,
            where students transform into AI-ready professionals through
            hands-on training in cutting-edge AI tools.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-16 sm:mb-20">
            <button
              onClick={() => scrollToSection("courses")}
              className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Explore Courses
            </button>

            <button
              onClick={() => scrollToSection("about")}
              className="w-full sm:w-auto border border-slate-600 text-slate-300 hover:text-white hover:border-slate-500 px-8 sm:px-10 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold transition-all duration-200"
            >
              Start Your Journey
            </button>
          </div>

          {/* Clean Key Features */}
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-xs sm:max-w-2xl lg:max-w-4xl mx-auto">
            <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 sm:p-6 lg:p-8 hover:bg-slate-800/50 transition-all duration-300">
              <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-white mb-2 sm:mb-3">
                No-Code Friendly
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Build CrewAI agents with drag-and-drop ease and visual workflows
              </p>
            </div>

            <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 sm:p-6 lg:p-8 hover:bg-slate-800/50 transition-all duration-300">
              <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-white mb-2 sm:mb-3">
                Python-Powered
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Learn coding agents with full support and mentorship included
              </p>
            </div>

            <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 sm:p-6 lg:p-8 hover:bg-slate-800/50 transition-all duration-300 sm:col-span-2 lg:col-span-1">
              <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-white mb-2 sm:mb-3">
                Beginner-Friendly
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                No prior AI/ML expertise required - just curiosity and
                enthusiasm
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Hero;
