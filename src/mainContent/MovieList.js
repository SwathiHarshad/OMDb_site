import React from 'react'
import './MovieList.css'
import { ErrorHandling } from './MovieDetail/ErrorHandling/ErrorHandling'

export function MovieList ({Data, APICall}) {
  return(
    (Data)? (
      Data.map((searchItem, index)=>(
        <div className='poster display-flex'   key={searchItem.imdbID}   onClick={()=>APICall(searchItem.imdbID,"movieId")}>
          {
          (searchItem.Poster !== 'N/A' && searchItem.Poster !== undefined)?
            <img src={searchItem.Poster} className='imageCSS' alt={searchItem.Title}></img>
            : <ErrorHandling Error='Poster not available'></ErrorHandling>
          }
          <div className='display-flex imgDes'>
            <div>{searchItem.Title}</div>
            <div><span>(</span>{searchItem.Year}<span>)</span></div>
            <div className='Icon navigationIcon'></div>
          </div>
        </div>
      ))
    )
    : null
  )
}