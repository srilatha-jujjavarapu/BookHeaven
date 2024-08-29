import React, { useState, useEffect } from 'react'
import axios from 'axios';
import BookCard from './BookCard';
import Loader from './Loader';

const RecentlyAdded = () => {
    const [data, setdata] = useState();
    useEffect(()=>{
        const fetch = async()=>{
            const response = await axios.get("http://localhost:2000/api/v1/get-recent-books");
            setdata(response.data.data);
        };
        fetch();
    },[])
  return (
    <div className='mt-8 px-4'>
        <h4 className='lg:text-3xl md:text-2xl text-xl text-green-200 '>Recently Added Books</h4>
        {!data && <div className='flex items-center justify-content my-8'><Loader /></div>}
        <div className='my-8 grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 gap-8'>
            
            {data && data.map((items,i)=><div key={i}><BookCard data={items} />{" "} </div>)}
        </div>
    </div>
  )
}

export default RecentlyAdded