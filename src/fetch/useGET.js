import { useState, useEffect } from "react";

export function useGET (url,isPagination, isDetail, pageCount) {
  
  const [movieList, setList] = useState('')
  const [movieDetail, setDetail] = useState('')
  const [error, errorHandling] = useState('')

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
      if(isPagination && typeof(response.Search) === 'object'){
        let data = [...movieList, ...response.Search]
        setList(data)
      }else if(isDetail === true){
        setDetail(response)
      } else {
        setList(response.Search)
      }
    } else{
      errorHandling(response.Error)
      if(pageCount === 1){
        setList('')
      }
    }
  }
  
  
  return [movieList, movieDetail, error];
  
}