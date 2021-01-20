
import React from 'react'
import Note from './components/Note'






const Course = ({course}) => {
    console.log(course.parts)
    return (
        <div>
            <h1>{course.name}</h1>
            <ul>
                {console.parts((part) => 
                <Note note={part}/>
                )}
            </ul>
            
        </div>
        
    )
}



// const App = ({ notes }) => {
//   return (
//     <div>
//       <h1>Notes</h1>
//       <ul>
//         {notes.map((note, i) => 
//           <Note key={i} note={note} />
//         )}
//       </ul>
//     </div>
//   )
// }








export default Course