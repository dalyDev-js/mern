import express from "express";
import { requestVerification } from "../controllers/verification.js";
import idUpload from "../middleware/uploads/verificationUpload.js"
const requestVerifyRouter = express.Router();

requestVerifyRouter.post("/", idUpload.single("image"),requestVerification);

export default requestVerifyRouter;
