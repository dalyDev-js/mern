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
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
        required: true,
      },
    },
  ],
  activeContracts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contract",
    },
  ],
});

export const Engineer = mongoose.model("Engineer", engineerSchema);
