import React, { useState, useEffect, useCallback } from 'react'
import SearchForm from './components/SearchForm'
import AddPersonForm from './components/AddPersonForm'
import DisplayContact from './components/DisplayContact'
import contactService from './services/contacts'
import Notification from './components/Notification'


const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase()))
  const [message, setMessage] = useState(null)
  const [className, setClassName] = useState(null)


  const fetchPersons = useCallback(() => {
    contactService
      .getAll()
      .then(returnedContacts => {
        setPersons(returnedContacts)
      })
  }, [])

  useEffect(() => {
    contactService
      .getAll()
      .then(initialContacts => {
        setPersons(initialContacts)
      })
  }, [])


  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.filter(person => person.name === newName).length > 0) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new number?`)) {
        console.log('paivitetaan numero')
        const id = persons.filter(person => person.name === personObject.name)
        console.log(id[0])
        contactService
          .put(personObject.number, id)
          .then(() => {
            fetchPersons()
          })
        setClassName('update')
        setMessage(
          `${id[0].name} phonenumber was updated`
        )
        setTimeout(() => {
          setClassName(null)
          setMessage(null)
        }, 2000)

      }
      else {
        setNewName('')
        setNewNumber('')
        setSearchTerm('')
      }
    }
    else {
      contactService
        .create(personObject)
        .then(returnedContacts => {
          setPersons(persons.concat(returnedContacts))
          setNewName('')
          setNewNumber('')
          setSearchTerm('')
        })
      setClassName('update')
      setMessage(
        `${personObject.name} was added to the phonebook`
      )
      setTimeout(() => {
        setClassName(null)
        setMessage(null)
      }, 2000)
    }
  }

  const toggleDelete = (id) => {
    console.log('note no ' + id + ' needs to be deleted')
    const pers = personsToShow.find(person => person.id === id)
    if (window.confirm(`Delete ${pers.name} ?`)) {
      contactService
        .remove(id)
        .then(() => {
          fetchPersons()
        setClassName('delete')
        setMessage(
          `${pers.name} was removed from the phonebook`
        )
        setTimeout(() => {
          setClassName(null)
          setMessage(null)
        }, 2000)
        })
        .catch(error => {
          fetchPersons()
          setClassName('delete')
          setMessage(
            `Information of ${pers.name} has already been removed from the server.`
          )
          setTimeout(() => {
            setClassName(null)
            setMessage(null)
          }, 2000)
        })
    
    }
  }

  const handlePersonChange = (event) => {
    event.preventDefault()
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    event.preventDefault()
    setNewNumber(event.target.value)
  }

  const handleSearchTermChange = (event) => {
    event.preventDefault()
    setSearchTerm(event.target.value.toLowerCase())
  }




  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} className={className} />
      <SearchForm onChange={handleSearchTermChange} />
      <h2>add a new</h2>
      <AddPersonForm onSubmit={addPerson} nameValue={newName} onNameChange={handlePersonChange} numberValue={newNumber} onNumberChange={handleNumberChange} />
      <h2>Contacts</h2>
      <ul>
        {personsToShow.map(person => (
          <DisplayContact
            key={person.id}
            item={person}
            toggleDelete={() => toggleDelete(person.id)}
          />
        ))}
      </ul>

    </div>

  )

}

export default App