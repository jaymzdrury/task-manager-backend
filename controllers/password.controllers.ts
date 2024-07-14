import { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import { getUser } from "../services/user.services";
import { newPassword } from "../services/password.services";
import asyncHandler from "../utils/asyncHandler";

const resetPassword = asyncHandler(
  async (req: Request<UserModel["_id"]>, res: Response) => {
    const user = await getUser({ email: req.params.id });
    return res.send(user);
  }
);

const getPassword = asyncHandler(
  async (req: Request<UserModel["_id"]>, res: Response) => {
    const user = await getUser({ _id: req.params.id });
    return res.send(user);
  }
);

const updatePassword = asyncHandler(
  async (req: Request<UserModel["_id"]>, res: Response) => {
    const user = await newPassword(req.params.id, req.body, { new: true });
    return res.send(user);
  }
);

export default { resetPassword, getPassword, updatePassword };
