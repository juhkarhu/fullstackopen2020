const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blogModel')

beforeEach(async () => {
	await Blog.deleteMany({})
	console.log('cleared')

	const noteObjects = helper.initialBlogs
		.map(blog => new Blog(blog))
	const promiseArray = noteObjects.map(blog => blog.save())
	await Promise.all(promiseArray)
	console.log('done')
})

test('blogs are returned as json', async () => {
	console.log('entered test')
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)
})

test('two blogs are returned', async () => {
	console.log('entered test')
	const response = await helper.blogsInDb()
	expect(response).toHaveLength(helper.initialBlogs.length)
})

test('identifier id is named id', async () => {
	console.log('entered test')
	const blogsAtStart = await helper.blogsInDb()
	// console.log(blogsAtStart)

	for (let blog of blogsAtStart) {
		expect(blog.id).toBeDefined()
	}

})

test('a valid blog can be added', async () => {
	const newBlog = {
		title: 'Koiruuksia',
		author: 'Henna Hauvau',
		url: 'www.koiruuksia.fi',
		likes: 100
	}
	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(200)
		.expect('Content-type', /application\/json/)

	const blogsAtEnd = await helper.blogsInDb()
	expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
})

test('likes are set to 0 if none are given', async () => {
	const newBlog = {
		title: 'Koiruuksia',
		author: 'Henna Hauvau',
		url: 'www.koiruuksia.fi'
	}
	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(200)
		.expect('Content-type', /application\/json/)

	const blogsAtEnd = await helper.blogsInDb()
	const addedBlog = blogsAtEnd[2]
	console.log('vika blogi', addedBlog)
})

test('post without title and url are met with 400 bad request', async () => {
	const newBlog = {
		author: 'Henna Hauvau'
	}
	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(400)

})

// test('a valid note can be added', async () => {
// 	const newNote = {
// 		content: 'async/await simplifies making async calls',
// 		important: true
// 	}
// 	await api
// 		.post('/api/notes')
// 		.send(newNote)
// 		.expect(200)
// 		.expect('Content-Type', /application\/json/)


// 	const notesAtEnd = await helper.notesInDb()
// 	expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1)

// 	const contents = notesAtEnd.map(n => n.content)
// 	expect(contents).toContain(
// 		'async/await simplifies making async calls'
// 	)
// })


afterAll(() => {
	mongoose.connection.close()
})