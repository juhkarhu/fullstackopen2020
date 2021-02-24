// const lodash = require('lodash/core')
// @ Palaa tehtäviin 4.6 ja 4.7

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	var likes = blogs.reduce((sum, blog) => sum + blog.likes, 0)
	return likes
}

const favoriteBlog = (blogs) => {
	// var favorite = blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog)
	const maxLikes = Math.max(...blogs.map(blog => blog.likes))
	const favorite = blogs.find(blog => blog.likes === maxLikes)
	return favorite
}


// const mostBlogs = (blogs) => {
// @ Palaa tehtäviin 4.6 ja 4.7
// }

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog
}