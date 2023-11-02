const mongoose=require("mongoose")

const bookingSchema=new mongoose.Schema({
    visitor_name:{
        type:String,
        required:true
    },
    visitor_email:{
        type:String,
        required:true
    },
    visitor_phone:{
        type:String,
        required:true
    },
    total_adults:{
        type:String,
        required:true        
    },
    total_children:{
        type:String,
        required:true
    },
    checkin:{
        type:String,
        required:true
    },
    checkout:{
        type:String,
        required:true
    },
    pacakage_preference:{
        type:String,
        required:true
    },
    visitor_message:{
        type:String,
        required:true
    }

})

const Booking=new mongoose.model('Booking_info',bookingSchema)

module.exports=Booking