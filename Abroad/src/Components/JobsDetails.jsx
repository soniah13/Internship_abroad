import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function JobsDetails() {
    const { id } = useParams();
    const [internship, setInternship] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/v1/internships/${id}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Could not fetch the internship');
                }
                return res.json();
            })
            .then(data => {
                console.log("Fetched Internship Data:", data); // Log entire internship data
                setInternship(data);
            })
            .catch((error) => console.error('Error fetching data', error));
    }, [id]);

    if (!internship || !internship.company_logo) return <p>Loading...</p>;

    return (
        <div className='p-6 sm:p-8 md:p-10 text-xl md:text-2xl'>
            <h1 className='text-center text-3xl font-bold mb-4'>{internship.title}</h1> {/* Reduced margin */}
            <div className='grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2'>
                {/* Image Section */}
                <div className='flex justify-center items-center'>
                    <img 
                        src={`https://res.cloudinary.com/ddqkfdqy8/${internship.picture}`} 
                        alt={internship.title} 
                        className='w-full sm:w-3/4 md:w-full h-64 sm:h-72 md:h-auto object-cover'  // Adjusted widths and heights
                    />
                </div>
                {/* Details Section */}
                <div className='px-6 sm:px-8 md:px-10'>
                    <div className='flex flex-wrap items-center mb-6'>
                        <h3 className='text-left text-xl font-bold mr-4'>{internship.company_name}</h3>
                        <img 
                            src={`https://res.cloudinary.com/ddqkfdqy8/${internship.company_logo}`} 
                            alt={internship.title} 
                            className='w-20 h-16 object-cover'
                        />
                    </div>
                    <p className='text-left text-xl font-semibold mb-4'>Located at {internship.city}</p>
                    <h3 className='text-left text-xl font-bold my-4'>About the Company</h3>
                    <p className='text-left text-xl font-semibold mb-4'>{internship.about_company}</p>
                    <h3 className='text-left text-xl font-bold my-4'>About the Job</h3>
                    <ul className='list-disc ml-5 mb-4'>
                        <h3 className='text-left text-lg font-semibold mb-2'>Required Majors</h3>
                        {internship.majors && internship.majors.split(',').map((major, index) => (
                            <li key={index} className='text-xl font-semibold'>{major}</li>
                        ))}
                    </ul>
                    <p className='text-left text-xl font-semibold mb-4'>{internship.job_description}</p>
                    <h3 className='text-left text-xl font-bold my-4'>Qualifications</h3>
                    <p className='text-left text-xl font-semibold mb-4'>{internship.qualifications}</p>
                    <h3 className='text-left text-xl font-bold my-4'>Responsibilities</h3>
                    <p className='text-left text-xl font-semibold mb-4'>{internship.responsibilities}</p>
                    <h3 className='text-left text-xl font-bold my-4'>Benefits</h3>
                    <p className='text-left text-xl font-semibold'>{internship.benefits}</p>
                </div>
            </div>
        </div>
    );
}

export default JobsDetails;
