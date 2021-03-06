import React, { useState, useEffect } from 'react'
import './MovieDetail.css'
import { ErrorHandling } from './ErrorHandling/ErrorHandling'

export function MovieDetail({Detail, toClosePopup, toShow}){
  const [displayBlock, setDisplay] = useState('')
  useEffect(()=>{
    if(toShow){
      setDisplay('displayBlock')
    } else{
      setDisplay()
    }
  },[toShow])
  return(
    (Detail)? (
      <div id='movieDetail' className={'mainContent '+displayBlock}>
        <span className='closeBtn' onClick={toClosePopup}>+</span>
        {
          (Detail.Poster !== 'N/A' && Detail.Poster !== undefined)?
          <img src={Detail.Poster} className='imageCSS' alt={Detail.Title}></img>
          
          : <ErrorHandling Error='Poster not Available'></ErrorHandling>
          
        }
        <div className='Details'>
          <div>
            <div className='label'>Title: </div>
            <div className='name'>{Detail.Title}</div>
          </div>
          <div>
            <div className='label'>description: </div>
            <div className='name'>{Detail.Plot}</div>
          </div>

          <div>
            <div className='label'>Runtime: </div>
            <div className='name'>{Detail.Runtime}</div>
          </div>
          <div>
            <div className='label'>Genre: </div>
            <div className='name'>{Detail.Genre}</div>
          </div>
          <div>
            <div className='label'>Actors: </div>
            <div className='name'>{Detail.Actors}</div>
          </div>
        {
          (Detail.Director !== 'N/A' && Detail.Director !== null)?
            <div>
              <div className='label'>Director: </div>
              <div className='name'>{Detail.Director}</div>
            </div>
          : null
        }
        {
          (Detail.Writer !== 'N/A' && Detail.Writer !== null)?
            <div>
              <div className='label'>Writer: </div>
              <div className='name'>{Detail.Writer}</div>
            </div>
          : null
        } 
        {
          (Detail.Production !== 'N/A' && Detail.Production !== null)?
            <div>
              <div className='label'>Production: </div>
              <div className='name'>{Detail.Production}</div>
            </div>
          : null
        }
        {
          (Detail.Production !== 'N/A' && Detail.Production !== null)?
            <div>
              <div className='label'>Awards: </div>
              <div className='name'>{Detail.Awards}</div>
            </div>
          : null
        }
        </div>
      </div>
    ): null
  )
}