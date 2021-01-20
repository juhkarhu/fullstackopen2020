import React from 'react'


const SearchForm = (props) => (
    <div>
        find countries <input onChange={props.onChange}/>
    </div>
)

export default SearchForm