import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "App is running..." });
});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App is running on ${port}`));
