'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AMBER = '#D4AF37';
const BG = '#0B0F1A';
const SURFACE = '#111827';
const TEXT = '#F0EDE6';
const SECONDARY = '#6B6B6B';
const AMBER_BORDER = 'rgba(212,175,55,0.25)';
const AMBER_DIM = 'rgba(212,175,55,0.10)';
const BORDER = 'rgba(240,237,230,0.07)';

export default function AIMasteryPage() {
  const [showForm, setShowForm] = useState(false);

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
          <div style={{ maxWidth: '680px' }}>
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
                fontSize: 'clamp(36px, 5vw, 64px)',
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
                fontSize: '17px',
                color: SECONDARY,
                lineHeight: 1.75,
                marginBottom: '36px',
              }}
            >
              9 out of 10 working professionals are barely scratching the surface of what AI can do. Our next AI Mastery Masterclass is being planned. Register your interest and we'll reach out with the date, time and details as soon as it's confirmed.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '44px' }}
            >
              {[
                'Live 2-hour session on Zoom',
                'Hands-on prompting framework you can use immediately',
                'Live Q&A with Amrit Raj',
                'Small cohort — highly interactive',
              ].map((point, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ color: AMBER, fontWeight: 700, fontSize: '14px', flexShrink: 0 }}>+</span>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: SECONDARY, lineHeight: 1.6 }}>{point}</span>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <button
                onClick={() => setShowForm(true)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '16px 36px',
                  background: AMBER,
                  border: 'none',
                  borderRadius: '12px',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '16px',
                  fontWeight: 700,
                  color: '#0B0F1A',
                  cursor: 'pointer',
                  transition: 'opacity 0.2s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.88'; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
              >
                Register Your Interest
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setShowForm(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.75)',
              backdropFilter: 'blur(4px)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px',
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: SURFACE,
                border: `1px solid ${AMBER_BORDER}`,
                borderRadius: '16px',
                overflow: 'hidden',
                width: '100%',
                maxWidth: '560px',
                maxHeight: '90vh',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
              }}
            >
              {/* Modal header */}
              <div
                style={{
                  padding: '18px 24px',
                  borderBottom: `1px solid ${BORDER}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexShrink: 0,
                  position: 'relative',
                }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, ${AMBER}, transparent)` }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: AMBER }} />
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 600, color: TEXT }}>
                    Register Your Interest
                  </span>
                </div>
                <button
                  onClick={() => setShowForm(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: SECONDARY,
                    fontSize: '20px',
                    lineHeight: 1,
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = TEXT; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = SECONDARY; }}
                >
                  ✕
                </button>
              </div>

              {/* Embedded form */}
              <div style={{ flex: 1, overflow: 'auto' }}>
                <iframe
                  src="https://forms.gle/zz8ay8CSEdyZmckH7"
                  width="100%"
                  height="600"
                  frameBorder="0"
                  marginHeight="0"
                  marginWidth="0"
                  style={{ display: 'block' }}
                  title="Masterclass Interest Form"
                >
                  Loading form…
                </iframe>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
