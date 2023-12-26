import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Login from './components/Login'
import CreateBlog from './components/CreateBlog'
import blogService from './services/blogs'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [msg, setMsg] = useState('')
  const [visible, setVisible] = useState(false)
  const [auth, setAuth] = useState(null)
  const message = document.getElementById('msg')

  useEffect(() => {
    if (auth) {
      blogService.getAll(auth).then(blogs =>
        setBlogs(blogs)
      )
    }
  }, [auth])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      try {
        const us = JSON.parse(loggedUserJSON)
        setUser(us)
        setAuth({ headers: { Authorization: `Bearer ${us.token}` } })
      } catch (error) {
        console.error(error);
      }
    }
  }, [])

  const addBlog = async (data) => {
    try {
      const res = await blogService.create(data, auth)
      setBlogs(blogs.concat(res))
      setMsg(`${data.title} by ${data.author} added`)
      message.classList.add('done')
      setTimeout(() => {
        message.classList.remove('done')
        setMsg('')
      }, 7000)
    } catch (err) {
      setMsg(err.message)
      message.classList.add('err')
      setTimeout(() => {
        message.classList.remove('err')
        setMsg('')
      }, 5000)
    }
  }

  const like = async (data) => {
    try {
      data.likes++
      await blogService.like(data, auth)
      setMsg('liked')
      message.classList.add('done')
      setTimeout(() => {
        message.classList.remove('done')
        setMsg('')
      }, 5000)
    } catch (err) {
      setMsg(err.message)
      message.classList.add('err')
      setTimeout(() => {
        message.classList.remove('err')
        setMsg('')
      }, 5000)
    }
  }

  const remove = async (id) => {
    try {
      await blogService.remove(id, auth)
      setBlogs(blogs.filter(e => e.id !== id))
      setMsg('removed')
      message.classList.add('done')
      setTimeout(() => {
        message.classList.remove('done')
        setMsg('')
      }, 5000)
    } catch (err) {
      setMsg(err.message)
      message.classList.add('err')
      setTimeout(() => {
        message.classList.remove('err')
        setMsg('')
      }, 5000)
    }
  }

  if (user) {
    return (
      <Blogs remove={remove} like={like} vis={{ val: visible, set: setVisible }} msg={msg} user={user} blogs={blogs} auth={auth}>
        <CreateBlog createBlog={addBlog}/>
      </Blogs>
    )
  } else {
    return <Login msg={msg} setMsg={setMsg} setAuth={setAuth} setUser={setUser}/>
  }
}

export default App
