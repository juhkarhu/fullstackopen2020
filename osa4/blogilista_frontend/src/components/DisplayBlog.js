import React from 'react'

const DisplayBlog = ({ blog, toggleDelete }) => {
    console.log('displayblogissa', blog)
    return (
        <li key={blog.title}>
            {blog.title} by {blog.author}
            <button onClick={toggleDelete}>delete</button>
        </li>
    )

}


export default DisplayBlog