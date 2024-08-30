import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import BookCard from '../components/BookCard';
import axios from 'axios';

const AllBooks = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("http://localhost:2000/api/v1/get-all-books");
      setData(response.data.data);
    };
    fetch();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredBooks = data.filter(book =>
    book.title.toLowerCase().includes(searchQuery) || book.author.toLowerCase().includes(searchQuery)
  );

  return (
    <div className='bg-zinc-900 h-auto px-12 py-8'>
      <div className='flex justify-between items-center mb-8'>
        <h4 className='lg:text-3xl md:text-2xl text-xl text-green-200'>All Books</h4>
        <div className='relative'>
          <input
            type="search"
            id="search"
            className='bg-zinc-700 border border-zinc-600 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-4 py-2'
            placeholder="Search books..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <svg className='absolute inset-y-0 left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400' aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
        </div>
      </div>

      {!data.length && (<div className='w-full h-screen flex items-center justify-center'><Loader /></div>)}

      {filteredBooks.length === 0 ? (
        <div className='text-center h-screen text-4xl font-semibold flex flex-col items-center justify-center text-zinc-500'>
          <h2 className='mb-4'>No books found</h2>
          <img src='./notFound.png' className='h-[10vh] my-8 ' alt='/' />
        </div>
      ) : (
        <div className='my-8 grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 gap-8'>
          {filteredBooks.map((book, i) => (
            <div key={i}>
              <BookCard data={book} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllBooks;
