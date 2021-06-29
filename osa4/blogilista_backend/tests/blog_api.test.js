const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
// const bcrypt = require('bcrypt')
// const User = require('../models/userModel')

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

describe('after some blogs are added', () => {

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

	describe('adding blogs', () => {
		let headers

		beforeEach(async () => {
			const newUser = {
				username: 'root',
				name: 'root',
				password: 'sekret',
			}

			await api
				.post('/api/users')
				.send(newUser)

			const result = await api
				.post('/api/login')
				.send(newUser)

			headers = {
				'Authorization': `bearer ${result.body.token}`
			}
		})


		test('fails without user authorization', async () => {
			const newBlog = {
				title: 'Koiruuksia',
				author: 'Henna Hauvau',
				url: 'www.koiruuksia.fi',
				likes: 100
			}
			await api
				.post('/api/blogs')
				.send(newBlog)
				.expect(401)
				.expect('Content-type', /application\/json/)
		})

		test('succeeds with proper info and user authorization', async () => {
			const newBlog = {
				title: 'Testailu Blogi',
				author: 'Tessu Testaaja',
				url: 'www.tamaontesti.fi',
				likes: 10
			}


			await api
				.post('/api/blogs')
				.set(headers)
				.send(newBlog)
				.expect(200)
				.expect('Content-type', /application\/json/)

			const blogsAtEnd = await helper.blogsInDb()
			expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

			const contents = blogsAtEnd.map(blog => blog.title)
			expect(contents).toContain(
				'Testailu Blogi'
			)
		})

		test('fails without proper title and url and are met with status 400', async () => {
			const newBlog = {
				author: 'Salla Sudoku',
				url: 'www.sudokuonparasta.fi',
				likes: 7
			}
			await api
				.post('/api/blogs')
				.set(headers)
				.send(newBlog)
				.expect(400)
		})
	})

	describe('removing blogs', () => {
		let headers

		beforeEach(async () => {
			const newUser = {
				username: 'root',
				name: 'root',
				password: 'sekret',
			}

			await api
				.post('/api/users')
				.send(newUser)

			const result = await api
				.post('/api/login')
				.send(newUser)

			headers = {
				'Authorization': `bearer ${result.body.token}`
			}
		})

		test('succeeds with status code 204 if id is valid', async () => {
			// const blogsAtStart = await helper.blogsInDb()

			const newBlog = {
				title: 'Testailu Blogi',
				author: 'Tessu Testaaja',
				url: 'www.tamaontesti.fi',
				likes: 10
			}
			await api
				.post('/api/blogs')
				.set(headers)
				.send(newBlog)
				.expect(200)

			const allBlogs = await helper.blogsInDb()
			const blogToDelete = allBlogs.find(blog => blog.title === newBlog.title)

			await api
				.delete(`/api/blogs/${blogToDelete.id}`)
				.set(headers)
				.expect(204)

		})

	})

	describe('amount of likes', () => {

		test('of empty list is zero', async () => {
			const blogs = []
			const result = await helper.totalLikes(blogs)
			expect(result).toBe(0)
		})

		test('for all of the blogs is 36', async () => {
			const blogsAtStart = await helper.blogsInDb()
			// const processedBlogs = await blogsAtStart.map(blog => JSON.parse(JSON.stringify(blog)))
			const likes = await helper.totalLikes(blogsAtStart)
			expect(likes).toBe(36)
		})

		test('of one blog equals the likes of that blog', async () => {
			const blogsAtStart = await helper.blogsInDb()
			// const oneBlog = [blogsAtStart[0]]
			const result = await helper.totalLikes([blogsAtStart[0]])
			expect(result).toBe(blogsAtStart[0].likes)
		})

		test('can be altered', async () => {
			const blogsAtStart = await helper.blogsInDb()
			const toBeUpdatedBlog = blogsAtStart[0]
			// const blogObject = {
			// 	title: toBeUpdatedBlog.title,
			// 	author: toBeUpdatedBlog.author,
			// 	url: toBeUpdatedBlog.url,
			// 	likes: toBeUpdatedBlog.likes + 1
			// }
			// console.log('1338', blogObject)
			await api
				.put(`/api/blogs/${toBeUpdatedBlog.id}`)
		})

	})

	describe('favourite blog', () => {
		test('is the one with 12 likes', async () => {
			const blogsAtStart = await helper.blogsInDb()
			const result = await helper.favoriteBlog(blogsAtStart)
			expect(result.likes).toBe(12)
		})
	})
})


afterAll(() => {
	mongoose.connection.close()
})