import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Login from './components/Login'
import blogService from './services/blogs'
import './App.css'
import './index.css'
import { Route, Routes } from 'react-router-dom'
import Register from './components/Register'
import { ThemeProvider } from './components/ThemeProvider'
import { Toaster } from './components/ui/toaster'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [auth, setAuth] = useState(null)
  
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON !== undefined) {
      try {
        const us = JSON.parse(loggedUserJSON)
        setUser(us)
        setAuth({ headers: { Authorization: `Bearer ${us.token}` } })
      } catch (error) {
        console.error(error);
      }
    }
  }, [])

  useEffect(() => {
    blogService.getAll()
      .then(blogs => setBlogs(blogs))
    
  }, [auth])
  
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route path='/' element={
            <Blogs setBlogs={setBlogs} setUser={setUser} user={user} blogs={blogs} auth={auth}/>
          }/>
          <Route path='/login' element={
            <Login user={user} setAuth={setAuth} setUser={setUser}/>
          }/>
          <Route path='/register' element={
            <Register/>
          }/>
        </Routes>
        <Toaster/>
    </ThemeProvider>
  )
}

export default App
