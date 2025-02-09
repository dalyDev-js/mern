import express from "express";
import {
  addCertificate,
  deleteCertificate,
  getCertificate,
  updatedCertificate,
} from "../controllers/certificateController.js";
import { validation } from "../middleware/validation.js";
import certificateSchema from "../validation/certificate/certificateValidation.js";
import certificateUpload from "../middleware/uploads/certificateUpload.js";

const certificateRouter = express.Router();

certificateRouter.get('/:id',getCertificate)

certificateRouter.post(
  "/:id",
  certificateUpload.single("file"),
  validation(certificateSchema, "body"),
  addCertificate
);
certificateRouter.put(
  "/:id",
  certificateUpload.single("file"),
  validation(certificateSchema),
  updatedCertificate
);
certificateRouter.delete("/:id", deleteCertificate);

export default certificateRouter;
