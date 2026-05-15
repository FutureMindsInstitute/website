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

const SignupModal = () => {
  const { showSignup, closeModals, switchToLogin } = useUserModal();
  const { sendSignupOtp, signup } = useUserAuth();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', otp: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const onChange = (k) => (e) => setForm((s) => ({ ...s, [k]: e.target.value }));

  const sendOtp = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await sendSignupOtp({ name: form.name, email: form.email.toLowerCase(), phone: form.phone, password: form.password });
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.msg || err.message || 'Failed to send OTP');
    } finally {
      setSubmitting(false);
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await signup({ name: form.name, email: form.email.toLowerCase(), phone: form.phone, password: form.password, otp: form.otp });
      closeModals();
    } catch (err) {
      setError(err.response?.data?.msg || err.message || 'OTP verification failed');
    } finally {
      setSubmitting(false);
    }
  };

  const closeAndReset = () => {
    setStep(1);
    setForm({ name: '', email: '', phone: '', password: '', otp: '' });
    setError('');
    setSubmitting(false);
    closeModals();
  };

  const focusStyle = (e) => (e.currentTarget.style.borderColor = '#ADFF47');
  const blurStyle = (e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)');

  if (!showSignup) return null;

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
        onClick={closeAndReset}
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

        {/* Close */}
        <button
          onClick={closeAndReset}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#444444',
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

        {error && (
          <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '8px', padding: '10px 14px', marginBottom: '16px', fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#f87171' }}>
            {error}
          </div>
        )}

        {step === 1 ? (
          <>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '22px', color: '#FFFFFF', marginBottom: '6px' }}>
              Create account
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#888888', marginBottom: '24px' }}>
              Join Future Minds Institute
            </p>
            <form onSubmit={sendOtp} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input type="text" required value={form.name} onChange={onChange('name')} style={inputStyle} placeholder="Full name" onFocus={focusStyle} onBlur={blurStyle} />
              <input type="email" required value={form.email.toLowerCase()} onChange={onChange('email')} style={inputStyle} placeholder="Email address" onFocus={focusStyle} onBlur={blurStyle} />
              <input type="number" max={9999999999} min={1000000000} required value={form.phone} onChange={onChange('phone')} style={inputStyle} placeholder="Phone number" onFocus={focusStyle} onBlur={blurStyle} />
              <input type="password" required value={form.password} onChange={onChange('password')} style={inputStyle} placeholder="Password" onFocus={focusStyle} onBlur={blurStyle} />
              <button
                type="submit"
                disabled={submitting}
                className="btn-primary"
                style={{ padding: '12px', fontSize: '14px', marginTop: '4px', opacity: submitting ? 0.6 : 1, cursor: submitting ? 'not-allowed' : 'pointer', borderRadius: '10px' }}
              >
                {submitting ? 'Sending OTP...' : 'Send OTP'}
              </button>
            </form>
            <div style={{ marginTop: '16px', textAlign: 'center' }}>
              <button
                onClick={switchToLogin}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#ADFF47' }}
              >
                Already have an account? Sign in
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '22px', color: '#FFFFFF', marginBottom: '6px' }}>
              Verify OTP
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#888888', marginBottom: '24px' }}>
              Enter the 6-digit code sent to your phone
            </p>
            <form onSubmit={verifyOtp} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input
                type="number"
                required
                value={form.otp}
                onChange={onChange('otp')}
                style={inputStyle}
                placeholder="6-digit code"
                onFocus={focusStyle}
                onBlur={blurStyle}
              />
              <button
                type="submit"
                disabled={submitting}
                className="btn-primary"
                style={{ padding: '12px', fontSize: '14px', opacity: submitting ? 0.6 : 1, cursor: submitting ? 'not-allowed' : 'pointer', borderRadius: '10px' }}
              >
                {submitting ? 'Verifying...' : 'Verify and Create Account'}
              </button>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="btn-secondary"
                style={{ padding: '12px', fontSize: '14px', borderRadius: '10px' }}
              >
                Back
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default SignupModal;
