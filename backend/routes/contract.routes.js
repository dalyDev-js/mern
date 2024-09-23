import express from "express";
import {
  createContract,
  getContractById,
  updateContract,
  deleteContract,
  getAllContracts,
} from "../controllers/contract.controllers.js";

const contractRouter = express.Router();
contractRouter.route("/").post(createContract).get(getAllContracts);

contractRouter
  .route("/:id")
  .get(getContractById)
  .patch(updateContract)
  .delete(deleteContract);

export default contractRouter;
