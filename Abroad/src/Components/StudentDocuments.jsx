import React, { useEffect, useState } from 'react'
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
    const [documentUploadStatus, setDocumentUploadStatus] = useState({
    resume: false,
    visa: false,
    passport: false,
    admission_letter: false,
  });
  const [uploadMessage, setUploadMessage] = useState("");

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/students/documents/');
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
      } catch(error){
        console.error('Failed to fetch documents:', error);
      }
    };
    fetchDocuments();
  }, []);

  const handleSelectedDocument = (formType) => {
    setSelectedDocument(formType);
    setUploadMessage("");
  };

  const handleDocumentUpload = (formType, document) => {
    setDocumentData((prevUpload) => ({
      ...prevUpload,
      [formType]: document,
    }));
    setDocumentUploadStatus((prevStatus) => ({
      ...prevStatus,
      [formType]: true,
    }));
    setUploadMessage("Document has been uploaded successfully.");
    setSelectedDocument(null);
  };

  const handleDocumentDelete = async (formType) => {
    try {
      await fetch(`http://127.0.0.1:8000/api/v1/students/documents/${formType}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access')}`
        }
      });
      setDocumentData((prevData) => ({
        ...prevData,
        [formType]: null,
      }));
      setDocumentUploadStatus((prevStatus) => ({
        ...prevStatus,
        [formType]:false,
      }));
      setUploadMessage('');
    } catch (error) {
      console.error('Failed to delete document: ', error)
    }
  };

  const renderSelectedDocumentForm = () => {
    if (!selectedDocument) return <p className='font-semibold text-3xl text-center'>SELECT A DOCUMENT TO UPLOAD OR EDIT.</p>
    switch (selectedDocument) {
      case 'resume':
        return <Resume onComplete={(url) => handleDocumentUpload('resume',url)} />;
      case 'visa':
        return <Visa onComplete={(url) => handleDocumentUpload('visa', url)} />;
      case 'admission_letter':
        return <AdmissionLetter onComplete={(url) => handleDocumentUpload('admission_letter', url)} />;
      case 'passport':
        return <Passport onComplete={(url) => handleDocumentUpload('passport', url)} />;
      default:
        return null;
    }
  };

  const renderDocumentPreview = (formType,label) => {
    return (
      documentData[formType] && (
        <div className='p-4 mt-4 bg-gray-200 rounded-lg shadow-lg'>
          <p className='text-lg font-semibold text-gray-700'>{label} </p>
          <img src={documentData[formType]} alt={`${label} Preview`} 
          className='w-full h-32 object-cover rounded mt-2' />
          <div className='flex justify-between mt-2'>
            <button onClick={() => handleSelectedDocument(formType)} className='text-blue-600 underline'>EDIT</button>
            <button onClick={() => handleDocumentDelete(formType)} className='text-red-600 underline'>DELETE</button>
          </div>
        </div>
      )
    );
  };
  return (
    <>
    <div className="bg-blue-900 h-80  w-full p-4 text-white font-bold text-center flex items-center justify-center">
        <h1 className="text-lg lg:text-4xl"> DOCUMENTS REQUIRED FOR <span className='text-blue-200'>
          INTERNSHIP ABROAD </span></h1>
      </div>

      {/* Main Section */}
      <div className="flex flex-col lg:flex-row gap-6 p-4 bg-blue-100">
        {/* Form Selection */}
        <div className="w-full lg:w-2/5 bg-gray-100 shadow-lg rounded-lg p-4 sm:p-6 lg:p-8 space-y-4">
        <p className='text-xl text-black font-medium'> upload documents here. Privacy has been ensured</p>

        {['resume', 'visa', 'passport', 'admission_letter'].map((docType) => (
          <button 
          key={docType} onClick={() => handleSelectedDocument(docType)}
          className={`w-full h-24 text-blue-600 text-2xl font-semibold rounded-lg shadow-lg flex items-center justify-center ${documentUploadStatus[docType] ? 'bg-green-200': 'bg-white'}`}>
            {docType.toUpperCase().replace('_', '')} {documentUploadStatus[docType] && <TiTick size={32}/>}
          </button>
        ))}
          </div>
          <div className='w-full lg:w-3/5 bg-blue-100 p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg'>
          {uploadMessage && <p className='text-green-600 font-semibold'>{uploadMessage} </p>}
          {renderSelectedDocumentForm()}

          {renderDocumentPreview('resume', 'Resume')}
          {renderDocumentPreview('visa', 'Visa')}
          {renderDocumentPreview('passport', 'Passport')}
          {renderDocumentPreview('admission_letter', 'Admission_letter')}
            
          </div>
      </div>
      </>

  );
}

export default StudentDocuments
