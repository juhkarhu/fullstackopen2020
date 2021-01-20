import React from 'react'




const Note = ({ note }) => {
    console.log('noteissa')
  return (
    <li>{note.name}</li>
  )
}

export default Note