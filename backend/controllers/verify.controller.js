import User from "../model/userModel.js";

// Controller to update verifiedStatus
export const updateVerifiedStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // 'pending', 'rejected', 'accepted'

    // Check if the status is valid
    if (!["pending", "rejected", "accepted"].includes(status)) {
      return res.status(400).json({
        status: "fail",
        message:
          "Invalid status. Must be one of 'pending', 'rejected', or 'accepted'.",
      });
    }

    // Find the user by ID and update their verifiedStatus
    const user = await User.findByIdAndUpdate(
      id,
      { verifiedStatus: status },
      { new: true, runValidators: true }
    );

    // If no user found
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "No user found with this ID.",
      });
    }

    // Success response
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
