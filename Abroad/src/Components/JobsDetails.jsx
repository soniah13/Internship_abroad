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
        <div className='p-10'>
            <h1 className='text-center text-3xl font-bold mb-2'> {internship.title} </h1>
            <div className='grid grid-cols-2 grid-rows-1'>
                <div className='flex justify-center items-center'>
                    {/* Construct the full Cloudinary image URL */}
                    <img 
                        src={`https://res.cloudinary.com/ddqkfdqy8/${internship.company_logo}`} 
                        alt={internship.title} 
                        className='w-5/6 h-5/6 object-cover my-10'
                    />
                </div>
                <div className='p-10'>
                    <h3 className='text-left text-xl font-bold mb-2'>{internship.company_name}</h3>
                    {/* Display Requirements as a List */}
                    <ul className='list-disc ml-5 mb-4'>
                        {internship.requirements && internship.requirements.split('.').map((requirement, index) => (
                            <li key={index} className='text-x font-semibold'>{requirement.trim()}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default JobsDetails;
