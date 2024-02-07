import React, { useState } from 'react'
import propTypes from 'prop-types'
import { Button } from './ui/button'

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
      <form onSubmit = { addBlog } className='text-black '>
        <input id='title' type='text' placeholder='title' value={title} onChange={({ target }) => setTitle(target.value)}/><br/>
        <input id='author' type='text' placeholder='author' value={author} onChange={({ target }) => setAuthor(target.value)}/><br/>
        <input id='url' type='text' placeholder='url' value={url} onChange={({ target }) => setUrl(target.value)}/><br/>
        <input id='year' type='number' placeholder='year' value={year} onChange={({ target }) => setYear(target.value)}/><br/>
        <div className='flex justify-evenly mt-4'>
          <Button className="bg-transparent w-auto border px-3 py-1 h-fit border-gray-600" type="submit">Create</Button>
          <Button onClick={handleCancel} className="bg-transparent border px-3 py-1 h-fit border-gray-600">Cancel</Button> 
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
