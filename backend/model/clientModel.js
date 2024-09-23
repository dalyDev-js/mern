import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  overview: {
    type: String,
    required: true,
  },
  postedProjects: [
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

export const Client = mongoose.model("Client", clientSchema);
