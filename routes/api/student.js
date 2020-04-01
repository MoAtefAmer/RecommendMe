require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const router = express.Router();
var config = require("../../config/jwt");
const Doctor = require("../../models/Doctor");
const RecommendationForm = require("../../models/RecommendationForm");
const Student = require("../../models/Student");
const validator = require("../../validations/StudentValidation");
const mailer = require("nodemailer");
var randomstring = require("randomstring");
var cors = require("cors");
const cryptoRandomString = require('crypto-random-string');
var Pusher = require('pusher');

router.use(cors());

//Student Signup
router.post("/studentSignup", async (req, res) => {
  const { email, password, Name, viewRecommendation, major } = req.body;

  const isValidated = validator.createValidation(req.body);

  const stu = await Student.findOne({ email: email });
  if (stu) return res.status(400).json({ error: "Email already exists" });
  if (isValidated.error) {
    return res
      .status(400)
      .send({ error: isValidated.error.details[0].message });
  }
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newstu = new Student({
    Name: Name,
    email: email,
    password: hashedPassword,
    activated: false,
    viewRecommendation: viewRecommendation,
    major: major
  });

  const createStudent = await Student.create(newstu);
  const token = await jwt.sign({ id: newstu._id }, config.secret, {}); ///////
  //console.log(createStudent);
  await Student.findByIdAndUpdate(createStudent._id, {
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
  const url = `https://recommendationsystematef.herokuapp.com/api/student/activateAccount/` + token;

  let mailOptions = {
    from: '"RecommendMe" <recommendationsystemmailer@gmail.com>',
    to: Name + "" + "" + "<" + email + ">",
    subject: "Account activation email",
    html: `Thank you for signing up with Recommend me,Please click here to activate your account: <a href="${url}">Activate Account</a>`
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
    msg: "Account created! Please activate your account through your email",
    data: newstu
  });
});

//Get a List of All Students Emails
router.get("/getStudentsEmails", async (req, res) => {
  const stuList = await Student.find(
    {},
    { email: 1, _id: 0, Name: 1, major: 1 }
  );

  if (!stuList) {
    return res.status(404).send({ error: "No Students Found" });
  } else {
    res.json({ stuList });
  }
});

//Student activate account
router.get("/activateAccount/:activationToken", async (req, res) => {
  const activationToken = req.params.activationToken;

  const student = await Student.findOne({ activationToken: activationToken });
  if (student) {
    await Student.findByIdAndUpdate(student._id, {
      activated: true,
      activationToken: null
    });
    res.status(200).redirect("https://recommendationsystematef.herokuapp.com/");
  } else {
    res.status(400).send({ msg: "Link Expired" });
  }
});

//Student Login
router.post("/studentLogin", async (req, res) => {
  const { email, password } = req.body;
  await Student.findOne({ email }, (err, stu) => {
    if (err) {
      return res.status(401).send({ auth: false, msg: "Server error" });
    }
    if (!stu) {
      return res
        .status(401)
        .send({ auth: false, msg: "Incorrect email or password" });
    }

    const isCorrectPassword = bcrypt.compareSync(password, stu.password);
    if (!isCorrectPassword) {
      return res
        .status(401)
        .send({ auth: false, msg: "Incorrect email or password" });
    }
    if (!stu.activated) {
      res.status(400).send({ msg: "Please activate your account" });
    } else {
      var token = jwt.sign({ id: stu._id }, config.secret, {
        expiresIn: 86400
      });
      res.status(200).send({ auth: "Student", token: token, id: stu._id });
    }
  });
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

      const student = await Student.findById(stat);
      if (!student) {
        return res.status(404).send({ error: "Invalid Token" });
      }

      const studentViewingRight = await student.viewRecommendation;

      const studentEmail = await student.email;
      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);
      const count = await RecommendationForm.countDocuments({
        studentEmail: studentEmail,
        studentView: true
      });
      recommendationForms = await RecommendationForm.find({
        studentEmail: studentEmail,
        studentView: true
      })
        .skip((page - 1) * limit)
        .limit(limit);

      if (studentViewingRight) {
        res.send({ count: count, data: recommendationForms });
      } else {
        res.send({ count: 0, data: [] });
      }
    });
  } catch (error) {
    console.log(error);
  }

  //
});

//Delete StudentView
router.post("/deleteStudentView", async (req, res) => {
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

      const student = await Student.findById(stat);
      if (!student) {
        return res.status(404).send({ error: "Invalid Token" });
      }

      const formId = req.body.id;

      const theForm = await RecommendationForm.findByIdAndUpdate(formId, {
        studentView: false
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

    const student = await Student.findById(stat);
    if (!student) {
      return res.status(404).send({ error: "Invalid Token" });
    }

    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    if (oldPassword !== newPassword) {
      const isCorrectPassword = bcrypt.compareSync(
        oldPassword,
        student.password
      );
      if (!isCorrectPassword) {
        return res.status(401).send({ msg: "Incorrect password" });
      } else {
        const hashedPassword = bcrypt.hashSync(newPassword, 10);

        await Student.findByIdAndUpdate(stat, { password: hashedPassword });

        return res.status(200).send({ msg: "Password Updated" });
      }
    } else {
      return res.status(400).send({ msg: "You cannot set the same password!" });
    }
  });
});




var pusher = new Pusher({
  appId:  process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: 'eu',
  useTLS: true
});



// Request Recommendation
router.post("/requestRecommendation", async (req, res) => {
  try {
    // const isValidated = validator.createValidation(req.body);
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

      const student = await Student.findById(stat);
      if (!student) {
        return res.status(404).send({ error: "Invalid Token" });
      }

      // if (isValidated.error) {
      //   return res
      //     .status(400)
      //     .send({ error: isValidated.error.details[0].message });
      // }

     

      await Student.findByIdAndUpdate(stat, {
        $addToSet: {
          recommendersEmails: {
            remail: req.body.remail,
            uemail: req.body.uemail
          }
        }
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
      const url2 = `https://recommendationsystematef.herokuapp.com/login`;

      const email = req.body.remail;
      const sName = student.Name;
      const sEmail = student.email;
      const doc = await Doctor.findOne({ email: email });
      if (doc) {
        let mailOptions = {
          from: '"RecommendMe" <recommendationsystemmailer@gmail.com>',
          to: "" + "" + "<" + email + ">",
          subject: sName + " is requesting your recommendation",
          html:
            "A Student is requesting your recommendation, Student Email: " +
            sEmail +
            ", University Email(s): " +
            req.body.uemail +
            " to launch the website, click here:  " +
            `<a href="${url2}">${url2}</a>`
        };

  
   await Doctor.findByIdAndUpdate(doc._id, {
          $addToSet: {
            notifications: {
              studentName: sName ,
              universityEmail:req.body.uemail,
              studentEmail:sEmail
            }
          }
        });

        const theDoc= await Doctor.findById(doc._id)
     
        const notifications=await theDoc.notifications
        const theNotification= notifications[notifications.length-1]
        

       
        pusher.trigger('my-channel', 'my-event', {
          studentName: sName,
          universityEmail:req.body.uemail,
          studentEmail:sEmail,
          _id:theNotification._id,
          read:false
        });

        transporter.sendMail(mailOptions, function(error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });

        return res.status(200).json({ msg: "Email Sent!" });
      } else {
        const password = randomstring.generate({
          length: 8
        });

        const cryptoToken=cryptoRandomString({length: 32, type: 'url-safe'});
        const hashedPassword = bcrypt.hashSync(password, 10);
        const newdoc = new Doctor({
          email: email,
          password: hashedPassword,
          activated: false,
          currentJob: "",
          contactInfo: "",
          firstName: "",
          lastName: "",
          activationToken:cryptoToken
        });
        await Doctor.create(newdoc)


      
        const url = `https://recommendationsystematef.herokuapp.com/api/doctor/activateAccount/` + cryptoToken;
        const delUrl =
          `https://recommendationsystematef.herokuapp.com/api/doctor/deleteAccount/` + cryptoToken;

        let mailOptions2 = {
          from: '"RecommendMe" <recommendationsystemmailer@gmail.com>',
          to: "" + "" + "<" + email + ">",
          subject: sName + " is requesting your recommendation",
          html:
            `Welcome to RecommendMe , a platform that connects students with doctors for recommendations.<br/> 
        Just now  ` +
            sName +
            ` has requested your recommendation for his application to a certain University.<br/> 
        To do so, we created you an account on our website and here is your temporary <b>password</b>: ` +
            password +
            `<br/> <b>If you wish to activate your account please click here:</b> <a href="${url}">Activate Account</a> <br/> However if you wish to delete your account please click here: <a href="${delUrl}">Delete Account</a> <br/>`
        };
        transporter.sendMail(mailOptions2, function(error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
          return res.status(200).json({ msg: "Email2 Sent!" });
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

// View my recommendations

module.exports = router;
