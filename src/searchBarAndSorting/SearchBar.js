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
      sortBy = sortingBy
      if(sortOrder){
        order = 'Ascending'
        setOrder(sortOrder=> false)
        
      }else {
        order = 'Descending'
        setOrder(sortOrder=> true)

      }
      
      toSort(sortBy,order)
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
      </div>
      <div className='inputBox'>
        <input type='text'
        onChange={e=> setValue(e.target.value)}></input>
      </div>
      <div className='btn' onClick={APICall} value={value}>Search</div>
      <div ref={node} className='dropDownDiv'>
        <div className='btn'>{sort}</div>
        <div className={` ${toShow? 'display-flex':'hide' } `}>
          <div className='options' >
            <div onClick={(event)=>ArraySort('Title',event)}>Title</div>
            <div onClick={(event)=>ArraySort('Year',event)}>Release</div>
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