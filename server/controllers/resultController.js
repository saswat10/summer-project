import fs from "fs";
import Test from "../model/Test.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import getAnswerResult from "../utils/getAnswers.js";
import Result from "../model/Result.js";

const getAllResults = (req, res) => {
  res.send("get All Results");
};

const calculateSingleResult = async (req, res) => {
  const { singleStudentAnswers } = req.body;
  const { testId } = req.params;

  const test = await Test.findOne({ _id: testId });
  if (!test) {
    throw new BadRequestError(`${testId} is not a valid test id`);
  }
  const { questions } = test;
  const singleStudentResult = getAnswerResult(questions, singleStudentAnswers);
  req.body.studentId = req.user.userId;
  req.body.testId = testId;
  req.body.results = singleStudentResult;
  const newResult = await Result.create(req.body);
  res
    .status(StatusCodes.OK)
    .json({ msg: "Test submitted successfully", newResult });
};

const createJsonFileofResult = async (req, res) => {
  const { testId } = req.params;
  const test = await Test.findOne({ _id: testId });
  if (!test) {
    throw new BadRequestError(`No test with id ${testId}`);
  }
  const results = await Result.find({ testId });
  const jsonResult= JSON.stringify(results);
  fs.writeFileSync("./result.json",jsonResult,function (err){
    if (err) {
      throw new BadRequestError('Error writing a file');
    }
  });
  res.status(StatusCodes.OK).json({ msg: "success" });
};

export { calculateSingleResult, createJsonFileofResult };
