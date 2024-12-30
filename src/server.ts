import "express-async-errors";
import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import NotFound from "./middleware/not-found";
import errorHandlerMiddleWare from "./middleware/error-handler";
import jobsRoute from "./routes/jobsRoute";
import authRout from "./routes/authRoute";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute";

const app = express();
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.json());

app.use("/api/v1/jobs", jobsRoute);
app.use("/api/v1/auth", authRout);
app.use("/api/v1/user", userRoute);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "App is running..." });
});

app.use(NotFound);
app.use(errorHandlerMiddleWare);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App is running on ${port}`));
