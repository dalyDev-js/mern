const engineerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  portfolio: {
    type: String,
    required: true,
  },
  certifications: [
    {
      type: String,
      required: true,
    },
  ],
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
    }
  },
  specialization: {
    type: [String],
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  completedProjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
  verifiedStatus: {
    type: Boolean,
    default: false,
  },
});

export const Engineer = mongoose.model("Engineer", engineerSchema);
