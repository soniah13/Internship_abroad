import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function AllJobApplication() {
    const { jobId } = useParams();
    const navigate = useNavigate();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchApplications() {
            try {
                const response = await fetch(`https://internship-abroad-backend.onrender.com/api/v1/employer/applications/?internship=${jobId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access')}`,
                    },
                });
                const data = await response.json();
                setApplications(data);
            } catch (error) {
                console.log('Error fetching application', error);
            } finally {
                setLoading(false);
            }
        }

        fetchApplications();
    }, [jobId]);

    if (loading) return <p>Loading...</p>;

    const downloadFile = (documentUrl) => {
        const link = document.createElement('a');
        link.href = documentUrl;
        link.download = documentUrl.split('/').pop(); // Download the document with the original filename
        link.click();
    };

    return (
        <>
            <div className="flex flex-col lg:flex-col gap-8 p-8 bg-blue-50 justify-start items-center min-h-screen">
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center uppercase text-gray-800">
                    List of Applications
                </h2>

                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="text-blue-600 hover:text-blue-700 flex items-center mb-6 text-sm sm:text-base"
                >
                    <svg className="h-5 w-5 " fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 5L3 12l7 7V5z" />
                    </svg>
                    Back to All Internships
                </button>

                {/* Applications Section */}
                <div className="w-full lg:w-3/4 bg-white shadow-lg rounded-lg p-6 sm:p-8 space-y-6">
                    {applications.length ? (
                        applications.map((app) => (
                            <div key={app.id} className="p-6 bg-blue-100 shadow-md rounded-lg">
                                <h3 className="text-lg sm:text-xl  text-gray-800">
                                    <strong> Applicant Name:</strong> {app.applicant_name}
                                </h3>
                                <p className="text-lg sm:text-xl text-gray-700">
                                    <strong>Email:</strong> {app.applicant_email}
                                </p>
                                <p className="text-lg sm:text-xl text-gray-700">
                                    <strong>Contact:</strong> {app.contact}
                                </p>
                                <p className="text-lg sm:text-xl text-gray-700">
                                    <strong>Location:</strong> {app.location}
                                </p>
                                {/* Resume download button */}
                                <button onClick={() => downloadFile(app.resume_document)} className="bg-blue-600 text-white hover:bg-blue-900 rounded-md shadow-lg py-2 px-2 mt-2">
                                    Download Resume
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-xl sm:text-2xl font-bold text-center text-gray-700">
                            No Applications Yet
                        </p>
                    )}
                </div>
            </div>
        </>
    );
}

export default AllJobApplication;
