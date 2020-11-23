import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const Statistics = (props) => {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>good</td>
            <td>{props.good}</td>
          </tr>
          <tr>
            <td>neutral</td>
            <td>{props.neutral}</td>
          </tr>
          <tr>
            <td>neutral</td>
            <td>{props.bad}</td>
          </tr>
          <tr>
            <td>all</td>
            <td>{props.all}</td>
          </tr>
          <tr>
            <td>average</td>
            <td>{props.average}</td>
          </tr>
          <tr>
            <td>positive</td>
            <td>{props.positive} %</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const Display = props => <div>{props.text}</div>

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [reviews, setReviews] = useState(0)
  const [median, setMedian] = useState(0)
  const [feedback, setFeedback] = useState(false)
  const [selected, setSelected] = useState(1)
  const [points, setPoints] = useState(new Array(anecdotes.length + 2).join('0').split('').map(parseFloat))
  const [mostPointsIndex, setMostPointsIndex] = useState(1)

  const handleVoteClick = () => {
    const copy = [...points]
    copy[selected] += 1
    setMostPointsIndex(copy.indexOf(Math.max(...copy)))
    setPoints(copy)
  }


  const handleGoodClick = () => {
    setFeedback(true)
    setMedian(median + 1)
    setReviews(reviews + 1)
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setFeedback(true)
    setReviews(reviews + 1)
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setFeedback(true)
    setMedian(median - 1)
    setReviews(reviews + 1)
    setBad(bad + 1)
  }


  const handleAnecdoteClick = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
    console.log(selected)
  }

  if (feedback === false) {
    return (
      <div>
        <div>
          <h1>give feedback</h1>
          <Button onClick={handleGoodClick} text='good' />
          <Button onClick={handleNeutralClick} text='neutral' />
          <Button onClick={handleBadClick} text='bad' />
          <h1>statistics</h1>
          <h4>No feedback given</h4>
          <p></p>

          <h2>Anecdote of the day</h2>
          <Display text={anecdotes[selected]} />
          <p>has {points[selected]} points</p>
          <Button onClick={handleVoteClick} text='vote' />
          <Button onClick={handleAnecdoteClick} text='next anecdote' />
          <h2>Anecdote with the most votes</h2>
          <Display text={anecdotes[mostPointsIndex]} />
          <p>has {points[mostPointsIndex]} points</p>


        </div>
      </div>
    )
  }
  return (
    <div>
      <div>
        <h1>give feedback</h1>
        <Button onClick={handleGoodClick} text='good' />
        <Button onClick={handleNeutralClick} text='neutral' />
        <Button onClick={handleBadClick} text='bad' />
        <h1>statistics</h1>
        <Statistics good={good} neutral={neutral} bad={bad} all={reviews} average={median / reviews} positive={(good / reviews) * 100} />
        <p></p>

        <h2>Anecdote of the day</h2>
        <Display text={anecdotes[selected]} />
        <p>has {points[selected]} points</p>
        <Button onClick={handleVoteClick} text='vote' />
        <Button onClick={handleAnecdoteClick} text='next anecdote' />
        <h2>Anecdote with the most votes</h2>
        <Display text={anecdotes[mostPointsIndex]} />
        <p>has {points[mostPointsIndex]} points</p>
        <p></p>
      </div>
    </div>
  )



}


ReactDOM.render(
  <App />, document.getElementById('root')
)