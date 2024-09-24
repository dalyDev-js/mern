import app from "./app.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { server } from "./socket/socket.js";

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => {
  console.log("DB connection successfull!");
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`App running on port ${port}`);
});
