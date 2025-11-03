'use client';

import React, { useState } from "react";
import { useUserModal } from '../../../../hooks/useUserModal';
import { useUserAuth } from '../../../../hooks/useUserAuth';
// import GoogleLoginButton from "../GoogleLoginButton";
// import { GoogleOAuthProvider } from "@react-oauth/google";

const LoginModal = () => {
  const { showLogin, closeModals, switchToSignup } = useUserModal();
  const { login, sendResetPasswordLink } = useUserAuth();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [email, setEmail] = useState("");
  const [showResetForm, setShowResetForm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await login({ phone, password });
      closeModals();
    } catch (err) {
      setError(err.response?.data?.msg || err.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  // const GoogleAuthWrapper = () => {
  //   return (
  //   <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
  //     <GoogleLoginButton />
  //   </GoogleOAuthProvider>
  //   )
  // }

  const handleSendResetPasswordLink = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      setError("");
      await sendResetPasswordLink({ email:(email).toLowerCase() });
      setSuccess("Reset password link sent successfully. Check your email.");
      setTimeout(() => {
        setSuccess("");
      }, 3000);
      setEmail("");
    } catch (err) {
      setError(err.response?.data?.msg || err.message || "Failed to send reset password link");
    } finally {
      setSubmitting(false);
    }
  }

  const handleForgotPasswordClick = () => {
    setShowResetForm(true);
    setError("");
  }

  const handleBackToLogin = () => {
    setShowResetForm(false);
    setEmail("");
    setError("");
    setSuccess("");
  }

  if (!showLogin) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm" onClick={() => showResetForm===true ? handleBackToLogin() : closeModals()} />
      <div className="relative text-center w-full max-w-sm md:max-w-md bg-slate-900 text-slate-100 border border-slate-700 rounded-xl shadow-2xl p-6 md:p-7">
        {error ? <div className="text-red-400 text-sm mb-3">{error}</div> : null}
        {success ? <div className="text-green-400 text-sm mb-3">{success}</div> : null}
        
        {!showResetForm ? (
          <>
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold text-emerald-400 mb-4">Login</h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-75 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 placeholder-slate-400 text-center focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  placeholder="Phone"
                />
              </div>
              <div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-75 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 placeholder-slate-400 text-center focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  placeholder="Password"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-50 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg py-2.5 font-medium transition-colors disabled:opacity-60 cursor-pointer"
              >
                {submitting ? "Signing in..." : "Sign in"}
              </button>
            </form>
            <div className="mt-3 text-center">
              <button 
                onClick={handleForgotPasswordClick}
                className="text-sm text-slate-300 hover:text-white underline-offset-4 hover:underline cursor-pointer"
              >
                Forgot password?
              </button>
            </div>
            <div className="mt-3 text-center">
              <button 
                onClick={switchToSignup}
                className="text-sm text-slate-300 hover:text-white underline-offset-4 hover:underline cursor-pointer"
              >
                Don't have an account? Sign up
              </button>
            </div>
            {/* <div className="mt-3 text-center">
              <GoogleAuthWrapper />
            </div> */}
          </>
        ) : (
          <>
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold text-emerald-400 mb-4">Reset Password</h2>
              <p className="text-sm text-slate-400 mt-1">Enter your email to receive a reset link</p>
            </div>
            <form onSubmit={handleSendResetPasswordLink} className="space-y-3">
              <div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-75 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 placeholder-slate-400 text-center focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  placeholder="Enter your email"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-50 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg py-2.5 font-medium transition-colors disabled:opacity-60 cursor-pointer"
              >
                {submitting ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
            <div className="mt-3 text-center">
              <button 
                onClick={handleBackToLogin}
                className="text-sm text-slate-300 hover:text-white underline-offset-4 hover:underline cursor-pointer"
              >
                Back to Login
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginModal;
