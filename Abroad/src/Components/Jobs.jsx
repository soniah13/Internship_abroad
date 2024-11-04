import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import InternshipList from './InternshipList';

function Jobs({internships = [], setInternships}) {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchInternships = async () => {
            try{
                const response = await fetch("http://127.0.0.1:8000/api/v1/internships/", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if(!response.ok){
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setInternships(data);
            }catch (error) {
                console.error("Error occured while fetching", error);
            }
        };
        fetchInternships();
    },[setInternships]);

    function handleClick(id){
    navigate(`/internship/${id}`);
    }

    function handleSearch(query){
        setSearch(query);
    }
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this internship?");
        if(!confirmDelete) {
            return;
        }
        try{
            const response = await fetch(`http://127.0.0.1:8000/api/v1/internships/${id}/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete the internship');
            }
            setInternships(internships => internships.filter(internship => internship.id !== id));
        } catch(error) {
            console.error('Error deleting recipe:', error);
        }
    };
    const filteredInternships = internships.filter(internship =>
        internship.title.toLowerCase().includes(search.toLowerCase())
    );

    // Group internships by major
    const internshipsByMajor = filteredInternships.reduce((acc, internship) => {
        const majorName = internship.major_name.major_name || "Other";
        if (!acc[majorName]) {
            acc[majorName] = [];
        }
        acc[majorName].push(internship);
        return acc;
    }, {});
    

  return (
    <>
    
      <div className='relative h-96 w-full'>
      <img src='/src/assets/Images/Rocky ocean.jpg' alt='advertisement image' className='oblect-cover w-full h-full'/>
      <div className='absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50'>
      <h2 className='text-white font-semibold text-5xl text-center p-5'>
      Kickstart your global internship journey today!
        </h2>
      </div>
      </div>
      <div className='mt-16 mx-10'>
        {Object.keys(internshipsByMajor).map(major => (
            <div key={major} className='mb-10'>
            <h2 className='text-2xl font-bold mb-4'> {major} Internships </h2>
            <InternshipList internships={filteredInternships} onImageClick={handleClick} />
            </div>
        ))}

      </div>
      
    </>
  );
}

export default Jobs
