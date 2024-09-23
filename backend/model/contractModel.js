import mongoose from "mongoose";

const contractSchema = new mongoose.Schema({
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true,
  },
  engineer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Engineer",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  contractTitle: {
    type: String,
    required: true,
  },
  paymentAmount: {
    type: Number,
    required: true,
    min: 0,
  },
  paymentOption: {
    type: String,
    required: true,
    enum: ["fixed", "weekly"],
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["pending", "active", "completed", "cancelled"],
  },
  description: {
    type: String,
    required: true,
  },
});

const Contract = mongoose.model("Contract", contractSchema);

export default Contract;
