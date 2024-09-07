import AppError from "../utils/appError.js";

export const restrictedTO = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("you don't have permission to perform this action", 403)
      );
    }
    console.log("Hello from res-");
    next();
  };
};
