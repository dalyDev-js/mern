const clientSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  verifiedStatus: {
    type: String,
    enum: ["pending", "verified", "rejected"],
    default: "pending",
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
  clientId: {
    type: String,
    required: true,
    unique: true,
  },
  reviewDate: {
    type: Date,
    required: true,
  },
});
