'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { THEME } from '@/lib/constants';

const AMBER      = THEME.amber;
const WARM_WHITE = THEME.warmWhite;
const DIM        = THEME.secondary;
const MUTED      = THEME.muted;

/* 6 clean training photos only */
const col1 = [
  { src: '/assets/gallery/DSC01373.JPG',                                            pos: 'center 35%' },
  { src: '/assets/gallery/IMG_4765.JPG',                                            pos: 'center center' },
];
const col2 = [
  { src: '/assets/gallery/IMG_3458.JPG',                                            pos: 'center top' },
  { src: '/assets/gallery/IMG_4674.JPG',                                            pos: 'center 30%' },
];
const col3 = [
  { src: '/assets/gallery/D808416C-12EF-41AE-9259-D48A1D746B6E_1_102_o (2).jpeg', pos: 'center center' },
  { src: '/assets/gallery/IMG_3727.JPG',                                            pos: 'center top' },
];

const ScrollColumn = ({ photos, duration, initialY = 0 }) => {
  const repeated = [...photos, ...photos, ...photos, ...photos];
  const imgH = 220;
  const gap  = 12;
  const totalH = photos.length * (imgH + gap);

  return (
    <div style={{ overflow: 'hidden', flex: 1 }}>
      <motion.div
        animate={{ y: [initialY, initialY - totalH] }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
        style={{ display: 'flex', flexDirection: 'column', gap: `${gap}px` }}
      >
        {repeated.map((photo, i) => (
          <div key={i} style={{
            flexShrink: 0, height: `${imgH}px`,
            borderRadius: '10px', overflow: 'hidden',
            border: '1px solid rgba(240,237,230,0.08)',
          }}>
            <img src={photo.src} alt="" style={{
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: photo.pos, display: 'block',
            }} />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const words = ['Build', 'Skills', 'for', 'the', 'AI Era.'];

const Hero = () => {
  const scrollToSection = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const stats = [
    { value: '500+', label: 'Students Trained' },
    { value: '15+',  label: 'Industry Experts' },
    { value: '95%',  label: 'Placement Rate'   },
    { value: '3+',   label: 'Years Running'    },
  ];

  const marqueeWords = 'AI Mastery · Prompt Engineering · Agent Building · Team Training · Live Workshops · Industry Mentors · ';

  return (
    <section id="hero" style={{ background: '#0B0F1A', overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative' }}>

      {/* Subtle grid bg */}
      <div className="grid-bg" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }} />
      {/* Amber glow */}
      <div style={{
        position: 'absolute', top: '-200px', left: '-150px',
        width: '700px', height: '700px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(232,160,48,0.09) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0, filter: 'blur(40px)',
      }} />

      {/* ── Two-column block, sits directly under navbar ── */}
      <div
        className="hero-block"
        style={{
          position: 'relative', zIndex: 10,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          paddingTop: '72px',
          /* no minHeight — section is only as tall as the text */
        }}
      >
        {/* ── LEFT: text ── */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          padding: '48px 40px 48px clamp(20px, 5vw, 80px)',
        }}>

          {/* Pill */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} style={{ marginBottom: '22px' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center',
              padding: '6px 16px', borderRadius: '100px',
              border: '1px solid rgba(232,160,48,0.25)', background: 'rgba(232,160,48,0.08)',
              fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 600,
              letterSpacing: '0.12em', textTransform: 'uppercase', color: AMBER,
            }}>AI Education Platform</span>
          </motion.div>

          {/* H1 */}
          <h1 style={{
            fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 800,
            fontSize: 'clamp(38px, 4.5vw, 76px)',
            lineHeight: 0.95, letterSpacing: '-0.04em', color: WARM_WHITE,
            marginBottom: '20px', display: 'flex', flexWrap: 'wrap', gap: '0.2em', alignItems: 'baseline',
          }}>
            {words.map((word, i) => (
              <motion.span key={word}
                initial={{ opacity: 0, y: 32, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.55, delay: 0.08 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: 'inline-block', color: word === 'AI Era.' ? AMBER : WARM_WHITE }}
              >{word}</motion.span>
            ))}
          </h1>

          {/* Subtitle */}
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.55 }}
            style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: DIM, maxWidth: '400px', marginBottom: '30px', lineHeight: 1.72 }}
          >
            Join Future Minds Institute, where working professionals and students become AI-ready practitioners through hands-on training with industry leaders from Google, Amazon, Microsoft and beyond.
          </motion.p>

          {/* CTAs */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.65 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '36px' }}
          >
            <motion.button onClick={() => scrollToSection('courses')} whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}
              style={{ padding: '13px 30px', fontSize: '14px', fontFamily: 'Inter, sans-serif', fontWeight: 700, background: '#D4AF37', color: '#0B0F1A', border: 'none', borderRadius: '12px', cursor: 'pointer' }}
            >Explore Courses</motion.button>
            <motion.button onClick={() => scrollToSection('b2b')} className="btn-secondary" whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}
              style={{ padding: '13px 30px', fontSize: '14px', borderRadius: '12px' }}
            >Book Team Training</motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.82 }}
            style={{ display: 'flex', gap: '28px', flexWrap: 'wrap' }} className="hero-stats-row"
          >
            {stats.map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.82 + i * 0.07 }}>
                <div style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 800, fontSize: '26px', color: AMBER, lineHeight: 1, marginBottom: '4px' }}>{stat.value}</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: DIM, lineHeight: 1.3 }}>{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT: scrolling columns, fixed height matching text ── */}
        <div style={{ position: 'relative', overflow: 'hidden', padding: '48px clamp(16px, 3vw, 36px) 48px 12px', height: '100%' }}>
          {/* Top fade — matches text paddingTop so photos fade in at same level */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '48px', zIndex: 3, background: 'linear-gradient(180deg,#0B0F1A 0%,transparent 100%)', pointerEvents: 'none' }} />
          {/* Bottom fade */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '90px', zIndex: 3, background: 'linear-gradient(0deg,#0B0F1A 0%,transparent 100%)', pointerEvents: 'none' }} />
          {/* Left edge fade */}
          <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '20px', zIndex: 3, background: 'linear-gradient(90deg,#0B0F1A,transparent)', pointerEvents: 'none' }} />

          <div style={{ display: 'flex', gap: '12px', height: '100%' }}>
            <ScrollColumn photos={col1} duration={18} initialY={0} />
            <ScrollColumn photos={col2} duration={14} initialY={-110} />
            <ScrollColumn photos={col3} duration={22} initialY={-55} />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ position: 'relative', zIndex: 10, height: '1px', background: 'rgba(240,237,230,0.07)' }} />

      {/* Marquee */}
      <div style={{ position: 'relative', zIndex: 10, overflow: 'hidden', padding: '16px 0', background: '#0B0F1A' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '80px', background: 'linear-gradient(90deg,#0B0F1A,transparent)', zIndex: 10, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '80px', background: 'linear-gradient(-90deg,#0B0F1A,transparent)', zIndex: 10, pointerEvents: 'none' }} />
        <div className="marquee-track" style={{ display: 'flex', gap: 0, width: 'max-content' }}>
          {[marqueeWords, marqueeWords].map((text, i) => (
            <span key={i} style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: MUTED, whiteSpace: 'nowrap', paddingRight: '24px' }}>{text}</span>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .hero-block { grid-template-columns: 1fr !important; }
          .hero-block > div:last-child { height: 240px; }
        }
        @media (max-width: 480px) {
          .hero-stats-row { gap: 16px !important; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
