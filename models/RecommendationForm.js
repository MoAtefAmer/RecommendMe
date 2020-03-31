const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecommendationFormSchema = new Schema({
  studentName: {
    type: String,
    required: true
  },
  studentEmail: {
    type: String,
    required: true
  },
  major: {
    type: String,
    required: true
  },
  professorName: {
    type: String,
    required: true
  },

  professorEmail: {
    type: String,
    required: true
  },

  professorCurrentJob: {
    type: String,
    required: true
  },
  uemail: {
    type: String,
    required: true
  },
  universityName: {
    type: String,
    required: false
  },
  universityLink:{
      type:String,
      required:false
  },

  communicationSkills: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer value"
    }
  },

  problemSolvingSkills: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer value"
    }
  },
  researchSkills: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer value"
    }
  },
  technicalKnowledge: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer value"
    }
  },
  analyticalSkills: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer value"
    }
  },
  stressHandling: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer value"
    }
  },
  punctuality: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer value"
    }
  },
  adaptationSkills: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer value"
    }
  },
  grades: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer value"
    }
  },
  englishSkills: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer value"
    }
  },
 
  remarks: {
    type: String,
    required: false
  },
  pdfLink: {
    type: String,
    required: false
  },
  profView:{
type:Boolean,
default:true
  },
  uniView:{
    type:Boolean,
    default:true
  },
  studentView:{
    type:Boolean,
    default:true
  }
});

module.exports = mongoose.model("RecommendationForm", RecommendationFormSchema);
