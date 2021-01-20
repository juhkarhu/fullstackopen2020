import React from 'react'

const DisplayContact = ({ item, toggleDelete }) => {

    return (
        <li key={item.name}>
                {item.name} {item.number}
                <button onClick={toggleDelete}>delete</button>
            </li>
    )

}



export default DisplayContact