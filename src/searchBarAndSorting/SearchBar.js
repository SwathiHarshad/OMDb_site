import React, { useState, useRef, useEffect } from 'react'
import './SearchBar.css'

function SearchBar({APICall, toSort}){
  const [value, setValue] = useState('')
  const node = useRef()
  const [toShow, setShow] = useState(false)

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  });

  const handleClick = e => {
    if (node.current.contains(e.target)) {
      setShow(true)
      return;
    }
    setShow(false)
  };

  return(
    <div className= 'searchBar'>
      <div className='logo'>
        <div></div>
      </div>
      <div className='inputBox'>
        <input type='text'
        onChange={e=> setValue(e.target.value)}></input>
      </div>
      <div className='btn' onClick={APICall} value={value}>Search</div>
      <div ref={node} className='dropDownDiv'>
        <div className='btn'>Sort</div>
        <div className={` ${toShow? 'display-flex':'hide' } `}>
          <div className='options' >
            <span>Sort by Title </span>
            <div onClick={()=>toSort('Title','Ascending')}>Ascending</div>
            <div onClick={()=>toSort('Title','Descending')}>Descending</div>
          </div>
          <div className='options'>
            <span>Sort by Year</span>
            <div onClick={()=>toSort('Year','Ascending')}>Ascending</div>
            <div onClick={()=>toSort('Year','Descending')}>Descending</div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default SearchBar  