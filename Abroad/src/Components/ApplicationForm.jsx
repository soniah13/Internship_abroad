import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function ApplicationForm() {
    const {id} = useParams(); //internship ID
    const [formData, setFormData] = useState({
        applicant_name : '',
        applicant_email : '',
        contact: '',
        location: '',
        documents: null,
    });
    const [message, setMessage] = useState('');
    const [employerId, setEmployerId] = useState(null); //store employer id
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function fetchInternshipDetails() {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/v1/internships/${id}/`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access')}`,
                    },
                });
                if(response.ok){
                    const data = await response.json();
                    setEmployerId(data.employer);
                } else {
                    throw new Error('Failed to fetch internship details');
                }
            } catch (error) {
                console.log('Error occured while fetching', error);
            }   
        }
        fetchInternshipDetails();
    }, [id])

    useEffect(() => {
        async function fetchResume() {
            try{
                const response = await fetch('http://127.0.0.1:8000/api/v1/students/documents/', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access')}`,
                    },
                });
                if(response.ok) {
                    const data = await response.json();
                    if(data.resume) {
                        const resumeUrl = `https://res.cloudinary.com/ddqkfdqy8/${data.resume}`;
                        setFormData((prev) => ({ ...prev, documents: resumeUrl }));
                    }
                } else {
                    console.warn('Resume not upload.');
                }
            } catch(error) {
                console.log('Error fetching resume:', error);
            }
        };
        fetchResume();
    },[]);

    const handleChange = (e) => {
        const {name, files, value } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formDataToSend = new FormData();
        

        formDataToSend.append('applicant_name', formData.applicant_name);
        formDataToSend.append('applicant_email', formData.applicant_email);
        formDataToSend.append('contact', formData.contact);
        formDataToSend.append('location', formData.location);

        if (formData.documents instanceof File) {
            formDataToSend.append('documents', formData.documents);
        } else if (typeof formData.documents === "string") {
            formDataToSend.append('documents', formData.documents);
        }

        formDataToSend.append('internship', id);
        formDataToSend.append('employer', employerId);

        try {
            const response = await fetch('http://127.0.0.1:8000/api/v1/applications/', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access')}`,
                },
                body: formDataToSend,
            });
            if(response.ok) {
                const data = await response.json();
                setMessage('Application submitted successfully!');
                navigate('/jobs')
            } else {
                const errorData = await response.json();
                setMessage(errorData.detail || 'Failed to submit application, try again');
            }
        } catch (error) {
            console.log(error)
            setMessage('an error occured')
        }
        setLoading(false);
    };
  return (
    <div className='relative flex items-center justify-center h-screen bg-cover bg-center' style={{backgroundImage: "url(/src/assets/Images/home.jpg)"}}>
    <div className="absolute inset-0 bg-black opacity-50 "></div>
    <div className=' z-10 container mx-auto p-4 sm:p-6 md:p-8 text-base sm:text-lg'>
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
                            <form onSubmit={handleSubmit} className=" space-y-6">
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
                                <label className='block font-semibold text-lg mb-2'> resume </label>
                                {formData.documents && (
                                    <div className='mb-2'><a href={formData.documents} target='_blank' rel='noopeer noreferrer'
                                    className='text-blue-600 hover:text-blue-800'> View uploaded resume </a></div>
                                )}
                                <input type='file' name='documents' onChange={handleChange} 
                                className='w-full p-2 border rounded-lg shadow-lg'/>
                                </div>
                                
                                <button className=' w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-900 disabled:opacity-50'
                                disabled={loading} onSubmit={handleSubmit}>
                                    {loading ? 'Submitting...': 'Submit your application'}
                                    
                                </button>
      
                            </form>
                        </div>
                    </div>
                </div>
    </div>
    </div>

  )
}


export default ApplicationForm
