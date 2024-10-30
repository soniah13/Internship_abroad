// src/Components/Navbar.js
import React, { useState } from 'react'; 
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from './Logo';

function Navbar({ isLoggedIn, setIsLoggedIn }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();


    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('ACCESS_TOKEN');
        localStorage.removeItem('REFRESH_TOKEN');
        setIsLoggedIn(false);
        navigate('/login'); // Redirect to login page
    };


    const getLinkClassName = (path) => {
        const baseClass = 'block rounded-md px-3 py-2 mx-5 font-semibold';
        const activeClass = 'text-blue-600';
        const inactiveClass = 'hover:bg-grey-400 hover:text-black';

        return location.pathname === path ? `${baseClass} ${activeClass}` : `${baseClass} ${inactiveClass}`;

        };

    return (
        <>
            {/* Navbar container */}
            <div className='flex justify-between items-center m-0 p-0 border border-solid border-2'>
                {/* Logo on the left */}
                <div className='pl-4'>
                    <Link to='/'>
                        <Logo/>
                    </Link>
                </div>

                <div className='hidden md:flex flex-grow justify-center font-semibold text-xl py-3 uppercase'>
                    <Link to='/' className={getLinkClassName('/')}>HOME</Link>
                    
                </div>

                {/* Burger menu icon for mobile */}
                <div className='md:hidden pr-4 cursor-pointer'>
                    <i className='fas fa-bars' onClick={toggleDropdown} style={{ fontSize: '28px' }}></i>
                </div>

                {/* Navigation Links (hidden on small screens) */}
                <nav className='hidden md:flex font-semibold text-xl py-3 uppercase space-x-4'>
                    
                    
                    {/* Conditional rendering for login/register/logout */}
                    {isLoggedIn ? (
                        <>
                            <Link to='/logout' onClick={handleLogout} className={getLinkClassName('/logout')}>LOGOUT</Link>
                        </>
                    ) : (
                        <>
                        <button>
                            <Link to='/login' className='bg-blue-600 text-white hover:bg-grey-400 hover:text-black block rounded-md px-3  py-2 mx-5 font-semibold '>LOGIN</Link>
                        </button>
                        </>
                    )}
                </nav>
            </div>

            {/* Dropdown menu for mobile (visible when isDropdownOpen is true) */}
            {isDropdownOpen && (
                <div className='md:hidden bg-blue-600 p-4'>
                    <nav className='flex flex-col space-y-2 text-xl text-white text-center font-semibold'>
                        <Link to='/' onClick={toggleDropdown} className='hover:bg-grey-400 hover:text-black block rounded-md px-3  py-2 mx-5'>HOME</Link>
                        
                        {/* Conditional rendering for mobile */}
                        {isLoggedIn ? (
                            <>
                                <Link to='/logout' onClick={handleLogout} className='hover:bg-grey-400 hover:text-black block rounded-md px-3  py-2 mx-5'>Logout</Link>
                            </>
                        ) : (
                            <>
                                <Link to='/login' onClick={toggleDropdown} className='hover:bg-grey-400 hover:text-black block rounded-md px-3  py-2 mx-5'>Login</Link>
                            </>
                        )}
                    </nav>
                </div>
            )}
        </>
    );
}

export default Navbar;
