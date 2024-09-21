import express from "express";
import {
  updateVerificationDocument,
  getVerificationDocument,
} from "../controllers/engineerController.js";
import documentUpload from "../middleware/uploads/documentsUpload.js";

const documentRouter = express.Router();

documentRouter.post(
  "/",
  documentUpload,
  // validation(certificateSchema, "body"),
  updateVerificationDocument
);

documentRouter.get("/:filename", getVerificationDocument);

// certificateRouter.put(
//   "/:id",
//   certificateUpload.single("file"),
//   validation(certificateSchema),
//   updatedCertificate
// );
// certificateRouter.delete("/:id", deleteCertificate);

export default documentRouter;
