const express = require("express");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const router = express.Router();
var config = require("../../config/jwt");
const Admin = require("../../models/Admin");
const Doctor = require("../../models/Doctor");
const University = require("../../models/University");

const validator = require("../../validations/AdminValidations");
//var emailCheck = require("email-check");

const Verifier = require("email-verifier");

//Create Admin account
router.post("/createAdmin", async (req, res) => {
  const { email, password } = req.body;

  const isValidated = validator.createValidation(req.body);

 
  const admin = await Admin.findOne({ email });
  if (admin) return res.status(400).json({ error: "Email already exists" });
  if (isValidated.error) {
    return res
      .status(400)
      .send({ error: isValidated.error.details[0].message });
  }
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newAdmin = new Admin({
    email: email,
    password: hashedPassword
  });

  await Admin.create(newAdmin);
  token = jwt.sign({ id: newAdmin._id }, config.secret, {
    expiresIn: 86400 // expires in 24 hours
  });
  res.status(200).send({
    auth: true,
    token: token,
    msg: "Admin was created successfully",
    data: newAdmin
  });

  res.json({ msg: "Admin was created successfully" });
});

//Admin Login
router.post("/adminLogin", async (req, res) => {
  const { email, password } = req.body;
  await Admin.findOne({ email }, (err, admin) => {
    if (err) {
      return res.status(401).send({ auth: false, msg: "Server error" });
    }
    if (!admin) {
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
    const isCorrectPassword = bcrypt.compareSync(password, admin.password);
    if (!isCorrectPassword) {
      return res
        .status(401)
        .send({ auth: false, msg: "Incorrect email or password" });
    }

    var token = jwt.sign({ id: admin._id }, config.secret, {
      expiresIn: 86400
    });
    res
      .status(200)
      .send({ auth: true, token: token, id: admin._id, email: admin.email });
  });
});

// delete a doctor's account
router.delete("/deleteDoctor", async (req, res) => {
  const email = req.body;
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

    const admin = await Admin.findById(stat);
    if (!admin) {
      return res.status(404).send({ error: "Invalid Token" });
    }

    const doctor = await Doctor.findOne(email);
    if (!doctor) {
      return res.status(404).send({ error: "Account does not exist" });
    }

    await Doctor.findOneAndDelete(email);

    res.json({ msg: "Doctor account deleted Successfully" });
  });
});

// delete a University account
router.delete("/deleteUniversity", async (req, res) => {
  const email = req.body;
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

    const admin = await Admin.findById(stat);
    if (!admin) {
      return res.status(404).send({ error: "Invalid Token" });
    }

    const university = await University.findOne(email);
    if (!university) {
      return res.status(404).send({ error: "Account does not exist" });
    }

    await University.findOneAndDelete(email);

    res.json({ msg: "University account deleted Successfully" });
  });
});

// edit a doctor's account by email
router.put("/editDoctor/:email", async (req, res) => {
  const email = req.params;

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

    const admin = await Admin.findById(stat);
    if (!admin) {
      return res.status(404).send({ error: "Invalid Token" });
    }

    const doctor = await Doctor.findOne(email);
    if (!doctor) {
      return res.status(404).send({ error: "Account does not exist" });
    }

    await Doctor.findOneAndUpdate(email, req.body);

    res.json({ msg: "Doctor account edited Successfully" });
  });
});

// edit a University account by email
router.put("/editUniversity/:uemail", async (req, res) => {
  const uemail = req.params;
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

    const admin = await Admin.findById(stat);
    if (!admin) {
      return res.status(404).send({ error: "Invalid Token" });
    }

    const university = await University.findOne(uemail);
    if (!university) {
      return res.status(404).send({ error: "Account does not exist" });
    }

    await University.findOneAndUpdate(uemail, req.body);

    res.json({ msg: "University account edited Successfully" });
  });
});

module.exports = router;
