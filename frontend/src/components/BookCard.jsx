import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookCard = ({ data, favourite }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: data._id,
  };

  const handleRemoveBook = async () => {
    try {
      const response = await axios.put("http://localhost:2000/api/v1/remove-book-from-favourite", {}, { headers });
      toast.success(response.data.message);
    } catch (err) {
      toast.error("Failed to remove book from favourites");
    }
  };

  return (
    <>
      <div className='bg-zinc-800 rounded p-4 flex flex-col transition-transform transform hover:scale-110 hover:shadow-xl hover:shadow-black/60'>
        <Link to={`/view-book-details/${data._id}`}>
          <div className='bg-zinc-800 rounded h-[50vh] p-4 flex flex-col'>
            <div className='bg-zinc-900 rounded flex items-center justify-center'>
              <img src={data.url} alt={data.title} className='h-[25vh]' />
            </div>
            <h2 className='mt-4 text-xl text-white font-semibold'>{data.title}</h2>
            <p className='mt-2 text-zinc-400 font-semibold'>by {data.author}</p>
            <p className='mt-2 text-zinc-200 text-xl font-semibold'>₹ {data.price}</p>
          </div>
        </Link>
        {favourite && (
          <button
            className='bg-red-50 text-red-500 px-4 py-2 rounded border border-red-500 mt-4'
            onClick={handleRemoveBook}
          >
            Remove from favourites
          </button>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default BookCard;
