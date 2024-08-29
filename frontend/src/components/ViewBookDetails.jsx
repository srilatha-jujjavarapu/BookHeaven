import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import { MdLanguage } from "react-icons/md";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { BiSolidEdit } from "react-icons/bi";
import 'react-toastify/dist/ReactToastify.css';

const ViewBookDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`http://localhost:2000/api/v1/get-book-by-id/${id}`);
      setData(response.data.data);
    };
    fetch();
  }, [id]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id
  };

  const handleFavourites = async () => {
    try {
      const response = await axios.put("http://localhost:2000/api/v1/add-book-to-favourite", {}, { headers });
      toast.success(response.data.message);
    } catch (err) {
      toast.error("Failed to add to favorites");
    }
  };

  const handleCart = async () => {
    try {
      const response = await axios.put("http://localhost:2000/api/v1/add-to-cart", {}, { headers });
      toast.success(response.data.message);
    } catch (err) {
      toast.error("Failed to add to cart");
    }
  };

  const deleteBook = async () => {
    try {
      const response = await axios.delete("http://localhost:2000/api/v1/delete-book", { headers });
      toast.success(response.data.message);
      navigate("/all-books");
    } catch (err) {
      toast.error("Failed to delete book");
    }
  };

  return (
    <>
    <ToastContainer />
      {data && (
        <div className='px-4 md:px-12 py-8 bg-zinc-900 flex flex-col lg:flex-row '>
          <div className='w-full lg:w-3/6'>
            <div className='bg-zinc-800 flex rounded justify-around lg:flex-row flex-col p-12'>
              <img src={data.url} alt='/' className='lg:h-[65vh] md:h-[60vh] h-[50vh] rounded ' />

              {isLoggedIn === true && role === "user" &&
                <div className='flex flex-col lg:flex-col md:flex-row lg:mt-0 items-center lg:justify-start justify-between  mt-4'>
                  <button className='bg-white rounded lg:rounded-full text-4xl lg:text-3xl p-3 text-red-700 flex items-center justify-center'
                    onClick={handleFavourites}>
                    <FaHeart /><span className='ms-4 block lg:hidden'>Favourites</span>
                  </button>

                  <button className='bg-blue-800 rounded lg:rounded-full text-4xl lg:text-3xl p-3 mt-8 md:mt-0 lg:mt-8 text-white flex items-center justify-center'
                    onClick={handleCart}>
                    <FaShoppingCart /><span className='ms-4 block lg:hidden'>Add to cart</span>
                  </button>
                </div>}

              {isLoggedIn === true && role === "admin" &&
                <div className='flex flex-col md:flex-row lg:flex-col flex-row lg:mt-0 items-center lg:justify-start justify-between  mt-4'>
                  <Link to={`/updatebook/${id}`} className='bg-white rounded lg:rounded-full text-4xl lg:text-3xl p-3 flex items-center justify-center'>
                    <BiSolidEdit /><span className='ms-4 text-xl block lg:hidden'>Edit</span>
                  </Link>

                  <button className='bg-white rounded lg:rounded-full text-4xl lg:text-3xl p-3 mt-8 md:mt-0 lg:mt-8 text-red-600 flex items-center justify-center'
                    onClick={deleteBook}>
                    <MdOutlineDelete /><span className='ms-4 block text-xl lg:hidden'>Delete Book</span>
                  </button>
                </div>}
            </div>
          </div>

          <div className='p-4 w-full lg:w-3/6'>
            <h1 className='text-4xl text-zinc-300 font-semibold'>{data.title}</h1>
            <p className='text-zinc-400 mt-1'>by {data.author}</p>
            <p className='text-zinc-500 mt-4 text-xl'>{data.desc}</p>
            <p className='flex mt-4 items-center justify-start text-zinc-400'>
              <MdLanguage /> {data.language}
            </p>
            <p className='text-zinc-100 mt-4 text-3xl font-semibold'>Price : ₹ {data.price}</p>
          </div>
        </div>)}

      {!data && <div className='h-screen bg-zinc-900 flex justify-center align-items'><Loader /></div>}
    </>
  )
}

export default ViewBookDetails;
