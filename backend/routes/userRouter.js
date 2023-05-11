const express=require("express")
const {loginUser,signupUser}=require("../controller/userController")

const route=express.Router()

//login Route
route.post("/login",loginUser)

//Sighup Route
route.post("/signup",signupUser)

module.exports=route