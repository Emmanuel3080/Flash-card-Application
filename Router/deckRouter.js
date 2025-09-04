import express from "express";
import {
  addNewDeckController,
  getAllDecksController,
  singleDeckHandler,
} from "../Controller/DeckController.js";
import { isLogged } from "../Middlewares/isLogged.js";

const deckRouter = express.Router();

deckRouter.post("/addDEck", isLogged, addNewDeckController);
deckRouter.get("/deck/all", isLogged, getAllDecksController);
deckRouter.get("/deck/:deckId", singleDeckHandler);

export default deckRouter;
