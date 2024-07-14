import express from "express";
import controllers from "../controllers/ai.controllers";
import requireUser from "../middleware/requireUser";
import { Schemas, Validate } from "../middleware/joi";
import busy from "../middleware/toobusy";
import rateLimiter from "../middleware/rateLimiter";
const router = express.Router();

router.post(
  "/ai",
  [requireUser, Validate(Schemas.data.prompt), busy, rateLimiter],
  controllers.postAI
);

export = router;
