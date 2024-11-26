import React, { useEffect, useState } from 'react';
import { IoSearchOutline } from "react-icons/io5";
import { useLocation, useNavigate } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';

const Search = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [isSearchPage, setIsSearchPage] = useState(false)

    useEffect(()=>{
         const isSearch = location.pathname === "/search"
         setIsSearchPage(isSearch)
    },[location])


    const redirectToSearchPage = ()=>{
        navigate("/search")
    }

    console.log("search", isSearchPage);
    
  return (
    <div className='w-full min-w-[300px] lg:min-w-[420px] h-7 rounded-lg border overflow-hidden flex items-center text-neutral-500 bg-slate-200 group-focus-within:border primary-200 outline'>
        <button className='flex justify-center items-center h-full p-3 group-focus-within:text-primary-200'>
            <IoSearchOutline size={22}/>
        </button>
        <div className='w-full h-full '>
           {
               !isSearchPage ? (
                // not in search page
                <div onClick={redirectToSearchPage} className='w-full h-full items-center'>
                <TypeAnimation
                   sequence={[
                     // Same substring at the start will only be typed out once, initially
                     'Search "Milk"',
                     1000, // wait 1s before replacing "Mice" with "Hamsters"
                     'Search "Fruits"',
                     1000,
                     'Search "Vegetables"',
                     1000,
                     'Search "Chocolates"',
                     1000,
                     'Search "Rice"',
                     1000,
                     'Search "Egg"',
                     1000,
                     'Search "Bread"',
                     1000,
                     'Search "Chips"',
                     1000,
                     'Search "Sugar"',
                     1000,
                     'Search "Panner"',
                     1000,
                     'Search "Pickle"',
                     1000
                   ]}
                    wrapper="span"
                    speed={50}
                    repeat={Infinity}
            />
                </div>
               ) : (
                //when i was search page
                 <div className='w-full h-full'>
                    <input
                       type='text'
                       placeholder='Search for Atta Dal and More..'
                       autoFocus={true}
                       className='bg-transparent w-full '
                      />
                 </div>
               )
           }
        </div>
      
    </div>
  )
}

export default Search