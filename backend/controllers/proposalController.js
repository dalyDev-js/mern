import { Engineer } from "../model/engineerModel.js";
import { Proposal } from "../model/proposalModel.js";

import catchAsync from "../utils/catchAsync.js";

const addProposal = catchAsync(async (req, res, next) => {
  const { content, budget, service, engineerId } = req.body;

  // Validate input
  if (!content || !service || !budget || !engineerId) {
    return res.status(400).json({ message: "Complete all required fields" });
  }

  // Check for existing proposal
  const existingProposal = await Proposal.findOne({
    engineer: engineerId,
    service,
  });

  if (existingProposal) {
    return res.status(400).json({
      message: "You have already submitted a proposal for this job.",
    });
  }

  // Create the new proposal
  const newProposal = await Proposal.create({
    content,
    budget,
    service,
    engineer: engineerId,
  });

  console.log("New proposal created:", newProposal);

  // Update the engineer's submitted proposals
  const updatedEngineer = await Engineer.findByIdAndUpdate(
    engineerId,
    { $addToSet: { submittedProposals: newProposal } },
    { new: true }
  );
  console.log(updatedEngineer);
  if (!updatedEngineer) {
    console.error("Engineer not found for ID:", engineerId);
    return res.status(404).json({ message: "Engineer not found." });
  }

  console.log(
    "Successfully updated submitted proposals:",
    updatedEngineer.submittedProposals
  );

  // Respond with the new proposal
  res.status(201).json({
    message: "Proposal added successfully",
    proposal: newProposal,
    submittedProposals: updatedEngineer.submittedProposals, // Optionally return updated proposals
  });
});

const updateProposal = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const engineer = req.user.id;
  const { content, budget, service } = req.body;

  const proposal = await Proposal.findOneAndUpdate(
    { engineer, _id: id },
    { content, budget, service },
    { new: true }
  );

  if (!proposal) return res.status(404).json({ message: "Proposal not found" });
  res.status(200).json({ message: "Proposal updated successfully", proposal });
});

const getProposalsByUserId = catchAsync(async (req, res, next) => {
  const { userId } = req.params;
  const proposals = await Proposal.find({ engineer: userId });

  if (!proposals.length)
    return res.status(404).json({ message: "No proposals found" });
  res.status(200).json({ proposals });
});

export { addProposal, updateProposal, getProposalsByUserId };
