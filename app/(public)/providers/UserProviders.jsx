'use client';

import { Toaster } from 'react-hot-toast';
import { UserAuthProvider } from '../../../context/user/AuthContext';
import { ModalProvider } from '../../../context/user/ModalContext';

export default function UserProviders({ children }) {
  return (
    <UserAuthProvider>
      <ModalProvider>
        {children}
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#1e293b',
              color: '#fff',
              border: '1px solid #334155',
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </ModalProvider>
    </UserAuthProvider>
  );
}


