import { Request, Response } from "express";
import {
  get,
  getOne,
  post,
  put,
  remove,
  removeAll,
  removeOld,
} from "../services/tasks.services";
import { redisSet } from "../services/redis.services";
import { TaskModel } from "../models/task.model";
import asyncHandler from "../utils/asyncHandler";

const getTask = asyncHandler(async (req: Request, res: Response) => {
  const data = await get(req.query.search);
  if (!req.query.search?.length) await redisSet(req.originalUrl, data);
  return res.send(data);
});

const getOneTask = asyncHandler(
  async (req: Request<TaskModel["_id"]>, res: Response) => {
    const data = await getOne(req.params.id);
    return res.send(data);
  }
);

const postTask = asyncHandler(async (req: Request, res: Response) => {
  const data = await post(req.body);
  return res.send(data);
});

const putTask = asyncHandler(
  async (req: Request<TaskModel["_id"]>, res: Response) => {
    const data = await put(req.params.id, req.body, { new: true });
    return res.send(data);
  }
);

const deleteTask = asyncHandler(
  async (req: Request<TaskModel["_id"]>, res: Response) => {
    const data = await remove(req.params.id);
    return res.send(data);
  }
);

const deleteTasks = asyncHandler(async (req: Request, res: Response) => {
  const data = await removeAll(req.body);
  return res.send(data);
});

const deleteOldTasks = async () => {
  const data = await removeOld();
  return data;
};

export default {
  getTask,
  postTask,
  putTask,
  deleteTask,
  deleteTasks,
  getOneTask,
  deleteOldTasks,
};
