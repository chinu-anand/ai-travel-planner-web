import React from 'react'
import { Button } from '../ui/button'
import { LogIn } from 'lucide-react'

const Header = () => {
  return (
    <div className='p-4 shadow-sm flex justify-between items-center px-6'>
        <img src="/logo.svg" alt="logo" />
        <div>
            <Button>
              <LogIn /> Sign In</Button>
        </div>
    </div>
  )
}

export default Header