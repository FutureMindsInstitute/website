'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useUserModal } from '../../../hooks/useUserModal';
import { masterclassConfig } from './masterclass-config';

const AMBER = '#D4AF37';
const BG = '#0B0F1A';
const SURFACE = '#111827';
const SURFACE_UP = '#1A2035';
const TEXT = '#F0EDE6';
const SECONDARY = '#6B6B6B';
const MUTED = '#3A3A3A';
const BORDER = 'rgba(240,237,230,0.07)';
const BORDER_HOVER = 'rgba(240,237,230,0.14)';
const AMBER_DIM = 'rgba(212,175,55,0.10)';
const AMBER_BORDER = 'rgba(212,175,55,0.25)';

const faqData = [
  {
    q: 'Why Rs 99 and not free?',
    a: "Free events have a 60% no-show rate. Rs 99 filters for people who actually plan to show up, which keeps the room small, focused, and interactive. It's a commitment fee, not a price tag.",
  },
  {
    q: "I'm a complete beginner. Will I be lost?",
    a: "Not at all. The framework I teach works whether this is your first week with AI or your hundredth. Beginners often have an advantage: fewer bad habits to unlearn.",
  },
  {
    q: "What if I'm already a power user?",
    a: "You'll still get the framework, and most power users I meet are actually missing 2 of the 4 pillars. The live Q&A is where you'll get the most leverage.",
  },
  {
    q: 'Is this another AI hype session?',
    a: 'No. There are zero "AI is the future!" speeches. We diagnose what\'s broken in how you\'re using AI today, then fix it in real time.',
  },
  {
    q: 'What tools do I need?',
    a: 'A laptop and one AI tool (ChatGPT, Gemini, or any free tool you already use). That\'s it.',
  },
  {
    q: 'Can my company sponsor this?',
    a: 'Rs 99 is usually below approval thresholds, so most people just expense it. We provide a GST-compliant invoice on request.',
  },
  {
    q: 'What if I miss the live session?',
    a: 'Registered attendees will receive the recording. But the live Q&A and hands-on practice are where the real value sits. Show up if you possibly can.',
  },
];

function FAQItem({ item, isOpen, onToggle }) {
  return (
    <div
      style={{
        border: `1px solid ${isOpen ? AMBER_BORDER : BORDER}`,
        borderRadius: '12px',
        overflow: 'hidden',
        transition: 'border-color 0.25s ease',
        marginBottom: '8px',
      }}
    >
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          padding: '20px 24px',
          background: isOpen ? 'rgba(212,175,55,0.04)' : SURFACE,
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          textAlign: 'left',
          transition: 'background 0.2s ease',
        }}
      >
        <span
          style={{
            fontFamily: 'Bricolage Grotesque, sans-serif',
            fontWeight: 700,
            fontSize: '16px',
            color: TEXT,
            lineHeight: 1.35,
          }}
        >
          {item.q}
        </span>
        <span
          style={{
            color: AMBER,
            fontSize: '20px',
            flexShrink: 0,
            lineHeight: 1,
            display: 'inline-block',
            transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
          }}
        >
          +
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div
              style={{
                padding: '0 24px 20px',
                fontFamily: 'Inter, sans-serif',
                fontSize: '15px',
                color: SECONDARY,
                lineHeight: 1.72,
                background: 'rgba(212,175,55,0.04)',
              }}
            >
              {item.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const SectionTag = ({ label }) => (
  <div
    style={{
      fontFamily: 'Inter, sans-serif',
      fontSize: '11px',
      fontWeight: 700,
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
      color: AMBER,
      marginBottom: '16px',
    }}
  >
    {label}
  </div>
);

export default function AIMasteryPage() {
  const { openLogin } = useUserModal();
  const [openFaq, setOpenFaq] = useState(null);
  const cfg = masterclassConfig;

  const openReg = () => {
    if (cfg.registrationLink && cfg.registrationLink !== '#') {
      window.open(cfg.registrationLink, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div style={{ background: BG, color: TEXT, minHeight: '100vh' }}>
      <Navbar />

      {/* ────────── SECTION 1 — HERO ────────── */}
      <section
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: BG,
          position: 'relative',
          overflow: 'hidden',
          paddingTop: '80px',
        }}
      >
        <div className="grid-bg" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }} />
        <div className="shimmer-line" />
        <div className="shimmer-line shimmer-line-2" />
        {/* Ambient glow */}
        <div style={{ position: 'absolute', top: '20%', left: '30%', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

        <div
          className="container-fm"
          style={{ position: 'relative', zIndex: 10, paddingTop: '64px', paddingBottom: '64px' }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '60% 40%',
              gap: '48px',
              alignItems: 'center',
            }}
            className="mc-hero-grid"
          >
            {/* Left */}
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
                  <motion.span
                    animate={{ opacity: [1, 0.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ width: '7px', height: '7px', borderRadius: '50%', background: AMBER, display: 'inline-block', flexShrink: 0 }}
                  />
                  Live Masterclass
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.1 }}
                style={{
                  fontFamily: 'Bricolage Grotesque, sans-serif',
                  fontWeight: 800,
                  fontSize: 'clamp(40px, 6vw, 72px)',
                  lineHeight: 1.0,
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
                  maxWidth: '560px',
                  marginBottom: '28px',
                  lineHeight: 1.7,
                }}
              >
                9 out of 10 working professionals are barely scratching the surface of what AI can do and falling further behind every week. This 2-hour live masterclass is how you catch up.
              </motion.p>

              {/* Logistics row */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', marginBottom: '32px' }}
              >
                {[cfg.date, `${cfg.time} ${cfg.timezone}`, 'Live on Zoom', `Rs ${cfg.price}`].map((item, i, arr) => (
                  <React.Fragment key={i}>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: TEXT, fontWeight: 500 }}>{item}</span>
                    {i < arr.length - 1 && <span style={{ color: MUTED, fontSize: '13px' }}>·</span>}
                  </React.Fragment>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.38 }}
              >
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: AMBER, fontWeight: 500 }}>
                  Only {cfg.seatsLeft} of {cfg.totalSeats} seats left. Last masterclass filled in under 48 hours.
                </p>
              </motion.div>
            </div>

            {/* Right — event card */}
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
                  padding: '32px',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: `0 0 60px rgba(212,175,55,0.07)`,
                }}
              >
                {/* Amber top accent */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, ${AMBER}, transparent)` }} />

                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: MUTED, marginBottom: '24px' }}>
                  Event Details
                </div>

                {[
                  { label: 'Date', value: cfg.date },
                  { label: 'Time', value: `${cfg.time} ${cfg.timezone}` },
                  { label: 'Format', value: 'Live Zoom' },
                  { label: 'Seat Reservation', value: `Rs ${cfg.price}` },
                ].map((row, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.07 }}
                    style={{ marginBottom: '18px', paddingBottom: '18px', borderBottom: i < 3 ? `1px solid ${BORDER}` : 'none' }}
                  >
                    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: MUTED, marginBottom: '5px' }}>
                      {row.label}
                    </div>
                    <div style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 700, fontSize: row.label === 'Date' ? '18px' : '16px', color: row.label === 'Seat Reservation' ? AMBER : TEXT, lineHeight: 1.3 }}>
                      {row.value}
                    </div>
                  </motion.div>
                ))}

                {/* Seats progress bar */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: AMBER, fontWeight: 600 }}>
                      {cfg.seatsLeft} seats remaining
                    </span>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: MUTED }}>
                      of {cfg.totalSeats}
                    </span>
                  </div>
                  <div style={{ width: '100%', height: '4px', background: 'rgba(240,237,230,0.07)', borderRadius: '2px', overflow: 'hidden' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${((cfg.totalSeats - cfg.seatsLeft) / cfg.totalSeats) * 100}%` }}
                      transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' }}
                      style={{ height: '100%', background: AMBER, borderRadius: '2px' }}
                    />
                  </div>
                </div>

                <motion.button
                  onClick={openReg}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary"
                  style={{ width: '100%', padding: '16px', fontSize: '16px', borderRadius: '12px', fontWeight: 700 }}
                >
                  Reserve My Seat · Rs {cfg.price}
                </motion.button>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: MUTED, textAlign: 'center', marginTop: '10px', lineHeight: 1.5 }}>
                  Commitment fee only. Not the course price.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ────────── SECTION 2 — THE PROBLEM ────────── */}
      <section style={{ background: SURFACE, padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: BORDER }} />
        <div className="container-fm">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            style={{ maxWidth: '760px' }}
          >
            <SectionTag label="The Problem" />
            <h2
              style={{
                fontFamily: 'Bricolage Grotesque, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(28px, 4vw, 46px)',
                lineHeight: 1.08,
                letterSpacing: '-0.03em',
                color: TEXT,
                marginBottom: '24px',
              }}
            >
              If you have been using AI and getting generic, textbook answers, it is not the AI's fault.
            </h2>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: SECONDARY, lineHeight: 1.8, marginBottom: '40px' }}>
              <p style={{ marginBottom: '12px' }}>You're typing one-line prompts into a tool built for nuanced thinking. You're using one tool for everything, even when a different approach would be 10x better. You're rewriting most of what AI gives you and quietly wondering why your colleagues seem to get so much more out of it.</p>
              <p>You're not broken. You're under-trained. And every week you stay stuck, the gap between you and the people who get it widens.</p>
            </div>

            {/* Callout box */}
            <div
              style={{
                background: 'rgba(212,175,55,0.05)',
                border: `1px solid ${AMBER_BORDER}`,
                borderLeft: `4px solid ${AMBER}`,
                borderRadius: '12px',
                padding: '32px 36px',
                marginBottom: '32px',
              }}
            >
              <p
                style={{
                  fontFamily: 'Bricolage Grotesque, sans-serif',
                  fontWeight: 700,
                  fontSize: 'clamp(18px, 2.5vw, 24px)',
                  color: TEXT,
                  lineHeight: 1.5,
                  marginBottom: '16px',
                  letterSpacing: '-0.01em',
                }}
              >
                "9 out of 10 working professionals I've trained were unlocking less than 10% of what AI can actually do for them."
              </p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: AMBER, fontWeight: 600 }}>
                Future Mind Institute, cohort observations
              </p>
            </div>

            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: SECONDARY, lineHeight: 1.75 }}>
              That's not a marketing line. That's what I see in every cohort, every workshop, every corporate training I run. Smart, senior people. Hitting a ceiling that has nothing to do with AI and everything to do with how they're talking to it. This masterclass is the fix.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ────────── SECTION 3 — THE PROMISE ────────── */}
      <section style={{ background: BG, padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: BORDER }} />
        <div className="container-fm">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            style={{ marginBottom: '56px' }}
          >
            <SectionTag label="What You Will Get" />
            <h2
              style={{
                fontFamily: 'Bricolage Grotesque, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(28px, 4vw, 48px)',
                lineHeight: 1.07,
                letterSpacing: '-0.03em',
                color: TEXT,
                maxWidth: '600px',
              }}
            >
              In 2 hours, here is what changes.
            </h2>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '760px', marginBottom: '48px' }}>
            {[
              'Know exactly why your AI prompts have been falling flat and what 90% of professionals are getting wrong.',
              'Have the 4-pillar framework I use every day. Works on ChatGPT, Gemini, and any AI tool, on any task.',
              'Watch a working AI workflow built live in under 5 minutes. The same kind I build for paying clients.',
              'Do it yourself on your own work and feel the difference immediately.',
              "Get a copy-paste prompt template you'll use Monday morning.",
            ].map((outcome, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                style={{
                  background: SURFACE,
                  border: `1px solid ${BORDER}`,
                  borderRadius: '12px',
                  padding: '20px 24px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '18px',
                  transition: 'border-color 0.25s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = BORDER_HOVER)}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = BORDER)}
              >
                <span style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 800, fontSize: '22px', color: AMBER, opacity: 0.5, flexShrink: 0, lineHeight: 1.2, minWidth: '32px' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: TEXT, lineHeight: 1.65 }}>
                  {outcome}
                </p>
              </motion.div>
            ))}
          </div>

          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: MUTED, fontStyle: 'italic', marginBottom: '40px' }}>
            No theory dumps. No AI is the future speeches. Real techniques you can deploy this week.
          </p>

          <button onClick={openReg} className="btn-primary" style={{ padding: '14px 32px', fontSize: '15px', borderRadius: '12px' }}>
            Yes, I want this. Reserve My Seat for Rs {cfg.price}
          </button>
        </div>
      </section>

      {/* ────────── SECTION 4 — CURRICULUM ────────── */}
      <section style={{ background: SURFACE, padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: BORDER }} />
        <div className="container-fm">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            style={{ marginBottom: '56px' }}
          >
            <SectionTag label="Curriculum" />
            <h2
              style={{
                fontFamily: 'Bricolage Grotesque, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(28px, 4vw, 48px)',
                lineHeight: 1.07,
                letterSpacing: '-0.03em',
                color: TEXT,
                maxWidth: '560px',
              }}
            >
              Here is exactly what we will cover.
            </h2>
          </motion.div>

          <div
            style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', maxWidth: '960px' }}
            className="curriculum-grid"
          >
            {[
              { num: '// 01', title: 'Where most professionals are stuck', desc: 'The diagnostic that 9 out of 10 people fail. Done live.' },
              { num: '// 02', title: 'The 4-Pillar Framework', desc: 'Role, Context, Constraints, Format. The structure behind every prompt that works.' },
              { num: '// 03', title: 'Three live demos', desc: '90-day GTM plan, competitor research brief, and custom AI strategist built in real time.' },
              { num: '// 04', title: 'Your turn', desc: 'Apply the framework to your own real work, live, with Amrit watching.' },
              { num: '// 05', title: 'Live Q&A', desc: 'Bring your stuck points and messy workflows. We unstick them on the call.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                style={{
                  background: SURFACE_UP,
                  border: `1px solid ${BORDER}`,
                  borderRadius: '12px',
                  padding: '24px',
                  transition: 'border-color 0.25s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = BORDER_HOVER)}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = BORDER)}
              >
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: AMBER, marginBottom: '10px' }}>
                  {item.num}
                </div>
                <h3 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 700, fontSize: '17px', color: TEXT, marginBottom: '8px', lineHeight: 1.3 }}>
                  {item.title}
                </h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: SECONDARY, lineHeight: 1.65 }}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────── SECTION 5 — HOST ────────── */}
      <section style={{ background: BG, padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: BORDER }} />
        <div className="container-fm">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            style={{ marginBottom: '48px' }}
          >
            <SectionTag label="Your Host" />
            <h2
              style={{
                fontFamily: 'Bricolage Grotesque, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(28px, 4vw, 48px)',
                lineHeight: 1.07,
                letterSpacing: '-0.03em',
                color: TEXT,
              }}
            >
              Who is running this
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            style={{
              background: SURFACE,
              border: `1px solid ${BORDER}`,
              borderLeft: `3px solid ${AMBER}`,
              borderRadius: '12px',
              padding: '40px',
              maxWidth: '840px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '28px', marginBottom: '28px', flexWrap: 'wrap' }}>
              <img
                src="/assets/educators/amritraj.jpg"
                alt="Amrit Raj"
                style={{ width: '96px', height: '96px', borderRadius: '12px', objectFit: 'cover', flexShrink: 0 }}
              />
              <div style={{ flex: 1, minWidth: '200px' }}>
                <h3 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 800, fontSize: '26px', color: TEXT, marginBottom: '6px', letterSpacing: '-0.02em' }}>
                  Amrit Raj
                </h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: AMBER, fontWeight: 500, marginBottom: '16px', lineHeight: 1.4 }}>
                  Founder, Future Mind Institute · Co-founder, Women in Product India
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {['1,000+ professionals trained', '15+ companies', 'WIP India Co-founder'].map((pill, i) => (
                    <span
                      key={i}
                      style={{
                        padding: '4px 12px',
                        borderRadius: '100px',
                        border: `1px solid ${AMBER_BORDER}`,
                        background: AMBER_DIM,
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '11px',
                        fontWeight: 600,
                        color: AMBER,
                      }}
                    >
                      {pill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ height: '1px', background: BORDER, marginBottom: '24px' }} />
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: SECONDARY, lineHeight: 1.8 }}>
              I've trained 1,000+ working professionals across India in practical AI: founders, product leaders, marketers, ops heads, agency teams. Before AI took over my life, I built communities of 100K+ on YouTube and ran content strategy for some of India's biggest edtech brands (Vedantu, Xylem, Allen). I teach in plain English. I'm allergic to jargon. And I genuinely believe AI is the biggest leverage shift in our careers, which is why I want it in the hands of working professionals, not just engineers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ────────── SECTION 6 — FIT CHECK ────────── */}
      <section style={{ background: SURFACE, padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: BORDER }} />
        <div className="container-fm">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            style={{ marginBottom: '56px' }}
          >
            <SectionTag label="Is This For You" />
            <h2
              style={{
                fontFamily: 'Bricolage Grotesque, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(28px, 4vw, 48px)',
                lineHeight: 1.07,
                letterSpacing: '-0.03em',
                color: TEXT,
                maxWidth: '600px',
              }}
            >
              Honest fit-check before you sign up.
            </h2>
          </motion.div>

          <div
            style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', maxWidth: '900px', marginBottom: '40px' }}
            className="fit-check-grid"
          >
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{ background: SURFACE_UP, border: `1px solid ${BORDER}`, borderTop: `2px solid ${AMBER}`, borderRadius: '12px', padding: '28px' }}
            >
              <div style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 700, fontSize: '16px', color: AMBER, marginBottom: '20px' }}>
                This is for you if:
              </div>
              <ul style={{ listStyle: 'none' }}>
                {[
                  'You are a working professional',
                  'You want to actually start using AI in your work',
                  'You are tired of generic AI outputs',
                  'You want a portfolio of techniques, not a certificate',
                  'You learn best by doing, not just watching',
                ].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
                    <span style={{ color: AMBER, fontSize: '15px', lineHeight: '1.5', flexShrink: 0 }}>✓</span>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: TEXT, lineHeight: 1.55 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{ background: SURFACE_UP, border: `1px solid ${BORDER}`, borderTop: '2px solid rgba(240,237,230,0.12)', borderRadius: '12px', padding: '28px' }}
            >
              <div style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 700, fontSize: '16px', color: SECONDARY, marginBottom: '20px' }}>
                Skip this if:
              </div>
              <ul style={{ listStyle: 'none' }}>
                {[
                  'You expect AI to replace your judgment',
                  'You want a magic bullet without doing the work',
                  'You just want a certificate to add to LinkedIn',
                ].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
                    <span style={{ color: MUTED, fontSize: '15px', lineHeight: '1.5', flexShrink: 0 }}>✕</span>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: SECONDARY, lineHeight: 1.55 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: SECONDARY, fontStyle: 'italic' }}>
            If most ticks are on the left, you will get massive value here.
          </p>
        </div>
      </section>

      {/* ────────── SECTION 7 — WHY LIVE ────────── */}
      <section style={{ background: BG, padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: BORDER }} />
        <div className="container-fm">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            style={{ marginBottom: '48px', maxWidth: '720px' }}
          >
            <SectionTag label="Why Attend Live" />
            <h2
              style={{
                fontFamily: 'Bricolage Grotesque, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(28px, 4vw, 48px)',
                lineHeight: 1.07,
                letterSpacing: '-0.03em',
                color: TEXT,
                marginBottom: '16px',
              }}
            >
              Recordings teach. Live sessions transform.
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: SECONDARY, lineHeight: 1.7 }}>
              You could watch 100 YouTube videos on AI prompting and learn less than what you'll get in this 2-hour live session.
            </p>
          </motion.div>

          <div
            style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', maxWidth: '900px', marginBottom: '48px' }}
            className="why-live-grid"
          >
            {[
              { title: 'Live Q&A on YOUR work', desc: 'Your specific stuck points, your industry, your role. Answered in real time.' },
              { title: 'Hands-on practice while I watch', desc: "When you try the framework on your own task and it doesn't click, I can correct it in 30 seconds." },
              { title: 'Interactive demos', desc: 'You can call out what you want me to build live.' },
              { title: 'The room itself', desc: 'Senior professionals across product, marketing, ops, and founders. The questions they ask unlock things you did not know to ask.' },
              { title: 'Limited to 200 seats', desc: 'Keeps the room small enough to actually be interactive.' },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                style={{
                  background: SURFACE,
                  border: `1px solid ${BORDER}`,
                  borderRadius: '12px',
                  padding: '24px',
                  transition: 'border-color 0.25s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = BORDER_HOVER)}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = BORDER)}
              >
                <h3 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 700, fontSize: '16px', color: TEXT, marginBottom: '8px' }}>{card.title}</h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: SECONDARY, lineHeight: 1.65 }}>{card.desc}</p>
              </motion.div>
            ))}
          </div>

          <button onClick={openReg} className="btn-primary" style={{ padding: '14px 32px', fontSize: '15px', borderRadius: '12px' }}>
            Reserve My Live Seat · Rs {cfg.price}
          </button>
        </div>
      </section>

      {/* ────────── SECTION 8 — TESTIMONIALS ────────── */}
      <section style={{ background: SURFACE, padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: BORDER }} />
        <div className="container-fm">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            style={{ marginBottom: '56px' }}
          >
            <SectionTag label="Past Participants" />
            <h2
              style={{
                fontFamily: 'Bricolage Grotesque, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(28px, 4vw, 48px)',
                lineHeight: 1.07,
                letterSpacing: '-0.03em',
                color: TEXT,
              }}
            >
              What past participants say.
            </h2>
          </motion.div>

          <div
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}
            className="testimonials-grid"
          >
            {[
              { quote: "I shipped a custom GPT for my entire team in week 3. They actually use it. That's never happened before.", name: 'Senior PM, fintech', role: 'Bangalore' },
              { quote: 'Got my time back. Genuinely. The masterclass alone was worth 10x what I paid.', name: 'Marketing Director', role: 'D2C brand' },
              { quote: 'I came in knowing nothing about AI. I left with a workflow I now use every single day.', name: 'Operations Head', role: 'IT services' },
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                style={{ background: SURFACE_UP, border: `1px solid ${BORDER}`, borderRadius: '12px', padding: '24px' }}
              >
                <div style={{ display: 'flex', gap: '2px', marginBottom: '14px' }}>
                  {Array.from({ length: 5 }).map((_, j) => <span key={j} style={{ color: AMBER, fontSize: '14px' }}>★</span>)}
                </div>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#C5C0B8', lineHeight: 1.75, fontStyle: 'italic', marginBottom: '18px' }}>"{t.quote}"</p>
                <div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '13px', color: TEXT }}>{t.name}</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: SECONDARY }}>{t.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: MUTED, fontStyle: 'italic' }}>
            [Replace with real testimonials before going live.]
          </p>
        </div>
      </section>

      {/* ────────── SECTION 9 — FAQ ────────── */}
      <section style={{ background: BG, padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: BORDER }} />
        <div className="container-fm">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            style={{ marginBottom: '56px' }}
          >
            <SectionTag label="FAQ" />
            <h2
              style={{
                fontFamily: 'Bricolage Grotesque, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(28px, 4vw, 48px)',
                lineHeight: 1.07,
                letterSpacing: '-0.03em',
                color: TEXT,
              }}
            >
              Frequently asked questions
            </h2>
          </motion.div>

          <div style={{ maxWidth: '760px' }}>
            {faqData.map((item, i) => (
              <FAQItem
                key={i}
                item={item}
                isOpen={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ────────── SECTION 10 — FINAL CTA ────────── */}
      <section
        style={{ background: SURFACE, padding: '120px 0', position: 'relative', overflow: 'hidden' }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: BORDER }} />
        <div className="grid-bg" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }} />

        <div className="container-fm" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <motion.h2
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            style={{
              fontFamily: 'Bricolage Grotesque, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(32px, 5vw, 62px)',
              lineHeight: 1.05,
              letterSpacing: '-0.04em',
              color: TEXT,
              maxWidth: '900px',
              margin: '0 auto 24px',
            }}
          >
            The professionals who will thrive in the next 5 years aren't the ones who avoided AI.{' '}
            <span style={{ color: AMBER }}>They are the ones who learned to direct it.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.15 }}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '16px',
              color: SECONDARY,
              maxWidth: '640px',
              margin: '0 auto 48px',
              lineHeight: 1.75,
            }}
          >
            The gap between those two groups is widening every week. You can stay where you are, or you can spend 2 hours and Rs {cfg.price} to start closing it. I hope to see you there. Amrit
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <button
              onClick={openReg}
              className="btn-primary"
              style={{ padding: '18px 44px', fontSize: '17px', borderRadius: '14px', marginBottom: '20px' }}
            >
              Reserve My Seat for {cfg.date} · Rs {cfg.price}
            </button>

            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: AMBER, marginTop: '12px' }}>
              Only {cfg.seatsLeft} of {cfg.totalSeats} seats left · Last masterclass filled in 48 hours · Live-only Q&A and hands-on practice
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        @media (max-width: 900px) {
          .mc-hero-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 768px) {
          .curriculum-grid,
          .fit-check-grid,
          .why-live-grid,
          .testimonials-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
