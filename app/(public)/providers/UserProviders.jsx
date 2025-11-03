'use client';

import { UserAuthProvider } from '../../../context/user/AuthContext';
import { ModalProvider } from '../../../context/user/ModalContext';

export default function UserProviders({ children }) {
  return (
    <UserAuthProvider>
      <ModalProvider>
        {children}
      </ModalProvider>
    </UserAuthProvider>
  );
}


