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
        required:false
    },
    activated:{
      type:Boolean,
      default:false
    },
    activationToken:{
      type:String,
      default:null
    },
    contactInfo:{
      type:String,
      required:false
  },
  
  })

module.exports = mongoose.model('University', UniversitySchema)