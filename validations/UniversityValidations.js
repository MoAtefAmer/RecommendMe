const Joi = require('joi')

module.exports = {


  updateValidation: request => {
    const updateSchema = {
      Name:Joi.string(),  
      uemail: Joi.string(),
      password: Joi.string().min(8).max(30),
      image: Joi.string(),
      websiteLink: Joi.string(),
      contactInfo: Joi.string(),
      activated:Joi.boolean(),
      activationToken:Joi.string().min(10)
    
    }
    return Joi.validate(request, updateSchema)
  },
  createValidation: request => {
    const createSchema = {
    Name:Joi.string().required(),
      uemail: Joi.string().required(),
      password: Joi.string().min(8).max(30).required(),
      image: Joi.string().allow(""),
      websiteLink: Joi.string().allow(""),
      contactInfo: Joi.string().allow(""),
      activated:Joi.boolean(),
      activationToken:Joi.string()
    }

    return Joi.validate(request, createSchema)
  }
}
