import mongoose from "mongoose";

const proposalSchema = new mongoose.Schema({
  engineer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Engineer",
    required: true,
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  budget: {
    type: Number,
    required: true,
  },
});

export const Proposal = mongoose.model("Proposal", proposalSchema);
