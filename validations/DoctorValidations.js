const Joi = require('joi')

module.exports = {


  updateValidation: request => {
    const updateSchema = {
        firstName:Joi.string(),
        email: Joi.string(),
        password: Joi.string().min(8).max(30),
        lastName: Joi.string(),
        currentJob:Joi.string(),
        mastersTitle: Joi.string(),
        phdTitle: Joi.string(),
        researchPaperslink:Joi.string(),
        contactInfo:Joi.string(),
        activated:Joi.boolean(),
      activationToken:Joi.string().min(10)
    
    }
    return Joi.validate(request, updateSchema)
  },
  createValidation: request => {
    const createSchema = {
    firstName:Joi.string(),
      email: Joi.string().required(),
      password: Joi.string().min(8).max(30).required(),
      lastName: Joi.string(),
      currentJob:Joi.string(),
      mastersTitle: Joi.string(),
      phdTitle: Joi.string(),
      researchPaperslink:Joi.string(),
      contactInfo:Joi.string(),
      activated:Joi.boolean(),
      activationToken:Joi.string()
    }

    return Joi.validate(request, createSchema)
  }
}
