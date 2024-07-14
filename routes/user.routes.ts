import express from "express";
import controllers from "../controllers/user.controllers";
import { Schemas, Validate } from "../middleware/joi";
import requireUser from "../middleware/requireUser";
import busy from "../middleware/toobusy";
import rateLimiter from "../middleware/rateLimiter";
import redis from "../middleware/redis";

const router = express.Router();

router.get(
  "/user",
  [requireUser, busy, rateLimiter, redis],
  controllers.getUser
);
router.post(
  "/user/signup",
  [Validate(Schemas.user.create), busy, rateLimiter],
  controllers.signUp
);
router.put(
  "/user/:id",
  [requireUser, Validate(Schemas.user.create), busy, rateLimiter],
  controllers.editUser
);

export = router;
