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
       required:false
   },
   lastName:{
       type:String,
       required:false
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
     required:false
   },
   researchPaperslink:{
     type:Array,
     required:false
   },
   contactInfo:{
     type:String,
     required:false
   },
   notifications:{
    type:[{
      info:String,
      read:{
         type:Boolean,
         default:false
      }
    }]
    
    
}
   
  
  })




module.exports = mongoose.model('Doctor', DoctorSchema)