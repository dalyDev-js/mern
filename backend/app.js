import express from "express";
import servicesRouter from "./routes/serviceRoute.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/userRouts.js";
import globalErrorHandler from "./controllers/errorController.js";
import AppError from "./utils/appError.js";
import portfolioRouter from "./routes/portfolioRoute.js";
import certificateRouter from "./routes/certificateRoute.js";
import experienceRouter from "./routes/experienceRoute.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/services", servicesRouter);
app.use("/api/v1/portfolios", portfolioRouter);
app.use("/api/v1/certificates", certificateRouter);
app.use("/api/v1/experiences", experienceRouter);
app.use("/api/v1/auth", authRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`con't find ${req.originalUrl}`, 404));
});

app.use(globalErrorHandler);
export default app;
