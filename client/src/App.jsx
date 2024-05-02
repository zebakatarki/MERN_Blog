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
import Postpage from './pages/Postpage'
import ScrolltoTop from './components/ScrolltoTop'
import Search from './pages/Search'

export default function App() {  
  return (
    <BrowserRouter>
    <ScrolltoTop/>
    <Header/>

    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/signin" element={<Signin/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path='/search' element={<Search />} />

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
      <Route path="/post/:postSlug" element={<Postpage/>} />
    </Routes>
    
    <Footer/>
    </BrowserRouter>
  )
}

// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import About from './pages/About';
// import SignIn from './pages/SignIn';
// import Dashboard from './pages/Dashboard';
// import Projects from './pages/Projects';
// import SignUp from './pages/SignUp';
// import Header from './components/Header';
// import Footer from './components/Footer';
// import PrivateRoute from './components/PrivateRoute';
// import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute';
// import CreatePost from './pages/CreatePost';
// import UpdatePost from './pages/UpdatePost';
// import PostPage from './pages/PostPage';
// import ScrollToTop from './components/ScrollToTop';
// import Search from './pages/Search';

// export default function App() {
//   return (
//     <BrowserRouter>
//       <ScrollToTop />
//       <Header />
//       <Routes>
//         <Route path='/' element={<Home />} />
//         <Route path='/about' element={<About />} />
//         <Route path='/sign-in' element={<SignIn />} />
//         <Route path='/sign-up' element={<SignUp />} />
//         <Route path='/search' element={<Search />} />
//         <Route element={<PrivateRoute />}>
//           <Route path='/dashboard' element={<Dashboard />} />
//         </Route>
//         <Route element={<OnlyAdminPrivateRoute />}>
//           <Route path='/create-post' element={<CreatePost />} />
//           <Route path='/update-post/:postId' element={<UpdatePost />} />
//         </Route>

//         <Route path='/projects' element={<Projects />} />
//         <Route path='/post/:postSlug' element={<PostPage />} />
//       </Routes>
//       <Footer />
//     </BrowserRouter>
//   );
// }