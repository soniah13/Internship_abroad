import React, { useEffect, useState } from 'react';
import Resume from './Resume';
import Passport from './Passport';
import AdmissionLetter from './AdmissionLetter';
import Visa from './Visa';
import { TiTick } from "react-icons/ti";
import AlertMessage from './AlertMessage';

function StudentDocuments() {
    const [documentData, setDocumentData] = useState({
        return :{
            resume: localStorage.getItem('resume') || null,
            visa: localStorage.getItem('visa') || null,
            passport: localStorage.getItem('passport') || null,
            admission_letter: localStorage.getItem('admission_letter') || null,
        }
    });

    const [selectedDocument, setSelectedDocument] = useState(null);
    const [documentUploadStatus, setDocumentUploadStatus] = useState({
        resume: false,
        visa: false,
        passport: false,
        admission_letter: false
    })
    const [uploadMessage, setUploadMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [alertType, setAlertType] = useState("");
    const [documentToDelete, setDocumentToDelete] = useState(null); // Track which document to delete

    // Load document from localStorage if available
    useEffect(() => {
        const storedDocuments = JSON.parse(localStorage.getItem('documentData'));
        if (storedDocuments) {
            setDocumentData(storedDocuments);
            const status = Object.keys(storedDocuments).reduce((acc, key) => {
                acc[key] = !!storedDocuments[key];
                return acc;
            }, {});
            setDocumentUploadStatus(status);
        }

    }, []);


    const uploadDocument = async (formType, file) => {
        setLoading(true);
        const formData = new FormData();
        formData.append(formType, file);

        try {
            const response = await fetch('https://internship-abroad-backend.onrender.com/api/v1/students/documents/', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access')}`,
                },
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                setDocumentData((prev) => {
                    const updatedData = {
                        ...prev,
                        [formType]: data[formType]
                    }
                    localStorage.setItem('documentData', JSON.stringify(updatedData));
                    return updatedData;
                });

                setDocumentUploadStatus((prev) => {
                    const updatedStatus = { ...prev, [formType]: true};
                    localStorage.setItem('documentUploadStatus', JSON.stringify(updatedStatus));
                    return updatedStatus;
                })

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
            await fetch(`https://internship-abroad-backend.onrender.com/api/v1/students/documents/${documentToDelete}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access')}`,
                },
            });
            if (response.ok) {
                setDocumentData((prevData) => {
                    const updatedData = {...prevData, [documentToDelete]: null};
                    localStorage.setItem('documentData', JSON.stringify(updatedData));
                    return updatedData;
                });

                setDocumentUploadStatus((prevStatus) => {
                    const updatedStatus = { ...prevStatus, [documentToDelete]: false};
                    localStorage.setItem('documentUploadStatus', JSON.stringify(updatedStatus));
                    return updatedStatus;
                })

                setUploadMessage('Document deleted successfully');
                setAlertType('success')
            } else {
                setUploadMessage('Failed to delete the document.');
                setAlertType('error')
            }
            

        } catch (error) {
            console.error('Failed to delete document:', error);
            setUploadMessage('Error occured during deletion');
            setAlertType('error');
        }

        
        setDocumentToDelete(null); // Reset document to delete
    };

    const handleSelectedDocument = (formType) => {
        setSelectedDocument(formType);
        setUploadMessage("");
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
                        <button onClick={() => setDocumentToDelete(formType)}
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
