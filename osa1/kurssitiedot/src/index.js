import React from 'react';
import ReactDOM from 'react-dom';


const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <h1>
        <Header name={course} />
      </h1>
      <div>
        <Content course1={part1} course1Exercises={exercises1} course2={part2} course2Exercises={exercises2} course3={part3} course3Exercises={exercises3} />
      </div>
      <Total exercises={exercises1 + exercises2 + exercises3} />
    </div>
  )

}

const Header = (props) => {
  return (
    <div>
      <p>{props.name}</p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.course1} partExercises={props.course1Exercises} />
      <Part part={props.course2} partExercises={props.course2Exercises} />
      <Part part={props.course3} partExercises={props.course3Exercises} />
    </div>
  )
}

const Total = (props) => {
  return (
    <div>Total number of exercises {props.exercises}</div>
  )
}

const Part = (props) => {
  return (
    <p>{props.part} {props.partExercises}</p>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))