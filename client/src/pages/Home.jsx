import React, { useEffect, useState } from 'react'
import {  Button } from 'flowbite-react';
import { Link } from 'react-router-dom';
import Calltoaction from '../components/Calltoaction';
import PostCard from '../components/PostCard';

export default function Home() {
  const [posts,setPosts] = useState([]);

  useEffect(()=>{
    const fetchPosts = async() => {
      const res = await fetch(`/api/post/getPosts`);
      const data = await res.json();
      setPosts(data.posts);
    }
    fetchPosts();
  },[]);

  return (
    <div>
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        {/* <h1 className='text-3xl font-bold lg:text-6xl'>Welcome to MERNify</h1> */}
        <h1 className='text-3xl font-bold lg:text-6xl animate-bounce'>Welcome to MERNify</h1>
        {/* <p className='text-gray-500 text-lg sm:text-sm animate-slideFromLeft'>
        
          Here you'll find a variety of articles and resources on topics such as web development, mern stack, 
          and programming languages. 
        </p> */}
        <h2 className=' text-black dark:text-white animate-slideFromLeft'>
        
        Here you'll find a variety of articles and resources on topics such as web development, mern stack, 
        and programming languages. 
      </h2>
      <Button  bg-gradient-to-r from-blue-500 to-blue-800 className='rounded-tl-xl rounded-bl-none'>
            <a href="https://www.geeksforgeeks.org/mern-stack-projects/" target='_blank' rel='noopener noreferrer'>MERN Projects</a>
        </Button>
        {/* <p id="animated-text" class="text-gray-500 text-lg sm:text-sm overflow-hidden">
            Here you'll find a variety of articles and resources on topics such as web development, MERN stack, and programming languages.
        </p> */}
        {/* <Link to='/search' className='text-xs sm:text-sm text-teal-500 font-bold hover:underline'>
        View all posts
      </Link> */}
      </div>
      {/* <div className='p-3 bg-amber-100 dark:bg-slate-700'>
        <Calltoaction/>
      </div> */}

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-1">
        {
          posts && posts.length > 0 && (
            <div className="flex flex-col gap-6">
              <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
              <div className="flex flex-wrap gap-4 justify-center">
                {
                  posts.map((post) => (
                    <PostCard key={post._id} post={post} />
                  ))
                }
              </div>
              <Link to={'/search'} className='text-lg text-teal-500 hover:underline text-center'>View all posts</Link>
            </div>
          )
        }
      </div>
    </div>
  )
}
