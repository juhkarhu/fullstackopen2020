// import Note from './components/Note'

import React from 'react'







const Course = ({course}) => {



    const totalExercises = course.parts.reduce( (sum, part) => {
        return sum + part.exercises
    }, 0)

    return (
        <div>
            <h1>{course.name}</h1>
            <ul>
                {course.parts.map((part) =>
                <li key={part.id}>
                    {part.name} {part.exercises}
                </li>
                )}
                
                <h4>
                    Total of {totalExercises} exercises
                </h4>
            </ul>
        </div>
    )
}







export default Course