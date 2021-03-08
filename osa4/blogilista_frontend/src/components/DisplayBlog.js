import React from 'react'

const DisplayBlog = ({ blog, toggleDelete, toggleLike }) => {
    // console.log('displayblogissa', blog)
	// console.log('blog', blog)
    return (
        <li className='blog' key={blog.title}>
            {blog.title} by {blog.author} with {blog.likes} likes
			<button onClick={toggleLike}>like</button>
            <button onClick={toggleDelete}>delete</button>
        </li>
    )

}


export default DisplayBlog