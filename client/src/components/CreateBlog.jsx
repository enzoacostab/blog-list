import React, { useState } from 'react'
import propTypes from 'prop-types'
import { Button } from './ui/button'
import { Input } from './ui/input'

const CreateBlog = ({ createBlog, setCreateBlogVisible }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [year, setYear] = useState(1991)

  const addBlog = () => {
    const data = { title, author, url, year }
    createBlog(data)
    setTitle('')
    setAuthor('')
    setUrl('')
    setYear(1991)
  }

  const handleCancel = (e) => {
    e.preventDefault()
    setCreateBlogVisible(false)
  }

  return (
    <div className='flex flex-col items-center w-fit'>
      <h2>Add Blog</h2>
      <form onSubmit = { addBlog } className='flex flex-col gap-2 mt-2'>
        <Input id='title' type='text' placeholder='title' value={title} onChange={({ target }) => setTitle(target.value)}/>
        <Input id='author' type='text' placeholder='author' value={author} onChange={({ target }) => setAuthor(target.value)}/>
        <Input id='url' type='text' placeholder='url' value={url} onChange={({ target }) => setUrl(target.value)}/>
        <Input id='year' type='number' placeholder='year' value={year} onChange={({ target }) => setYear(target.value)}/>
        <div className='flex justify-evenly'>
          <Button variant="secondary" type="submit">Create</Button>
          <Button variant="secondary" onClick={handleCancel} className="">Cancel</Button> 
        </div>
      </form>
    </div>
  )
}

CreateBlog.propTypes = {
  createBlog: propTypes.func.isRequired,
  setCreateBlogVisible: propTypes.func.isRequired
}

export default CreateBlog
