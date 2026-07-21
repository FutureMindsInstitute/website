'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import publicApi from '../../../lib/publicApi';
import usePaymentGateway from '../../../hooks/usePaymentGateway';
import { useUserAuth } from '../../../hooks/useUserAuth';
import { useUserModal } from '../../../hooks/useUserModal';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' },
  }),
};

function CourseCard({ course, useForm, formUrl }) {
  const router = useRouter();
  const { user } = useUserAuth();
  const { openLogin, openBilling } = useUserModal();

  const { loading, isDisabled } = usePaymentGateway({
    courseId: course._id,
    courseName: course.name,
  });

  const isEnrolled =
    Array.isArray(user?.courses) &&
    user.courses.some((c) => {
      const cid = c?.courseId?._id || c.courseId;
      return String(cid) === String(course._id);
    });

  const onClick = () => {
    if (isEnrolled) return;
    if (!user) return openLogin();
    if (useForm && formUrl) {
      window.open(formUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    openBilling(course);
  };

  const handleViewDetails = (e) => {
    e.stopPropagation();
    router.push(`/course/${course._id}`);
  };

  const disabled = isEnrolled || (!useForm && isDisabled);

  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      style={{
        width: '100%',
        maxWidth: '340px',
        display: 'flex',
        flexDirection: 'column',
        background: '#111827',
        border: '1px solid rgba(240,237,230,0.07)',
        borderRadius: '12px',
        overflow: 'hidden',
        transition: 'border-color 0.25s ease',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(240,237,230,0.14)')}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(240,237,230,0.07)')}
    >
      {/* Top amber accent line */}
      <div style={{ height: '2px', background: '#D4AF37', flexShrink: 0 }} />

      <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', flex: 1 }}>

        {/* Course name */}
        <h3
          onClick={handleViewDetails}
          style={{
            fontFamily: 'Bricolage Grotesque, sans-serif',
            fontWeight: 700,
            fontSize: '19px',
            color: '#F0EDE6',
            lineHeight: 1.3,
            marginBottom: '20px',
            cursor: 'pointer',
          }}
        >
          {course.name}
        </h3>

        {/* Price block */}
        <div
          style={{
            background: '#1A2035',
            border: '1px solid rgba(240,237,230,0.05)',
            borderRadius: '10px',
            padding: '16px',
            marginBottom: '18px',
          }}
        >
          {course.price && (
            <div
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '12px',
                color: '#3A3A3A',
                textDecoration: 'line-through',
                marginBottom: '4px',
              }}
            >
              Rs {course.price}
            </div>
          )}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '10px', flexWrap: 'wrap' }}>
            <span
              style={{
                fontFamily: 'Bricolage Grotesque, sans-serif',
                fontWeight: 800,
                fontSize: '30px',
                color: '#D4AF37',
                lineHeight: 1,
              }}
            >
              Rs {course.discountPrice}
            </span>
            {course.earlyBirdTitle && (
              <span
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '11px',
                  fontWeight: 600,
                  padding: '3px 10px',
                  borderRadius: '100px',
                  background: 'rgba(212,175,55,0.10)',
                  color: '#D4AF37',
                  border: '1px solid rgba(212,175,55,0.25)',
                  marginBottom: '2px',
                }}
              >
                {course.earlyBirdTitle}
              </span>
            )}
          </div>
          <div
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '11px',
              color: '#3A3A3A',
              marginTop: '4px',
            }}
          >
            18% GST Applied
          </div>
        </div>

        {/* Duration */}
        {course.duration && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '16px',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '13px',
                fontWeight: 500,
                color: '#D4AF37',
              }}
            >
              {course.duration}
            </span>
          </div>
        )}

        {/* Description */}
        {course.description && (
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '13px',
              color: '#6B6B6B',
              lineHeight: 1.65,
              marginBottom: '20px',
            }}
          >
            {course.description}
          </p>
        )}

        {/* Features list */}
        {Array.isArray(course.features) && course.features.length > 0 && (
          <ul style={{ listStyle: 'none', marginBottom: '24px', flex: 1 }}>
            {course.features.map((f, i) => (
              <li
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  marginBottom: '9px',
                }}
              >
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#D4AF37',
                    lineHeight: '1.5',
                    flexShrink: 0,
                  }}
                >
                  +
                </span>
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '13px',
                    color: '#6B6B6B',
                    lineHeight: 1.55,
                  }}
                >
                  {f}
                </span>
              </li>
            ))}
          </ul>
        )}

        {/* Action buttons */}
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button
            onClick={handleViewDetails}
            style={{
              width: '100%',
              padding: '11px',
              background: 'transparent',
              border: '1px solid rgba(240,237,230,0.18)',
              borderRadius: '10px',
              fontFamily: 'Inter, sans-serif',
              fontSize: '13px',
              fontWeight: 600,
              color: '#F0EDE6',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'border-color 0.2s ease, background 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(240,237,230,0.35)';
              e.currentTarget.style.background = 'rgba(240,237,230,0.04)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(240,237,230,0.18)';
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            View Details
          </button>

          {course.brochurePdf && (
            <a
              href={course.brochurePdf}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: '100%',
                padding: '11px',
                background: 'transparent',
                border: '1px solid rgba(240,237,230,0.07)',
                borderRadius: '10px',
                fontFamily: 'Inter, sans-serif',
                fontSize: '13px',
                fontWeight: 600,
                color: '#6B6B6B',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                textDecoration: 'none',
                transition: 'border-color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(240,237,230,0.18)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(240,237,230,0.07)')}
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download Brochure
            </a>
          )}

          <button
            onClick={onClick}
            disabled={disabled}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '10px',
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              fontWeight: 700,
              cursor: disabled ? 'not-allowed' : 'pointer',
              border: isEnrolled ? '1px solid rgba(212,175,55,0.3)' : 'none',
              background: isEnrolled ? 'rgba(212,175,55,0.08)' : '#D4AF37',
              color: isEnrolled ? '#D4AF37' : '#0B0F1A',
              opacity: disabled && !isEnrolled ? 0.55 : 1,
              transition: 'opacity 0.2s ease',
            }}
          >
            {isEnrolled
              ? 'Enrolled'
              : loading
              ? 'Processing...'
              : 'Enroll Now'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

const Courses = ({ initialCourses = null, initialCategories = null }) => {
  const [courses, setCourses] = useState(initialCourses || []);
  const [categories, setCategories] = useState(initialCategories || []);
  const [loading, setLoading] = useState(initialCourses === null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialCourses !== null && initialCategories !== null) return;

    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const res = await publicApi.get('/api/course');
        const categoriesRes = await publicApi.get('/api/category');
        if (mounted) {
          setCategories(categoriesRes?.data?.categories || []);
          const list = Array.isArray(res?.data?.courses) ? res.data.courses : [];
          setCourses(list.filter((c) => c.isActive));
        }
      } catch (e) {
        if (mounted)
          setError(
            e?.response?.data?.msg || e.message || 'Failed to load courses'
          );
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [initialCourses, initialCategories]);

  const coursesForCategory = (categoryId) =>
    courses.filter((c) => {
      if (!Array.isArray(c.categories)) return false;
      return c.categories.some(
        (catRef) => String(catRef?._id || catRef) === String(categoryId)
      );
    });

  if (loading) {
    return (
      <section
        id="courses"
        style={{ background: '#0B0F1A', padding: '96px 0' }}
      >
        <div className="container-fm" style={{ textAlign: 'center' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              color: '#6B6B6B',
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
            }}
          >
            <motion.div
              style={{
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                border: '2px solid #D4AF37',
                borderTopColor: 'transparent',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
            />
            Loading courses...
          </div>
        </div>
      </section>
    );
  }

  const showCTA = error || (!loading && courses.length === 0);

  if (showCTA) {
    return (
      <section
        id="courses"
        style={{
          background: '#0B0F1A',
          padding: '96px 0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'rgba(240,237,230,0.07)' }} />
        <div className="container-fm">
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
            Courses
          </div>
          <h2
            style={{
              fontFamily: 'Bricolage Grotesque, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(32px, 4.5vw, 52px)',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: '#F0EDE6',
              marginBottom: '16px',
              maxWidth: '620px',
            }}
          >
            Your Path to{' '}
            <span style={{ color: '#D4AF37' }}>AI Mastery</span>
          </h2>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '16px',
              color: '#6B6B6B',
              maxWidth: '520px',
              lineHeight: 1.65,
              marginBottom: '40px',
            }}
          >
            Our first course is launching soon. Register your interest and be the first to know when it goes live.
          </p>

          <a
            href="https://forms.gle/zz8ay8CSEdyZmckH7"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '14px 32px',
              background: '#D4AF37',
              borderRadius: '10px',
              fontFamily: 'Inter, sans-serif',
              fontSize: '15px',
              fontWeight: 700,
              color: '#0B0F1A',
              textDecoration: 'none',
              transition: 'opacity 0.2s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.88'; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
          >
            Register Your Interest
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </section>
    );
  }

  return (
    <section
      id="courses"
      style={{
        background: '#0B0F1A',
        padding: '96px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'rgba(240,237,230,0.07)',
        }}
      />

      <div className="container-fm">

        {/* Section header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ marginBottom: '72px' }}
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
            Courses
          </div>
          <h2
            style={{
              fontFamily: 'Bricolage Grotesque, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(32px, 4.5vw, 52px)',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: '#F0EDE6',
              marginBottom: '16px',
              maxWidth: '600px',
            }}
          >
            Your Path to{' '}
            <span style={{ color: '#D4AF37' }}>AI Mastery</span>
          </h2>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '16px',
              color: '#6B6B6B',
              maxWidth: '480px',
              lineHeight: 1.65,
            }}
          >
            Industry-designed programs that take you from curious to capable. Fast.
          </p>
        </motion.div>

        {/* Categories + courses */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '72px' }}>
          {categories.map((category, ci) => {
            const catCourses = coursesForCategory(category._id);
            if (!catCourses.length) return null;

            return (
              <motion.div
                key={category._id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={ci}
              >
                {/* Category heading */}
                <div style={{ marginBottom: '32px' }}>
                  <h3
                    style={{
                      fontFamily: 'Bricolage Grotesque, sans-serif',
                      fontWeight: 800,
                      fontSize: '26px',
                      color: '#D4AF37',
                      marginBottom: '8px',
                    }}
                  >
                    {category.name}
                  </h3>
                  {category.description && (
                    <p
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '14px',
                        color: '#6B6B6B',
                        maxWidth: '600px',
                        lineHeight: 1.6,
                      }}
                    >
                      {category.description}
                    </p>
                  )}
                </div>

                {/* Cards row */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '20px',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                  }}
                >
                  {catCourses.map((course) => (
                    <CourseCard key={course._id} course={course} />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Courses;
