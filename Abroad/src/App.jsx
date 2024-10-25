import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './Components/Login'
import Register from './Components/Register'
import Home from './Components/Home'
import Navbar from './Components/Navbar'

function Logout(){
  localStorage.clear()
  return <Navigate to="/login"/>
}

function App() {

  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      
      <Route path='/' element= {<Home/>}/>
      <Route path='/login' element= {<Login/>}/>
      <Route path='/logout' element= {<Logout/>}/>
      <Route path='/register' element= {<Register/>}/>
     
    </Routes>

    </BrowserRouter> 
    </>
  )
}

export default App
