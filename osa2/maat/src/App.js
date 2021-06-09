import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SearchForm from './components/SearchForm'
import DisplayCountries from './components/DisplayCountries'
import DisplayWeather from './components/DisplayWeather'


function App() {

  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [weather, setWeather] = useState([])
  const countriesToShow = countries.filter(country => country.name.toLowerCase().includes(searchTerm.toLowerCase()))
 
  const url = 'https://restcountries.eu/rest/v2/all'

  useEffect(() => {
    axios
      .get(url)
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase())
  }

  const handleOneCountry = () => {
    if (countriesToShow.length === 1) {
      console.log('minua on vain yksi')
    }
  }



  return (
    <div>
      <SearchForm onChange={handleSearchTermChange} />
      <DisplayCountries items={countriesToShow} />
      <DisplayWeather items={countriesToShow} />

    </div>
  )

}

export default App
