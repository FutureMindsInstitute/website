'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// All gallery images — portrait gets objectPosition 'center top', landscape 'center center'
const galleryImages = [
  { src: '/assets/gallery/DSC01373.JPG',        alt: 'FMI session highlights',      orientation: 'landscape' },
  { src: '/assets/gallery/DSC01460.JPG',         alt: 'FMI workshop highlights',     orientation: 'landscape' },
  { src: '/assets/gallery/IMG_2315.JPG',         alt: 'FMI community',               orientation: 'landscape' },
  { src: '/assets/gallery/IMG_2476.JPG',         alt: 'FMI cohort event',            orientation: 'landscape' },
  { src: '/assets/gallery/IMG_3423 2.JPG',       alt: 'FMI hands-on training',       orientation: 'landscape' },
  { src: '/assets/gallery/IMG_3458.JPG',         alt: 'Hands-on AI training',        orientation: 'landscape' },
  { src: '/assets/gallery/IMG_3505.jpg',         alt: 'FMI workshop',                orientation: 'landscape' },
  { src: '/assets/gallery/IMG_3687.JPG',         alt: 'FMI cohort gathering',        orientation: 'landscape' },
  { src: '/assets/gallery/IMG_3727.JPG',         alt: 'FMI live training',           orientation: 'landscape' },
  { src: '/assets/gallery/IMG_3743 3.JPG',       alt: 'Students collaborating',      orientation: 'landscape' },
  { src: '/assets/gallery/IMG_3764.JPG',         alt: 'FMI Workshop session',        orientation: 'landscape' },
  { src: '/assets/gallery/IMG_2260.JPG',         alt: 'Cohort gathering',            orientation: 'landscape' },
  { src: '/assets/gallery/IMG_8668.JPG',         alt: 'Industry expert session',     orientation: 'landscape' },
  { src: '/assets/gallery/IMG_9916.JPG',         alt: 'Student presentations',       orientation: 'portrait'  },
  { src: '/assets/gallery/IMG_0024 (2).jpg',     alt: 'Workshop highlights',         orientation: 'landscape' },
  { src: '/assets/gallery/IMG_0030 (1).jpg',     alt: 'Project building session',    orientation: 'landscape' },
  { src: '/assets/gallery/IMG_0568.JPG',         alt: 'AI tools workshop',           orientation: 'landscape' },
  { src: '/assets/gallery/IMG_0586.JPG',         alt: 'Mentorship session',          orientation: 'portrait'  },
  { src: '/assets/gallery/IMG_4657.JPG',         alt: 'Community event',             orientation: 'landscape' },
  { src: '/assets/gallery/IMG_4575.JPG',         alt: 'FMI cohort',                  orientation: 'landscape' },
  { src: '/assets/gallery/IMG_4674.JPG',         alt: 'Live session',                orientation: 'landscape' },
  { src: '/assets/gallery/IMG_4765.JPG',         alt: 'Workshop activity',           orientation: 'landscape' },
  { src: '/assets/gallery/IMG_4853.JPG',         alt: 'Team building',               orientation: 'landscape' },
  { src: '/assets/gallery/IMG_4911.JPG',         alt: 'Expert talk',                 orientation: 'portrait'  },
  { src: '/assets/gallery/IMG_5308.JPG',         alt: 'Learning session',            orientation: 'landscape' },
  { src: '/assets/gallery/IMG_6578.JPG',         alt: 'FMI event',                   orientation: 'landscape' },
  { src: '/assets/gallery/IMG_7092.JPG',         alt: 'Student activity',            orientation: 'landscape' },
];

const GalleryItem = ({ img, size, onClick, delay = 0 }) => {
  const isPortrait = img.orientation === 'portrait';
  const objectPos = isPortrait ? 'center top' : 'center center';

  // size: 'featured' | 'medium' | 'small'
  const heightMap = {
    featured: '340px',
    medium:   '240px',
    small:    '180px',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => onClick(img)}
      style={{
        position: 'relative',
        height: heightMap[size],
        borderRadius: '12px',
        overflow: 'hidden',
        cursor: 'pointer',
        border: '1px solid rgba(240,237,230,0.07)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.querySelector('img').style.transform = 'scale(1.06)';
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
          objectPosition: objectPos,
          display: 'block',
          transition: 'transform 0.55s ease',
        }}
      />
      <div
        className="overlay"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.38)',
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
      {/* subtle alt text caption on hover */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '24px 14px 12px',
        background: 'linear-gradient(0deg, rgba(0,0,0,0.55) 0%, transparent 100%)',
        opacity: 0,
        transition: 'opacity 0.3s ease',
      }} className="caption">
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: 'rgba(240,237,230,0.7)', letterSpacing: '0.04em' }}>
          {img.alt}
        </span>
      </div>
    </motion.div>
  );
};

const Gallery = () => {
  const [lightbox, setLightbox] = useState(null);

  // Layout: alternating sections of 3 rows each
  // Row A: [featured(2/3 wide), small(1/3 wide)]
  // Row B: [small, small, medium]
  // Row C: [medium(1/3), featured(2/3)]
  // ... and so on

  const imgs = galleryImages;

  return (
    <section
      id="gallery"
      style={{ background: '#0B0F1A', padding: '96px 0 80px', position: 'relative' }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'rgba(240,237,230,0.07)' }} />

      {/* Header */}
      <div className="container-fm" style={{ marginBottom: '56px' }}>
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

      {/* Grid */}
      <div className="container-fm">

        {/* Block 1: featured left + small right */}
        <div className="gallery-row-a" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px', marginBottom: '12px' }}>
          <GalleryItem img={imgs[0]} size="featured" onClick={setLightbox} delay={0} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <GalleryItem img={imgs[1]} size="medium" onClick={setLightbox} delay={0.08} />
            <GalleryItem img={imgs[2]} size="medium" onClick={setLightbox} delay={0.14} />
          </div>
        </div>

        {/* Block 2: three equal columns */}
        <div className="gallery-row-b" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '12px' }}>
          <GalleryItem img={imgs[3]} size="medium" onClick={setLightbox} delay={0.05} />
          <GalleryItem img={imgs[4]} size="medium" onClick={setLightbox} delay={0.10} />
          <GalleryItem img={imgs[5]} size="medium" onClick={setLightbox} delay={0.15} />
        </div>

        {/* Block 3: small left + featured right (reversed) */}
        <div className="gallery-row-a" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px', marginBottom: '12px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <GalleryItem img={imgs[6]} size="medium" onClick={setLightbox} delay={0.06} />
            <GalleryItem img={imgs[7]} size="medium" onClick={setLightbox} delay={0.12} />
          </div>
          <GalleryItem img={imgs[8]} size="featured" onClick={setLightbox} delay={0} />
        </div>

        {/* Block 4: four small columns */}
        <div className="gallery-row-c" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '12px' }}>
          <GalleryItem img={imgs[9]}  size="small" onClick={setLightbox} delay={0.04} />
          <GalleryItem img={imgs[10]} size="small" onClick={setLightbox} delay={0.08} />
          <GalleryItem img={imgs[11]} size="small" onClick={setLightbox} delay={0.12} />
          <GalleryItem img={imgs[12]} size="small" onClick={setLightbox} delay={0.16} />
        </div>

        {/* Block 5: featured left + 2 stacked right */}
        <div className="gallery-row-a" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px', marginBottom: '12px' }}>
          <GalleryItem img={imgs[13]} size="featured" onClick={setLightbox} delay={0} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <GalleryItem img={imgs[14]} size="medium" onClick={setLightbox} delay={0.08} />
            <GalleryItem img={imgs[15]} size="medium" onClick={setLightbox} delay={0.14} />
          </div>
        </div>

        {/* Block 6: three equal */}
        <div className="gallery-row-b" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '12px' }}>
          <GalleryItem img={imgs[16]} size="medium" onClick={setLightbox} delay={0.05} />
          <GalleryItem img={imgs[17]} size="medium" onClick={setLightbox} delay={0.10} />
          <GalleryItem img={imgs[18]} size="medium" onClick={setLightbox} delay={0.15} />
        </div>

        {/* Block 7: 2 stacked left + featured right */}
        <div className="gallery-row-a" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px', marginBottom: '12px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <GalleryItem img={imgs[19]} size="medium" onClick={setLightbox} delay={0.06} />
            <GalleryItem img={imgs[20]} size="medium" onClick={setLightbox} delay={0.12} />
          </div>
          <GalleryItem img={imgs[21]} size="featured" onClick={setLightbox} delay={0} />
        </div>

        {/* Block 8: remaining images in 3 cols */}
        {imgs.length > 22 && (
          <div className="gallery-row-b" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            {imgs.slice(22).map((img, i) => (
              <GalleryItem key={i} img={img} size="medium" onClick={setLightbox} delay={i * 0.06} />
            ))}
          </div>
        )}
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
              <img
                src={lightbox.src}
                alt={lightbox.alt}
                style={{ maxWidth: '100%', maxHeight: '84vh', objectFit: 'contain', borderRadius: '12px', border: '1px solid rgba(240,237,230,0.08)', display: 'block', margin: '0 auto' }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @media (max-width: 768px) {
          .gallery-row-a {
            grid-template-columns: 1fr !important;
          }
          .gallery-row-b {
            grid-template-columns: 1fr 1fr !important;
          }
          .gallery-row-c {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .gallery-row-b {
            grid-template-columns: 1fr !important;
          }
          .gallery-row-c {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Gallery;
