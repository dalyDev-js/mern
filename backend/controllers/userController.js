import User from "../model/userModel.js";
import catchAsync from "../utils/catchAsync.js";

export const getAllusers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});
