import Joi from "joi";

const schema = Joi.object({
  title: Joi.string().required().min(5).max(100).messages({
    "string.empty": "Project title is required.",
    "string.min": "Project title should be at least 5 characters long.",
    "string.max": "Project title should not exceed 100 characters.",
  }),
  description: Joi.string().min(10).max(500).required().messages({
    "string.empty": "Description is required.",
    "string.min": "Description should be at least 10 characters long.",
    "string.max": "Description should not exceed 500 characters.",
  }),
  url: Joi.string().allow(null),
});

export default schema;
