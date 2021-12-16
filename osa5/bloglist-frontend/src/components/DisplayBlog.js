import React, { useState, } from 'react'


const DisplayBlog = (props) => {

  const blog = props.blog
  const [blogObject, setBlogObject] = useState(blog)
  const [visibility, setVisibility] = useState(false)
  const showWhenVisible = { display: visibility ? '' : 'none' }

  const toggleVisibility = () => {
    setVisibility(!visibility)
  }

  const buttonLabel = visibility ? 'hide' : 'view'

  const increaseLikes = () => {
    const updatedBlog = ({
      ...blog,
      likes: blog.likes + 1
    })
    props.updateBlog(updatedBlog)
    setBlogObject(updatedBlog)
  }
  const removeBlog = () => props.removeBlog(blog)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  return (
    <div style={blogStyle} classname='blog'>
      <div>
      <p>{blog.title} <button onClick={toggleVisibility}>{buttonLabel}</button></p>
      </div>
      <div style={showWhenVisible}>
        <p>{blog.url}</p>
        <p>Likes: {blogObject.likes} <button onClick={increaseLikes}>Like</button></p> 
        {blog.author}
        <button onClick={removeBlog}>Delete</button>
        
      </div>
    </div>

  )

}

export default DisplayBlog