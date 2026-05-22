'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { THEME } from '@/lib/constants';

/* ── Curated hero photos: clear teaching/student shots only ── */
const heroPhotos = [
  { src: '/assets/gallery/DSC01373.JPG',                                            pos: 'center 30%' },
  { src: '/assets/gallery/IMG_4765.JPG',                                            pos: 'center center' },
  { src: '/assets/gallery/IMG_2315.JPG',                                            pos: 'center 40%' },
  { src: '/assets/gallery/D808416C-12EF-41AE-9259-D48A1D746B6E_1_102_o (2).jpeg', pos: 'center center' },
  { src: '/assets/gallery/IMG_4674.JPG',                                            pos: 'center 30%' },
  { src: '/assets/gallery/IMG_3764.JPG',                                            pos: 'center 40%' },
  { src: '/assets/gallery/IMG_3727.JPG',                                            pos: 'center top' },
  { src: '/assets/gallery/IMG_3458.JPG',                                            pos: 'center top' },
];

const HeroCarousel = () => {
  const [idx, setIdx] = useState(0);
  const n = heroPhotos.length;

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % n), 4000);
    return () => clearInterval(t);
  }, [n]);

  const cur  = heroPhotos[idx];
  const next = heroPhotos[(idx + 1) % n];
  const prev = heroPhotos[(idx - 1 + n) % n];

  return (
    <motion.div
      initial={{ opacity: 0, x: 32 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      style={{ position: 'relative', width: '100%', height: '440px' }}
    >
      {/* ── Ambient glow behind cards ── */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%', height: '60%',
        background: 'radial-gradient(ellipse, rgba(212,175,55,0.12) 0%, transparent 70%)',
        filter: 'blur(30px)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* ── Card A: top-right, tilted ── */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: 0, right: 0,
          width: '62%', height: '58%',
          borderRadius: '16px', overflow: 'hidden',
          transform: 'rotate(3deg)',
          zIndex: 1,
          boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
          border: '1px solid rgba(240,237,230,0.1)',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={`a-${idx}`}
            src={heroPhotos[(idx + 2) % n].src}
            alt=""
            initial={{ opacity: 0, scale: 1.07 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: heroPhotos[(idx + 2) % n].pos, display: 'block' }}
          />
        </AnimatePresence>
        {/* Subtle dark tint */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(11,15,26,0.18)' }} />
      </motion.div>

      {/* ── Card B: bottom-left, tilted opposite ── */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        style={{
          position: 'absolute',
          bottom: 0, left: 0,
          width: '55%', height: '50%',
          borderRadius: '14px', overflow: 'hidden',
          transform: 'rotate(-4deg)',
          zIndex: 1,
          boxShadow: '0 16px 40px rgba(0,0,0,0.55)',
          border: '1px solid rgba(240,237,230,0.08)',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={`b-${idx}`}
            src={prev.src}
            alt=""
            initial={{ opacity: 0, scale: 1.07 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: prev.pos, display: 'block' }}
          />
        </AnimatePresence>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(11,15,26,0.22)' }} />
      </motion.div>

      {/* ── Main card: front, center, slight tilt ── */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
        style={{
          position: 'absolute',
          top: '12%', left: '14%',
          width: '75%', height: '72%',
          borderRadius: '18px', overflow: 'hidden',
          transform: 'rotate(-1.5deg)',
          zIndex: 2,
          boxShadow: '0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(212,175,55,0.25)',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={`main-${idx}`}
            src={cur.src}
            alt="FMI training session"
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: cur.pos, display: 'block' }}
          />
        </AnimatePresence>
        {/* Very subtle vignette only */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 55%, rgba(11,15,26,0.45) 100%)',
          pointerEvents: 'none',
        }} />
        {/* Gold top-left accent line */}
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '40%', height: '2px',
          background: 'linear-gradient(90deg, #D4AF37, transparent)',
        }} />
      </motion.div>

      {/* ── Dot strip bottom-right ── */}
      <div style={{
        position: 'absolute', bottom: '16px', right: '16px',
        display: 'flex', gap: '5px', zIndex: 5,
      }}>
        {heroPhotos.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            style={{
              width: i === idx ? '20px' : '5px', height: '5px',
              borderRadius: '3px', border: 'none', padding: 0,
              background: i === idx ? '#D4AF37' : 'rgba(240,237,230,0.25)',
              cursor: 'pointer', transition: 'all 0.35s ease',
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

const AMBER     = THEME.amber;
const WARM_WHITE = THEME.warmWhite;
const DIM       = THEME.secondary;
const MUTED     = THEME.muted;
const SURFACE   = THEME.surface;

const words = ['Build', 'Skills', 'for', 'the', 'AI Era.'];

const Hero = () => {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const stats = [
    { value: '500+', label: 'Students Trained' },
    { value: '15+',  label: 'Industry Experts' },
    { value: '95%',  label: 'Placement Rate' },
    { value: '3+',   label: 'Years Running' },
  ];

  const marqueeWords = 'AI Mastery · Prompt Engineering · Agent Building · Team Training · Live Workshops · Industry Mentors · AI Mastery · Prompt Engineering · Agent Building · Team Training · Live Workshops · Industry Mentors · ';

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: '#0B0F1A',
        overflow: 'hidden',
      }}
    >
      {/* Grid background */}
      <div
        className="grid-bg"
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}
      />

      {/* Shimmer lines */}
      <div className="shimmer-line" />
      <div className="shimmer-line shimmer-line-2" />

      {/* Ambient amber glow — top left */}
      <div
        style={{
          position: 'absolute',
          top: '-180px',
          left: '-120px',
          width: '700px',
          height: '700px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(232,160,48,0.10) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 1,
          filter: 'blur(40px)',
        }}
      />

      {/* Ambient amber glow — bottom right */}
      <div
        style={{
          position: 'absolute',
          bottom: '-200px',
          right: '-100px',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(232,160,48,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 1,
          filter: 'blur(60px)',
        }}
      />

      {/* Main content */}
      <div
        className="container-fm"
        style={{
          position: 'relative',
          zIndex: 10,
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          paddingTop: '120px',
          paddingBottom: '60px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '58% 42%',
            gap: '56px',
            alignItems: 'center',
            width: '100%',
          }}
          className="hero-grid"
        >
          {/* LEFT */}
          <div>
            {/* Pill label */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{ marginBottom: '32px' }}
            >
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 16px',
                  borderRadius: '100px',
                  border: '1px solid rgba(232,160,48,0.25)',
                  background: 'rgba(232,160,48,0.08)',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: AMBER,
                }}
              >
                AI Education Platform
              </span>
            </motion.div>

            {/* H1 — word by word */}
            <h1
              style={{
                fontFamily: 'Bricolage Grotesque, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(52px, 8.5vw, 106px)',
                lineHeight: 0.95,
                letterSpacing: '-0.04em',
                color: WARM_WHITE,
                marginBottom: '28px',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.22em',
                alignItems: 'baseline',
              }}
            >
              {words.map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 40, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.6, delay: 0.12 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    display: 'inline-block',
                    color: word === 'AI Era.' ? AMBER : WARM_WHITE,
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '17px',
                color: DIM,
                maxWidth: '520px',
                marginBottom: '40px',
                lineHeight: 1.72,
              }}
            >
              Join Future Minds Institute, where working professionals and students become
              AI-ready practitioners through hands-on training with industry leaders from
              Google, Amazon, Microsoft and beyond.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.72 }}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
                marginBottom: '52px',
              }}
            >
              <motion.button
                onClick={() => scrollToSection('courses')}
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: '14px 32px',
                  fontSize: '15px',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 700,
                  background: '#D4AF37',
                  color: '#0B0F1A',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                }}
              >
                Explore Courses
              </motion.button>
              <motion.button
                onClick={() => scrollToSection('b2b')}
                className="btn-secondary"
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                style={{ padding: '14px 32px', fontSize: '15px', borderRadius: '12px' }}
              >
                Book Team Training
              </motion.button>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              style={{
                display: 'flex',
                gap: '32px',
                flexWrap: 'wrap',
              }}
              className="hero-stats-row"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.9 + i * 0.07 }}
                  style={{ textAlign: 'left' }}
                >
                  <div
                    style={{
                      fontFamily: 'Bricolage Grotesque, sans-serif',
                      fontWeight: 800,
                      fontSize: '26px',
                      color: AMBER,
                      lineHeight: 1,
                      marginBottom: '4px',
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '12px',
                      color: DIM,
                      lineHeight: 1.3,
                    }}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — floating collage */}
          <div className="hero-right-panel">
            <HeroCarousel />
          </div>
        </div>
      </div>

      {/* Thin rule */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          height: '1px',
          background: 'rgba(240,237,230,0.07)',
        }}
      />

      {/* Marquee */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          overflow: 'hidden',
          padding: '16px 0',
          background: '#0B0F1A',
        }}
      >
        <div
          style={{
            position: 'absolute', left: 0, top: 0, bottom: 0, width: '80px',
            background: 'linear-gradient(90deg, #0B0F1A, transparent)',
            zIndex: 10, pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute', right: 0, top: 0, bottom: 0, width: '80px',
            background: 'linear-gradient(-90deg, #0B0F1A, transparent)',
            zIndex: 10, pointerEvents: 'none',
          }}
        />
        <div
          className="marquee-track"
          style={{ display: 'flex', gap: '0', width: 'max-content' }}
        >
          {[marqueeWords, marqueeWords].map((text, idx) => (
            <span
              key={idx}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '12px',
                fontWeight: 500,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: MUTED,
                whiteSpace: 'nowrap',
                paddingRight: '24px',
              }}
            >
              {text}
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .hero-stats-row {
            gap: 20px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
