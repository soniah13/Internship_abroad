import React from 'react'
import InternCard from './InternCard'

function InternshipList({internships, onImageClick}) {
  return (
    <div className='grid grid-cols- sm:grid-cols-3 lg:grid-cols-4 gap-4'>
        {internships.map((internship) => (
            <InternCard key={internship.id}  internship={internship} onImageClick={onImageClick} />
        ))}
      
    </div>
  )
}

export default InternshipList
