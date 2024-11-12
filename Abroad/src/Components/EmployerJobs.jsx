import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';

function EmployerJobs() {
  const [jobData, setJobData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/v1/employer/jobs/", {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }

        const data = await response.json();
        setJobData(data.jobs); // Assuming `data.jobs` is an array of job objects
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs(); // Call the fetch function inside useEffect
  }, []); // Empty dependency array to run once on mount

  if (loading) return <p>...loading jobs</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
    <div className="bg-blue-700 h-48 lg:h-64 w-full p-4 text-white font-bold text-center flex items-center justify-center">
        <h1 className="text-lg lg:text-4xl border-b-4 border-white">YOUR JOBS</h1>
      </div>
      <div className='flex flex-col lg:flex-row gap-6 p-4 bg-blue-100 justify-center items-center'>
      <div className='w-full lg:w-4/5 bg-gray-100 shadow-lg rounded-md p-4 sm:p-6 lg:p-8 space-y-4'>
      {jobData.length > 0 ? (
        jobData.map((job) => (
          <div key={job.id} className="job-card p-4 bg-white shadow rounded-lg mb-4">
            <h3 className='text-2xl font-semibold'>{job.title}</h3>
            <p>City: {job.city}</p>
            <p>Applicants Required: {job.max_applications}</p>
            <p>Applicants Applied: {job.applicant_count}</p>
            <button onClick={() => handlePreview(job.id)} className='bg-blue-600 hover:bg-green-600 text-white px-4 py-2 rounded'>Preview Job</button>
            <button onClick={() => handleViewApplications(job.id)} className='bg-green-600 hover:bg-blue-60 text-white px-4 py-2 rounded'>View Applications</button>
          </div>
        ))
      ) : (
        <p className='text-2xl font-bold text-center'>No jobs posted yet.</p>
      )}
      </div>
      </div>
    </>
  );

  function handlePreview(jobId) {
    navigate(`/job-preview/${jobId}`)
  }

  function handleViewApplications(jobId) {
    navigate(`/job-applications/${jobId}`)
  }
}

export default EmployerJobs;
