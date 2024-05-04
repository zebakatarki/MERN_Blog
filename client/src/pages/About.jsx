import React from 'react'

export default function About() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className="max-w-2xl mx-auto p-3 text-center">
        <div>
          <h1 className='text-3xl font-semibold text-center my-7'>About MERNify</h1>
          <div className="text-md text-gray-500 flex flex-col gap-6">
            <p>
              Welcome to MERNify, your gateway to the dynamic realm of web development! 
              We created this platform to share my journey and insights into mastering the 
              MERN stack - MongoDB, Express.js, React, and Node.js. As a recent graduate, I'm passionately honing 
              my coding skills and exploring the endless possibilities this technology offers.
            </p>
            <p>
              Join me on this exhilarating adventure as we delve into the intricacies of MERN stack development and
              uncover innovative project ideas together. Whether you're a seasoned developer or a curious enthusiast, 
              there's something here for everyone.
            </p>
            <p>
              Let's embark on this collaborative journey and unlock the full potential of web development. 
              I invite you to dive into my blog posts, explore new concepts, and ignite your passion for coding. 
              Together, let's build, innovate, and create remarkable experiences on the web.
            </p>
            <p>Thank you for joining me on this exhilarating voyage. Enjoy exploring MERNify!</p>
          </div>
        </div>
      </div>
    </div>
  )
}
