export const metadata = {
  title: 'Future Minds Institute',
  description: 'Landing site',
};

import UserProviders from './providers/UserProviders';

export default function PublicLayout({ children }) {
  return (
    <UserProviders>
      {children}
    </UserProviders>
  );
}


