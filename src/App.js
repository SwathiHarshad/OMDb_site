import React,{useEffect, useState} from 'react'
import './App.css'
import SearchBar from './searchBarAndSorting/SearchBar'
import { MovieList } from './mainContent/MovieList'
import { MovieDetail } from './mainContent/MovieDetail/MovieDetail'
import { ErrorHandling } from './mainContent/MovieDetail/ErrorHandling/ErrorHandling'

function App () {
  const [Data , responseData] = useState([])
  const [Detail, setDetail ] = useState('')
  const [Error, errorHandling] = useState('')
  const [isLoading, SetLoading] = useState(false)
  const [isPagination, setPagination] = useState(false)
  const [toShow, setPopup] = useState('')
  const [searchData, setSearchData] = useState('')
  const [pageCount, setCount] = useState(1)
  const [movieId, setMovieId] = useState('')

/** For pagination */
  useEffect(()=>{
    window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
  },[])
/* to hit the API for Pagination call */
  function handleScroll(){
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight-10 && !isLoading ){
      setPagination(true)
      setCount(pageCount=> parseInt(pageCount)+1)
    }
  }
/******  Fetch Call *******/
  useEffect(() => {
    if(searchData !== ''){
      SetLoading(isLoading=> true)
      let baseURL = 'http://www.omdbapi.com/?apikey=a184ae48'
      let url = ''
      errorHandling('')
      if(toShow === ''){ // For pagination and search
        url = baseURL + '&s=' + searchData + '&page=' + pageCount
      } else if(toShow === 'show'){ // To get details for a particular movie
        url = baseURL + '&i=' + movieId
      }
      if(url !== ''){
        const getData = async()=>{
          await fetch(url)
          .then(res => res.json())
          .then((response) => { 
            if(response.Error === undefined){
              if(isPagination && typeof(response.Search) === 'object'){
                let data = [...Data, ...response.Search]
                responseData(data)
                setPagination(false)
              }else if(toShow === 'show'){
                setDetail(response)
              } else {
                responseData(response.Search)
              }
            } else{
              responseData()
              errorHandling(response.Error)
              console.log(response.Error)
            }
          } )
          SetLoading(false)
        } 
        getData()
      }
    }
    
  },[searchData, pageCount, movieId])

/* to hit the API for search and to get details for a movie*/
  function APICall(e) {
    if(e !== undefined && e.currentTarget !== undefined){
      let value = e.currentTarget.getAttribute('value')
      setSearchData(value)
      setPopup('')
      document.body.style.overflow = 'unset';
      setCount(pageCount=> 1)
    }else if(e !== undefined && e.getAttribute !== undefined){
      setMovieId(e.getAttribute('value'))
      setPopup('show')
      document.body.style.overflow = 'hidden';
    }
  }
/* To close the movie detail popup */
  function toClosePopup() {
    setPopup('')
    document.body.style.overflow = 'unset';

  }
/* To sort the data */
  function toSort(key,order){
    let arraySort = Data
    if(key === 'Year') {
      if(order === 'Ascending')
        arraySort = [...Data].sort((a,b) => a.Year > b.Year ? 1 : -1)
      else
        arraySort = [...Data].sort((a,b) => a.Year < b.Year ? 1 : -1)
    }
    else {
      if(order === 'Ascending')
        arraySort = [...Data].sort((a,b) => (a.Title > b.Title) ? 1 : ((b.Title > a.Title) ? -1 : 0))
      else
        arraySort = [...Data].sort((a,b) => (a.Title < b.Title) ? 1 : ((b.Title < a.Title) ? -1 : 0))
    }
    responseData(arraySort)
  }
  return (
    <div className='App'>
      <SearchBar APICall={APICall} toSort={toSort}></SearchBar>
      <div className='mainContent'>
      {
        (Data)? (
          Data.map((searchItem, index)=>(
            <MovieList index={index} key={index} searchItem={searchItem} APICall={APICall} Details={Detail}></MovieList>
          ))
        )
        : null
      }
      </div>
      <div className={'popup '+toShow}>
        {(Detail)? (
            <MovieDetail Detail={Detail} toClosePopup={toClosePopup} toShow={toShow}></MovieDetail>
          ) : null
        }
      </div>
      <div className={` hide  ${ isLoading ? 'display-flex' : ''} `}><div>Loading....</div><div className='Icon loadingIcon'></div></div>
      <div className={`${ (Error === '')? 'hide': ''}`}>
        <ErrorHandling Error={Error}></ErrorHandling>
      </div>
    </div>
  )
}

export default App
