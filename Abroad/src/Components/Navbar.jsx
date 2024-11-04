// src/Components/Navbar.js
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from './Logo';

function Navbar({ isLoggedIn, setIsLoggedIn, userType }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    const handleLogout = () => {
        localStorage.removeItem('ACCESS_TOKEN');
        localStorage.removeItem('REFRESH_TOKEN');
        setIsLoggedIn(false);
        navigate('/login'); // Redirect to login page
    };

    const getLinkClassName = (path) =>
        location.pathname === path
            ? 'block rounded-md px-3 mx-5 font-semibold text-blue-600'
            : 'block rounded-md px-3 mx-5 font-semibold hover:bg-gray-400 hover:text-black';

    

    return (
        <>
            {/* Navbar container */}
            <div className='flex justify-between items-center border sticky top-0 bg-white shadow-md z-50 p-4'>
                {/* Logo on the left */}
                <div className='pl-4'>
                    <Link to='/'>
                        <Logo />
                    </Link>
                </div>

                {/* Center links for large screens */}
                <nav className='hidden md:flex justify-center font-semibold text-xl'>
                    <Link to='/' className={getLinkClassName('/')}>HOME</Link>
                    {userType === 'student' && <Link to='/jobs' className={getLinkClassName('/jobs')}>INTERNSHIPS</Link>}
                    {userType === 'employer' && <Link to='/post-jobs' className={getLinkClassName('/post-jobs')}>POST INTERNSHIP</Link>}
                </nav>

                {/* Burger menu icon for mobile */}
                <div className='md:hidden pr-4 cursor-pointer' onClick={toggleDropdown}>
                    <i className='fas fa-bars text-2xl'></i>
                </div>

                {/* Right links for large screens */}
                <nav className='hidden md:flex font-semibold text-xl uppercase space-x-4'>
                    {isLoggedIn ? (
                        <Link to='/logout' onClick={handleLogout} className={getLinkClassName('/logout')}>LOGOUT</Link>
                    ) : (
                        <Link to='/login' className='bg-blue-600 text-white hover:bg-gray-400 hover:text-black rounded-md px-3 py-2 font-semibold'>LOGIN</Link>
                    )}
                </nav>
            </div>

            {/* Dropdown menu for mobile (visible when isDropdownOpen is true) */}
            {isDropdownOpen && (
                <div className='md:hidden bg-blue-600 p-4'>
                    <nav className='flex flex-col space-y-2 text-xl text-white text-center font-semibold'>
                        <Link to='/' onClick={toggleDropdown} className='hover:bg-gray-400 hover:text-black rounded-md px-3 py-2'>HOME</Link>
                        {userType === 'student' && <Link to='/jobs' onClick={toggleDropdown} className='hover:bg-gray-400 hover:text-black rounded-md px-3 py-2'>INTERNSHIPS</Link>}
                        {userType === 'employer' && <Link to='/post-jobs' onClick={toggleDropdown} className='hover:bg-gray-400 hover:text-black rounded-md px-3 py-2'>POST INTERNSHIP</Link>}
                        {isLoggedIn ? (
                            <Link to='/logout' onClick={handleLogout} className='hover:bg-gray-400 hover:text-black rounded-md px-3 py-2'>LOGOUT</Link>
                        ) : (
                            <Link to='/login' onClick={toggleDropdown} className='hover:bg-gray-400 hover:text-black rounded-md px-3 py-2'>LOGIN</Link>
                        )}
                    </nav>
                </div>
            )}
        </>
    );
}

export default Navbar;
