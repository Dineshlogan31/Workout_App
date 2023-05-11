import React,{ useEffect, useState} from 'react'
import {UseWorkoutContext} from "../hooks/UseWorkoutContext"
import {UseAuthContext} from '../hooks/UseAuthContext'

const WorkoutForm = () => {
const {dispatch,workout}=UseWorkoutContext()
    const [title,setTitle]=useState('')
    const [load,setLoad]=useState('')
    const [reps,setReps]=useState('')
    const[error,setError]=useState(null)
    const [emptyFields,setEmptyFields]=useState([])
    const {user}=UseAuthContext()
    
 const handleSubmit=async (e)=>{
        e.preventDefault()
 if(!user)
 {
    setError('You must be logged In')
 }
 console.log("user added");
        const workout={title,load,reps}
        const response=await fetch("/api/workouts",{
            method:"POST",
            body:JSON.stringify(workout),
            headers:{
                "Content-Type":"application/json",
                'Authorization':`Bearer ${user.token}`
                
            }
        })
        const json= await response.json()
        if(!response.ok)
        {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if(response.ok)
        {
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            setEmptyFields([])
            dispatch({
                type:"CREATE_WORKOUT",
                payload:json
            })
        }
    }
    useEffect(()=>{
        if(workout)
        {
            setTitle(workout[0].title)
            setLoad(workout[0].load)
            setReps(workout[0].reps)
            setError(null)
        }
        
    },[workout])
  return (
    <form  className="create" onSubmit={handleSubmit} >
        <h4>Add a new Workout</h4>
       
        <label >Exercise Title</label>
        <input 
        type="text"
        onChange={(e)=>setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes('title')?'error':''}
        />

<label >Load</label>
        <input 
        type="number"
        onChange={(e)=>setLoad(e.target.value)}
        value={load}
        className={emptyFields.includes('load')?'error':''}
        />

<label >Reps</label>
        <input 
        type="number"
        onChange={(e)=>setReps(e.target.value)}
        value={reps}
        className={emptyFields.includes('reps')?'error':''}
        />
{!workout ?
<button >Add Workout</button>:

        
        <button className='update_button' >Update Workout</button> 
       
}
        {error && <div className='error'>
            {error}
            </div>}
    </form>
  )
}

export default WorkoutForm