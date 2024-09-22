import mongoose from "mongoose";

const engineerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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
      service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
        required: true,
      },
    },
  ],
  submittedProposals: [
    {
      service: {
        type: mongoose.Schema.Types.ObjectId, // Assuming service is an ObjectId
        ref: "Service",
        required: true,
      },
    },
  ], // Add this to track submitted proposals
});

export const Engineer = mongoose.model("Engineer", engineerSchema);
