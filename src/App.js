import React,{useEffect, useState} from 'react'
import './App.css'
import SearchBar from './SearchBar/SearchBar'
import { MovieList } from './mainContent/MovieList'
import { MovieDetail } from './mainContent/MovieDetail/MovieDetail'

function App () {
  const [Data , responseData] = useState([])
  const [Detail, setDetail ] = useState('')
  const [Error, errorHandling] = useState('')
  const [isLoading, SetLoading] = useState(true)
  const [isPagination, setPagination] = useState(true)
  const [toShow, setPopup] = useState('')
  const [searchData, setSearchData] = useState('joker')
  const [pageCount, setCount] = useState(1)
  const [url, setUrl] = useState('http://www.omdbapi.com/?apikey=a184ae48&s='+searchData+'&page='+pageCount+'')

/** For pagination */
  useEffect(()=>{
    window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
  },[])
/* to hit the API for Pagination call */
function handleScroll(){
  if (window.innerHeight + document.documentElement.scrollTop > document.documentElement.offsetHeight-100){
    setPagination(true)
    APICall()
  }
}
/* Fetch Call */
  useEffect(() => {
    const getData = async()=>{
      await fetch(url)
      .then(res => res.json())
      .then((success) => { 
        if(isPagination){
          let data = [...Data, ...success.Search]
          console.log(data)
          responseData(data)
          setPagination(false)
        }else{
          setDetail(success)
        }
        console.log(success)
      } )
      .catch((error)=>{ errorHandling(error)});
      SetLoading(false)
    } 
    getData()
  },[url])

/* To update the url when the separate movie is clicked to hit the API */
  function APICall(e) {
    if(e !== undefined && e.currentTarget !== undefined){
      let value = e.currentTarget.getAttribute('value')
      setPagination(true)
      setSearchData(value)
      setUrl(url.split('&')[0] + '&s=' + value)

    }else if(e !== undefined && e.getAttribute !== undefined){
      setUrl(url.split('&')[0] + '&i=' + e.getAttribute('value'))
      setPopup('show')

    } else if(isPagination){
      setCount(pageCount+1)
      let count = pageCount + 1
      setUrl(url.split('&')[0]+ '&s=' + searchData + '&page=' +count)
    }
/* To close the movie detail popup */
  }
  function toClosePopup() {
    setPopup()
  }

  return (
    <div className='App'>
      <SearchBar APICall={APICall}></SearchBar>
      <div className='mainContent'>
      {
        (Data)? (
          Data.map((searchItem, index)=>(
            <MovieList index={index} key={index} searchItem={searchItem} APICall={APICall} Details={Detail}></MovieList>
          ))
        )
        : (<div>Data not available</div>)
      }
      </div>
      <div className={'popup '+toShow}>
        {(Detail)? (
            <MovieDetail Detail={Detail} toClosePopup={toClosePopup} toShow={toShow}></MovieDetail>
          ) : null
        }
      </div>
    </div>
  )
}

export default App
