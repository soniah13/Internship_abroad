import React, { useEffect, useState } from 'react';
import Resume from './Resume';
import Passport from './Passport';
import AdmissionLetter from './AdmissionLetter';
import Visa from './Visa';
import { TiTick } from "react-icons/ti";

function StudentDocuments() {
    const [documentData, setDocumentData] = useState({
        resume: null,
        visa: null,
        passport: null,
        admission_letter: null,
    });

    const [selectedDocument, setSelectedDocument] = useState(null);
    const [uploadMessage, setUploadMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false); // New state for confirmation modal
    const [documentToDelete, setDocumentToDelete] = useState(null); // Track which document to delete

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

                    setDocumentUploadStatus({
                        resume: !!data.resume,
                        visa: !!data.visa,
                        passport: !!data.passport,
                        admission_letter: !!data.admission_letter,
                    });

                    localStorage.setItem('documentData', JSON.stringify(data));
                }
            } catch (error) {
                console.error('Failed to fetch documents:', error);
            }
        };

        const storedData = JSON.parse(localStorage.getItem('documentData'));
        if (storedData) {
            setDocumentData(storedData);
            setDocumentUploadStatus({
                resume: !!storedData.resume,
                visa: !!storedData.visa,
                passport: !!storedData.passport,
                admission_letter: !!storedData.admission_letter,
            });
        } else {
            fetchDocuments();
        }
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
            console.log('the data',[...formData.entries()]);

            if (response.ok) {
                const data = await response.json();
                setDocumentData((prev) => ({
                    ...prev,
                    [formType]: data[formType],
                }));

                setDocumentUploadStatus((prev) => ({
                    ...prev,
                    [formType]: true,
                }));

                setUploadMessage(`${formType.charAt(0).toUpperCase() + formType.slice(1)} uploaded successfully`);
            } else {
                setUploadMessage('Failed to upload the document.');
            }
        } catch (error) {
            console.error('Error uploading document:', error);
            setUploadMessage('An error occurred during upload.');
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
            if (response.ok) {
            setDocumentData((prevData) => ({
                ...prevData,
                [documentToDelete]: null,
            }));
            setDocumentUploadStatus((prevStatus) => ({
                ...prevStatus,
                [documentToDelete]: false,
            }));
            setUploadMessage('Document deleted successfully');
        } else {
            setUploadMessage('Failed to delete the document.');
        }
        }
        catch (error) {
            console.error('Failed to delete document:', error);
        }

        setShowConfirmation(false); // Close modal after deletion
        setDocumentToDelete(null); // Reset document to delete
    };

    const renderSelectedDocumentForm = () => {
        if (!selectedDocument) return <p className='font-semibold text-3xl text-center'>SELECT A DOCUMENT TO UPLOAD OR EDIT.</p>;
        switch (selectedDocument) {
            case 'resume':
                return <Resume onComplete={(file) => uploadDocument('resume', file)} />;
            case 'visa':
                return <Visa onComplete={(file) => uploadDocument('visa', file)} />;
            case 'admission_letter':
                return <AdmissionLetter onComplete={(file) => uploadDocument('admission_letter', file)} />;
            case 'passport':
                return <Passport onComplete={(file) => uploadDocument('passport', file)} />;
            default:
                return null;
        }
    };

    const renderDocumentPreview = (formType, label) => (
        documentData[formType] && (
            <div className='p-4 mt-4 mb-2 flex items-center justify-between bg-gray-200 rounded-lg shadow-lg hidden '  >
                <div>
                    <p className='text-2xl font-semibold text-gray-700'>{label}</p>
                    <a href={documentData[formType]} target='_blank' rel='noopener noreferrer' className='text-blue-600 text-lg hover:underline'>
                        View Document
                    </a>
                </div>
                <div className='flex mt-2'>
                    <a href={documentData[formType]} download className='bg-blue-600 text-white rounded-md py-2 px-2 mr-2 hover:bg-blue-900' > DOWLOAD</a>
                    <button onClick={() => handleSelectedDocument(formType)} className='bg-blue-600 text-white rounded-md py-2 px-2 mr-2 hover:bg-blue-900'>EDIT</button>
                    <button onClick={() => { setShowConfirmation(true); setDocumentToDelete(formType); }} className='bg-red-600 text-white rounded-md py-2 px-2 ml-2 hover:bg-red-900'>DELETE</button>

                </div>
            </div>
        )
    );

    return (
        <>
            <div className="bg-blue-900 h-80 w-full text-center flex items-center justify-center text-white font-bold">
                <h1 className="text-lg lg:text-4xl">DOCUMENTS REQUIRED FOR <span className='text-blue-300'>INTERNSHIP ABROAD</span></h1>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 p-6 bg-blue-100">
                <div className="w-full lg:w-2/5 bg-gray-100 rounded-lg p-4 shadow-lg">
                    <p className='text-xl text-black font-medium mb-4'>Upload documents here. Privacy has been ensured.</p>
                    {['resume', 'visa', 'passport', 'admission_letter'].map((docType) => (
                        <button
                            key={docType}
                            onClick={() => handleSelectedDocument(docType)}
                            className={`w-full h-20 mb-4 text-lg font-semibold rounded-lg shadow-md flex items-center justify-center
                             ${documentUploadStatus[docType] ? 'bg-green-200 text-green-800' : 'bg-white text-blue-800'}`}>
                            {docType.replace('_', ' ').toUpperCase()} {documentUploadStatus[docType] && <TiTick size={24} />}
                        </button>
                    ))}
                </div>

                <div className="w-full lg:w-3/5 bg-blue-100 rounded-lg p-4 shadow-lg">
                    {loading && <p className="text-center text-lg text-blue-700">Processing...</p>}
                    {uploadMessage && <p className="text-center text-lg mb-4">{uploadMessage}</p>}
                    {renderSelectedDocumentForm()}
                    {Object.keys(documentData).map((key) => renderDocumentPreview(key, key.replace('_', ' ').toUpperCase()))}
                </div>
            </div>

            {showConfirmation && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center space-y-4">
                        <p className="text-lg font-semibold">Are you sure you want to delete this document?</p>
                        <div className="flex justify-center gap-4">
                            <button onClick={() => setShowConfirmation(false)} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-800">Yes</button>
                            <button onClick={handleDocumentDelete} className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-800">No</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default StudentDocuments;
