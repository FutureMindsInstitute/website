'use client';
import React, { useEffect, useMemo, useState } from "react";
import publicApi from "../../../lib/publicApi";
import { useUserAuth } from "../../../hooks/useUserAuth";

const Dashboard = () => {
  const { user, isAuthenticated, logout} = useUserAuth();
  const [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch all courses, then filter to the ones the user owns
        const res = await publicApi.get("/api/course");
        const list = Array.isArray(res?.data?.courses) ? res.data.courses : [];

        if (!mounted) return;
        setAllCourses(list);
      } catch (e) {
        if (!mounted) return;
        setError(e?.response?.data?.msg || e.message || "Failed to load courses");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    if (isAuthenticated) load();
    else {
      setLoading(false);
      setError("You are not logged in.");
    }

    return () => { mounted = false; };
  }, [isAuthenticated]);

  // Build the list of courses the user owns with order info (start/end/price)
  const enrolledCourses = useMemo(() => {
    if (!user || !Array.isArray(user.courses)) return [];
    console.log(user.courses);
    const byId = new Map(allCourses.map((c) => [String(c._id), c]));
    return user.courses
      .map((uc) => {
        const id = String(uc?.courseId?._id || uc?.courseId);
        const meta = byId.get(id);
        if (!meta) return null;
        return {
          _id: meta._id,
          name: meta.name,
          description: meta.description,
          duration: meta.duration,
          features: meta.features || [],
          price: uc.price ?? meta.price,
          isActive: meta.isActive,
          startDate: uc.startDate ? new Date(uc.startDate) : null,
          endDate: uc.endDate ? new Date(uc.endDate) : null,
          razorpay_order_id: uc.razorpay_order_id,
          razorpay_payment_id: uc.razorpay_payment_id,
        };
      })
      .filter(Boolean);
  }, [user, allCourses]);

  if (loading) {
    return (
      <section className="py-16 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 text-slate-300">
          Loading your dashboard...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 text-red-400">
          {error}
        </div>
      </section>
    );
  }

  const duration = (startDate, endDate) => {
    if (!endDate) return "Lifetime access";
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 30) {
      return `${diffDays} days`;
    } else if (diffDays >= 30 && diffDays < 365) {
      return `${Math.ceil(diffDays / 30)} months`;
    } else if (diffDays >= 365) {
      return `${Math.ceil(diffDays / 365)} years`;
    }
    return "Lifetime access";
  };

  return (
    <section className="h-screen py-16 bg-slate-900">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <button
            onClick={logout}
            className="absolute top-10 right-10 border bg-emerald-500 hover:bg-emerald-600 border-slate-700 rounded-md px-4 py-2 text-slate-300 hover:text-white transition-colors duration-200 font-medium text-sm cursor-pointer"
        >
            Logout
        </button>
        <div className="mb-10">
          <h1 className="text-4xl text-center font-bold text-white">Welcome{user?.name ? `, ${user.name}` : ""}</h1>
          <p className="text-slate-300 text-center mt-2 pb-10">
            Here are your enrolled courses.
          </p>
        </div>

        {(user?.courses?.length ?? 0) === 0 ? (
          <div className="text-slate-300">You haven't enrolled in any course yet.</div>
        ) : (
          <div className="flex flex-row flex-wrap gap-8 cursor-pointer">
            {enrolledCourses.map((course) => (
              <div
                key={course._id}
                className="w-full md:w-[calc(33.333%-21.333px)] min-w-[280px] bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 hover:-translate-y-1"
              >
                <h3 className="text-2xl font-semibold text-white mb-3">
                  {course.name}
                </h3>

                <div className="mb-3">
                  <div className="text-emerald-400 font-bold text-xl">₹{course.price}</div>
                  <div className="text-xs text-slate-400 mt-1">{course.duration}</div>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed line-clamp-3">
                  {course.description}
                </p>

                {course.endDate && (
                  <div className="text-sm font-medium mt-4 mb-3 text-emerald-300">
                    ⏳ {duration(Date.now(), course.endDate)} left
                  </div>
                )}

                <ul className="space-y-2 text-start mb-4">
                  {(course.features || []).slice(0, 4).map((f, i) => (
                    <li key={i} className="flex items-start text-slate-300 text-sm">
                      <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;