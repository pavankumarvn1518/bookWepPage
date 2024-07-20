import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className='min-h-screen flex flex-col md:flex-row items-center justify-center p-4'>
      <div className='w-full mb-12 md:w-3/6 flex flex-col items-center md:items-start justify-center text-center md:text-left'>
        <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-semibold text-yellow-100'>
          Discover Your Next Great Read
        </h1>
        <p className='mt-4 text-sm sm:text-lg md:text-xl text-zinc-300'>
          Uncover captivating stories, enriching knowledge, and endless
          inspiration in our curated collection of books.
        </p>
        <br />
        <div>
          <Link
            to="/all-books"
            className='text-yellow-100 text-lg sm:text-xl md:text-2xl font-semibold border border-yellow-100 px-3 py-2 sm:py-4 hover:bg-zinc-800 rounded-full'
          >
            Discover Books
          </Link>
        </div>
      </div>
      <div className='w-full md:w-3/6 h-auto flex items-center justify-center'>
        <img src="/bg.png" alt="hero" className='max-w-full h-auto' />
      </div>
    </div>
  );
};

export default Hero;
