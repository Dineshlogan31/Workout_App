import  { useState } from "react";
import {UseAuthContext} from './UseAuthContext'

export const useLogin=()=>{
    const[error,setError]=useState(null)
    const[isLoading,setIsLoading]=useState(null)
    const {dispatch}=UseAuthContext()

  const login=async(email,password)=>{
    setIsLoading(true)
    setError(null)

    const response=await fetch("https://workout-app-fxzl.vercel.app/api/user/login",{
        method:"POST",
        headers:{'Content-Type':'application/json'
        },
        body:JSON.stringify({email,password})
    })
    const json=await response.json()
    if(!response.ok)
    {
      setIsLoading(false)
      setError(json.error)
    }
    if(response.ok)
    {
       localStorage.setItem('user',JSON.stringify(json))
       dispatch({
        type:'LOGIN',
        payload:json
       })
       setIsLoading(true)
       
    }
  }
  return {login,isLoading,error}
}