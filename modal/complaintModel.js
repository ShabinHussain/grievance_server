const mongoose = require('mongoose')

const complaintSchema = new mongoose.Schema({
    name:{
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
    address:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    documents:{
        type:String,
        required:true
    },
    
    resolution:{
        type:String,
        required:true
    },
    comment:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    }




})




const complaints = mongoose.model("complaints",complaintSchema)

module.exports = complaints