import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AlertMessage from './AlertMessage';

function ApplicationForm() {
    const { id } = useParams(); // internship ID
    const [formData, setFormData] = useState({
        applicant_name: '',
        applicant_email: '',
        contact: '',
        location: '',
        resume_document: null, // resume_document as an independent field
    });
    const [message, setMessage] = useState('');
    const [employerId, setEmployerId] = useState(null); // store employer ID
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [uploadMessage, setUploadMessage] = useState('');
    const [alertType, setAlertType] = useState('');

    
     // Get logged-in user's ID from local storage

    useEffect(() => {
        async function fetchInternshipDetails() {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/v1/internships/${id}/`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access')}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setEmployerId(data.employer);
                } else {
                    throw new Error('Failed to fetch internship details');
                }
            } catch (error) {
                console.log('Error occurred while fetching', error);
            }
        }
        fetchInternshipDetails();
    }, [id]);

    const handleChange = (e) => {
        const { name, files, value } = e.target;

        // If it's the resume file input
        if (name === 'resume_document' && files) {
            const file = files[0];
            const fileType = file.type;
            const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

            // Check if the file type is allowed
            if (!allowedTypes.includes(fileType)) {
                setMessage('Please upload a valid resume (PDF or DOC/DOCX only)');
                return; // Do not proceed if the file type is invalid
            }

            setMessage(''); // Clear message if file is valid
            setFormData({
                ...formData,
                [name]: file,
            });
        } else {
            setFormData({
                ...formData,
                [name]: files ? files[0] : value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        if (!employerId) {
            setUploadMessage("Employer details not loaded yet. Please try again later.");
            setAlertType("error");
            setLoading(false);
            return;
        }
        
        const formDataToSend = new FormData();
        formDataToSend.append('applicant_name', formData.applicant_name);
        formDataToSend.append('applicant_email', formData.applicant_email);
        formDataToSend.append('contact', formData.contact);
        formDataToSend.append('location', formData.location);
        formDataToSend.append('internship', id); // Add the applicant ID here
        formDataToSend.append('employer', employerId);
    
        if (formData.resume_document instanceof File) {
            formDataToSend.append('resume_document', formData.resume_document);
        }
        console.log(formData)
        try {
            const response = await fetch('http://127.0.0.1:8000/api/v1/students/applications/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access')}`,
                },
                body: formDataToSend,
            });
    
            if (response.ok) {
                const formData = await response.json();
                console.log("Success:", formData);
                setUploadMessage('Application submitted successfully!');
                setAlertType('success');
                navigate('/jobs');
            } else {
                const errorData = await response.json();
                console.error("Error:", errorData);
                setUploadMessage(errorData.detail || 'Failed to submit application, try again.');
                setAlertType('error');
            }
        } catch (error) {
            console.error("Network or Server Error:", error);
            setUploadMessage('An error occurred while submitting your application.');
            setAlertType('error');
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className='relative flex items-center justify-center h-screen bg-cover bg-center' style={{ backgroundImage: "url(/src/assets/Images/home.jpg)" }}>
            <div className="absolute inset-0 bg-black opacity-50 "></div>
            <div className='z-10 container mx-auto p-4 sm:p-6 md:p-8 text-base sm:text-lg'>
                <button onClick={() => navigate(-1)}
                    className="text-white hover:white flex items-center mb-4 text-lg sm:text-lg">
                    <svg className="h-5 w-5 mr-2" fill="white" viewBox="0 0 20 20"> <path d="M10 5L3 12l7 7V5z" />
                    </svg> Back
                </button>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col w-full max-w-3xl mx-auto items-center justify-center lg:flex-row gap-6">
                        {/* Internship Details */}
                        <div className="flex-1 bg-blue-100 p-6 shadow-lg rounded-md">
                            {message && <p className='text-red-600'>{message}</p>}
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <h2 className='text-2xl font-bold mb-4 text-center'>APPLY FOR INTERNSHIP</h2>

                                <div className='mb-4'>
                                    <label className='block font-semibold text-lg mb-2'> Full Names</label>
                                    <input type='text' name='applicant_name' value={formData.applicant_name || ''} onChange={handleChange}
                                        className='w-full p-4 border  rounded-lg shadow-lg' required />
                                </div>

                                <div className='mb-4'>
                                    <label className='block font-semibold text-lg mb-2'> Email</label>
                                    <input type='text' name='applicant_email' value={formData.applicant_email || ''} onChange={handleChange}
                                        className='w-full p-4 border rounded-lg shadow-lg' required />
                                </div>

                                <div className='mb-4'>
                                    <label className='block font-semibold text-lg mb-2'> Contact </label>
                                    <input type='text' name='contact' value={formData.contact || ''} onChange={handleChange}
                                        className='w-full p-4 border rounded-lg shadow-lg' required />
                                </div>

                                <div className='mb-4'>
                                    <label className='block font-semibold text-lg mb-2'> Location</label>
                                    <input type='text' name='location' value={formData.location || ''} onChange={handleChange}
                                        className='w-full p-4 border rounded-lg shadow-lg' required />
                                </div>

                                <div className='mb-4'>
                                    <label className='block font-semibold text-lg mb-2'> Resume Document </label>
                                    {formData.resume_document && typeof formData.resume_document === "string" && (
                                        <div className='mb-2'>
                                            <a href={formData.resume_document} target='_blank' rel='noopener noreferrer'
                                                className='text-blue-600 hover:text-blue-800'> View uploaded resume_document </a>
                                        </div>
                                    )}
                                    <input type='file' name='resume_document' onChange={handleChange}
                                        className='w-full p-2 border rounded-lg shadow-lg' />
                                </div>

                                <button className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-900 disabled:opacity-50'
                                    disabled={loading}>
                                    {loading ? 'Submitting...' : 'Submit your application'}
                                </button>

                            </form>
                        </div>
                    </div>
                </div>
                {uploadMessage && (
                    <AlertMessage
                        message={uploadMessage}
                        type={alertType}
                        onClose={() => setUploadMessage("")} // Close the alert when the user clicks the close button
                    />
                )}
            </div>
        </div>
    );
}

export default ApplicationForm;
