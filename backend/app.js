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
import proposalRouter from "./routes/proposalRoute.js";
import cors from "cors";
import engineerRouters from "./routes/engineerRoute.js";
import paymentRouter from "./routes/paymnet.routes.js";

import clientRouter from "./routes/client.routes.js";
import contractRouter from "./routes/contract.routes.js";
import verifyRouter from "./routes/verify.routes.js";
import requestVerifyRouter from "./routes/requestVerification.js";
const app = express();

app.use(
  cors({
    origin: ["http://localhost:3001", "http://localhost:4200"],
    credentials: true,
  })
);

app.use(express.static("tmp"));

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/services", servicesRouter);
app.use("/api/v1/client", clientRouter);
app.use("/api/v1/contract", contractRouter);
app.use("/api/v1/portfolios", portfolioRouter);
app.use("/api/v1/request-verification", verifyRouter);
app.use("/api/v1/certificates", certificateRouter);
app.use("/api/v1/experiences", experienceRouter);
app.use("/api/v1/proposals", proposalRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/engineer", engineerRouters);
app.use("/api/v1/verify", verifyRouter);
app.use("/api/v1/requestVerify", requestVerifyRouter);
app.use("/api/vi/payment", paymentRouter);
app.use("/api/v1/admin-auth", adminRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl}`, 404));
});

app.use(globalErrorHandler);
export default app;
