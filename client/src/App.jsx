/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Login from './components/Login'
import blogService from './services/blogs'
import './App.css'
import './index.css'
import { Route, BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom'
import Register from './components/Register'
import { ThemeProvider } from './components/ThemeProvider'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')
  const [auth, setAuth] = useState(null)
  const messageElement = document.getElementById('message')
  const navigate = useNavigate()

  useEffect(() => {
    if (auth) {
      blogService.getAll(auth).then(blogs =>
        setBlogs(blogs)
      )
      navigate('/')
    } else {
      navigate('/login')
    }
  }, [auth])
  
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

  
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route path='/' element={
            <Blogs message={message} setBlogs={setBlogs} user={user} setMessage={setMessage} blogs={blogs} auth={auth} messageElement={messageElement}/>
          }/>
          <Route path='/login' element={
            <Login message={message} setMessage={setMessage} user={user} setAuth={setAuth} setUser={setUser}/>
          }/>
          <Route path='/register' element={
            <Register message={message} setMessage={setMessage} user={user}/>
          }/>
        </Routes>
    </ThemeProvider>
  )
}

export default App
