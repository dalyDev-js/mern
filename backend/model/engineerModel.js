import mongoose from "mongoose";

const engineerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // This creates a relationship between Engineer and User models
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  education: {
    title: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  overview: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  profilePic: {
    type: String,
  },
  savedJobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
    },
  ],
});

export const Engineer = mongoose.model("Engineer", engineerSchema);
