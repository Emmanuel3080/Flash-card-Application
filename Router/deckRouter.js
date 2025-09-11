import express from "express";
import {
  addNewDeckController,
  deleteAlldecks,
  deleteSingledeck,
  generateQuestion,
  generateQuiz,
  getAllDecksController,
  singleDeckHandler,
} from "../Controller/DeckController.js";
import { isLogged } from "../Middlewares/isLogged.js";

const deckRouter = express.Router();

deckRouter.post("/addDEck", isLogged, addNewDeckController);
deckRouter.get("/deck/all", isLogged, getAllDecksController);
deckRouter.get("/deck/:deckId", isLogged, singleDeckHandler);
deckRouter.post("/generate-quiz", isLogged, generateQuiz);

deckRouter.delete("/deck/delete/all", isLogged, deleteAlldecks);
deckRouter.delete("/deck/delete/:deckId", isLogged, deleteSingledeck);
deckRouter.post("/generate/question", isLogged, generateQuestion);

export default deckRouter;
