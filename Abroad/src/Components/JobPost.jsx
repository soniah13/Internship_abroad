import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function JobPost({ countryName, countryId }) {
  const [formData, setFormData] = useState({
    title: '',
    company_name: '',
    country: countryName || countryId,
    city: '',
    duration: '',
    majors: '',
    education_level: "bachelor's degree",
    job_description: '',
    about_company: '',
    qualifications: '',
    benefits: '',
    responsibilities: '',
    application_deadline: '',
    applicant_count: 0,
    company_logo: null,
    picture:'https://res.cloudinary.com/ddqkfdqy8/image/upload/v1730976302/qjliy417egm4jxavpanl.png',
    standard_image: 'https://res.cloudinary.com/ddqkfdqy8/image/upload/v1730976302/qjliy417egm4jxavpanl.png',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const EDUCATION_LEVELS = [
    "associate certificate",
    "bachelor's degree",
    "master's degree",
    "Phd degree",
  ];

  useEffect(() => {
    const savedCountryName = localStorage.getItem('countryName');
    console.log('name', savedCountryName)
    const savedCountryId = localStorage.getItem('countryId');
    console.log('id', savedCountryId)
    if(savedCountryName && savedCountryId) {
      setFormData((prev) => ({ ...prev, country: savedCountryId}));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isConfirmed = window.confirm('Are you sure the job is ready to be submitted? Once submitted you will not be able to edit!');
    if (!isConfirmed) return;

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    try {
      const internshipsResponse = await fetch('https://internship-abroad-backend.onrender.com/api/v1/internships/', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`,
        },
        body: formDataToSend,
      });

      if (internshipsResponse.ok) {
        const employerJobResponse = await fetch("https://internship-abroad-backend.onrender.com/api/v1/employer/jobs/", {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access')}`
          },
          body: formDataToSend,
        });

        if (employerJobResponse.ok) {
          alert('Internship Job has been added successfully!');
          navigate('/employer-jobs')
          setFormData({
            title: '',
            company_name: '',
            country: '',
            city: '',
            duration: '',
            majors: '',
            education_level: "bachelor's degree",
            job_description: '',
            about_company: '',
            qualifications: '',
            benefits: '',
            responsibilities: '',
            application_deadline: '',
            applicant_count: 0,
            company_logo: null,
            picture: 'https://res.cloudinary.com/ddqkfdqy8/image/upload/v1730976302/qjliy417egm4jxavpanl.png',
            standard_image: 'https://res.cloudinary.com/ddqkfdqy8/image/upload/v1730976302/qjliy417egm4jxavpanl.png',
          });
          setErrors({});
        } else {
          const employerJobError = await employerJobResponse.json();
          setErrors(employerJobError);
        }

      } else {
        const internshipsError = await internshipsResponse.json();
        setErrors(internshipsError);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ global: 'An unexpected error occurred. Please try again.' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Fill this form to post an internship</h2>

      {/* Global error message */}
      {errors.global && <p className="text-red-500 mb-4 text-center">{errors.global}</p>}

      {/* Job Title */}
      <input
        className="w-full p-3 mb-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Job Title"
      />
      {errors.title && <p className="text-red-500 mb-4">{errors.title}</p>}

      {/* Company Name */}
      <input
        className="w-full p-3 mb-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        type="text" name="company_name" value={formData.company_name} onChange={handleChange} placeholder="Name of your Company"
      />
      {errors.company_name && <p className="text-red-500 mb-4">{errors.company_name}</p>}

      {/* Country (hidden) */}
      <input
        className="w-full p-3 mb-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} disabled hidden
      />
      <p className='p-2'>* fill located at form first</p>
      {errors.country && <p className="text-red-500 mb-4">{errors.country}</p>}

      {/* Country Name (displayed) */}
      <input
        className="w-full p-3 mb-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        type="text" name="country_name" placeholder="Country" value={localStorage.getItem('countryName')} disabled
      />

      {/* City */}
      <input
        className="w-full p-3 mb-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required
      />
      {errors.city && <p className="text-red-500 mb-4">{errors.city}</p>}

      {/* Duration */}
      <input
        className="w-full p-3 mb-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        type="number" name="duration" placeholder="Duration (months)" value={formData.duration} onChange={handleChange} required
      />
      {errors.duration && <p className="text-red-500 mb-4">{errors.duration}</p>}

      {/* Majors */}
      <input
        className="w-full p-3 mb-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        type="text" name="majors" placeholder="Majors" value={formData.majors} onChange={handleChange}
      />
      {errors.majors && <p className="text-red-500 mb-4">{errors.majors}</p>}

      {/* Education Level */}
      <select
        name="education_level" value={formData.education_level} onChange={handleChange}
        className="w-full p-3 mb-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500" required
      >
        {EDUCATION_LEVELS.map((level) => (
          <option key={level} value={level}>
            {level}
          </option>
        ))}
      </select>
      {errors.education_level && <p className="text-red-500 mb-4">{errors.education_level}</p>}

      {/* Job Description */}
      <textarea
        name="job_description" placeholder="Job Description" value={formData.job_description} onChange={handleChange}
        className="w-full p-3 mb-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500" required
      />
      {errors.job_description && <p className="text-red-500 mb-4">{errors.job_description}</p>}

      <textarea
        name="about_company" placeholder="About the Company" value={formData.about_company} onChange={handleChange}
        className="w-full p-3 mb-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500" required
      />
      {errors.about_company && <p className="text-red-500 mb-4">{errors.about_company}</p>}
      
      <textarea
        name="qualifications" placeholder="Job qualifications" value={formData.qualifications} onChange={handleChange}
        className="w-full p-3 mb-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500" required
      />
      {errors.qualifications && <p className="text-red-500 mb-4">{errors.qualifications}</p>}

      <textarea
        name="benefits" placeholder="what does the student gain?" value={formData.benefits} onChange={handleChange}
        className="w-full p-3 mb-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500" required
      />
      {errors.benefits && <p className="text-red-500 mb-4">{errors.benefits}</p>}

      <textarea
        name="responsibilities" placeholder="Will be responsible for?" value={formData.responsibilities} onChange={handleChange}
        className="w-full p-3 mb-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500" required
      />
      {errors.responsibilities && <p className="text-red-500 mb-4">{errors.responsibilities}</p>}

      <input
        type="date" name="application_deadline" value={formData.application_deadline} onChange={handleChange}
        className="w-full p-3 mb-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500" required
      />
      {errors.application_deadline && <p className="text-red-500 mb-4">{errors.application_deadline}</p>}

      <input
        type="file" name="company_logo" onChange={handleFileChange}
        className="w-full p-3 mb-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
      />
      <p className='p-2'>please upload company_logo here</p>
      {errors.company_logo && <p className="text-red-500 mb-4">{errors.company_logo}</p>}

      <button type="submit" className="bg-blue-600 hover:bg-blue-300 text-white font-semibold py-2 px-8 rounded items-center justify-center w-full text-2xl mt-4">
        Submit Job
      </button>
    </form>
  );
}

export default JobPost;
