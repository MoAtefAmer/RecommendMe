const Joi = require("joi");

module.exports = {
  createValidation: request => {
    const createSchema = {
      studentName: Joi.string().required(),
      studentEmail: Joi.string().required(),
      major: Joi.string().required(),
      professorName: Joi.string().required(),
      professorEmail: Joi.string().required(),
      professorCurrentJob: Joi.string().required(),
      uemail: Joi.string().required(),
      universityName: Joi.string(),
      universityLink: Joi.string(),
      otherlanguages: Joi.string(),
      remarks: Joi.string(),
      pdfLink: Joi.string(),
      communicationSkills: Joi.number().required(),
      problemSolvingSkills: Joi.number().required(),
      researchSkills: Joi.number().required(),
      technicalKnowledge: Joi.number().required(),
      analyticalSkills: Joi.number().required(),
      stressHandling: Joi.number().required(),
      punctuality: Joi.number().required(),
      adaptationSkills: Joi.number().required(),
      grades: Joi.number().required(),
      englishSkills: Joi.number().required()
    };

    return Joi.validate(request, createSchema);
  }
};
