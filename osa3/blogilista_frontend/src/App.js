import React, { useState, useEffect, useCallback } from 'react'
import SearchForm from './components/SearchForm'
import AddBlogForm from './components/AddBlogForm'
import DisplayBlog from './components/DisplayBlog'
import contactService from './services/contacts'
import Notification from './components/Notification'


const App = () => {

  const [blogs, setBlogs] = useState([])
  const [notificationMessage, setNotificationMessage] = useState(null)

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const [searchTerm, setSearchTerm] = useState('')
  const blogsToShow = blogs.filter(blog => blog.title.toLowerCase().includes(searchTerm.toLowerCase()))
  const [className, setClassName] = useState(null)


  const fetchPosts = useCallback(() => {
    contactService
      .getAll()
      .then(returnedBlogs => {
        setBlogs(returnedBlogs)
      })
  }, [])


  useEffect(() => {
    contactService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }
    console.log(blogObject)

    // Tässä voisi tutkia onko listassa jo saman nimista blogia. 
    // const hit = blogs.filter(blog => blog.title.toLowerCase() === newTitle.toLowerCase()).length > 0

    // console.log(hit)

    // Jos jokin kentistä on tyhjä, niin tehdään seuraavat. 
    // if (blogObject.number.length <= 0) {
    //   setClassName('error')
    //   setNotificationMessage(
    //     `Only a name was given, you need to specify a number as well`
    //   )
    //   setTimeout(() => {
    //     setClassName(null)
    //     setNotificationMessage(null)
    //   }, 2000)
    // } else 

    // Jos tietokannassa oli jo tän niminen blogi, niin mitäs siitä voisikaan päivitellä.
    // if (hit) {
    //   if (window.confirm(`${newTitle} is already added to phonebook, replace the old number with a new number?`)) {
    //     const found_blog = blogs.filter(blog => blog.title.toLowerCase() === blogObject.title.toLowerCase())
    //     found_blog[0].number = blogObject.number
    //     // const id = found_person[0].id
    //     contactService
    //       .put(found_blog[0])
    //       .then(() => {
    //         fetchPosts()
    //       })
    //     setClassName('update')
    //     setNotificationMessage(
    //       `${found_blog[0].name}'s number was updated`
    //     )
    //     setTimeout(() => {
    //       setClassName(null)
    //       setNotificationMessage(null)
    //     }, 2000)
    //   }
    //   else {
    //     setNewName('')
    //     setNewAuthor('')
    //     setSearchTerm('')
    //   }
    // }
    // else {

    contactService
      .create(blogObject)
      .then(returnedBlogs => {
        setBlogs(blogs.concat(returnedBlogs))
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
        setSearchTerm('')
        setClassName('update')
        setNotificationMessage(
          `${blogObject.title} was added to the Blogister-list`
        )
        setTimeout(() => {
          setClassName(null)
          setNotificationMessage(null)
        }, 2000)
      })
      .catch(error => {
        setClassName('error')
        setNotificationMessage(
          `${error.response.data.error}`
        )
        setTimeout(() => {
          setClassName(null)
          setNotificationMessage(null)
        }, 4000)
      })

  }


const toggleDelete = (id) => {
  console.log('blog no ' + id + ' needs to be deleted')
  const blog = blogsToShow.find(person => person.id === id)
  if (window.confirm(`Delete ${blog.title} ?`)) {
    contactService
      .remove(id)
      .then(() => {
        fetchPosts()
        setClassName('delete')
        setNotificationMessage(
          `${blog.title} was removed from the Blogister-list`
        )
        setTimeout(() => {
          setClassName(null)
          setNotificationMessage(null)
        }, 2000)
      })
      .catch(error => {
        fetchPosts()
        setClassName('delete')
        setNotificationMessage(
          `Information of ${blog.title} has already been removed from the server.`
        )
        setTimeout(() => {
          setClassName(null)
          setNotificationMessage(null)
        }, 2000)
      })

  }
}

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

const handleSearchTermChange = (event) => {
  event.preventDefault()
  setSearchTerm(event.target.value.toLowerCase())
}




return (
  <div>
    <h1>Blogister v. 0.0.1</h1>
    <Notification message={notificationMessage} className={className} />
    <SearchForm onChange={handleSearchTermChange} />
    <h2>Add a new blog to the list</h2>
    <AddBlogForm onSubmit={addBlog} titleValue={newTitle} onTitleChange={handleTitleChange} authorValue={newAuthor} onAuthorChange={handleAuthorChange} urlValue={newUrl} onUrlChange={handleUrlChange} />
    <h2>Blogs</h2>
    <ul>
      {blogsToShow.map(blog => (
        <DisplayBlog
          key={blog.id}
          blog={blog}
          toggleDelete={() => toggleDelete(blog.id)}
        />
      ))}
    </ul>
  </div>

)

}

export default App