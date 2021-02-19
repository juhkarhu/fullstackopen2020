import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SearchForm from './components/SearchForm'
import DisplayCountries from './components/DisplayCountries'
import DisplayWeather from './components/DisplayWeather'


function App() {

  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [weathers, setWeathers] = useState([])
  const countriesToShow = countries.filter(country => country.name.toLowerCase().includes(searchTerm.toLowerCase()))
  const api_key = process.env.REACT_APP_API_KEY

 
  // const hook = () => {
  //   // console.log('maat nayta')
  //   // console.log(countriesToShow)
  //     console.log('sää')
  //     axios
  //       .get('http://api.weatherstack.com/current'
  //         + '?access_key=' +api_key
  //         + '&query=Helsinki')
  //     .then(response => {
  //       console.log(response)
  //       console.log(' weather promise fulfilled')
  //       setWeathers(response.data)
  //     })
  // }


  // useEffect(() => {
  //   axios
  //     .get('http://api.weatherstack.com/current'
  //       + '?access_key=' + api_key
  //       + '&query=Helsinki')
  //     .then(response => {
  //       // console.log(response)
  //       console.log(' weather promise fulfilled')
  //       setWeathers(response.data)
  //     })
  // }, [])

  // useEffect(hook, [])
  // console.log(weathers)

  useEffect(() => {
    console.log('maiden haku')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        // console.log('promise fulfilled')
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
