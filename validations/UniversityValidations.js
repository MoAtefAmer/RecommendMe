const Joi = require('joi')

module.exports = {


  updateValidation: request => {
    const updateSchema = {
      Name:Joi.string(),  
      uemail: Joi.string(),
      password: Joi.string().min(8).max(30),
      image: Joi.string(),
      websiteLink: Joi.string(),
      contactInfo: Joi.string()
    
    }
    return Joi.validate(request, updateSchema)
  },
  createValidation: request => {
    const createSchema = {
    Name:Joi.string().required(),
      uemail: Joi.string().required(),
      password: Joi.string().min(8).max(30).required(),
      image: Joi.string(),
      websiteLink: Joi.string().required(),
      contactInfo: Joi.string()
    }

    return Joi.validate(request, createSchema)
  }
}
