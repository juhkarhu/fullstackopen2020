const blogsRouter = require('express').Router()
const Blog = require('../models/blogModel')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog
		.find({}).populate('user', { username: 1, name: 1 })
	response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (request, response, next) => {
	const blog = await Blog.findById(request.params.id)
	if (blog) {
		response.json(blog.toJSON())
	} else {
		response.status(404).end()
	}
})

const getTokenFrom = request => {
	const authorization = request.get('authorization')
	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
		return authorization.substring(7)
	}
	return null
}

blogsRouter.post('/', async (request, response) => {
	const body = request.body
	console.log('body', body)
	const token = getTokenFrom(request)
	const decodedToken = jwt.verify(token, process.env.SECRET)
	console.log('decodedtoken', decodedToken)
	if (!token || !decodedToken.id) {
		return response.status(401).json({ error: 'token missing or invalid' })
	}
	const user = await User.findById(decodedToken.id)
	console.log('user loydetty', user)

	// if (!body.title || !body.author || !body.url) {
	// 	console.log('content was missing from the input blog')
	// 	return response.status(400).json({ error: 'content is missing' })
	// }

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes === undefined ? 0 : body.likes,
		user: user._id
	})

	const savedBlog = await blog.save()
	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()

	response.json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', async (request, response, next) => {
	await Blog.findByIdAndRemove(request.params.id)
	response.status(204).end()
})

blogsRouter.put('/:id', async (request, response, next) => {
	const body = request.body
	let blog = null
	if (body.title !== undefined) {
		blog = {
			title: body.title,
			author: body.author,
			url: body.url,
			likes: body.likes
		}
	} else {
		const foundBlog = await Blog.findById(request.params.id)
		blog = {
			title: foundBlog.title,
			author: foundBlog.author,
			url: foundBlog.url,
			likes: foundBlog.likes + 1
		}
	}
	await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
		.then(updatedBlog => {
			response.json(updatedBlog.toJSON())
		})
		.catch(error => next(error))
})

module.exports = blogsRouter