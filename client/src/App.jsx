import React, { useEffect, useContext } from 'react'
import Blogs from './components/Blogs'
import Login from './components/Login'
import blogService from './services/blogs'
import './App.css'
import './index.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Register from './components/Register'
import { ThemeProvider } from './components/ThemeProvider'
import { Toaster } from './components/ui/toaster'
import userService from '@/services/users'
import ReadingList from './components/ReadingList'
import { context } from './context/context'
import Header from './components/Header'
import CreateBlog from './components/CreateBlog'
import readingListService from './services/reading-lists'
import { toast } from './components/ui/use-toast'
import './services/index'

const App = () => {
  const { setBlogs, auth, setUserId, setAuth, userId, setUser, user, blogs } = useContext(context)
  const navigate = useNavigate()
  const { like, remove } = blogService
  const { addBlog } = readingListService
  
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON && !auth && !userId) {
      try {
        const loggedUser = JSON.parse(loggedUserJSON)
        setUserId(loggedUser.id)
        setAuth({ headers: { Authorization: `Bearer ${loggedUser.token}` } })
      } catch (error) {
        console.error(error);
      }
    }

    if (!blogs) {
      blogService.getAll()
        .then(blogs => setBlogs(blogs))
    }

    if (auth, userId) {
      userService.getUser(auth, userId)
        .then(user => setUser(user))
    }
  }, [auth, userId, blogs])

  const handleLike = async (data) => {
    if (!user) return navigate('/login')
    try {
      const newBlog = await like(data, auth)

      if (newBlog.likes > data.likes) {
        setUser({ 
          ...user, 
          likes: user.likes 
            ? user.likes.concat(newBlog.id) 
            : [newBlog.id],
          readings: user.readings.map(e => e.id === newBlog.id ? { ...e, likes: newBlog.likes } : e),
        })
      } else {
        setUser({ 
          ...user, 
          likes: user.likes.filter(blogId => blogId !== newBlog.id),
          readings: user.readings.map(e => e.id === newBlog.id ? {...e, likes: newBlog.likes } : e),
        })
      }
  
      setBlogs(blogs.map(blog => blog.id === data.id ? newBlog : blog))
    } catch (err) {
      console.error(err);
      toast({ description: err.message || 'Something went wrong...' })
    }
  }

  const handleRemove = async (id) => {
    try {
      await remove(id, auth)
      setBlogs(blogs.filter(e => e.id !== id))
      setUser({ ...user, readings: user.readings.filter(e => e.id !== id) })
      toast({ description: 'Blog removed!', title: "Success" })
    } catch (err) {
      console.error(err);
      toast({ description: err.message || 'Something went wrong...' })
    }
  }

  const handleAddToReadingList = async (data) => {
    try {
      const res = await addBlog({ id: data.id }, auth)
      if (res) {
        setUser({ 
          ...user, 
          readings: user.readings.concat({ ...data, reading_lists: res})
        })
      } else {
        setUser({ 
          ...user, 
          readings: user.readings.filter(e => e.id !== data.id)
        })
      }
    } catch (err) {
      console.error(err);
      toast({ description: err.message || 'Something went wrong...' })
    }
  }
  
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/' element={<Header/>}>
            <Route path='/reading-list' element={<ReadingList handleAddToReadingList={handleAddToReadingList} handleLike={handleLike} handleRemove={handleRemove}/>} />
            <Route path='/' element={<Blogs handleAddToReadingList={handleAddToReadingList} handleLike={handleLike} handleRemove={handleRemove}/>}/>
            <Route path='/add-blog' element={<CreateBlog/>}/>
          </Route>
        </Routes>
        <Toaster/>
    </ThemeProvider>
  )
}

export default App
