import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import Jobs from './Components/Jobs';
import JobsDetails from './Components/JobsDetails';
import PostJobs from './Components/PostJobs';
import ProtectedRoute from './Components/ProtectedRoute';
import LostPage from './Components/LostPage';

function Logout() {
    localStorage.clear();
    return <Navigate to="/login" />;
}

function App() {
    const [internships, setInternships] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('ACCESS_TOKEN'));
    const [userType, setUserType] = useState(localStorage.getItem('userType') || 'student');

    useEffect(() => {
        const storedUserType = localStorage.getItem('userType');
        if (storedUserType) {
            setUserType(storedUserType);
        }
    }, []);

    const handleUserChange = (newUserType) => {
        setUserType(newUserType);
        localStorage.setItem('userType', newUserType);
    };

    const checkLoginStatus = () => {
        setIsLoggedIn(!!localStorage.getItem('ACCESS_TOKEN'));
    };

    useEffect(() => {
        window.addEventListener('storage', checkLoginStatus);
        return () => {
            window.removeEventListener('storage', checkLoginStatus);
        };
    }, []);

    return (
        <BrowserRouter>
            <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userType={userType} />
            <Routes>
                <Route path='/' element={<Home setUserType={handleUserChange} />} />
                <Route path='/jobs' element={<ProtectedRoute> <Jobs internships={internships} setInternships={setInternships} isLoggedIn={isLoggedIn} /></ProtectedRoute>} />
                <Route path='/post-jobs' element={<PostJobs internships={internships} setInternships={setInternships} />} />
                <Route path='/internship/:id/' element={<JobsDetails />} />
                <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} handleUserChange={handleUserChange} />} />
                <Route path='/logout' element={<Logout />} />
                <Route path='/register' element={<Register />} />
                <Route path='/lost' element={<LostPage/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
