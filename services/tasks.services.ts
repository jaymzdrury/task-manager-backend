import { FilterQuery, QueryOptions, UpdateQuery, trusted } from "mongoose";
import Tasks, { TaskModel } from "../models/task.model";
import queryOptions from "../utils/queryOptions";
import daysAgo from "../utils/daysAgo";

export async function get(
  query?: string | string[] | QueryOptions | undefined
) {
  const data = await Tasks.find(queryOptions(query))
    .populate({
      path: "users",
      model: "User",
      select: "name role",
    })
    .setOptions({ sanitizeFilter: true });
  return data;
}

export async function getOne(query: FilterQuery<TaskModel>) {
  const data = await Tasks.findOne({ _id: query })
    .lean()
    .setOptions({ sanitizeFilter: true });
  return data;
}

export async function post(input: TaskModel) {
  const data = (await Tasks.create(input)).populate({
    path: "users",
    model: "User",
    select: "-password",
  });
  return data;
}

export async function put(
  query: FilterQuery<TaskModel>,
  update: UpdateQuery<TaskModel>,
  options: QueryOptions
) {
  const data = await Tasks.findOneAndUpdate({ _id: query }, update, options)
    .lean()
    .setOptions({ sanitizeFilter: true });
  return data;
}

export async function remove(query: FilterQuery<TaskModel>) {
  const data = await Tasks.deleteOne({ _id: query })
    .lean()
    .setOptions({ sanitizeFilter: true });
  return data;
}

export async function removeAll(input: TaskModel) {
  const data = await Tasks.deleteMany({ complete: input.complete })
    .lean()
    .setOptions({ sanitizeFilter: true });
  return data;
}

export async function removeOld() {
  const data = await Tasks.deleteMany({
    date: trusted({ $lte: daysAgo(30) }),
    complete: "Done",
  })
    .lean()
    .setOptions({ sanitizeFilter: true });
  return data;
}
