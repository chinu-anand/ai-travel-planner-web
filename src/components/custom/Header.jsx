import React from 'react'
import { Button } from '../ui/button'
import { LogIn } from 'lucide-react'

const Header = () => {
  return (
    <div className='p-2 shadow-md flex justify-between items-center px-6'>
        <img src="/logo.svg" alt="logo" />
        <div>
            <Button className='bg-[#640D5F]'>
              <LogIn /> Sign In</Button>
        </div>
    </div>
  )
}

export default Header