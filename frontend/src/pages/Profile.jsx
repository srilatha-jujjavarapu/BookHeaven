import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Loader from '../components/Loader'
import MobileNav from '../components/MobileNav'
import { ToastContainer } from 'react-toastify'

const Profile = () => {
  const [profile, setProfile] = useState();
  const headers = {
    id : localStorage.getItem("id"),
    authorization : `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(()=>{
    const fetch = async () => {
      const response = await axios.get("http://localhost:2000/api/v1/get-user-information",{headers});
      setProfile(response.data);
    };

    fetch();
  },[]);
  return (
    <>
    <ToastContainer />
    <div className='bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row py-8 text-white gap-4'>
      {!profile && (<div className='w-full h-[100%] flex items-center h-screen justify-center'><Loader /></div>)}
      {profile && (<>
      <div className='w-full md:w-1/6 h-auto h-screen'><Sidebar data={profile}/>
      <MobileNav />
      </div>
      <div className=' w-full md:w-5/6'><Outlet /></div>
      </>)}
    </div>
    </>
  )
}

export default Profile