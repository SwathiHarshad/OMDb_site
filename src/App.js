import React,{useEffect, useState} from 'react'
import './App.css'

function App () {
  const [searchData, searchFunc] = useState('')
  const [url, Seturl] = useState('http://www.omdbapi.com/?apikey=a184ae48&s=joker&page=1')
  const [Data , responseData] = useState('')

  useEffect(() => {
    fetch(url)
    .then(res => res.json())
    .then((success) => { console.log(success) } )
    .catch((error)=>{ console.log(error)});
  },[url])

  function APIcall() {
    if(searchData !== '') {
      url[0].split('&')
      Seturl(url.split('&')[0] + '&s=' + searchData)
    }
  }

  return (
    <div className='App'>
      <div className= 'searchbar'>
        <div className='inputBox'>
          <input type='text'></input>
        </div>
        <div className='btn'>Search</div>
      </div>
    </div>
  )
}

export default App
