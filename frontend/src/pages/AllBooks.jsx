import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader'
import BookCard from '../components/BookCard'
import axios from 'axios'

const AllBooks = () => {
  const [data, setdata] = useState();
    useEffect(()=>{
        const fetch = async()=>{
            const response = await axios.get("http://localhost:2000/api/v1/get-all-books");
            setdata(response.data.data);
        };
        fetch();
    },[]);

  return (
    <div className='bg-zinc-900 h-auto px-12 py-8'>
      <h4 className='lg:text-3xl md:text-2xl text-xl text-green-200 '>All Books</h4>
        {!data && (<div className='w-full h-screen flex items-center justify-center h-[100%]'><Loader/></div>)}
        <div className='my-8 grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 gap-8'>
            
            {data && data.map((items,i)=><div key={i}><BookCard data={items} />{" "} </div>)}
        </div>
    </div>
  )
}

export default AllBooks