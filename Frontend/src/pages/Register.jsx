import React, { useState } from 'react';
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";

function Register() {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const handleChange = (e)=>{
        const {name, value} = e.target

        setData((prev)=>{
          return{
              ...prev,
              [name]:value
          }
        })
    }

    
  const validValue = Object.values(data).every(el => el)
  return (
    <section className=' w-full container mx-auto px-1 '>
        <div className=' bg-white  my-4 w-full max-w-lg mx-auto rounded p-4'>
                 <p>Welcome To Binkit..</p>

                 <form className='grid gap-4 mt-6'>
                    <div className='grid gap-1'>
                        <label htmlFor='name'>Name:</label>
                        <input
                           type='text'
                           id='name'
                           autoFocus
                           className='bg-blue-50 p-2 border rounded ouline-none focus-border-primary-200'
                           name='name'
                           value={data.name}
                           onChange={handleChange}
                           placeholder='Enter your name'
                        />
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor='email'>Email:</label>
                        <input
                           type='email'
                           id='email'
                           className='bg-blue-50 p-2 border rounded ouline-none focus-border-primary-200 '
                           name='email'
                           value={data.email}
                           onChange={handleChange}
                           placeholder='Enter your email'
                        />
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor='password'>Password:</label>
                       <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200'>
                       <input
                           type= {showPassword ? "text" : "password"}
                           id='password'
                           className='w-full outline-none'
                           name='password'
                           value={data.password}
                           onChange={handleChange}
                           placeholder='Enter your password'
                        />
                    <div onClick={()=> setShowPassword(prev => !prev)} className='cursor-pointer'>
                        {
                            showPassword ? (
                                   <FaEye/>
                            ) :(
                                   <FaEyeSlash/>
                            )
                        }
                       
                    </div>
                    </div>
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor='confirmPassword'>Confirm Password:</label>
                       <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200'>
                       <input
                           type= {showPassword ? "text" : "password"}
                           id='confirmPassword'
                           className='w-full outline-none'
                           name='confirmPassword'
                           value={data.confirmPassword}
                           onChange={handleChange}
                           placeholder='Enter your confirm password'
                        />
                    <div onClick={()=> setShowConfirmPassword(prev => !prev)} className='cursor-pointer'>
                        {
                            showConfirmPassword ? (
                                   <FaEye/>
                            ) :(
                                   <FaEyeSlash/>
                            )
                        }
                       
                    </div>
                    </div>
                    </div>

                    <button className={` ${validValue ? "bg-green-600" : "bg-gray-500"} text-white py-2 rounded font-semibold my-3 tracking-wide` }>Register</button>
                    
                 </form>
        </div>

    </section>
  )
}

export default Register