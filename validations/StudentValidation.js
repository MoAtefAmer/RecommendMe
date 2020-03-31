const Joi = require('joi')

module.exports = {


  updateValidation: request => {
    const updateSchema = {
      Name:Joi.string(),
      email:Joi.string(),  
      password: Joi.string().min(8).max(30),
      activated:Joi.boolean(),
      activationToken:Joi.string().min(10),
      viewRecommendation:Joi.boolean(),
      recommendersEmails:Joi.string(),
      recommendersEmails:Joi.array(),
      remail:Joi.string(),
      uemail:Joi.string(),
    }
    return Joi.validate(request, updateSchema)
  },
  createValidation: request => {
    const createSchema = {
        Name:Joi.string().required(),
        email:Joi.string().required(),  
        password: Joi.string().min(8).max(30).required(),
        activated:Joi.boolean(),
        activationToken:Joi.string().min(10),
        viewRecommendation:Joi.boolean().required(),
        recommendersEmails:Joi.array(),
        remail:Joi.string(),
        uemail:Joi.string(),
        major:Joi.string().required(),
    }

    return Joi.validate(request, createSchema)
  }
}
