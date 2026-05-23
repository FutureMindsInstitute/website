'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { THEME } from '@/lib/constants';

const metricsData = [
  { num: '01', end: 1000, suffix: '+', label: 'Students Trained',      desc: 'Professionals upskilled across all cohorts' },
  { num: '02', end: 95,   suffix: '%', label: 'Placement Rate',        desc: 'Students who landed stronger roles' },
  { num: '03', end: 15,   suffix: '+', label: 'Expert Educators',      desc: 'Industry veterans from global tech firms' },
  { num: '04', end: 10,   suffix: '+', label: 'Cohorts Delivered',     desc: 'Live programs run to date' },
];

const BarIndicator = () => (
  <div style={{ display: 'flex', gap: '3px', alignItems: 'flex-end' }}>
    {[8, 12, 16, 20].map((h, i) => (
      <motion.div
        key={i}
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: i * 0.07, ease: 'easeOut' }}
        style={{
          width: '3px',
          height: `${h}px`,
          background: '#D4AF37',
          borderRadius: '2px',
          opacity: 0.45 + i * 0.15,
          transformOrigin: 'bottom',
        }}
      />
    ))}
  </div>
);

function CountUp({ end, suffix, duration = 1800 }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  useEffect(() => {
    if (!inView) return;
    let startTime = null;
    const tick = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * end));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, end, duration]);

  return <span ref={ref}>{value}{suffix}</span>;
}

const Metrics = () => {
  return (
    <section
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

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px',
            marginBottom: '64px',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#D4AF37',
                marginBottom: '16px',
              }}
            >
              Impact
            </div>
            <h2
              style={{
                fontFamily: 'Bricolage Grotesque, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(32px, 4.5vw, 56px)',
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                color: '#F0EDE6',
                margin: 0,
              }}
            >
              Our Metrics
            </h2>
          </div>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '15px',
              color: '#6B6B6B',
              maxWidth: '380px',
              lineHeight: 1.65,
              margin: 0,
            }}
          >
            Real outcomes from working professionals who chose to invest in their skills.
          </p>
        </motion.div>

        {/* Metric cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px',
          }}
          className="metrics-grid"
        >
          {metricsData.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.09 }}
              style={{
                background: '#1A2035',
                border: '1px solid rgba(240,237,230,0.07)',
                borderRadius: '16px',
                padding: '28px 26px 32px',
                position: 'relative',
                overflow: 'hidden',
                transition: 'border-color 0.25s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(212,175,55,0.22)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(240,237,230,0.07)')}
            >
              {/* Top row */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '52px',
                }}
              >
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#3A3A3A',
                    letterSpacing: '0.06em',
                  }}
                >
                  {m.num}
                </span>
                <BarIndicator />
              </div>

              {/* Big number */}
              <div
                style={{
                  fontFamily: 'Bricolage Grotesque, sans-serif',
                  fontWeight: 800,
                  fontSize: 'clamp(44px, 5vw, 64px)',
                  lineHeight: 1,
                  color: '#F0EDE6',
                  marginBottom: '14px',
                  letterSpacing: '-0.02em',
                }}
              >
                <CountUp end={m.end} suffix={m.suffix} duration={1600 + i * 120} />
              </div>

              {/* Label */}
              <div
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#6B6B6B',
                  marginBottom: '6px',
                }}
              >
                {m.label}
              </div>
              <div
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '12px',
                  color: '#3A3A3A',
                  lineHeight: 1.5,
                }}
              >
                {m.desc}
              </div>

              {/* Subtle amber bottom border on hover */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: 'linear-gradient(90deg, #D4AF37, transparent)',
                  opacity: 0,
                  transition: 'opacity 0.25s ease',
                }}
                className="metric-bottom-line"
              />
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .metric-card:hover .metric-bottom-line {
          opacity: 1;
        }
        @media (max-width: 900px) {
          .metrics-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          .metrics-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Metrics;
