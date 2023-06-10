import { UnauthenticatedError } from "../errors/index.js";

const authorization = (req, res, next) => {
  const role = req.user.userRole;
  try {
    if (role !== "admin") {
      throw new UnauthenticatedError("Not allowed to access this route");
    }
    next();
  } catch (error) {
    throw new UnauthenticatedError("Not authorized to access this route");
  }
};

export default authorization;
