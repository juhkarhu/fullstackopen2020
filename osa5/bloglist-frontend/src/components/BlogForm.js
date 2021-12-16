import React, { useState } from 'react'





const AddBlogForm = ({ createBlog }) => {

    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')

    const handleTitleChange = (event) => {
        event.preventDefault()
        setNewTitle(event.target.value)
    }

    const handleAuthorChange = (event) => {
        event.preventDefault()
        setNewAuthor(event.target.value)
    }

    const handleUrlChange = (event) => {
        event.preventDefault()
        setNewUrl(event.target.value)
    }


    const addBlog = (event) => {
        console.log('1')
        event.preventDefault()
        console.log('2')
        createBlog({
            title: newTitle,
            author: newAuthor,
            url: newUrl
        })
        console.log('3')
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
    }


    return (
        <div>
            <h2>Add a new blog to the list</h2>

            <form onSubmit={addBlog}>
                <div>
                    Title: <input value={newTitle} onChange={handleTitleChange} />
                </div>
                <div>
                    Author: <input value={newAuthor} onChange={handleAuthorChange} />
                </div>
                <div>
                    Url: <input value={newUrl} onChange={handleUrlChange} />
                </div>
                <div>
                    <button type="submit">Add</button>
                </div>
            </form>

        </div>

    )

}


export default AddBlogForm