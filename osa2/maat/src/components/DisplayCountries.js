import React, {useEffect} from 'react'

// const api_key = process.env.REACT_APP_API_KEY





function DisplayCountries({ items }) {
 
  const handleButtonPress = (props) => {
    console.log(props.nativeEvent)
    console.log(props.nativeEvent.target.id)
  }

    if (items.length > 10) {
      return (
        <p>Too many matches, specify another filter</p>
      )
    }

    if (items.length < 10 && items.length > 1) {
      // console.log('nappi')
      return (
        <ul>
          {items.map(country => (
                  <li key={country.name}>
                      {country.name} <button type='button' id={country.name} onClick={handleButtonPress}>show</button>
                  </li>
              ))}
          </ul>
        )
    }
    if (items.length === 0) {
      return (
        <p>
          no matches
        </p>
      )
    }

    else if (items.length === 1) {
      return (
        <div>
          {items.map(country => (
            <div key={country.name}>
              <h1>{country.name}</h1>
              <p>Capital: {country.capital}</p>
              <p>Population: {country.population}</p>
              <h3>Languages</h3>
              <ul>
                {country.languages.map(language => (
                  <li key={language.name}>
                    {language.name}
                  </li>
                ))}
              </ul>
              {/* Liput pienennetään 3:5 suhteessa */}
              <img src={country.flag} alt="flag of the country" width='250' height='150' />
            </div>
          ))}
        
        </div> 
      )
    }
    // Tänne tullaan jos löydettyjä maita on alle 10 mutta enemmän kuin 1
    return (
      <ul>
        {items.map(country => (
                <li key={country.name}>
                    {country.name}
                </li>
            ))}
        </ul>
      )
    
  }



export default DisplayCountries