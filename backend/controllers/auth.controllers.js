import User from "../model/userModel.js";
import catchAsync from "../utils/catchAsync.js";
import { generateToken, setTokenInCookie } from "../utils/token.js";
import { createUser } from "../services/userService.js";
import { sendResponse } from "../utils/responseHandler.js";
import AppError from "../utils/appError.js";
import sendEmail from "../utils/email.js";
import crypto from "crypto";

export const signup = catchAsync(async (req, res, next) => {
  const newUser = await createUser(req.body);
  const token = generateToken(newUser._id);
  setTokenInCookie(token, res);
  sendResponse(res, 201, token, newUser);
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError(`Please Provide Email and password`, 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  const token = generateToken(user._id);
  setTokenInCookie(token, res);
  sendResponse(res, 200, token, user);
});

export const logout = catchAsync(async (req, res, next) => {
  // Clear the JWT from cookie
  res.cookie("jwt", "", { maxAge: 0 });

  res.status(200).json({
    status: "success",
    message: "logged out successfully",
  });
});

export const forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("there is no user with email address", 404));
  }

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // send token to user Email
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/resetPassword/${resetToken}`;
  const message = `Forgot your password? submit a patch request with new password and passwordConfirm to ${resetURL}.\n if you did not forgot your password forgot this email`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset token (valid for only 10 minutes)",
      message,
    });

    res.status(200).json({
      status: "success",
      message: "token sent to email",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError("There was an error sending the email. try again later", 500)
    );
  }
});

export const resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gte: Date.now() },
  });

  if (!user) {
    return next(new AppError("Token is invalid or expired", 400));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;

  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  const token = generateToken(user._id);

  setTokenInCookie(token, res);
  sendResponse(res, 201, token, user);
});

export const updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  if (!user.correctPassword(user.password, req.body.currentPassword)) {
    return next(new AppError("your current Password is wrong!", 401));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  const token = generateToken(user._id);
  setTokenInCookie(token, res);
  sendResponse(res, 200, token, user);
});
