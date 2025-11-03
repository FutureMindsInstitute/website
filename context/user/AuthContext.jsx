'use client';

import React, { createContext, useState, useEffect, useCallback } from 'react';
import publicApi from '../../lib/publicApi';

const UserAuthContext = createContext();

const isTokenValid = (token) => {
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const now = Date.now() / 1000;
    return !(payload.exp && payload.exp < now);
  } catch {
    return false;
  }
};

export const UserAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
    setAuthChecked(true);
    window.location.href = '/';
  }, []);

  const checkAuthStatus = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token || !isTokenValid(token)) {
        localStorage.removeItem('token');
        setLoading(false);
        setAuthChecked(true);
        return;
      }
      const resp = await publicApi.get('api/auth/user/profile');
      if (resp?.data?.success && resp.data.user) {
        setUser(resp.data.user);
        setIsAuthenticated(true);
        setAuthChecked(true);
      } else {
        logout();
      }
    } catch (e) {
      if (e?.response?.status === 401) logout();
      setLoading(false);
      setAuthChecked(true);
    } finally {
      setLoading(false);
    }
  }, [logout]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !authChecked && isTokenValid(token)) setIsAuthenticated(true);
    checkAuthStatus();
  }, [checkAuthStatus, authChecked]);

  const login = async (credentials) => {
    const res = await publicApi.post('api/auth/login', credentials);
    const { token } = res.data || {};
    if (!token) throw new Error('Authentication error');
    localStorage.setItem('token', token);
    const profile = await publicApi.get('api/auth/user/profile');
    if (!profile?.data?.success) throw new Error('Profile fetch failed');
    setUser(profile.data.user);
    setIsAuthenticated(true);
    setAuthChecked(true);
    return { success: true, user: profile.data.user };
  };

  const sendSignupOtp = async (data) => {
    const res = await publicApi.post('api/auth/signup/send-otp', data);
    if (res?.data?.success) return { success: true, message: res.data.message };
    throw new Error(res?.data?.message || 'Failed to send OTP');
  };

  const signup = async (data) => {
    const res = await publicApi.post('api/auth/signup/verify-otp', data);
    const token = res?.data?.token || (res?.data?.success && res?.data?.token);
    if (!token) throw new Error(res?.data?.message || 'Signup failed');
    localStorage.setItem('token', token);
    try {
      const profile = await publicApi.get('api/auth/user/profile');
      if (profile?.data?.success && profile.data.user) {
        setUser(profile.data.user);
        setIsAuthenticated(true);
        setAuthChecked(true);
      }
    } catch {}
    return { success: true, message: res?.data?.message || 'Registration successful', token };
  };

  const refreshUserData = async () => {
    const res = await publicApi.get('api/auth/user/profile');
    if (res?.data?.success) setUser(res.data.user);
  };

  const googleLoginAndSignup = async (code) => {
    const res = await publicApi.get(`api/auth/google/login?code=${code}`);
    const { token } = res.data || {};
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
    setUser(res.data.user);
    setAuthChecked(true);
    return { success: true, user: res.data.user };
  };

  const sendResetPasswordLink = async (payload) => {
    const res = await publicApi.post('api/auth/send-reset-password-link', payload);
    if (res?.data?.success) return { success: true, message: res.data.message };
    throw new Error(res?.data?.message || 'Failed to send reset link');
  };

  const changePassword = async (payload) => { 
    const res = await publicApi.post('api/auth/reset-password', payload);
    if (res?.data?.success) return { success: true, message: res.data.message };
    throw new Error(res?.data?.message || 'Failed to change password');
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    authChecked,
    login,
    signup,
    sendSignupOtp,
    logout,
    checkAuthStatus,
    refreshUserData,
    googleLoginAndSignup,
    sendResetPasswordLink,
    changePassword,
  };

  return <UserAuthContext.Provider value={value}>{children}</UserAuthContext.Provider>;
};

export default UserAuthContext;
export { UserAuthProvider };


