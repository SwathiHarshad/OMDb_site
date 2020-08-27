import React, { useState, useRef, useEffect } from 'react'
import './SearchBar.css'

function SearchBar({APICall, toSort}){
  const [value, setValue] = useState('')
  const node = useRef()
  const [toShow, setShow] = useState(false)
  const [sort, setSort] = useState('Sort')
  const [sortingBy, setSortingBy] = useState('')
  const [sortOrder, setOrder] = useState(true)

  function ArraySort(sortBy,event){
    let order = ''
    if(sortBy === ''){
      order = (sortOrder)?'Ascending': 'Descending'
      setOrder(sortOrder=> !sortOrder)
      toSort(sortingBy,order)
      
    } else{
      setSortingBy(sortBy)
      toSort(sortBy,'Descending')
      setOrder(sortOrder=> true)
      setSort(event.currentTarget.innerText)
      setShow(false)
    }

  }
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
        <span>Swa</span>
      </div>
      <div className='inputBox'>
        <input type='text'
        value={value}
        onChange={e=> setValue(e.target.value)}></input>
      </div>
      <div className='btn' onClick={()=>APICall(value,"search")} value={value}>Search</div>
      <div ref={node} className='dropDownDiv'>
        <div className='btn'>{sort}</div>
        <div className={` ${toShow? 'display-flex':'hide' } `}>
          <div className='options' >
            <div id='Title' onClick={(event)=>ArraySort('Title',event)}>Title</div>
            <div id='Year' onClick={(event)=>ArraySort('Year',event)}>Release</div>
          </div>
        </div>
      </div>
      <div>
        <div className={`Icon sortIcon ${sortOrder ? '': 'Ascending'} ${(sortingBy === '')? 'hide': ''}`} onClick={()=>ArraySort('')}></div>
      </div>
    </div>
  )
}
export default SearchBar  