import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { IoPersonCircleOutline } from "react-icons/io5";

function Navbar({ isLoggedIn, setIsLoggedIn, role }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    const handleLogout = () => {
        localStorage.clear();
        setIsLoggedIn(false);
        navigate('/login'); // Redirect to login page
    };

    const getLinkClassName = (path) =>
        location.pathname === path
            ? 'block rounded-md px-3 mx-5 font-semibold text-blue-600'
            : 'block rounded-md px-3 mx-5 font-semibold hover:bg-blue-400 hover:text-black';

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
                <nav className='hidden md:flex justify-center  font-semibold text-xl'>
                    <Link to='/' className={getLinkClassName('/')}>HOME</Link>
                    {isLoggedIn && role === 'student' && (
                        <Link to='/jobs' className={getLinkClassName('/jobs')}>INTERNSHIPS</Link>
                    )}
                    {isLoggedIn && role === 'student' && (
                    <Link 
                        to='/student-profile' 
                        className='flex items-center justify-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors duration-300'
                    >
                        <IoPersonCircleOutline size={24} />
                        <span className='text-center text-sm'>Profile</span>
                    </Link>
                    )}

                    {isLoggedIn && role === 'employer' && (
                        <Link to='/post-jobs' className={getLinkClassName('/post-jobs')}>POST INTERNSHIP</Link>
                    )}
                    {isLoggedIn && role === 'employer' && (
                        <Link to='/employer-jobs' className={getLinkClassName('/employer-jobs')}>POSTED JOBS</Link>
                    )}
                    
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
                    <nav className='flex flex-col space-y-2 text-xl text-white text-center font-semibold items-center justify-center'>
                    {isLoggedIn && role === 'student' && (
                    <Link 
                        to='/student-profile' 
                        className='flex items-center justify-center space-x-2 text-gray-100 hover:text-blue-900 transition-colors duration-300'
                    >
                        <IoPersonCircleOutline size={24} />
                        <span className='text-center text-sm'>Profile</span>
                    </Link>
                    )}
                        <Link to='/' onClick={toggleDropdown} className='hover:bg-gray-400 hover:text-black rounded-md px-3 py-2'>HOME</Link>
                        {isLoggedIn && role === 'student' && (
                            <Link to='/jobs' onClick={toggleDropdown} className='hover:bg-gray-400 hover:text-black rounded-md px-3 py-2'>INTERNSHIPS</Link>
                        )}
                        {isLoggedIn && role === 'employer' && (
                            <Link to='/post-jobs' onClick={toggleDropdown} className='hover:bg-gray-400 hover:text-black rounded-md px-3 py-2'>POST INTERNSHIP</Link>
                        )}
                        {isLoggedIn && role === 'employer' && (
                            <Link to='/employer-jobs' onClick={toggleDropdown} className='hover:bg-gray-400 hover:text-black rounded-md px-3 py-2'>POSTED JOBS</Link>
                        )}
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
