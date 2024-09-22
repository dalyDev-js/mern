import Joi from "joi";

const schema = Joi.object({
  title: Joi.string().required().min(5).max(50).messages({
    "string.empty": "Engineer title is required.",
    "string.min": "Engineer title should be at least 5 characters long.",
    "string.max": "Engineer title should not exceed 50 characters.",
  }),
  overview: Joi.string().min(30).max(200).required().messages({
    "string.empty": "Overview is required.",
    "string.min": "Overview should be at least 10 characters long.",
    "string.max": "Overview should not exceed 500 characters.",
  }),

  education : Joi.string().min(10).max(200).required().messages({
    "string.empty": "Education is required.",
    "string.min": "Education should be at least 10 characters long.",
    "string.max": "Education should not exceed 200 characters.",
  }),

  startDate: Joi.date().required().iso().messages({
    "date.base": "Invalid date format. Expected YYYY-MM-DD",
    "date.min": "Start date should be a valid date.",
    "date.max": "Start date should not be in the future.",
  }),
  endDate: Joi.date().iso().min(Joi.ref("startDate")).messages({
    "date.base": "Invalid date format. Expected YYYY-MM-DD",
    "date.min": "End date should be a valid date.",
    "date.max": "End date should not be earlier than the start date.",
  }),

  skills: Joi.string().required().messages({
    

  })
});

export default schema;
