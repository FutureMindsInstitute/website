'use client';

import React from 'react';
import { motion } from 'framer-motion';

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
});

const pillars = [
  {
    n: '01',
    title: 'Built for working teams',
    body: 'Sessions are designed around real workflows — reports, vendor work, customer responses — not generic AI demos. Participants apply what they learn within hours.',
  },
  {
    n: '02',
    title: 'Powered by Women in Product India',
    body: "FMI is the education arm of Women in Product India — one of India's largest product communities, lending credibility across product, tech, and operations.",
  },
  {
    n: '03',
    title: 'Multi-format curriculum design',
    body: 'We deliver programmes from 90-minute focused sessions to 30-hour advanced cohorts, each shaped to the audience — operating teams, leadership, founders, or faculty.',
  },
  {
    n: '04',
    title: 'Led by an experienced operator',
    body: 'Workshops are led by Amrit Raj — co-founder of FMI and Women in Product India, with prior leadership roles at Vedantu, Xylem, and Allen Career Institute.',
  },
];

const About = () => (
  <section
    id="about"
    style={{ background: '#111827', position: 'relative', overflow: 'hidden' }}
  >
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'rgba(240,237,230,0.07)' }} />

    <div className="container-fm">

      {/* ── HEADER ── */}
      <motion.div {...fade(0)} style={{
        padding: '80px 0 56px',
        borderBottom: '1px solid rgba(240,237,230,0.07)',
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: '60px', alignItems: 'end',
      }} className="about-header-grid">

        {/* Left */}
        <div>
          <div style={{
            fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 700,
            letterSpacing: '0.4em', textTransform: 'uppercase', color: '#D4AF37', marginBottom: '14px',
          }}>
            F U T U R E M I N D S&nbsp;&nbsp;I N S T I T U T E
          </div>
          <div style={{
            fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 500,
            color: '#4A4A4A', marginBottom: '24px', letterSpacing: '0.04em',
          }}>
            Powered by Women in Product India
          </div>
          <h2 style={{
            fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 800,
            fontSize: 'clamp(32px, 4vw, 54px)',
            lineHeight: 1.05, letterSpacing: '-0.03em', color: '#F0EDE6', margin: 0,
          }}>
            Why Future Minds<br />
            <span style={{ color: '#D4AF37' }}>Institute</span>
          </h2>
        </div>

        {/* Right: approach */}
        <div>
          <div style={{
            fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 700,
            letterSpacing: '0.25em', color: '#4A4A4A', marginBottom: '14px',
          }}>
            O U R&nbsp;&nbsp;A P P R O A C H
          </div>
          <p style={{
            fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 700,
            fontSize: '17px', color: '#F0EDE6', lineHeight: 1.45, marginBottom: '12px', margin: '0 0 12px',
          }}>
            A practitioner, not a presenter.
          </p>
          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: '14px',
            color: '#6B6B6B', lineHeight: 1.75, margin: 0,
          }}>
            Future Minds Institute delivers hands-on AI training focused on applied workflows — what teams actually do every day, not abstract AI literacy. Every session uses production-tested prompts participants can adopt the same week.
          </p>
        </div>
      </motion.div>

      {/* ── PILLARS 2x2 ── */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: '1px', background: 'rgba(240,237,230,0.07)',
        borderBottom: '1px solid rgba(240,237,230,0.07)',
      }} className="pillars-grid">
        {pillars.map((p, i) => (
          <motion.div key={i} {...fade(0.06 + i * 0.07)} style={{
            background: '#111827', padding: '36px',
            transition: 'background 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = '#141e2f'}
            onMouseLeave={e => e.currentTarget.style.background = '#111827'}
          >
            <div style={{
              fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 700,
              letterSpacing: '0.12em', color: '#D4AF37', marginBottom: '16px',
            }}>{p.n}</div>
            <h3 style={{
              fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 700,
              fontSize: '17px', color: '#F0EDE6', marginBottom: '10px', lineHeight: 1.3,
            }}>{p.title}</h3>
            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: '13px',
              color: '#6B6B6B', lineHeight: 1.72, margin: 0,
            }}>{p.body}</p>
          </motion.div>
        ))}
      </div>

      {/* ── GET IN TOUCH ── */}
      <motion.div {...fade(0.1)} style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: '1px', background: 'rgba(240,237,230,0.07)',
        borderBottom: '1px solid rgba(240,237,230,0.07)',
      }} className="about-contact-grid">
        <div style={{ background: '#111827', padding: '44px 36px' }}>
          <div style={{
            fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 700,
            letterSpacing: '0.25em', color: '#D4AF37', marginBottom: '14px',
          }}>G E T&nbsp;&nbsp;I N&nbsp;&nbsp;T O U C H</div>
          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: '15px',
            color: '#6B6B6B', lineHeight: 1.7, margin: 0, maxWidth: '300px',
          }}>
            Curious about a workshop for your team? Let's talk.
          </p>
        </div>
        <div style={{ background: '#111827', padding: '44px 36px' }}>
          <div style={{
            fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 700,
            fontSize: '18px', color: '#F0EDE6', marginBottom: '4px',
          }}>Amrit Raj</div>
          <div style={{
            fontFamily: 'Inter, sans-serif', fontSize: '12px',
            color: '#4A4A4A', marginBottom: '22px',
          }}>Co-founder, Future Minds Institute</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { label: 'Email', value: 'amrit.raj@futuremindsinstitute.com', href: 'mailto:amrit.raj@futuremindsinstitute.com' },
              { label: 'Phone', value: '+91 70226 12623', href: 'tel:+917022612623' },
            ].map(({ label, value, href }) => (
              <div key={label} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <span style={{
                  fontFamily: 'Inter, sans-serif', fontSize: '9px', fontWeight: 700,
                  letterSpacing: '0.12em', color: '#3A3A3A', textTransform: 'uppercase', flexShrink: 0, width: '36px',
                }}>{label}</span>
                <a href={href} style={{
                  fontFamily: 'Inter, sans-serif', fontSize: '14px',
                  color: '#D4AF37', textDecoration: 'none', transition: 'color 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.color = '#F0EDE6'}
                  onMouseLeave={e => e.currentTarget.style.color = '#D4AF37'}
                >{value}</a>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

    </div>

    <style jsx>{`
      @media (max-width: 768px) {
        .about-header-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        .pillars-grid { grid-template-columns: 1fr !important; }
        .about-contact-grid { grid-template-columns: 1fr !important; }
      }
    `}</style>
  </section>
);

export default About;
