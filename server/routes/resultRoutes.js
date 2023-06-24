import express from "express";
import { calculateSingleResult, createJsonFileofResult } from "../controllers/resultController.js";

const router = express.Router();

router.route("/cal-single-result/:testId").post(calculateSingleResult);
router.route('/create-json/:testId').get(createJsonFileofResult)

export default router;
