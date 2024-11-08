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
import { ACCESS_TOKEN } from './constants';

function Logout() {
    localStorage.clear();
    return <Navigate to="/login" />;
}

function App() {
    const [internships, setInternships] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('ACCESS_TOKEN'));
    

    //sync login state with localstorage
    const checkLoginStatus = () => {
        setIsLoggedIn(!!localStorage.getItem('ACCESS_TOKEN'));
    };

    useEffect(() => {
       window.addEventListener('storage', checkLoginStatus);
       return () => window.removeEventListener('storage', checkLoginStatus);
    }, []);

    const role = localStorage.getItem('role');

   

    return (
        <BrowserRouter>
            <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} role={role} />
            <Routes>
                <Route path='/' element={<Home  />} />
                <Route path='/jobs' element={<ProtectedRoute  isLoggedIn={isLoggedIn} requiredRole='student' ><Jobs internships={internships} setInternships={setInternships} /></ProtectedRoute>} />
                <Route path='/post-jobs' element={<ProtectedRoute  isLoggedIn={isLoggedIn} requiredRole='employer'><PostJobs internships={internships} setInternships={setInternships} /></ProtectedRoute>} />
                <Route path='/internship/:id/' element={<JobsDetails />} />
                <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                <Route path='/logout' element={<Logout />} />
                <Route path='/register' element={<Register />} />
                <Route path='*' element={<LostPage/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
