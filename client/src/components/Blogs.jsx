import React, { useState } from 'react'
import propTypes from 'prop-types'
import Blog from './Blog'
import sessionsService from '../services/sessions'

const Blogs = ({ blogs, user, msg, vis, children, like, remove, auth }) => {
  const [visible, setVisible] = useState(false)
  const [id, setId] = useState('')
  const { logout } = sessionsService
  
  const handleLogout = async () => {
    await logout(auth)
    window.localStorage.clear()
    window.location.reload()
  }

  return (
    <div>
      <h2>blogs</h2>
      <h3 id='msg'>{msg}</h3>
      <p>{user.username}</p>
      <button onClick={handleLogout}>logout</button>
      <div className='blogList' style={{ display: vis.val ? 'none' : '' }}>
        {blogs 
          ? blogs.sort((a, b) => b.likes - a.likes).map(blog =>
            <div className='blog' key={blog.id}>
              <div className='row'>
                <Blog blog={blog} visible={visible}/>
                <button onClick={() => { setVisible(!visible); setId(blog.id) }}>view</button></div>
              <div className='swv' style={{ display: visible && blog.id === id ? '' : 'none' }}>
                <p>{blog.url}</p>
                <p>{blog.likes}<button onClick={() => like(blog)}>like</button></p>
                {blog.user.username === user.username && <button onClick={() => { window.confirm('are you sure?') && remove(blog.id) }}>remove</button> }
              </div>
            </div>
          )
          : null}
        <button onClick={() => vis.set(true)}>new blog</button>
      </div>
      <div style={{ display: vis.val ? '' : 'none' }}>
        {children}
        <button onClick={() => vis.set(false)}>cancel</button>
      </div>
    </div>
  )
}

Blogs.propTypes = {
  blogs: propTypes.array.isRequired,
  user: propTypes.object.isRequired,
  msg: propTypes.string.isRequired,
  vis: propTypes.object.isRequired,
  like: propTypes.func,
  remove: propTypes.func.isRequired,
  children: propTypes.element.isRequired,
  auth: propTypes.object.isRequired
}

export default Blogs
