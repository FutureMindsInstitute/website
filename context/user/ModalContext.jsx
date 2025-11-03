'use client';

import React, { createContext, useState } from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const openLogin = () => { setShowLogin(true); setShowSignup(false); };
  const openSignup = () => { setShowSignup(true); setShowLogin(false); };
  const closeModals = () => { setShowLogin(false); setShowSignup(false); };
  const switchToSignup = () => { setShowLogin(false); setShowSignup(true); };
  const switchToLogin = () => { setShowSignup(false); setShowLogin(true); };

  return (
    <ModalContext.Provider value={{
      showLogin,
      showSignup,
      openLogin,
      openSignup,
      closeModals,
      switchToSignup,
      switchToLogin,
    }}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContext;
export { ModalProvider };


