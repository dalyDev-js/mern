import express from "express";
import servicesRouter from "./routes/serviceRoute.js";
import userRouter from "./routes/userRouts.js";
import AppError from "./utils/appError.js";
import portfolioRouters from "./routes/portfolioRoute.js";

const app = express();
app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/services", servicesRouter);
app.use("/api/v1/portfolios", portfolioRouters);

app.all("*", (req, res, next) => {
  next(new AppError(`con't find ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});
export default app;
