import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IoTime } from 'react-icons/io5';
import { FaLocationDot } from 'react-icons/fa6';

function PostedPreview() {
    const [job, setJob] = useState(null);
    const { jobId } = useParams();
    const navigate = useNavigate();
    const [isModalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/v1/employer/jobs/${jobId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access')}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch job');
                }

                const data = await response.json();
                if (data && data.id) {
                    setJob(data);
                } else {
                    console.log("No job data found");
                }
            } catch (error) {
                console.log('Error occurred while fetching', error);
            }
        };
        fetchJob();
    }, [jobId]);

    const handleDelete = async () => {
        setModalOpen(true); // Open the confirmation modal

        
    };

    const confirmDelete = async (confirm) => {
        if (confirm) {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/v1/employer/jobs/${jobId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access')}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to delete job');
                }
                navigate('/employer-jobs');
            } catch (error) {
                console.log('Error occurred while deleting job:', error);
            }
        }
        setModalOpen(false); 
    };

    if (!job) {
        return <p>Loading job details...</p>;
    }

    return (
        <>
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
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col w-full max-w-7xl mx-auto items-center justify-center lg:flex-row gap-6">
                        {/* Internship Details */}
                        <div className="flex-1 bg-blue-100 p-4 sm:p-6 shadow-lg rounded-md">
                            <div className="flex flex-col sm:flex-row items-start mb-4">
                                <img
                                    src={`https://res.cloudinary.com/ddqkfdqy8/${job.company_logo}`}
                                    alt={`${job.company_name} logo`}
                                    className="w-16 h-12 sm:w-20 sm:h-16 object-cover mr-0 sm:mr-4 mb-2 sm:mb-0"
                                />
                                <div>
                                    <p className="text-base sm:text-lg font-semibold flex items-center">
                                        <FaLocationDot className="mr-1" /> {job.city}
                                    </p>
                                    <p className="text-base sm:text-lg font-semibold flex items-center">
                                        <IoTime className="mr-1" /> {new Date(job.application_deadline).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            <hr className="border-t border-gray-300 my-4" />

                            <h1 className="text-xl sm:text-2xl font-bold border-b-2 border-blue-600 pb-2 mb-4">
                                {job.title}
                            </h1>

                            {/* Internship preview Sections */}
                            {[
                                { title: 'About the Job', content: job.job_description },
                                { title: 'What you will be in charge of', content: job.responsibilities },
                                { title: 'Who we are looking for', content: job.qualifications },
                                { title: 'What you get out of it', content: job.benefits },
                                { title: 'Majors required', content: job.majors },
                                { title: 'Minimum education level', content: job.education_level },
                                { title: `About ${job.company_name}`, content: job.about_company },
                            ].map((section, index) => (
                                <div key={index} className="bg-white shadow-lg rounded-lg p-4 sm:p-6 mb-4">
                                    <h2 className="text-base sm:text-lg font-semibold mb-2">{section.title}</h2>
                                    <p className="text-sm sm:text-base">{section.content || 'Information not available'}</p>
                                </div>
                            ))}
                            <button
                                onClick={handleDelete}
                                className="mt-4 px-4 py-2 bg-red-300 text-white font-semibold rounded hover:bg-red-600 transition"
                            >
                                DELETE JOB
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Confirmation Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                        <h2 className="text-lg font-semibold text-center mb-4">Are you sure you want to delete your posted job?</h2>
                        <div className="flex justify-around">
                            <button
                                onClick={() => confirmDelete(true)}
                                className="px-4 py-2 bg-red-300 text-white rounded hover:bg-red-600 transition"
                            >
                                Yes
                            </button>
                            <button
                                onClick={() => confirmDelete(false)}
                                className="px-4 py-2 bg-blue-300 text-white rounded hover:bg-blue-600 transition"
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default PostedPreview;
