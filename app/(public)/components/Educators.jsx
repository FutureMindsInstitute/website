'use client';

import React from "react";
// import swati from "../../../public/assets/educators/swatiawasthi.jpg";
// import subham from "../assets/educators/subhamsharma.jpg";
// import amrit from "../../../public/assets/educators/amritraj.jpg";

const Educators = () => {
  const educators = [
    {
      id: 1,
      name: "Swati Awasthi",
      title: "Founder of Women in Product India",
      image: "/assets/educators/swatiawasthi.jpg",
      bio: "Swati Awasthi is the Founder of Women in Product India, building a thriving community with a sharp vision of advancing women in product leadership & entrepreneurship.",
      experience: [
        "Led AI, SaaS and mobile products at Dell, PwC and Sapient",
        "Worked in the US, UK and India",
        "Led impactful learning experiences through AI PM Mastery cohorts",
        "Speaker at IIM Bangalore's Product Week and IIT Delhi's Tech Week",
        "Tech Leadership Award 2025 by AIM's The Rising",
      ],
      specialties: [
        "AI Product Management",
        "Leadership",
        "Entrepreneurship",
        "Community Building",
      ],
      social: {
        linkedin: "https://www.linkedin.com/in/swati-awasthi/",
        twitter: "#",
      },
      gradient: "from-blue-500 to-purple-600",
    },
    {
      id: 2,
      name: "Amrit Raj",
      title: "Co-Founder, Women in Product India",
      image: "/assets/educators/amritraj.jpg",
      bio: "Amrit Raj has 11+ years in education sector, social media strategist, curious learner, AI enthusiast. Passionate about skilling students to be future ready.",
      experience: [
        "Entrepreneur and Educator with 11+ years of experience in education sector",
        "Ex Xylem, Vedantu and Allen",
        "You tube & Academic Head",
        "Mentors and advises working professionals",
        "Passionate about skilling students to be futurer eady.",
      ],
      specialties: [
        "Entrepreneur and Educator",
        "social media strategist",
        "Mentoring",
        "Technical Leadership",
      ],
      social: {
        linkedin: "https://www.linkedin.com/in/amritraj02/",
        twitter: "#",
      },
      gradient: "from-purple-500 to-pink-600",
    },
  ];

  return (
    <section id="educators" className="py-20 bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Meet Your <span className="text-emerald-400">Educators</span>
          </h2>
          <div className="w-24 h-1 bg-emerald-400 mx-auto mb-8"></div>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Learn from industry leaders who have shaped the AI and product
            landscape across global organizations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {educators.map((educator) => (
            <div
              key={educator.id}
              className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 hover:bg-slate-800/70 hover:border-slate-600 transition-all duration-300 hover:scale-105"
            >
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
                <div className="relative">
                  <div className="w-32 h-32 rounded-2xl overflow-hidden group-hover:scale-110 transition-transform duration-300 border-2 border-slate-600 group-hover:border-blue-400">
                    <img
                      src={educator.image}
                      alt={educator.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${educator.gradient} opacity-20 blur-lg group-hover:opacity-30 transition-opacity duration-300`}
                  ></div>
                </div>

                {/* Basic Info */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">
                    {educator.name}
                  </h3>
                  <p className="text-slate-400 text-lg mb-4 font-medium">
                    {educator.title}
                  </p>

                  <div className="flex gap-3 justify-center md:justify-start">
                    <a
                      href={educator.social.linkedin}
                      className="w-10 h-10 bg-slate-700 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors duration-300"
                    >
                      <svg
                        className="w-5 h-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                    <a
                      href={educator.social.twitter}
                      className="w-10 h-10 bg-slate-700 hover:bg-blue-400 rounded-lg flex items-center justify-center transition-colors duration-300"
                    >
                      <svg
                        className="w-5 h-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <p className="text-slate-300 text-center leading-relaxed group-hover:text-white transition-colors duration-300">
                  {educator.bio}
                </p>
              </div>

              <div className="mb-8">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <svg
                    className="w-5 h-5 text-blue-400 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                  Key Achievements
                </h4>
                <div className="space-y-2 text-start">
                  {educator.experience.map((exp, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <p className="text-slate-400 text-sm group-hover:text-slate-300 transition-colors duration-300">
                        {exp}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <svg
                    className="w-5 h-5 text-purple-400 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  Specialties
                </h4>
                <div className="flex flex-wrap gap-2">
                  {educator.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm border border-slate-600 group-hover:bg-slate-600 group-hover:text-white transition-all duration-300"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400/50 rounded-full group-hover:bg-blue-400 transition-colors duration-300"></div>
              <div className="absolute bottom-4 left-4 w-3 h-3 bg-purple-400/30 rounded-full group-hover:bg-purple-400/50 transition-colors duration-300"></div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-slate-600 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Learn from the Best in the Industry
            </h3>
            <p className="text-slate-300 mb-6 text-lg">
              Our educators bring decades of combined experience from top-tier
              companies and have trained thousands of professionals worldwide.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">15+</div>
                <div className="text-slate-400 text-sm">
                  Years Combined Experience
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">
                  500+
                </div>
                <div className="text-slate-400 text-sm">Students Mentored</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">
                  10+
                </div>
                <div className="text-slate-400 text-sm">Global Companies</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Educators;
