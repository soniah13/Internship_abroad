import React, { useState } from 'react'

function Resume({ onComplete }) {
  const [resumeFile, setResumeFile] = useState(null);

  const handleChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!resumeFile) {
      alert("Please select a file to upload.");
      return;
    }

    if(!['application/pdf', 'application/doc', 'application/word', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(resumeFile.type)) {
      alert("Pleasse upload a valid document(PDF, WORD).");
      return;
    }

    const formData = new FormData();
    formData.append('resume', resumeFile);

    try{
      const response = await fetch('http://127.0.0.1:8000/api/v1/students/documents/',{
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`
        }, body: formData,
      });
      

      if(response.ok) {
        const data = await response.json();
        onComplete(resumeFile); //notify studentdocument of successful upload
        console.log("resume data", resumeFile)
        alert('Resume uploaded successfully!');
        setResumeFile(null);
      } else {
        console.log('Upload failes:', await response.json());
        alert('Failed to upload resume');
      }
    } catch(error) {
      console.error('Uploading error', error);
      alert('Error occured while uploading resume.');
    }
  };


  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
        Resume Documentation
      </h2>

      <p className="text-gray-600 leading-7 text-center mb-6">
        Your resume plays a key role in getting an internship. It tells employers a lot about you, 
        so it's important to make it stand out and increase your chances of being chosen.
      </p>

      <div className="text-center mb-8">
        <a
          href="https://resume.io/app/create-resume/templates"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block w-full bg-blue-500 text-white py-3 px-4 rounded-lg text-lg font-medium hover:bg-blue-600 transition duration-300 shadow-lg"
        >
          Build Resume
        </a>
      </div>

      <p className="text-xl font-medium text-blue-600 mb-4 text-center">
        Upload Your Resume Document as a Document
      </p>

      <div className="flex flex-col items-center">
        <form onSubmit={handleSubmit}>
          <label className="block text-lg font-semibold mb-2">Upload Resume</label>
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

export default Resume
