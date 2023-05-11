import {UseAuthContext} from '../hooks/UseAuthContext'
import {UseWorkoutContext} from '../hooks/UseWorkoutContext'

export const UseLogout=()=>{
    const {dispatch} =UseAuthContext()
    const{dispatch:workoutDispatch}=UseWorkoutContext()
    const logout=()=>{
        localStorage.removeItem('user')
        dispatch({type:'LOGOUT'})
        workoutDispatch({type:'SET_WORKOUT',payload:null})


        

    }
    return {logout}
}