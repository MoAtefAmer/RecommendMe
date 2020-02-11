const Joi = require('joi')

module.exports = {


  updateValidation: request => {
    const updateSchema = {
      email: Joi.string(),
      password: Joi.string().min(8).max(20),
    
    }
    return Joi.validate(request, updateSchema)
  },
  createValidation: request => {
    const createSchema = {
      email: Joi.string(),
      password: Joi.string().min(8).max(20)
    }

    return Joi.validate(request, createSchema)
  }
}
