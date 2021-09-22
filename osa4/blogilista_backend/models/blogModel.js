const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')

const blogSchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
		unique: true
	},
	author: {
		type: String,
		required: true,
		unique: false
	},
	url: {
		type: String,
		required: true,
		unique: true
	},
	likes: Number,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
})


blogSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

blogSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Blog', blogSchema)