import express from "express";
import {
  getAllTest,
  getSingleTest,
  createTest,
  deleteTest,
  updateTest,
} from "../controllers/testController.js";
import authorization from "../middleware/authorization.js";

const router = express.Router();

router.route("/").get(authorization,getAllTest).post(authorization,createTest);
router
  .route("/:id")
  .patch(authorization,updateTest)
  .delete(authorization,deleteTest)
  .get(getSingleTest);

export default router;
