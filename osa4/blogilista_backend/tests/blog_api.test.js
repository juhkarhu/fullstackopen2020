const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blogModel')

const initialBlogs = [
  {
    'title': 'Koirat ja minä',
    'author': 'Kirsi Koira',
    'url': 'www.koirulit.fi',
    'likes': 1222
  },
  {
    'title': 'Helmeilevät Kiehkurat',
    'author': 'Marja-Leena Keihkura',
    'url': 'www.kiehkuroidenpauloissa.fi',
    'likes': 100
  }
]
beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})


const api = supertest(app)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two notes', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
})

test('the first note is Hakublogi', async () => {
  const response = await api.get('/api/blogs')

  const title = response.body.map(response => response.title)

  expect(title).toContain('Helmeilevät Kiehkurat')
})

afterAll(() => {
  mongoose.connection.close()
})
