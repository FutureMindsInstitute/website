'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const photos = [
  { src: '/assets/gallery/DSC01373.JPG',                                            pos: 'center 35%', tall: true  },
  { src: '/assets/gallery/IMG_4674.JPG',                                            pos: 'center 30%', tall: false },
  { src: '/assets/gallery/D808416C-12EF-41AE-9259-D48A1D746B6E_1_102_o (2).jpeg', pos: 'center center',tall: false},
  { src: '/assets/gallery/IMG_4765.JPG',                                            pos: 'center center',tall: false},
  { src: '/assets/gallery/IMG_3764.JPG',                                            pos: 'center 40%', tall: true  },
  { src: '/assets/gallery/IMG_3727.JPG',                                            pos: 'center top',  tall: false },
  { src: '/assets/gallery/IMG_2315.JPG',                                            pos: 'center 38%', tall: false },
  { src: '/assets/gallery/IMG_3458.JPG',                                            pos: 'center 18%', tall: false },
  { src: '/assets/gallery/DSC01460.JPG',                                            pos: 'center 30%', tall: true  },
  { src: '/assets/gallery/IMG_4575.JPG',                                            pos: 'center 35%', tall: false },
  { src: '/assets/gallery/IMG_2476.JPG',                                            pos: 'center center',tall: false},
  { src: '/assets/gallery/IMG_3687.JPG',                                            pos: 'center center',tall: false},
  { src: '/assets/gallery/IMG_2260.JPG',                                            pos: 'center center',tall: false},
  { src: '/assets/gallery/IMG_8668.JPG',                                            pos: 'center center',tall: false},
  { src: '/assets/gallery/IMG_0024 (2).jpg',                                        pos: 'center center',tall: false},
  { src: '/assets/gallery/IMG_0030 (1).jpg',                                        pos: 'center center',tall: false},
  { src: '/assets/gallery/IMG_4853.JPG',                                            pos: 'center center',tall: false},
  { src: '/assets/gallery/IMG_5308.JPG',                                            pos: 'center center',tall: false},
];

const Gallery = () => {
  const [lightbox, setLightbox] = useState(null);

  return (
    <section id="gallery" style={{ background: '#0B0F1A', padding: '96px 0 80px', position: 'relative' }}>
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

      {/* Grid */}
      <div className="container-fm">
        <div style={{ columns: '3 260px', columnGap: '10px' }} className="gallery-grid">
          {photos.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.45, delay: (i % 6) * 0.05 }}
              onClick={() => setLightbox(photo)}
              className="gallery-item"
              style={{
                display: 'block',
                marginBottom: '10px',
                breakInside: 'avoid',
                position: 'relative',
                borderRadius: '10px',
                overflow: 'hidden',
                cursor: 'pointer',
                border: '1px solid rgba(240,237,230,0.07)',
              }}
            >
              <img
                src={photo.src}
                alt="FMI session"
                style={{
                  width: '100%',
                  height: photo.tall ? '320px' : '210px',
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
        @media (max-width: 768px) { .gallery-grid { columns: 2 !important; } }
        @media (max-width: 480px) { .gallery-grid { columns: 1 !important; } }
      `}</style>
    </section>
  );
};

export default Gallery;
