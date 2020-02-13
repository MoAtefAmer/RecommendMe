const Joi = require('joi')

module.exports = {


  updateValidation: request => {
    const updateSchema = {
      email: Joi.string(),
      password: Joi.string().min(8).max(30),
    
    }
    return Joi.validate(request, updateSchema)
  },
  createValidation: request => {
    const createSchema = {
      email: Joi.string().required(),
      password: Joi.string().required().min(8).max(30)
    }

    return Joi.validate(request, createSchema)
  }
}
