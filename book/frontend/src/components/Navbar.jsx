import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGripLines } from 'react-icons/fa';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { title: "Home", link: "/" },
    { title: "AllBooks", link: "/all-books" },
    { title: "Cart", link: "/cart" },
    { title: "Profile", link: "/profile" },
  ];

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <nav className='z-50 flex bg-zinc-800 text-white px-4 py-4 items-center justify-between'>
        <div className='flex items-center'>
          <Link to="/" className='flex items-center'>
            <img
              src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png"
              className='h-10 mr-4'
              alt="logo"
            />
            <h1 className='text-2xl font-semibold'>BookHeaven</h1>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className='hidden md:flex flex-grow justify-end items-center gap-4'>
          {links.map((item, i) => (
            <Link
              to={item.link}
              className='hover:text-blue-500 transition-all duration-300'
              key={i}
            >
              {item.title}
            </Link>
          ))}
          <div className='flex gap-4 ml-8'>
            <Link
              to="/login"
              className='px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'
            >
              Login
            </Link>
            <Link
              to="/signup"
              className='px-4 py-1 bg-blue-500 text-zinc-800 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'
            >
              Sign Up
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className='md:hidden flex items-center'>
          <button className='text-white text-2xl hover:text-zinc-400' onClick={toggleMenu}>
            <FaGripLines />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`${menuOpen ? 'block' : 'hidden'} md:hidden bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}>
        {links.map((item, i) => (
          <Link
            to={item.link}
            className='text-white text-4xl mb-8 font-semibold hover:text-blue-500 transition-all duration-300'
            key={i}
            onClick={toggleMenu}
          >
            {item.title}
          </Link>
        ))}
        <Link
          to="/login"
          className='px-8 mb-8 text-3xl font-semibold py-2 border border-blue-500 rounded text-white hover:bg-white hover:text-zinc-800 transition-all duration-300'
          onClick={toggleMenu}
        >
          Login
        </Link>
        <Link
          to="/signup"
          className='px-8 mb-8 text-3xl font-semibold py-2 bg-blue-500 text-zinc-800 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'
          onClick={toggleMenu}
        >
          Sign Up
        </Link>
      </div>
    </>
  );
};

export default Navbar;
