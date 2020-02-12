const mongoose = require('mongoose')
const Schema = mongoose.Schema


const UniversitySchema = new Schema({
  Name: {
    type: String,
    required: true
  },
  uemail: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    image:{
        type:String,
        required:false
    },
    websiteLink:{
        type:String,
        required:true
    },
    notificationList:{
       type:[{
           info:String,
           required:false,
           read:{
               type:Boolean,
               default:false,
           required:false
           }
        }]
    },
    contactInfo:{
      type:String,
      required:false
  },
  
  })

module.exports = mongoose.model('University', UniversitySchema)