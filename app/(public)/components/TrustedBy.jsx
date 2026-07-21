'use client';

import { motion } from 'framer-motion';

const orgs = [
  { name: 'Google',             url: 'https://google.com',                   logo: '/assets/partners/google.svg',  h: 22 },
  { name: 'Swiggy',             url: 'https://swiggy.com',                   logo: '/assets/partners/swiggy.png',  h: 22 },
  { name: 'Primus Life School', url: 'https://www.primuslife.in/bangalore/', logo: '/assets/partners/primus.png',  h: 22 },
  { name: 'HerKey',             url: 'https://www.herkey.com/',              logo: '/assets/partners/herkey.svg',  h: 20 },
  { name: 'Dayananda Sagar University', url: 'https://www.dsu.edu.in/',      logo: null,                           h: 22 },
  { name: 'UTM',                url: 'https://www.utm.co.in/',               logo: null,                           h: 22 },
  { name: 'Marzi',              url: 'https://marzi.life/',                  logo: '/assets/partners/marzi.png',   h: 28 },
];

const TrustedBy = () => (
  <section style={{ background: '#0B0F1A', padding: '24px 0', position: 'relative' }}>
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'rgba(240,237,230,0.07)' }} />
    <div className="container-fm">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '32px',
          flexWrap: 'wrap',
        }}
      >
        <span style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '10px',
          fontWeight: 600,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: '#4A4A4A',
          whiteSpace: 'nowrap',
        }}>
          Training Delivered At
        </span>

        <div style={{
          width: '1px',
          height: '20px',
          background: 'rgba(240,237,230,0.1)',
          flexShrink: 0,
        }} className="trusted-divider" />

        {orgs.map((org, i) => (
          <a
            key={i}
            href={org.url}
            target="_blank"
            rel="noopener noreferrer"
            className="trusted-link"
            style={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              opacity: 0.5,
              transition: 'opacity 0.25s ease',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.5'; }}
          >
            {org.logo ? (
              <img
                src={org.logo}
                alt={org.name}
                style={{
                  height: `${org.h}px`,
                  objectFit: 'contain',
                  filter: 'brightness(0) invert(1)',
                  display: 'block',
                }}
              />
            ) : (
              <span style={{
                fontFamily: 'Bricolage Grotesque, sans-serif',
                fontWeight: 700,
                fontSize: '14px',
                color: '#F0EDE6',
                letterSpacing: '-0.01em',
              }}>
                {org.name}
              </span>
            )}
          </a>
        ))}
      </motion.div>
    </div>

    <style jsx>{`
      @media (max-width: 640px) {
        .trusted-divider { display: none !important; }
      }
    `}</style>
  </section>
);

export default TrustedBy;
