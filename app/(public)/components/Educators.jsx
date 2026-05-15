'use client';

import React from 'react';
import { motion } from 'framer-motion';

const educators = [
  {
    name: 'Swati Awasthi',
    title: 'Founder, Women in Product India',
    image: '/assets/educators/swatiawasthi.jpg',
    bio: 'Swati is the Founder of Women in Product India, building a thriving community with a sharp vision of advancing women in product leadership and entrepreneurship.',
    achievements: [
      'Led AI, SaaS and mobile products at Dell, PwC and Sapient',
      'Worked across the US, UK and India',
      'Led impactful AI PM Mastery cohorts',
      "Speaker at IIM Bangalore and IIT Delhi Tech Week",
      "Tech Leadership Award 2025 by AIM's The Rising",
    ],
    specialties: ['AI Product Management', 'Leadership', 'Entrepreneurship', 'Community Building'],
    linkedin: 'https://www.linkedin.com/in/swati-awasthi/',
  },
  {
    name: 'Amrit Raj',
    title: 'Co-Founder, Women in Product India',
    image: '/assets/educators/amritraj.jpg',
    bio: 'Amrit Raj has 11+ years in the education sector. Social media strategist, curious learner, AI enthusiast, passionate about skilling students to be future-ready.',
    achievements: [
      'Entrepreneur and Educator with 11+ years in education',
      'Ex Xylem, Vedantu and Allen',
      'YouTube and Academic Head',
      'Mentors and advises working professionals',
      'Passionate about skilling students to be future-ready',
    ],
    specialties: ['Education Technology', 'Social Strategy', 'Mentoring', 'Technical Leadership'],
    linkedin: 'https://www.linkedin.com/in/amritraj02/',
  },
];

const LinkedInIcon = () => (
  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const Educators = () => {
  return (
    <section
      id="educators"
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
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'rgba(240,237,230,0.07)',
        }}
      />

      <div className="container-fm">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          style={{ marginBottom: '64px' }}
        >
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
            Faculty
          </div>
          <h2
            style={{
              fontFamily: 'Bricolage Grotesque, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(30px, 4vw, 48px)',
              lineHeight: 1.07,
              letterSpacing: '-0.03em',
              color: '#F0EDE6',
              marginBottom: '14px',
              maxWidth: '520px',
            }}
          >
            Meet Your{' '}
            <span style={{ color: '#D4AF37' }}>Educators</span>
          </h2>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '15px',
              color: '#6B6B6B',
              maxWidth: '500px',
              lineHeight: 1.65,
            }}
          >
            Learn from industry leaders who have shaped the AI and product landscape
            across global organizations and built communities that matter.
          </p>
        </motion.div>

        {/* Educator cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '20px',
          }}
          className="educators-grid"
        >
          {educators.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.15 }}
              style={{
                background: '#1A2035',
                border: '1px solid rgba(240,237,230,0.07)',
                borderLeft: '2px solid #D4AF37',
                borderRadius: '12px',
                overflow: 'hidden',
                transition: 'border-color 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(240,237,230,0.14)';
                e.currentTarget.style.borderLeftColor = '#D4AF37';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(240,237,230,0.07)';
                e.currentTarget.style.borderLeftColor = '#D4AF37';
              }}
            >
              <div style={{ padding: '32px' }}>

                {/* Profile header */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '18px',
                    marginBottom: '24px',
                  }}
                >
                  <img
                    src={edu.image}
                    alt={edu.name}
                    style={{
                      width: '72px',
                      height: '72px',
                      borderRadius: '10px',
                      objectFit: 'cover',
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <h3
                      style={{
                        fontFamily: 'Bricolage Grotesque, sans-serif',
                        fontWeight: 700,
                        fontSize: '19px',
                        color: '#F0EDE6',
                        marginBottom: '4px',
                        lineHeight: 1.2,
                      }}
                    >
                      {edu.name}
                    </h3>
                    <p
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '13px',
                        fontWeight: 500,
                        color: '#D4AF37',
                        marginBottom: '10px',
                        lineHeight: 1.3,
                      }}
                    >
                      {edu.title}
                    </p>
                    <a
                      href={edu.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '4px 12px',
                        borderRadius: '6px',
                        background: 'rgba(240,237,230,0.03)',
                        border: '1px solid rgba(240,237,230,0.08)',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '11px',
                        fontWeight: 600,
                        color: '#6B6B6B',
                        textDecoration: 'none',
                        transition: 'border-color 0.2s ease, color 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(240,237,230,0.2)';
                        e.currentTarget.style.color = '#F0EDE6';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(240,237,230,0.08)';
                        e.currentTarget.style.color = '#6B6B6B';
                      }}
                    >
                      <LinkedInIcon />
                      LinkedIn
                    </a>
                  </div>
                </div>

                {/* Bio */}
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                    color: '#6B6B6B',
                    lineHeight: 1.7,
                    marginBottom: '24px',
                  }}
                >
                  {edu.bio}
                </p>

                {/* Achievements */}
                <div style={{ marginBottom: '22px' }}>
                  <div
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '10px',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: '#D4AF37',
                      marginBottom: '12px',
                    }}
                  >
                    Key Achievements
                  </div>
                  <ul style={{ listStyle: 'none' }}>
                    {edu.achievements.map((ach, j) => (
                      <li
                        key={j}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '10px',
                          marginBottom: '7px',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '12px',
                            fontWeight: 700,
                            color: '#D4AF37',
                            lineHeight: '1.5',
                            flexShrink: 0,
                          }}
                        >
                          +
                        </span>
                        <span
                          style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '13px',
                            color: '#6B6B6B',
                            lineHeight: 1.55,
                          }}
                        >
                          {ach}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Specialties */}
                <div>
                  <div
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '10px',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: '#3A3A3A',
                      marginBottom: '10px',
                    }}
                  >
                    Specialties
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {edu.specialties.map((spec, j) => (
                      <span
                        key={j}
                        style={{
                          padding: '4px 12px',
                          borderRadius: '6px',
                          border: '1px solid rgba(212,175,55,0.25)',
                          background: 'rgba(212,175,55,0.08)',
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '11px',
                          fontWeight: 500,
                          color: '#D4AF37',
                        }}
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.25 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
            marginTop: '48px',
          }}
          className="edu-stats-grid"
        >
          {[
            { value: '15+', label: 'Years Combined Experience' },
            { value: '500+', label: 'Students Mentored' },
            { value: '10+', label: 'Global Companies' },
          ].map((stat, i) => (
            <div
              key={i}
              style={{
                background: '#1A2035',
                border: '1px solid rgba(240,237,230,0.07)',
                borderRadius: '12px',
                padding: '28px 20px',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: 'Bricolage Grotesque, sans-serif',
                  fontWeight: 800,
                  fontSize: '32px',
                  color: '#D4AF37',
                  lineHeight: 1,
                  marginBottom: '6px',
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '13px',
                  color: '#6B6B6B',
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .educators-grid {
            grid-template-columns: 1fr !important;
          }
          .edu-stats-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Educators;
