import User from "../model/userModel.js";

export const requestVerification = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    // Update requestVerifiedStatus to true
    user.requstVerifiedStatus = true;
    await user.save();

    res.status(200).json({
      status: "success",
      message: "Verification requested",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message || "An error occurred while requesting verification",
    });
  }
};
