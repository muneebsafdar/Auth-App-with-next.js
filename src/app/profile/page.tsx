'use client'

import axios from 'axios';
import { useRouter } from 'next/navigation'; // Correct hook for App Router
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';


function Profile() {
  const router = useRouter();
  const [userData ,setUserData]:any=useState('')


  const getUserDetails= async ()=>{
    try {


      const userdata= await axios.get('/api/users/me')
      console.log(userdata)
      setUserData(userdata.data.data)
      router.push(`/profile/${userdata.data.data.username}`)
    } catch (error:any) {
      console.log(error.message);
      
    }
  }

  useEffect(()=>{
    getUserDetails()
  },[])

  const handleLogout = async () => {
    try {
      await axios.get('/api/users/logout'); // This should clear the token cookie on server
      toast.success('Successfully logged out.');
      router.push('/login'); // Redirect to login page
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

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
          <h2 className="text-2xl font-bold text-green-400">{userData && userData.username}</h2>

          {/* Email */}
          <p className="mt-2 text-green-200">{userData && userData.email}</p>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 text-center space-y-4">
          <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md">
            Edit Profile
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md block w-full"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
