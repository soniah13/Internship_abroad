import React from 'react'
import { FaLocationDot } from "react-icons/fa6";


function InternCard({internship, onImageClick}) {
  const imageUrl = internship.picture || internship.standard_image;
  

  return (
    <div className='rounded-md shadow-md m-5 w-72 h-auto flex flex-col bg-blue-100'>
      <h2 className='font-bold text-lg sm:text-base text-left py-2 px-4 truncate'>{internship.title}</h2>
      <div className='flex flex-wrap items-center px-4'>
      <FaLocationDot className='mr-2' />
      <p className='text-black-600 py-2'> {internship.city} </p>
      </div>
      <div className='h-48 w-full overflow-hidden'>
        <img src={imageUrl} alt={internship.company_name} onClick={() => onImageClick(internship.id)}
        className='cursor-pointer object-cover w-full h-full'></img>
        </div>
        <div className='p-4 flex flex-col items-center' >
        <button onClick={() => onImageClick(internship.id)} className='mt-4 px-4 py-2 text-center bg-blue-500 text-white font-semibold rounded hover:bg-blue-600'>
          Learn more</button>
        </div>
      
    </div>
  )
}

export default InternCard
