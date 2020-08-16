import React, { useEffect, useState } from 'react'
import { useGET } from './useGET'


function Testing () {
  const[Error, setData] = useState('Testing')

  const [getData, Testing] = useGET('http://www.omdbapi.com/?apikey=a184ae48&s=joker', true, [], false)
  useEffect(()=>{
    console.log(getData)
    console.log(Testing)
  },[getData, Testing])

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
export default Testing