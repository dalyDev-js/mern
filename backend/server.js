import app from "./app.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";

dotenv.config({ path: "./config.env" });

const router = express.Router();

const DB = process.env.DATABASE.replace(
  "<PASSWORD>", 
  process.env.DATABASE_PASSWORD
);


mongoose.connect(DB).then(() => {
  console.log("DB connection successfull!");
});

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
