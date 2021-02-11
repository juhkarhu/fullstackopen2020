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
    console.log(personObject)
    // Tutkitaan onko listassa jo saman nimista henkiloa. 
    const hit = persons.filter(person => person.name.toLowerCase() === newName.toLowerCase()).length > 0
    console.log(hit)

    if (personObject.number.length <= 0) {
      // console.log('tapahtuu jos number pituus pienempi tai yhtasuuri kuin nolla')
      setClassName('error')
      setMessage(
        `Only a name was given, you need to specify a number as well`
      )
      setTimeout(() => {
        setClassName(null)
        setMessage(null)
      }, 2000)
    } else if (hit) {
      // console.log('hit oli totta, kysytaan halutaanko paivittaa tietue')
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new number?`)) {
        
        // ID luodaan vasta backendissa, mitas nyt.
        // const personObject = persons.filter(person => person.name.toLowerCase() === newName.toLowerCase())
        
        
        
        // console.log('paivitetaan numero')
        const found_person = persons.filter(person => person.name.toLowerCase() === personObject.name.toLowerCase())
        // console.log('loydetty henkilo', found_person[0])

        found_person[0].number = personObject.number
        // console.log('loydetty henkilo numeron paivityksen jalkeen', found_person[0])
        const id = found_person[0].id
        // console.log('loydetty id', id)
        contactService
          .put(found_person[0])
          .then(() => {
            fetchPersons()
          })
        setClassName('update')
        setMessage(
          `${found_person[0].name}'s number was updated`
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
      <h1>Phonebook v. 0.0.4</h1>
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