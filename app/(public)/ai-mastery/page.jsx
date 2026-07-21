'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AMBER = '#D4AF37';
const BG = '#0B0F1A';
const SURFACE = '#111827';
const TEXT = '#F0EDE6';
const SECONDARY = '#6B6B6B';
const AMBER_BORDER = 'rgba(212,175,55,0.25)';
const AMBER_DIM = 'rgba(212,175,55,0.10)';

export default function AIMasteryPage() {
  return (
    <div style={{ background: BG, color: TEXT, minHeight: '100vh' }}>
      <Navbar />

      <section
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '120px 0 80px',
          position: 'relative',
        }}
      >
        <div className="container-fm">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '64px',
              alignItems: 'start',
            }}
            className="mastery-grid"
          >
            {/* Left — messaging */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ marginBottom: '24px' }}
              >
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '5px 16px',
                    borderRadius: '100px',
                    border: `1px solid ${AMBER_BORDER}`,
                    background: AMBER_DIM,
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: AMBER,
                  }}
                >
                  AI Mastery Masterclass
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.1 }}
                style={{
                  fontFamily: 'Bricolage Grotesque, sans-serif',
                  fontWeight: 800,
                  fontSize: 'clamp(36px, 5vw, 60px)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.04em',
                  color: TEXT,
                  marginBottom: '20px',
                }}
              >
                Are you feeling left behind in the{' '}
                <span style={{ color: AMBER }}>AI race?</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.22 }}
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '16px',
                  color: SECONDARY,
                  lineHeight: 1.75,
                  marginBottom: '36px',
                  maxWidth: '480px',
                }}
              >
                9 out of 10 working professionals are barely scratching the surface of what AI can do. Our next AI Mastery Masterclass is being planned. Register your interest below and we'll reach out with the date, time and details as soon as it's confirmed.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.32 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
              >
                {[
                  'Live 2-hour session on Zoom',
                  'Hands-on prompting framework you can use immediately',
                  'Live Q&A with Amrit Raj',
                  'Small cohort — highly interactive',
                ].map((point, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <span style={{ color: AMBER, fontWeight: 700, fontSize: '14px', lineHeight: '1.5', flexShrink: 0 }}>+</span>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: SECONDARY, lineHeight: 1.6 }}>{point}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right — Google Form */}
            <motion.div
              initial={{ opacity: 0, y: 32, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                style={{
                  background: SURFACE,
                  border: `1px solid ${AMBER_BORDER}`,
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 0 60px rgba(212,175,55,0.06)',
                }}
              >
                <div
                  style={{
                    padding: '20px 24px',
                    borderBottom: '1px solid rgba(240,237,230,0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    position: 'relative',
                  }}
                >
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, ${AMBER}, transparent)` }} />
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: AMBER }} />
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 600, color: TEXT }}>
                    Register Your Interest
                  </span>
                </div>
                <iframe
                  src="https://forms.gle/zz8ay8CSEdyZmckH7"
                  width="100%"
                  height="580"
                  frameBorder="0"
                  marginHeight="0"
                  marginWidth="0"
                  style={{ display: 'block', background: 'transparent' }}
                  title="Masterclass Interest Form"
                >
                  Loading form…
                </iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        @media (max-width: 900px) {
          .mastery-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
