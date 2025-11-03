'use client';

import React from 'react';

const Bonuses = () => {
  const bonuses = [
    {
      title: "CrewAI Mastery Course",
      value: "₹999",
      description: "Complete video course covering advanced CrewAI techniques and best practices",
      features: ["5+ hours of video content", "Advanced agent patterns", "Production deployment guide"]
    },
    {
      title: "AI Agent Templates Library",
      value: "₹499",
      description: "Ready-to-use agent templates for common business use cases",
      features: ["10+ pre-built agents", "Customizable workflows", "Documentation included"]
    },
    {
      title: "Lifetime Community Access",
      value: "₹500",
      description: "Exclusive community forum with ongoing support and networking opportunities",
      features: ["Expert Q&A sessions", "Peer networking", "Job opportunities board"]
    }
  ];

  return (
    <section id="bonuses" className="py-24 bg-slate-700">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 tracking-tight">
            Exclusive <span className="text-emerald-400">Bonuses</span>
          </h2>
          <div className="w-24 h-1 bg-emerald-400 mx-auto mb-8"></div>
          <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
            Get ₹1,998 worth of exclusive bonuses absolutely free when you register for the workshop
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {bonuses.map((bonus, index) => (
            <div 
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-600/30 rounded-xl p-8 hover:bg-slate-800/70 transition-all duration-300"
            >
              <div className="text-center mb-6">
                <div className="inline-flex items-center px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-sm font-medium mb-4">
                  FREE BONUS
                </div>
                <h3 className="text-2xl font-semibold text-white mb-2">{bonus.title}</h3>
                <div className="text-3xl font-bold text-emerald-400 mb-2">{bonus.value}</div>
                <p className="text-slate-300 text-sm">{bonus.description}</p>
              </div>

              <div className="space-y-3">
                {bonus.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-slate-300 text-sm">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Total Value */}
        <div className="mt-16 text-center">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-600/30 rounded-xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Total Bonus Value</h3>
            <div className="text-4xl font-bold text-emerald-400 mb-2">₹1,998</div>
            <p className="text-slate-300">All included absolutely free with your workshop registration</p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-600/30 rounded-xl p-10 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-4">
              Don't Miss These Exclusive Bonuses
            </h3>
            <p className="text-slate-300 mb-8 text-lg leading-relaxed">
              These bonuses are only available to workshop participants and provide ongoing value long after the event
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <div className="text-slate-300">₹1,998 Total Value</div>
              <div className="text-slate-300">Lifetime Access</div>
              <div className="text-slate-300">Exclusive Content</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bonuses;

