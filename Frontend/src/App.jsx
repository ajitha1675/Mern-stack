import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './Component/Header';
import Footer from './Component/Footer';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import fetchUserDetails from '../utils/fetchUserDetails';
import { setUserDetails, useDispatch } from 'react-redux';

function App() {
  const dispatch =  useDispatch()

  const fetchUser = async()=>{
    const userData = await fetchUserDetails()
    console.log("userData",userData.data);  
    dispatch(setUserDetails(userData.data))
  }

  useEffect(()=>{
    fetchUser()
  },[])
  return (
    <>
      <Header />

      <main className='min-h-[80vh]'>
          <Outlet/>
      </main>
      <Footer/>
      <Toaster />
    </>

  )
}

export default App
