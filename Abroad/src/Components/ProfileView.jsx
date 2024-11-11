import React, { useEffect, useState } from 'react';
import { IoPerson } from "react-icons/io5";
import { FaLocationDot } from 'react-icons/fa6';

function ProfileView({profileData, onEdit}) {

  return (
    <div className='relative flex items-center justify-center h-screen bg-cover bg-center' style={{backgroundImage: "url(/src/assets/Images/home.jpg)"}}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className='container z-10 max-w-md w-full bg-white p-8 rounded-md shadow-lg'>
        <h1 className='text-3xl font-bold text-center border-b-4 border-blue-600 mb-4'> YOUR PROFILE</h1>
        <div>
            {profileData.profile_picture ? (
                <img src={profileData.profile_picture}
                alt='Profile Picture' className='w-24 h-24 rounded-full mx-auto object-cover border border-gray-300 mb-4'></img>
            ): (
             <IoPerson className='bg-gray-400 text-6xl mx-auto border rounded-full border-gray-400 mb-4'/>
             )}
        </div>
        <p className='text-base sm:text-lg font-semibold flex items-center'>
        <span className=' mr-2 font-bold'>Phone Number:</span>  {profileData.phone_number}</p>
        <p className="text-base sm:text-lg font-semibold flex items-center"> 
            <FaLocationDot  className="mr-1" /> {profileData.location}
        </p>
        <p className='text-base sm:text-lg font-semibold flex items-center'>
          <span className='mr-2 font-bold'>Username:</span> {profileData.username}</p>
        <p className='text-base sm:text-lg font-semibold flex items-center'>
        <span className='mr-2 font-bold'>Email:</span> {profileData.email} </p>
        <p className='text-base sm:text-lg font-semibold flex items-center'>
        <span className='mr-2 font-bold'>Bio:</span>{profileData.bio} </p>
        <p className='text-base sm:text-lg font-semibold flex items-center'>
        <span className='mr-2 font-bold'>Education:</span> {profileData.education} </p>

        <button onClick={onEdit} className='w-full bg-blue-300 text-xl text-white font-bold p-3 rounded-md hover:bg-blue-600 focus:outline-none mt-4'>Edit</button>
      </div>
    </div>
  )
}

export default ProfileView
