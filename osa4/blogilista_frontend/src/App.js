import React, { useState, useEffect, useCallback } from 'react'
import SearchForm from './components/SearchForm'
import AddBlogForm from './components/AddBlogForm'
import DisplayBlog from './components/DisplayBlog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'

import Togglable from './components/Togglable'

import loginService from './services/login'
import contactService from './services/contacts'


const App = () => {

	const [blogs, setBlogs] = useState([])
	const [notificationMessage, setNotificationMessage] = useState(null)

	const [newTitle, setNewTitle] = useState('')
	const [newAuthor, setNewAuthor] = useState('')
	const [newUrl, setNewUrl] = useState('')

	const [searchTerm, setSearchTerm] = useState('')
	const blogsToShow = blogs.filter(blog => blog.title.toLowerCase().includes(searchTerm.toLowerCase()))
	const [className, setClassName] = useState(null)

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const [user, setUser] = useState(null)


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

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			contactService.setToken(user.token)
		}
	}, [])


	const addBlog = (event) => {
		event.preventDefault()
		const blogObject = {
			title: newTitle,
			author: newAuthor,
			url: newUrl
		}
		console.log(blogObject)

		// Checks if a blog with the same already exists
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
			setSearchTerm('')
		} else {
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
					}, 3000)
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
			.then(() => {
				fetchPosts()
				setClassName('update')
				setNotificationMessage(
					`You liked ${blogObject.title}!`
				)
				setTimeout(() => {
					setClassName(null)
					setNotificationMessage(null)
				}, 3000)
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
						`Error has occurred. Could not delete ${blog.title}.`
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

	const handleLogin = async (event) => {
		event.preventDefault()
		//console.log('logging in with', username, password)
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
			setClassName('delete')
			setNotificationMessage('wrong username or password')
			setTimeout(() => {
				setClassName(null)
				setNotificationMessage(null)
			}, 5000)
		}
	}

	const handleLogout = async (event) => {
		event.preventDefault()
		//console.log('logging out with the username', username)
		localStorage.clear()
		window.location.reload()
		setClassName('update')
		setNotificationMessage('Logged out')
		setTimeout(() => {
			setClassName(null)
			setNotificationMessage(null)
		}, 5000)

	}

	// These are done directly in const loginForm
	// const handleUsernameChange = (event) => {
	// 	event.preventDefault()
	// 	setUsername(event.target.value)
	// }

	// const handlePasswordChange = (event) => {
	// 	event.preventDefault()
	// 	setPassword(event.target.value)
	// }

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

	const blogForm = () => {
		return (
			<div>
				<SearchForm onChange={handleSearchTermChange} />
				<h2>Add a new blog to the list</h2>

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
			<h1>Blogister v. 0.0.3.7.2</h1>

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