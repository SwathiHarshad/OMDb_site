import React,{useEffect, useState} from 'react'
import './App.css'
import SearchBar from './SearchBar/SearchBar'
import { MovieList } from './mainContent/MovieList'

function App () {
  const [url, Seturl] = useState('http://www.omdbapi.com/?apikey=a184ae48&s=joker&page=1')
  const [Data , responseData] = useState('')
  const [Error, errorHandling] = useState('')
  const [isLoading, SetLoading] = useState(true)


  useEffect(() => {
    getData()
  },[url])

  const getData = async()=>{
    const API = await fetch(url)
    .then(res => res.json())
    .then((success) => { responseData(success.Search)
    console.log(success) } )
    .catch((error)=>{ errorHandling(error)});
    SetLoading(false)
    return(Data)
  } 

  function APICall(searchData) {
    console.log(searchData.currentTarget.getAttribute('value'))
    // if(searchData !== '') {
    //   url[0].split('&')
    //   Seturl(url.split('&')[0] + '&s=' + searchData)
    // }
  }

  return (
    <div className='App'>
      <SearchBar APICall={APICall}></SearchBar>
      <div className='mainContent'>
      {
        (Data)? (
          Data.map((searchItem, index)=>(
            <MovieList index={index} searchItem={searchItem}></MovieList>
          ))
        )
        : (<div>Data not available</div>)
      }
      </div>
    </div>
  )
}

export default App
