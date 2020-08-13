import React, { useState } from 'react'
import './SearchBar.css'

function SearchBar({APICall}){
  const [value, setValue] = useState('')

  return(
    <div className= 'searchBar'>
      <div className='inputBox'>
        <input type='text'
        onChange={e=> setValue(e.target.value)}></input>
      </div>
      <div className='btn' onClick={APICall} value={value}>Search</div>
    </div>
  )
}
export default SearchBar  