'use client';

import React from 'react';

const EventDetails = () => {
  return (
    <section id="event-details" className="py-16 sm:py-20 lg:py-24 bg-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 sm:mb-8 tracking-tight">
            Event <span className="text-emerald-400">Details</span>
          </h2>
          <div className="w-16 sm:w-20 lg:w-24 h-1 bg-emerald-400 mx-auto mb-6 sm:mb-8"></div>
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-xs sm:max-w-2xl lg:max-w-4xl mx-auto leading-relaxed px-4">
            Join us for an intensive day of learning and building at one of India's premier educational institutions
          </p>
        </div>

        {/* Cards Grid - Responsive Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {/* Date Card */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-600/30 rounded-xl p-6 sm:p-8 hover:bg-slate-800/70 transition-all duration-300 items-center">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white mb-4 sm:mb-6">Date</h3>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">Monday</div>
              <div className="text-slate-300 text-sm sm:text-base lg:text-lg mb-3 sm:mb-4">08/Sep/2025</div>
              <div className="bg-slate-700/50 border border-slate-600/50 rounded-lg px-3 sm:px-4 py-2 inline-block">
                <span className="text-slate-300 text-xs sm:text-sm font-medium">Stay tuned</span>
              </div>
            </div>
          </div>

          {/* Time Card */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-600/30 rounded-xl p-6 sm:p-8 hover:bg-slate-800/70 transition-all duration-300">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white mb-4 sm:mb-6">Time</h3>
            <div className="text-center">
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">9:00 AM - 4:00 PM</div>
              <div className="text-slate-300 text-sm sm:text-base lg:text-lg mb-3 sm:mb-4">7 Hours of Intensive Learning</div>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-slate-700/50 border border-slate-600/50 rounded-lg px-2 sm:px-3 py-2">
                  <div className="text-slate-400 text-xs font-medium">Start Time</div>
                  <div className="text-white font-semibold text-sm sm:text-base">9:00 AM</div>
                </div>
                <div className="bg-slate-700/50 border border-slate-600/50 rounded-lg px-2 sm:px-3 py-2">
                  <div className="text-slate-400 text-xs font-medium">End Time</div>
                  <div className="text-white font-semibold text-sm sm:text-base">4:00 PM</div>
                </div>
              </div>
            </div>
          </div>

          {/* Venue Card */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-600/30 rounded-xl p-6 sm:p-8 hover:bg-slate-800/70 transition-all duration-300">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white mb-4 sm:mb-6">Venue</h3>
            <div className="text-center">
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2">Alliance University</div>
              <div className="text-slate-300 text-sm sm:text-base lg:text-lg mb-3 sm:mb-4">Bangalore, Karnataka</div>
              <div className="bg-slate-700/50 border border-slate-600/50 rounded-lg px-3 sm:px-4 py-2 inline-block">
                <span className="text-slate-300 text-xs sm:text-sm font-medium">World-class facilities</span>
              </div>
            </div>
          </div>

          {/* Workshop Fee Card */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-600/30 rounded-xl p-6 sm:p-8 hover:bg-slate-800/70 transition-all duration-300">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white mb-4 sm:mb-6">Workshop Fee</h3>
            <div className="text-center">
              <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
                {/* Regular Price */}
                <div className="bg-slate-700/50 border border-slate-600/50 rounded-lg p-3 sm:p-4">
                  <div className="text-slate-400 text-xs sm:text-sm mb-1 sm:mb-2">Regular</div>
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white">₹3,500</div>
                  <div className="text-slate-400 text-xs sm:text-sm">+ GST</div>
                </div>
                
                {/* Student Price */}
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3 sm:p-4 relative">
                  <div className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-emerald-500 text-white text-xs font-bold px-1 sm:px-2 py-1 rounded-full">
                    50% OFF
                  </div>
                  <div className="text-emerald-400 text-xs sm:text-sm mb-1 sm:mb-2">Student</div>
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white">₹1,749</div>
                  <div className="text-slate-400 text-xs sm:text-sm">+ GST</div>
                </div>
              </div>
              <div className="text-slate-300 text-xs sm:text-sm">
                Includes training, materials & certificate
              </div>
            </div>
          </div>
        </div>

        {/* What's Included */}
        <div className="mt-12 sm:mt-16 lg:mt-20">
          <h3 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8 sm:mb-12">What's Included</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-600/30 rounded-xl p-4 sm:p-6 text-center hover:bg-slate-800/70 transition-all duration-300">
              <h4 className="text-white font-semibold mb-2 text-sm sm:text-base">Hands-On Training</h4>
              <p className="text-slate-400 text-xs sm:text-sm">7 hours of practical learning</p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-600/30 rounded-xl p-4 sm:p-6 text-center hover:bg-slate-800/70 transition-all duration-300">
              <h4 className="text-white font-semibold mb-2 text-sm sm:text-base">Certificate</h4>
              <p className="text-slate-400 text-xs sm:text-sm">Official completion certificate</p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-600/30 rounded-xl p-4 sm:p-6 text-center hover:bg-slate-800/70 transition-all duration-300">
              <h4 className="text-white font-semibold mb-2 text-sm sm:text-base">Networking</h4>
              <p className="text-slate-400 text-xs sm:text-sm">Connect with peers & experts</p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-600/30 rounded-xl p-4 sm:p-6 text-center hover:bg-slate-800/70 transition-all duration-300">
              <h4 className="text-white font-semibold mb-2 text-sm sm:text-base">Resources</h4>
              <p className="text-slate-400 text-xs sm:text-sm">Code, materials & references</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 sm:mt-16 lg:mt-20 text-center">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-600/30 rounded-xl p-6 sm:p-8 lg:p-10 max-w-xs sm:max-w-2xl lg:max-w-4xl mx-auto">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-4">
              Ready to Secure Your Spot?
            </h3>
            <p className="text-slate-300 mb-6 sm:mb-8 text-sm sm:text-base lg:text-lg leading-relaxed">
              Limited seats available. Register now to guarantee your place in this transformative workshop.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center items-center text-xs sm:text-sm">
              <div className="text-slate-300">Limited Seats</div>
              <div className="text-slate-300">Student Discount Available</div>
              <div className="text-slate-300">Premium Venue</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;

