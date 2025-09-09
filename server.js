import express from "express";
import dotenv from "dotenv";
import connectDb from "./DbConfig/connectDatabase.js";
import authRouter from "./Router/authRouter.js";

import cors from "cors";
import handleError from "./Middlewares/handleError.js";

import morgan from "morgan";
import deckRouter from "./Router/deckRouter.js";

const app = express();

app.use(express.json());

app.use(cors());

dotenv.config();

app.use(morgan("dev"))



const portNumber = process.env.PORT;

app.listen(portNumber, () => {
  console.log(`Port is Running on http://localhost:${portNumber}`);
});

app.get("/api/v1", (req, res) => {
  res.send("Welcome Jhorrr");   
});

app.use("/api/v1", authRouter);
app.use("/api/v1", deckRouter)

connectDb();

app.use("/{*any}", handleError)

app.all("/{*any}", (req, res) => {
  res.status(400).json({
    Message: `${req.method} ${req.originalUrl} os not a viald Endpoint on this server`,
  });
});
