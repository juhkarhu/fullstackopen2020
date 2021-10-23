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
        event.preventDefault()
        createBlog({
            title: newTitle,
            author: newAuthor,
            url: newUrl
        })
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
    }


    return (
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
    )

}


export default AddBlogForm