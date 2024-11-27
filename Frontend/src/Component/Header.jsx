import React from 'react';
import logo from '../assets/logo.jpg';
import Search from './Search';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaRegUserCircle } from "react-icons/fa";
import UseMobile from '../hooks/UseMobile';
import { BsCart4 } from 'react-icons/bs';


const Header = () => {
  const [isMobile] = UseMobile()
  const location = useLocation()
  const isSearchPage = location.pathname === '/search'
  const navigate = useNavigate()

  const redirectToLoginPage = ()=>{
       navigate('/login')
  }
   
  return (
   <header className='h-24 lg:h-20 lg:shadow-md sticky top-0  bg-white flex flex-col justify-center gap-1'>
      {
         (isSearchPage && isMobile)
      }
      <div className='container mx-auto flex items-center  px-2 justify-between'>
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
        <div className='hidden lg:block'>
            <Search/>         
        </div>

        {/** login and my cart */}
        <div className=''>
          {/**user icons display in only mobile version */}
          <button className='text-neutral-600 lg:hidden'>
               <FaRegUserCircle size={26}/>
          </button>

          {/**Desktop */}
          <div className='hidden lg:flex items-center gap-10'>
            <button onClick={redirectToLoginPage}>Login</button>  
            <button className='flex items-center gap-2 bg-green-900 hover:bg-green-500 px-3 py-3 rounded text-white'>
            <button>
              {/** Add to card icons */}
                <div className='animate-bounce'>
                    <BsCart4 size={26}/>
                </div>
                <div className='font-semibold'>
                    <p>My cart</p>
                </div>
            </button>
            </button>  
          </div>
        </div>

      </div>
      <div className='cotainer mx-auto px-2 lg:hidden '>
        <Search/>
      </div>
   </header>
  )
}

export default Header