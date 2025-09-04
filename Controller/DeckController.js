import deckModel from "../Models/deckModel.js";

const addNewDeckController = async (req, res, next) => {
  console.log(req.user);

  const userId = req.user._id;
  try {
    const addCard = await deckModel.create({ ...req.body, student: userId });

    if (!addCard) {
      return res.status(401).json({
        Message: "Unable To add Card",
        Status: "Error",
      });
    }

    return res.status(201).json({
      Message: "Deck added Succesfully",
      Status: "Success",
      addCard,
    });
  } catch (error) {
    // console.log(error);
    next(error);
  }
};

const getAllDecksController = async (req, res, next) => {
  const student = req.user;

  // const getUser = /
  try {
    const decks = await deckModel
      .find({ student })
        .populate("student", "email name")
      .select(["cards"]);

    if (!decks) {
      return res.status(401).json({
        Message: "Unable To fetch Decks",
        Status: "Success",
      });
    }

    const noOfQuestions = decks.reduce((total, deck) => {
      return total + deck.cards.length;
    }, 0);
    return res.status(401).json({
      Message: "All Cards Fecthed",
      Status: "Sucess",
      No_Of_Cards: decks.length,
      No_Of_Questions: noOfQuestions,
      decks,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteAlldeck = async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

const singleDeckHandler = async (req, res, next) => {  
  const { deckId } = req.params;
  try {
    const singleDeck = await deckModel.findById(deckId).populate("student");

    if (!singleDeck) {
      return res.status(401).json({
        Message: "Unable to fetch Single deck",
        Status: "Error",
      });
    }

    return res.status(201).json({
      Message: "All Cards Fetched",
      status: "Error",
      singleDeck,
    });
  } catch (error) {
    console.log(error);
  }
};

export { addNewDeckController, getAllDecksController, singleDeckHandler };
