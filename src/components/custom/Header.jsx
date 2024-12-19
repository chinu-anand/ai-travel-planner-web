import React from 'react'
import { Button } from '../ui/button'
import { LogIn } from 'lucide-react'

const Header = () => {
  return (
    <div className='p-4 shadow-sm flex justify-between items-center px-6'>
      <img className='w-28 md:w-32' src="/logo.svg" alt="" />
      <div>
        <Button>
          <LogIn /> Sign In
        </Button>
      </div>
    </div>
  )
}

export default Header