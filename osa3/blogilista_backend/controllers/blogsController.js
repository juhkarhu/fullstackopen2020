const blogsRouter = require('express').Router()
const Blog = require('../models/blogModel')

blogsRouter.get('/', (request, response) => {
    Blog.find({})
        .then(notes => {
        response.json(notes.map(note => note.toJSON()))
    })
})

blogsRouter.get('/:id', (request, response, next) => {
    Blog.findById(request.params.id)
        .then(blog => {
            if (blog) {
                response.json(blog.toJSON())
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

blogsRouter.post('/', (request, response, next) => {
    const body = request.body

    if (!body.title || !body.author || !body.url) {
        return response.status(400).json({error: 'content is missing'})
    }

    // if (!body.title || !body.author || !body.url) {
    //     console.log('JOTAIN PUUTTUU')
    // }

    console.log('router.post:', body)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: 0
    })

    blog.save()
        .then(savedNote => {
            response.json(savedNote.toJSON())
        })
        .catch(error => next(error))
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