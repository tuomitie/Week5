import React from 'react'

const Blog = ({blog}) => (
  <div>
      {blog.title}<br /><a href={blog.url}>{blog.url}</a><br />
      {blog.author}<br />
      <form>{blog.likes}</form>
  </div>  
)

export default Blog