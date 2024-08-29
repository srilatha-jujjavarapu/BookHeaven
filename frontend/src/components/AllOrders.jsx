import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import { FaUserLarge, FaCheck } from 'react-icons/fa6';
import { IoOpenOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import SeeUserData from './SeeUserData';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllOrders = () => {
    const [allOrders, setAllOrders] = useState();
    const [options, setOptions] = useState(-1);
    const [values, setValues] = useState({ status: '' });
    const [userDiv, setUserDiv] = useState("hidden");
    const [userDivData, setUserDivData] = useState();
    const headers = {
        id: localStorage.getItem('id'),
        authorization: `Bearer ${localStorage.getItem('token')}`,
    };

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get('http://localhost:2000/api/v1/get-all-orders', { headers });
                setAllOrders(response.data.data);
            } catch (error) {
                toast.error('Error fetching orders:', error);
            }
        };
        fetch();
    }, []);

    const handleChange = (e) => {
        setValues({ status: e.target.value });
    };

    const submitChanges = async (i) => {
        const id = allOrders[i]._id;
        try {
            const response = await axios.put(`http://localhost:2000/api/v1/update-status/${id}`, values, { headers });
            toast.success(response.data.message);
            const updatedOrders = [...allOrders];
            updatedOrders[i] = { ...updatedOrders[i], status: values.status };
            setAllOrders(updatedOrders);
            setOptions(-1);
        } catch (error) {
            console.error('Error updating status:', error);
            toast.error('Failed to update status');
        }
    };

    return (
        <>
            {!allOrders && <div className='h-[100%] flex items-center justify-center'><Loader /></div>}

            {allOrders && allOrders.length > 0 && (
                <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
                    <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>All Orders</h1>
                    <div className='mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2'>
                        <div className='w-[3%]'>
                            <h1 className='text-center'>Sr.</h1>
                        </div>
                        <div className='w-[22%]'>
                            <h1>Books</h1>
                        </div>
                        <div className='w-[45%] hidden md:block'>
                            <h1>Description</h1>
                        </div>
                        <div className='w-[7%]'>
                            <h1>Price</h1>
                        </div>
                        <div className='w-[18%]'>
                            <h1>Status</h1>
                        </div>
                        <div className='w-[5%]'>
                            <h1><FaUserLarge /></h1>
                        </div>
                    </div>

                    {allOrders.map((items, i) => (
                        <div key={items._id} className='bg-zinc-800 w-full rounded py-2 px-4 flex gap-2 hover:cursor-pointer transition-all duration-300'>
                            <div className='w-[3%]'>
                                <h1 className='text-center'>{i + 1}</h1>
                            </div>
                            <div className='w-[22%]'>
                                <Link to={`/view-book-details/${items.book._id}`} className='hover:text-blue-300'>{items.book.title}</Link>
                            </div>
                            <div className='w-[45%] md:w-[45%] hidden md:block'>
                                <h1>{items.book.desc.slice(0, 50)}...</h1>
                            </div>
                            <div className='w-[7%]'>
                                <h1>₹ {items.book.price}</h1>
                            </div>
                            <div className='w-[18%]'>
                                <h1 className='font-semibold'>
                                    <button className='hover:scale-105 transition-all duration-300'
                                        onClick={() => setOptions(i)}>
                                        {items.status === 'Order Placed' ? (
                                            <div className='text-green-500'>{items.status}</div>
                                        ) : items.status === 'Canceled' ? (
                                            <div className='text-red-500'>{items.status}</div>
                                        ) : (
                                            <div className='text-yellow-500'>{items.status}</div>
                                        )}
                                    </button>
                                    <div className={`${options === i ? 'block' : 'hidden'} flex mt-4`}>
                                        <select name='status' value={values.status} className='bg-gray-800' onChange={handleChange}>
                                            {[ 'Out for delivery', 'Delivered', 'Canceled'].map((status, index) => (
                                                <option value={status} key={index}>{status}</option>
                                            ))}
                                        </select>
                                        <button className='text-green-500 hover:text-pink-600 mx-2'
                                            onClick={() => submitChanges(i)}>
                                            <FaCheck />
                                        </button>
                                    </div>
                                </h1>
                            </div>
                            <div className='w-[5%]'>
                                <button className='text-xl hover:text-orange-500'
                                    onClick={() => {
                                        setUserDiv('fixed');
                                        setUserDivData(items.user);
                                    }}>
                                    <IoOpenOutline />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {userDivData && (
                <SeeUserData userDivData={userDivData}
                userDiv={userDiv}
                setUserDiv={setUserDiv} />
            )}
            <ToastContainer />
        </>
    );
};

export default AllOrders;
