'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const galleryImages = [
  { src: '/assets/gallery/DSC01373.JPG',        alt: 'FMI session highlights',      orientation: 'landscape' },
  { src: '/assets/gallery/DSC01460.JPG',         alt: 'FMI workshop highlights',     orientation: 'landscape' },
  { src: '/assets/gallery/IMG_3764.JPG',         alt: 'FMI Workshop session',        orientation: 'landscape' },
  { src: '/assets/gallery/IMG_3743 3.JPG',       alt: 'Students collaborating',      orientation: 'landscape' },
  { src: '/assets/gallery/IMG_3458.JPG',         alt: 'Hands-on AI training',        orientation: 'landscape' },
  { src: '/assets/gallery/IMG_3727.JPG',         alt: 'FMI live training',           orientation: 'landscape' },
  { src: '/assets/gallery/IMG_3505.jpg',         alt: 'FMI workshop',                orientation: 'landscape' },
  { src: '/assets/gallery/IMG_3687.JPG',         alt: 'FMI cohort gathering',        orientation: 'landscape' },
  { src: '/assets/gallery/IMG_2315.JPG',         alt: 'FMI community',               orientation: 'landscape' },
  { src: '/assets/gallery/IMG_2476.JPG',         alt: 'FMI cohort event',            orientation: 'landscape' },
  { src: '/assets/gallery/IMG_3423 2.JPG',       alt: 'FMI hands-on training',       orientation: 'landscape' },
  { src: '/assets/gallery/IMG_2260.JPG',         alt: 'Cohort gathering',            orientation: 'landscape' },
  { src: '/assets/gallery/IMG_8668.JPG',         alt: 'Industry expert session',     orientation: 'landscape' },
  { src: '/assets/gallery/IMG_9916.JPG',         alt: 'Student presentations',       orientation: 'portrait'  },
  { src: '/assets/gallery/IMG_0024 (2).jpg',     alt: 'Workshop highlights',         orientation: 'landscape' },
  { src: '/assets/gallery/IMG_0030 (1).jpg',     alt: 'Project building session',    orientation: 'landscape' },
  { src: '/assets/gallery/IMG_0568.JPG',         alt: 'AI tools workshop',           orientation: 'landscape' },
  { src: '/assets/gallery/IMG_4657.JPG',         alt: 'Community event',             orientation: 'landscape' },
  { src: '/assets/gallery/IMG_4575.JPG',         alt: 'FMI cohort',                  orientation: 'landscape' },
  { src: '/assets/gallery/IMG_4674.JPG',         alt: 'Live session',                orientation: 'landscape' },
  { src: '/assets/gallery/IMG_4765.JPG',         alt: 'Workshop activity',           orientation: 'landscape' },
  { src: '/assets/gallery/IMG_4853.JPG',         alt: 'Team building',               orientation: 'landscape' },
  { src: '/assets/gallery/IMG_5308.JPG',         alt: 'Learning session',            orientation: 'landscape' },
  { src: '/assets/gallery/IMG_6578.JPG',         alt: 'FMI event',                   orientation: 'landscape' },
  { src: '/assets/gallery/IMG_7092.JPG',         alt: 'Student activity',            orientation: 'landscape' },
];

const GalleryImg = ({ img, onClick, delay = 0, style = {} }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-30px' }}
    transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    onClick={() => onClick(img)}
    className="gallery-img-wrap"
    style={{
      position: 'relative',
      borderRadius: '14px',
      overflow: 'hidden',
      cursor: 'pointer',
      border: '1px solid rgba(240,237,230,0.07)',
      ...style,
    }}
  >
    <img
      src={img.src}
      alt={img.alt}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: img.orientation === 'portrait' ? 'center top' : 'center center',
        display: 'block',
        transition: 'transform 0.6s cubic-bezier(0.22,1,0.36,1)',
      }}
    />
    {/* Hover overlay */}
    <div className="gallery-overlay" style={{
      position: 'absolute', inset: 0,
      background: 'linear-gradient(180deg, transparent 40%, rgba(11,15,26,0.75) 100%)',
      opacity: 0,
      transition: 'opacity 0.35s ease',
      display: 'flex', alignItems: 'flex-end',
      padding: '16px',
    }}>
      <span style={{
        fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 500,
        color: 'rgba(240,237,230,0.85)', letterSpacing: '0.03em',
      }}>{img.alt}</span>
    </div>
    {/* Gold expand icon */}
    <div className="gallery-icon" style={{
      position: 'absolute', top: '12px', right: '12px',
      width: '30px', height: '30px', borderRadius: '50%',
      background: 'rgba(11,15,26,0.65)', border: '1px solid rgba(212,175,55,0.4)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      opacity: 0, transition: 'opacity 0.3s ease',
    }}>
      <svg width="12" height="12" fill="none" stroke="#D4AF37" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" strokeLinecap="round" />
      </svg>
    </div>
  </motion.div>
);

/* Marquee strip */
const strip1 = galleryImages.slice(0, 13);
const strip2 = galleryImages.slice(12);

const MarqueeStrip = ({ images, direction = 'left', speed = 38 }) => {
  const doubled = [...images, ...images];
  const totalW = images.length * (220 + 10);
  const dur = totalW / speed;
  return (
    <div style={{ overflow: 'hidden', position: 'relative' }}>
      <motion.div
        animate={{ x: direction === 'left' ? [-totalW, 0] : [0, -totalW] }}
        transition={{ duration: dur, repeat: Infinity, ease: 'linear' }}
        style={{ display: 'flex', gap: '10px', width: 'max-content' }}
      >
        {doubled.map((img, i) => (
          <div key={i} style={{
            flexShrink: 0, width: '220px', height: '148px',
            borderRadius: '10px', overflow: 'hidden',
            border: '1px solid rgba(240,237,230,0.07)',
          }}>
            <img src={img.src} alt={img.alt} style={{
              width: '100%', height: '100%', objectFit: 'cover',
              objectPosition: img.orientation === 'portrait' ? 'center top' : 'center center',
            }} />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const Gallery = () => {
  const [lightbox, setLightbox] = useState(null);
  const imgs = galleryImages;

  return (
    <section
      id="gallery"
      style={{ background: '#0B0F1A', padding: '96px 0 0', position: 'relative', overflow: 'hidden' }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'rgba(240,237,230,0.07)' }} />

      {/* Header */}
      <div className="container-fm" style={{ marginBottom: '56px' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#D4AF37', marginBottom: '14px' }}>
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

      {/* === MAIN GRID === */}
      <div className="container-fm" style={{ marginBottom: '16px' }}>

        {/* Row 1: Hero wide + 2 stacked right */}
        <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '12px', marginBottom: '12px' }} className="g-row-a">
          <GalleryImg img={imgs[0]} onClick={setLightbox} delay={0} style={{ height: '380px' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <GalleryImg img={imgs[1]} onClick={setLightbox} delay={0.07} style={{ height: '184px' }} />
            <GalleryImg img={imgs[2]} onClick={setLightbox} delay={0.13} style={{ height: '184px' }} />
          </div>
        </div>

        {/* Row 2: 3 equal medium */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px', marginBottom: '12px' }} className="g-row-b">
          <GalleryImg img={imgs[3]} onClick={setLightbox} delay={0.04} style={{ height: '230px' }} />
          <GalleryImg img={imgs[4]} onClick={setLightbox} delay={0.09} style={{ height: '230px' }} />
          <GalleryImg img={imgs[5]} onClick={setLightbox} delay={0.14} style={{ height: '230px' }} />
        </div>

        {/* Row 3: 2 stacked left + hero wide right */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 3fr', gap: '12px', marginBottom: '12px' }} className="g-row-a">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <GalleryImg img={imgs[6]} onClick={setLightbox} delay={0.05} style={{ height: '184px' }} />
            <GalleryImg img={imgs[7]} onClick={setLightbox} delay={0.11} style={{ height: '184px' }} />
          </div>
          <GalleryImg img={imgs[8]} onClick={setLightbox} delay={0} style={{ height: '380px' }} />
        </div>

        {/* Row 4: 4 small */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '12px', marginBottom: '12px' }} className="g-row-c">
          {imgs.slice(9, 13).map((img, i) => (
            <GalleryImg key={i} img={img} onClick={setLightbox} delay={i * 0.06} style={{ height: '170px' }} />
          ))}
        </div>

        {/* Row 5: wide left + 2 stacked right */}
        <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '12px', marginBottom: '12px' }} className="g-row-a">
          <GalleryImg img={imgs[13]} onClick={setLightbox} delay={0} style={{ height: '310px' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <GalleryImg img={imgs[14]} onClick={setLightbox} delay={0.07} style={{ height: '149px' }} />
            <GalleryImg img={imgs[15]} onClick={setLightbox} delay={0.13} style={{ height: '149px' }} />
          </div>
        </div>

      </div>

      {/* === MARQUEE STRIP === */}
      <div style={{ position: 'relative', paddingBottom: '80px' }}>
        {/* Edge fades */}
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '100px', background: 'linear-gradient(90deg,#0B0F1A,transparent)', zIndex: 10, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '100px', background: 'linear-gradient(-90deg,#0B0F1A,transparent)', zIndex: 10, pointerEvents: 'none' }} />

        <div style={{ marginBottom: '10px' }}>
          <MarqueeStrip images={strip1} direction="left" speed={36} />
        </div>
        <MarqueeStrip images={strip2} direction="right" speed={30} />
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', background: 'rgba(0,0,0,0.96)', backdropFilter: 'blur(20px)' }}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={e => e.stopPropagation()}
              style={{ position: 'relative', maxWidth: '1100px', width: '100%' }}
            >
              <button
                onClick={() => setLightbox(null)}
                style={{ position: 'absolute', top: '-48px', right: 0, background: 'rgba(240,237,230,0.05)', border: '1px solid rgba(240,237,230,0.15)', borderRadius: '8px', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#F0EDE6' }}
              >
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" /></svg>
              </button>
              <img
                src={lightbox.src}
                alt={lightbox.alt}
                style={{ maxWidth: '100%', maxHeight: '85vh', objectFit: 'contain', borderRadius: '14px', border: '1px solid rgba(240,237,230,0.08)', display: 'block', margin: '0 auto', boxShadow: '0 32px 80px rgba(0,0,0,0.8)' }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .gallery-img-wrap:hover img { transform: scale(1.06); }
        .gallery-img-wrap:hover .gallery-overlay { opacity: 1 !important; }
        .gallery-img-wrap:hover .gallery-icon { opacity: 1 !important; }

        @media (max-width: 768px) {
          .g-row-a { grid-template-columns: 1fr !important; }
          .g-row-b { grid-template-columns: 1fr 1fr !important; }
          .g-row-c { grid-template-columns: 1fr 1fr !important; }
          .g-row-a > div { flex-direction: row !important; }
          .g-row-a > div > * { height: 160px !important; }
        }
        @media (max-width: 480px) {
          .g-row-b { grid-template-columns: 1fr !important; }
          .g-row-c { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default Gallery;
