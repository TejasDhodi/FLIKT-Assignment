import React, { useEffect, useState } from 'react'
import Login from './Pages/Login'
import Register from './Pages/Register'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Home from './Pages/Home'
import Navbar from './Components/Navbar'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from './Features/UserSlice'
import UpdateData from './Pages/UpdateData'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {

  const jwtToken = JSON.parse(localStorage.getItem('jwtToken'));
  console.log('My Tokennnn : ', jwtToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleVerifiedUser = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/userProfile', {
        headers: {
          "Authorization": `Bearer ${jwtToken}`,
          "Content-Type": 'application/json'
        }
      })

      if (response.status === 200) {
        console.log('Verified user Profile : ', response.data);
        dispatch(getUser(response.data))
      }
    } catch (error) {
      console.log('Unable to get the data of verified user');
    }
  }

  useEffect(() => {
    if (jwtToken) {
      handleVerifiedUser();
    }

    if (!jwtToken) {
      navigate('/login')
    }
  }, [])

  useEffect(() => {
    JSON.parse(localStorage.getItem('jwtToken'))
  }, [])

  return (
    <div>
      <Navbar />
      {

      }
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        {
          jwtToken && <>
            <Route path='/' element={<Home />} />
            <Route path='/update/:id' element={<UpdateData />} />
          </>
        }
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App
