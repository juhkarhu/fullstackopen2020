const Blog = require('../models/blogModel')
const User = require('../models/userModel')

const _ = require('lodash')

// @ Palaa tehtäviin 4.6 ja 4.7

const initialBlogs = [
	{
		title: 'Koirulit',
		author: 'Kirsi Hauhau',
		url: 'www.koirulit.fi',
		likes: 1337

	},
	{
		title: 'Leilikanvarret',
		author: 'Kirsi Heilari',
		url: 'www.leilikka.fi',
		likes: 1
	}
]

const blogsInDb = async () => {
	const blogs = await Blog.find({})
	return blogs.map(blog => blog.toJSON())
}

const totalLikes = (blogs) => {
	let size = _.size(blogs)
	// let size = _.keys(blogs).length
	console.log('lodi', size)

	var likes = blogs.reduce((sum, blog) => sum + blog.likes, 0)
	return likes
}

const favoriteBlog = (blogs) => {
	// var favorite = blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog)
	const maxLikes = Math.max(...blogs.map(blog => blog.likes))
	const favorite = blogs.find(blog => blog.likes === maxLikes)
	return favorite
}

const usersInDb = async () => {
	const users = await User.find({})
	return users.map(u => u.toJSON())
}
module.exports = {
	initialBlogs,
	blogsInDb,
	totalLikes,
	favoriteBlog,
	usersInDb
}