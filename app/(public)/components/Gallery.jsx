'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { THEME } from '@/lib/constants';

const galleryImages = [
  { src: '/assets/gallery/IMG_3764.JPG',                                                              alt: 'FMI Workshop session' },
  { src: '/assets/gallery/IMG_3743 3.JPG',                                                            alt: 'Students collaborating' },
  { src: '/assets/gallery/IMG_3458.JPG',                                                              alt: 'Hands-on AI training' },
  { src: '/assets/gallery/D808416C-12EF-41AE-9259-D48A1D746B6E_1_102_o (2).jpeg',                   alt: 'Group learning session' },
  { src: '/assets/gallery/IMG_8668.JPG',                                                              alt: 'Industry expert session' },
  { src: '/assets/gallery/IMG_9916.JPG',                                                              alt: 'Student presentations' },
  { src: '/assets/gallery/IMG_0024 (2).jpg',                                                          alt: 'Workshop highlights' },
  { src: '/assets/gallery/IMG_0030 (1).jpg',                                                          alt: 'Project building session' },
  { src: '/assets/gallery/IMG_2260.JPG',                                                              alt: 'Cohort gathering' },
  { src: '/assets/gallery/IMG_0568.JPG',                                                              alt: 'AI tools workshop' },
  { src: '/assets/gallery/IMG_0586.JPG',                                                              alt: 'Mentorship session' },
  { src: '/assets/gallery/IMG_4657.JPG',                                                              alt: 'Community event' },
  { src: '/assets/gallery/IMG_4575.JPG',                                                              alt: 'FMI cohort' },
  { src: '/assets/gallery/IMG_4674.JPG',                                                              alt: 'Live session' },
  { src: '/assets/gallery/IMG_4765.JPG',                                                              alt: 'Workshop activity' },
  { src: '/assets/gallery/IMG_4853.JPG',                                                              alt: 'Team building' },
  { src: '/assets/gallery/IMG_4911.JPG',                                                              alt: 'Expert talk' },
  { src: '/assets/gallery/IMG_5308.JPG',                                                              alt: 'Learning session' },
  { src: '/assets/gallery/IMG_5445.JPG',                                                              alt: 'Group discussion' },
  { src: '/assets/gallery/IMG_6578.JPG',                                                              alt: 'FMI event' },
  { src: '/assets/gallery/IMG_6844.JPG',                                                              alt: 'Workshop session' },
  { src: '/assets/gallery/IMG_7092.JPG',                                                              alt: 'Student activity' },
  { src: '/assets/gallery/IMG_7320.JPG',                                                              alt: 'Cohort event' },
  { src: '/assets/gallery/IMG_7528.JPG',                                                              alt: 'FMI community' },
];

// Split into two rows
const row1 = galleryImages.slice(0, 12);
const row2 = galleryImages.slice(12, 24);

const PhotoCard = ({ img, onClick }) => (
  <div
    onClick={() => onClick(img)}
    style={{
      flexShrink: 0,
      width: '280px',
      height: '190px',
      borderRadius: '12px',
      overflow: 'hidden',
      cursor: 'pointer',
      border: '1px solid rgba(240,237,230,0.07)',
      position: 'relative',
      marginRight: '14px',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.querySelector('img').style.transform = 'scale(1.07)';
      e.currentTarget.querySelector('.overlay').style.opacity = '1';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.querySelector('img').style.transform = 'scale(1)';
      e.currentTarget.querySelector('.overlay').style.opacity = '0';
    }}
  >
    <img
      src={img.src}
      alt={img.alt}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block',
        transition: 'transform 0.5s ease',
      }}
    />
    <div
      className="overlay"
      style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(0,0,0,0.4)',
        opacity: 0,
        transition: 'opacity 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{
        width: '36px', height: '36px', borderRadius: '50%',
        background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(212,175,55,0.5)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg width="14" height="14" fill="none" stroke="#D4AF37" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  </div>
);

const MarqueeRow = ({ images, direction = 'left', speed = 40, onClick }) => {
  const doubled = [...images, ...images, ...images];
  const totalWidth = images.length * (280 + 14);
  const duration = totalWidth / speed;

  return (
    <div style={{ overflow: 'hidden', position: 'relative' }}>
      <motion.div
        animate={{ x: direction === 'left' ? [-totalWidth, 0] : [0, -totalWidth] }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
        style={{ display: 'flex', width: 'max-content' }}
      >
        {doubled.map((img, i) => (
          <PhotoCard key={i} img={img} onClick={onClick} />
        ))}
      </motion.div>
    </div>
  );
};

const Gallery = () => {
  const [lightbox, setLightbox] = useState(null);

  return (
    <section
      id="gallery"
      style={{ background: '#0B0F1A', padding: '96px 0 0', position: 'relative', overflow: 'hidden' }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'rgba(240,237,230,0.07)' }} />

      {/* Header */}
      <div className="container-fm" style={{ marginBottom: '48px' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}
        >
          <div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#D4AF37', marginBottom: '12px' }}>
              Gallery
            </div>
            <h2 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 44px)', lineHeight: 1.07, letterSpacing: '-0.03em', color: '#F0EDE6', margin: 0 }}>
              Life at <span style={{ color: '#D4AF37' }}>Future Minds</span>
            </h2>
          </div>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: '#6B6B6B', maxWidth: '340px', lineHeight: 1.65, margin: 0 }}>
            Behind the scenes of our workshops, cohorts, and community events.
          </p>
        </motion.div>
      </div>

      {/* Edge fades */}
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '120px', background: 'linear-gradient(90deg, #0B0F1A, transparent)', zIndex: 10, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '120px', background: 'linear-gradient(-90deg, #0B0F1A, transparent)', zIndex: 10, pointerEvents: 'none' }} />

        {/* Row 1 — scrolls left */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '14px' }}
        >
          <MarqueeRow images={row1} direction="left" speed={35} onClick={setLightbox} />
        </motion.div>

        {/* Row 2 — scrolls right */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{ paddingBottom: '80px' }}
        >
          <MarqueeRow images={row2} direction="right" speed={28} onClick={setLightbox} />
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', background: 'rgba(0,0,0,0.96)', backdropFilter: 'blur(16px)' }}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={(e) => e.stopPropagation()}
              style={{ position: 'relative', maxWidth: '1080px', width: '100%' }}
            >
              <button
                onClick={() => setLightbox(null)}
                style={{ position: 'absolute', top: '-44px', right: 0, background: 'none', border: '1px solid rgba(240,237,230,0.18)', borderRadius: '8px', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#F0EDE6' }}
              >
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" /></svg>
              </button>
              <img src={lightbox.src} alt={lightbox.alt} style={{ maxWidth: '100%', maxHeight: '84vh', objectFit: 'contain', borderRadius: '12px', border: '1px solid rgba(240,237,230,0.08)', display: 'block', margin: '0 auto' }} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
