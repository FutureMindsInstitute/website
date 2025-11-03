'use client';

import React from 'react';

const Agenda = () => {
  const agendaItems = [
    { time: "9:00 AM", title: "Registration & Welcome", type: "registration" },
    { time: "9:15 AM", title: "Introduction & Workshop Goals", type: "intro" },
    { time: "9:45 AM", title: "Introduction to Agentic Systems", type: "theory" },
    { time: "10:15 AM", title: "Strategic Framework for Agentic Products", type: "theory" },
    { time: "11:00 AM", title: "Product Development Lifecycle for Agentic Systems", type: "theory" },
    { time: "11:30 AM", title: "Metrics & Success Measurement", type: "theory" },
    { time: "12:00 PM", title: "Lunch Break", type: "break" },
    { time: "1:00 PM", title: "Getting Started with CrewAI (Hands-On)", type: "hands-on" },
    { time: "1:30 PM", title: "Tools Deep Dive: Equipping Agents with Multiple Tools (Hands-On)", type: "hands-on" },
    { time: "2:00 PM", title: "Structuring a Multi-Agent System – Communication & Orchestration (Hands-On)", type: "hands-on" },
    { time: "2:45 PM", title: "Memory Management for Multi-Agent Systems (Hands-On)", type: "hands-on" },
    { time: "3:15 PM", title: "Agent Evaluation & Performance Metrics (Hands-On)", type: "hands-on" },
    { time: "3:35 PM", title: "Deployment Considerations & Best Practices", type: "theory" },
    { time: "3:45 PM", title: "Wrap-Up & Next Steps", type: "conclusion" },
    { time: "4:00 PM", title: "Networking & Doubts", type: "networking" }
  ];

  const getTypeColor = (type) => {
    switch (type) {
      case 'registration': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'intro': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'theory': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'hands-on': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'break': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'conclusion': return 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30';
      case 'networking': return 'bg-pink-500/20 text-pink-400 border-pink-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <section id="agenda" className="py-16 sm:py-20 lg:py-24 bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 sm:mb-8 tracking-tight">
            Workshop <span className="text-emerald-400">Agenda</span>
          </h2>
          <div className="w-16 sm:w-20 lg:w-24 h-1 bg-emerald-400 mx-auto mb-6 sm:mb-8"></div>
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-xs sm:max-w-2xl lg:max-w-4xl mx-auto leading-relaxed px-4">
            A comprehensive day-long journey from theory to practice, designed to transform you into an AI agent expert
          </p>
        </div>

        {/* Timeline - Mobile First */}
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line - Hidden on mobile, visible on desktop */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-400 via-slate-600 to-emerald-400"></div>

          {agendaItems.map((item, index) => (
            <div key={index} className="relative flex items-center mb-6 sm:mb-8 last:mb-0">
              {/* Timeline Dot */}
              <div className={`absolute left-4 md:left-1/2 transform -translate-x-1/2 w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 sm:border-4 border-slate-900 z-10 ${
                item.type === 'hands-on' ? 'bg-orange-400' :
                item.type === 'theory' ? 'bg-purple-400' :
                item.type === 'break' ? 'bg-yellow-400' :
                item.type === 'registration' ? 'bg-emerald-400' :
                item.type === 'intro' ? 'bg-blue-400' :
                item.type === 'conclusion' ? 'bg-indigo-400' :
                item.type === 'networking' ? 'bg-pink-400' :
                'bg-slate-400'
              }`}></div>

              {/* Content Card - Mobile: Full width, Desktop: Alternating sides */}
              <div className={`ml-12 md:ml-0 ${index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'} md:w-1/2`}>
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-600/30 rounded-xl p-4 sm:p-6 hover:bg-slate-800/70 hover:border-slate-600 transition-all duration-300 group">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
                    <span className="text-emerald-400 font-semibold text-xs sm:text-sm bg-emerald-400/10 px-2 sm:px-3 py-1 rounded-full border border-emerald-400/20 w-fit">
                      {item.time}
                    </span>
                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium border w-fit ${getTypeColor(item.type)}`}>
                      {item.type.replace('-', ' ')}
                    </span>
                  </div>
                  <h3 className="text-white font-semibold text-sm sm:text-base lg:text-lg group-hover:text-emerald-300 transition-colors duration-300 leading-tight">
                    {item.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-12 sm:mt-16 lg:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
          <div className="text-center bg-slate-800/50 backdrop-blur-sm border border-slate-600/30 rounded-xl p-4 sm:p-6 hover:bg-slate-800/70 transition-all duration-300">
            <div className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">7</div>
            <div className="text-slate-400 text-xs sm:text-sm">Total Hours</div>
          </div>
          <div className="text-center bg-slate-800/50 backdrop-blur-sm border border-slate-600/30 rounded-xl p-4 sm:p-6 hover:bg-slate-800/70 transition-all duration-300">
            <div className="text-2xl sm:text-3xl font-bold text-orange-400 mb-1 sm:mb-2">5</div>
            <div className="text-slate-400 text-xs sm:text-sm">Hands-On Sessions</div>
          </div>
          <div className="text-center bg-slate-800/50 backdrop-blur-sm border border-slate-600/30 rounded-xl p-4 sm:p-6 hover:bg-slate-800/70 transition-all duration-300">
            <div className="text-2xl sm:text-3xl font-bold text-purple-400 mb-1 sm:mb-2">6</div>
            <div className="text-slate-400 text-xs sm:text-sm">Theory Modules</div>
          </div>
          <div className="text-center bg-slate-800/50 backdrop-blur-sm border border-slate-600/30 rounded-xl p-4 sm:p-6 hover:bg-slate-800/70 transition-all duration-300">
            <div className="text-2xl sm:text-3xl font-bold text-emerald-400 mb-1 sm:mb-2">1</div>
            <div className="text-slate-400 text-xs sm:text-sm">Networking Hour</div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 sm:mt-16 lg:mt-20 text-center">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-600/30 rounded-xl p-6 sm:p-8 lg:p-10 max-w-xs sm:max-w-2xl lg:max-w-4xl mx-auto">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-4">
              Perfect Balance of Theory & Practice
            </h3>
            <p className="text-slate-300 mb-6 sm:mb-8 text-sm sm:text-base lg:text-lg leading-relaxed">
              Our carefully crafted agenda ensures you get both the foundational knowledge and practical experience needed to succeed with AI agents.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center items-center text-xs sm:text-sm">
              <div className="text-slate-300">Strategic Frameworks</div>
              <div className="text-slate-300">Hands-On Building</div>
              <div className="text-slate-300">Peer Networking</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Agenda;

