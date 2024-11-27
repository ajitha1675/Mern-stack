import React, { useState } from 'react'

function Register() {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const handleChange = (e)=>{
        const {name, value} = e.target

        setData((prev)=>{
          return{
              ...prev,
              [name]:value
          }
        })
    }

    console.log("data", data);
    
  return (
    <section className=' w-full container mx-auto px-1 '>
        <div className=' bg-white  my-4 w-full max-w-lg mx-auto rounded p-4'>
                 <p>Welcome To Binkit..</p>

                 <form className='grid gap-4 mt-6'>
                    <div className='grid gap-2'>
                        <label htmlFor='name'>Name:</label>
                        <input
                           type='text'
                           id='name'
                           autoFocus
                           className='bg-blue-50 p-2'
                           name='name'
                           value={data.name}
                           onChange={handleChange}
                        />
                    </div>
                    <div className='grid gap-2'>
                        <label htmlFor='password'>Password:</label>
                        <input
                           type='text'
                           id='email'
                           className='bg-blue-50 p-2'
                           name='email'
                           value={data.email}
                           onChange={handleChange}
                        />
                    </div>
                 </form>
        </div>

    </section>
  )
}

export default Register