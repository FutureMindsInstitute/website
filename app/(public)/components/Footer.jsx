'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

const LinkedInIcon = () => (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const XIcon = () => (
  <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
  </svg>
);

const Footer = () => {
  const router = useRouter();
  const pathname = usePathname();

  const scrollToSection = (sectionId) => {
    if (pathname === '/' || pathname === '') {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push(`/#${sectionId}`);
    }
  };

  const navLinks = [
    { label: 'About',     section: 'about' },
    { label: 'Courses',   section: 'courses' },
    { label: 'Educators', section: 'educators' },
    { label: 'Stories',   section: 'stories' },
  ];

  const legalLinks = [
    { label: 'Privacy Policy',    href: '/privacypolicy' },
    { label: 'Terms & Conditions', href: '/tac' },
    { label: 'Refund Policy',     href: '/refundpolicy' },
  ];

  return (
    <footer
      style={{
        background: '#0C0C0C',
        borderTop: '1px solid rgba(240,237,230,0.06)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top amber gradient line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, #D4AF37 40%, transparent 100%)',
          opacity: 0.4,
        }}
      />

      <div className="container-fm" style={{ paddingTop: '64px', paddingBottom: '0' }}>

        {/* Main footer grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr',
            gap: '48px',
            marginBottom: '56px',
          }}
          className="footer-grid"
        >
          {/* Brand column */}
          <div>
            {/* Logo */}
            <div style={{ marginBottom: '18px' }}>
              <img
                src="/assets/logo-transparent.png"
                alt="Future Minds Institute"
                style={{
                  height: '72px',
                  width: 'auto',
                  display: 'block',
                  objectFit: 'contain',
                }}
              />
            </div>

            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                color: '#6B6B6B',
                lineHeight: 1.7,
                marginBottom: '24px',
                maxWidth: '300px',
              }}
            >
              Empowering the next generation of AI leaders through industry-led,
              hands-on training. Powered by Women in Product India.
            </p>

            {/* Social links */}
            <div style={{ display: 'flex', gap: '10px' }}>
              {[
                { href: 'https://www.linkedin.com/company/future-minds-institute', icon: <LinkedInIcon /> },
                { href: 'https://twitter.com/futuremindsinst', icon: <XIcon /> },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(240,237,230,0.03)',
                    border: '1px solid rgba(240,237,230,0.08)',
                    color: '#6B6B6B',
                    textDecoration: 'none',
                    transition: 'border-color 0.2s ease, color 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(232,160,48,0.35)';
                    e.currentTarget.style.color = '#D4AF37';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(240,237,230,0.08)';
                    e.currentTarget.style.color = '#6B6B6B';
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation column */}
          <div>
            <div
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#3A3A3A',
                marginBottom: '20px',
              }}
            >
              Navigation
            </div>
            <ul style={{ listStyle: 'none' }}>
              {navLinks.map((link) => (
                <li key={link.section} style={{ marginBottom: '10px' }}>
                  <button
                    onClick={() => scrollToSection(link.section)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 500,
                      fontSize: '14px',
                      color: '#6B6B6B',
                      padding: 0,
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#D4AF37')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#6B6B6B')}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal column */}
          <div>
            <div
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#3A3A3A',
                marginBottom: '20px',
              }}
            >
              Legal
            </div>
            <ul style={{ listStyle: 'none' }}>
              {legalLinks.map((link) => (
                <li key={link.href} style={{ marginBottom: '10px' }}>
                  <Link
                    href={link.href}
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 500,
                      fontSize: '14px',
                      color: '#6B6B6B',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#D4AF37')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#6B6B6B')}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid rgba(240,237,230,0.06)',
            padding: '20px 0',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px',
          }}
        >
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              color: '#3A3A3A',
            }}
          >
            {new Date().getFullYear()} Future Minds Institute. All rights reserved.
          </p>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              color: '#3A3A3A',
            }}
          >
            Powered by{' '}
            <span style={{ color: '#D4AF37' }}>Women in Product India</span>
          </p>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
