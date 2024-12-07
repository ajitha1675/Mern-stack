import React from 'react'
import { useSelector } from 'react-redux'

function UserMenu() {
   const user = useSelector((state) => state.user)
  return (
    <div>
        <div className='font-semibold'></div>
    </div>
  )
}

export default UserMenu
