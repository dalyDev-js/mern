import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  verifiedStatus: {
    type: Boolean,
    default: false,
  },
  postedProjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
  companyName: {
    type: String,
    required: true,
  },
  // clientId: {
  //   type: String,
  //   required: true,
  //   unique: true,
  // },
  reviewDate: {
    type: Date,
    required: true,
  },
});

export const Client = mongoose.model("Client",clientSchema)



