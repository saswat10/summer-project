import Test from "../model/Test.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import checkPermissions from "../utils/checkPermission.js";
import mongoose from "mongoose";

const getAllTest = async (req, res) => {
  const teacherId = req.user.userId;
  const tests = await Test.find({ createdBy: teacherId });
  res.status(StatusCodes.OK).json({ tests, totalTests: tests.length });
};
const getSingleTest = async (req, res) => {
  const { id: testId } = req.params;
  const teacherId = req.user.userId;
  if (!mongoose.Types.ObjectId.isValid(testId)) {
    throw new BadRequestError("Not a valid test Id");
  }
  let singleTest;
  if (req.user.userRole === "admin") {
    singleTest = await Test.findOne({ _id: testId, createdBy: teacherId });
  } else {
    singleTest = await Test.findOne({ _id: testId });
    singleTest?.questions?.forEach((element) => {
      element.answer = undefined;
    });
  }
  if (!singleTest) {
    throw new NotFoundError("no test found");
  }
  res.status(StatusCodes.OK).json({ singleTest });
};
const createTest = async (req, res) => {
  const { name, questions } = req.body;
  if (!name || questions?.length == 0) {
    throw new BadRequestError("Please provide all the values");
  }
  req.body.createdBy = req.user.userId;
  const newTest = await Test.create(req.body);
  /* res.status(StatusCodes.CREATED).json({ msg: "Test created successfully" }); */
  res.status(StatusCodes.CREATED).json({ newTest });
};
const updateTest = async (req, res) => {
  const { name, questions } = req.body;
  const { id: testId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(testId)) {
    throw new BadRequestError("Not a valid test Id");
  }
  if (!name || questions.length == 0) {
    throw new BadRequestError("Please provide all the values");
  }
  const test = await Test.findOne({ _id: testId });
  if (!test) {
    throw new NotFoundError(`No test with id ${testId}`);
  }
  checkPermissions(req.user.userId, test.createdBy);
  test.name = name;
  test.questions = questions;
  await test.save();
  res
    .status(StatusCodes.CREATED)
    .json({ msg: "Test updated successFully successfully" });
};

const deleteTest = async (req, res) => {
  const { id: testId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(testId)) {
    throw new BadRequestError("Not a valid test Id");
  }
  const test = await Test.findOne({ _id: testId });
  if (!test) {
    throw new NotFoundError(`No test with id ${testId}`);
  }
  checkPermissions(req.user.userId, test.createdBy);
  await test.remove();
  res
    .status(StatusCodes.CREATED)
    .json({ msg: "Test deleted successFully successfully" });
};

export { getAllTest, getSingleTest, createTest, updateTest, deleteTest };
