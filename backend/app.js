import express from "express";
import servicesRouter from "./routes/serviceRoute.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/userRouts.js";
import globalErrorHandler from "./controllers/errorController.js";
import AppError from "./utils/appError.js";
import cookieParser from "cookie-parser";
import clientRouter from "./routes/client.router.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
import cors from "cors";
import engineerRouters from "./routes/engineerRoute.js";


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());


app.use("/api/v1/users", userRouter);
app.use("/api/v1/services", servicesRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/client",clientRouter);
app.use("/api/v1/engineers",engineerRouters);


app.all("*", (req, res, next) => {
  next(new AppError(`con't find ${req.originalUrl}`, 404));
});

app.use(globalErrorHandler);
export default app;
