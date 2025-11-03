'use client';

const storiesData = [
  {
    quote:
      "AI Visionary Labs was incredible! I built a complete AI recommendation engine that my internship company actually implemented. The mentors from Amazon and Flipkart showed me exactly how they approach similar problems at scale.",
    author: "Priya S.",
    role: "Computer Science Graduate",
  },
  {
    quote:
      "The hands-on approach in AI Accelerator Elite was game-changing. Learning from a Google AI engineer who shared real project methodologies made all the difference in landing my product role.",
    author: "Rahul K.",
    role: "Business Administration Student",
  },
  {
    quote:
      "Building my capstone project with guidance from industry experts gave me confidence to pitch AI solutions in job interviews. The Women in Product India network opened doors I never knew existed.",
    author: "Ananya M.",
    role: "Engineering Graduate",
  },
];

export default function Stories() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <section  className="bg-slate-900 text-center px-6 lg:px-24 py-16 w-full" id="stories">
      <h2 className="text-center text-4xl md:text-5xl font-bold text-white mb-6">
        Success <span className="text-emerald-400">Stories</span>
      </h2>
      <div className="w-24 h-1 bg-emerald-400 mx-auto mb-8"></div>
      <p className="text-center text-gray-200 mt-2 text-lg">
        Our Students Are Landing Dream Jobs
      </p>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {storiesData.map((story, index) => (
          <div
            key={index}
            className="bg-slate-800 rounded-2xl shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 hover:-translate-y-2  p-6 flex flex-col"
          >
            <p className="text-gray-300 italic mb-4">"{story.quote}"</p>
            <div className="mt-auto">
              <h3 className="text-lg font-semibold text-gray-300">
                {story.author}
              </h3>
              <p className="text-sm text-gray-500">{story.role}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-24 text-center">
        <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-700 rounded-2xl p-12 max-w-4xl mx-auto shadow-lg hover:shadow-emerald-500/20 transition-all">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Future-Proof Your Career?
          </h3>
          <p>The AI revolution is happening now. Don't get left behind.</p>{" "}
          <p>
            Join hundreds of students who've already transformed their career
            prospects with Future Minds Institute.
          </p>{" "}
          <h3 className="text-xl md:text-2xl mt-2">
            Limited seats available for our next cohort starting ....
          </h3>
          <div className=" w-full mt-3">
            <button onClick={()=>scrollToSection('courses')} className="bg-emerald-400 px-5 text-white rounded-md py-2 mt-2 hover:bg-emerald-500 mr-2 cursor-pointer">
              Enroll Now
            </button>
          
          </div>
        </div>
      </div>
    </section>
  );
}
