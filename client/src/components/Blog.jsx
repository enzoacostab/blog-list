import propTypes from 'prop-types'
import React from 'react'

const Blog = ({ blog }) => {
  return (
    <div>
      {blog.title} {blog.author} {blog.year}
    </div>
  )
}

Blog.propTypes = {
  blog: propTypes.object.isRequired
}

export default Blog
