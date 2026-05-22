'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Curated carousel: best 7 wide-angle event shots ── */
const carouselImages = [
  { src: '/assets/gallery/DSC01373.JPG',                                                       alt: 'Large-scale AI workshop at IIT' },
  { src: '/assets/gallery/IMG_4674.JPG',                                                       alt: 'Full house at FMI community event' },
  { src: '/assets/gallery/D808416C-12EF-41AE-9259-D48A1D746B6E_1_102_o (2).jpeg',             alt: 'Women in Product live session' },
  { src: '/assets/gallery/IMG_4575.JPG',                                                       alt: 'FMI evening community event' },
  { src: '/assets/gallery/IMG_4765.JPG',                                                       alt: 'AI Product Management workshop' },
  { src: '/assets/gallery/IMG_3764.JPG',                                                       alt: 'FMI cohort group photo' },
  { src: '/assets/gallery/IMG_2315.JPG',                                                       alt: 'FMI cohort at corporate campus' },
];

/* ── Grid photos: the rest, no fan image ── */
const gridImages = [
  { src: '/assets/gallery/DSC01460.JPG',                                                        alt: 'Speaker at university workshop' },
  { src: '/assets/gallery/IMG_3743 3.JPG',                                                      alt: 'Students collaborating' },
  { src: '/assets/gallery/IMG_3458.JPG',                                                        alt: 'Hands-on AI training' },
  { src: '/assets/gallery/IMG_3727.JPG',                                                        alt: 'FMI live training session' },
  { src: '/assets/gallery/IMG_3505.jpg',                                                        alt: 'FMI workshop activity' },
  { src: '/assets/gallery/IMG_3687.JPG',                                                        alt: 'FMI cohort' },
  { src: '/assets/gallery/IMG_2476.JPG',                                                        alt: 'FMI cohort event' },
  { src: '/assets/gallery/IMG_3423 2.JPG',                                                      alt: 'Hands-on training session' },
  { src: '/assets/gallery/IMG_2260.JPG',                                                        alt: 'Cohort group gathering' },
  { src: '/assets/gallery/IMG_8668.JPG',                                                        alt: 'Industry expert session' },
  { src: '/assets/gallery/IMG_9916.JPG',                                                        alt: 'Student presentations' },
  { src: '/assets/gallery/IMG_0024 (2).jpg',                                                    alt: 'Workshop highlights' },
  { src: '/assets/gallery/IMG_0030 (1).jpg',                                                    alt: 'Project building session' },
  { src: '/assets/gallery/e81d4bc9-751b-40cc-86d5-c513b3fbc65b-copied-media~2.jpg',            alt: 'AI tools workshop' },
  { src: '/assets/gallery/BD013A83-54ED-4A33-ACE2-9283DE0D9037_4_5005_c (1).jpeg',             alt: 'University lecture session' },
  { src: '/assets/gallery/IMG_0568.JPG',                                                        alt: 'Workshop discussion' },
  { src: '/assets/gallery/IMG_4853.JPG',                                                        alt: 'Team building activity' },
  { src: '/assets/gallery/IMG_5308.JPG',                                                        alt: 'Learning session' },
  { src: '/assets/gallery/IMG_6578.JPG',                                                        alt: 'FMI event' },
  { src: '/assets/gallery/IMG_7092.JPG',                                                        alt: 'Student activity' },
];

/* ────────────────────────────────────────────────────
   HERO CAROUSEL  (peek-style: prev/next visible on sides)
──────────────────────────────────────────────────── */
const HeroCarousel = ({ images, onImageClick }) => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = images.length;

  const go = useCallback((dir) => {
    setCurrent(c => (c + dir + n) % n);
  }, [n]);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => go(1), 4200);
    return () => clearInterval(t);
  }, [paused, go]);

  const getPos = (i) => {
    if (i === current) return 'center';
    if (i === (current - 1 + n) % n) return 'left';
    if (i === (current + 1) % n) return 'right';
    return 'hidden';
  };

  // x is framer-motion translateX (% of element's own width, ~=container width since inset:0)
  const slots = {
    center: { x: '0%',    scale: 1,    opacity: 1,   zIndex: 3 },
    left:   { x: '-72%',  scale: 0.88, opacity: 0.55, zIndex: 2 },
    right:  { x: '72%',   scale: 0.88, opacity: 0.55, zIndex: 2 },
    hidden: { x: '-150%', scale: 0.8,  opacity: 0,   zIndex: 0 },
  };

  return (
    <div
      style={{ position: 'relative', height: '500px', overflow: 'hidden', borderRadius: '18px' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {images.map((img, i) => {
        const pos = getPos(i);
        const s = slots[pos];
        return (
          <motion.div
            key={i}
            animate={{ x: s.x, scale: s.scale, opacity: s.opacity }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute', inset: 0,
              zIndex: s.zIndex,
              borderRadius: '14px',
              overflow: 'hidden',
              cursor: pos === 'center' ? 'zoom-in' : pos !== 'hidden' ? 'pointer' : 'default',
            }}
            onClick={() => {
              if (pos === 'left') go(-1);
              else if (pos === 'right') go(1);
              else if (pos === 'center') onImageClick(img);
            }}
          >
            <img
              src={img.src}
              alt={img.alt}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            {/* Caption overlay only on center */}
            {pos === 'center' && (
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                background: 'linear-gradient(transparent 0%, rgba(11,15,26,0.9) 100%)',
                padding: '48px 28px 24px',
              }}>
                <div style={{
                  fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 700,
                  letterSpacing: '0.12em', color: '#D4AF37', marginBottom: '6px',
                }}>
                  {String(current + 1).padStart(2, '0')} &nbsp;/&nbsp; {String(n).padStart(2, '0')}
                </div>
                <div style={{
                  fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 500,
                  color: 'rgba(240,237,230,0.9)',
                }}>
                  {img.alt}
                </div>
              </div>
            )}
          </motion.div>
        );
      })}

      {/* ← Arrow */}
      <button
        onClick={(e) => { e.stopPropagation(); go(-1); }}
        style={{
          position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)',
          zIndex: 10, width: '40px', height: '40px', borderRadius: '50%',
          background: 'rgba(11,15,26,0.7)', border: '1px solid rgba(212,175,55,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: '#D4AF37', backdropFilter: 'blur(6px)',
          transition: 'background 0.2s, border-color 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(212,175,55,0.2)'; e.currentTarget.style.borderColor = '#D4AF37'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(11,15,26,0.7)'; e.currentTarget.style.borderColor = 'rgba(212,175,55,0.5)'; }}
      >
        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* → Arrow */}
      <button
        onClick={(e) => { e.stopPropagation(); go(1); }}
        style={{
          position: 'absolute', right: '18px', top: '50%', transform: 'translateY(-50%)',
          zIndex: 10, width: '40px', height: '40px', borderRadius: '50%',
          background: 'rgba(11,15,26,0.7)', border: '1px solid rgba(212,175,55,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: '#D4AF37', backdropFilter: 'blur(6px)',
          transition: 'background 0.2s, border-color 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(212,175,55,0.2)'; e.currentTarget.style.borderColor = '#D4AF37'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(11,15,26,0.7)'; e.currentTarget.style.borderColor = 'rgba(212,175,55,0.5)'; }}
      >
        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Pill dots */}
      <div style={{
        position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', gap: '6px', zIndex: 10,
      }}>
        {images.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
            style={{
              width: i === current ? '22px' : '6px', height: '6px',
              borderRadius: '3px',
              background: i === current ? '#D4AF37' : 'rgba(240,237,230,0.35)',
              border: 'none', cursor: 'pointer', padding: 0,
              transition: 'width 0.35s ease, background 0.25s ease',
            }}
          />
        ))}
      </div>
    </div>
  );
};

/* ────────────────────────────────────────────────────
   PHOTO GRID  (CSS columns masonry)
──────────────────────────────────────────────────── */
const GridPhoto = ({ img, onClick, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-20px' }}
    transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    onClick={() => onClick(img)}
    className="grid-photo-wrap"
    style={{
      position: 'relative',
      borderRadius: '10px',
      overflow: 'hidden',
      cursor: 'pointer',
      marginBottom: '10px',
      breakInside: 'avoid',
      border: '1px solid rgba(240,237,230,0.06)',
    }}
  >
    <img
      src={img.src}
      alt={img.alt}
      style={{ width: '100%', display: 'block', transition: 'transform 0.5s cubic-bezier(0.22,1,0.36,1)' }}
    />
    <div className="grid-overlay" style={{
      position: 'absolute', inset: 0,
      background: 'linear-gradient(180deg, transparent 50%, rgba(11,15,26,0.75) 100%)',
      opacity: 0, transition: 'opacity 0.3s ease',
      display: 'flex', alignItems: 'flex-end', padding: '12px',
    }}>
      <span style={{
        fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 500,
        color: 'rgba(240,237,230,0.85)', letterSpacing: '0.02em',
      }}>{img.alt}</span>
    </div>
    {/* Zoom icon */}
    <div className="grid-icon" style={{
      position: 'absolute', top: '10px', right: '10px',
      width: '28px', height: '28px', borderRadius: '50%',
      background: 'rgba(11,15,26,0.7)', border: '1px solid rgba(212,175,55,0.45)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      opacity: 0, transition: 'opacity 0.25s ease',
    }}>
      <svg width="11" height="11" fill="none" stroke="#D4AF37" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" strokeLinecap="round" />
      </svg>
    </div>
  </motion.div>
);

/* ────────────────────────────────────────────────────
   MAIN GALLERY SECTION
──────────────────────────────────────────────────── */
const Gallery = () => {
  const [lightbox, setLightbox] = useState(null);

  return (
    <section
      id="gallery"
      style={{ background: '#0B0F1A', padding: '96px 0 80px', position: 'relative' }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'rgba(240,237,230,0.07)' }} />

      {/* Header */}
      <div className="container-fm" style={{ marginBottom: '48px' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <div style={{
            fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 700,
            letterSpacing: '0.15em', textTransform: 'uppercase', color: '#D4AF37', marginBottom: '14px',
          }}>
            Gallery
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <h2 style={{
              fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 800,
              fontSize: 'clamp(28px, 4vw, 44px)', lineHeight: 1.07,
              letterSpacing: '-0.03em', color: '#F0EDE6', margin: 0,
            }}>
              Life at <span style={{ color: '#D4AF37' }}>Future Minds</span>
            </h2>
            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: '15px', color: '#6B6B6B',
              maxWidth: '320px', lineHeight: 1.65, margin: 0,
            }}>
              Behind the scenes of our workshops, cohorts, and community events.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Hero Carousel */}
      <div className="container-fm" style={{ marginBottom: '48px' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          <HeroCarousel images={carouselImages} onImageClick={setLightbox} />
        </motion.div>
      </div>

      {/* Photo Grid */}
      <div className="container-fm">
        <div
          className="gallery-columns"
          style={{ columns: '4 220px', columnGap: '10px' }}
        >
          {gridImages.map((img, i) => (
            <GridPhoto key={i} img={img} onClick={setLightbox} delay={(i % 6) * 0.05} />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            style={{
              position: 'fixed', inset: 0, zIndex: 200,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '24px',
              background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(20px)',
            }}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ duration: 0.28 }}
              onClick={e => e.stopPropagation()}
              style={{ position: 'relative', maxWidth: '1100px', width: '100%' }}
            >
              <button
                onClick={() => setLightbox(null)}
                style={{
                  position: 'absolute', top: '-48px', right: 0,
                  background: 'rgba(240,237,230,0.05)', border: '1px solid rgba(240,237,230,0.15)',
                  borderRadius: '8px', width: '36px', height: '36px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: '#F0EDE6',
                }}
              >
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                </svg>
              </button>
              <img
                src={lightbox.src}
                alt={lightbox.alt}
                style={{
                  maxWidth: '100%', maxHeight: '85vh', objectFit: 'contain',
                  borderRadius: '14px', border: '1px solid rgba(240,237,230,0.08)',
                  display: 'block', margin: '0 auto',
                  boxShadow: '0 32px 80px rgba(0,0,0,0.8)',
                }}
              />
              <p style={{
                fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#6B6B6B',
                textAlign: 'center', marginTop: '14px',
              }}>
                {lightbox.alt}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .grid-photo-wrap:hover img { transform: scale(1.05); }
        .grid-photo-wrap:hover .grid-overlay { opacity: 1 !important; }
        .grid-photo-wrap:hover .grid-icon { opacity: 1 !important; }

        @media (max-width: 768px) {
          .gallery-columns { columns: 2 !important; }
        }
        @media (max-width: 480px) {
          .gallery-columns { columns: 1 !important; }
        }
      `}</style>
    </section>
  );
};

export default Gallery;
