'use client';

import React, { useState, useEffect } from "react";
import publicApi from "../../../lib/publicApi";
// import PaymentGateway from "./paymentGateway";
import usePaymentGateway from "../../../hooks/usePaymentGateway";
import { useUserAuth } from "../../../hooks/useUserAuth";
import { useUserModal } from "../../../hooks/useUserModal";

const Courses = () => {
  // const courses = [
  //   {
  //     id: "beginner-ai-foundations",
  //     title: "🚀 Beginner Level: AI Foundations",
  //     value: "❌ ₹6,999",
  //     earlyBird: "✅ ₹4,999",
  //     earlybirdtitle: "Early Bird-Only 20 Seats left!!",
  //     price: 4999,
  //     description:
  //       "From Zero to AI Hero in Record Time. Perfect for students with no prior AI experience.",
  //     duration: "8-10 hours (Flexible weekend/weekday schedule)",
  //     features: [
  //       "Introduction to AI and Machine Learning concepts",
  //       "Learn 10+ AI tools",
  //       "Prompt engineering fundamentals",
  //       "Basic automation with AI assistants",
  //       "AI ethics and responsible usage",
  //       "Creating your first AI-powered project",
  //     ],
  //   },
  //   {
  //     id: "intermediate-ai-implementation",
  //     title: "⚡ Intermediate Level: AI Implementation",
  //     value: "❌ ₹9,999",
  //     earlyBird: "✅ ₹7,499",
  //     earlybirdtitle: "Limited Seats!",
  //     price: 7499,
  //     description:
  //       "Master AI Tools That Industry Leaders Use Daily. Perfect for students with basic AI knowledge or who have completed the Beginner Level.",
  //     duration: "8-10 hours (Flexible weekend/weekday schedule)",
  //     features: [
  //       "Advanced prompt engineering and chain-of-thought techniques",
  //       "AI workflow automation",
  //       "Data analysis with AI tools",
  //       "AI-powered content creation and marketing",
  //       "No-code AI app development",
  //       "Building AI-enhanced business solutions",
  //     ],
  //   },
  //   {
  //     id: "advanced-ai-innovation",
  //     title: "🎯 Advanced Level: AI Innovation, Strategy, and Capstone Project",
  //     value: "❌ ₹24,999",
  //     earlyBird: "✅ ₹19,999",
  //     earlybirdtitle: "Early Bird -10 Seats Left!",
  //     price: 19999,
  //     description:
  //       "Build Real-World AI Solutions Like Silicon Valley Pros. Perfect for students ready to lead AI initiatives or who have completed the Intermediate Level.",
  //     duration: "8-10 hours (Flexible weekend/weekday schedule)",
  //     features: [
  //       "Real-World Capstone Project: Develop a complete AI solution for an actual business problem",
  //       "Custom AI model fine-tuning and integration",
  //       "End-to-end AI product development",
  //       "AI strategy and implementation roadmaps",
  //       "Industry-specific AI applications",
  //       "Portfolio-ready projects that impress employers",
  //     ],
  //   },
  // ];

  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formUrl = "https://forms.gle/r1YpmDKVj7U3AdJ3A";

  function CourseCard({ course, useForm, formUrl }) {
    const {user} = useUserAuth();
    const { openLogin } = useUserModal();

    const { initiatePayment, loading, isDisabled } = usePaymentGateway({
      courseId: course._id,
      courseName: course.name,
    });

    const isEnrolled = Array.isArray(user?.courses) && user.courses.some(c => {
      const cid = c?.courseId?._id || c.courseId;
      return String(cid) === String(course._id);
    });

    const onClick = () => {
      if(isEnrolled) return;
      if(!user) return openLogin();
      if(useForm && formUrl) {
        window.open(formUrl, "_blank", "noopener,noreferrer");
        return;
      }
      initiatePayment();
    }


    const disabled = isEnrolled || (!useForm && isDisabled);
  
    return (
      <div className="w-full text-center sm:w-[22rem] md:w-[22rem] relative bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between">
        <div>
          <h3 className="text-2xl font-semibold text-white mb-4">{course.name}</h3>
          <div className="mb-4 mt-2">
            <div className="text-xl text-slate-400 line-through">₹{course.price}</div>
            <div className="text-2xl font-bold text-emerald-400">
              ₹{course.discountPrice} <span className="text-xs text-slate-400">({course.earlyBirdTitle})</span>
            </div>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">{course.description}</p>
          <div className="text-sm font-medium mt-4 mb-4 text-emerald-300">⏳ {course.duration}</div>
          <ul className="space-y-3 text-start">
            {course.features.map((f, i) => (
              <li key={i} className="flex items-start text-slate-300 text-sm">
                <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                {f}
              </li>
            ))}
          </ul>
        </div>
  
        <button
          onClick={onClick}
          disabled={disabled}
          className="w-full bg-emerald-500 text-white font-semibold py-3 px-4 rounded-lg hover:bg-emerald-600 transition duration-300 shadow-md hover:shadow-emerald-400/40 disabled:bg-gray-500 disabled:cursor-not-allowed cursor-pointer"
        >
          {isEnrolled ? 'Enrolled' : (loading ? 'Processing...' : 'Enroll Now')}
        </button>
      </div>
    );
  }

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const res = await publicApi.get("/api/course");
        const categoriesRes = await publicApi.get("/api/category");
        if (mounted) {
          setCategories(categoriesRes?.data?.categories || []);
          const list = Array.isArray(res?.data?.courses) ? res.data.courses : [];
          // Optionally filter only active courses
          setCourses(list.filter(c => c.isActive));
        }
      } catch (e) {
        if (mounted) setError(e?.response?.data?.msg || e.message || "Failed to load courses");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const coursesForCategory = (categoryId) => {
    return courses.filter(c => {
      if(!Array.isArray(c.categories)) return false;
      return c.categories.some(catRef => String(catRef?._id || catRef) === String(categoryId));
    });
  }

  if (loading) {
    return (
      <section id="courses" className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="text-center text-slate-300">Loading courses...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="courses" className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="text-center text-red-400">{error}</div>
        </div>
      </section>
    );
  }
  

  return (
    <section id="courses" className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Your Path to <span>AI Mastery</span>
          </h2>
        </div>
        <div className="flex flex-col gap-16 ">
          {categories.map((category) => {
            const catCourses = coursesForCategory(category._id);
            if(!catCourses.length) return null;

            return (
              <div key={category._id}>
                <div className="mb-6">
                  <h3 className="text-3xl text-center font-bold text-emerald-400 uppercase text-4xl mb-1">{category.name}</h3>
                  <div className="w-28 h-1 bg-emerald-400 mx-auto mb-6"></div>
                  <p className="text-slate-300 mt-2 text-center text-lg max-w-3xl mx-auto text-bold">{category.description}</p>
                </div>

                <div className="flex flex-wrap justify-center gap-10 mx-auto">
                  {catCourses.map((course, idx) => {
                    const useForm = idx >= catCourses.length - 2;
                    return (
                      <CourseCard key={course._id} course={course} useForm={useForm} formUrl={formUrl} />
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
        

        {/* <div className="mt-24 text-center">
          <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-700 rounded-2xl p-12 max-w-4xl mx-auto shadow-lg hover:shadow-emerald-500/20 transition-all">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Project Examples You'll Create 
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              {[
                "AI-powered customer service chatbot for e-commerce",
                "Predictive analytics dashboard for business insights",
                "Automated content generation system",
                "AI-driven recommendation engine",
              ].map((project, i) => (
                <li
                  key={i}
                  className="flex items-start text-slate-300 text-base"
                >
                  <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full mt-2 mr-3"></span>
                  {project}
                </li>
              ))}
            </ul>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default Courses;
