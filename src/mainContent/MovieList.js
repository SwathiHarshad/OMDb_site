import React from 'react'

export function MovieList ({index, searchItem}) {
  function toLoadDetails(e) {
    console.log(e.currentTarget)
  }
  
  return(
    <div className='poster display-flex' key={index} movieid={searchItem.imdbID} onClick={toLoadDetails}>
      <img src={searchItem.Poster} className='imageCSS'></img>
      <div className='display-flex imgDes'>
        <div>{searchItem.Title}</div>
        <div>{searchItem.Year}</div>
      </div>
    </div>
  )
}