import mongoose from "mongoose";

const serviceSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "you must add title"],
    },
    description: {
      type: String,
      required: [true, "you must add description"],
    },
    budget: {
      type: Number,
      required: [true, "you must add price"],
      min: [1, "Budget must be greater than 0"],
    },
    skills: {
      type: [String],
      required: [true, "must have skills"],
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
      index: true,
    },
    level: {
      type: String,
      required: [true, "must declare the level of the service"],
      enum: ["entry", "intermediate", "expert"],
    },
    status: {
      type: String,
      required: false,
      enum: ["pending", "in-progress", "completed", "canceled"],
      default: "pending",
    },
    proposals: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Proposal",
      },
    ],
    deletedAt: {
      type: Date,
      default: null,
      select: false,
    },
    completedAt: {
      type: Date,
    },
    createdAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Service = mongoose.model("Service", serviceSchema);
export default Service;
