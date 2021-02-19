const express = require('express')
const app = express()
require('dotenv').config()
const Note = require('./models/note')

const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

const generateId = () => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(n => n.id))
        : 0
    return maxId + 1
}

// let notes = [
//     {
//         id: 1,
//         content: "HTML is very easy",
//         date: "2020-01-10T17:30:31.098Z",
//         important: true
//     },
//     {
//         id: 2, 
//         content: "Browser can execute only Javascript",
//         date: "2020-01-10T18:39:34.091Z",
//         important: false
//     },
//     {
//         id: 3,
//         content: "GET and POST are the most important methods of HTTP protocol",
//         date: "2020-01-10T19:20:14.298Z",
//         important: true
//     }
// ]


app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
    })
})

app.get('/api/notes/:id', (request, response) => {
    Note.findById(request.params.id).then(note => {
        response.json(note)
    })
})

app.put('/api/notes/:id', (request, response) => {
    // Ei anna enaa important-arvoon liittyvaa virheilmoitusta.
    const body = request.body
    console.log('body', body)

    const note = {
        content: body.content,
        important: body.important
    }

    Note.findByIdAndUpdate(request.params.id, note, { new: true })
        .then(updatedNote => {
            response.json(updatedNote.toJSON())
        })
        .catch(error => next(error))
}) 


app.post('/api/notes', (request, response) => {
    const body = request.body
    console.log('postaamassa', body) 

    if (body.content == undefined) {
        return response.status(400).json({
            error: 'content is missing'
        })
    }

    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date()
        // id: generateId()
    })
    note.save().then(savedNote => {
        response.json(savedNote)
    })
})


app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)


const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)
const PORT = process.env.PORT

app.listen(PORT), () => {
    console.log(`Server running on port ${PORT}`)
}