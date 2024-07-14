import express from "express";
import controllers from "../controllers/tasks.controllers";
import requireUser from "../middleware/requireUser";
import busy from "../middleware/toobusy";
import { Schemas, Validate } from "../middleware/joi";
import rateLimiter from "../middleware/rateLimiter";
import redis from "../middleware/redis";
const router = express.Router();

router.get(
  "/tasks",
  [requireUser, busy, rateLimiter, redis],
  controllers.getTask
);
router.get("/tasks/:id", [requireUser, busy], controllers.getOneTask);
router.post(
  "/tasks",
  [requireUser, Validate(Schemas.data.create), busy, rateLimiter],
  controllers.postTask
);
router.put(
  "/tasks/:id",
  [requireUser, Validate(Schemas.data.create), busy, rateLimiter],
  controllers.putTask
);
router.delete(
  "/tasks",
  [requireUser, Validate(Schemas.data.delete), busy, rateLimiter],
  controllers.deleteTasks
);
router.delete(
  "/tasks/:id",
  [requireUser, busy, rateLimiter],
  controllers.deleteTask
);

export = router;
