const Blog = require('../models/blogModel')

const initialBlogs = [
	{
		title: 'Koirulit',
		author: 'Kirsi Hauhau',
		url: 'www.koirulit.fi',
		likes: 1337

	},
	{
		title: 'Leilikanvarret',
		author: 'Kirsi Hauhau',
		url: 'www.leilikka.fi',
		likes: 1
	}
]

const blogsInDb = async () => {
	const blogs = await Blog.find({})
	return blogs.map(blog => blog.toJSON())
}


module.exports = {
	initialBlogs, blogsInDb
}