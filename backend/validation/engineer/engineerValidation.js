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
  })
});

export default schema;
