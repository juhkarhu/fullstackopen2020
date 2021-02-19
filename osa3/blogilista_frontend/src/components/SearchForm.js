import React from 'react'


const SearchForm = (props) => (
    <div>
        Search <input onChange={props.onChange} />
    </div>
)

export default SearchForm