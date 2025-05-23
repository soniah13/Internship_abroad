import React, { useEffect, useState } from 'react';
import { IoPerson } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { FiAlertCircle } from "react-icons/fi";
import AlertMessage from './AlertMessage';  // Import AlertMessage component

function ProfileForm({ profileData = {}, onSubmit }) {
  const [formData, setFormData] = useState({
    username: profileData.username || '',
    email: profileData.email || '',
    phone_number: profileData.phone_number || '',
    bio: profileData.bio || '',
    location: profileData.location || '',
    education: profileData.education || '',
    profile_picture: profileData.profile_picture || '',
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setFormData(profileData);
  }, [profileData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      profile_picture: e.target.files[0] ? e.target.files[0] : formData.profile_picture,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.phone_number || !formData.bio || !formData.location || !formData.education) {
      setErrors({ general: 'All fields are required!' });
    }

    try {
      const editableFields = {
        phone_number: formData.phone_number,
        bio: formData.bio,
        location: formData.location,
        education: formData.education,
        profile_picture: formData.profile_picture,
      };
      await onSubmit(editableFields);
      setSuccessMessage("Profile updated successfully!"); // Success message
      setTimeout(() => navigate('/student-profile'), 2000);  // Navigate after 2 seconds
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrors(error.response.data);
        setErrorMessage("An error occurred while updating your profile. Please try again.");
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className='relative flex items-center justify-center h-screen bg-cover bg-center' style={{ backgroundImage: "url(/assets/Images/home.jpg)" }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <form onSubmit={handleSubmit} className='z-10 max-w-md w-full bg-white p-8 rounded-lg shadow-lg'>
        <h2 className='text-2xl font-bold mb-6 text-center'> Edit Your Profile</h2>
        
        <div className='mb-4 text-center'>
          {formData.profile_picture ? (
            <img src={typeof formData.profile_picture === 'string' ? formData.profile_picture : URL.createObjectURL(formData.profile_picture)}
              alt='Profile Preview' className='w-24 h-24 rounded-full mx-auto object-cover border border-gray-300' />
          ) : (
            <IoPerson className='bg-gray-400 text-6xl mx-auto border rounded-full border-black-2' />
          )}
          <input type='file' name='profile_picture' onChange={handleFileChange} className='mt-3' />
        </div>

        <div className='relative mb-4'>
          <input type='text' name='username' placeholder='Username' value={formData.username || ''} disabled
            onChange={handleChange} className='w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
          />
          <FiAlertCircle
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-400"
            title="Username cannot be edited"
          />
          {errors.username && <div className="text-red-600 mb-2">{errors.username}</div>}
        </div>

        <div className='relative mb-4'>
          <input type='text' name='email' placeholder='Email' value={formData.email || ''} disabled
            onChange={handleChange} className='w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500'/>
          <FiAlertCircle
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-400"
            title="Email cannot be edited"
          /> 
          {errors.email && <div className="text-red-600 mb-2">{errors.email}</div>}
        </div>

        <input type='text' name='phone_number' placeholder='Phone Number' value={formData.phone_number || ''}
          onChange={handleChange} className='w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500'/>
        {errors.phone_number && <div className="text-red-600 mb-2">{errors.phone_number}</div>}

        <input type='text' name='bio' placeholder='Something cool about you' value={formData.bio || ''}
          onChange={handleChange} className='w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500'/>
        {errors.bio && <div className="text-red-600 mb-2">{errors.bio}</div>}

        <input type='text' name='location' placeholder='Enter your city or country' value={formData.location || ''}
          onChange={handleChange} className='w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500'/>
        {errors.location && <div className="text-red-600 mb-2">{errors.location}</div>}

        <input type='text' name='education' placeholder='Enter your university or college ' value={formData.education || ''}
          onChange={handleChange} className='w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500'/>
        {errors.education && <div className="text-red-600 mb-2">{errors.education}</div>}

        <button type='submit' className='w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-300 focus:outline-none'> Edit Profile </button>

        {errors.general && (
          <div className='text-red-600 text-center mt-4'>
            {errors.general}
          </div>
        )}

        {/* Display Success or Error Alert */}
        {successMessage && <AlertMessage message={successMessage} type="success" onClose={() => setSuccessMessage('')} />}
        {errorMessage && <AlertMessage message={errorMessage} type="error" onClose={() => setErrorMessage('')} />}
      </form>
    </div>
  );
}

export default ProfileForm;
