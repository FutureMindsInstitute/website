'use client';

import { useContext } from 'react';
import ModalContext from '../context/user/ModalContext';

export const useUserModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useUserModal must be used within ModalProvider');
  }
  return context;
};

