import React from 'react'
import Calltoaction from '../components/Calltoaction'

export default function Projects() {
  return (
    <div className='min-h-screen max-w-5xl mx-auto flex justify-center items-center flex-col gap-6 p-3'>
      <h1 className='text-3xl font-semibold'>Projects</h1>
      <p className='text-md text-gray-500'>Build your knowledge while learning MongoDB, Express.js, React.js, Node.js.
        <Calltoaction/>
      </p> 
    </div>
  )
}
