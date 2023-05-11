const express=require("express")
const {createNewWorkout,getWorkouts,getWorkout,deleteWorkout,updateWorkout}=require('../controller/workoutController')
const requireAuth=require("../middleware/requireAuth")
const router=express.Router()
router.use(requireAuth)
//GET all workouts
router.get("/",getWorkouts)

//GET a single workout
router.get("/:id",getWorkout)

//POST a new workout
router.post("/",createNewWorkout)

//DELETE a single workout
router.delete("/:id",deleteWorkout)

//PATCH a single workout
router.patch("/:id",updateWorkout)

module.exports=router