import React, { useEffect, useContext, Suspense, lazy } from 'react'
import blogService from './services/blogs'
import readingListService from './services/reading-lists'
import userService from '@/services/users'
import Loader from './components/Loader'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { ThemeProvider } from './components/ThemeProvider'
import { Toaster } from './components/ui/toaster'
import { context } from './context/context'
import { toast } from './components/ui/use-toast'
import './services/index'
import './App.css'
import './index.css'
const Register = lazy(() => import('./components/Register'))
const Login = lazy(() => import('./components/Login'))
const Header = lazy(() => import('./components/Header'))
const ReadingList = lazy(() => import('./components/ReadingList'))
const CreateBlog = lazy(() => import('./components/CreateBlog'))
const Blogs = lazy(() => import('./components/Blogs'))

export default function App() {
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

    if (auth && userId) {
      userService.getUser(auth, userId)
        .then(user => setUser(user))
    }
  }, [auth, userId, blogs, setUserId, setAuth, setBlogs, setUser])

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
  
  if (!blogs) {
    return <Loader/>
  } else {
    return (
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Suspense fallback={<Loader/>}>
          <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/' element={<Header/>}>
              <Route path='/reading-list' element={<ReadingList handleAddToReadingList={handleAddToReadingList} handleLike={handleLike} handleRemove={handleRemove}/>} />
              <Route path='/' element={<Blogs handleAddToReadingList={handleAddToReadingList} handleLike={handleLike} handleRemove={handleRemove}/>}/>
              <Route path='/add-blog' element={<CreateBlog/>}/>
            </Route>
          </Routes>
        </Suspense>
        <Toaster/>
      </ThemeProvider>
    )
  }
}
