import {workoutContext} from "../context/WorkoutContext"
import {useContext} from "react"

export const UseWorkoutContext=()=>{
   
    const context =useContext(workoutContext)
  
 if(!context)
 {
    throw Error("workout context must be wrapped inside ContextProvider")
 }
    return context
}