import React, { useState, useRef } from 'react'
import './MovieList.css'
import { ErrorHandling } from './MovieDetail/ErrorHandling/ErrorHandling'

export function MovieList ({index, searchItem, APICall}) {
  const [posterOnClick, setPosterCSS] = useState('')
  const [describeView, setDescribe] = useState('')
  const valueElement = useRef()

  function toLoadDetails(e) {
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
        : <ErrorHandling Error='Poster not available'></ErrorHandling>
      }
      <div className={'display-flex imgDes '+describeView}>
        <div>{searchItem.Title}</div>
        <div><span>(</span>{searchItem.Year}<span>)</span></div>
        <div className='Icon navigationIcon'></div>
      </div>
    </div>
  )
}