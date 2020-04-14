const express = require("express");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const router = express.Router();
var config = require("../../config/jwt");
const University = require("../../models/University");
const validator = require("../../validations/UniversityValidations");
const mailer = require("nodemailer");
const RecommendationForm = require("../../models/RecommendationForm");
var cors = require("cors");

router.use(cors());

//University Signup
router.post("/uniSignup", async (req, res) => {
  const { Name, uemail, password, websiteLink, image, contactInfo } = req.body;

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
    websiteLink: websiteLink,
    Name: Name,
    image: image,
    contactInfo: contactInfo,
    activated:false
  });

  const createUniversity = await University.create(newuni);
  const token = await jwt.sign({ id: newuni._id }, config.secret, {}); ///////
  //console.log(createStudent);
  await University.findByIdAndUpdate(createUniversity._id, {
    "activationToken": token
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
  const url = `https://recommendationsystematef.herokuapp.com/api/university/activateAccount/` + token;

  let mailOptions = {
    from: '"RecommendMe" <recommendationsystemmailer@gmail.com>',
    to: Name + "" + "" + "<" + uemail + ">",
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

    const university = await University.findById(stat);
    if (!university) {
      return res.status(404).send({ error: "Invalid Token" });
    }

    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    if (oldPassword !== newPassword) {
      const isCorrectPassword = bcrypt.compareSync(
        oldPassword,
        university.password
      );
      if (!isCorrectPassword) {
        return res.status(401).send({ msg: "Incorrect password" });
      } else {
        const hashedPassword = bcrypt.hashSync(newPassword, 10);

        await University.findByIdAndUpdate(stat, { password: hashedPassword });

        return res.status(200).send({ msg: "Password Updated" });
      }
    } else {
      return res.status(400).send({ msg: "You cannot set the same password!" });
    }
  });
});








// Account activation 
router.get("/activateAccount/:activationToken", async (req, res) => {
  const activationToken = req.params.activationToken;

  const university = await University.findOne({ "activationToken": activationToken });
  if (university) {
    await University.findByIdAndUpdate(university._id, {
      "activated": true,
      "activationToken": null
    });
    res.status(200).redirect("https://recommendationsystematef.herokuapp.com/");
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

      const university = await University.findById(stat);
      if (!university) {
        return res.status(404).send({ error: "Invalid Token" });
      }
      const universityEmail = await university.uemail;
      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);
      const count= await RecommendationForm.countDocuments({uemail: universityEmail,uniView:true})
     recommendationForms = await RecommendationForm.find({
        uemail: universityEmail,
        uniView:true
     
      }).skip((page-1)*limit).limit(limit)


      
      // const startIndex = (page - 1) * limit;
      // const endIndex = page * limit;
      // const resultForms = recommendationForms.slice(startIndex, endIndex);

      res.send({count:count,data:recommendationForms});
    });
  } catch (error) {
    console.log(error);
  }

  //
});



//Delete UniView
router.post("/deleteUniView", async (req,res)=>{

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

      const university = await University.findById(stat);
      if (!university) {
        return res.status(404).send({ error: "Invalid Token" });
      }
    
const formId=req.body.id

const theForm = await RecommendationForm.findByIdAndUpdate(formId,{uniView:false})

if(theForm){
  res.status(200).send({msg:"Document Successfully Updated"})
}else{
res.status(404).send({msg:"document not found"})
}


    });
  } catch (error) {
    console.log(error);
  }

  
})



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
    if (!uni.activated) {
      res.status(400).send({ msg: "Please activate your account" });
    } else {
      var token = jwt.sign({ id: uni._id }, config.secret, {
        expiresIn: 86400
      });
      res.status(200).send({ auth: "University", token: token, id: uni._id });
    }
  });
});


//Get Uni's Info (Profile)
router.get("/viewProfile", async (req, res) => {
  const email = req.body;

  var Profile = await University.findOne(email);

  if (!Profile) {
    return res.status(404).send({ error: "University does not exist" });
  } else {
    res.json({ Profile });
  }
});

//Get a List of All Unis
router.get("/getUniEmails", async (req, res) => {

  const uniList = await University.find({},{uemail:1,_id:0,Name:1,websiteLink:1})

  if (!uniList) {
    return res.status(404).send({ error: "No Universities Found" });
  } else {
    
    res.json({uniList });
  }
});



//Edit My Profile as a University
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

      const university = await University.findById(stat)
    if (!university) {
      return res.status(404).send({ error: 'Invalid Token' })
    }

   
      await University.findByIdAndUpdate(stat, req.body)
      res.json({ msg: 'Profile updated Successfully' })
 


    });
  } catch (error) {
    console.log(error)
  }
});




module.exports = router;
