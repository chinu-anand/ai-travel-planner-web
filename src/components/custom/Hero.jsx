import React from 'react'
import { Button } from '../ui/button'

const Hero = () => {
  return (
    <div className='flex flex-col items-center mx-56 gap-9'>
      <h1 className='text-[3rem] text-center font-extrabold mt-8'>
        <span className='text-[#FF6600]'>Discover Your Next Adventure with AI:</span> Personalised Iternaries at Your Fingertips</h1>
      <p className='text-xl text-center text-gray-500'>Your personal trip planner and travel curator, creating custom iternaries tailored to your interests and budget.</p>

      <Button>Get Started, It's Free</Button>
    </div>
  )
}

export default Hero