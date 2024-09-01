import express from "express";
import {
  createService,
  deleteService,
  getAllServices,
  getService,
  updateService,
} from "../controllers/serviceController.js";
const router = express.Router();

router.route("/").get(getAllServices).post(createService);
router.route("/:id").get(getService).patch(updateService).delete(deleteService);

export default router;
