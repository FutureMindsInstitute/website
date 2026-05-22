'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { THEME } from '@/lib/constants';

/* ── Hero photos: clear training & community shots ── */
const mainPhotos = [
  { src: '/assets/gallery/DSC01373.JPG',                                            pos: 'center 35%' },
  { src: '/assets/gallery/IMG_4674.JPG',                                            pos: 'center 30%' },
  { src: '/assets/gallery/IMG_3764.JPG',                                            pos: 'center 40%' },
  { src: '/assets/gallery/IMG_4765.JPG',                                            pos: 'center center' },
  { src: '/assets/gallery/IMG_2315.JPG',                                            pos: 'center 40%' },
];
const thumbPhotos = [
  { src: '/assets/gallery/IMG_3727.JPG',                                            pos: 'center top' },
  { src: '/assets/gallery/IMG_3458.JPG',                                            pos: 'center top' },
  { src: '/assets/gallery/D808416C-12EF-41AE-9259-D48A1D746B6E_1_102_o (2).jpeg', pos: 'center center' },
  { src: '/assets/gallery/DSC01460.JPG',                                            pos: 'center 30%' },
  { src: '/assets/gallery/IMG_4575.JPG',                                            pos: 'center 35%' },
];

const HeroCarousel = () => {
  const [idx, setIdx] = useState(0);
  const n = mainPhotos.length;

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % n), 4000);
    return () => clearInterval(t);
  }, [n]);

  const t1 = thumbPhotos[idx % thumbPhotos.length];
  const t2 = thumbPhotos[(idx + 2) % thumbPhotos.length];

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.75, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}
    >
      {/* ── Main photo ── */}
      <div style={{
        position: 'relative', width: '100%', height: '290px',
        borderRadius: '16px', overflow: 'hidden',
        boxShadow: '0 24px 64px rgba(0,0,0,0.55)',
        border: '1px solid rgba(212,175,55,0.2)',
      }}>
        <AnimatePresence mode="wait">
          <motion.img
            key={`main-${idx}`}
            src={mainPhotos[idx].src}
            alt="FMI training session"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: mainPhotos[idx].pos,
              display: 'block',
            }}
          />
        </AnimatePresence>
        {/* Thin gold line top */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '2px', zIndex: 2,
          background: 'linear-gradient(90deg, #D4AF37 0%, rgba(212,175,55,0.3) 60%, transparent 100%)',
        }} />
        {/* Dot indicators inside bottom */}
        <div style={{
          position: 'absolute', bottom: '14px', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', gap: '5px', zIndex: 3,
        }}>
          {mainPhotos.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} style={{
              width: i === idx ? '20px' : '5px', height: '5px',
              borderRadius: '3px', border: 'none', padding: 0,
              background: i === idx ? '#D4AF37' : 'rgba(240,237,230,0.35)',
              cursor: 'pointer', transition: 'all 0.35s ease',
            }} />
          ))}
        </div>
      </div>

      {/* ── Two thumbnail photos side by side ── */}
      <div style={{ display: 'flex', gap: '10px' }}>
        {[t1, t2].map((photo, i) => (
          <div key={i} style={{
            flex: 1, height: '145px',
            borderRadius: '12px', overflow: 'hidden',
            boxShadow: '0 12px 32px rgba(0,0,0,0.45)',
            border: '1px solid rgba(240,237,230,0.07)',
          }}>
            <AnimatePresence mode="wait">
              <motion.img
                key={`t${i}-${idx}`}
                src={photo.src}
                alt="FMI session"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                style={{
                  width: '100%', height: '100%',
                  objectFit: 'cover', objectPosition: photo.pos,
                  display: 'block',
                }}
              />
            </AnimatePresence>
          </div>
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

          {/* RIGHT */}
          <div className="hero-right-panel" style={{ alignSelf: 'center' }}>
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
