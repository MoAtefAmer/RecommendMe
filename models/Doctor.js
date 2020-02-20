const mongoose = require('mongoose')
const Schema = mongoose.Schema


const DoctorSchema = new Schema({
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    activated:{
      type:Boolean,
      default:false
    },
    activationToken:{
      type:String,
      default:null
    },
   firstName:{
       type:String,
       required:true
   },
   lastName:{
       type:String,
       required:true
   },
   mastersTitle:{
     type:String,
     required:false,
     default:null
   },
   phdTitle:{
     type:String,
     required:false,
     default:null
   },
   currentJob:{
     type:String,
     required:true
   },
   researchPaperslink:{
     type:Array,
     required:false
   },
   contactInfo:{
     type:String,
     required:false
   }
   
  
  })




module.exports = mongoose.model('Doctor', DoctorSchema)