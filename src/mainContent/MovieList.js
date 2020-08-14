import React, { useState, useRef } from 'react'
import './MovieList.css'

export function MovieList ({index, searchItem, APICall}) {
  const [posterOnClick, setPosterCSS] = useState('')
  const [describeView, setDescribe] = useState('')
  const valueElement = useRef()

  function toLoadDetails(e) {
    // setPosterCSS('posterHover')
    // setDescribe('imgDesHover')
    APICall(valueElement.current)
  }
  
  return(
    <div className={'poster display-flex '+posterOnClick}
         key={index} 
         value={searchItem.imdbID} 
         onClick={toLoadDetails}
         ref={valueElement}>
      {(searchItem.Poster !== 'N/A' && searchItem.Poster !== undefined)?
        <img src={searchItem.Poster} className='imageCSS' alt={searchItem.Title}></img>
        
        : <div className='imageCSS'>{searchItem.Title}</div>
        
      }
      <div className={'display-flex imgDes '+describeView}>
        <div>Movie : {searchItem.Title}</div>
        <div>Year : {searchItem.Year}</div>
      </div>
    </div>
  )
}