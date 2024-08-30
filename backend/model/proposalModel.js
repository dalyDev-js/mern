const proposalSchema = new mongoose.Schema({
  engineer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Engineer",
    required: true,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  bidAmount: {
    type: Number,
    required: true,
    min: 0,
  },
  proposalDetails: {
    type: String,
    required: true,
  },
});
