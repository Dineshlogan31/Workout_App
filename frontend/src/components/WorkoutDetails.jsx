import React from 'react'
import { UseWorkoutContext } from '../hooks/UseWorkoutContext'
import {UseAuthContext} from '../hooks/UseAuthContext'

//date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow"


const WorkoutDetails = ({workout}) => {
 

  const {dispatch}=UseWorkoutContext()
  const {user}=UseAuthContext()

  const handleClick=async ()=>{
    if(!user)
    {
      return 
    }
    
    const response=await fetch('/api/workouts/'+workout._id,{
      method:"DELETE",
      headers:{
        'Authorization':`Bearer ${user.token}`
      }
    })
    const json=await response.json()
  
    if(response.ok)
    {
      
      dispatch({
        type:'DELETE_WORKOUT',
        payload:json
      })
      
    }
  }
  return (
  <div className='workout-details'>
    <h4>{workout.title}</h4>
    <p><strong>Load (KG): </strong>{workout.load}</p>
    <p><strong>Reps (KG) :</strong>{workout.reps}</p>
    <p>{formatDistanceToNow(new Date(workout.createdAt),{addSuffix:true})}</p>
    {/* <span  className='material-symbols-outlined' id='edit_button' >edit</span> */}
    <span className='material-symbols-outlined' onClick={handleClick}>delete</span>
  </div>
  )
}

export default WorkoutDetails