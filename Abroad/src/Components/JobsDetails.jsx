import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BsCalendar2CheckFill } from "react-icons/bs";
import { FaLocationDot } from 'react-icons/fa6';

function JobsDetails() {
    const { id } = useParams();
    const [internship, setInternship] = useState({});
    const [countryDetails, setCountryDetails] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const internshipRes = await fetch(`http://127.0.0.1:8000/api/v1/internships/${id}`);
                if (!internshipRes.ok) throw new Error('Could not fetch the internship');
                const internshipData = await internshipRes.json();
                setInternship(internshipData);

                const countryRes = await fetch(`http://127.0.0.1:8000/api/v1/countries/${internshipData.country}`);
                if (!countryRes.ok) throw new Error('Could not fetch the country details');
                const countryData = await countryRes.json();
                setCountryDetails(countryData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [id]);

    if (!internship.company_logo) return <p>Loading...</p>;

    return (
        <div className="container mx-auto p-4 sm:p-6 md:p-8 text-base sm:text-lg">
    {/* Back Button */}
    <button 
        onClick={() => navigate(-1)} 
        className="text-blue-600 hover:text-blue-700 flex items-center mb-4 text-sm sm:text-base"
    >
        <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 5L3 12l7 7V5z" />
        </svg>
        Back to posted jobs
    </button>

    {/* Main Layout */}
    <div className="flex flex-col lg:flex-row gap-6">
        {/* Internship Details */}
        <div className="flex-1 bg-blue-50 p-6 shadow-lg rounded-lg">
            <div className="flex flex-col sm:flex-row items-start mb-6">
                <img
                    src={`https://res.cloudinary.com/ddqkfdqy8/${internship.company_logo}`}
                    alt={`${internship.company_name} logo`}
                    className="w-16 h-12 sm:w-20 sm:h-16 object-cover rounded-md shadow-md mr-0 sm:mr-4 mb-4 sm:mb-0"
                />
                <div className="space-y-2">
                    <p className="text-base sm:text-lg font-semibold text-gray-800 flex items-center">
                        <FaLocationDot className="mr-2 text-blue-600" /> {internship.city}
                    </p>
                    <p className="text-base sm:text-lg font-semibold text-gray-800 flex items-center">
                        <BsCalendar2CheckFill className="mr-2 text-blue-600" /> 
                        {new Date(internship.application_deadline).toLocaleDateString()}
                    </p>
                </div>
            </div>
            <hr className="border-t border-gray-300 my-4" />

            <h1 className="text-xl sm:text-2xl font-bold border-b-2 border-blue-600 pb-3 mb-6">
                {internship.title}
            </h1>

            {/* Internship Detail Sections */}
            {[
                { title: 'About the Job', content: internship.job_description },
                { title: 'What you will be in charge of', content: internship.responsibilities },
                { title: 'Who we are looking for', content: internship.qualifications },
                { title: 'What you get out of it', content: internship.benefits },
                { title: 'Majors required', content: internship.majors },
                { title: 'Minimum education level', content: internship.education_level },
                { title: `About ${internship.company_name}`, content: internship.about_company }
            ].map((section, index) => (
                <div key={index} className="bg-white shadow-md rounded-lg p-6 mb-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">{section.title}</h2>
                    <p className="text-sm sm:text-base text-gray-600">
                        {section.content || 'Information not available'}
                    </p>
                </div>
            ))}
        </div>

        {/* Country Details (Right Side) */}
        <div className="w-full lg:w-1/3 bg-white shadow-lg rounded-lg p-6">
            {countryDetails.flag && (
                <div className="text-center mb-6">
                    <img
                        src={`https://res.cloudinary.com/ddqkfdqy8/${countryDetails.flag}`}
                        alt={`${countryDetails.country} Flag`}
                        className="w-16 sm:w-20 mx-auto mb-4 rounded-md shadow-md"
                    />
                    <span className="text-lg font-semibold text-gray-800">{countryDetails.country}</span>
                </div>
            )}
            <p className="text-sm sm:text-base text-gray-700 mb-4">
                Continent: <span className="font-medium text-blue-600">{countryDetails.continent || 'Unknown'}</span>
            </p>
            <button 
                onClick={() => navigate(`/application-form/${id}`)}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 rounded-md hover:from-blue-400 hover:to-blue-600"
            >
                Apply Now
            </button>
        </div>
    </div>
</div>

    );
}

export default JobsDetails;
