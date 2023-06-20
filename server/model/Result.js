import mongoose from "mongoose";

const StudentAnswerSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  answer: {
    type: String,
  },
  similarityIndex: {
    type: Number,
    required: true,
  },
  spellingErrors: {
    type: Number,
    required: true,
  },
  grammaticalErrors: {
    type: Number,
    required: true,
  },
  punctuationErrors: {
    type: Number,
    required: true,
  },
  totalErrors: {
    type: Number,
    required: true,
  },
});

const ResultSchema = new mongoose.Schema(
  {
    testId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref:'Test'
    },
    studentId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    results: {
      type: [StudentAnswerSchema],
    },
  },
  { timestamps: true }
);

export default new mongoose.model("Result", ResultSchema);
