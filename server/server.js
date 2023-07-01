import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./db/connectDB.js";
import cors from "cors";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

//Routes
import authRoutes from "./routes/authRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import resultRoutes from "./routes/resultRoutes.js";

//Middlewares
import notFoundMiddleWare from "./middleware/notFound.js";
import errorHandlingMiddleware from "./middleware/errorHandlingMiddleware.js";
import authentication from "./middleware/authentication.js";

const app = express();
app.use(cors());
const __dirname = dirname(fileURLToPath(import.meta.url));

// only when ready to deploy
app.use(express.static(path.resolve(__dirname, "../dist")));
const PORT = process.env.PORT || 5000;

/* app.get("/", (req, res) => {
  let dataToSend;
  const python = spawn("python", ["main.py",'my name is arman','my first nam is arman']);
  python.stdout.on("data", function (data) {
    console.log("Pipe data from python script ...");
    dataToSend = data.toString();
  });
  python.on("close", (code) => {
    console.log(`child process close all stdio with code ${code}`);
    res.json({ data: dataToSend.replace('3\r\n',"").replace('\r\n',"") });
  });
}); */

app.use(express.json());
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/tests", authentication, testRoutes);
app.use("/api/v1/results", authentication, resultRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

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
