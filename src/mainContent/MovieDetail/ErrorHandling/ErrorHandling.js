import React from 'react'
import './ErrorHandling.css'


export function ErrorHandling ({Error}) {
  return(
    <div className='imageCSS display-flex'>
      <div>
        <div className='Icon errorIcon'></div>
      </div>
      <div>OOPS!!!</div>
      <div>{Error}</div>
    </div>
  )
}