import React from 'react';
import ReactDOM from 'react-dom';


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Usings props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }


  return (
    <div>
      <Header header={course} />
      <Content content={course} />
      <Total content={course} />
    </div>
  )
}

const Header = (props) => {
  return (
    <h1>{props.header.name}</h1>
  )
}

const Content = (props) => {
  const content = props.content.parts.map(course => {
    return Part(course)
  })
  return (
    content
  )
}

const Total = (props) => {
  const content = props.content.parts.map(course => {
    return course.exercises
  })
  return (
    'Total exercises ' + content.reduce((a, b) => a + b, 0)
  )
}

const Part = (props) => {
  return (
    <p>{props.name} {props.exercises}</p>
  )
}


ReactDOM.render(<App />, document.getElementById('root'))