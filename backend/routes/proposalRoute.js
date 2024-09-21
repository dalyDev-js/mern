import express from "express";
import {
  addProposal,
  updateProposal,
  getProposalsByUserId,
} from "../controllers/proposalController.js";

const proposalRouter = express.Router();

proposalRouter.post("/addproposal", addProposal);
proposalRouter.put("/updateproposal/:id", updateProposal);
proposalRouter.get("/user/:id", getProposalsByUserId);

export default proposalRouter;
