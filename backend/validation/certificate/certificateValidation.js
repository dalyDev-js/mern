import Joi from "joi";

const certificateSchema = Joi.object({
  name: Joi.string().required().min(5).max(100).messages({
    "string.empty": "Certificate name is required.",
    "string.min": "Certificate name should be at least 5 characters long.",
    "string.max": "Certificate name should not exceed 100 characters.",
  }),

});

export default certificateSchema;
