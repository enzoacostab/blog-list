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
import userService from '@/services/users'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [auth, setAuth] = useState(null)
  const [userId, setUserId] = useState(null)
  
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      try {
        const loggedUser = JSON.parse(loggedUserJSON)
        setUserId(loggedUser.id)
        setAuth({ headers: { Authorization: `Bearer ${loggedUser.token}` } })
      } catch (error) {
        console.error(error);
      }
    }

    blogService.getAll()
      .then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    if (auth, userId) {
      userService.getUser(auth, userId)
        .then(user => setUser(user))
    }
  }, [auth, userId])
  
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route path='/' element={
            <Blogs setBlogs={setBlogs} setUser={setUser} user={user} blogs={blogs} auth={auth}/>
          }/>
          <Route path='/login' element={
            <Login user={user} setAuth={setAuth} setUserId={setUserId}/>
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
