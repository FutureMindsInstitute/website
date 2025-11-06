'use client';

import UsersList from '../../../../components/UsersList';

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-600">Manage users, search, filter, and export</p>
        </div>
      </div>

      <UsersList />
    </div>
  );
}


