import { Request, Response } from "express";
import { signUpUser, getUsers, putUser } from "../services/user.services";
import { redisSet } from "../services/redis.services";
import { UserModel } from "../models/user.model";
import { omit } from "lodash";
import asyncHandler from "../utils/asyncHandler";

const getUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await getUsers();
  await redisSet(req.originalUrl, user);
  return res.send(user);
});

const editUser = asyncHandler(
  async (req: Request<UserModel["_id"]>, res: Response) => {
    const data = await putUser(req.params.id, req.body, { new: true });
    return res.send(data);
  }
);

const signUp = asyncHandler(async (req: Request, res: Response) => {
  const user = await signUpUser(req.body);
  return res.send(omit(user, "password"));
});

export default { getUser, editUser, signUp };
