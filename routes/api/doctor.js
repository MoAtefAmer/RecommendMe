const express = require("express");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const router = express.Router();
var config = require("../../config/jwt");
const Doctor = require("../../models/Doctor");
const validator = require("../../validations/DoctorValidations");

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
  const newDoc = new Doctor({
    email: email,
    password: hashedPassword,
    firstName: firstName,
    lastName: lastName,
    mastersTitle: mastersTitle,
    phdTitle: phdTitle,
    currentJob: currentJob,
    researchPaperslink: researchPaperslink
  });

  const createDoc = await Doctor.create(newDoc);
  token = jwt.sign({ id: newDoc._id }, config.secret, {
    expiresIn: 86400 // expires in 24 hours
  });
  res.status(200).send({
    auth: true,
    msg: "Doctor account was created successfully",
    token: token,
    data: newDoc
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
    var token = jwt.sign({ id: doc._id }, config.secret, {
      expiresIn: 86400
    });
    res.status(200).send({ auth: true, token: token, id: doc._id });
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

      const doctor = await Doctor.findById(stat)
    if (!doctor) {
      return res.status(404).send({ error: 'Invalid Token' })
    }

   
      await Doctor.findByIdAndUpdate(stat, req.body)
      res.json({ msg: 'Profile updated Successfully' })
 


    });
  } catch (error) {
    console.log(error)
  }
});

module.exports = router;
