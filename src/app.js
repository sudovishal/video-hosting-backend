import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
// learn more about cors and their options- assignment


app.use(express.json({ limit: "16kb" })); // to handle json data
app.use(express.urlencoded({ extended: true, limit: "16kb" })); // to handle url parameters
app.use(express.static("public")); // to serve static files
app.use(cookieParser()); // server se joh user ka browser hai uski cookies access aur set kar paau
//routes import
import userRouter from './routes/user.routes.js';
import tweetRouter from './routes/tweet.routes.js';
import healthcheckrouter from './routes/healthcheck.routes.js';
// routes declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/forums", tweetRouter)
app.use("/api/v1/healthcheck", healthcheckrouter)

// http://localhost:8000/api/v1/users/register
export { app };
