import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import InternshipList from './InternshipList';

function Jobs({internships = [], setInternships}) {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [countryFilter, setCountryFilter] = useState('');
    const [filteredInternships, setFilteredInternships] = useState([]);
    const [countries, setCountries] = useState([]);

    useEffect (() => {
        const fetchInternships = async () => {
            try {
                const response = await fetch('https://internship-abroad-backend.onrender.com/api/v1/internships/');
                if (!response.ok) throw new Error('Network response was not okay');
                const data = await response.json();
                setInternships(data);
                setFilteredInternships(data);
            } catch (error) {
                console.error('Error occured while fetching internships', error)
            }
        };

        const fetchCountries = async () => {
            try {
                const response = await fetch('https://internship-abroad-backend.onrender.com/api/v1/countries/');
                if (!response.ok) throw new Error('Network response was not okay');
                const data = await response.json();
                setCountries(data);
                
            } catch(error){
                console.error('Error occured while fetching countries', error);
            }
        };
        fetchInternships();
        fetchCountries();
    }, [setInternships]);

    function handleClick(id) {
        navigate(`/internship/${id}`);
    }

    function handleSearch(e){
        setSearch(e.target.value);
        filterResults(e.target.value, countryFilter);
    }

    function handleCountryChange(e) {
        setCountryFilter(e.target.value);
        filterResults(search, e.target.value);
    }
    
    function filterResults(titleQuery, countryQuery){
        const filtered = internships.filter(internship => {
            const matchesTitle = internship.title.toLowerCase().includes(titleQuery.toLowerCase());
            const matchesCountry = countryQuery
            ? countries.some(country => 
                country.name.toLowerCase() === countryQuery.toLowerCase() && 
                internship.country.toLowerCase() === country.name.toLowerCase()
            ) : true;
            return matchesTitle && matchesCountry;
        });
        setFilteredInternships(filtered);
    }
  return (
    <>
    <div className='w-full h-96 relative'>
        <img src="/assets/Images/jobs.png" alt="advertisement image" className='object-cover w-full h-96'/>
        <div className='absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-60'>
            <h2 className='text-white font-semibold text-5xl text-center p-5'>
                Kickstart your global internship journey today!
            </h2>
            <div className='mt-4 w-3/4 md:w-1/2'>
            <input type='text' placeholder='What do you want do?' value={search} onChange={handleSearch}
            className='w-full p-3 mb-4 bg-white bg-opacity-50 text-white placeholder-white outline-none rounded-md'></input>
            
            <p className='text-white mt-2'>
                {filteredInternships.length} internship{filteredInternships.length !== 1 && 's'} found
            </p>
            </div>
        </div>
    </div>
    <div className='mt-16 mx-5'>
        <InternshipList internships={filteredInternships} onImageClick={handleClick} />
    </div>
      
    </>
  )
}

export default Jobs
