require("dotenv").config()
const express=require("express")
const mongoose=require("mongoose")
const workoutRouter=require("./routes/workoutRouter")
const userRouter=require('./routes/userRouter')


// invoking the express function
const app=express()


//middleware
app.use(express.json())
app.use((req,res,next)=>{
    next()
})

//routes
app.use("/api/workouts",workoutRouter)
app.use("/api/user",userRouter)

//database connection
  mongoose.connect(process.env.MONGO_URI)
  .then(()=>{
    //listening the server
    app.listen(process.env.PORT,(req,res)=>{
        console.log("Connected to database & listening on port",process.env.PORT);
    })
  }).catch((err)=>{console.log(err);})




   
 

