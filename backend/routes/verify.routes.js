import express from "express";
import { updateVerifiedStatus } from "../controllers/verify.controller.js";

const verifyRouter = express.Router();

verifyRouter.post("/user/:id", updateVerifiedStatus);

export default verifyRouter;
