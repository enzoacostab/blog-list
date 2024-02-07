import React, { useEffect, useState } from 'react'
import propTypes from 'prop-types'
import Blog from './Blog'
import sessionsService from '../services/sessions'
import blogService from '../services/blogs'
import { useNavigate } from 'react-router-dom'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from './ui/button'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Star } from 'lucide-react'
import CreateBlog from './CreateBlog'

const Blogs = ({ blogs, setBlogs, user, message, setMessage, children, auth, messageElement }) => {
  const [createBlogVisible, setCreateBlogVisible] = useState(false)
  const [id, setId] = useState('')
  const { logout } = sessionsService
  const navigate = useNavigate()
  
  /*useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user])*/

  const like = async (data) => {
    try {
      data.likes++
      await blogService.like(data, auth)
      setMessage('liked')
      messageElement.classList.add('done')
      setTimeout(() => {
        messageElement.classList.remove('done')
        setMessage('')
      }, 5000)
    } catch (err) {
      setMessage(err.message)
      messageElement.classList.add('err')
      setTimeout(() => {
        message.classList.remove('err')
        setMessage('')
      }, 5000)
    }
  }

  const remove = async (id) => {
    try {
      await blogService.remove(id, auth)
      setBlogs(blogs.filter(e => e.id !== id))
      setMessage('removed')
      messageElement.classList.add('done')
      setTimeout(() => {
        messageElement.classList.remove('done')
        setMessage('')
      }, 5000)
    } catch (err) {
      setMessage(err.messageElement)
      messageElement.classList.add('err')
      setTimeout(() => {
        messageElement.classList.remove('err')
        setMessage('')
      }, 5000)
    }
  }

  const addBlog = async (data) => {
    try {
      const res = await blogService.create(data, auth)
      setBlogs(blogs.concat(res))
      setMessage(`${data.title} by ${data.author} added`)
      messageElement.classList.add('done')
      setTimeout(() => {
        messageElement.classList.remove('done')
        setMessage('')
      }, 7000)
    } catch (err) {
      setMessage(err.messageElement)
      messageElement.classList.add('err')
      setTimeout(() => {
        messageElement.classList.remove('err')
        setMessage('')
      }, 5000)
    }
  }


  const handleLogout = async () => {
    await logout(auth)
    window.localStorage.clear()
    window.location.reload()
  }

  return (
    <div className='bg-black h-full min-h-[100dvh] p-5'>
      <header className='pb-5 flex justify-end'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="bg-gray-200">
              <AvatarFallback>X</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-black border-gray-600">
            <DropdownMenuLabel>{user?.username}</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-600"/>
            <DropdownMenuItem onClick={() => setCreateBlogVisible(true)}>Add Blog</DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <h3 id='message'>{message}</h3>
      <div className='blogList' style={{ display: createBlogVisible ? 'none' : '' }}>
        <Accordion collapsible type='single'>
        {blogs 
          ? blogs.sort((a, b) => b.likes - a.likes).map(blog => 
                <AccordionItem key={blog.id} value={blog.id}>
                  <AccordionTrigger>
                    <Blog blog={blog}/>
                  </AccordionTrigger>
                  <AccordionContent className="">
                    <div>
                      <p>{blog.url}</p>
                        <div className='flex gap-2 items-center w-full'>
                          <p>{blog.likes}</p>
                          {blog.user.username === user.username 
                            ? <Button className="bg-transparent ml-auto border px-3 py-1 h-fit border-gray-600" onClick={() => { window.confirm('are you sure?') && remove(blog.id) }}>Delete</Button> 
                            : <button onClick={() => like(blog)}><Star size={20}/></button>}
                        </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )
          : null}
        </Accordion>
        <button onClick={() => setCreateBlogVisible(true)}>new blog</button>
      </div>
      <div style={{ display: createBlogVisible ? '' : 'none' }}>
        <CreateBlog createBlog={addBlog} setCreateBlogVisible={setCreateBlogVisible}/>
      </div>
    </div>
  )
}

Blogs.propTypes = {
  blogs: propTypes.array.isRequired,
  setBlogs: propTypes.func,
  user: propTypes.object,
  message: propTypes.string.isRequired,
  setMessage: propTypes.func.isRequired,
  children: propTypes.element.isRequired,
  messageElement: propTypes.object,
  auth: propTypes.object
}

export default Blogs
