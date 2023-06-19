import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./db/connectDB.js";

//Routes
import authRoutes from "./routes/authRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import resultRoutes from "./routes/resultRoutes.js"

//Middlewares
import notFoundMiddleWare from "./middleware/notFound.js";
import errorHandlingMiddleware from "./middleware/errorHandlingMiddleware.js";
import authentication from "./middleware/authentication.js"

const app = express();
const PORT = process.env.PORT || 5000;



app.use(express.json());
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/tests",authentication, testRoutes);
app.use("/api/v1/results",authentication,resultRoutes)

app.use(notFoundMiddleWare);
app.use(errorHandlingMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`server listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
