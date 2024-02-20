import React, { useContext, useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { context } from '@/context/context'
import blogService from '@/services/blogs'
import { useNavigate } from 'react-router-dom'
import { toast } from './ui/use-toast'

export default function CreateBlog() {
  const { auth, user, setBlogs } = useContext(context)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [year, setYear] = useState(1991)
  const navigate = useNavigate()
  const { create } = blogService

  const handleCreate = async (e) => {
    e.preventDefault()
    if (!user) return navigate('/login')
    try {
      e.target.submit.disabled = true
      const newBlog = await create({ title, author, url, year }, auth)
      setBlogs(blogs => blogs.concat(newBlog))
      toast({ description: 'Blog added!', title: 'Success'})
      navigate('/')
    } catch (err) {
      console.error(err);
      toast({ description: err.message || 'Something went wrong...' })
    }
  }

  const handleCancel = (e) => {
    e.preventDefault()
    navigate(-1)
  }

  return (
    <div className='flex flex-col items-center w-full'>
      <h2>Add Blog</h2>
      <form onSubmit={handleCreate} className='flex w-[80%] sm:w-1/3 flex-col gap-2 mt-2'>
        <Input id='title' type='text' required placeholder='title' value={title} onChange={({ target }) => setTitle(target.value)}/>
        <Input id='author' type='text' placeholder='author' value={author} onChange={({ target }) => setAuthor(target.value)}/>
        <Input id='url' type='url' required placeholder='url' value={url} onChange={({ target }) => setUrl(target.value)}/>
        <Input id='year' type='number' placeholder='year' value={year} onChange={({ target }) => setYear(target.value)}/>
        <div className='flex justify-center gap-4'>
          <Button variant="secondary" name="submit" type="submit">Create</Button>
          <Button variant="secondary" onClick={handleCancel} className="">Cancel</Button> 
        </div>
      </form>
    </div>
  )
}
