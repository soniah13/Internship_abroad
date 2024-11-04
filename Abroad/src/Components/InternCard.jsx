import React from 'react'


function InternCard({internship, onImageClick}) {
  

  return (
    <div className='rounded-lg shadow-lg m-5 w-80 h-auto flex flex-col'>
      <div className='h-48 w-full overflow-hidden'>
        <img src={internship.company_logo} alt={internship.company_name} onClick={() => onImageClick(internship.id)}
        className='cursor-pointer object-cover w-full h-full'></img>
        </div>
        <div className='p-4 flex flex-col items-start' >
        <h2 className='font-bold text-lg sm:text-base text-left py-2 truncate'>{internship.title}</h2>
        <p className='text-gray-600'>Offered by: {internship.company_name} </p>
        <p className='text-black-600'>Internship in : {internship.city} </p>
        <button onClick={() => onImageClick(internship.id)} className='mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600'>
          View internship deatils </button>
        </div>
      
    </div>
  )
}

export default InternCard
