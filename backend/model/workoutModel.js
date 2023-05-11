const {model,Schema}=require("mongoose")

const workoutModel=new Schema({
    title:{
   type:String,
   required:true
    },
    load:{
        type:String,
        required:true
    },
    reps:{
        type:String,
        required:true
    },
    user_id:{
        type:String,
        required:true
    }
},{timestamps:true})

module.exports=model("workout",workoutModel)

