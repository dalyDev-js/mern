import mongoose from "mongoose";

const engineerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  certificates: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Certificate", // Reference the Certificate model
    },
  ],
  portfolios: [
    // Adding portfolios array to store references
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Portfolio", // Reference the Portfolio model
    },
  ],

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
      contract: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contract",
      },
      service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
      },
    },
  ],
});

export const Engineer = mongoose.model("Engineer", engineerSchema);
