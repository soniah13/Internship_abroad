import React, { useState } from 'react'

function Resume({onComplete}) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if(!selectedFile) return;

    const formData = new FormData();
    formData.append('document', selectedFile);

    try{
      const response = await fetch('http://127.0.0.1:8000/api/v1/students/documents/',{
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access')}`
        }, body: formData,
      });
      const data = await response.json();

      if(data.success) {
        onComplete(data.documentUrl);
      } else {
        alert('Failed to upload document');
      }
    } catch(error) {
      console.error('Uploading error', error);
    }
  };


  return (
    <div className='max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg '>
      <p className='font-medium text-xl'>Here is the process to follow:</p>
      <ul className='list-disc text-lg mb-6'>
        <li>Clicking the link to the institution's admission letter page </li> 
        <li>Clicking Create account </li>
        <li>Entering your personal information, including your email address</li> 
        <li>Checking the KUCCPS student checkbox</li> 
        <li>Entering your KCSE index number or national ID </li>
        <li>Selecting your identification document</li> 
        <li>Entering and confirming a password</li>
        <li>Clicking Signup </li>
      </ul>
      
      <h3 className='text-xl font-medium text-blue-600 mb-4 text-center'> Upload Your Admission letter </h3>
      <div className='flex flex-col items-center'>
        <label 
        className='cursor-pointer bg-blue-100 border border-blue-300 px-4 py-2 rounded-md shadow-sm text-black hover:bg-blue-200 duration-200 mb-4'>
          Select File 
          <input type='file' onChange={handleFileChange} className='hidden'></input>

        </label>

        {selectedFile && (
          <p className='text-sm text-gray-600'> Selected file: <span className='font-medium'> {selectedFile.name}</span> </p>
        )}

        <button onClick={handleUpload} className='bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-400 transition duration-300 shadow-lg mt-4'>
          Add Admission letter
        </button>
      </div>
    </div>
  );
}

export default Resume
