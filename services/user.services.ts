import { omit } from "lodash";
import User, { UserModel } from "../models/user.model";
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";

export async function getUsers() {
  const data = await User.find().lean().setOptions({ sanitizeFilter: true });
  return data;
}

export async function getUser(query: FilterQuery<UserModel>) {
  const result = await User.findOne(query)
    .lean()
    .setOptions({ sanitizeFilter: true });
  return result;
}

export async function putUser(
  query: FilterQuery<UserModel>,
  update: UpdateQuery<UserModel>,
  options: QueryOptions
) {
  const data = await User.findOneAndUpdate({ _id: query }, update, options)
    .lean()
    .setOptions({ sanitizeFilter: true });
  return data;
}

export async function signUpUser(input: UserModel) {
  const user = await User.create(input);
  return omit(user.toJSON(), "password");
}
