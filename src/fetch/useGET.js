import { useState, useEffect } from "react";

// export const useGET = (url = '') => {
 
    
//   return ()
  
// }

export function useGET () {
  const [Data , responseData] = useState([])
  const [Detail, setDetail ] = useState('')
  const [Error, errorHandling] = useState('')
  const [isLoading, SetLoading] = useState(true)
  const [isPagination, setPagination] = useState(false)
  const [toShow, setPopup] = useState('')
  const [searchData, setSearchData] = useState('joker')
  const [pageCount, setCount] = useState(1)
  // const [url, setUrl] = useState('')

    SetLoading(true)
    let baseURL = 'http://www.omdbapi.com/?apikey=a184ae48'
    let url = baseURL + '&s=' + searchData + '&page=' + pageCount
    const APICall = async()=>{

      await fetch(url)
      .then(res => res.json())
      .then((response) => { 
        if(response.Error === undefined){
          if(isPagination){
            let data = [...Data, ...response.Search]
            responseData(data)
            setPagination(false)
          }else if(toShow === 'show'){
            setDetail(response)
          } else {
            responseData(response.Search)
          }
        } else{
          console.log(response.Error)
        }
      } )
      SetLoading(false)
    } 
    console.log(pageCount)
  return {Data, APICall, Detail}
}