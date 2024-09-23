import express from "express";
import { updateVerifiedStatus } from "../controllers/verify.controller.js";
import { getUsersPendingVerification } from "../controllers/userController.js";

const verifyRouter = express.Router();

verifyRouter.post("/user/:id", updateVerifiedStatus);
verifyRouter.get("/pendingVerify", getUsersPendingVerification);
export default verifyRouter;
