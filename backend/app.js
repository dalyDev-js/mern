import express from "express";
import servicesRouter from "./routes/serviceRoute.js";

const app = express();
app.use(express.json());

// app.use("/api/v1/users", userRouter);
app.use("/api/v1/services", servicesRouter);

export default app;
