import express from "express";
import controllers from "../controllers/redis.controllers";
import requireUser from "../middleware/requireUser";
import busy from "../middleware/toobusy";
const router = express.Router();

router.delete("/cache/:id", [requireUser, busy], controllers.deleteRedis);

export = router;
