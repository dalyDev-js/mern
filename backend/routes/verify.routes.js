import express from "express";
import { updateVerifiedStatus } from "../controllers/verify.controller";

const verifyRouter = express.Router();

verifyRouter.post("/user/:id", updateVerifiedStatus);

export default verifyRouter;
