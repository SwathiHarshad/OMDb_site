import { useState, useEffect } from "react";

export const useGET = url => {
  const [Data, responseData] = useState([])
  const [Error, errorHandling] = useState('')
  const [isLoading, SetLoading] = useState(true)
  
   useEffect(() =>{
    if(url !== undefined){
      getData()
    }
   },[])

  const getData = async()=>{
    const API = await fetch(url)
    .then(res => res.json())
    .then((success) => { responseData(success.Search) } )
    .catch((error)=>{ errorHandling(error)});
    SetLoading(false)
    return(Data)
  } 
   
    
  // return (Data, Error)
  
}