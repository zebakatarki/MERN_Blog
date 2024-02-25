import { Button, Navbar, TextInput } from 'flowbite-react'
import React from 'react';
import {Link, useLocation} from 'react-router-dom'; //Link for routes and useLocation to active the links 
import {AiOutlineSearch} from 'react-icons/ai';
import {FaMoon} from 'react-icons/fa';


export default function Header() {
  const path = useLocation().pathname;
  return (
    <Navbar className='border-b-2'>
      <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to bg-pink-500 rounded-lg text-white'>Zeba's</span>
        Blog
      </Link>

      <form>
        <TextInput 
          type="text"
          placeholder='search...'
          rightIcon={AiOutlineSearch}
          className='hidden lg:inline' //appear only in large (hidden means in medium and small size)
        />
      </form>
      <Button className='w-12 h-10 lg:hidden' color='gray' pill>  {/* hidden in large */}
        <AiOutlineSearch />
      </Button>

      {/* in small size after menu and in medium or lager size at te end */}
      <div className='flex gap-2 md:order-2'>
        {/* small hidden large and medium appear */}
        <Button className='w-12 h-10 hidden sm:inline' color='gray' pill> 
          <FaMoon></FaMoon>
        </Button>

        <Link to='/signin'>
          <Button gradientDuoTone='purpleToBlue'>
            Sign In
          </Button>
        </Link>

        <Navbar.Toggle />
      </div>

      <Navbar.Collapse>
      {/* as={'div'} = To avoid the error which occurs bcz we have added Navbar.Link and another Link inside it basically 2 links */}
          <Navbar.Link active={path === "/"} as={'div'}>
            <Link to='/'>Home</Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/about"} as={'div'}>
            <Link to='/about'>About</Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/projects"} as={'div'}>
            <Link to='/projects'>Projects</Link>
          </Navbar.Link>
        </Navbar.Collapse>

    </Navbar>
  )
}
