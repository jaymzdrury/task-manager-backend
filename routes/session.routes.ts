import express from "express";
import controllers from "../controllers/session.controllers";
import requireUser from "../middleware/requireUser";
import { Schemas, Validate } from "../middleware/joi";
import busy from "../middleware/toobusy";
import rateLimiter from "../middleware/rateLimiter";
const router = express.Router();

router.get("/user/sessions", requireUser, controllers.getUser);
router.post(
  "/user/login",
  [Validate(Schemas.session.create), busy, rateLimiter],
  controllers.login
);
router.delete(
  "/user/logout",
  [requireUser, busy, rateLimiter],
  controllers.logOut
);
export = router;
