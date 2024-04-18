import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Header from './components/Header'
import Footer from './components/Footer'
import PrivateRoute from './components/PrivateRoute'
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute'
import CreatePost from './pages/CreatePost'
import UpdatePosts from './pages/UpdatePosts'

export default function App() {  
  return (
    <BrowserRouter>
    <Header/>

    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/signin" element={<Signin/>} />
      <Route path="/signup" element={<Signup/>} />

      {/* <Route element={<PrivateRoute/>}>:
      This route is evaluated first because it appears first in the code. Since it doesn't have a path prop, 
      it acts as a layout component, meaning it wraps around other routes. In this case, it wraps around the 
      "/dashboard" route. */}

      {/* <Route path="/dashboard" element={<Dashboard/>} />:
      This route matches the URL path /dashboard. When React Router evaluates this route, it will render the Dashboard 
      component as the element. However, because PrivateRoute is set as the element for the parent route, it will be 
      rendered first. */}
      
      <Route element = {<PrivateRoute/>} >
        <Route path="/dashboard" element={<Dashboard/>} />
      </Route>

      <Route element = {<OnlyAdminPrivateRoute/>} >
        <Route path="/create-post" element={<CreatePost/>} />
        <Route path="/update-post/:postId" element={<UpdatePosts/>} />
      </Route>

      {/* <Route path="/dashboard" element={<Dashboard/>}/> */}
      <Route path="/projects" element={<Projects/>} />
    </Routes>
    
    <Footer/>
    </BrowserRouter>
  )
}