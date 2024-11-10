import React from 'react';
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
                <img src={`https://res.cloudinary.com/ddqkfdqy8/${profileData.profile_picture}`}
                alt='Profile Picture' className='w-24 h-24 rounded-full mx-auto object-cover border border-gray-300'></img>
            ): (
             <IoPerson className='bg-gray-400 text-6xl mx-auto border rounded-full border-gray-400'/>
             )}
        </div>
        <p className='text-base sm:text-lg font-semibold flex items-center'> Phone Number: {profileData.phone_number}</p>
        <p className="text-base sm:text-lg font-semibold flex items-center">
            <FaLocationDot className="mr-1" /> {profileData.location}
        </p>
        <p className='text-base sm:text-lg font-semibold flex items-center'>Username:<br/> {profileData.username} </p>
        <p className='text-base sm:text-lg font-semibold flex items-center'>Email:<br/> {profileData.email} </p>
        <p className='text-base sm:text-lg font-semibold flex items-center'>Bio:<br/> {profileData.bio} </p>
        <p className='text-base sm:text-lg font-semibold flex items-center'>Education: {profileData.education} </p>

        <button onClick={onEdit} className='w-full bg-blue-600 text-xl text-white font-bold p-3 rounded-md hover:bg-blue-300 focus:outline-none'>Edit</button>
      </div>
    </div>
  )
}

export default ProfileView
