import React, { useEffect, useState } from 'react';
import ProfileForm from './ProfileForm';
import ProfileView from './ProfileView';

function StudentProfile({profileData, setProfileData}) {
  const [isEditing, setIsEditing] = useState(null);
  

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
