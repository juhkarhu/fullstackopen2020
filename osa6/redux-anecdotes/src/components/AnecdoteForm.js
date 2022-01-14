import React from 'react'
import { useDispatch } from 'react-redux'

import { createAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    dispatch(createAnecdote(anecdote))
    event.target.anecdote.value = ''
  }

  return (
    <div>
      <h3>Create new</h3>
      <form onSubmit={addAnecdote}>

        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </div>

  )

}

export default AnecdoteForm