import User from "../model/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";

// REGISTRATION CONTROLLER

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestError("Please provide all the credentials");
  }
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError("Email Id already exists");
  }

  const user = await User.create({ name, email, password });
  res.status(StatusCodes.CREATED).json({ user });
};

//LOGIN CONTROLLER

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new BadRequestError("Please provide valid emailId");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new BadRequestError("Incorrect Password");
  }
  const token = user.createJWT(user);
  user.password = undefined;
  res.status(StatusCodes.OK).json({ user, token });
};

export { register, login };
