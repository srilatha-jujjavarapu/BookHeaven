import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader';
import { AiFillDelete } from "react-icons/ai";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
  const [cart, setCart] = useState();
  const [total, setTotal] = useState();
  const navigate = useNavigate();
  const headers = {
    id : localStorage.getItem("id"),
    authorization : `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(()=>{
    const fetch = async ()=>{
      const res = await axios.get("http://localhost:2000/api/v1/get-user-cart",{headers});
      setCart(res.data.data);
    };
    fetch();
  },[cart]);
  const deleteItem = async (bookid)=>{
    const response = await axios.put(`http://localhost:2000/api/v1/remove-from-cart/${bookid}`,{},{headers});
    toast.success(response.data.message);
  };
  useEffect(()=>{
    if(cart && cart.length > 0){
      let total = 0;
      cart.map((items)=>{
        total += items.price;
      });
      setTotal(total);
      total = 0;
    }
  },[cart])

  const placeOrder = async ()=>{
    try{
      const response = await axios.post("http://localhost:2000/api/v1/place-order",{orders : cart}, {headers});
      toast.success(response.data.message);
      navigate("/profile/orderhistory");
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className='bg-zinc-900 px-8 h-screen'>
      <ToastContainer />
    {!cart && (<div className='w-full flex items-center justify-center h-[100%]'><Loader/></div>)}
    {cart && cart.length === 0 && (
      <div className='h-screen'>
        <div className='h-[100%] flex items-center justify-center flex-col'>
          <h1 className='text-5xl lg:text-6xl font-semibold text-zinc-500'>Empty Cart</h1>
          <img src='./emptyCart.png' alt='/' className='lg:h-[50vh]'/>
        </div>
      </div>
    )}

    {cart && cart.length>0 && (
      <>
      <h1 className='text-5xl font-semibold text-zinc-500 mb--8'>Your cart</h1>
      {cart.map((items,i)=>(
        <div className='w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center' key={i}>
          <img src={items.url} alt="/" className='h-[20vh] md:h-[10vh] object-cover' />
          <div className='w-full md:w-auto'>
            <h1 className='text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0'>{items.title}</h1>
            <p className='text-normal text-zinc-300 mt-2 hidden lg:block'>{items.desc.slice(0,100)}...</p>
            <p className='text-normal text-zinc-300 mt-2 hidden lg:hidden md:block'>{items.desc.slice(0,65)}...</p>
            <p className='text-normal text-zinc-300 mt-2 md:hidden block'>{items.desc.slice(0,100)}...</p>
          </div>

          <div className='flex mt-4 w-full md:w-auto items-center justify-between'>
            <h2 className='text-zinc-100 text-3xl font-semibold flex'>₹ {items.price}</h2>
            <button className='bg-red-100 text-red-700 border border-red-700 rounded p-2 ms-12'
            onClick={()=>deleteItem(items._id)}>
            <AiFillDelete />
            </button>
          </div>
        </div>
      ))}
      </>
    )}
    {cart && cart.length > 0 && (
      <div className='mt-4 w-full flex items-center justify-end'>
        <div className='p-4 bg-zinc-800 rounded'>
          <h1 className='text-3xl text-zinc-200 font-semibold'>Total Amount</h1>
          <div className='mt-3 flex items-center justify-between text-xl text-zinc-200'>
            <h2>{cart.length} books</h2><h2>₹ {total}</h2>
          </div>
          <div className='w-[100%] mt-3'>
            <button className='bg-zinc-100 rounded px-4 py-2 flex justify-center w-full font-semibold hover:bg-zinc-900 transition-all duration-300'
            onClick={placeOrder} >Place your order</button>
          </div>
        </div>

      </div>
    )}

    </div>
  )
}

export default Cart