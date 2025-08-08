'use client'

import React from "react";

function ProfilePage({params}:any) {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="bg-gray-800 shadow-lg rounded-xl p-8 w-full max-w-md text-green-100">
        <div className="flex flex-col items-center text-center">
          {/* Profile Picture */}
          <div className="mb-4">
            <img
              src="https://i.pravatar.cc/100?img=3"
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-green-400"
            />
          </div>

          {/* Username */}
          <h2 className="text-2xl font-bold text-green-400">Muneeb Safdar</h2>

          {/* Email */}
          <p className="mt-2 text-green-200">{params.id}</p>
        </div>

        {/* Action Button */}
        <div className="mt-6 text-center">
          <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
