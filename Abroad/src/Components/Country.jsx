import React, { useState } from 'react';
import JobPost from './JobPost';

function Country() {
  const [formData, setFormData] = useState({
    name: '',
    flag: null,
    continent: '',
  });

  const [errors, setErrors] = useState({});
  const [showJobPostForm, setShowJobPostForm] = useState(false);
  const [countryName, setCountryName] = useState(null);
  const [countryId, setCountryId] = useState(null);

  const CONTINENTS = [
    'Africa',
    'Asia',
    'Europe',
    'North-america',
    'South-america',
    'Australia',
    'Antarctica',
  ];

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

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/countries/', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`,
        },
        body: formDataToSend,
      });

      if (response.ok) {
        const responseData = await response.json();
        localStorage.setItem('countryId', responseData.id);
        localStorage.setItem('countryName', responseData.name);

        setCountryId(responseData.id);
        setCountryName(responseData.name);
        setShowJobPostForm(true);

        setFormData({
          name: '',
          continent: '',
          flag: null,
        });
        setErrors({});
      } else {
        const errorData = await response.json();
        setErrors(errorData);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ global: 'An unexpected error occurred. Please try again.' });
    }
  };

  if (showJobPostForm) {
    return <JobPost onComplete={() => setShowJobPostForm(false)} countryName={countryName} countryId={countryId} />;
  }

  return (
    <div className="w-full mx-auto bg-white p-8 rounded-lg shadow-lg">
      {/* Error message display (if any) */}
      {errors.global && (
        <div className="bg-red-500 text-white p-3 rounded mb-4 flex justify-between items-center">
          <p className="font-semibold">{errors.global}</p>
          <button
            onClick={() => setErrors({})}
            className="text-white font-bold bg-transparent hover:bg-white hover:text-black rounded-full p-1"
          >
            X
          </button>
        </div>
      )}

      <h1 className="text-2xl font-bold mb-6 text-center">Internship Location Details</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            className={`w-full p-3 border rounded focus:outline-none focus:border-blue-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
            type="text"
            name="name"
            placeholder="Country Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div className="mb-4">
          <select
            name="continent"
            value={formData.continent}
            onChange={handleChange}
            className={`w-full p-3 border rounded focus:outline-none focus:border-blue-500 ${errors.continent ? 'border-red-500' : 'border-gray-300'}`}
            required
          >
            <option value="" disabled>Select Continent</option>
            {CONTINENTS.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
          {errors.continent && <p className="text-red-500 text-sm mt-1">{errors.continent}</p>}
        </div>

        <div className="mb-4">
          <input
            type="file"
            name="flag"
            onChange={handleFileChange}
            className={`w-full p-3 border rounded focus:outline-none focus:border-blue-500 ${errors.flag ? 'border-red-500' : 'border-gray-300'}`}
            required
          />
          <p className="text-gray-900 text-sm mt-1">Please add a flag image</p>
          {errors.flag && <p className="text-red-500 text-sm mt-1">{errors.flag}</p>}
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-300 text-white font-semibold py-2 px-8 rounded items-center justify-center w-full text-2xl mt-4"
        >
          Submit Country Details
        </button>
      </form>
    </div>
  );
}

export default Country;
