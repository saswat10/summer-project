import mongoose from "mongoose";

const QuestSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Please provide the question"],
      trim: true,
    },
    answer: {
      type: String,
      required: [true, "Please provide the answer"],
      trim: true,
    },
  },
);

const TestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide the question"],
      trim: true,
    },
    questions: {
      type: [QuestSchema],
      required: [true, "Please provide the questions for the test"],
      trim: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide the creator"],
    },
  },
  { timestamps: true }
);

export default new mongoose.model("Test", TestSchema);
