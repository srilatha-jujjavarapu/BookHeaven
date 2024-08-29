import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const SignUp = () => {
  const [values, setValues] = useState({ username: "", email: "", password: "", address: "" });
  const [error, setError] = useState(""); 
  const navigate = useNavigate();

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    if (error) setError("");
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (values.username === "" || values.email === "" || values.password === "" || values.address === "") {
        setError("All fields are required");
      } else {
        const response = await axios.post("http://localhost:2000/api/v1/sign-up", values);
        alert(response.data.message);
        navigate("/login");
      }
    } catch (err) {
      setError(err.response.data.message || "An error occurred");
    }
  };

  return (
    <div className='h-screen bg-zinc-900 px-12 py-8 flex items-center justify-center'>
      <div className='bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6'>
        <p className='text-zinc-200 text-xl'>Sign Up</p>
        <form onSubmit={submit} className='mt-4'>
          <div>
            <label htmlFor='username' className='text-zinc-400'>Username</label>
            <input
              type='text'
              id='username'
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
              placeholder='username'
              name='username'
              required
              value={values.username}
              onChange={change}
            />
          </div>
          <div className='mt-4'>
            <label htmlFor='email' className='text-zinc-400'>Email</label>
            <input
              type='text'
              id='email'
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
              placeholder='abc@gmail.com'
              name='email'
              required
              value={values.email}
              onChange={change}
            />
          </div>
          <div className='mt-4'>
            <label htmlFor='password' className='text-zinc-400'>Password</label>
            <input
              type='password'
              id='password'
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
              placeholder='password'
              name='password'
              required
              value={values.password}
              onChange={change}
            />
          </div>
          <div className='mt-4'>
            <label htmlFor='address' className='text-zinc-400'>Address</label>
            <textarea
              id='address'
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
              rows='5'
              placeholder='address'
              name='address'
              required
              value={values.address}
              onChange={change}
            />
            {error && <p className='text-red-500 mt-2'>{error}</p>} 
          </div>
          <div className='mt-4'>
            <button
              type='submit'
              className='w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all duration-300'
            >
              SignUp
            </button>
          </div>
        </form>
        <p className='flex items-center mt-2 justify-center text-zinc-200 font-semibold'>or</p>
        <p className='flex mt-4 items-center justify-center text-zinc-400'>
          Already have an account? &nbsp;
          <Link to="/login" className='hover:text-blue-500'>
            <u>LogIn</u>
          </Link>
        </p>
      </div>
    </div>
  );
};
