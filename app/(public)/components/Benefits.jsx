'use client';

import React from "react";

const benefits = [
  {
    title: "Job-Ready Skills",
    desc: "Master the exact AI tools and methodologies that leading companies are implementing today.",
    icon: "🎯",
  },
  {
    title: "Silicon Valley Expertise in India",
    desc: "Learn from industry veterans currently solving AI challenges at Google, Microsoft, Amazon, Meta, and top Indian unicorns.",
    icon: "🌟",
  },
  {
    title: "Real-World Problem Solving",
    desc: "Experts share live case studies and methodologies they use daily to solve million-dollar business problems.",
    icon: "📈",
  },
  {
    title: "Lifelong Network",
    desc: "Join a community of AI-forward professionals and continue learning beyond the classroom.",
    icon: "🤝",
  },
  {
    title: "Portfolio Development",
    desc: "Build a comprehensive portfolio of AI projects that showcase your capabilities to employers.",
    icon: "💼",
  },
  {
    title: "Continuous Updates",
    desc: "Stay current with the latest AI tools and trends through our alumni network and workshops.",
    icon: "🔄",
  },
];

const BenefitsSection = () => {
  return (
    <section id="benefits" className="py-16 bg-slate-800 text-center jj">
      <h3 className="text-3xl md:text-5xl font-bold text-center text-white mb-12">
        Why Future Minds Institute{" "}
        <span className="text-emerald-400">Graduates Stand Out</span>
      </h3>
      <div className="w-24 h-1 bg-emerald-400 mx-auto mb-8"></div>

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-slate-900 shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 hover:-translate-y-2 rounded-2xl p-6 "
            >
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold text-gray-400 mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-500">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;

