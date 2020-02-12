const express = require("express");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const router = express.Router();
var config = require("../../config/jwt");
const University = require("../../models/University")
const validator = require("../../validations/UniversityValidations");




//University Signup
router.post("/uniSignup", async (req, res) => {
    const { Name,uemail, password, websiteLink,image } = req.body;
  
    const isValidated = validator.createValidation(req.body);
   
  
    
    const uni = await University.findOne({ uemail });
    if (uni) return res.status(400).json({ error: "Email already exists" });
    if (isValidated.error) {
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newuni = new University({
      uemail: uemail,
      password: hashedPassword,
      websiteLink:websiteLink,
      Name:Name,
      image:image
    });
  
    const createUni = await University.create(newuni);
    token = jwt.sign({ id: newuni._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    res.status(200).send({
      auth: true,
     msg: "University account was created successfully" ,
      token: token,
      data: newuni
    });
  
    res.json();
 
  });



//University Login
router.post("/uniLogin", async (req, res) => {
  const { uemail, password } = req.body;
  await University.findOne({ uemail }, (err, uni) => {
    if (err) {
      return res.status(401).send({ auth: false, msg: "Server error" });
    }
    if (!uni) {
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
    const isCorrectPassword = bcrypt.compareSync(password, uni.password);
    if (!isCorrectPassword) {
      return res
        .status(401)
        .send({ auth: false, msg: "Incorrect email or password" });
    }
    var token = jwt.sign({ id: uni._id }, config.secret, {
      expiresIn: 86400
    });
    res.status(200).send({ auth: true, token: token, id: uni._id });
  });
});








  module.exports = router;