'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { THEME } from '@/lib/constants';

const AMBER      = THEME.amber;
const WARM_WHITE = THEME.warmWhite;
const DIM        = THEME.secondary;
const MUTED      = THEME.muted;

/* ── 3 columns of photos, each scrolling at a different speed ── */
const col1 = [
  { src: '/assets/gallery/DSC01373.JPG',                                            pos: 'center 30%' },
  { src: '/assets/gallery/IMG_4765.JPG',                                            pos: 'center center' },
  { src: '/assets/gallery/IMG_3727.JPG',                                            pos: 'center top' },
  { src: '/assets/gallery/IMG_2315.JPG',                                            pos: 'center 38%' },
  { src: '/assets/gallery/IMG_4674.JPG',                                            pos: 'center 30%' },
];
const col2 = [
  { src: '/assets/gallery/IMG_3764.JPG',                                            pos: 'center 40%' },
  { src: '/assets/gallery/IMG_3458.JPG',                                            pos: 'center top' },
  { src: '/assets/gallery/D808416C-12EF-41AE-9259-D48A1D746B6E_1_102_o (2).jpeg', pos: 'center center' },
  { src: '/assets/gallery/IMG_3743 3.JPG',                                          pos: 'center center' },
  { src: '/assets/gallery/DSC01460.JPG',                                            pos: 'center 30%' },
];
const col3 = [
  { src: '/assets/gallery/IMG_4575.JPG',                                            pos: 'center 35%' },
  { src: '/assets/gallery/IMG_2476.JPG',                                            pos: 'center center' },
  { src: '/assets/gallery/IMG_2260.JPG',                                            pos: 'center center' },
  { src: '/assets/gallery/e81d4bc9-751b-40cc-86d5-c513b3fbc65b-copied-media~2.jpg',pos: 'center center' },
  { src: '/assets/gallery/BD013A83-54ED-4A33-ACE2-9283DE0D9037_4_5005_c (1).jpeg', pos: 'center 30%' },
];

const ScrollColumn = ({ photos, duration, startY = 0 }) => {
  /* duplicate so loop is seamless */
  const doubled = [...photos, ...photos];
  const imgH = 200;
  const gap  = 10;
  const totalH = photos.length * (imgH + gap);

  return (
    <div style={{ overflow: 'hidden', flex: 1 }}>
      <motion.div
        animate={{ y: [startY, startY - totalH] }}
        transition={{ duration, repeat: Infinity, ease: 'linear', repeatType: 'loop' }}
        style={{ display: 'flex', flexDirection: 'column', gap: `${gap}px` }}
      >
        {doubled.map((photo, i) => (
          <div
            key={i}
            style={{
              flexShrink: 0,
              height: `${imgH}px`,
              borderRadius: '10px',
              overflow: 'hidden',
              border: '1px solid rgba(240,237,230,0.07)',
            }}
          >
            <img
              src={photo.src}
              alt="FMI session"
              style={{
                width: '100%', height: '100%',
                objectFit: 'cover',
                objectPosition: photo.pos,
                display: 'block',
              }}
            />
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
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: '#0B0F1A',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Grid bg */}
      <div className="grid-bg" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }} />

      {/* Glow top-left */}
      <div style={{
        position: 'absolute', top: '-180px', left: '-120px',
        width: '700px', height: '700px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(232,160,48,0.10) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0, filter: 'blur(40px)',
      }} />

      {/* ── Main layout ── */}
      <div style={{
        position: 'relative', zIndex: 10, flex: 1,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        minHeight: 'calc(100vh - 49px)',
      }} className="hero-main-grid">

        {/* ── LEFT: Text ── */}
        <div style={{
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: 'clamp(100px, 12vh, 140px) clamp(24px, 5vw, 72px) 60px max(24px, calc((100vw - 1200px) / 2))',
        }}>
          {/* Pill */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: '28px' }}
          >
            <span style={{
              display: 'inline-flex', alignItems: 'center',
              padding: '6px 16px', borderRadius: '100px',
              border: '1px solid rgba(232,160,48,0.25)',
              background: 'rgba(232,160,48,0.08)',
              fontFamily: 'Inter, sans-serif', fontSize: '11px',
              fontWeight: 600, letterSpacing: '0.12em',
              textTransform: 'uppercase', color: AMBER,
            }}>
              AI Education Platform
            </span>
          </motion.div>

          {/* H1 */}
          <h1 style={{
            fontFamily: 'Bricolage Grotesque, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(44px, 5.5vw, 84px)',
            lineHeight: 0.95, letterSpacing: '-0.04em',
            color: WARM_WHITE, marginBottom: '22px',
            display: 'flex', flexWrap: 'wrap',
            gap: '0.2em', alignItems: 'baseline',
          }}>
            {words.map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 36, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.6, delay: 0.12 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: 'inline-block', color: word === 'AI Era.' ? AMBER : WARM_WHITE }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.58 }}
            style={{
              fontFamily: 'Inter, sans-serif', fontSize: '16px',
              color: DIM, maxWidth: '440px',
              marginBottom: '36px', lineHeight: 1.72,
            }}
          >
            Join Future Minds Institute, where working professionals and students become
            AI-ready practitioners through hands-on training with industry leaders from
            Google, Amazon, Microsoft and beyond.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.7 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '48px' }}
          >
            <motion.button
              onClick={() => scrollToSection('courses')}
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: '14px 32px', fontSize: '15px',
                fontFamily: 'Inter, sans-serif', fontWeight: 700,
                background: '#D4AF37', color: '#0B0F1A',
                border: 'none', borderRadius: '12px', cursor: 'pointer',
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

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.88 }}
            style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}
            className="hero-stats-row"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.88 + i * 0.07 }}
              >
                <div style={{
                  fontFamily: 'Bricolage Grotesque, sans-serif',
                  fontWeight: 800, fontSize: '26px',
                  color: AMBER, lineHeight: 1, marginBottom: '4px',
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontFamily: 'Inter, sans-serif', fontSize: '12px',
                  color: DIM, lineHeight: 1.3,
                }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT: Scrolling photo columns ── */}
        <div style={{
          position: 'relative',
          overflow: 'hidden',
          paddingTop: '80px',
          paddingBottom: '49px',
          paddingRight: 'clamp(16px, 3vw, 40px)',
          paddingLeft: '24px',
        }}>
          {/* Top + bottom fade masks */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '120px', zIndex: 3,
            background: 'linear-gradient(180deg, #0B0F1A 0%, transparent 100%)',
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '120px', zIndex: 3,
            background: 'linear-gradient(0deg, #0B0F1A 0%, transparent 100%)',
            pointerEvents: 'none',
          }} />
          {/* Left fade so columns blend into text side */}
          <div style={{
            position: 'absolute', top: 0, left: 0, bottom: 0, width: '40px', zIndex: 3,
            background: 'linear-gradient(90deg, #0B0F1A, transparent)',
            pointerEvents: 'none',
          }} />

          {/* 3 columns at different speeds */}
          <div style={{
            display: 'flex', gap: '10px', height: '100%',
          }}>
            {/* Col 1 – slowest, starts from 0 */}
            <ScrollColumn photos={col1} duration={22} startY={0} />
            {/* Col 2 – medium, starts offset so not all same */}
            <ScrollColumn photos={col2} duration={18} startY={-110} />
            {/* Col 3 – fastest, offset down */}
            <ScrollColumn photos={col3} duration={25} startY={-60} />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ position: 'relative', zIndex: 10, height: '1px', background: 'rgba(240,237,230,0.07)' }} />

      {/* Marquee */}
      <div style={{ position: 'relative', zIndex: 10, overflow: 'hidden', padding: '16px 0', background: '#0B0F1A' }}>
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: '80px',
          background: 'linear-gradient(90deg,#0B0F1A,transparent)', zIndex: 10, pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: '80px',
          background: 'linear-gradient(-90deg,#0B0F1A,transparent)', zIndex: 10, pointerEvents: 'none',
        }} />
        <div className="marquee-track" style={{ display: 'flex', gap: 0, width: 'max-content' }}>
          {[marqueeWords, marqueeWords].map((text, i) => (
            <span key={i} style={{
              fontFamily: 'Inter, sans-serif', fontSize: '12px',
              fontWeight: 500, letterSpacing: '0.12em',
              textTransform: 'uppercase', color: MUTED,
              whiteSpace: 'nowrap', paddingRight: '24px',
            }}>{text}</span>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .hero-main-grid {
            grid-template-columns: 1fr !important;
          }
          .hero-main-grid > div:last-child {
            height: 260px;
            padding-top: 0 !important;
          }
        }
        @media (max-width: 480px) {
          .hero-stats-row { gap: 20px !important; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
