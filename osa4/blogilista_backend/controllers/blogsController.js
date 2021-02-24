const blogsRouter = require('express').Router()
const Blog = require('../models/blogModel')

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({})
	response.json(blogs.map(blog => blog.toJSON()))

	// Ilman asynccia
	// Blog.find({})
	// 	.then(notes => {
	// 		response.json(notes.map(note => note.toJSON()))
	// 	})
})

blogsRouter.get('/:id', async (request, response, next) => {

	const blog = await Blog.findById(request.params.id)
	if (blog) {
		response.json(blog.toJSON())
	} else {
		response.status(404).end()
	}

	// Ilman asynccia
	// Blog.findById(request.params.id)
	// 	.then(blog => {
	// 		if (blog) {
	// 			response.json(blog.toJSON())
	// 		} else {
	// 			response.status(404).end()
	// 		}
	// 	})
	// 	.catch(error => next(error))
})

blogsRouter.post('/', async (request, response, next) => {
	const body = request.body

	if (!body.title || !body.author || !body.url) {
		console.log('blogista puuttui joko title, urli tai tekija')
		return response.status(400).json({ error: 'content is missing' })
	}

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes === undefined ? 0 : body.likes
	})

	const savedBlog = await blog.save()
	response.json(savedBlog.toJSON())

	// Ilman asynccia
	// blog.save()
	// 	.then(savedNote => {
	// 		response.json(savedNote.toJSON())
	// 	})
	// 	.catch(error => next(error))
})

blogsRouter.delete('/:id', (request, response, next) => {
	Blog.findByIdAndRemove(request.params.id)
		.then(() => {
			response.status(204).end()
		})
		.catch(error => next(error))
})

blogsRouter.put('/:id', (request, response, next) => {
	const body = request.body
	// console.log('whaat')
	const blog = {
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes
	}

	Blog.findByIdAndUpdate(request.params.id, note, { new: true })
		.then(updatedBlog => {
			response.json(updatedBlog.toJSON())
		})
		.catch(error => next(error))
})

module.exports = blogsRouter