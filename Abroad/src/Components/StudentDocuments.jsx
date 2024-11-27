import React, { useEffect, useState } from 'react';
import Resume from './Resume';
import Passport from './Passport';
import AdmissionLetter from './AdmissionLetter';
import Visa from './Visa';
import { TiTick } from "react-icons/ti";
import AlertMessage from './AlertMessage';

function StudentDocuments() {
    const [documentData, setDocumentData] = useState({
        resume: null,
        visa: null,
        passport: null,
        admission_letter: null,
    });

    const [selectedDocument, setSelectedDocument] = useState(null);
    const [documentUploadStatus, setDocumentUploadStatus] = useState({
        resume: false,
        visa: false,
        passport: false,
        admission_letter: false,
    });
    const [uploadMessage, setUploadMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [alertType, setAlertType] = useState("");
    const [documentToDelete, setDocumentToDelete] = useState(null); // Track which document to delete

    // Load document from localStorage if available
    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/v1/students/documents/', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access')}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setDocumentData({
                        resume: data.resume || null,
                        visa: data.visa || null,
                        passport: data.passport || null,
                        admission_letter: data.admission_letter || null,
                    });
                    
                }
            } catch (error) {
                console.error('Failed to fetch documents:', error);
            }
        };

        fetchDocuments();

    }, []);

    const handleSelectedDocument = (formType) => {
        setSelectedDocument(formType);
        setUploadMessage("");
    };

    const uploadDocument = async (formType, file) => {
        setLoading(true);
        const formData = new FormData();
        formData.append(formType, file);

        try {
            const response = await fetch('http://127.0.0.1:8000/api/v1/students/documents/', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access')}`,
                },
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                setDocumentData((prev) => ({
                    ...prev,
                    [formType]: data[formType],
                }));


                setUploadMessage(`${formType.charAt(0).toUpperCase() + formType.slice(1)} uploaded successfully`);
                setAlertType('success');
            } else {
                setUploadMessage('Failed to upload the document.');
                setAlertType('error');
            }
        } catch (error) {
            console.error('Error uploading document:', error);
            setUploadMessage('An error occurred during upload.');
            setAlertType('error');
        }
        setLoading(false);
    };

    const handleDocumentDelete = async () => {
        if (!documentToDelete) return;

        try {
            await fetch(`http://127.0.0.1:8000/api/v1/students/documents/${documentToDelete}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access')}`,
                },
            });
            setDocumentData((prevData) => ({
                ...prevData,
                [documentToDelete]: null,
            }));

            // Remove from localStorage
            localStorage.removeItem('uploadedResume');

            setUploadMessage('Document deleted successfully');
            setAlertType('success')
        } catch (error) {
            console.error('Failed to delete document:', error);
            setUploadMessage('Failed to delete the document.');
            setAlertType('error')
        }

        setShowConfirmation(false); // Close modal after deletion
        setDocumentToDelete(null); // Reset document to delete
    };

    const renderSelectedDocumentForm = () => {
        const props = {
            onComplete: (file) => uploadDocument(selectedDocument, file),
        };

        switch (selectedDocument) {
            case 'resume':
                return <Resume {...props} />;
            case 'visa':
                return <Visa {...props} />;
            case 'admission_letter':
                return <AdmissionLetter {...props} />;
            case 'passport':
                return <Passport {...props} />;
            default:
                return <p className='font-semibold text-xl text-center'> Select a document to upload or edit</p>;
        }
    };

    const renderDocumentPreview = (formType, label) => (
        <div className='bg-gray-100 p-4 rounded-lg shadow-md mb-4'>
            <h3 className='text-lg font-semibold text-gray-700 '>{label} </h3>
            {documentData[formType] ? (
                <div className='mt-2'>
                    <a href={documentData[formType]} target='_blank' rel='noopener noreferrer' className='text-blue-800 hover:underline'>
                        View Document
                    </a>
                    <div className='flex mt-2 space-x-2'>
                        <button onClick={() => handleSelectedDocument(formType)}
                            className='bg-green-600 text-white px-4 py-1 rounded hover:bg-green-900'>
                                Edit
                            </button>
                        <button onClick={() => {setShowConfirmation(true); setDocumentToDelete(formType); }}
                            className='bg-red-600 text-white px-4 py-1 rounded hover:bg-red-900'>
                                Delete
                            </button>
                    </div>
                </div>
            ) : (
                <p className='text-black font-semibold text-xl'> No document Uploaded </p>
            )}
        </div>
    );

    return (
        <>
            <div className="bg-blue-900 h-80 w-full text-center flex items-center justify-center text-white font-bold">
                <h1 className="text-lg lg:text-4xl">DOCUMENTS REQUIRED FOR <span className='text-blue-300'>INTERNSHIP ABROAD</span></h1>
            </div>

            <div className="max-w-5xl mx-auto p-8">
                <div className="grid grid-cols-2 gap-4 mb-6">
                    {['resume', 'visa', 'admission_letter', 'passport'].map((type) => (
                        <button
                            key={type}
                            onClick={() => handleSelectedDocument(type)}
                            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                        >
                            {type.replace('_', ' ').toUpperCase()}
                        </button>
                    ))}
                </div>

                <div className="mb-8">{renderSelectedDocumentForm()}</div>

                <div>
                    {['resume', 'visa', 'admission_letter', 'passport'].map((type) =>
                        renderDocumentPreview(type, type.replace('_', ' ').toUpperCase())
                    )}
                </div>

                {uploadMessage && (
                    <AlertMessage 
                        message={uploadMessage} 
                        type={alertType} 
                        onClose={() => setUploadMessage("")} // Close the alert when the user clicks the close button
                    />
                )}
            </div>
        </>
    );
}

export default StudentDocuments;
