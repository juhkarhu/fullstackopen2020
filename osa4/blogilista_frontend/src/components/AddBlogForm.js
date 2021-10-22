import React from 'react'


const AddBlogForm = ({ onSubmit, titleValue, onTitleChange, authorValue, onAuthorChange, urlValue, onUrlChange }) => (
    <form onSubmit={onSubmit}>
        <div>
            Title: <input value={titleValue} onChange={onTitleChange} />
        </div>
        <div>
            Author: <input value={authorValue} onChange={onAuthorChange} />
        </div>
        <div>
            Url: <input value={urlValue} onChange={onUrlChange} />
        </div>
        <div>
            <button type="submit">Add</button>
        </div>
    </form>
)


export default AddBlogForm