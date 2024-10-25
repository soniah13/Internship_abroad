import React from 'react'
import { Link } from 'react-router-dom';


function nabar() {
    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const refreshToken = localStorage.getItem("refreshToken");
            if (refreshToken) {
                await axios.post("https://127.0.0.1:8000/api/logout", {refresh: refreshToken});
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");

                window.location.href = '/';
            }
        } catch (error) {
            console.log('failed to logout', error);
        }
    };
    const isloggedIn = !localStorage.getItem('accessToken')
  return (
    <>
    <nav>
        <ul>
            <li>
                
            </li>
        </ul>
    </nav>
      
    </>
  )
}

export default nabar
