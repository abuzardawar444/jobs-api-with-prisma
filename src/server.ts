import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import NotFound from "./middleware/not-found.js";
import errorHandlerMiddleWare from "./middleware/error-handler.js";
import jobsRoute from "./routes/jobsRoute.js";
const app = express();
app.use(express.json());

app.use("/api/v1/jobs", jobsRoute);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "App is running..." });
});

app.use(NotFound);
app.use(errorHandlerMiddleWare);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App is running on ${port}`));
