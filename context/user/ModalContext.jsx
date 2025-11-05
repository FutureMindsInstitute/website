'use client';

import React, { createContext, useState } from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showBilling, setShowBilling] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const openLogin = () => { setShowLogin(true); setShowSignup(false); };
  const openSignup = () => { setShowSignup(true); setShowLogin(false); };
  const closeModals = () => { setShowLogin(false); setShowSignup(false); };
  const switchToSignup = () => { setShowLogin(false); setShowSignup(true); };
  const switchToLogin = () => { setShowSignup(false); setShowLogin(true); };
  const openBilling = (course) => { 
    setSelectedCourse(course);
    setShowBilling(true);
  };
  const closeBilling = () => { 
    setShowBilling(false);
    setSelectedCourse(null);
  };

  return (
    <ModalContext.Provider value={{
      showLogin,
      showSignup,
      showBilling,
      selectedCourse,
      openLogin,
      openSignup,
      closeModals,
      switchToSignup,
      switchToLogin,
      openBilling,
      closeBilling,
    }}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContext;
export { ModalProvider };


