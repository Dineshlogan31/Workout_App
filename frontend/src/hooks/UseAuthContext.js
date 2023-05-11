
import {useContext} from "react"
import { AuthContext } from './../context/AuthContext';

export const UseAuthContext=()=>{
   
    const context =useContext(AuthContext)
   
 if(!context)
 {
    throw Error("workout context must be wrapped inside ContextProvider")
 }
    return context
}