import deckModel from "../Models/deckModel.js";
import userModel from "../Models/userModel.js";

import dotenv from "dotenv";
dotenv.config();

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
      // .populate("student", "email name -_id")
      // .select(["cards"]);

    if (!decks) {
      return res.status(401).json({
        Message: "Unable To fetch Decks",
        Status: "Success",     
      });
    }

    const noOfQuestions = decks.reduce((total, deck) => {
      return total + deck.cards.length;
    }, 0);


    return res.status(201).json({
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

const deleteAlldecks = async (req, res, next) => {
  try {
    await deckModel.deleteMany({});
    return res.status(201).json({
      Message: "All Decks Deleted",
      Status: "Success",
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteSingledeck = async (req, res, next) => {
  const { deckId } = req.params;
  try {
    const userDeckId = await deckModel.findById(deckId);
    if (!userDeckId) {
      return res.status(401).json({
        Message: "Deck Id is missing, encountered error in deleting Error",
        Status: "Error",
      });
    }

    await deckModel.findByIdAndDelete(userDeckId);
    return res.status(201).json({
      Message: "Deck Deleted Successfully",
      Status: "Error",
    });
  } catch (error) {
    console.log(error);
    next(error);
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
      status: "Success",
      singleDeck,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const generateQuiz = async (req, res, next) => {
  const { questions } = req.body;
  if (!questions) {
    return res.status(400).json({
      Message: "Question Not Provided",
      Status: "Error",
    });
  }
  try {
    const prompt = `You are conducting a learning routine  for an intermediate full-stack developer to actively recall what was taught in class, You will be given an array of questions, each question has its own correct answer.
    Add 3 more incorrect option to the answers in each quaestion in this data:${JSON.stringify(
      questions
    )}
    And indicate the correct answer for me in  italized format

    Put Correct answer in random Positions

    And Please don not return any comment or additional text. Just the updated array of question. Do Not add special character like *><?&%#;:.,' This response will be directly rendered on the front-end and it might break the code

    Return Response In this format : ${questions.map((ele) => {
      return {
        question: ele.questions,
        options: [ele.answer, "option2", "option3", "option4"],
      };
    })}

    Make sure the questions are derived from this data : ${JSON.stringify(
      questions
    )}

    >Thanks🥳
    `;

    const response = await fetch(`${process.env.Gemini_Url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-goog-api-key": process.env.GeminiApi,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }),
    });

    const data = await response.json();
    res.json({
      quiz: data.candidates[0].content.parts[0].text.replaceAll("\n", ""),
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
export {
  addNewDeckController,
  getAllDecksController,
  singleDeckHandler,
  generateQuiz,
  deleteSingledeck,
  deleteAlldecks,
};
