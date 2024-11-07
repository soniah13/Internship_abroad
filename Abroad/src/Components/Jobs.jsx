import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import InternshipList from './InternshipList';

function Jobs({ internships = [], setInternships }) {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [internshipsByMajor, setInternshipsByMajor] = useState({});  // New state for organized internships
    const [filteredInternships, setFilteredInternships] = useState([]); // New state for filtered internships

    useEffect(() => {
        const fetchInternships = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/v1/internships/", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setInternships(data);

                // Organize internships by major or other criteria
                const byMajor = data.reduce((acc, internship) => {
                    const major = internship.major_name || 'Other';
                    if (!acc[major]) {
                        acc[major] = [];
                    }
                    acc[major].push(internship);
                    return acc;
                }, {});
                setInternshipsByMajor(byMajor);
                setFilteredInternships(data); // Set filtered internships initially to all
            } catch (error) {
                console.error("Error occurred while fetching", error);
            }
        };
        fetchInternships();
    }, [setInternships]);

    function handleClick(id) {
        navigate(`/internship/${id}`);
    }

    function handleSearch(query) {
        setSearch(query);
        const filtered = internships.filter(internship =>
            internship.title.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredInternships(filtered);
    }

    return (
        <>
            <div className='relative h-96 w-full '>
                <img src='/src/assets/Images/hands.jpg' alt='advertisement image' className='object-cover w-full h-full' />
                <div className='absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 '>
                    <h2 className='text-white font-semibold text-5xl text-center p-5'>
                        Kickstart your global internship journey today!
                    </h2>
                </div>
            </div>
            <div className='mt-16 mx-10'>
                {Object.keys(internshipsByMajor).map(major => (
                    <div key={major} className='mb-10'>
                        <h2 className='text-2xl font-bold mb-4'>{major} Internships</h2>
                        <InternshipList internships={filteredInternships} onImageClick={handleClick} />
                    </div>
                ))}
            </div>
        </>
    );
}

export default Jobs;
