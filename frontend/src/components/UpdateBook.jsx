import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const UpdateBook = () => {
    const [data , setData] = useState({
        url : "",
        title : "",
        author : "",
        price : "",
        desc : "",
        language : "",
    });
    const {id} = useParams();
    const navigate = useNavigate();
    const headers = {
        id : localStorage.getItem("id"),
        authorization : `Bearer ${localStorage.getItem("token")}`,
        bookid : id
      };
      const handleChange = (e) =>{
        const {name, value} = e.target;
        setData({...data, [name] : value});
      };
      const submit = async() =>{
        try{
            if(data.url === "" || data.title === "" || data.author === "" || data.price === "" || data.desc === "" || data.language === ""){
                alert("All fields are required");
            }else{
                const response = await axios.put("http://localhost:2000/api/v1/update-book",data,{headers});
                setData({
                    url : "",
                    title : "",
                    author : "",
                    price : "",
                    desc : "",
                    language : ""
                });
                alert(response.data.message);
                navigate(`/view-book-details/${id}`)
            }
        }catch(err){
            toast.success(err.response.data.message);
            
        }
      };
      useEffect(()=>{
        const fetch = async()=>{
            const response = await axios.get(`http://localhost:2000/api/v1/get-book-by-id/${id}`);
            setData(response.data.data);
        };
        fetch();
    },[]);
  return (
    <div className='bg-zinc-900 h-[100%] p-0 md:p-4'>
        <ToastContainer />
        <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>Update Book</h1>
        <div className='p-4 bg-zinc-800 rounded'>
            <div>
                <label htmlFor='' className='text-zinc-400'>Image</label>
                <input type='text' className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                placeholder='Url of image'
                name='url'
                required
                value={data.url}
                onChange={handleChange}/>
            </div>
            <div className='mt-4'>
                <label htmlFor='' className='text-zinc-400'>Title of Book</label>
                <input type='text' className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                placeholder='Title of Book'
                name='title'
                required
                value={data.title}
                onChange={handleChange} />
            </div>
            <div className='mt-4'>
                <label htmlFor='' className='text-zinc-400'>Author of Book</label>
                <input type='text' className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                placeholder='Author of Book'
                name='author'
                required
                value={data.author}
                onChange={handleChange} />
            </div>
            <div className='mt-4 flex gap-4'>
            <div className='w-3/6'>
                <label htmlFor='' className='text-zinc-400'>Language of Book</label>
                <input type='text' className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                placeholder='Language of Book'
                name='language'
                required
                value={data.language}
                onChange={handleChange} />
            </div>
            <div className='w-3/6'>
                <label htmlFor='' className='text-zinc-400'> Price</label>
                <input type='number' className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                placeholder='Price'
                name='price'
                required
                value={data.price}
                onChange={handleChange} />
            </div>
            </div>
            <div className='mt-4'>
                <label htmlFor='' className='text-zinc-400'>Title of Book</label>
                <textarea className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                rows='5'
                placeholder='Description of book'
                name='desc'
                required
                value={data.desc}
                onChange={handleChange} />
            </div>
            <button className='mt-4 px-3 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all duration-300'
            onClick={submit}>Update Book</button>
        </div>
    </div>
  )
}

export default UpdateBook