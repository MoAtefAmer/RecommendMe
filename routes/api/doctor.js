require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const router = express.Router();
var config = require("../../config/jwt");
const Doctor = require("../../models/Doctor");
const University = require("../../models/University");
const validator = require("../../validations/DoctorValidations");
const mailer = require("nodemailer");
var cors = require("cors");

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
    to: firstName + " "+lastName+ + " " + "<" + email + ">",
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
    msg: "Account created! Please activate your account through your email",

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
      res.status(200).send({ auth: true, token: token, id: doc._id });
    }
  });
});


//Delete account
router.get("/deleteAccount/:activationToken", async (req, res) => {
  const activationToken = req.params.activationToken;

  const doctor = await Doctor.findOne({ "activationToken": activationToken });
  if (doctor) {
    await Doctor.findByIdAndDelete(doctor._id, {
      activated: true,
      activationToken: null
    
    });
    return res.status(200).send({msg:"Account deleted!"})
  }else{
    return res.status(400).send({msg:"Link expired!"})
  }

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

// Account activation 
router.get("/activateAccount/:activationToken", async (req, res) => {
  const activationToken = req.params.activationToken;

  const doctor = await Doctor.findOne({ "activationToken": activationToken });
  if (doctor) {
    await Doctor.findByIdAndUpdate(doctor._id, {
      "activated": true,
      "activationToken": null
    });
    res.status(200).redirect("https://google.com");
  } else {
    res.status(400).send({ msg: "Link Expired" });
  }
});

//Send recommendation
router.post("/sendRecommendation", async (req, res) => {
  const receiverEmail = req.body.receiver;
  const studentEmail = req.body.studentEmail;
  const subject = req.body.subject;
  var message = req.body.message;
  var pdfLink = req.body.pdfLink;

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

      const senderEmail = await doctor.email;

      const reciepients = [receiverEmail, studentEmail];

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
      console.log(pdfLink);

      let mailOptions = {
        from: senderEmail,
        to: reciepients,
        subject: subject,
        text: message,
        attachments: [
          {
            // use URL as an attachment
            filename: "RecommendationLetter.pdf",
            contentType: "application/pdf",
            path: pdfLink
          }
        ]
      };

      transporter.sendMail(mailOptions, async function(error, info) {
        if (error) {
          console.log(error);
          return res.status(401).send({ msg: "Error while sending email" });
        } else {
          console.log("Email sent: " + info.response);
          const uemail = req.body.receiver;
          let uni = await University.findOne({ uemail });

          if (uni != null) {
            let uniID = await uni._id;

            await University.findByIdAndUpdate(uniID, {
              $addToSet: {
                notificationList: {
                  info:
                    "Professor " +
                    doctor.firstName +
                    " " +
                    doctor.lastName +
                    " has sent you an email"
                }
              }
            });
          }
          return res
            .status(200)
            .send({ msg: "recommendation email sent successfully" });
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
