import { useState, useEffect } from "react";

export function useGET (url, isDetail, pageCount, movieId) {
  
  const [movieList, setList] = useState('')
  const [movieDetail, setDetail] = useState('')
  const [error, errorHandling] = useState('')
  const [isPagination, setPagination] = useState(false)

  useEffect(()=>{
    if(pageCount !== 1){
      setPagination(true)
    }else{
      setPagination(false)
      setList('')
    }
  },[pageCount])


  useEffect(()=>{
    setDetail('')
  },[movieId])
  
  useEffect(() => {
    if(url !== ''){
      const getData = async()=>{
        await fetch(url)
        .then(res => res.json())
        .then((response) => { 
          updateDataFromResponse(response)
        } )
      } 
      getData()
    }
  },[url])

  function updateDataFromResponse(response){
    if(response.Error === undefined){
      if(isPagination){
        let data = [...movieList, ...response.Search]
        setList(data)
      }else if(isDetail === true){
        setDetail(response)
      } else {
        setList(response.Search)
      }
    } else{
      errorHandling(response.Error)
    }
  }
  
  return [movieList, movieDetail, error];
  
}