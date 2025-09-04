import mongoose, { Schema } from "mongoose";

const flashCardSchema = new mongoose.Schema(
  {
    questions: {
      type: String,
      required: [true, "Question Is Required"],
    },
    answer: {
      type: String,
      required: [true, "Answer Is Required"],
    },
  },
  { _id: false }
);
const deckSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Deck Name is Required"],
      unique: true,
    },
    description: {
      type: String,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    cards: {
      type: [flashCardSchema],
      required: [true, "Flash Card Is Required"],
      validate: {
        validator: function (arr) {
          return arr.length > 0;
        },
        message: "At Least One Flash Card Required",
      },
    },
  },
  { timestamps: true }
);

const deckModel = mongoose.model("Cards", deckSchema);
export default deckModel;
