'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AMBER = '#D4AF37';
const BG = '#0B0F1A';
const SURFACE = '#111827';
const SURFACE_UP = '#1A2035';
const TEXT = '#F0EDE6';
const SECONDARY = '#6B6B6B';
const MUTED = '#3A3A3A';
const BORDER = 'rgba(240,237,230,0.07)';
const BORDER_HOVER = 'rgba(240,237,230,0.14)';
const AMBER_BORDER = 'rgba(212,175,55,0.25)';
const AMBER_DIM = 'rgba(212,175,55,0.10)';

function RegisterButton({ onClick, label = 'Register Your Interest', style = {} }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        padding: '15px 34px',
        background: AMBER,
        border: 'none',
        borderRadius: '12px',
        fontFamily: 'Inter, sans-serif',
        fontSize: '15px',
        fontWeight: 700,
        color: '#0B0F1A',
        cursor: 'pointer',
        transition: 'opacity 0.2s ease',
        ...style,
      }}
      onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.88'; }}
      onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
    >
      {label}
      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" viewBox="0 0 24 24">
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </button>
  );
}

function SectionTag({ label }) {
  return (
    <div style={{
      fontFamily: 'Inter, sans-serif',
      fontSize: '11px',
      fontWeight: 700,
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
      color: AMBER,
      marginBottom: '16px',
    }}>
      {label}
    </div>
  );
}

export default function AIMasteryPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div style={{ background: BG, color: TEXT, minHeight: '100vh' }}>
      <Navbar />

      {/* ── HERO ── */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '120px 0 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '20%', left: '40%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="container-fm" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '760px' }}>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ marginBottom: '24px' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 16px', borderRadius: '100px', border: `1px solid ${AMBER_BORDER}`, background: AMBER_DIM, fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: AMBER }}>
                <motion.span animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }} style={{ width: '7px', height: '7px', borderRadius: '50%', background: AMBER, display: 'inline-block', flexShrink: 0 }} />
                AI Mastery Masterclass
              </span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.1 }} style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 800, fontSize: 'clamp(40px, 6vw, 72px)', lineHeight: 1.0, letterSpacing: '-0.04em', color: TEXT, marginBottom: '20px' }}>
              Are you feeling left behind{' '}
              <span style={{ color: AMBER }}>in the AI race?</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} style={{ fontFamily: 'Inter, sans-serif', fontSize: '17px', color: SECONDARY, lineHeight: 1.75, marginBottom: '36px', maxWidth: '600px' }}>
              9 out of 10 working professionals are barely scratching the surface of what AI can do. Our next AI Mastery Masterclass is being planned — register your interest and be the first to know when it's confirmed.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.28 }} style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', maxWidth: '540px', marginBottom: '44px' }}>
              {[
                'Live 2-hour session on Zoom',
                'Hands-on prompting framework',
                'Live Q&A with Amrit Raj',
                'Small cohort — highly interactive',
                'Real workflows, zero jargon',
                'Immediate takeaways for your work',
              ].map((point, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: AMBER, fontWeight: 700, fontSize: '13px', flexShrink: 0 }}>+</span>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: SECONDARY, lineHeight: 1.5 }}>{point}</span>
                </div>
              ))}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.36 }}>
              <RegisterButton onClick={() => setShowForm(true)} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WHAT YOU'LL GET ── */}
      <section style={{ background: SURFACE, padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: BORDER }} />
        <div className="container-fm">
          <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} style={{ marginBottom: '56px' }}>
            <SectionTag label="What You Will Get" />
            <h2 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 48px)', lineHeight: 1.07, letterSpacing: '-0.03em', color: TEXT, maxWidth: '600px' }}>
              In 2 hours, here is what changes.
            </h2>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '800px' }}>
            {[
              'Understand exactly why your AI prompts have been falling flat — and what to do instead.',
              'Learn the 4-pillar framework used daily by AI practitioners: Role, Context, Constraints, Format.',
              'Watch a working AI workflow built live in under 5 minutes — the same kind built for paying clients.',
              'Apply the framework to your own work in real time and feel the difference immediately.',
              'Walk away with a copy-paste prompt template you can use Monday morning.',
            ].map((outcome, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
                style={{ background: SURFACE_UP, border: `1px solid ${BORDER}`, borderRadius: '12px', padding: '20px 24px', display: 'flex', alignItems: 'flex-start', gap: '18px', transition: 'border-color 0.25s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = BORDER_HOVER)}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = BORDER)}
              >
                <span style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 800, fontSize: '20px', color: AMBER, opacity: 0.5, flexShrink: 0, lineHeight: 1.3, minWidth: '28px' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: TEXT, lineHeight: 1.65 }}>{outcome}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO IT'S FOR ── */}
      <section style={{ background: BG, padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: BORDER }} />
        <div className="container-fm">
          <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} style={{ marginBottom: '56px' }}>
            <SectionTag label="Is This For You" />
            <h2 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 48px)', lineHeight: 1.07, letterSpacing: '-0.03em', color: TEXT, maxWidth: '560px' }}>
              Built for working professionals.
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', maxWidth: '900px', marginBottom: '48px' }} className="fit-grid">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              style={{ background: SURFACE_UP, border: `1px solid ${BORDER}`, borderTop: `2px solid ${AMBER}`, borderRadius: '12px', padding: '28px' }}>
              <div style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 700, fontSize: '16px', color: AMBER, marginBottom: '20px' }}>This is for you if:</div>
              <ul style={{ listStyle: 'none' }}>
                {[
                  'You work in marketing, product, ops, or leadership',
                  'You want to use AI practically — not just talk about it',
                  'You are tired of generic, textbook AI outputs',
                  'You learn best by doing, not just watching',
                  'You want real workflows, not another certificate',
                ].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
                    <span style={{ color: AMBER, fontSize: '14px', lineHeight: '1.5', flexShrink: 0 }}>✓</span>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: TEXT, lineHeight: 1.55 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              style={{ background: SURFACE_UP, border: `1px solid ${BORDER}`, borderTop: '2px solid rgba(240,237,230,0.12)', borderRadius: '12px', padding: '28px' }}>
              <div style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 700, fontSize: '16px', color: SECONDARY, marginBottom: '20px' }}>Skip this if:</div>
              <ul style={{ listStyle: 'none' }}>
                {[
                  'You expect AI to replace your judgment entirely',
                  'You want a magic bullet with no effort',
                  'You are only looking for a LinkedIn certificate',
                ].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
                    <span style={{ color: MUTED, fontSize: '14px', lineHeight: '1.5', flexShrink: 0 }}>✕</span>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: SECONDARY, lineHeight: 1.55 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PAST CLIENTS ── */}
      <section style={{ background: SURFACE, padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: BORDER }} />
        <div className="container-fm">
          <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} style={{ marginBottom: '56px' }}>
            <SectionTag label="Past Sessions" />
            <h2 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 48px)', lineHeight: 1.07, letterSpacing: '-0.03em', color: TEXT, maxWidth: '560px' }}>
              Trusted by teams across India.
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', maxWidth: '900px', marginBottom: '56px' }} className="clients-grid">
            {[
              { org: 'HerKey', tag: 'Corporate Training', desc: 'Claude Enterprise AI training — practical AI literacy for a professional community of 1M+ women.' },
              { org: 'Dayananda Sagar University', tag: 'University Workshop', desc: 'Claude AI fundamentals workshop preparing students for AI-native workplaces.' },
              { org: 'Marzi by Primus', tag: 'Hands-on Workshop', desc: 'Practical AI exercises and collaborative problem-solving for the Marzi team.' },
              { org: 'Manjushree Ventures', tag: 'Leadership Session', desc: 'AI literacy strategy session for manufacturing and VC leadership on non-tech AI adoption.' },
            ].map((client, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
                style={{ background: SURFACE_UP, border: `1px solid ${BORDER}`, borderLeft: `3px solid ${AMBER}`, borderRadius: '12px', padding: '24px', transition: 'border-color 0.25s ease' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = BORDER_HOVER; e.currentTarget.style.borderLeftColor = AMBER; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.borderLeftColor = AMBER; }}
              >
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: AMBER, marginBottom: '8px' }}>{client.tag}</div>
                <div style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 700, fontSize: '18px', color: TEXT, marginBottom: '10px' }}>{client.org}</div>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: SECONDARY, lineHeight: 1.65 }}>{client.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Testimonial */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}
            style={{ background: 'rgba(212,175,55,0.05)', border: `1px solid ${AMBER_BORDER}`, borderLeft: `4px solid ${AMBER}`, borderRadius: '12px', padding: '36px 40px', maxWidth: '780px' }}>
            <div style={{ display: 'flex', gap: '3px', marginBottom: '16px' }}>
              {Array.from({ length: 5 }).map((_, i) => <span key={i} style={{ color: AMBER, fontSize: '16px' }}>★</span>)}
            </div>
            <p style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 700, fontSize: 'clamp(16px, 2.2vw, 20px)', color: TEXT, lineHeight: 1.5, marginBottom: '16px', letterSpacing: '-0.01em' }}>
              "Practical insights into AI applications, workflows, automation, and real-world project building. Amrit makes it immediately applicable — no jargon, no theory dumps."
            </p>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: AMBER, fontWeight: 600 }}>Dr. Upankar Chutia — Past Participant</div>
          </motion.div>
        </div>
      </section>

      {/* ── HOST ── */}
      <section style={{ background: BG, padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: BORDER }} />
        <div className="container-fm">
          <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} style={{ marginBottom: '48px' }}>
            <SectionTag label="Your Host" />
            <h2 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 48px)', lineHeight: 1.07, letterSpacing: '-0.03em', color: TEXT }}>
              Who is running this
            </h2>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.1 }}
            style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderLeft: `3px solid ${AMBER}`, borderRadius: '12px', padding: '40px', maxWidth: '840px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '28px', marginBottom: '28px', flexWrap: 'wrap' }}>
              <img src="/assets/educators/amritraj.jpg" alt="Amrit Raj" style={{ width: '96px', height: '96px', borderRadius: '12px', objectFit: 'cover', flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: '200px' }}>
                <h3 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 800, fontSize: '26px', color: TEXT, marginBottom: '6px', letterSpacing: '-0.02em' }}>Amrit Raj</h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: AMBER, fontWeight: 500, marginBottom: '16px', lineHeight: 1.4 }}>
                  Founder, Future Minds Institute · Co-Founder, Women in Product India
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {['1,000+ professionals trained', 'Ex Vedantu · Xylem · Allen', 'WIP India Co-founder'].map((pill, i) => (
                    <span key={i} style={{ padding: '4px 12px', borderRadius: '100px', border: `1px solid ${AMBER_BORDER}`, background: AMBER_DIM, fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 600, color: AMBER }}>
                      {pill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ height: '1px', background: BORDER, marginBottom: '24px' }} />
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: SECONDARY, lineHeight: 1.8 }}>
              Amrit has 11+ years in the education sector and has trained 1,000+ working professionals across India in practical AI — founders, product leaders, marketers, ops heads, and corporate teams. Before AI, he built YouTube communities and ran content strategy for India's biggest edtech brands. He teaches in plain English, is allergic to jargon, and believes AI is the biggest career leverage shift of our generation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ background: SURFACE, padding: '120px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: BORDER }} />
        <div className="container-fm" style={{ textAlign: 'center' }}>
          <motion.h2 initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}
            style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 800, fontSize: 'clamp(30px, 5vw, 58px)', lineHeight: 1.05, letterSpacing: '-0.04em', color: TEXT, maxWidth: '860px', margin: '0 auto 20px' }}>
            The professionals who thrive in the next 5 years aren't avoiding AI.{' '}
            <span style={{ color: AMBER }}>They are the ones learning to direct it.</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.15 }}
            style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: SECONDARY, maxWidth: '580px', margin: '0 auto 44px', lineHeight: 1.75 }}>
            Register your interest now and be the first to hear when the next masterclass date is confirmed.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.25 }}>
            <RegisterButton onClick={() => setShowForm(true)} label="Reserve My Spot" style={{ padding: '18px 44px', fontSize: '16px', borderRadius: '14px' }} />
          </motion.div>
        </div>
      </section>

      {/* ── MODAL ── */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
            onClick={() => setShowForm(false)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{ background: SURFACE, border: `1px solid ${AMBER_BORDER}`, borderRadius: '16px', overflow: 'hidden', width: '100%', maxWidth: '560px', maxHeight: '90vh', display: 'flex', flexDirection: 'column', boxShadow: '0 24px 80px rgba(0,0,0,0.5)' }}
            >
              <div style={{ padding: '18px 24px', borderBottom: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0, position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, ${AMBER}, transparent)` }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: AMBER }} />
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 600, color: TEXT }}>Register Your Interest</span>
                </div>
                <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: SECONDARY, fontSize: '20px', lineHeight: 1, padding: '4px', transition: 'color 0.2s ease' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = TEXT; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = SECONDARY; }}>✕</button>
              </div>
              <div style={{ flex: 1, overflow: 'auto' }}>
                <iframe src="https://forms.gle/zz8ay8CSEdyZmckH7" width="100%" height="600" frameBorder="0" marginHeight="0" marginWidth="0" style={{ display: 'block' }} title="Masterclass Interest Form">
                  Loading form…
                </iframe>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />

      <style jsx>{`
        @media (max-width: 768px) {
          .fit-grid, .clients-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
