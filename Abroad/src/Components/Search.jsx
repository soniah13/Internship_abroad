import React, { useState } from 'react'

function Search({onSearch}) {
    const [searchText, setSearchText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({searchText});
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchText(value);
        onSearch(value);
    };

  return (
    <div className='flex justify-center items-center px-4'>
        <form onSubmit={handleSubmit} className='flex space-x-4 w-full'>
            <input className='border-b text-black text-xl py-3 px-10 w-full font-meduim'
            type='text' onChange={handleInputChange} value={searchText} placeholder='What do you do?'
            ></input>
        </form>
    </div>
  );
}

export default Search
