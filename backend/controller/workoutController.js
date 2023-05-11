const express=require("express")
const workout=require('../model/workoutModel')
const mongoose=require("mongoose")

//get all workouts
const getWorkouts=async (req,res)=>{
    const user_id=req.user._id
try {
    const Workouts=await workout.find({user_id}).sort({createdAt:-1})
    res.status(200).json(Workouts)
} catch (error) {
    res.status(404).json({error:error.message})
}
}

//get a single workout
const getWorkout=async (req,res)=>{
    
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id))
    {
       
        return res.status(404).json({error:"Not exist Workout"})
    }
    try {
        const Workout=await workout.findById(id)
        if(!Workout)
        {
            return res.status(400).json({error:"No Workout exist"})
        }
        res.status(200).json(Workout)
    } catch (error) {
        res.status(404).json({error:error.message})
    }
}


//Create a new Workout
const createNewWorkout= async (req,res)=>{
    
        const {title,load,reps}=req.body
        let emptyFields=[]
        if(!title)
        {
       emptyFields.push('title')
        }
        if(!load)
        {
       emptyFields.push('load')
        }
        if(!reps)
        {
       emptyFields.push('reps')
        }
        if(emptyFields.length>0)
        {
           return res.status(400).json({error:"please fill in all fields",emptyFields})
        }
        try {
            const user_id=req.user._id
           const Workout= await workout.create({title,load,reps,user_id})
           res.status(200).json(Workout)
        } catch (error) {
            res.status(400).json({error:error.message})
        }
}

//delete a workout
const deleteWorkout=async (req,res)=>{
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id))
    {
       
        return res.status(404).json({error:"Not exist Workout"})
    }
    try {
        const Workout=await workout.findOneAndDelete({_id:id})
        if(!Workout)
        {
            return res.status(400).json({error:"No Workout exist"})
        }
        res.status(200).json(Workout)
    } catch (error) {
        res.status(404).json({error:error.message})
    }
}

//Update a workout
const updateWorkout=async (req,res)=>{
    const {id}=req.params
    console.log("hiiieyyeye");
    if(!mongoose.Types.ObjectId.isValid(id))
    {
       
        return res.status(404).json({error:"Not exist Workout"})
    }
        const Workout=await workout.findOneAndUpdate({_id:id},{...req.body})

        if(!Workout)
        {
            return res.status(400).json({error:"No Workout exist"})
        }
        res.status(200).json(Workout)
    } 
        
    


module.exports={
    createNewWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
}