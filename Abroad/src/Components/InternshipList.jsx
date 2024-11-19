import React from 'react'
import InternCard from './InternCard'

function InternshipList({internships, onImageClick}) {
  return (
    <div className="flex justify-center">
    <div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6'>
        {internships.map((internship) => (
            <InternCard key={internship.id}  internship={internship} onImageClick={onImageClick} />
        ))}
      
    </div>
    </div>
  )
}

export default InternshipList
