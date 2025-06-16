// src/pages/Profile.jsx
import React from 'react';

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    return (
      <div className="text-center py-10 text-lg text-red-500">
        Please log in to view your profile.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
        👤 Your Profile
      </h1>

      <div className="max-w-md mx-auto bg-white shadow-md rounded p-6 space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold">Username:</label>
          <p className="text-gray-900">{user.username || 'N/A'}</p>
        </div>

        <div>
          <label className="block text-gray-700 font-semibold">Email:</label>
          <p className="text-gray-900">{user.email}</p>
        </div>

      </div>
    </div>
  );
};

export default Profile;
