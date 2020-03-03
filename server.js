const express = require('express')
const app = express()
var mongoose = require('mongoose')
const cors = require('cors')
const admin = require('./routes/api/admin')
const university=require('./routes/api/university')
const doctor=require('./routes/api/doctor')
const student=require('./routes/api/student')



// DB Config
const db = require('./config/keys').mongoURI
const dotenv=require('dotenv')
dotenv.config()



mongoose
  .connect(db,{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err)),
  // mongoose.set('useUnifiedTopology', true);
  // mongoose.set('useNewUrlParser', true);
  // mongoose.set('useCreateIndex', true);
  // mongoose.set('useFindAndModify', false);





app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//Cors Handling
  app.use(cors())
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin:https://localhost:3000");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
       next();
  });


  app.use('/api/admin', admin)
  app.use('/api/university',university)
  app.use('/api/doctor',doctor)
  app.use('/api/student',student)


  app.use((req, res) => {
    res.status(404).send({ err: 'We can not find what you are looking for' })
  })




const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server up and running on port ${port}`));
app.options("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, x-access-token');
  res.send(200);
});