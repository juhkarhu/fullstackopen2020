import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import AddBlogForm from './components/AddBlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const [notificationMessage, setNotificationMessage] = useState(null)
  const [className, setClassName] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [user, setUser] = useState(null)



  useEffect(() => {
    console.log('effecthook pyörähtää, kaikki blogit haetaan')
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setClassName('update')
      setNotificationMessage(`Logged in as ${user.name}`)
      setTimeout(() => {
        setClassName(null)
        setNotificationMessage(null)
      }, 3000)
    } catch (exception) {
      setClassName('delete')
      setNotificationMessage('wrong username or password')
      setTimeout(() => {
        setClassName(null)
        setNotificationMessage(null)
      }, 3000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    console.log('logging out with the username', username)
    localStorage.clear()
    window.location.reload()
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

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    const hit = blogs.filter(blog => blog.title.toLowerCase() === newTitle.toLowerCase())

    if (hit[0]) {
      setClassName('error')
      setNotificationMessage(
        `A blog by the name ${hit[0].title} is already on Blogister.`
      )
      setTimeout(() => {
        setClassName(null)
        setNotificationMessage(null)
      }, 2000)
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
    } else {
      blogService
        .create(blogObject)
        .then(returnedBlogs => {
          setBlogs(blogs.concat(returnedBlogs))
          setNewTitle('')
          setNewAuthor('')
          setNewUrl('')
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
          }, 3000)
        })
    }

  }


  const loginForm = () => (
    <Togglable buttonLabel='Log in'>
      <LoginForm
        username={username}
        password={password}
        onUsernameChange={({ target }) => setUsername(target.value)}
        onPasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )

  const blogForm = () => {
    return (
      <div>
        <Togglable buttonLabel='new blog'>
          <AddBlogForm
            onSubmit={addBlog}
            titleValue={newTitle}
            onTitleChange={handleTitleChange}
            authorValue={newAuthor}
            onAuthorChange={handleAuthorChange}
            urlValue={newUrl}
            onUrlChange={handleUrlChange}
          />
        </Togglable>


        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }

  return (
    <div>
      <p>Blog version 0.2 (work in progress)</p>

      {user === null ?
        loginForm() :
        <div>
          <p>Logged in as: {user.name} <button onClick={handleLogout}>logout</button></p>
          {blogForm()}
        </div>
      }

      <Notification message={notificationMessage} className={className} />

    </div>
  )
}

export default App