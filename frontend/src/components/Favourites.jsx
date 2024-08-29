import axios from 'axios'
import React, { useEffect, useState } from 'react'
import BookCard from './BookCard';
import { ToastContainer } from 'react-toastify';
const Favourites = () => {
    const [favouriteBooks , setFavouriteBooks] = useState();
    const headers = {
        id : localStorage.getItem("id"),
        authorization : `Bearer ${localStorage.getItem("token")}`,
      };
    useEffect(()=>{
        const fetch = async() =>{
            const response = await axios.get("http://localhost:2000/api/v1/get-favourite-books",{headers});
            setFavouriteBooks(response.data.data);
        };
        fetch();
    },[favouriteBooks])
  return (
    <>
    <ToastContainer />
    { favouriteBooks && favouriteBooks.length === 0 && (<div className='text-zinc-500 text-5xl font-semibold w-full flex flex-col items-center justify-center h-[100%]'>
        No Favourite Books
        <img src='./fav-book.png' alt='star' className='h-[10vh] my-8' />
        </div>)}
    
    <div className='grid grid-cols-4 gap-4'>
        
        {favouriteBooks && favouriteBooks.map((items,i)=>(
            <div key={i}>
                <BookCard data={items} favourite={true} />
            </div>

        ))}
    </div>

    </>
    
  )
}

export default Favourites