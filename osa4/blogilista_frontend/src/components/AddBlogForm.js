import React from 'react'


const AddPersonForm = ({ onSubmit, titleValue, onTitleChange, authorValue, onAuthorChange, urlValue, onUrlChange }) => (
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
            <button type="submit">add</button>
        </div>
    </form>
)

// const AddPersonForm = (props) => (
//     <form onSubmit={props.onSubmit}>
//         <div>
//             Title: <input value={props.titleValue} onChange={props.onTitleChange} />
//         </div>
//         <div>
//             Author: <input value={props.authorValue} onChange={props.onAuthorChange} />
//         </div>
//         <div>
//             Url: <input value={props.urlValue} onChange={props.onUrlChange} />
//         </div>
//         <div>
//             <button type="submit">add</button>
//         </div>
//     </form>
// )

export default AddPersonForm