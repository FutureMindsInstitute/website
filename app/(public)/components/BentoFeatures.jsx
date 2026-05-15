'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { THEME } from '@/lib/constants';

/* ── Animated bar indicator ─────────────────────────── */
const BarIndicator = ({ bars = 4, delay = 0 }) => (
  <div style={{ display: 'flex', gap: '3px', alignItems: 'flex-end' }}>
    {Array.from({ length: bars }).map((_, i) => (
      <motion.div
        key={i}
        initial={{ scaleY: 0, opacity: 0 }}
        whileInView={{ scaleY: 1, opacity: 0.4 + i * 0.15 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: delay + i * 0.08, ease: 'easeOut' }}
        style={{
          width: '3px',
          height: `${8 + i * 3}px`,
          background: '#D4AF37',
          borderRadius: '2px',
          transformOrigin: 'bottom',
        }}
      />
    ))}
  </div>
);

/* ── Company grid with spring pop ───────────────────── */
const companies = ['Google', 'Amazon', 'Microsoft', 'Meta', 'Flipkart', 'PwC'];

const NetworkCard = () => (
  <div style={{ marginTop: '28px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
    {companies.map((name, i) => (
      <motion.div
        key={name}
        initial={{ opacity: 0, scale: 0.7, y: 10 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.15 + i * 0.07 }}
        whileHover={{ scale: 1.06, borderColor: 'rgba(212,175,55,0.35)', transition: { duration: 0.15 } }}
        style={{
          background: 'rgba(240,237,230,0.04)',
          border: '1px solid rgba(240,237,230,0.08)',
          borderRadius: '8px',
          padding: '10px 8px',
          textAlign: 'center',
          fontFamily: 'Inter, sans-serif',
          fontSize: '11px',
          fontWeight: 600,
          color: '#6B6B6B',
          letterSpacing: '0.04em',
          cursor: 'default',
        }}
      >
        {name}
      </motion.div>
    ))}
  </div>
);

/* ── Animated curriculum list ───────────────────────── */
const curriculum = [
  'Prompt Engineering Frameworks',
  'AI for Product Management',
  'Workflow Automation',
  'Real-World Case Studies',
];

const CurriculumCard = () => (
  <div style={{ marginTop: '28px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
    {curriculum.map((item, i) => (
      <motion.div
        key={item}
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.38, delay: 0.12 + i * 0.09, ease: 'easeOut' }}
        whileHover={{ x: 4, transition: { duration: 0.15 } }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '10px 14px',
          background: 'rgba(240,237,230,0.03)',
          border: '1px solid rgba(240,237,230,0.07)',
          borderRadius: '8px',
          cursor: 'default',
        }}
      >
        <motion.span
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.2 + i * 0.09 }}
          style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#D4AF37', flexShrink: 0 }}
        />
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#C5C0B8', fontWeight: 500 }}>
          {item}
        </span>
      </motion.div>
    ))}
  </div>
);

/* ── Pulsing live indicator ─────────────────────────── */
const LiveCard = () => (
  <div style={{ marginTop: '32px' }}>
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.2 }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '6px 14px',
        background: 'rgba(212,175,55,0.08)',
        border: '1px solid rgba(212,175,55,0.22)',
        borderRadius: '100px',
        marginBottom: '16px',
      }}
    >
      <motion.div
        animate={{ opacity: [1, 0.2, 1], scale: [1, 1.3, 1] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#D4AF37' }}
      />
      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 700, color: '#D4AF37', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        Live Now
      </span>
    </motion.div>
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.3 }}
      style={{ background: 'rgba(240,237,230,0.03)', border: '1px solid rgba(240,237,230,0.07)', borderRadius: '10px', padding: '16px' }}
    >
      <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#3A3A3A', marginBottom: '8px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
        Next Session
      </div>
      <div style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: '16px', fontWeight: 700, color: '#F0EDE6', marginBottom: '4px' }}>
        AI Mastery Masterclass
      </div>
      <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#6B6B6B' }}>
        Saturday, 31st May · 11:00 AM IST
      </div>
    </motion.div>
  </div>
);

/* ── Portfolio items ────────────────────────────────── */
const PortfolioCard = () => (
  <div style={{ marginTop: '28px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
    {[
      { title: 'AI Research Agent', tag: 'Built in 8h' },
      { title: 'Prompt Library',    tag: 'Shipped' },
      { title: 'GTM Strategy',      tag: 'Client-ready' },
    ].map((p, i) => (
      <motion.div
        key={p.title}
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.38, delay: 0.12 + i * 0.09, ease: 'easeOut' }}
        whileHover={{ x: -3, transition: { duration: 0.15 } }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 14px',
          background: 'rgba(240,237,230,0.03)',
          border: '1px solid rgba(240,237,230,0.07)',
          borderRadius: '8px',
          cursor: 'default',
        }}
      >
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#C5C0B8', fontWeight: 500 }}>
          {p.title}
        </span>
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 280, damping: 16, delay: 0.25 + i * 0.09 }}
          style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 700, color: '#D4AF37', letterSpacing: '0.08em', textTransform: 'uppercase' }}
        >
          {p.tag}
        </motion.span>
      </motion.div>
    ))}
  </div>
);

/* ── Card wrapper with hover glow ──────────────────── */
const BentoCard = ({ children, delay = 0, style = {} }) => (
  <motion.div
    initial={{ opacity: 0, y: 36, scale: 0.97 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ y: -4, transition: { duration: 0.25, ease: 'easeOut' } }}
    style={{
      background: '#1A2035',
      border: '1px solid rgba(240,237,230,0.07)',
      borderRadius: '16px',
      padding: '28px',
      overflow: 'hidden',
      position: 'relative',
      transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
      ...style,
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = 'rgba(212,175,55,0.25)';
      e.currentTarget.style.boxShadow = '0 8px 32px rgba(212,175,55,0.06)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = 'rgba(240,237,230,0.07)';
      e.currentTarget.style.boxShadow = 'none';
    }}
  >
    {children}
  </motion.div>
);

/* ── Card header row ────────────────────────────────── */
const CardHead = ({ tag, title, desc, bars = 4, barDelay = 0 }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
    <div>
      <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#3A3A3A', marginBottom: '10px' }}>
        {tag}
      </div>
      <h3 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 700, fontSize: '22px', color: '#F0EDE6', marginBottom: '6px', lineHeight: 1.2 }}>
        {title}
      </h3>
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#6B6B6B', lineHeight: 1.6, maxWidth: '380px' }}>
        {desc}
      </p>
    </div>
    <BarIndicator bars={bars} delay={barDelay} />
  </div>
);

/* ── Main component ─────────────────────────────────── */
const BentoFeatures = () => {
  return (
    <section
      id="benefits"
      style={{ background: '#0B0F1A', padding: '96px 0', position: 'relative', overflow: 'hidden' }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'rgba(240,237,230,0.07)' }} />

      <div className="container-fm">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          style={{ marginBottom: '48px' }}
        >
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#D4AF37', marginBottom: '16px' }}>
            Why FMI
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
            <h2 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 800, fontSize: 'clamp(30px, 4vw, 48px)', lineHeight: 1.07, letterSpacing: '-0.03em', color: '#F0EDE6', margin: 0 }}>
              Everything you need to{' '}
              <span style={{ color: '#D4AF37' }}>level up</span>
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: '#6B6B6B', maxWidth: '380px', lineHeight: 1.65, margin: 0 }}>
              Not just another course. A complete ecosystem for becoming AI-ready.
            </p>
          </div>
        </motion.div>

        {/* Bento grid */}
        <div
          style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gridTemplateRows: 'auto auto', gap: '16px' }}
          className="bento-grid"
        >
          {/* Card 1 — Big Tech Expertise */}
          <BentoCard delay={0}>
            <CardHead
              tag="Faculty"
              title="Big Tech Expertise"
              desc="Learn directly from professionals solving AI at scale across Google, Amazon, Microsoft, Meta and more."
              bars={4}
              barDelay={0.1}
            />
            <NetworkCard />
          </BentoCard>

          {/* Card 2 — Live Sessions */}
          <BentoCard delay={0.1}>
            <CardHead
              tag="Format"
              title="Live Sessions"
              desc="8-10 hour intensive formats designed for real outcomes, not passive viewing."
              bars={3}
              barDelay={0.18}
            />
            <LiveCard />
          </BentoCard>

          {/* Card 3 — Industry-First + Portfolio (two-col inner) */}
          <BentoCard delay={0.18} style={{ gridColumn: '1 / 2' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'start' }} className="card3-inner">
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#3A3A3A' }}>Curriculum</div>
                  <BarIndicator bars={4} delay={0.26} />
                </div>
                <h3 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 700, fontSize: '22px', color: '#F0EDE6', marginBottom: '6px', lineHeight: 1.2 }}>Industry-First</h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#6B6B6B', lineHeight: 1.6 }}>
                  Every topic is drawn from what top companies are actually building today.
                </p>
                <CurriculumCard />
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#3A3A3A' }}>Portfolio</div>
                  <BarIndicator bars={3} delay={0.3} />
                </div>
                <h3 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 700, fontSize: '22px', color: '#F0EDE6', marginBottom: '6px', lineHeight: 1.2 }}>Real Deliverables</h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#6B6B6B', lineHeight: 1.6 }}>
                  Walk away with projects you can show any employer or client.
                </p>
                <PortfolioCard />
              </div>
            </div>
          </BentoCard>

          {/* Card 4 — WIP Network */}
          <BentoCard delay={0.26} style={{ gridColumn: '2 / 3', gridRow: '2 / 3' }}>
            <CardHead
              tag="Community"
              title="WIP India Network"
              desc="Join a community of AI-forward professionals. Keep learning long after the cohort ends."
              bars={4}
              barDelay={0.34}
            />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '28px' }}>
              {[
                { value: '500+', label: 'Members' },
                { value: '10+',  label: 'Events/year' },
                { value: '95%',  label: 'Placement' },
                { value: 'WIP',  label: 'India Network' },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8, y: 12 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 240, damping: 18, delay: 0.3 + i * 0.08 }}
                  whileHover={{ scale: 1.04, transition: { duration: 0.15 } }}
                  style={{
                    background: 'rgba(240,237,230,0.03)',
                    border: '1px solid rgba(240,237,230,0.07)',
                    borderRadius: '10px',
                    padding: '16px',
                    textAlign: 'center',
                    cursor: 'default',
                  }}
                >
                  <div style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 800, fontSize: '22px', color: '#D4AF37', lineHeight: 1, marginBottom: '4px' }}>
                    {s.value}
                  </div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#6B6B6B', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </BentoCard>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .bento-grid {
            grid-template-columns: 1fr !important;
            grid-template-rows: auto !important;
          }
          .bento-grid > * {
            grid-column: auto !important;
            grid-row: auto !important;
          }
          .card3-inner {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default BentoFeatures;
