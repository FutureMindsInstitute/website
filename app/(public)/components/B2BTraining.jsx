'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { THEME } from '@/lib/constants';

const specs = [
  { label: 'Format', value: '3-hour live workshop' },
  { label: 'Delivery', value: 'Online, in-person, or hybrid' },
  { label: 'Cohort Size', value: 'Upto 20 per session' },
  { label: 'Customisation', value: "Built around your team's actual workflows" },
  { label: 'Prerequisites', value: 'None. Built for non-technical teams' },
  { label: 'Takeaways', value: 'Slide deck, full cheatbook, daily productivity sheet' },
];

const forList = [
  'Founders and leaders who want their team to actually use AI in daily work, not just admire it.',
  'Founder communities, accelerators, and member organisations running an upskilling moment for their network.',
];

const B2BTraining = () => {
  return (
    <section
      id="b2b"
      style={{
        background: '#111827',
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
            For Teams
          </div>
          <h2
            style={{
              fontFamily: 'Bricolage Grotesque, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(30px, 4.5vw, 52px)',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: '#F0EDE6',
              marginBottom: '16px',
              maxWidth: '680px',
            }}
          >
            AI Training for Your{' '}
            <span style={{ color: '#D4AF37' }}>Entire Team</span>
          </h2>
          <p
            style={{
              fontFamily: 'Bricolage Grotesque, sans-serif',
              fontWeight: 600,
              fontSize: 'clamp(16px, 2vw, 20px)',
              color: '#F0EDE6',
              maxWidth: '640px',
              lineHeight: 1.45,
              marginBottom: '20px',
              letterSpacing: '-0.01em',
            }}
          >
            A 3-hour, hands-on, jargon-free workshop. Built for teams that want AI in their workflow by Monday.
          </p>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '15px',
              color: '#6B6B6B',
              maxWidth: '680px',
              lineHeight: 1.72,
            }}
          >
            An applied AI workshop for working teams. Three hours, live, hands-on. We cover the full AI platform toolkit including chat, research workflows, voice capture, the creative and video toolkit, and an intro to basic automations and agents. Every demo uses a real workflow from your team, not a generic dataset.
          </p>
        </motion.div>

        {/* Spec cards grid — 2x3 */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px',
            marginBottom: '56px',
          }}
          className="b2b-specs-grid"
        >
          {specs.map((spec, i) => (
            <div
              key={i}
              style={{
                background: '#1A2035',
                border: '1px solid rgba(240,237,230,0.07)',
                borderRadius: '12px',
                padding: '20px 22px',
              }}
            >
              <div
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: '#D4AF37',
                  marginBottom: '8px',
                }}
              >
                {spec.label}
              </div>
              <div
                style={{
                  fontFamily: 'Bricolage Grotesque, sans-serif',
                  fontWeight: 700,
                  fontSize: '15px',
                  color: '#F0EDE6',
                  lineHeight: 1.35,
                }}
              >
                {spec.value}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Two-col: Who it's for + Facilitator */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '40px',
            marginBottom: '56px',
            alignItems: 'start',
          }}
          className="b2b-main-grid"
        >
          {/* Who it's for */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.15 }}
          >
            <div
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#D4AF37',
                marginBottom: '20px',
              }}
            >
              Who It's For
            </div>
            <ul style={{ listStyle: 'none' }}>
              {forList.map((item, i) => (
                <li
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '14px',
                    marginBottom: '20px',
                  }}
                >
                  <span
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      background: 'rgba(232,160,48,0.10)',
                      border: '1px solid rgba(232,160,48,0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: '2px',
                    }}
                  >
                    <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#D4AF37', display: 'block' }} />
                  </span>
                  <p
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '15px',
                      color: '#F0EDE6',
                      lineHeight: 1.65,
                    }}
                  >
                    {item}
                  </p>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Facilitator strip */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.2 }}
          >
            <div
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#D4AF37',
                marginBottom: '20px',
              }}
            >
              Your Facilitator
            </div>
            <div
              style={{
                background: '#1A2035',
                border: '1px solid rgba(240,237,230,0.07)',
                borderLeft: '2px solid #D4AF37',
                borderRadius: '12px',
                padding: '24px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '16px' }}>
                <img
                  src="/assets/educators/amritraj.jpg"
                  alt="Amrit Raj"
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '10px',
                    objectFit: 'cover',
                    flexShrink: 0,
                  }}
                />
                <div>
                  <div
                    style={{
                      fontFamily: 'Bricolage Grotesque, sans-serif',
                      fontWeight: 700,
                      fontSize: '17px',
                      color: '#F0EDE6',
                      marginBottom: '3px',
                    }}
                  >
                    Amrit Raj
                  </div>
                  <div
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '12px',
                      color: '#D4AF37',
                    }}
                  >
                    Co-Founder, Women in Product India
                  </div>
                </div>
              </div>

              <div
                style={{
                  height: '1px',
                  background: 'rgba(240,237,230,0.07)',
                  marginBottom: '16px',
                }}
              />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <svg width="13" height="13" fill="none" stroke="#6B6B6B" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5 19.79 19.79 0 0 1 1.61 4.91 2 2 0 0 1 3.58 2.73h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.1a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <a
                    href="tel:+917022612623"
                    style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#6B6B6B', textDecoration: 'none' }}
                  >
                    +91 70226 12623
                  </a>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <svg width="13" height="13" fill="none" stroke="#6B6B6B" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <a
                    href="mailto:amrit.raj@futuremindsinstitute.com"
                    style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#6B6B6B', textDecoration: 'none' }}
                  >
                    amrit.raj@futuremindsinstitute.com
                  </a>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <svg width="13" height="13" fill="#6B6B6B" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  <a
                    href="https://linkedin.com/in/amritraj02"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#6B6B6B', textDecoration: 'none' }}
                  >
                    linkedin.com/in/amritraj02
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA block */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.2 }}
          style={{
            background: '#1A2035',
            border: '1px solid rgba(240,237,230,0.07)',
            borderRadius: '16px',
            padding: '48px 40px',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              color: '#6B6B6B',
              marginBottom: '24px',
            }}
          >
            Pricing on request, based on team size and scope.
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              justifyContent: 'center',
            }}
          >
            <a
              href="mailto:amrit.raj@futuremindsinstitute.com?subject=Team%20Training%20Scoping%20Call"
              className="btn-primary"
              style={{ padding: '14px 30px', fontSize: '15px', borderRadius: '12px' }}
            >
              Book a 20-Min Scoping Call
            </a>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .b2b-specs-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .b2b-main-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .b2b-specs-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default B2BTraining;
