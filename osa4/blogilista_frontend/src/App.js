import React, { useState, useEffect, useCallback } from 'react'
import SearchForm from './components/SearchForm'
import AddBlogForm from './components/BlogForm'
import DisplayBlog from './components/DisplayBlog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import loginService from './services/login'
import contactService from './services/contacts'


const App = () => {

	const [blogs, setBlogs] = useState([])
	const [notificationMessage, setNotificationMessage] = useState(null)

	const [searchTerm, setSearchTerm] = useState('')
	const blogsToShow = blogs.filter(blog => blog.title.toLowerCase().includes(searchTerm.toLowerCase()))
	const [className, setClassName] = useState(null)

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const [user, setUser] = useState(null)


	useEffect(() => {
		contactService
			.getAll()
			.then(initialBlogs => {
				setBlogs(initialBlogs)
			})
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			contactService.setToken(user.token)
		}
	}, [])


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

	const addBlog = (blogObject) => {
		// Checks if a blog with the same already exists
		const hit = blogs.filter(blog => blog.title.toLowerCase() === blogObject.title.toLowerCase())

		if (hit[0]) {
			setNotification({
				message: `A blog by the name ${hit[0].title} is already on Blogister.`,
				type: 'error'
			})
		} else {
			contactService
				.create(blogObject)
				.then(returnedBlogs => {
					setBlogs(blogs.concat(returnedBlogs))
					setNotification({
						message: `${blogObject.title} was added to the Blogister-list`,
						type: 'update'
					})
				})
				.catch(error => {
					setNotification({
						message: error.response.data,
						type: 'error'
					})
				})
		}
	}

	const toggleLike = (id) => {
		// console.log('blog no ' + id + ' needs to be liked')
		const hits = blogs.filter(blog => blog.id === id)
		const likedBlog = hits[0]

		const blogObject = {
			title: likedBlog.title,
			author: likedBlog.author,
			url: likedBlog.url,
			likes: likedBlog.likes + 1
		}
		contactService
			.put(id, blogObject)
			.then((returnedBlog) => {
				setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
				setNotification({
					message: `You liked ${blogObject.title}!`,
					type: 'update'
				})
			})
			.catch(error => {
				console.log(error)
			})

	}

	const toggleDelete = (id) => {
		console.log('blog no ' + id + ' needs to be deleted')
		const blog = blogsToShow.find(person => person.id === id)
		if (window.confirm(`Delete ${blog.title} ?`)) {
			contactService
				.remove(id)
				.then(() => {
					const newBlogList = blogs.filter((blog => blog.id !== id))
					setBlogs(newBlogList)
					setNotification({
						message: `${blog.title} was removed from the Blogister-list`,
						type: 'delete'
					})
				})
				.catch(error => {
					setNotification({
						message: `Error has occurred. Could not delete ${blog.title}.`,
						type: 'delete'
					})
				})

		}
	}


	const handleSearchTermChange = (event) => {
		event.preventDefault()
		setSearchTerm(event.target.value.toLowerCase())
	}

	const handleLogin = async (event) => {
		event.preventDefault()
		//console.log('logging in with', username)
		try {
			const user = await loginService.login({
				username, password
			})
			window.localStorage.setItem(
				'loggedBlogAppUser', JSON.stringify(user)
			)
			contactService.setToken(user.token)
			setUser(user)
			setUsername('')
			setPassword('')
		} catch (exception) {
			setNotification({
				message: 'wrong username or password',
				type: 'delete'
			})
		}
	}

	const handleLogout = async (event) => {
		event.preventDefault()
		//console.log('logging out with the username', username)
		localStorage.clear()
		window.location.reload()
		setNotification({
			message: 'Succesfully logged out',
			type: 'update'
		})
	}

	const loginForm = () => (
		<Togglable buttonLabel='log in'>
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
				<SearchForm onChange={handleSearchTermChange} />
				<h2>Add a new blog to the list</h2>

				<Togglable buttonLabel='Add a new blog'>
					<AddBlogForm
						createBlog={addBlog}
					/>
				</Togglable>

				<h2>Blogs</h2>
				<ul>
					{blogsToShow.map(blog => (
						<DisplayBlog
							key={blog.id}
							blog={blog}
							toggleLike={() => toggleLike(blog.id)}
							toggleDelete={() => toggleDelete(blog.id)}
						/>
					))}
				</ul>
			</div>

		)
	}

	return (
		<div>
			<h1>Blogister v. 0.0.4</h1>

			{user === null ?
				loginForm() :
				<div>
					<p>Logged in as: {user.name} <button onClick={handleLogout}>logout</button></p>
					{blogAddingForm()}
				</div>
			}

			<Notification message={notificationMessage} className={className} />

		</div>
	)

}

export default App