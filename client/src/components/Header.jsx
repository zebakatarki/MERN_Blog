import { Avatar, Button, Dropdown, DropdownDivider, Navbar, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom'; //Link for routes and useLocation to active the links 
import {AiOutlineSearch} from 'react-icons/ai';
import {FaMoon, FaSun} from 'react-icons/fa';
import {useSelector, useDispatch} from 'react-redux';

import { toggleTheme } from '../redux/theme/themeSlice';
import { signoutSuccess } from '../redux/user/userSlice';

export default function Header() {
  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {currentUser} = useSelector((state) => state.user);
  const {theme} = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState('');
  console.log(searchTerm);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSignOut = async () => {
    try{
      const res = await fetch('/api/user/signout',{
        method:'POST',
      });
      const data = await res.json();
      if(!res.ok){
        console.log(data.message);
      }else{
        dispatch(signoutSuccess());
      }
    }catch(error){
      console.log(error.message);
    }
  }

//changing in search bar appears in query
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);

  }

  return (
    <Navbar className='border-b-2 h-19'>
      <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to bg-pink-500 rounded-lg text-white'>MERN</span>
        ify
      </Link>

      <form onSubmit={handleSubmit}>
        <TextInput 
          type="text"
          placeholder='search...'
          rightIcon={AiOutlineSearch}
          className='hidden lg:inline'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} //hidden in all sizes but large screen overrides this and inline on large screen
        />
      </form>
      <Button className='w-12 h-10 lg:hidden' color='gray' pill>  {/* hidden in large */}
        <AiOutlineSearch />
      </Button>

      {/* in small size after menu and in medium or lager size at te end */}
      <div className='flex gap-2 md:order-2'>
      {/* hidden in all sizes but small screen overrides this and inline on small screen */}
        <Button className='w-12 h-10 hidden sm:inline' color='gray' pill onClick={()=>dispatch(toggleTheme())}> 

        {theme === 'light' ? <FaMoon/> : <FaSun/> }
          
        </Button>

        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label = {
              <Avatar
              alt='user'
              img={currentUser.profilePicture}
              rounded
              />
            }
          >

            <Dropdown.Header>
              <span className='block text-sm'>@{currentUser.username}</span>
              {/* truncate if tthe email  is longer than it will show that as ........ */}
              <span className='block text-sm font-medium truncate'>{currentUser.email}</span> 
            </Dropdown.Header>
            <Link to={'/dashboard?tab=profile'}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <DropdownDivider/>
            <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
          </Dropdown>

        ) : (
          <Link to='/signin'>
          <Button gradientDuoTone='purpleToBlue' outline>
            Sign In
          </Button>
        </Link>
        )
      } 
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
