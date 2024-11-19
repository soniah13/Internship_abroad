import React, { useEffect, useState } from 'react';
import ProfileForm from './ProfileForm';
import ProfileView from './ProfileView';

function StudentProfile() {
  const [profileData, setProfileData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors]= useState({});

  useEffect(() => {
  
    const fetchProfile = async () => {
      const response = await fetch('http://127.0.0.1:8000/api/v1/profile/student/', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setProfileData(data);
      } else {
        console.log('Error fetching profile data');
      }
    };

    fetchProfile();
  }, []);

  const handleEdit = () => setIsEditing(true);

  const handleSubmit = async (updatedData) => {
    const { username, email, ...editableData } = updatedData;
    const formData = new FormData();

    Object.entries(editableData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/profile/student/', {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access')}`
        },
        body: formData,
      });
  
      if (response.ok) {
        const data = await response.json();
        setProfileData(data)
        setIsEditing(false);
        setErrors({});

      } else {
        const errorData = await response.json();
        setErrors(errorData);
      }
    } catch (error) {
      console.error("Network error:", error);
      setErrors({ general: "An error occurred. Please try again." });
    }
  };

  return (
    <div>
      {isEditing ? (
        <ProfileForm profileData={profileData} onSubmit={handleSubmit} />
      ) : (
        <ProfileView profileData={profileData} onEdit={handleEdit} errors={errors}/>
        
      )}
    </div>
  );
}

export default StudentProfile
