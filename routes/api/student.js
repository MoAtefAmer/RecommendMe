require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const router = express.Router();
var config = require("../../config/jwt");
const Doctor = require("../../models/Doctor");
const University = require("../../models/University");
const Student = require("../../models/Student");
const validator = require("../../validations/StudentValidation");
const mailer = require("nodemailer");
var randomstring = require("randomstring");
var cors = require("cors");

router.use(cors());

//Student Signup
router.post("/studentSignup", async (req, res) => {
  const { email, password, Name, viewRecommendation } = req.body;

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
    viewRecommendation: viewRecommendation
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
  const url = `http://localhost:3000/api/student/activateAccount/` + token;

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

//Student activate account
router.get("/activateAccount/:activationToken", async (req, res) => {
  const activationToken = req.params.activationToken;

  const student = await Student.findOne({ activationToken: activationToken });
  if (student) {
    await Student.findByIdAndUpdate(student._id, {
      activated: true,
      activationToken: null
    });
    res.status(200).redirect("https://google.com");
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
      res.status(200).send({ auth: true, token: token, id: stu._id });
    }
  });
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
      const url2 = `https://google.com`;

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
            ", University Email: " +
            email +
            " to launch the website, click here:  " +
            `<a href="${url2}">${url2}</a>`
        };

        transporter.sendMail(mailOptions, function(error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });

        return res.status(400).json({ msg: "Email Sent!" });
      } else {
        const password = randomstring.generate({
          length: 8
        });

        const hashedPassword = bcrypt.hashSync(password, 10);
        const newdoc = new Doctor({
          email: email,
          password: hashedPassword,
          activated: false,
          currentJob:"",
          contactInfo:"",
          firstName:"",
          lastName:""
        });

        const createDoctor = await Doctor.create(newdoc, err => {
          if (err) {
            return res.status(401).send({ msg: "Server error" });
          }
        });
        const token = await jwt.sign({ id: newdoc._id }, config.secret, {});
        await Doctor.findByIdAndUpdate(
          newdoc._id,
          {
            "activationToken": token
          },
          err => {
            if (err) {
              return res.status(401).send({ msg: "Server error" });
            }
          }
        );
        const url =
          `http://localhost:3000/api/doctor/activateAccount/` +token;
        const delUrl =
          `http://localhost:3000/api/doctor/deleteAccount/` +token;
        //////Atef
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
            `<br/> <b>If you wish to activate your account please click here:</b> <a href="${url}">Activate Account</a> <br/> However if you wish to delete your account please click here: <a href="${delUrl}">Delete Account</a> <br/> Have a nice day!`
        };
        transporter.sendMail(mailOptions2, function(error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
          return res.status(400).json({ msg: "Email2 Sent!" });
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

// View my recommendations

module.exports = router;
