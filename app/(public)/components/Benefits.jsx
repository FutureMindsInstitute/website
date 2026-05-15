'use client';

import React from 'react';
import { motion } from 'framer-motion';

const benefits = [
  {
    title: 'Job-Ready Skills',
    desc: 'Master the exact AI tools and methodologies that leading companies are implementing today.',
  },
  {
    title: 'Silicon Valley Expertise',
    desc: 'Learn from industry veterans currently solving AI challenges at Google, Microsoft, Amazon and Meta.',
  },
  {
    title: 'Real-World Problem Solving',
    desc: 'Experts share live case studies and methodologies they use daily to solve complex problems.',
  },
  {
    title: 'Lifelong Network',
    desc: 'Join a community of AI-forward professionals and continue learning beyond the classroom.',
  },
  {
    title: 'Portfolio Development',
    desc: 'Build a comprehensive portfolio of AI projects that showcase your capabilities to employers.',
  },
  {
    title: 'Continuous Updates',
    desc: 'Stay current with the latest AI tools and trends through our alumni network and workshops.',
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const BenefitsSection = () => {
  return (
    <section
      id="benefits"
      style={{
        background: '#141414',
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
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          style={{ marginBottom: '64px' }}
        >
          <div
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#E8A030',
              marginBottom: '16px',
            }}
          >
            Why FMI
          </div>
          <h2
            style={{
              fontFamily: 'Bricolage Grotesque, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(30px, 4vw, 48px)',
              lineHeight: 1.07,
              letterSpacing: '-0.03em',
              color: '#F0EDE6',
              marginBottom: '16px',
              maxWidth: '520px',
            }}
          >
            Why FMI Graduates{' '}
            <span style={{ color: '#E8A030' }}>Stand Out</span>
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
            We do not just teach AI. We transform how you think, build, and lead
            in the age of intelligent systems.
          </p>
        </motion.div>

        {/* Benefits grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
          }}
          className="benefits-grid"
        >
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              variants={item}
              style={{
                background: '#1C1C1C',
                border: '1px solid rgba(240,237,230,0.07)',
                borderRadius: '12px',
                padding: '28px 24px',
                position: 'relative',
                transition: 'border-color 0.25s ease',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(240,237,230,0.14)';
                const line = e.currentTarget.querySelector('.benefit-bottom-line');
                if (line) line.style.opacity = '1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(240,237,230,0.07)';
                const line = e.currentTarget.querySelector('.benefit-bottom-line');
                if (line) line.style.opacity = '0';
              }}
            >
              {/* Number */}
              <div
                style={{
                  fontFamily: 'Bricolage Grotesque, sans-serif',
                  fontWeight: 800,
                  fontSize: '48px',
                  color: '#E8A030',
                  lineHeight: 1,
                  marginBottom: '16px',
                  opacity: 0.25,
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </div>

              <h3
                style={{
                  fontFamily: 'Bricolage Grotesque, sans-serif',
                  fontWeight: 700,
                  fontSize: '17px',
                  color: '#F0EDE6',
                  marginBottom: '10px',
                  lineHeight: 1.25,
                }}
              >
                {b.title}
              </h3>
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  color: '#6B6B6B',
                  lineHeight: 1.65,
                }}
              >
                {b.desc}
              </p>

              {/* Bottom amber line on hover */}
              <div
                className="benefit-bottom-line"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: '#E8A030',
                  opacity: 0,
                  transition: 'opacity 0.25s ease',
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .benefits-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .benefits-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
};

export default BenefitsSection;
