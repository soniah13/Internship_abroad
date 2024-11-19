import React, { useState } from 'react';
import JobPost from './JobPost';
import Country from './Country';

function PostJobs() {
  const [selectedForm, setSelectedForm] = useState(null);
  const [formCompletion, setFormCompletion] = useState({
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
      case 'Job':
        return <JobPost />;
      case 'Location':
        return <Country onComplete={() => handleFormCompletion('Location')} />;
      default:
        return <JobPost />;
    }
  };

  return (
    <>
      <div className="bg-blue-900 h-48 lg:h-96 w-full p-4 text-white font-bold text-center flex items-center justify-center">
        <h1 className="text-lg lg:text-5xl ">POST YOUR <span className='text-blue-200'>INTERNSHIP ABROAD</span></h1>
      </div>

      {/* Main Section */}
      <div className="flex flex-col lg:flex-row gap-6  p-8 bg-blue-100">
        {/* Form Selection */}
        <div className="w-full lg:w-2/5 bg-gray-100 shadow-lg rounded-lg p-8 sm:p-6 lg:p-8 space-y-4">
        
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

        <div className="w-full lg:w-3/5 bg-gray-100 p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg">
          {renderSelectedForm()}
        </div>
      </div>
    </>
  );
}

export default PostJobs;
