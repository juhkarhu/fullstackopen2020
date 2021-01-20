import React, { useEffect, useState } from 'react'
import axios from 'axios'


const api_key = process.env.REACT_APP_API_KEY





function DisplayWeather({ items }) {
    const [weathers, setWeathers] = useState([])

    console.log(items)
    // console.log(items[0].capital)
    

    const hook = () => {
        axios
            .get('http://api.weatherstack.com/current'
                + '?access_key=' + api_key
                + '&query=Helsinki')
            .then(response => {
                // console.log(response)
                console.log('weather promise fulfilled')
                setWeathers(response.data)
            })
    }
    useEffect(hook, [])

    // useEffect(() => {
    //     axios
    //       .get('http://api.weatherstack.com/current'
    //         + '?access_key=' + api_key
    //         + '&query=Helsinki')
    //       .then(response => {
    //         // console.log(response)
    //         console.log(' weather promise fulfilled')
    //         setWeathers(response.data)
    //       })
    //   }, [])

    console.log('saan naytossa')
    console.log(weathers)




    return (
        <p></p>
    )


}



export default DisplayWeather