import React, { useEffect, useState } from 'react';
import ProfileForm from './ProfileForm';
import ProfileView from './ProfileView';
import AlertMessage from './AlertMessage';  // Import AlertMessage component

function StudentProfile() {
  const [profileData, setProfileData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch('https://internship-abroad-backend.onrender.com/api/v1/profile/student/', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setProfileData(data);
      } else {
        setErrorMessage('Error fetching profile data');
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
      const response = await fetch('https://internship-abroad-backend.onrender.com/api/v1/profile/student/', {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access')}`
        },
        body: formData
      });

      if (!response.ok) {
        setErrorMessage('Profile update failed. Please try again.');
      } else {
        setIsEditing(false);
        setSuccessMessage('Profile updated successfully!');
        setErrorMessage('');
      }
    } catch (error) {
      setErrorMessage('An error occurred while updating your profile');
      console.log(error);
    }
  };

  return (
    <div className="profile-container">
      {/* Display Success or Error Alert at the top */}
      {successMessage && <AlertMessage message={successMessage} type="success" onClose={() => setSuccessMessage('')} />}
      {errorMessage && <AlertMessage message={errorMessage} type="error" onClose={() => setErrorMessage('')} />}
      
      {isEditing ? (
        <ProfileForm profileData={profileData} onSubmit={handleSubmit} />
      ) : (
        <ProfileView profileData={profileData} onEdit={handleEdit} />
      )}
    </div>
  );
}

export default StudentProfile;
