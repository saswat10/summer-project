import express from "express";
import { calculateSingleResult } from "../controllers/resultController.js";

const router = express.Router();

router.route("/cal-single-result/:testId").get(calculateSingleResult);

export default router;
