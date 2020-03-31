const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  Name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  activated: {
    type: Boolean,
    default: false
  },
  activationToken: {
    type: String,
    default: null
  },
  major:{
type:String,
required:false
  },
  viewRecommendation: {
    type: Boolean,
    required: true
  },
  recommendersEmails: {
    type: [
      {
        remail: String,
        uemail: {
          type: String
        }
      }
    ]
  }
});

module.exports = mongoose.model("Student", StudentSchema);
