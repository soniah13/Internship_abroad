import React, { useState } from 'react';
import EmployerProfile from './EmployerProfile';
import JobPost from './JobPost';
import Country from './Country';

function PostJobs() {
  const [selectedForm, setSelectedForm] = useState(null);
  const [formCompletion, setFormCompletion] = useState({
    Profile: false,
    Location: false,
  });

  const handleSelectedForm = (formType) => {
    setSelectedForm(formType);
  };

  const handleFormCompletion = (formType) => {
    setFormCompletion((prevCompletion) => ({
      ...prevCompletion,
      [formType]: true,
    }));
  };

  const renderSelectedForm = () => {
    switch (selectedForm) {
      case 'Profile':
        return <EmployerProfile onComplete={() => handleFormCompletion('Profile')} />;
      case 'Job':
        return <JobPost />;
      case 'Location':
        return <Country onComplete={() => handleFormCompletion('Location')} />;
      default:
        return <p className="font-semibold text-2xl text-center">Please select a form to fill!</p>;
    }
  };

  return (
    <>
      <div className="bg-blue-600 h-48 lg:h-96 w-full p-4 text-white font-bold text-center border-b-4 border-white flex items-center justify-center">
        <h1 className="text-lg lg:text-2xl">Submit Your Form</h1>
      </div>

      {/* Main Section */}
      <div className="flex flex-col lg:flex-row gap-6 p-4 bg-blue-100">
        {/* Form Selection */}
        <div className="w-full lg:w-1/4 bg-gray-100 shadow-lg rounded-lg p-4 sm:p-6 lg:p-8 space-y-4">
          <button
            onClick={() => handleSelectedForm('Profile')}
            className={`w-full ${formCompletion.Profile ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'} h-24 text-2xl font-semibold py-2 rounded-lg shadow-md transition duration-300`}
          >
            Company Profile
          </button>
          <button
            onClick={() => handleSelectedForm('Location')}
            className={`w-full ${formCompletion.Location ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'} h-24 text-2xl font-semibold py-2 rounded-lg shadow-md transition duration-300`}
          >
            Located At
          </button>
          <button
            onClick={() => handleSelectedForm('Job')}
            className="w-full bg-white text-blue-600 h-24 text-2xl  font-semibold shadow-md transition duration-300 rounded-lg"
          >
            Job Details
          </button>
        </div>

        <div className="w-full lg:w-3/4 bg-gray-100 p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg">
          {renderSelectedForm()}
        </div>
      </div>
    </>
  );
}

export default PostJobs;
