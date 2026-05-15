'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { THEME } from '@/lib/constants';

const About = () => {
  return (
    <section
      id="about"
      style={{
        background: '#111827',
        padding: '96px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '1px',
          background: 'rgba(240,237,230,0.07)',
        }}
      />

      <div className="container-fm">

        {/* Two-col header */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '80px',
            alignItems: 'center',
          }}
          className="about-grid"
        >
          {/* Left: heading */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#D4AF37',
                marginBottom: '20px',
              }}
            >
              About
            </div>
            <h2
              style={{
                fontFamily: 'Bricolage Grotesque, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(34px, 5vw, 58px)',
                lineHeight: 1.03,
                letterSpacing: '-0.03em',
                color: '#F0EDE6',
                margin: 0,
              }}
            >
              Empowering the Next Generation of{' '}
              <span style={{ color: '#D4AF37' }}>AI Leaders</span>
            </h2>
          </motion.div>

          {/* Right: description + quote */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.12, ease: 'easeOut' }}
          >
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '16px',
                color: '#6B6B6B',
                lineHeight: 1.78,
                marginBottom: '32px',
              }}
            >
              At Future Minds Institute, we believe every professional deserves to be
              future-ready. Powered by Women in Product India, we bridge the gap
              between academic learning and industry demands, ensuring you are
              not just keeping up with AI, you are leading it.
            </p>

            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              style={{
                borderLeft: '3px solid #D4AF37',
                paddingLeft: '20px',
              }}
            >
              <p
                style={{
                  fontFamily: 'Bricolage Grotesque, sans-serif',
                  fontWeight: 700,
                  fontSize: '17px',
                  color: '#F0EDE6',
                  lineHeight: 1.55,
                  margin: 0,
                  letterSpacing: '-0.01em',
                }}
              >
                "In a world where AI reshapes every industry, we ensure you are not just
                keeping up. You are leading the change."
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Trusted-by strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.2 }}
          style={{
            marginTop: '72px',
            paddingTop: '36px',
            borderTop: '1px solid rgba(240,237,230,0.06)',
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
            flexWrap: 'wrap',
          }}
        >
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '11px',
              fontWeight: 600,
              color: '#3A3A3A',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              flexShrink: 0,
            }}
          >
            Faculty from
          </span>
          {['Google', 'Amazon', 'Microsoft', 'Meta', 'Flipkart', 'PwC', 'Dell', 'Vedantu'].map((name, i) => (
            <motion.span
              key={name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
              style={{
                fontFamily: 'Bricolage Grotesque, sans-serif',
                fontWeight: 700,
                fontSize: '14px',
                color: '#3A3A3A',
                letterSpacing: '-0.01em',
              }}
            >
              {name}
            </motion.span>
          ))}
        </motion.div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default About;
