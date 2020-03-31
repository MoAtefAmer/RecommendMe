require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const router = express.Router();
var config = require("../../config/jwt");
const Doctor = require("../../models/Doctor");
const University = require("../../models/University");
const RecommendationForm = require("../../models/RecommendationForm");
const Student = require("../../models/Student");
const validator = require("../../validations/DoctorValidations");
const mailer = require("nodemailer");
var randomstring = require("randomstring");
var cors = require("cors");
var Pusher = require('pusher');

router.use(cors());

//Doctor Signup
router.post("/docSignup", async (req, res) => {
  const {
    email,
    password,
    firstName,
    lastName,
    mastersTitle,
    phdTitle,
    currentJob,
    researchPaperslink
  } = req.body;

  const isValidated = validator.createValidation(req.body);

  const doc = await Doctor.findOne({ email });
  if (doc) return res.status(400).json({ error: "Email already exists" });
  if (isValidated.error) {
    return res
      .status(400)
      .send({ error: isValidated.error.details[0].message });
  }
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newdoc = new Doctor({
    email: email,
    password: hashedPassword,
    firstName: firstName,
    lastName: lastName,
    mastersTitle: mastersTitle,
    phdTitle: phdTitle,
    currentJob: currentJob,
    researchPaperslink: researchPaperslink
  });

  const createDoctor = await Doctor.create(newdoc);
  const token = await jwt.sign({ id: newdoc._id }, config.secret, {}); ///////
  //console.log(createStudent);
  await Doctor.findByIdAndUpdate(createDoctor._id, {
    activationToken: token
  });
  let transporter = mailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  const url = `http://localhost:3000/api/doctor/activateAccount/` + token;

  let mailOptions = {
    from: '"RecommendMe" <recommendationsystemmailer@gmail.com>',
    to: firstName + " " + lastName + +" " + "<" + email + ">",
    subject: "Account activation email",
    html: `Thank you for signing up with Recommend me. <br/> Please click here to activate your account: <a href="${url}">Activate Account</a>`
  };
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  res.status(200).send({
    auth: true,
    msg: "Account created! Please activate your account through your email"
  });

  res.json();
});

//Doctor Login
router.post("/docLogin", async (req, res) => {
  const { email, password } = req.body;
  await Doctor.findOne({ email }, (err, doc) => {
    if (err) {
      return res.status(401).send({ auth: false, msg: "Server error" });
    }
    if (!doc) {
      if (!password) {
        return res
          .status(401)
          .send({ auth: false, msg: "Please enter your password" });
      } else {
        return res
          .status(401)
          .send({ auth: false, msg: "Incorrect email or password" });
      }
    }
    if (!password) {
      return res
        .status(401)
        .send({ auth: false, msg: "Please enter your password" });
    }
    const isCorrectPassword = bcrypt.compareSync(password, doc.password);
    if (!isCorrectPassword) {
      return res
        .status(401)
        .send({ auth: false, msg: "Incorrect email or password" });
    }
    if (!doc.activated) {
      res.status(400).send({ msg: "Please activate your account" });
    } else {
      var token = jwt.sign({ id: doc._id }, config.secret, {
        expiresIn: 86400
      });
      res
        .status(200)
        .send({ auth: "Professor", token: token, id: doc._id, data: doc });
    }
  });
});



//Get Doctor's Info (Profile)
router.get("/viewProfile", async (req, res) => {
  const email = req.body;

  var Profile = await Doctor.findOne(email);

  if (!Profile) {
    return res.status(404).send({ error: "User does not exist" });
  } else {
    res.json({ Profile });
  }
});

//Get a List of All Doctors
router.get("/getDocEmails", async (req, res) => {

  const docList = await Doctor.find({}, { email: 1, _id: 0 });

  if (!docList) {
    return res.status(404).send({ error: "No Professors Found" });
  } else {
    res.json({ docList });
  }
});

//Edit My Profile as a Doctor
router.put("/editProfile", async (req, res) => {
  try {
    var stat = 0;
    var token = req.headers["x-access-token"];
    if (!token) {
      return res
        .status(401)
        .send({ auth: false, message: "Please login first." });
    }
    jwt.verify(token, config.secret, async function(err, decoded) {
      if (err) {
        return res
          .status(500)
          .send({ auth: false, message: "Failed to authenticate token." });
      }
      stat = decoded.id;

      const doctor = await Doctor.findById(stat);
      if (!doctor) {
        return res.status(404).send({ error: "Invalid Token" });
      }

      await Doctor.findByIdAndUpdate(stat, req.body);
      res.json({ msg: "Profile updated Successfully" });
    });
  } catch (error) {
    console.log(error);
  }
});


//Delete account
router.get("/deleteAccount/:activationToken", async (req, res) => {
  const activationToken = req.params.activationToken;

  const doctor = await Doctor.findOne({ activationToken: activationToken });
  if (doctor) {
    await Doctor.findByIdAndDelete(doctor._id, {
      activated: true,
      activationToken: null
    });


    
    return res.status(200).redirect("http://localhost:3001/");
  } else {
    return res.status(400).redirect("http://localhost:3001/login");
  }
});


var pusher = new Pusher({
  appId:  process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: 'eu',
  useTLS: true
});



//Delete Notification

router.delete("/deleteNotification", async (req,res)=>{
  var stat = 0;
  var token = req.headers["x-access-token"];
  if (!token) {
    return res
      .status(401)
      .send({ auth: false, message: "Please login first." });
  }
  jwt.verify(token, config.secret, async function(err, decoded) {
    if (err) {
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });
    }
    stat = decoded.id;

    const doctor = await Doctor.findById(stat);
    if (!doctor) {
      return res.status(404).send({ error: "Invalid Token" });
    }

    const notificationid=req.body.notificationId
  

  //   await Doctor.findOneAndUpdate(
  //     { "notifications._id" :notificationid }, 
  //     { "$pull": { "notifications.$.read" :false } } 
  // )

  await Doctor.findOneAndUpdate(
    { "notifications._id": notificationid },
    { $pull: { notifications: { _id: notificationid } } }
)
   
  
      res.status(200).send({msg:"Notfication Deleted Successfully"})
  
      


  })

})


//Read Notification
router.post("/readNotification", async(req,res)=>{

  var stat = 0;
  var token = req.headers["x-access-token"];
  if (!token) {
    return res
      .status(401)
      .send({ auth: false, message: "Please login first." });
  }
  jwt.verify(token, config.secret, async function(err, decoded) {
    if (err) {
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });
    }
    stat = decoded.id;

    const doctor = await Doctor.findById(stat);
    if (!doctor) {
      return res.status(404).send({ error: "Invalid Token" });
    }

    const notificationid=req.body.notificationId
  


 await Doctor.updateOne({
    "notifications._id": notificationid
}, {
   $set: { "notifications.$.read": true }
})

 

    res.status(200).send({msg:"Notfication Updated Successfully"})

    
    
  });



} )


// Account activation
router.get("/activateAccount/:activationToken", async (req, res) => {
  const activationToken = req.params.activationToken;

  const doctor = await Doctor.findOne({ activationToken: activationToken });
  if (doctor) {
    await Doctor.findByIdAndUpdate(doctor._id, {
      activated: true,
      activationToken: null
    });
    res.status(200).redirect("http://localhost:3001/");
  } else {
    res.status(400).send({ msg: "Link Expired" });
  }
});

//View My Recommendations
router.get("/getRecommendations", async (req, res) => {
  try {
    var stat = 0;
    var token = req.headers["x-access-token"];
    if (!token) {
      return res
        .status(401)
        .send({ auth: false, message: "Please login first." });
    }
    jwt.verify(token, config.secret, async function(err, decoded) {
      if (err) {
        return res
          .status(500)
          .send({ auth: false, message: "Failed to authenticate token." });
      }
      stat = decoded.id;

      const doctor = await Doctor.findById(stat);
      if (!doctor) {
        return res.status(404).send({ error: "Invalid Token" });
      }
      const professorEmail = await doctor.email;
      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);
      const count = await RecommendationForm.countDocuments({
        professorEmail: professorEmail,
        profView: true
      });
      recommendationForms = await RecommendationForm.find({
        professorEmail: professorEmail,
        profView: true
      })
        .skip((page - 1) * limit)
        .limit(limit);

      // const startIndex = (page - 1) * limit;
      // const endIndex = page * limit;
      // const resultForms = recommendationForms.slice(startIndex, endIndex);

      res.send({ count: count, data: recommendationForms });
    });
  } catch (error) {
    console.log(error);
  }

  //
});

//Delete ProfView
router.post("/deleteProfView", async (req, res) => {
  try {
    var stat = 0;
    var token = req.headers["x-access-token"];
    if (!token) {
      return res
        .status(401)
        .send({ auth: false, message: "Please login first." });
    }
    jwt.verify(token, config.secret, async function(err, decoded) {
      if (err) {
        return res
          .status(500)
          .send({ auth: false, message: "Failed to authenticate token." });
      }
      stat = decoded.id;

      const doctor = await Doctor.findById(stat);
      if (!doctor) {
        return res.status(404).send({ error: "Invalid Token" });
      }

      const formId = req.body.id;

      const theForm = await RecommendationForm.findByIdAndUpdate(formId, {
        profView: false
      });

      if (theForm) {
        res.status(200).send({ msg: "Document Successfully Updated" });
      } else {
        res.status(404).send({ msg: "document not found" });
      }
    });
  } catch (error) {
    console.log(error);
  }
});



//Change Password

router.post("/changePassword", async (req, res) => {
  var stat = 0;
  var token = req.headers["x-access-token"];
  if (!token) {
    return res
      .status(401)
      .send({ auth: false, message: "Please login first." });
  }
  jwt.verify(token, config.secret, async function(err, decoded) {
    if (err) {
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });
    }
    stat = decoded.id;

    const doctor = await Doctor.findById(stat);
    if (!doctor) {
      return res.status(404).send({ error: "Invalid Token" });
    }

    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    if (oldPassword !== newPassword) {
      const isCorrectPassword = bcrypt.compareSync(
        oldPassword,
        doctor.password
      );
      if (!isCorrectPassword) {
        return res.status(401).send({ msg: "Incorrect password" });
      } else {
        const hashedPassword = bcrypt.hashSync(newPassword, 10);

        await Doctor.findByIdAndUpdate(stat, { password: hashedPassword });

        return res.status(200).send({ msg: "Password Updated" });
      }
    } else {
      return res.status(400).send({ msg: "You cannot set the same password!" });
    }
  });
});



//Retrieve Notifications

router.get("/getNotifications", async (req,res)=>{

  var stat = 0;
  var token = req.headers["x-access-token"];
  if (!token) {
    return res
      .status(401)
      .send({ auth: false, message: "Please login first." });
  }
  jwt.verify(token, config.secret, async function(err, decoded) {
    if (err) {
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });
    }
    stat = decoded.id;

    const doctor = await Doctor.findById(stat);
    if (!doctor) {
      return res.status(404).send({ error: "Invalid Token" });
    }

res.json({notifications:doctor.notifications})
  
  });
  
})


//Send recommendation
router.post("/sendRecommendation", async (req, res) => {
  const {
    subject,
    message,
    studentName,
    studentEmail,
    major,
    professorName,
    professorEmail,
    professorCurrentJob,
    uemail,
    universityName,
    universityLink,
    communicationSkills,
    problemSolvingSkills,
    researchSkills,
    technicalKnowledge,
    analyticalSkills,
    stressHandling,
    punctuality,
    adaptationSkills,
    grades,
    englishSkills,
    remarks,
    pdfLink
  } = req.body;

  try {
    var stat = 0;
    var token = req.headers["x-access-token"];
    if (!token) {
      return res
        .status(401)
        .send({ auth: false, message: "Please login first." });
    }
    jwt.verify(token, config.secret, async function(err, decoded) {
      if (err) {
        return res
          .status(500)
          .send({ auth: false, message: "Failed to authenticate token." });
      }
      stat = decoded.id;

      const doctor = await Doctor.findById(stat);
      if (!doctor) {
        return res.status(404).send({ error: "Invalid Token" });
      }

      const newForm = new RecommendationForm({
        studentName: studentName,
        studentEmail: studentEmail,
        major: major,
        professorName: professorName,
        professorEmail: professorEmail,
        professorCurrentJob: professorCurrentJob,
        uemail: uemail,
        universityName: universityName,
        universityLink: universityLink,
        communicationSkills: communicationSkills,
        problemSolvingSkills: problemSolvingSkills,
        researchSkills: researchSkills,
        technicalKnowledge: technicalKnowledge,
        analyticalSkills: analyticalSkills,
        stressHandling: stressHandling,
        punctuality: punctuality,
        adaptationSkills: adaptationSkills,
        grades: grades,
        englishSkills: englishSkills,
        remarks: remarks,
        pdfLink: pdfLink
      });

      await RecommendationForm.create(newForm);

      const checkStudent = await Student.findOne({ email: studentEmail });
      const checkUniversity =await University.findOne({uemail:uemail})
      var appendedMessageStudent;
      var appendedMessageUniversity;
      var universityMailOptions; 
      var studentMailOptions;
      const senderEmail = await doctor.email;
   
      if (!checkStudent) {
        const password = randomstring.generate({
          length: 8
        });

        const hashedPassword = bcrypt.hashSync(password, 10);
        const newstu = new Student({
          Name: studentName,
          email: studentEmail,
          password: hashedPassword,
          activated: false,
          viewRecommendation: true,
          major: major,

          recommendersEmails: {
            remail: professorEmail,
            uemail: uemail
          }
        });
        const createStudent = await Student.create(newstu);
        const token = await jwt.sign({ id: newstu._id }, config.secret, {}); ///////

        await Student.findByIdAndUpdate(createStudent._id, {
          activationToken: token
        });
        const url =
          `http://localhost:3000/api/student/activateAccount/` + token;
          appendedMessageStudent =
          `There has been a new Recommendation posted on our website concerning this email. Since you do not have an account on our website, we made you one. Click <a href="${url}">Here</a> to activate your account then kindly use this temporary <b>password: </b>` +
          password +
          ` to login to your account and check the posted recommendation when you login`;
      
          studentMailOptions = {
            from: senderEmail,
            to: studentEmail,
            subject: "Notification Email from RecommendME",
            html: appendedMessageStudent
          };
        
      
      
        }


      if (!checkUniversity) {
        const password = randomstring.generate({
          length: 8
        });

        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUni = new University({
          Name: universityName,
          uemail: uemail,
          password: hashedPassword,
          activated: false,
          websiteLink:""+universityLink,
        });
        const createUniversity = await University.create(newUni);
        const token = await jwt.sign({ id: newUni._id }, config.secret, {}); ///////

        await University.findByIdAndUpdate(createUniversity._id, {
          activationToken: token
        });
        const url =
          `http://localhost:3000/api/university/activateAccount/` + token;
          appendedMessageUniversity =
          `There has been a new Recommendation posted on our website concerning the owner(s) of this email. Since you do not have an account on our website, we made you one. Click <a href="${url}">Here</a> to activate your account then kindly use this temporary <b>password: </b>` +
          password +
          ` to login to your account and check the posted recommendation when you login`;


          universityMailOptions = {
            from: senderEmail,
            to: uemail,
            subject: "Notification Email from RecommendME",
            html: appendedMessageUniversity
          };
      }

 
      

      let transporter = mailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD
        },
        tls: {
          rejectUnauthorized: false
        }
      });


     const dudes=[studentEmail,uemail]
      let mailOptions = {
        from: senderEmail,
        to: dudes,
        subject: subject,
        text: message,
      
      };

      if(checkUniversity && checkStudent){
      transporter.sendMail(mailOptions, async function(error, info) {
        if (error) {
          console.log(error);
          return res.status(401).send({ msg: "Error while sending email" });
        } else {
          console.log("Email sent: " + info.response);
          // const uemail = req.body.receiver;
          // let uni = await University.findOne({ uemail });

          // if (uni != null) {
          //   let uniID = await uni._id;

          //   await University.findByIdAndUpdate(uniID, {
          //     $addToSet: {
          //       notificationList: {
          //         info:
          //           "Professor " +
          //           doctor.firstName +
          //           " " +
          //           doctor.lastName +
          //           " has sent you an email"
          //       }
          //     }
          //   });
          // }
          return res
            .status(200)
            .send({ msg: "recommendation email sent successfully" });
        }
      });
    }

    if(!checkStudent && !checkUniversity){
      transporter.sendMail(studentMailOptions, async function(error, info) {
        if (error) {
          console.log(error);
          return res.status(401).send({ msg: "Error while sending email" });
        } else {
          console.log("Email sent: " + info.response);
          transporter.sendMail(universityMailOptions, async function(error, info) {
            if (error) {
              console.log(error);
              return res.status(401).send({ msg: "Error while sending email" });
            } else {
              console.log("Email2 sent: " + info.response);
              return res
                .status(200)
                .send({ msg: "Recommendation emails sent successfully" });
            }
          });


          
        }
      });

    }

    if(checkStudent && !checkUniversity){
      transporter.sendMail({
        from: senderEmail,
        to: studentEmail,
        subject: subject,
        text: message,
      
      }, async function(error, info) {
        if (error) {
          console.log(error);
          return res.status(401).send({ msg: "Error while sending email" });
        } else {
          console.log("Email sent: " + info.response);
          transporter.sendMail(universityMailOptions, async function(error, info) {
            if (error) {
              console.log(error);
              return res.status(401).send({ msg: "Error while sending email" });
            } else {
              console.log("Email2 sent: " + info.response);
              return res
                .status(200)
                .send({ msg: "Recommendation emails sent successfully" });
            }
          });


          
        }
      });

    }


    if(!checkStudent && checkUniversity){
      transporter.sendMail({
        from: senderEmail,
        to: uemail,
        subject: subject,
        text: message,
      
      }, async function(error, info) {
        if (error) {
          console.log(error);
          return res.status(401).send({ msg: "Error while sending email" });
        } else {
          console.log("Email sent: " + info.response);
          transporter.sendMail(studentMailOptions, async function(error, info) {
            if (error) {
              console.log(error);
              return res.status(401).send({ msg: "Error while sending email" });
            } else {
              console.log("Email2 sent: " + info.response);
              return res
                .status(200)
                .send({ msg: "Recommendation emails sent successfully" });
            }
          });


          
        }
      });

    }




    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
