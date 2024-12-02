import React, { useState } from 'react'

function AdmissionLetter({ onComplete }) {
  const [admissionletterFile, setAdmissionletterFile] = useState(null);

  const handleChange = (e) => {
    setAdmissionletterFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!admissionletterFile) {
      alert("Please select a file to upload.");
      return;
    }

    if(!['application/pdf', 'application/doc', 'application/word', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(admissionletterFile.type)) {
      alert("Pleasse upload a valid document(PDF, WORD).");
      return;
    }

    const formData = new FormData();
    formData.append('admission_letter', admissionletterFile);

    try{
      const response = await fetch('https://internship-abroad-backend.onrender.com/api/v1/students/documents/',{
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`
        }, body: formData,
      });
      

      if(response.ok) {
        const data = await response.json();
        onComplete(admissionletterFile); //notify studentdocument of successful upload
        
      } else {
        console.log('Upload fails:', await response.json());
        alert('Failed to upload admission letter');
      }
    } catch(error) {
      console.error('Uploading error', error);
    }
  };


  return (
    <div className='max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg '>
      <h2 className='text-2xl font-bold text-center text-blue-600 mb-4'>
        Admission Letter documentation
      </h2>

      <p className='text-gray-600 leading-7 text-center mb-6'>
      Your Admission plays a key role in getting an internship. 
      </p>

      <div className='text-center mb-8'>
         <a href='https://students.kuccps.net/login/'
      target='_blank' rel='nonopener nonreferrer' 
      className='inline-block w-full bg-blue-500 text-white py-3 px-4 rounded-lg text-lg font-medium hover:bg-blue-600 transition duration-300 shadow-lg'> 
      Get your Admission letter </a>
      </div>

      <h3 className='text-xl font-medium text-blue-600 mb-4 text-center'> Upload Your Admission letter document as word or pdf </h3>
      <div className='flex flex-col items-center'>
      <form onSubmit={handleSubmit}>
          <label className="block text-lg font-semibold mb-2">Upload admission letter</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleChange}
            className="block w-full border p-2 rounded mb-4"
          />
          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded shadow hover:bg-blue-700 transition">
            Upload
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdmissionLetter
