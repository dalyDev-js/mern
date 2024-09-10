import express from "express";
import {
  createService,
  deleteService,
  getAllServices,
  getService,
  updateService,
} from "../controllers/serviceController.js";
import { protect } from "../middleware/protectRoute.js";
import { restrictedTO } from "../middleware/permission.js";
const router = express.Router();

router
  .route("/")
  .get(getAllServices)
  .post(protect, restrictedTO("client"), createService);

router
  .route("/:id")
  .get(getService)
  .patch(updateService)
  .delete(protect, deleteService);

export default router;
