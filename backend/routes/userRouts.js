import express from "express";
import { getAllusers } from "../controllers/userController.js";

const router = express.Router();

router.route("/").get(getAllusers);

export default router;
