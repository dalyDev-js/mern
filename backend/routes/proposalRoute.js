import express from "express";
import {
  addProposal,
  updateProposal,
  getProposalsByUserId,
  getProposalsByServiceId,
} from "../controllers/proposalController.js";

const proposalRouter = express.Router();

proposalRouter.post("/addproposal", addProposal);
proposalRouter.put("/updateproposal/:id", updateProposal);
proposalRouter.get("/user/:id", getProposalsByUserId);
proposalRouter.get("/service/:id", getProposalsByServiceId);

export default proposalRouter;
