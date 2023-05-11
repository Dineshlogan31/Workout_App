const {model,Schema}=require("mongoose")
const bcrypt=require('bcrypt')
const validator=require("validator")

const userSchema=new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

//static signup method
userSchema.statics.signup=async function(email,password)
{

    //validation
    if(!email || !password)
    {
        throw Error("All fields should be fill")
    }
    if(!validator.isEmail(email))
    {
        throw Error("Email is not valid")
    }
    if(!validator.isStrongPassword(password))
    {
        throw Error("Password is not Strong")
    }
    const exists=await this.findOne({email})
    if(exists)
    {
        throw Error("email already exist")
    }

    const salt=await bcrypt.genSalt(10)
    const hash=await bcrypt.hash(password,salt)

    const user=await this.create({email,password:hash})

    return user
}

//login static method
userSchema.statics.login=async function(email,password)
{
    if(!email || !password)
    {
        throw Error("All fields should be fill")
    }
    const user=await this.findOne({email})
    if(!user)
    {
        throw Error("Incorrect Email")
    }
    const match=await bcrypt.compare(password,user.password)
    if(!match)
    {
        throw Error("Incorrect Password")
    }
    return user

}
module.exports=model("User",userSchema)