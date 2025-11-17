'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import publicApi from "../../../lib/publicApi";
import usePaymentGateway from "../../../hooks/usePaymentGateway";
import { useUserAuth } from "../../../hooks/useUserAuth";
import { useUserModal } from "../../../hooks/useUserModal";
import Navbar from "./Navbar";
import Footer from "./Footer";
import LoginModal from "./modals/login";
import SignupModal from "./modals/signup";
import BillingModal from "./modals/Billing";

const CourseDetail = ({ courseId }) => {
  const router = useRouter();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useUserAuth();
  const { openLogin, openBilling } = useUserModal();

  const { initiatePayment, loading: paymentLoading, isDisabled } = usePaymentGateway({
    courseId: course?._id,
    courseName: course?.name,
  });

  const isEnrolled = Array.isArray(user?.courses) && user.courses.some(c => {
    const cid = c?.courseId?._id || c.courseId;
    return String(cid) === String(course?._id);
  });

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const res = await publicApi.get(`/api/course/${courseId}`);
        if (mounted) {
          if (res?.data?.success && res.data.course) {
            setCourse(res.data.course);
          } else {
            setError('Course not found');
          }
        }
      } catch (e) {
        if (mounted) {
          setError(e?.response?.data?.msg || e.message || "Failed to load course");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [courseId]);

  const handleEnroll = () => {
    if (isEnrolled) return;
    if (!user) return openLogin();
    openBilling(course);
  };

  const handleCopyLink = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy link');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-primary-dark">
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-20">
          <div className="text-center text-slate-300">Loading course...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-primary-dark">
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-20">
          <div className="text-center text-red-400">{error || 'Course not found'}</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-dark">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-12">
        {/* Back Button */}
        <button
          onClick={() => router.push('/#courses')}
          className="mb-8 flex items-center gap-2 text-slate-300 hover:text-emerald-400 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Courses
        </button>

        {/* Course Header */}
        <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 md:p-12 mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{course.name}</h1>
          <p className="text-xl text-slate-300 leading-relaxed mb-6">{course.description}</p>
          
          <div className="flex flex-wrap items-center gap-6 mb-6">
            <div className="flex items-center gap-2 text-emerald-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">{course.duration}</span>
            </div>
            {course.categories && course.categories.length > 0 && (
              <div className="flex items-center gap-2">
                {course.categories.map((cat) => (
                  <span
                    key={cat._id || cat}
                    className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-medium"
                  >
                    {cat.name || cat}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Pricing */}
          <div className="bg-slate-900/50 rounded-xl p-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="text-2xl text-slate-400 line-through mb-1">₹{course.price}</div>
                <div className="text-4xl font-bold text-emerald-400">
                  ₹{course.discountPrice} <span className="text-lg text-slate-400">({course.earlyBirdTitle})</span>
                </div>
                <span className="text-sm text-slate-400">18% GST Applied</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleCopyLink}
                  className="flex items-center justify-center gap-2 bg-slate-700 text-white font-semibold py-3 px-6 rounded-lg hover:bg-slate-600 transition duration-300"
                  title="Copy course link"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy Link
                </button>
                {course.brochurePdf && (
                  <a
                    href={course.brochurePdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-slate-700 text-white font-semibold py-3 px-6 rounded-lg hover:bg-slate-600 transition duration-300"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    View Brochure
                  </a>
                )}
                <button
                  onClick={handleEnroll}
                  disabled={isEnrolled || isDisabled}
                  className="bg-emerald-500 text-white font-semibold py-3 px-8 rounded-lg hover:bg-emerald-600 transition duration-300 shadow-md hover:shadow-emerald-400/40 disabled:bg-gray-500 disabled:cursor-not-allowed"
                >
                  {isEnrolled ? 'Enrolled' : (paymentLoading ? 'Processing...' : 'Enroll Now')}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Course Features */}
        <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-white mb-6">What You'll Learn</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {course.features && course.features.map((feature, i) => (
              <li key={i} className="flex items-start text-slate-300">
                <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
      <LoginModal />
      <SignupModal />
      <BillingModal />
    </div>
  );
};

export default CourseDetail;

