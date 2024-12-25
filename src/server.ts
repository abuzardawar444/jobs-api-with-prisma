import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();

// middleware
app.use(express.json());

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is listening on ${port}`));
