import React, { useState } from 'react'
import { IoPerson } from "react-icons/io5";
import { ACCESS_TOKEN } from '../constants';

function StudentProfile() {
  const [profileData, setProfileData] = useState({
    phone_number : '',
    bio: '',
    location: '',
    education: '',
    profile_picture: null,
  });
  const [errors, setErrors] = useState({});
  const [prevImage, setPrevImage] = useState(null);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleFileChange = (e) => {
    const {name} = e.target;
    const file = e.target.files[0];
    setProfileData ({...profileData, [name]:file});
    setPrevImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {phone_number, bio, location, education,profile_picture} = profileData;
  
    try {
      const formData = new FormData();
      formData.append('phone_number', phone_number);
      formData.append('bio', bio);
      formData.append('location', location);
      formData.append('education', education);
      if(profile_picture) formData.append('profile_picture', profile_picture);

      const response = await fetch('http://127.0.0.1:8000/api/v1/profile/student/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
        }, body: formData,
      });

      if (!response.ok){
        const data = await response.json();
        setErrors(data.detail || JSON.stringify(data));
        return;
      }
      console.log('Profile updated successfully');
      setProfileData({
        phone_number: '',
        bio: '',
        location: '',
        education: '',
        profile_picture: null,
      }); 
      setPrevImage(null);
      setErrors({});

    } catch (error) {
      console.log('Error occured while submitting', error);
      setErrors({ general: 'An error occured while submitting the form'});
    }
  };

  return (
    <div className='relative flex items-center justify-center h-screen bg-cover bg-center' style={{backgroundImage: "url(/src/assets/Images/home.jpg)"}}>
      <div className="absolute inset-0 bg-black opacity-50"></div> 
      <form onSubmit={handleSubmit} className='z-10 max-w-md w-full bg-white p-8 rounded-lg shadow-lg'>
        <h2 className='text-2xl font-bold mb-6 text-center'> Edit Your Profile</h2>
        
        <div className='mb-4 text-center'>
          {prevImage ? (
            <img src={prevImage} alt='profile Preview' className='w-24 h-24 rounded-full mx-auto object-cover border border-gray-300'></img>
          ) : (
            <IoPerson className='bg-gray-400 text-6xl mx-auto border rounded-full border-black-2'/>
          )}
          <input type='file' name='profile_picture' onChange={handleFileChange} className='mt-3'></input>
        </div>
        <input type='text' name='phone_number' placeholder='Phone Number' value={profileData.phone_number}
        onChange={handleChange} className='w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500'></input>
        <input type='text' name='bio' placeholder='Something cool about you' value={profileData.bio}
        onChange={handleChange} className='w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500'></input>
        <input type='text' name='location' placeholder='Enter your city or country' value={profileData.location}
        onChange={handleChange} className='w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500'></input>
        <input type='text' name='education' placeholder='Enter your university or collage ' value={profileData.education}
        onChange={handleChange} className='w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500'></input>

        <button type='submit' className='w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-300 focus:outline-none'> Add Profile </button>

        {errors && (
          <div className='text-red-600 text-center mt-4'>
            {typeof errors === 'string' ? errors: errors.general}
          </div>
        )}
      </form>
    </div>
  )
}

export default StudentProfile
