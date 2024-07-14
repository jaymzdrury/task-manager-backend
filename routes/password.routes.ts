import express from "express";
import controllers from "../controllers/password.controllers";
import { Schemas, Validate } from "../middleware/joi";
import busy from "../middleware/toobusy";
import rateLimiter from "../middleware/rateLimiter";

const router = express.Router();

router.get("/user/:id", busy, controllers.resetPassword);
router.get("/user/password/:id", busy, controllers.getPassword);
router.put(
  "/user/password/:id",
  [Validate(Schemas.user.create), busy, rateLimiter],
  controllers.updatePassword
);

export = router;
