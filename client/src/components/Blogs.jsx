import React, { useState } from 'react'
import propTypes from 'prop-types'
import Blog from './Blog'
import sessionsService from '../services/sessions'
import blogService from '../services/blogs'
import { Button } from './ui/button'
import { Avatar, AvatarFallback } from './ui/avatar'
import { Heart, User } from 'lucide-react'
import CreateBlog from './CreateBlog'
import { DeleteButton } from './DeleteButton'
import { ModeToggle } from './ModeToggle'
import { toast } from './ui/use-toast'
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
import { useNavigate } from 'react-router-dom'

const Blogs = ({ blogs, setBlogs, user, setUser, auth }) => {
  const [createBlogVisible, setCreateBlogVisible] = useState(false)
  const { logout } = sessionsService
  const { like, create, remove }= blogService
  const navigate = useNavigate()

  const handleLike = async (data) => {
    if (!user) return navigate('/login')
    try {
      const newBlog = await like(data, auth)

      if (newBlog.likes > data.likes) {
        setUser({ ...user, likes: user.likes ? user.likes.concat(newBlog.id) : [newBlog.id]})
      } else {
        setUser({ ...user, likes: user.likes.filter(blogId => blogId !== newBlog.id) })
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
      toast({ description: <span>Blog removed!</span>, title: "Success" })
    } catch (err) {
      console.error(err.message);
      toast({ description: err.message || 'Something went wrong...' })
    }
  }

  const handleCreate = async (data) => {
    if (!user) return navigate('/login')
    try {
      const newBlog = await create(data, auth)
      setBlogs(blogs.concat(newBlog))
      toast({ description: <span>Created a new blog!</span>, title: 'Success'}) 
      setCreateBlogVisible(false)
    } catch (err) {
      console.error(err);
      toast({ description: err.message || 'Something went wrong...' })
    }
  }

  const handleLogout = async () => {
    await logout(auth)
    window.localStorage.clear()
    window.location.reload()
  }

  return (
    <div className='h-full min-h-[100dvh] p-5'>
      <header className='pb-5 flex justify-end'>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarFallback><User/></AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {user
              ? <>
                  <DropdownMenuLabel>{user?.username}</DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                  <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                </>
              : <DropdownMenuItem onClick={() => navigate('/login')}>Sign in</DropdownMenuItem>}
            <DropdownMenuItem onClick={() => setCreateBlogVisible(true)}>Add blog</DropdownMenuItem>
            <ModeToggle/>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <div className='blogList' style={{ display: createBlogVisible ? 'none' : '' }}>
        <Accordion collapsible type='single'>
        {blogs 
          ? blogs.sort((a, b) => b.likes - a.likes).map(blog => 
                <AccordionItem key={blog.id} value={blog.id}>
                  <AccordionTrigger>
                    <Blog blog={blog}/>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div>
                      <p>{blog.url}</p>
                        <div className='flex items-center justify-between w-full'>
                        <Button variant="ghost" className="flex gap-1 w-fit p-2" onClick={() => handleLike(blog)}>
                          <Heart size={17} fill={`${user?.likes?.includes(blog.id) && 'red'}`} color={`${user?.likes?.includes(blog.id) ? 'red' : 'white'}`}/>
                          <span>{blog.likes}</span>
                        </Button>
                          {blog.user.username === user?.username 
                            && <DeleteButton className="" remove={handleRemove} id={blog.id}/> }
                        </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )
          : null}
        </Accordion>
        <Button className="mt-3" onClick={() => setCreateBlogVisible(true)}>Add Blog</Button>
      </div>
      <div style={{ display: createBlogVisible ? '' : 'none' }}>
        <CreateBlog createBlog={handleCreate} setCreateBlogVisible={setCreateBlogVisible}/>
      </div>
    </div>
  )
}

Blogs.propTypes = {
  blogs: propTypes.array.isRequired,
  setBlogs: propTypes.func,
  user: propTypes.object,
  setUser: propTypes.func.isRequired,
  auth: propTypes.object
}

export default Blogs
