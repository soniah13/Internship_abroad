import React, { useState } from 'react';

function Country({ onComplete }) {
  const [formData, setFormData] = useState({
    name: '',
    flag: null,
    continent: '',
    
  });

  const [errors, setErrors] = useState({});
  const CONTINENTS = [
    'Africa',
    'Asia',
    'Europe',
    'North-America',
    'South-America',
    'Australia',
    'Antarctica'
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
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: formDataToSend,
      });
      if (response.ok) {
        onComplete();
        setFormData({
          title: '',
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

  return (
    <form onSubmit={handleSubmit} className="w-full mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Internship Location Details</h1>
      
      {errors.global && <p className="text-red-500 mb-4 text-center">{errors.global}</p>}

      <input
        className="w-full p-3 mb-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        type="text"
        name="name"
        placeholder="Country Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      {errors.name && <p className="text-red-500 mb-4">{errors.name}</p>}

      <select
        name="continent"
        value={formData.continent}
        onChange={handleChange}
        className="w-full p-3 mb-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        required
      >
        {CONTINENTS.map((level) => (
          <option key={level} value={level}>
            {level}
          </option>
        ))}
      </select>
      {errors.continent && <p className="text-red-500 mb-4">{errors.continent}</p>}

      <input
        type="file"
        name="flag"
        onChange={handleFileChange}
        placeholder='flag image'
        className="w-full p-3 mb-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        required
      />
      {errors.flag && <p className="text-red-500 mb-4">{errors.flag}</p>}


      <button type="submit" className="bg-blue-600 hover:bg-blue-300 text-white font-semibold py-2 px-8 rounded items-center justify-center w-full text-2xl mt-4">
        Submit Job country
      </button>
    </form>
  );
}

export default Country;