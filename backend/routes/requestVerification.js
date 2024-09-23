import express from "express";
import { requestVerification } from "../controllers/verification.js";

const requestVerifyRouter = express.Router();

requestVerifyRouter.post("/", requestVerification);

export default requestVerifyRouter;
