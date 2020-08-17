import React,{useEffect, useState} from 'react'
import './App.css'
import SearchBar from './searchBarAndSorting/SearchBar'
import { MovieList } from './mainContent/MovieList'
import { MovieDetail } from './mainContent/MovieDetail/MovieDetail'
import { ErrorHandling } from './mainContent/MovieDetail/ErrorHandling/ErrorHandling'
import { useGET } from './fetch/useGET'

function App () {
  const [url, setURL] = useState('')
  const [isLoading, SetLoading] = useState(false)
  const [isPagination, setPagination] = useState(false)
  const [isDetail, setPopup] = useState(false)
  const [searchData, setSearchData] = useState('')
  const [pageCount, setCount] = useState(1)
  const [movieId, setMovieId] = useState('')
  const [movieListData, setMovieList] = useState('')

  /****** Custom hook to hit the API *******/
  const [movieList, movieDetail, error] = useGET(url, isPagination, isDetail, pageCount, movieId)

  useEffect(()=>{
    setMovieList(movieList)
    console.log('App.js: ', movieList)
  },[movieList])

  /** For pagination */
  useEffect(()=>{
    window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
  },[])

  /* To Increment the page count value by one when it reaches the bottom */
  function handleScroll(){
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight-10 && !isLoading ){
      setPagination(true)
      setCount(pageCount=> parseInt(pageCount)+1)
    }
  }

/******  Update the URL to trigger the API call 
 * When 
 * The search input change or 
 * Particular movie were clicked or 
 * When the user reaches the bottom  *******/
  useEffect(() => {
    if(searchData !== ''){
      SetLoading(isLoading=> true)
      let baseURL = 'http://www.omdbapi.com/?apikey=a184ae48'
      if(isDetail === false){ // For pagination and search
        setURL(baseURL + '&s=' + searchData + '&page=' + pageCount)
      } else if(isDetail === true){ // To get details for a particular movie
        setURL(baseURL + '&i=' + movieId)
      }
    }
  },[searchData, pageCount, movieId, isDetail])

/** To update the search input and invoke the popup for movie detail by updating the movie id value*/ 
  function APICall(e) {
    if(e !== undefined && e.currentTarget !== undefined){
      let value = e.currentTarget.getAttribute('value')
      setPagination(false)
      setSearchData(value)
      document.body.style.overflow = 'unset';
      setCount(pageCount=> 1)
    }else if(typeof(e) === 'string'){
      setMovieId(e)
      setPopup(true)
      document.body.style.overflow = 'hidden';
    }
  }
  
/* To close the movie detail popup */
  function toClosePopup() {
    setPopup(false)
    document.body.style.overflow = 'unset';
  }

/* To sort the movie list by ascending and descending */
  function toSort(key,order){
    if(order === 'Ascending')
      setMovieList([...movieListData].sort((a,b) => (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0)))
    else
      setMovieList([...movieListData].sort((a,b) => (a[key] < b[key]) ? 1 : ((b[key] < a[key]) ? -1 : 0)))
  }

  return (
    <div className='App display-flex-center'>

      <SearchBar APICall={APICall} toSort={toSort}></SearchBar>

      <div className='mainContent'>
        <MovieList Data={movieListData} APICall={APICall}></MovieList>
      </div>

      <div className={`popup ${isDetail ? 'show' : ''}`}>
        <MovieDetail Detail={movieDetail} toClosePopup={toClosePopup} toShow={isDetail}></MovieDetail>
      </div>

      <div className={` hide  ${ isLoading ? 'display-flex' : ''} `}>
        <div>Loading....</div>
        <div className='Icon loadingIcon'></div>
      </div>

      <div className={`${ (error === '')? 'hide': ''}`}>
        <ErrorHandling Error={error}></ErrorHandling>
      </div>
    </div>
  )
}

export default App
