import React, { useState, useEffect } from 'react'
import DisplayBlog from './components/DisplayBlog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [notificationMessage, setNotificationMessage] = useState(null)
  const [className, setClassName] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [user, setUser] = useState(null)



  useEffect(() => {
    console.log('useEffect pyörähtää')
    blogService.getAll().then(blogs =>
      // setBlogs(blogs)
      setBlogs(blogs.sort(function(a, b) {
        return a.likes - b.likes
      }))
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

  const setNotification = ({ message, type }) => {
    setClassName(type)
    setNotificationMessage(
      `${message}`
    )
    setTimeout(() => {
      setClassName(null)
      setNotificationMessage(null)
    }, 3000)
  }


  const createBlog = async (blogObject) => {
    try {
      const createdBlog = await blogService
        .create(blogObject)
      console.log('returned and created blog from backend:', createdBlog)
      setBlogs(blogs.concat(createdBlog).sort(function(a, b) {
        return a.likes - b.likes
      }))
      setNotification({
        message: `${blogObject.title} was added to the Blogister-list`,
        type: 'update'
      })
    } catch (exception) {
      setNotification({
        message: `Cannot add ${blogObject.title}`,
        type: 'error'
      })


    }
  }


  const updateBlog = async (blogToUpdate) => {
    console.log('blogs', blogs)
    console.log('1', blogToUpdate)
    try {
      const updatedBlog = await blogService
        .put(blogToUpdate.id, blogToUpdate)

      setBlogs(blogs.map(blog => blog.id !== blogToUpdate.id ? blog : updatedBlog).sort(function(a, b) {
        return a.likes - b.likes
      }))
      setNotification({
        message: `You liked ${blogToUpdate.title}!`,
        type: 'update'
      })
    } catch (exception) {
      setNotification({
        message: `Could not update the ${blogToUpdate.title} blog.`,
        type: 'delete'
      })
    }
  }

  const removeBlog = async (blogToBeRemoved) => {
    console.log('1')
    try {
      console.log('tryssa')
      if (window.confirm(`Delete ${blogToBeRemoved.title} ?`)) {
        console.log('window confirmed')
        blogService
          .remove(blogToBeRemoved.id)
        console.log('request fulfilled')
        setBlogs(blogs.filter((blog => blog.id !== blogToBeRemoved.id)).sort(function(a, b) {
          return a.likes - b.likes
        }))
        setNotification({
          message: `${blogToBeRemoved.title} was removed from the Blogister-list`,
          type: 'delete'
        })
      }
    } catch (exception) {
      console.log('HOL UP')
      setNotification({
        message: `Error has occurred. Could not delete ${blogToBeRemoved.title}.`,
        type: 'delete'
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

  const blogAddingForm = () => {
    return (
      <div>
        <Togglable buttonLabel='Add a new blog'>
          <BlogForm
            createBlog={createBlog}
          />
        </Togglable>



      </div>
    )
  }

  return (
    <div>
      <p>Blog version 0.2 (work in progress)</p>
      <Notification message={notificationMessage} className={className} />
      {user === null ?
        loginForm() :
        <div>
          <p>Logged in as: {user.name} <button onClick={handleLogout}>logout</button></p>
          {blogAddingForm()}

          <h2>blogs</h2>
          <ul>
            {blogs.map(blog =>
              <DisplayBlog
                key={blog.id}
                blog={blog}
                updateBlog={updateBlog}
                removeBlog={removeBlog}
              />
            )}
          </ul>


        </div>
      }

    </div>
  )
}


export default App