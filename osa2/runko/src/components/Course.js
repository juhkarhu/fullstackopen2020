import React from 'react'


const Course = ({course}) => {
    
    const totalExercises = course.parts.reduce( (sum, part) => {
        return sum + part.exercises
    }, 0)

    return (
        <div>
            <h2>{course.name}</h2>
            <ul>
                {course.parts.map((part) =>
                <p key={part.id}>
                    {part.name} {part.exercises}
                </p>
                )}
                <h4>
                    Total of {totalExercises} exercises
                </h4>
            </ul>
        </div>
    )
}







export default Course