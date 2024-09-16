import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  file: {
    type: String,
    required: true,
  },
});

export const Certificate = mongoose.model("Certificate", certificateSchema);
