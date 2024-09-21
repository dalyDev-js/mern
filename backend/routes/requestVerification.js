import express from "express";
import { requestVerification } from "../controllers/verification.js";

const verifyRouter = express.Router();

verifyRouter.post("/", requestVerification);

export default verifyRouter;
