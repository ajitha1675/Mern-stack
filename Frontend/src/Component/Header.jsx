import React from 'react';
import logo from '../assets/logo.jpg';
import Search from './Search';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
   <header className='h-20 shadow-md sticky top-0'>
      <div className='container mx-auto flex items-center h-full px-2 justify-between'>
                   {/** logo */}
          <div className='h-full'>
            <Link to={"/"} className='h-full flex justify-center items-center'>
              <img
                 src={logo}
                 width={100}
                 height={60}
                 alt='logo' 
                 className='hidden lg:block'
              />
              <img
                 src={logo}
                 width={100}
                 height={60}
                 alt='logo' 
                 className='lg:hidden'
              />
            </Link>
          </div>

        {/**search */}
        <div>
            <Search/>         
        </div>

        {/** login and my cart */}
        <div className='hidden lg:block'>
            Login and my cart
        </div>

      </div>
   </header>
  )
}

export default Header