const blogRouter = require('express').Router()
const Blog = require('../models/blogModel')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response) => {
	const blogs = await Blog
		.find({}).populate('user', { username: 1, name: 1 })
	response.json(blogs.map(blog => blog.toJSON()))
})

blogRouter.get('/:id', async (request, response, next) => {
	const blog = await Blog
		.findById(request.params.id).populate('user', { username: 1, name: 1 })

	if (blog) {
		response.json(blog.toJSON())
	} else {
		response.status(404).end()
	}
})

blogRouter.post('/', async (request, response) => {
	const body = request.body

	const decodedToken = jwt.verify(request.token, process.env.SECRET)

	const user = await User.findById(decodedToken.id)

	if (!decodedToken.id) {
		return response.status(401).json({
			error: 'token missing or invalid'
		})
	}

	if (!body.title || !body.url) {
		return response.status(400).json({
			error: 'missing title or url'
		})
	}

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes === undefined ? 0 : body.likes,
		user: user.id
	})

	const savedBlog = await blog.save()
	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()

	response.json(savedBlog.toJSON())
})

blogRouter.delete('/:id', async (request, response, next) => {
	const decodedToken = jwt.verify(request.token, process.env.SECRET)

	const user = await User.findById(decodedToken.id)

	if (!decodedToken || !user) {
		return response.status(401).json({
			error: 'token missing or invalid or user not found'
		})
	}

	const blogToBeDeleted = await Blog.findById(request.params.id)

	console.log('tähän asti')
	console.log('blog', blogToBeDeleted.user._id)
	console.log('user', user)

	console.log('findByIdAndRemove', blogToBeDeleted._id.toString())

	if (blogToBeDeleted.user.toString() === user._id.toString() ) {
		await Blog.findByIdAndRemove(request.params.id)
		return response.status(204).end()
	}



})

// blogRouter.put('/:id', async (request, response, next) => {
// 	const body = request.body
// 	let blog = null
// 	if (body.title !== undefined) {
// 		blog = {
// 			title: body.title,
// 			author: body.author,
// 			url: body.url,
// 			likes: body.likes
// 		}
// 	} else {
// 		const foundBlog = await Blog.findById(request.params.id)
// 		blog = {
// 			title: foundBlog.title,
// 			author: foundBlog.author,
// 			url: foundBlog.url,
// 			likes: foundBlog.likes + 1
// 		}
// 	}
// 	await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
// 		.then(updatedBlog => {
// 			response.json(updatedBlog.toJSON())
// 		})
// 		.catch(error => next(error))
// })

module.exports = blogRouter