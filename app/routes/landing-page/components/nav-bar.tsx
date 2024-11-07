import React from 'react';
import logo from '../images/logo.png'
const NavBar = () => {
  return (
    <nav className="bg-gradient-to-r from-purple-600 to-indigo-500 fixed w-full z-20 top-0 start-0 border-b border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto p-4">
        <a
          href="https://wenexus.io/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={logo} className="h-full " alt="shipping Logo" />
        </a>

      </div>
    </nav>
  );
};

export default NavBar;
