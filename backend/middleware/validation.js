export const validation = (schema, location) => {
  return (req, res, next) => {
    let inputs = req[location];
    let { error } = schema.validate(inputs, { abortEarly: false });
    if (error) {
      let errors = error.details.map((detail) => detail.message);
      res.json(errors);
    } else {
      next();
    }
  };
};
