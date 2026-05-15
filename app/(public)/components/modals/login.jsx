'use client';

import React, { useState } from 'react';
import { useUserModal } from '../../../../hooks/useUserModal';
import { useUserAuth } from '../../../../hooks/useUserAuth';

const inputStyle = {
  width: '100%',
  background: '#161616',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '10px',
  padding: '12px 14px',
  color: '#FFFFFF',
  outline: 'none',
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  transition: 'border-color 0.2s',
};

const LoginModal = () => {
  const { showLogin, closeModals, switchToSignup } = useUserModal();
  const { login, sendResetPasswordLink } = useUserAuth();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [email, setEmail] = useState('');
  const [showResetForm, setShowResetForm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await login({ phone, password });
      closeModals();
    } catch (err) {
      setError(err.response?.data?.msg || err.message || 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSendResetPasswordLink = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      setError('');
      await sendResetPasswordLink({ email: email.toLowerCase() });
      setSuccess('Reset link sent. Check your email.');
      setTimeout(() => setSuccess(''), 3000);
      setEmail('');
    } catch (err) {
      setError(err.response?.data?.msg || err.message || 'Failed to send reset link');
    } finally {
      setSubmitting(false);
    }
  };

  const handleForgotPasswordClick = () => { setShowResetForm(true); setError(''); };
  const handleBackToLogin = () => { setShowResetForm(false); setEmail(''); setError(''); setSuccess(''); };

  if (!showLogin) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Backdrop */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.80)',
          backdropFilter: 'blur(8px)',
        }}
        onClick={() => showResetForm ? handleBackToLogin() : closeModals()}
      />

      {/* Modal */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '400px',
          margin: '0 16px',
          background: '#111111',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '16px',
          padding: '36px 32px',
          boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
        }}
      >
        {/* Lime top accent */}
        <div
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0,
            height: '2px',
            background: '#ADFF47',
            borderRadius: '16px 16px 0 0',
          }}
        />

        {/* Close button */}
        <button
          onClick={closeModals}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#444444',
            fontFamily: 'Inter, sans-serif',
            fontSize: '20px',
            lineHeight: 1,
            padding: '4px',
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#444444')}
        >
          ×
        </button>

        {/* Error / success */}
        {error && (
          <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '8px', padding: '10px 14px', marginBottom: '16px', fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#f87171' }}>
            {error}
          </div>
        )}
        {success && (
          <div style={{ background: 'rgba(173,255,71,0.08)', border: '1px solid rgba(173,255,71,0.2)', borderRadius: '8px', padding: '10px 14px', marginBottom: '16px', fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#ADFF47' }}>
            {success}
          </div>
        )}

        {!showResetForm ? (
          <>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '22px', color: '#FFFFFF', marginBottom: '6px' }}>
              Welcome back
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#888888', marginBottom: '24px' }}>
              Sign in to your account
            </p>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={inputStyle}
                placeholder="Phone number"
                onFocus={(e) => (e.currentTarget.style.borderColor = '#ADFF47')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
              />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={inputStyle}
                placeholder="Password"
                onFocus={(e) => (e.currentTarget.style.borderColor = '#ADFF47')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
              />
              <button
                type="submit"
                disabled={submitting}
                className="btn-primary"
                style={{ padding: '12px', fontSize: '14px', marginTop: '4px', opacity: submitting ? 0.6 : 1, cursor: submitting ? 'not-allowed' : 'pointer', borderRadius: '10px' }}
              >
                {submitting ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
            <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
              <button
                onClick={handleForgotPasswordClick}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#888888', transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#888888')}
              >
                Forgot password?
              </button>
              <button
                onClick={switchToSignup}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#ADFF47' }}
              >
                No account? Sign up
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '22px', color: '#FFFFFF', marginBottom: '6px' }}>
              Reset password
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#888888', marginBottom: '24px' }}>
              Enter your email to receive a reset link
            </p>
            <form onSubmit={handleSendResetPasswordLink} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
                placeholder="Email address"
                onFocus={(e) => (e.currentTarget.style.borderColor = '#ADFF47')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
              />
              <button
                type="submit"
                disabled={submitting}
                className="btn-primary"
                style={{ padding: '12px', fontSize: '14px', opacity: submitting ? 0.6 : 1, cursor: submitting ? 'not-allowed' : 'pointer', borderRadius: '10px' }}
              >
                {submitting ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>
            <div style={{ marginTop: '16px', textAlign: 'center' }}>
              <button
                onClick={handleBackToLogin}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#ADFF47' }}
              >
                Back to login
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginModal;
