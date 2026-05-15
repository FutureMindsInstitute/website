'use client';

import React from 'react';
import { motion } from 'framer-motion';

const storiesData = [
  {
    quote:
      'I built a complete AI recommendation engine that my internship company actually implemented. The mentors showed me exactly how they approach similar problems at scale.',
    author: 'Priya S.',
    role: 'Computer Science Graduate',
    company: 'Amazon Intern',
    rating: 5,
  },
  {
    quote:
      'The hands-on approach was game-changing. Learning from a Google AI engineer who shared real project methodologies made all the difference in landing my product role.',
    author: 'Rahul K.',
    role: 'Business Administration',
    company: 'Product Manager at Startup',
    rating: 5,
  },
  {
    quote:
      'Building my capstone project with guidance from industry experts gave me confidence to pitch AI solutions in job interviews. Incredible network opened doors I never knew existed.',
    author: 'Ananya M.',
    role: 'Engineering Graduate',
    company: 'SDE at Flipkart',
    rating: 5,
  },
  {
    quote:
      'From zero AI knowledge to building production-ready agents in 8 hours. The curriculum is dense, practical, and exactly what the industry demands right now.',
    author: 'Siddharth R.',
    role: 'MBA Student',
    company: 'Data Analyst at Paytm',
    rating: 5,
  },
  {
    quote:
      'The Women in Product India community support after the course was invaluable. Still attending events and making connections months after completing the program.',
    author: 'Meera T.',
    role: 'Product Designer',
    company: 'PM at Meesho',
    rating: 5,
  },
  {
    quote:
      'No fluff, all substance. Every session delivered real-world frameworks I could apply the next day. Best investment I made in my career this year.',
    author: 'Vikram N.',
    role: 'Software Engineer',
    company: 'Engineer at Microsoft',
    rating: 5,
  },
];

const allStories = [...storiesData, ...storiesData];

const StarRow = ({ count }) => (
  <div style={{ display: 'flex', gap: '2px', marginBottom: '14px' }}>
    {Array.from({ length: count }).map((_, i) => (
      <span key={i} style={{ color: '#D4AF37', fontSize: '14px' }}>
        ★
      </span>
    ))}
  </div>
);

export default function Stories() {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="stories"
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

      <div style={{ position: 'relative', zIndex: 10 }}>

        {/* Header */}
        <motion.div
          className="container-fm"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          style={{ marginBottom: '56px' }}
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
            Testimonials
          </div>
          <h2
            style={{
              fontFamily: 'Bricolage Grotesque, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(30px, 4vw, 48px)',
              lineHeight: 1.07,
              letterSpacing: '-0.03em',
              color: '#F0EDE6',
              marginBottom: '14px',
              maxWidth: '520px',
            }}
          >
            Student{' '}
            <span style={{ color: '#D4AF37' }}>Success Stories</span>
          </h2>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '15px',
              color: '#6B6B6B',
              maxWidth: '440px',
              lineHeight: 1.65,
            }}
          >
            Hear from students who have transformed their careers with
            Future Minds Institute.
          </p>
        </motion.div>

        {/* Marquee strip */}
        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            padding: '8px 0 24px',
          }}
        >
          {/* Edge fades */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: '120px',
              zIndex: 10,
              pointerEvents: 'none',
              background: 'linear-gradient(90deg, #0B0F1A, transparent)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              bottom: 0,
              width: '120px',
              zIndex: 10,
              pointerEvents: 'none',
              background: 'linear-gradient(-90deg, #0B0F1A, transparent)',
            }}
          />

          <div
            className="marquee-track"
            style={{
              display: 'flex',
              gap: '16px',
              width: 'max-content',
            }}
          >
            {allStories.map((story, i) => (
              <div
                key={i}
                style={{
                  width: '320px',
                  flexShrink: 0,
                  background: '#111827',
                  border: '1px solid rgba(240,237,230,0.07)',
                  borderRadius: '12px',
                  padding: '24px',
                }}
              >
                <StarRow count={story.rating} />
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '13.5px',
                    color: '#C5C0B8',
                    lineHeight: 1.75,
                    fontStyle: 'italic',
                    marginBottom: '20px',
                  }}
                >
                  "{story.quote}"
                </p>
                <div>
                  <div
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 600,
                      fontSize: '13px',
                      color: '#F0EDE6',
                      marginBottom: '2px',
                    }}
                  >
                    {story.author}
                  </div>
                  <div
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '12px',
                      color: '#6B6B6B',
                      marginBottom: '2px',
                    }}
                  >
                    {story.role}
                  </div>
                  <div
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '12px',
                      color: '#D4AF37',
                    }}
                  >
                    {story.company}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <motion.div
          className="container-fm"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          style={{ marginTop: '64px' }}
        >
          <div
            style={{
              background: '#111827',
              border: '1px solid rgba(240,237,230,0.07)',
              borderLeft: '3px solid #D4AF37',
              borderRadius: '16px',
              padding: '56px 48px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div className="grid-bg" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
            <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
              <h3
                style={{
                  fontFamily: 'Bricolage Grotesque, sans-serif',
                  fontWeight: 800,
                  fontSize: 'clamp(26px, 4vw, 40px)',
                  lineHeight: 1.1,
                  color: '#F0EDE6',
                  marginBottom: '14px',
                  letterSpacing: '-0.03em',
                }}
              >
                Ready to Future-Proof{' '}
                <span style={{ color: '#D4AF37' }}>Your Career?</span>
              </h3>
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '15px',
                  color: '#6B6B6B',
                  maxWidth: '500px',
                  margin: '0 auto 32px',
                  lineHeight: 1.65,
                }}
              >
                The AI revolution is happening now. Join hundreds of students who
                have already transformed their career with Future Minds Institute.
              </p>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '12px',
                  justifyContent: 'center',
                }}
              >
                <button
                  onClick={() => scrollToSection('courses')}
                  className="btn-primary"
                  style={{ padding: '13px 30px', fontSize: '14px' }}
                >
                  Enroll Now
                </button>
                <button
                  onClick={() => scrollToSection('educators')}
                  className="btn-secondary"
                  style={{ padding: '13px 30px', fontSize: '14px' }}
                >
                  Meet Educators
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
