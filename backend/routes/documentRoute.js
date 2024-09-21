import express from "express";
import {
  updateVerificationDocument,
  getVerificationDocument,
  getPendingVerificationEngineers,
  updateVerificationStatus,
} from "../controllers/engineerController.js";
import documentUpload from "../middleware/uploads/documentsUpload.js";
import { protect } from "../middleware/protectRoute.js";

const documentRouter = express.Router();
//upload document
documentRouter.post(
  "/",

  documentUpload,
  protect,
  updateVerificationDocument
);
//the api that change state verified or rejeccted
documentRouter.post("/verify", updateVerificationStatus);
//get the file document
documentRouter.get("/uploads/:filename", getVerificationDocument);
//that waiting for admin action
documentRouter.get("/pendingverifications", getPendingVerificationEngineers);

// certificateRouter.put(
//   "/:id",
//   certificateUpload.single("file"),
//   validation(certificateSchema),
//   updatedCertificate
// );
// certificateRouter.delete("/:id", deleteCertificate);

export default documentRouter;
