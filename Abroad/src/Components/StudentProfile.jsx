import React, { useEffect, useState } from 'react';
import ProfileForm from './ProfileForm';
import ProfileView from './ProfileView';

function StudentProfile() {
  const [isEditing, setIsEditing] = useState(null);
  const [profileData, setProfileData] = useState({});

  useEffect (() => {
    const fetchProfile = async () => {
      const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem('access')}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/profile/student/', requestOptions);
      if(!response.ok) {
        const result = await response.json();
        setProfileData(result);
      } else {
        console.error('Failed to fetch profile data', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching profile data', error);
    }
    }; 
    fetchProfile();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };
  
  const handleSubmit = (newProfileData) => {
    setProfileData(newProfileData);
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <ProfileForm onSubmit={handleSubmit} />
      ) : (
        <ProfileView profileData={profileData} onEdit={handleEdit} />
        
      )}
    </div>
  );
}

export default StudentProfile
