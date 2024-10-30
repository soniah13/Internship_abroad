// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import Home from './Components/Home';
import Navbar from './Components/Navbar';


function Logout() {
    localStorage.clear();
    return <Navigate to="/login" />;
}

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('ACCESS_TOKEN'));

    const checkLoginStatus = () => {
        setIsLoggedIn(!!localStorage.getItem('ACCESS_TOKEN'));
    };

    // Update login status on localStorage changes
    useEffect(() => {
        window.addEventListener('storage', checkLoginStatus);
        return () => {
            window.removeEventListener('storage', checkLoginStatus);
        };
    }, []);

    return (
        <BrowserRouter>
            <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                <Route path='/logout' element={<Logout />} />
                <Route path='/register' element={<Register />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
