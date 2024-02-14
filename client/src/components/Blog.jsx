import propTypes from 'prop-types'
import React from 'react'

export default function Blog({ blog }) {
  return (
    <div className='text-left'>
      <h2 className='font-bold'>{blog.title}</h2> 
      <em className='font-light text-sm'>{blog.author} {blog.year && blog.author && "·"} {blog.year}</em>
    </div>
  )
}

Blog.propTypes = {
  blog: propTypes.object.isRequired
}
