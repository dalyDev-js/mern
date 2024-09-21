import User from "../model/userModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import { verifyToken } from "../utils/token.js";

const readTokenFromCookie = (req, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return next(
      new AppError("You Are not logged in. Please loggin to get access!😭", 401)
    );
  }
  return token;
};

const readTokenFromHeader = (req, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(
      new AppError("You are not logged in. Please log in to get access!😭", 401)
    );
  }

  // Extract the token from the "Bearer <token>" format
  const token = authHeader.split(" ")[1];

  if (!token) {
    return next(new AppError("Token not found. Please log in again!😭", 401));
  }

  return token;
};

export const protect = catchAsync(async (req, res, next) => {
  const token = readTokenFromHeader(req, next);

  const decoded = await verifyToken(token, process.env.JWT_SECRET);

  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }

  if (freshUser.passwordChangedAfterTokenIssued(decoded.iat)) {
    return next(
      new AppError("user recently changed password! please login again!", 401)
    );
  }

  req.user = freshUser;
  next();
});
