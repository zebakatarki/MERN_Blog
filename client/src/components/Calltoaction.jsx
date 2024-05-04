import { Button } from 'flowbite-react'
import React from 'react'

export default function Calltoaction() {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl 
    rounded-br-3xl text-center'>
      <div className='flex-1 justify-center flex flex-col'>
        <h2 className='text-2xl'>
            Want to learn more about MERN Stack?
        </h2>
        <p className='text-gray-500 my-2'>
            Checkout these MERN Stack Projects with Source Code!
        </p>
        <Button gradientDuoTone='purpleToPink' className='rounded-tl-xl rounded-bl-none'>
            <a href="https://www.geeksforgeeks.org/mern-stack-projects/" target='_blank' rel='noopener noreferrer'>MERN Projects</a>
        </Button>
      </div>
      <div className='p-14 flex-2'>
        <img src="https://www.dotsquares.com/img/mern-stack-inner.jpg"></img>
      </div>
    </div>
  )
}
