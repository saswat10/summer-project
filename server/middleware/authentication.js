import { UnauthenticatedError } from "../errors/index.js";
import jwt from 'jsonwebtoken'

const authentication = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    console.log('here');
    throw new UnauthenticatedError("authentication invalid");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId, userRole: payload.userRole };
    next();
  } catch (error) {
    console.log('no here')
    throw new UnauthenticatedError("authentication invalid");
  }
};

export default authentication;
