const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/userModel')

const Blog = require('../models/blogModel')

// let token


describe('after some blogs are added', () => {
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

	describe('adding blogs', () => {
		beforeEach(async () => {
			await User.deleteMany({})

			const passwordHash = await bcrypt.hash('salainen', 10)
			const user = new User({ username: 'juhkarhu', passwordHash })
			await user.save()
		})


		test('fails without authorization', async () => {
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

		/* test('succeeds with valid input', async () => {
			const existingUser = {
				username: 'juhkarhu',
				password: 'salainen',
			}

			const newBlog = {
				title: 'Koiruuksia',
				author: 'Henna Hauvau',
				url: 'www.koiruuksia.fi',
				likes: 100
			}


			await api
				.post('/api/blogs')
				.set('Authorization', `Bearer ${token}`)
				.send(newBlog)
				.expect(200)
				.expect('Content-type', /application\/json/)

			const blogsAtEnd = await helper.blogsInDb()
			expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
		})

		test('fails without proper title and url and are met with status 400', async () => {
			const newBlog = {
				author: 'Henna Hauvau'
			}
			await api
				.post('/api/blogs')
				.send(newBlog)
				.expect(400)
		}) */
	})

	describe('removing blogs', () => {
		test('succeeds with status code 204 if id is valid', async () => {
			const blogsAtStart = await helper.blogsInDb()
			const blogToDelete = blogsAtStart[0]

			await api
				.delete(`/api/blogs/${blogToDelete.id}`)
				.expect(204)

			const blogsAtEnd = await helper.blogsInDb()
			expect(blogsAtEnd).toHaveLength(
				helper.initialBlogs.length - 1
			)

			const contents = blogsAtEnd.map(blog => blog.title)
			expect(contents).not.toContain(blogToDelete.title)
		})
	})

	describe('amount of likes', () => {

		test('of empty list is zero', async () => {
			const blogs = []
			const result = await helper.totalLikes(blogs)
			expect(result).toBe(0)
		})

		test('is 1338', async () => {
			const blogsAtStart = await helper.blogsInDb()
			// const processedBlogs = await blogsAtStart.map(blog => JSON.parse(JSON.stringify(blog)))
			const likes = await helper.totalLikes(blogsAtStart)
			expect(likes).toBe(1338)
		})

		// test('are set to 0 if none are given', async () => {
		// 	const newBlog = {
		// 		title: 'Koiruuksia',
		// 		author: 'Henna Hauvau',
		// 		url: 'www.koiruuksia.fi'
		// 	}
		// 	await api
		// 		.post('/api/blogs')
		// 		.send(newBlog)
		// 		.expect(200)
		// 		.expect('Content-type', /application\/json/)

		// 	const blogsAtEnd = await helper.blogsInDb()
		// 	const addedBlog = blogsAtEnd[2]
		// 	console.log('vika blogi', addedBlog)
		// })

		test('of one blog equals the likes of that blog', async () => {
			const blogsAtStart = await helper.blogsInDb()
			// const oneBlog = [blogsAtStart[0]]
			const result = await helper.totalLikes([blogsAtStart[0]])
			expect(result).toBe(blogsAtStart[0].likes)
		})

		test('can be altered', async () => {
			const blogsAtStart = await helper.blogsInDb()
			const toBeUpdatedBlog = blogsAtStart[0]
			const blogObject = {
				title: toBeUpdatedBlog.title,
				author: toBeUpdatedBlog.author,
				url: toBeUpdatedBlog.url,
				likes: toBeUpdatedBlog.likes + 1
			}
			console.log('1338', blogObject)
			await api
				.put(`/api/blogs/${toBeUpdatedBlog.id}`)

			const blogsAtEnd = await helper.blogsInDb()
			console.log(blogsAtEnd)
			// const updatedBlog = blogsAtEnd[0]
			// console.log('up', updatedBlog)
			// expect(updatedBlog.likes).toBe(1338)
		})

	})

	describe('favourite blog', () => {
		test('is the first one', async () => {
			const blogsAtStart = await helper.blogsInDb()
			const result = await helper.favoriteBlog(blogsAtStart)
			expect(result.likes).toBe(1337)
		})
	})

	describe('when there is initially one user at db', () => {
		beforeEach(async () => {
			await User.deleteMany({})

			const passwordHash = await bcrypt.hash('sekret', 10)
			const user = new User({ username: 'root', passwordHash })

			await user.save()
		})

		test('creation succeeds with a fresh username', async () => {
			const usersAtStart = await helper.usersInDb()

			const newUser = {
				username: 'juhkarhu',
				name: 'Juhana Karhunen',
				password: 'salainen',
			}

			await api
				.post('/api/users')
				.send(newUser)
				.expect(200)
				.expect('Content-Type', /application\/json/)

			const usersAtEnd = await helper.usersInDb()
			expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

			const usernames = usersAtEnd.map(u => u.username)
			expect(usernames).toContain(newUser.username)
		})

		test('creation fails with proper statuscode and message if username already taken', async () => {
			const usersAtStart = await helper.usersInDb()

			const newUser = {
				username: 'root',
				name: 'Superuser',
				password: 'salainen',
			}

			const result = await api
				.post('/api/users')
				.send(newUser)
				.expect(400)
				.expect('Content-Type', /application\/json/)

			expect(result.body.error).toContain('`username` to be unique')

			const usersAtEnd = await helper.usersInDb()
			expect(usersAtEnd).toHaveLength(usersAtStart.length)
		})
	})

})


afterAll(() => {
	mongoose.connection.close()
})