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
      <h2 className='text-2xl font-bold text-center text-blue-600 mb-4'>
        Resume documentation
      </h2>

      <p className='text-gray-600 leading-7 text-center mb-6'>
      Your resume plays a key role in getting an internship. It tells employers
        a lot about you, so it's important to make it stand out and increase your
        chances of being chosen.
      </p>

      <div className='text-center mb-8'>
         <a href='https://resume.io/app/create-resume/templates'
      target='_blank' rel='nonopener nonreferrer' 
      className='inline-block w-full bg-blue-500 text-white py-3 px-4 rounded-lg text-lg font-medium hover:bg-blue-600 transition duration-300 shadow-lg'> 
      Build Resume </a>
      </div>

      <h3 className='text-xl font-medium text-blue-600 mb-4 text-center'> Upload Your Resume </h3>
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
          Add Resume
        </button>
      </div>
    </div>
  );
}

export default Resume
