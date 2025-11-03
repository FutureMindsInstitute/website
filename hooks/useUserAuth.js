'use client';

import { useContext } from 'react';
import UserAuthContext from '../context/user/AuthContext';

export const useUserAuth = () => {
  const context = useContext(UserAuthContext);
  if (!context) {
    throw new Error('useUserAuth must be used within UserAuthProvider');
  }
  return context;
};

