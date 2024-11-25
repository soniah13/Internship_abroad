import React, { useEffect, useState } from 'react';
import { IoPerson } from "react-icons/io5";
import { FaLocationDot } from 'react-icons/fa6';
import { FaUserEdit } from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { AiFillPhone } from "react-icons/ai";
import { FaUserGraduate } from "react-icons/fa";



function ProfileView({profileData = {}, onEdit}) {

  return (
    <div className='relative flex items-center justify-center h-screen bg-cover bg-center' style={{backgroundImage: "url(/src/assets/Images/home.jpg)"}}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className='container z-10 max-w-md w-full bg-white p-8 rounded-md shadow-lg'>
        <div className='relative'>
        <h1 className='text-center text-4xl font-bold mb-10 text-blue-600 opacity-80'>
            My Profile
          </h1>
          <div className='h-40 bg-blue-900 flex items-center justify-center relative'>
          {profileData.profile_picture ? (
          <img src={profileData.profile_picture} alt='Profile Picture' 
          className='w-32 h-32 rounded-full object-cover border-r border-blue-900 '/>
          ) : (
            <IoPerson className='bg-fray-600 text-6xl w-32 h-32 rounded-full border-4 border-blue-900'/>
          )}
          </div>
        </div>

        <div className='flex justify-center mt-4'>
          <button onClick={onEdit} className='bg-transparent text-blue-600 border-2 border-white rounded-md px-6 py-2 hover:bg-blue-900 hover:text-white flex items-center space-x-2'>
            <FaUserEdit size={20}/> <span>Edit</span>
          </button>
        </div>
        <div className='mt-8 space-y-4'>
          <div className='flex items-center space-x-2'> 
          <FaUserGraduate className='text-blue-600' />
          <p className='text-lg'>
            <span className='font-semibold'>Username: </span> {profileData.username || ''}
          </p>
          </div>

          <div className='flex items-center space-x-2'> 
          <MdOutlineAlternateEmail className='text-blue-600' />
          <p className='text-lg'>
            <span className='font-semibold'>Email: </span> {profileData.email || ''}
          </p>
          </div>

          <div className='flex items-center space-x-2'> 
          <AiFillPhone className='text-blue-600' />
          <p className='text-lg'>
            <span className='font-semibold'>Contact: </span> {profileData.phone_number || ''}
          </p>
          </div>

          <div className='flex items-center space-x-2'> 
          <FaLocationDot className='text-blue-600' />
          <p className='text-lg'>
            <span className='font-semibold'>Location: </span> {profileData.location || ''}
          </p>
          </div>

          <div>
            <p> 
          <strong> Something intresting About {profileData.username || 'User'}:</strong> </p>
          <p className='text-gray-900'> She is ,
            { profileData.bio || 'There is nothing to read here.'}
          </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileView
