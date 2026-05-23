'use client';

import React from 'react';
import { motion } from 'framer-motion';

const pillars = [
  {
    title: 'Built for working teams',
    body: 'Sessions are designed around real workflows — reports, vendor work, customer responses — not generic AI demos. Participants apply what they learn within hours.',
  },
  {
    title: 'Powered by Women in Product India',
    body: 'FMI is the education arm of Women in Product India — one of India\'s largest product communities, lending credibility across product, tech, and operations.',
  },
  {
    title: 'Multi-format curriculum design',
    body: 'We deliver programmes from 90-minute focused sessions to 30-hour advanced cohorts, each shaped to the audience — operating teams, leadership, founders, or faculty.',
  },
  {
    title: 'Led by an experienced operator',
    body: 'Workshops are led by Amrit Raj — co-founder of FMI and Women in Product India, with prior leadership roles at Vedantu, Xylem, and Allen Career Institute.',
  },
];

const stats = [
  { value: '1,000+', label: 'PROFESSIONALS\n& STUDENTS TRAINED' },
  { value: '50+',    label: 'WORKSHOPS\nDELIVERED'              },
  { value: '4.9/5',  label: 'AVERAGE PARTICIPANT\nFEEDBACK'    },
];

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
});

const About = () => (
  <section
    id="about"
    style={{ background: '#111827', padding: '0 0 96px', position: 'relative', overflow: 'hidden' }}
  >
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'rgba(240,237,230,0.07)' }} />

    <div className="container-fm">

      {/* ── TOP HEADER BAR ── */}
      <motion.div {...fade(0)} style={{
        paddingTop: '80px',
        paddingBottom: '64px',
        borderBottom: '1px solid rgba(240,237,230,0.07)',
        display: 'flex', alignItems: 'flex-end',
        justifyContent: 'space-between', flexWrap: 'wrap', gap: '32px',
      }}>
        <div>
          {/* Spaced wordmark */}
          <div style={{
            fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 700,
            letterSpacing: '0.4em', textTransform: 'uppercase', color: '#D4AF37',
            marginBottom: '18px',
          }}>
            F U T U R E M I N D S&nbsp;&nbsp;I N S T I T U T E
          </div>
          <div style={{
            fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 500,
            letterSpacing: '0.08em', color: '#4A4A4A', marginBottom: '28px',
          }}>
            Powered by Women in Product India
          </div>
          <h2 style={{
            fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 800,
            fontSize: 'clamp(34px, 4.5vw, 58px)',
            lineHeight: 1.03, letterSpacing: '-0.03em',
            color: '#F0EDE6', margin: 0,
          }}>
            Why Future Minds<br />
            <span style={{ color: '#D4AF37' }}>Institute</span>
          </h2>
        </div>

        {/* Approach block */}
        <div style={{ maxWidth: '420px' }}>
          <div style={{
            fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 700,
            letterSpacing: '0.3em', textTransform: 'uppercase', color: '#4A4A4A',
            marginBottom: '16px',
          }}>
            O U R&nbsp;&nbsp;A P P R O A C H
          </div>
          <p style={{
            fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 700,
            fontSize: '18px', color: '#F0EDE6', lineHeight: 1.45, marginBottom: '14px',
          }}>
            A practitioner, not a presenter.
          </p>
          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: '14px',
            color: '#6B6B6B', lineHeight: 1.75, margin: 0,
          }}>
            Future Minds Institute (FMI) delivers hands-on AI training focused on applied
            workflows — what teams actually do every day, not abstract AI literacy. Every
            session uses production-tested prompts participants can adopt the same week.
          </p>
        </div>
      </motion.div>

      {/* ── STATS ROW ── */}
      <motion.div {...fade(0.1)} style={{
        display: 'grid', gridTemplateColumns: 'repeat(3,1fr)',
        borderBottom: '1px solid rgba(240,237,230,0.07)',
      }} className="about-stats-row">
        {stats.map((s, i) => (
          <div key={i} style={{
            padding: '40px 32px',
            borderRight: i < 2 ? '1px solid rgba(240,237,230,0.07)' : 'none',
          }}>
            <div style={{
              fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 800,
              fontSize: 'clamp(36px, 4vw, 56px)',
              color: '#D4AF37', lineHeight: 1, marginBottom: '12px',
              letterSpacing: '-0.02em',
            }}>
              {s.value}
            </div>
            <div style={{
              fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 700,
              letterSpacing: '0.2em', color: '#4A4A4A', lineHeight: 1.6,
              whiteSpace: 'pre-line',
            }}>
              {s.label}
            </div>
          </div>
        ))}
      </motion.div>

      {/* ── PILLAR CARDS ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'rgba(240,237,230,0.07)' }} className="pillars-grid">
        {pillars.map((p, i) => (
          <motion.div
            key={i}
            {...fade(0.08 + i * 0.08)}
            style={{
              background: '#111827', padding: '40px 36px',
              position: 'relative', overflow: 'hidden',
              transition: 'background 0.25s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#141e2f'}
            onMouseLeave={e => e.currentTarget.style.background = '#111827'}
          >
            {/* Index */}
            <div style={{
              fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 700,
              letterSpacing: '0.15em', color: '#D4AF37', marginBottom: '20px',
            }}>
              {String(i + 1).padStart(2, '0')}
            </div>
            <h3 style={{
              fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 700,
              fontSize: '18px', color: '#F0EDE6', marginBottom: '12px', lineHeight: 1.3,
            }}>
              {p.title}
            </h3>
            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: '14px',
              color: '#6B6B6B', lineHeight: 1.72, margin: 0,
            }}>
              {p.body}
            </p>
            {/* Gold left accent on hover */}
            <div style={{
              position: 'absolute', left: 0, top: 0, bottom: 0, width: '2px',
              background: '#D4AF37', opacity: 0, transition: 'opacity 0.25s',
            }} className="pillar-accent" />
          </motion.div>
        ))}
      </div>

      {/* ── GET IN TOUCH ── */}
      <motion.div {...fade(0.15)} style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: '1px', background: 'rgba(240,237,230,0.07)',
        borderTop: '1px solid rgba(240,237,230,0.07)',
      }} className="about-contact-row">
        {/* Label side */}
        <div style={{ background: '#111827', padding: '48px 36px' }}>
          <div style={{
            fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 700,
            letterSpacing: '0.3em', textTransform: 'uppercase', color: '#D4AF37', marginBottom: '16px',
          }}>
            G E T&nbsp;&nbsp;I N&nbsp;&nbsp;T O U C H
          </div>
          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: '15px',
            color: '#6B6B6B', lineHeight: 1.7, margin: 0, maxWidth: '320px',
          }}>
            Curious about a workshop for your team? Let's talk.
          </p>
        </div>

        {/* Contact details */}
        <div style={{ background: '#111827', padding: '48px 36px' }}>
          <div style={{
            fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 700,
            fontSize: '18px', color: '#F0EDE6', marginBottom: '6px',
          }}>
            Amrit Raj
          </div>
          <div style={{
            fontFamily: 'Inter, sans-serif', fontSize: '13px',
            color: '#4A4A4A', marginBottom: '24px',
          }}>
            Co-founder, Future Minds Institute
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { label: 'Email', value: 'amrit.raj@futuremindsinstitute.com', href: 'mailto:amrit.raj@futuremindsinstitute.com' },
              { label: 'Phone', value: '+91 70226 12623', href: 'tel:+917022612623' },
            ].map(({ label, value, href }) => (
              <div key={label} style={{ display: 'flex', gap: '12px', alignItems: 'baseline' }}>
                <span style={{
                  fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 700,
                  letterSpacing: '0.12em', color: '#3A3A3A', textTransform: 'uppercase', flexShrink: 0,
                }}>{label}</span>
                <a href={href} style={{
                  fontFamily: 'Inter, sans-serif', fontSize: '14px',
                  color: '#D4AF37', textDecoration: 'none',
                  transition: 'color 0.2s',
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
      .pillar-accent { opacity: 0; }
      .about-stats-row > div:hover .pillar-accent { opacity: 1; }
      @media (max-width: 768px) {
        .pillars-grid { grid-template-columns: 1fr !important; }
        .about-stats-row { grid-template-columns: 1fr !important; }
        .about-contact-row { grid-template-columns: 1fr !important; }
        .about-stats-row > div { border-right: none !important; border-bottom: 1px solid rgba(240,237,230,0.07); }
      }
    `}</style>
  </section>
);

export default About;
