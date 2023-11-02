const mongoose=require("mongoose")

const contactSchema=new mongoose.Schema({
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true        
    },
    messgage:{
        type:String,
        required:true
    }
})

const Contact_Us= new mongoose.model('Contact_Us',contactSchema)

module.exports= Contact_Us


