import User from "../model/userModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

// userController.js

// Fetch user by ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: { user },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error fetching user",
    });
  }
};

const filterObj = (obj, ...allowedFields) => {
  const filteredObj = {};
  Object.keys(obj).forEach((key) => {
    if (allowedFields.includes(key)) {
      filteredObj[key] = obj[key];
    }
  });
  return filteredObj;
};

export const updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      AppError(
        "This pass in not for update Password , you can use /updatePassword",
        400
      )
    );
  }

  const fitleredBody = filterObj(req.body, "fullName", "username");
  const updatedUser = await User.findByIdAndUpdate(req.user.id, fitleredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

export const deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(200).json({
    status: "success",
    data: null,
  });
});

export const getUsersPendingVerification = catchAsync(
  async (req, res, next) => {
    try {
      const users = await User.find({
        verifiedStatus: "pending",
        requestVerifiedStatus: true,
      });

      if (!users.length) {
        return res.status(404).json({
          status: "fail",
          message: "No users found with pending verification status",
        });
      }

      res.status(200).json({
        status: "success",
        data: {
          users,
        },
      });
    } catch (error) {
      next(
        new AppError(
          "Error fetching users with pending verification status",
          500
        )
      );
    }
  }
);
