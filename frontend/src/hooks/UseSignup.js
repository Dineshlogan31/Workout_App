import  { useState } from "react";
import {UseAuthContext} from './UseAuthContext'

export const useSignup=()=>{
    const[error,setError]=useState(null)
    const[isLoading,setIsLoading]=useState(null)
    const {dispatch}=UseAuthContext()

  const signup=async(email,password)=>{
    setIsLoading(true)
    setError(null)

    const response=await fetch("https://workout-app-fxzl.vercel.app/api/user/signup",{
        method:"POST",
        headers:{'Content-Type':'application/json'},
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
  return {signup,isLoading,error}
}