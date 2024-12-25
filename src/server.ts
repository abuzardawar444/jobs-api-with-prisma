import express, { Request, Response } from "express";
import dotenv from "dotenv";
import NotFound from "./middleware/not-found.js";
import errorHandlerMiddleWare from "./middleware/error-handler.js";
dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "App is running..." });
});

app.use(NotFound);
app.use(errorHandlerMiddleWare);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App is running on ${port}`));
