import { Admin } from "../model/adminModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import { sendResponse } from "../utils/responseHandler.js";
import { generateAdminToken, setTokenInCookie } from "../utils/token.js";

export const superAdminLogin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError(403, "Email or password not provided"));
  }
  const superAdmin = await Admin.findOne({ email }).select("+password");

  if (
    !superAdmin ||
    !(await superAdmin.correctPassword(password, superAdmin.password))
  ) {
    return next(new AppError("Incorrect email or password", 401));
  }

  const token = generateAdminToken(superAdmin._id);
  setTokenInCookie(token, res);
  sendResponse(res, 200, token, superAdmin);
});
