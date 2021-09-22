/* eslint-disable no-undef */
const mongoose = require('mongoose')

if (process.argv.length<3) {
	console.log('give password as argument')
	process.exit(1)
}

const password = process.argv[2]

const url =`mongodb+srv://juhkarhu:${password}@cluster0.95rah.mongodb.net/blogilista-test?retryWrites=true&w=majority`
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const blogSchema = mongoose.Schema({
	title: String,
	author: String,
	url: String,
	likes: Number
})

blogSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject._v
	}
})

const Blog = mongoose.model('Blog', blogSchema)

const blog = new Blog({
	title: 'Helmeilevät Kiehkurat',
	author: 'Marja-Leena Keihkura',
	url: 'www.kiehkuroidenpauloissa.fi',
	likes: 100
})

blog.save().then(response => {
	console.log('blog saved!')
	mongoose.connection.close()
})




