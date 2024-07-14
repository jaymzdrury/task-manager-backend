import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import User, { UserModel } from "../models/user.model";
import { omit } from "lodash";
import hashPassword from "../utils/hashPassword";

export async function newPassword(
  query: FilterQuery<UserModel>,
  update: UpdateQuery<UserModel>,
  options: QueryOptions
) {
  const hash = await hashPassword(update.password);
  const data = await User.findOneAndUpdate(
    { _id: query },
    { ...update, password: hash },
    options
  )
    .lean()
    .setOptions({ sanitizeFilter: true });
  return data;
}

export async function validatePassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await User.findOne({ email }).setOptions({
    sanitizeFilter: true,
  });
  if (!user) return false;

  const isValid = await user.comparePassword(password);
  if (!isValid) return false;

  return omit(user.toJSON(), "password");
}
