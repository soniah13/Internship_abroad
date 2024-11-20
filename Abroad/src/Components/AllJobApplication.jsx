import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function AllJobApplication() {
    const {id} = useParams();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect (() => {
        async function fetchApplications() {
          try { 
            const response = await fetch(`http://127.0.0.1:8000/api/v1/employer/applications/?internship=${id}`, {
                headers: {
                    Authorization: `Bearer${localStorage.getItem('access')}`,
                },
            });
            const data = await response.json();
            setApplications(data);
          } catch(error) {
            console.log('Error fetching application', error);
          } finally {
            setLoading(false);
          }
        }
        fetchApplications();
    }, [id]);

    if(loading) return <p>Loading...</p>
  return (
    <>
      <div className='flex flex-col lg:flex-row gap-6 p-8 bg-blue-100 justify-center items-center'>
        <h2 className='text-2xl font-semibold mb-4'>List of Applications</h2>
      <div className='w-full lg:w-4/5 bg-gray-100 shadow-lg rounded-md p-8 sm:p-6 lg:p-8 space-y-4'>
      {applications.length ? (
        applications.map((app) => (
          <div key={app.id} className="job-card p-4 bg-white shadow rounded-lg mb-4">

            <div className='flex flex-col gap-4 p-6 bg-blue-100 shadow-lg rounded-lg'>
            <h3 className='text-xl font-semibold' >Applicant Name: {app.applicant_name}</h3>
            <p>EMAIL: {app.applicant_email}</p>
            <p>CONTACT: {app.contact}</p>
            <p>LOCATION: {app.location}</p>
            <a href={app.resume_url} className='text-blue-600'> View Uploaded documents</a>
            </div>
          </div>
        ))
      ) : (
        <p className='text-2xl font-bold text-center'>No Applications yet.</p>
      )}
      </div>
      </div>
    </>
  )
}

export default AllJobApplication
