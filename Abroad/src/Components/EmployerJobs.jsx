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
            Authorization: `Bearer ${localStorage.getItem('access')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }

        const data = await response.json();
        const jobsWithApplications = data.jobs.map(job => ({
          ...job,
          applications: job.applications || [],
          applicant_count: job.applicant_count || 0,

        }))
        setJobData(jobsWithApplications); 
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
    <div className="bg-blue-900 h-48 lg:h-80 w-full p-4 text-white font-bold text-center flex items-center justify-center">
        <h1 className="text-3xl lg:text-5xl">YOUR JOBS</h1>
      </div>
      <div className='flex flex-col lg:flex-row gap-6 p-8 bg-blue-100  justify-center items-center'>
      <div className='w-full lg:w-3/5 bg-gray-100 shadow-lg rounded-md p-8 sm:p-6 lg:p-8 space-y-4'>
      {jobData.length > 0 ? (
        jobData.map((job) => (
          <div key={job.job.id} className="job-card p-4 bg-white shadow rounded-lg mb-4">

            <div className='flex flex-col'>
            <h3 className='text-2xl' ><span className='text-2xl font-semibold'>Title:</span> {job.job.title}</h3>
            <p className='text-2xl'><span className='text-2xl font-semibold'>City:</span> {job.job.city}</p>
            <p className='text-2xl'><span className='text-2xl font-semibold'>Number of applications:</span> {job.job.applicant_count }</p>
            <p className='text-2xl'><span className='text-2xl font-semibold'>Applicants needed:</span> {job.job.max_applications}</p>
            </div>

            <div className='flex flex-row space-x-2 '>
            <button onClick={() => handlePreview(job.job.id)} className='bg-blue-600 hover:bg-blue-300 text-white px-4 py-2 rounded mx-4 my-4'>Preview Job</button>
            <button onClick={() => handleViewApplications(job.job.id)} className='bg-green-600 hover:bg-green-300 text-white px-4 py-2 rounded mx-4 my-4 ml-4'>View Applications</button>
            </div>
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
