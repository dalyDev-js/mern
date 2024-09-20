



import express from "express";
import { addClient, getAllClients, getClientById } from "../controllers/clientController.js";

const clientRouter = express.Router();


clientRouter.get("/getAllClients",getAllClients)
clientRouter.get("/getClientById/:id",getClientById)
clientRouter.post("/addClient",addClient)



export default  clientRouter;