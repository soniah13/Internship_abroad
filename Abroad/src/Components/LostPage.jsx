import React from 'react';
import { useNavigate } from 'react-router-dom';

function LostPage() {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('');
    };

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <div className='relative flex items-center justify-center h-screen bg-cover bg-center' style={{ backgroundImage: "url(/src/assets/Images/home.jpg)" }}>
            <div className='absolute inset-0 bg-black opacity-50'></div>
            <div className='relative z-10 text-center text-white p-6'>
                <h1 className='text-4xl md:text-5xl font-bold mb-4 sm:text-2xl'>404 PAGE!<br/> <span className='text-green-400 px-6'> YOU WERE LOST BUT NOW ARE FOUND</span></h1>
                <p className='text-2xl md:text-xl mb-8 font-semibold'>
                    Please Log in or Register to explore the website and access all features!
                </p>
                <div className='flex gap-4 justify-center'>
                    <button onClick={handleLogin} className='px-6 py-3 bg-green-600 hover:bg-green-400 text-white font-bold rounded-md transition-colors duration-300'>
                        Login
                    </button>
                    <button onClick={handleGoHome} className='px-6 py-3 bg-blue-600 hover:bg-blue-400 text-white font-bold rounded-md transition-colors duration-300'>
                        Go Home
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LostPage;
