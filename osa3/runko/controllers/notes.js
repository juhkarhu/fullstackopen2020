const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')
const jwt = require('jsonwebtoken')




notesRouter.get('/', async (request, response) => {
	const notes = await Note
		.find({}).populate('user', { username: 1, name: 1 })
	response.json(notes.map(note => note.toJSON()))

	// Note.find({}).then(notes => {
	// 	response.json(notes.map(note => note.toJSON()))
	// })
})

notesRouter.get('/:id', async (request, response, next) => {
	const note = await Note.findById(request.params.id)
	if (note) {
		response.json(note.toJSON())
	} else {
		response.status(404).end()
	}

	// Note.findById(request.params.id)
	// 	.then(note => {
	// 		if (note) {
	// 			response.json(note.toJSON())
	// 		} else {
	// 			response.status(404).end()
	// 		}
	// 	})
	// 	.catch(error => next(error))
})

const getTokenFrom = request => {
	const authorization = request.get('authorization')
	// console.log('authi', authorization)
	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
		return authorization.substring(7)
	}
	return null
}

notesRouter.post('/', async (request, response, next) => {
	const body = request.body
	const token = getTokenFrom(request)
	const decodedToken = jwt.verify(token, process.env.SECRET)
	if (!token || !decodedToken.id) {
		return response.status(401).json({ error: 'token missing or invalid' })
	}

	const user = await User.findById(decodedToken.id)

	if (body.content === undefined) {
		console.log('bodyn', body, 'kanssa palautetaan 400')
		return response.status(400).json({ error: 'content missing' })
	}

	const note = new Note({
		content: body.content,
		important: body.important === undefined ? false : body.important,
		date: new Date(),
		user: user._id
	})

	const savedNote = await note.save()
	user.notes = user.notes.concat(savedNote._id)
	await user.save()

	response.json(savedNote.toJSON())
})

notesRouter.put('/:id', (request, response, next) => {
	const body = request.body
	const note = {
		content: body.content,
		important: body.important,
	}

	Note.findByIdAndUpdate(request.params.id, note, { new: true })
		.then(updatedNote => {
			response.json(updatedNote.toJSON())
		})
		.catch(error => next(error))
})

notesRouter.delete('/:id', async (request, response, next) => {
	await Note.findByIdAndRemove(request.params.id)
	response.status(204).end()
})
module.exports = notesRouter