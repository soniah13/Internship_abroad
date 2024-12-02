import React, { useState } from 'react'

function Visa({ onComplete }) {
  const [visaFile, setVisaFile] = useState(null);

  const handleChange = (e) => {
    setVisaFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!visaFile) {
      alert("Please select a file to upload.");
      return;
    }

    if(!['application/pdf', 'application/doc', 'application/word', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(visaFile.type)) {
      alert("Pleasse upload a valid document(PDF, WORD).");
      return;
    }

    const formData = new FormData();
    formData.append('visa', visaFile);

    try{
      const response = await fetch('https://internship-abroad-backend.onrender.com/api/v1/students/documents/',{
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`
        }, body: formData,
      });
      

      if(response.ok) {
        const data = await response.json();
        onComplete(visaFile); //notify studentdocument of successful upload
        
        
      } else {
        console.log('Upload failes:', await response.json());
        alert('Failed to upload visa');
      }
    } catch(error) {
      console.error('Uploading error', error);
      alert('Error occured while uploading visa.');
    }
  };


  return (
    <div className='max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg '>
      <h2 className='text-2xl font-bold text-center text-blue-600 mb-4'>
        Visa application process
      </h2>

      <p className='font-medium text-xl'>Here is the process to follow:</p>
      <ul className='list-disc text-lg mb-6'>
        <li>Register on www.ecitizen.go.ke </li> 
        <li>Go to immigration.ecitizen.go.ke and or Department of immigration services  </li>
        <li>Click on visa application </li> 
        <li>Read the instructions carefully then fill the application form</li> 
        <li>Select the mode of payment and pay for the passport fees. </li>
        <li>Download and print the application form and three application receipts.</li> 
        <li>Submit the application form in person to the Immigration offices.</li>
        <li>Go with birth certificate, application form, original national ID, current passport photos</li>
      </ul>

      <div className='text-center mb-8'>
         <a href='https://immigration.ecitizen.go.ke/index.php?id=5'
      target='_blank' rel='nonopener nonreferrer' 
      className='inline-block w-full bg-blue-500 text-white py-3 px-4 rounded-lg text-lg font-medium hover:bg-blue-600 transition duration-300 shadow-lg'> 
      Apply for Visa </a>
      </div>

      <p className='text-xl font-medium text-blue-600 mb-4 text-center'> Upload Your visa Document as a pdf or word format  </p>
      <div className='flex flex-col items-center'>
      <form onSubmit={handleSubmit}>
          <label className="block text-lg font-semibold mb-2">Upload Visa</label>
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

export default Visa
