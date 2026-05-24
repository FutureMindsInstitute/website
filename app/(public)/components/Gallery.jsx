'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/*
  Photos NOT used in hero columns — curated, no head cuts.
  Each has an explicit height so columns fill completely with no gaps.
*/
const photos = [
  { src: '/assets/gallery/IMG_3687.JPG',         pos: 'center 30%',   h: 260 },
  { src: '/assets/gallery/IMG_3743 3.JPG',        pos: 'center 40%',   h: 200 },
  { src: '/assets/gallery/IMG_3764.JPG',          pos: 'center 42%',   h: 250 },
  { src: '/assets/gallery/IMG_8668.JPG',          pos: 'center 35%',   h: 230 },
  { src: '/assets/gallery/IMG_0030 (1).jpg',      pos: 'center 15%',   h: 270 },
  { src: '/assets/gallery/IMG_2476.JPG',          pos: 'center 30%',   h: 220 },
  { src: '/assets/gallery/IMG_2260.JPG',          pos: 'center 38%',   h: 200 },
  { src: '/assets/gallery/IMG_3423 2.JPG',        pos: 'center 30%',   h: 230 },
  { src: '/assets/gallery/IMG_0024 (2).jpg',      pos: 'center 35%',   h: 200 },
  { src: '/assets/gallery/IMG_5308.JPG',          pos: 'center center', h: 220 },
  { src: '/assets/gallery/IMG_6578.JPG',          pos: 'center 30%',   h: 200 },
  { src: '/assets/gallery/IMG_7092.JPG',          pos: 'center 35%',   h: 230 },
  { src: '/assets/gallery/IMG_4853.JPG',          pos: 'center center', h: 230 },
  { src: '/assets/gallery/IMG_9916.JPG',          pos: 'center 20%',   h: 250 },
  { src: '/assets/gallery/IMG_0568.JPG',          pos: 'center 30%',   h: 220 },
  { src: '/assets/gallery/e81d4bc9-751b-40cc-86d5-c513b3fbc65b-copied-media~2.jpg', pos: 'center 35%', h: 210 },
  { src: '/assets/gallery/BD013A83-54ED-4A33-ACE2-9283DE0D9037_4_5005_c (1).jpeg', pos: 'center 30%', h: 200 },
  { src: '/assets/gallery/IMG_3505.jpg',          pos: 'center 25%',   h: 230 },
];

/* Distribute into 3 columns manually — fills evenly, no CSS column gaps */
const col1 = photos.filter((_, i) => i % 3 === 0);
const col2 = photos.filter((_, i) => i % 3 === 1);
const col3 = photos.filter((_, i) => i % 3 === 2);

const PhotoItem = ({ photo, onClick, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-20px' }}
    transition={{ duration: 0.45, delay }}
    onClick={() => onClick(photo)}
    className="gallery-item"
    style={{
      position: 'relative',
      borderRadius: '10px',
      overflow: 'hidden',
      cursor: 'pointer',
      border: '1px solid rgba(240,237,230,0.07)',
      flexShrink: 0,
    }}
  >
    <img
      src={photo.src}
      alt="FMI session"
      style={{
        width: '100%',
        height: `${photo.h}px`,
        objectFit: 'cover',
        objectPosition: photo.pos,
        display: 'block',
        transition: 'transform 0.5s ease',
      }}
    />
    <div className="gallery-hover" style={{
      position: 'absolute', inset: 0,
      background: 'rgba(11,15,26,0.35)',
      opacity: 0, transition: 'opacity 0.25s',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        width: '36px', height: '36px', borderRadius: '50%',
        background: 'rgba(11,15,26,0.7)', border: '1px solid rgba(212,175,55,0.6)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg width="13" height="13" fill="none" stroke="#D4AF37" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  </motion.div>
);

const Gallery = () => {
  const [lightbox, setLightbox] = useState(null);

  return (
    <section id="gallery" style={{ background: '#0B0F1A', padding: '96px 0 48px', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'rgba(240,237,230,0.07)' }} />

      {/* Header */}
      <div className="container-fm" style={{ marginBottom: '48px' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#D4AF37', marginBottom: '12px' }}>
            Gallery
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <h2 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 44px)', lineHeight: 1.07, letterSpacing: '-0.03em', color: '#F0EDE6', margin: 0 }}>
              Life at <span style={{ color: '#D4AF37' }}>Future Minds</span>
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: '#6B6B6B', maxWidth: '320px', lineHeight: 1.65, margin: 0 }}>
              Behind the scenes of our workshops, cohorts, and community events.
            </p>
          </div>
        </motion.div>
      </div>

      {/* 3-column manual layout — no CSS columns gaps */}
      <div className="container-fm">
        <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }} className="gallery-cols">
          {[col1, col2, col3].map((col, ci) => (
            <div key={ci} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {col.map((photo, pi) => (
                <PhotoItem
                  key={pi}
                  photo={photo}
                  onClick={setLightbox}
                  delay={(ci * 2 + pi) * 0.04}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(20px)' }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={e => e.stopPropagation()}
              style={{ position: 'relative', maxWidth: '1100px', width: '100%' }}
            >
              <button onClick={() => setLightbox(null)} style={{ position: 'absolute', top: '-44px', right: 0, background: 'rgba(240,237,230,0.05)', border: '1px solid rgba(240,237,230,0.15)', borderRadius: '8px', width: '34px', height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#F0EDE6' }}>
                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" /></svg>
              </button>
              <img src={lightbox.src} alt="FMI session" style={{ maxWidth: '100%', maxHeight: '85vh', objectFit: 'contain', borderRadius: '12px', display: 'block', margin: '0 auto', boxShadow: '0 32px 80px rgba(0,0,0,0.8)' }} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .gallery-item:hover img { transform: scale(1.04); }
        .gallery-item:hover .gallery-hover { opacity: 1 !important; }
        @media (max-width: 768px) {
          .gallery-cols { flex-wrap: wrap !important; }
          .gallery-cols > div { flex: 1 1 calc(50% - 5px) !important; }
        }
        @media (max-width: 480px) {
          .gallery-cols > div { flex: 1 1 100% !important; }
        }
      `}</style>
    </section>
  );
};

export default Gallery;
