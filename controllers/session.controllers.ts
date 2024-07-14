import { Request, Response } from "express";
import { omit } from "lodash";
import {
  postSession,
  getSessions,
  updateSession,
} from "../services/session.services";
import { validatePassword } from "../services/password.services";
import config from "../config/default";
import { signJwt } from "../utils/jwt";
import asyncHandler from "../utils/asyncHandler";

const login = asyncHandler(async (req: Request, res: Response) => {
  const user = await validatePassword(req.body);
  if (!user) throw new Error();

  const session = await postSession(user._id, req.get("user-agent") || "");

  const accessToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.accessTokenExpires }
  );
  const refreshToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.refreshTokenExpires }
  );

  return res.send({ accessToken, refreshToken, user: omit(user, "password") });
});

const getUser = asyncHandler(async (req: Request, res: Response) => {
  const userId = res.locals.user._id;
  const sessions = await getSessions({ user: userId, valid: true });
  return res.send(sessions);
});

const logOut = asyncHandler(async (req: Request, res: Response) => {
  const sessionId = res.locals.user.session;
  await updateSession({ _id: sessionId }, { valid: false });
  return res.send({ accessToken: null, refreshToken: null });
});

export default { login, getUser, logOut };
