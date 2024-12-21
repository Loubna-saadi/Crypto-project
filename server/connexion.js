const mongoose = require("mongoose")

const connexion = async()=>{
    try{
        await mongoose.connect(process.env.mongo_uri)
        console.log("connecté à mongodb")
    }catch(err){
        console.err(err)
    }
}


module.exports={connexion}