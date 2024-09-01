// Project Schema
const projectSchema = new mongoose.Schema({
  skillsRequired: {
    type: [String],
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  requirements: {
    type: String,
    required: true,
    trim: true,
  },
  budget: {
    type: Number,
    required: true,
    min: 0,
  },
  deadline: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["open", "in progress", "completed", "cancelled"],
  },
  postedDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  proposals: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Proposal",
    },
  ],
  selectedProposal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Proposal",
  },
});
