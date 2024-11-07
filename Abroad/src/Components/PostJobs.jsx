import React, { useState } from 'react';

function PostJobs() {
  const [formData, setFormData] = useState({
    title: '',
    company_name: '',
    continent: '',
    country: '',
    city: '',
    duration: '',
    major_name: '',
    sub_major: '',
    education_level: "bachelor's degree",
    about_job: '',
    qualifications: '',
    required: '',
    responsibilities: '',
    application_deadline: '',
    posted_date: '',
    company_logo: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'company_logo') {
      const file = files[0];
      if (file && file.type.startsWith('image/')) {
        setFormData({
          ...formData,
          [name]: file,
        });
      } else {
        alert('Please select a valid image file.');
        e.target.value = '';
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requirements = `
            About the Job: ${formData.about_job}
            Qualifications: ${formData.qualifications}
            Responsibilities: ${formData.responsibilities}
            What is Required: ${formData.required}
        `.trim();

    const data = new FormData();
    for (const key in formData) {
      if (key !== 'about_job' && key !== 'qualifications' && key !== 'responsibilities' && key !== 'required') {
        data.append(key, formData[key]);
      }
    }
    data.append('requirements', requirements);

    try {
      const internship_details = await fetch('/api/v1/internships/', {
        method: 'POST',
        body: data,
      });
      const major_details = await fetch('/api/v1/majors/', {
        method: 'POST',
        body: data,
      });
      const country_details = await fetch('/api/v1/countries/', {
        method: 'POST',
        body: data,
      });

      if (internship_details.ok && major_details.ok && country_details.ok) {
        alert('Internship posted successfully!');
      } else {
        throw new Error('Failed to post internship to one or more APIs');
      }
    } catch (error) {
      console.error('Error posting internship', error);
      alert('Failed to post internship. Please try again.');
    }
  };

  return (
    <div className='relative flex justify-center items-center  w-full h-screen pt-6 bg-cover bg-center' style={{ backgroundImage: "url('/src/assets/Images/lost.jpg')" }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <form onSubmit={handleSubmit} className='z-10 max-w-screen-md mx-full bg-white p-8 rounded-lg shadow-lg mt-36'>
        <h2 className='text-center font-bold text-2xl mb-3'>POST AN INTERNSHIP</h2>
        
        {/* Row 1 */}
        <div className='flex flex-col gap-4'>
          <input
            type='text'
            name='title'
            placeholder='Internship Title'
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
          <input
            type='text'
            name='company_name'
            placeholder='Company Name'
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
          
          <input
            type='text'
            name='continent'
            placeholder='In what continent is the internship?'
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
          <input
            type='text'
            name='city'
            placeholder='In which city'
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
          <input
            type='number'
            name='duration'
            placeholder='Internship will take how long? (in months)'
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
          

        </div>

        <button type='submit' className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300 mt-4">Post Internship</button>
      </form>
    </div>
  );
}

export default PostJobs;
