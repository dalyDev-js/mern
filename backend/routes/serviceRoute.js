import express from "express";
import {
  createService,
  deleteService,
  getAllServices,
  getAllServicesByClient,
  getService,
  updateService,
} from "../controllers/serviceController.js";
import { protect } from "../middleware/protectRoute.js";
import { restrictedTO } from "../middleware/permission.js";
const router = express.Router();

router.route("/").get(getAllServices).post(createService);

//by client
router.route("/my-jobs").post(getAllServicesByClient);

router.route("/:id").get(getService).patch(updateService).delete(deleteService);

export default router;
