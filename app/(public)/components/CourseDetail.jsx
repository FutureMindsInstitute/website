'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import publicApi from '../../../lib/publicApi';
import usePaymentGateway from '../../../hooks/usePaymentGateway';
import { useUserAuth } from '../../../hooks/useUserAuth';
import { useUserModal } from '../../../hooks/useUserModal';
import Navbar from './Navbar';
import Footer from './Footer';
import LoginModal from './modals/login';
import SignupModal from './modals/signup';
import BillingModal from './modals/Billing';

const CourseDetail = ({ courseId }) => {
  const router = useRouter();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useUserAuth();
  const { openLogin, openBilling } = useUserModal();

  const { loading: paymentLoading, isDisabled } = usePaymentGateway({
    courseId: course?._id,
    courseName: course?.name,
  });

  const isEnrolled =
    Array.isArray(user?.courses) &&
    user.courses.some((c) => {
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
        if (mounted) setError(e?.response?.data?.msg || e.message || 'Failed to load course');
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
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied!');
    } catch {
      toast.error('Failed to copy link');
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#0B0B0B' }}>
        <Navbar />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', color: '#888888' }}>Loading course...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div style={{ minHeight: '100vh', background: '#0B0B0B' }}>
        <Navbar />
        <div
          style={{
            paddingTop: '120px',
            paddingBottom: '96px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              maxWidth: '480px',
              width: '100%',
              margin: '0 24px',
              background: '#111111',
              border: '1px solid rgba(255,255,255,0.08)',
              borderLeft: '3px solid #D4AF37',
              borderRadius: '16px',
              padding: '48px 40px',
            }}
          >
            <div
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#D4AF37',
                marginBottom: '16px',
              }}
            >
              Course Detail
            </div>
            <h2
              style={{
                fontFamily: 'Bricolage Grotesque, sans-serif',
                fontWeight: 800,
                fontSize: '28px',
                color: '#FFFFFF',
                marginBottom: '12px',
                lineHeight: 1.2,
              }}
            >
              Could not load course
            </h2>
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                color: '#888888',
                lineHeight: 1.65,
                marginBottom: '28px',
              }}
            >
              {error || 'This course could not be found or is no longer available. Browse all active courses on the home page.'}
            </p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <a
                href="/"
                style={{
                  padding: '10px 22px',
                  background: '#D4AF37',
                  borderRadius: '10px',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#0B0B0B',
                  textDecoration: 'none',
                }}
              >
                Browse Courses
              </a>
              <a
                href="/ai-mastery"
                style={{
                  padding: '10px 22px',
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '10px',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#888888',
                  textDecoration: 'none',
                }}
              >
                AI Masterclass
              </a>
            </div>
          </div>
        </div>
        <Footer />
        <LoginModal />
        <SignupModal />
        <BillingModal />
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0B0B0B' }}>
      <Navbar />

      <div style={{ paddingTop: '88px', paddingBottom: '96px' }}>
        <div className="container-fm" style={{ maxWidth: '960px' }}>

          {/* Back */}
          <motion.button
            onClick={() => router.back()}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              fontSize: '13px',
              color: '#888888',
              marginBottom: '40px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: 0,
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#888888')}
          >
            ← Back to courses
          </motion.button>

          {/* Hero card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            style={{
              background: '#111111',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '16px',
              overflow: 'hidden',
              marginBottom: '20px',
            }}
          >
            {/* Lime top line */}
            <div style={{ height: '2px', background: '#ADFF47' }} />

            <div style={{ padding: '40px 40px 36px' }}>
              {/* Categories */}
              {course.categories && course.categories.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                  {course.categories.map((cat) => (
                    <span
                      key={cat._id || cat}
                      style={{
                        padding: '4px 12px',
                        borderRadius: '100px',
                        background: 'rgba(173,255,71,0.08)',
                        border: '1px solid rgba(173,255,71,0.22)',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '11px',
                        fontWeight: 600,
                        color: '#ADFF47',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {cat.name || cat}
                    </span>
                  ))}
                </div>
              )}

              <h1
                style={{
                  fontFamily: 'Syne, sans-serif',
                  fontWeight: 800,
                  fontSize: 'clamp(28px, 4vw, 42px)',
                  color: '#FFFFFF',
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  marginBottom: '16px',
                }}
              >
                {course.name}
              </h1>

              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '16px',
                  color: '#888888',
                  lineHeight: 1.7,
                  marginBottom: '28px',
                  maxWidth: '640px',
                }}
              >
                {course.description}
              </p>

              {/* Duration chip */}
              {course.duration && (
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 14px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '100px',
                    marginBottom: '32px',
                  }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#ADFF47" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
                  </svg>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 500, color: '#ADFF47' }}>
                    {course.duration}
                  </span>
                </div>
              )}

              {/* Pricing + actions */}
              <div
                style={{
                  background: '#161616',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '12px',
                  padding: '24px',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '20px',
                }}
              >
                <div>
                  {course.price && (
                    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#444444', textDecoration: 'line-through', marginBottom: '4px' }}>
                      Rs {course.price}
                    </div>
                  )}
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px' }}>
                    <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '36px', color: '#ADFF47', lineHeight: 1 }}>
                      Rs {course.discountPrice}
                    </span>
                    {course.earlyBirdTitle && (
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 600, padding: '3px 10px', borderRadius: '100px', background: 'rgba(173,255,71,0.1)', color: '#ADFF47', border: '1px solid rgba(173,255,71,0.22)', marginBottom: '4px' }}>
                        {course.earlyBirdTitle}
                      </span>
                    )}
                  </div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#444444', marginTop: '4px' }}>
                    18% GST Applied
                  </div>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  <button
                    onClick={handleCopyLink}
                    className="btn-secondary"
                    style={{ padding: '10px 18px', fontSize: '13px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '7px' }}
                  >
                    <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy Link
                  </button>

                  {course.brochurePdf && (
                    <a
                      href={course.brochurePdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary"
                      style={{ padding: '10px 18px', fontSize: '13px', borderRadius: '10px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '7px' }}
                    >
                      <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Brochure
                    </a>
                  )}

                  <button
                    onClick={handleEnroll}
                    disabled={isEnrolled || isDisabled}
                    style={{
                      padding: '10px 24px',
                      borderRadius: '10px',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: isEnrolled || isDisabled ? 'not-allowed' : 'pointer',
                      background: isEnrolled ? 'rgba(173,255,71,0.1)' : '#ADFF47',
                      color: isEnrolled ? '#ADFF47' : '#0B0B0B',
                      border: isEnrolled ? '1px solid rgba(173,255,71,0.3)' : 'none',
                      opacity: isDisabled && !isEnrolled ? 0.5 : 1,
                      transition: 'opacity 0.2s',
                    }}
                  >
                    {isEnrolled ? 'Enrolled' : paymentLoading ? 'Processing...' : 'Enroll Now'}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12 }}
            style={{
              background: '#111111',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '16px',
              padding: '36px 40px',
            }}
          >
            <h2
              style={{
                fontFamily: 'Syne, sans-serif',
                fontWeight: 800,
                fontSize: '22px',
                color: '#FFFFFF',
                marginBottom: '24px',
                letterSpacing: '-0.01em',
              }}
            >
              What you will learn
            </h2>
            <ul
              style={{
                listStyle: 'none',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '12px 24px',
              }}
            >
              {course.features &&
                course.features.map((feature, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 700, color: '#ADFF47', flexShrink: 0, marginTop: '1px' }}>+</span>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#888888', lineHeight: 1.6 }}>
                      {feature}
                    </span>
                  </li>
                ))}
            </ul>
          </motion.div>
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
