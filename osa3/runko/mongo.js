const mongoose = require('mongoose')

if (process.argv.length < 3) {
	console.log('give password as argument')
	process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://juhkarhu:${password}@cluster0.95rah.mongodb.net/note-app?retryWrites=true&w=majority`


mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

// const noteSchema = new mongoose.Schema({
// 	content: String,
// 	date: Date,
// 	important: Boolean,
// })

// noteSchema.set('toJSON', {
// 	transform: (document, returnedObject) => {
// 		returnedObject.id = returnedObject._id.toString()
// 		delete returnedObject._id
// 		delete returnedObject._v
// 	}
// })
 
// const Note = mongoose.model('Note', noteSchema)

// const note = new Note({
// 	content: 'Callback-functions suck',
// 	date: new Date(),
// 	important: true,
// })

const userSchema = mongoose.Schema({
	username: {
		type: String,
		unique: true
	},
	name: String,
	passwordHash: String,
	notes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Note'
		}
	],
})

userSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
		delete returnedObject.passwordHash
	}
})



const User = mongoose.model('User', userSchema)

const user = new User({
	username: 'juhkarhu',
	name: 'Juhana Karhunen',
	password: 'salainen'
})

user.save().then(() => {
	console.log('user saved!')
	mongoose.connection.close()
})




