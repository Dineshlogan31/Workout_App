import React, { useEffect } from 'react'
import WorkoutDetails from './../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';
import {UseWorkoutContext} from "../hooks/UseWorkoutContext"
import {UseAuthContext} from '../hooks/UseAuthContext'


const Home = () => {
    const {workouts,dispatch}=UseWorkoutContext()
    const {user} =UseAuthContext()

    useEffect(()=>{
        const fetchWorkouts= async ()=>{
            const response=await fetch("/api/workouts",{
                headers:{
                    'Authorization':`Bearer ${user.token}`
                }
            })
            const result=await response.json()
            if(response.ok)
            {
             dispatch({
                type:"SET_WORKOUTS",
                payload:result
             })
            }
        }
        if(user)
        {
            fetchWorkouts()
        }

    },[dispatch,user])
  return (
    <div className='home'>
        <div className='workouts'>
       {workouts && workouts.map((workout)=>{
        return(
            <WorkoutDetails key={workout._id} workout={workout}/>
        )
        
       })}
       </div>
<WorkoutForm />
    </div>
  )
}

export default Home