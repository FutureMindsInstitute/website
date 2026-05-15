'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserModal } from '../../../hooks/useUserModal';
import { useUserAuth } from '../../../hooks/useUserAuth';
import { useRouter, usePathname } from 'next/navigation';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openLogin } = useUserModal();
  const { isAuthenticated } = useUserAuth();
  const router = useRouter();
  const pathname = usePathname();

  const scrollToSection = (sectionId) => {
    if (pathname === '/' || pathname === '') {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    } else {
      router.push(`/#${sectionId}`);
      setIsMenuOpen(false);
    }
  };

  const handleLogoClick = () => {
    if (pathname === '/' || pathname === '') {
      scrollToSection('hero');
    } else {
      router.push('/');
    }
  };

  const handleRegisterClick = () => {
    if (!isAuthenticated) openLogin();
    else scrollToSection('courses');
  };

  const navLinks = [
    { label: 'About',     section: 'about' },
    { label: 'Courses',   section: 'courses' },
    { label: 'Educators', section: 'educators' },
    { label: 'Stories',   section: 'stories' },
  ];

  const handleMasterclasstClick = () => {
    router.push('/ai-mastery');
    setIsMenuOpen(false);
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: '#0B0F1A',
        borderBottom: '1px solid rgba(240,237,230,0.06)',
      }}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="container-fm">
        <div className="flex items-center justify-between" style={{ height: '72px' }}>

          {/* Logo */}
          <button
            onClick={handleLogoClick}
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
          >
            <img
              src="/assets/logo-transparent.png"
              alt="Future Minds Institute"
              style={{
                height: '64px',
                width: 'auto',
                display: 'block',
                objectFit: 'contain',
              }}
            />
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.section}
                onClick={() => scrollToSection(link.section)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 500,
                  fontSize: '14px',
                  color: '#6B6B6B',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#F0EDE6')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#6B6B6B')}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={handleMasterclasstClick}
              style={{
                background: 'rgba(212,175,55,0.08)',
                border: '1px solid rgba(212,175,55,0.25)',
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: '13px',
                color: '#D4AF37',
                padding: '6px 14px',
                borderRadius: '8px',
                transition: 'background 0.2s ease, border-color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(212,175,55,0.15)';
                e.currentTarget.style.borderColor = 'rgba(212,175,55,0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(212,175,55,0.08)';
                e.currentTarget.style.borderColor = 'rgba(212,175,55,0.25)';
              }}
            >
              Masterclass
            </button>
          </div>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <button
                onClick={() => router.push('/dashboard')}
                className="hidden md:flex btn-secondary"
                style={{ padding: '8px 20px', fontSize: '14px' }}
              >
                Dashboard
              </button>
            ) : (
              <button
                onClick={handleRegisterClick}
                className="hidden md:flex"
                style={{
                  padding: '9px 22px',
                  fontSize: '14px',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 700,
                  background: '#D4AF37',
                  color: '#0B0F1A',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                }}
              >
                Get Started
              </button>
            )}

            {/* Hamburger */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden flex flex-col justify-center items-center gap-1.5"
              style={{
                background: 'none',
                border: '1px solid rgba(240,237,230,0.10)',
                borderRadius: '8px',
                width: '38px',
                height: '38px',
                cursor: 'pointer',
              }}
              aria-label="Toggle menu"
            >
              <motion.span
                style={{
                  display: 'block',
                  width: '16px',
                  height: '1.5px',
                  background: '#F0EDE6',
                  borderRadius: '2px',
                }}
                animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 5 : 0 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                style={{
                  display: 'block',
                  width: '16px',
                  height: '1.5px',
                  background: '#F0EDE6',
                  borderRadius: '2px',
                }}
                animate={{ opacity: isMenuOpen ? 0 : 1 }}
                transition={{ duration: 0.15 }}
              />
              <motion.span
                style={{
                  display: 'block',
                  width: '16px',
                  height: '1.5px',
                  background: '#F0EDE6',
                  borderRadius: '2px',
                }}
                animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? -5 : 0 }}
                transition={{ duration: 0.2 }}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden"
            style={{
              background: '#0C0C0C',
              borderTop: '1px solid rgba(240,237,230,0.06)',
              overflow: 'hidden',
            }}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <div className="container-fm" style={{ paddingTop: '12px', paddingBottom: '16px' }}>
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.section}
                  onClick={() => scrollToSection(link.section)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 500,
                    fontSize: '15px',
                    color: '#6B6B6B',
                    padding: '11px 4px',
                    borderBottom: '1px solid rgba(240,237,230,0.04)',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#F0EDE6')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#6B6B6B')}
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.button
                onClick={handleMasterclasstClick}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.04 }}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: '15px',
                  color: '#D4AF37',
                  padding: '11px 4px',
                  borderBottom: '1px solid rgba(240,237,230,0.04)',
                }}
              >
                Masterclass
              </motion.button>
              <div style={{ paddingTop: '14px' }}>
                <button
                  onClick={handleRegisterClick}
                  className="btn-primary"
                  style={{ width: '100%', padding: '12px', fontSize: '15px' }}
                >
                  {isAuthenticated ? 'Dashboard' : 'Get Started'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
