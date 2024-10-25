import React, { useState, useEffect } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import Logo from './Logo';

function Navbar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // Check login status when the component mounts
    useEffect(() => {
        const token = localStorage.getItem('token'); // Adjust based on your auth logic
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogout = () => {
        localStorage.clear(); // Clear user data
        setIsLoggedIn(false); // Update state
        navigate('/login'); // Redirect to login page
    };

    return (
        <>
            {/* Navbar container */}
            <div className='flex justify-between items-center m-0 p-0 border border-solid border-2'>
                {/* Logo on the left */}
                <div className='pl-4'>
                    <Link to='/'>
                        <Logo />
                    </Link>
                </div>

                {/* Burger menu icon for mobile */}
                <div className='md:hidden pr-4 cursor-pointer'>
                    <i className='fas fa-bars' onClick={toggleDropdown} style={{ fontSize: '28px' }}></i>
                </div>

                {/* Navigation Links (hidden on small screens) */}
                <nav className='hidden md:flex font-semibold text-2xl py-3 uppercase space-x-4'>
                    <Link to='/' className='hover:border-b border-3 border-black px-3'>Home</Link>
                

                    {/* Conditional rendering for login/register/logout */}
                    {isLoggedIn ? (
                        <>
                        <Link to='/login' className='hover:border-b border-3 border-black px-3'>Login</Link>
                        <Link to='/register' className='hover:border-b border-3 border-black px-3'>Register</Link>
                        </>
                    ) : (
                        <>
                            <Link to='/logout'onClick={handleLogout} className='hover:border-b border-3 border-black px-3' >Logout</Link>
                        </>
                    )}
                </nav>
            </div>

            {/* Dropdown menu for mobile (visible when isDropdownOpen is true) */}
            {isDropdownOpen && (
                <div className='md:hidden bg-gray-400 p-4'>
                    <nav className='flex flex-col space-y-2 text-xl font-semibold'>
                        <Link to='/' onClick={toggleDropdown} className='hover:border-b border-3 border-black'>Home</Link>
        

                        {/* Conditional rendering for mobile */}
                        {isLoggedIn ? (
                            <>
                            <Link to='/login' className='hover:border-b border-3 border-black px-3'>Login</Link>
                            <Link to='/register' className='hover:border-b border-3 border-black px-3'>Register</Link>
                            </>
                        ) : (
                            <>
                                <Link to='/logout'onClick={handleLogout} className='hover:border-b border-3 border-black px-3' >Logout</Link>
                            </>
                        )}
                    </nav>
                </div>
            )}
        </>
    );
}

export default Navbar;
