'use client';

import React, { useState } from "react";
import { useUserModal } from '../../../../hooks/useUserModal';
import { useUserAuth } from '../../../../hooks/useUserAuth';
// import GoogleLoginButton from "../GoogleLoginButton";
// import { GoogleOAuthProvider } from "@react-oauth/google";

const SignupModal = () => {
  const { showSignup, closeModals, switchToLogin } = useUserModal();
  const { sendSignupOtp, signup } = useUserAuth();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    otp: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const onChange = (k) => (e) => setForm((s) => ({ ...s, [k]: e.target.value }));

  const sendOtp = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await sendSignupOtp({
        name: form.name,
        email: (form.email).toLowerCase(),
        phone: form.phone,
        password: form.password,
      });
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.msg || err.message || "Failed to send OTP");
    } finally {
      setSubmitting(false);
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await signup({
        name: form.name,
        email:(form.email).toLowerCase(),
        phone: form.phone,
        password: form.password,
        otp: form.otp,
      });
      closeModals();
    } catch (err) {
      setError(err.response?.data?.msg || err.message || "OTP verification failed");
    } finally {
      setSubmitting(false);
    }
  };

  const closeAndReset = () => {
    setStep(1);
    setForm({ name: "", email: "", phone: "", password: "", otp: "" });
    setError("");
    setSubmitting(false);
    closeModals();
  };

  // const GoogleAuthWrapper = () => {
  //   return (
  //   <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
  //     <GoogleLoginButton />
  //   </GoogleOAuthProvider>
  //   )
  // }

  if (!showSignup) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm" onClick={closeAndReset} />
      <div className="relative w-full max-w-sm md:max-w-md bg-slate-900 text-slate-100 border border-slate-700 rounded-xl shadow-2xl p-6 md:p-7">
        <button
          type="button"
          aria-label="Close"
          onClick={closeAndReset}
          className="absolute top-3 right-3 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-md p-1 cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 11-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold text-emerald-400 mb-4">
          {step === 1 ? "Create account" : "Verify OTP"}
        </h2>
        {error ? <div className="text-red-400 text-sm mb-3">{error}</div> : null}

        {step === 1 ? (
          <form onSubmit={sendOtp} className="space-y-3">
            <div>
              <input
                type="text"
                required
                value={form.name}
                onChange={onChange("name")}
                className="w-75 text-center bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                placeholder="Full Name"
              />
            </div>
            <div>
              <input
                type="email"
                required
                value={(form.email).toLowerCase()}
                onChange={onChange("email")}
                className="w-75 text-center bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                placeholder="Email"
              />
            </div>
            <div>
              <input
                type="number"
                max={9999999999}
                min={1000000000}
                required
                value={form.phone}
                onChange={onChange("phone")}
                className="w-75 text-center bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                placeholder="Phone"
              />
            </div>
            <div>
              <input
                type="password"
                required
                value={form.password}
                onChange={onChange("password")}
                className="w-75 text-center bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                placeholder="Password"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-50 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg py-2.5 font-medium transition-colors disabled:opacity-60 cursor-pointer"
            >
              {submitting ? "Sending OTP..." : "Send OTP"}
            </button>
            <div className="text-center">
              <button 
                type="button"
                onClick={switchToLogin}
                className="text-sm text-slate-300 hover:text-white underline-offset-4 hover:underline cursor-pointer"
              >
                Already have an account? Log in
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={verifyOtp} className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-200">OTP</label>
              <input
                type="number"
                required
                value={form.otp}
                onChange={onChange("otp")}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                placeholder="6-digit code"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg py-2.5 font-medium transition-colors disabled:opacity-60 cursor-pointer"
            >
              {submitting ? "Verifying..." : "Verify & Create Account"}
            </button>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-full border border-slate-700 rounded-lg py-2 text-slate-300 hover:text-white cursor-pointer"
            >
              Back
            </button>
          </form>
        )}
        {/* <div className="mt-3 text-center">
          <GoogleAuthWrapper />
        </div> */}
      </div>
    </div>
  );
};

export default SignupModal;
