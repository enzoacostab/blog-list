import { useEffect, useState } from "react";
import propTypes from "prop-types"
import { context } from "./context";
import { toast } from "@/components/ui/use-toast";
import blogService from "@/services/blogs";
import { useNavigate } from "react-router-dom";
import readingListService from "@/services/reading-lists";
import userService from "@/services/users";

const ContextProvider = ({ children }) => {
  const [blogs, setBlogs] = useState(null)
  const [user, setUser] = useState(null)
  const [auth, setAuth] = useState(null)
  const [userId, setUserId] = useState(null)
  const { like, remove, getBlogs } = blogService
  const { addBlog } = readingListService
  const { getUser } = userService
  const navigate = useNavigate()

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
      getBlogs()
        .then(blogs => setBlogs(blogs))
    }

    if (auth && userId) {
      getUser(auth, userId)
        .then(user => setUser(user))
    }
  }, [auth, blogs, getBlogs, getUser, userId])

  const handleLike = async (data) => {
    if (!user) return navigate('/login')
    const likeButton = document.getElementById('like')
    likeButton.disabled = true

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
    } finally {
      likeButton.disabled = false
    }
  }

  const handleAddToReadingList = async (data) => {
    const saveButton = document.getElementById('save')
    saveButton.disabled = true

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
    } finally {
      saveButton.disabled = false
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

  return (
    <context.Provider value={{
      blogs, setBlogs,
      user, setUser,
      auth, setAuth,
      userId, setUserId,
      handleLike,
      handleAddToReadingList,
      handleRemove
    }}>
      {children}
    </context.Provider>
  )
}

ContextProvider.propTypes = {
  children: propTypes.element.isRequired
}

export default ContextProvider