const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email:{
      type:String,
      required:true,
      unique:true
    },
    username:{
      type:String,
      required:true
    },
    password:{
      type:String,
      required:true,
      min : 12,
      max:20
    }
})

const Users = mongoose.model("Users",userSchema)

module.exports={Users}