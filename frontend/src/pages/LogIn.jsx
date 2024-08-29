import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authActions } from '../store/auth';
import { useDispatch } from 'react-redux';

const LogIn = () => {
  const [values, setValues] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    if (error) setError("");
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (values.username === "" || values.password === "") {
        setError("All fields are required");
      } else {
        const response = await axios.post("http://localhost:2000/api/v1/sign-in", values);
        dispatch(authActions.login());
        dispatch(authActions.changeRole(response.data.role));
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        navigate("/profile");
      }
    } catch (err) {
      setError(err.response.data.message || "An error occurred");
    }
  }

  return (
    <div className='h-screen bg-zinc-900 px-12 py-8 flex items-center justify-center'>
      <div className='bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6'>
        <p className='text-zinc-200 text-xl'>LogIn</p>
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
          {error && <p className='text-red-500 mt-2'>{error}</p>}
          <div className='mt-4'>
            <button
              type='submit'
              className='w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all duration-300'
            >
              LogIn
            </button>
          </div>
        </form>
        <p className='flex items-center mt-2 justify-center text-zinc-200 font-semibold'>or</p>
        <p className='flex mt-4 items-center justify-center text-zinc-400'>
          Don't have an account? &nbsp;
          <Link to="/signup" className='hover:text-blue-500'>
            <u>SignUp</u>
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LogIn;
