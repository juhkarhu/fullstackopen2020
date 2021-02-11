const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const Person = require('./models/person')


app.use(express.static('build'))
app.use(express.json())




const generateId = () => {
    return parseInt(Math.random() * 1000000000)

}


app.get('/info', (request, response) => {
    Person.countDocuments().then(count => {
        const info = {
            content: `Phonebook has info for ${count} people`,
            date: (new Date().toDateString()) + ' ' + (new Date().toTimeString())
        }
        // console.log(count);
        response.end(`${info.content}\n\n${info.date}`)
    })
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    // console.log(request.params.id)
    Person.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch(error=> next(error)) 
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    Person.findByIdAndUpdate(request.params.id, body, {new: true})
        .then(updatedNote => {
            response.json(updatedNote)
        })
        .catch(error => next(error))

})

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    const person = new Person({
        name: body.name,
        number: body.number
        // id: generateId()
    })

    // Perinteinen:
    person.save()
        .then(savedPerson => {
            response.json(savedPerson.toJSON())
        })
        .catch(error => next(error))

    // Promisejen ketjutusta:
    // person
    //     .save()
    //     .then(savedPerson => savedPerson.toJSON())
    //     .then(savedAndFormattedPerson => {
    //         response.json(savedAndFormattedPerson)
    //     })
    //     .catch(error => next(error))

    // Ketjutus nuolifunktiolla:
    // person
    //     .save()
    //     .then(savedPerson => {
    //         return savedPerson.toJSON()
    //     })
    //     .then(savedAndFormattedPerson => {
    //         response.json(savedAndFormattedPerson)
    //     })
    //     .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})


const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint'})
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.log(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({error: 'malformatted id'})
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message})
    }

    next(error)

}
app.use(errorHandler)


morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'));



const port = process.env.PORT || 3001
app.listen(port)
console.log(`Server running on port ${port}`)