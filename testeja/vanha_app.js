const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const Person = require('./models/person')


app.use(express.json())
app.use(express.static('build'))



const generateId = () => {
    return parseInt(Math.random()*1000000000)

}


// let persons = [
//     {
//         id: 1,
//         name: "Arto Hellas",
//         number: "040-123456"
//     },
//     {
//         id: 2,
//         name: "Ada Lovelace",
//         number: "39-44-5323523"
//     },
//     {
//         id: 3,
//         name: "Dan Abramov",
//         number: "12-43-234345"
//     },
//     {
//         id: 4,
//         name: "Mary Poppendick",
//         number: "39-23-3423122"
//     }
// ]

app.get('/info', (request, response) => {
    const info = {
        content: `Phonebook has info for ${persons.length} people`,
        date: (new Date().toDateString()) + ' ' + (new Date().toTimeString())
    }

    // response.write('he')
    response.end(`${info.content}\n\n${info.date}`) 
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response) => {

    Person.findById(request.params.id).then(persons => {
        response.json(persons)
    })
})

app.put('/api/persons/:id', (request, response) => {
    console.log('puttia koittamassa')
    const id = Number(request.params.id)
    const body = request.body
    persons = persons.filter(person => person.id !== id)
    persons = persons.concat(body)
    response.json(persons)
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (body.name == undefined) { 
        // console.log('nimea ei ole, error 400 palautetaan')
        return response.status(400).json({
            error: 'content is missing'
        })
    }
    
    const person = new Person ({         
        name: body.name,
        number: body.number
        // id: generateId()
    })

    if (!person.name || !person.number) {
        // console.log('tietoja puuttuu')
        return response.status(400).end('Missing the name or the number')
    }

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
    // persons = persons.concat(person)
    // response.json(person)
})




app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    // hit = persons.filter(person => person.id === id) 
    persons = persons.filter(person => person.id !== id)

    
    // console.log(hit) 

    // if (hit.length === 1) {
    //     console.log('henkilo on olemassa, ja hanet on poistettu')
    // }
   

    // console.log(persons)

    response.status(204).end()
})



morgan.token('body', (req, res) => JSON.stringify(req.body));

app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'));
app.get('/', (request, response) => {
    response.send('<h1>Hello world </h1>')
})


const port = process.env.PORT || 3001
app.listen(port)
console.log(`Server running on port ${port}`)