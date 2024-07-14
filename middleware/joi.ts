import Joi, { ObjectSchema } from "joi";
import { NextFunction, Response, Request } from "express";
import { UserModel } from "../models/user.model";
import { TaskModel } from "../models/task.model";

export const Validate = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (err: any) {
      throw new Error(err);
    }
  };
};

export const Schemas = {
  user: {
    create: Joi.object<UserModel>({
      email: Joi.string().email().required(),
      name: Joi.string().required(),
      password: Joi.string().min(6).required(),
      role: Joi.string().valid("user", "admin", "auth").required(),
      loggedIn: Joi.date().required(),
      seconds: Joi.number().required(),
    }),
    edit: Joi.object<UserModel>({
      loggedIn: Joi.date().required(),
      seconds: Joi.number().required(),
    }),
  },
  session: {
    create: Joi.object<UserModel>({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  },
  data: {
    create: Joi.object<TaskModel>({
      title: Joi.string().min(2).required(),
      description: Joi.string().min(2).required(),
      date: Joi.date().required(),
      complete: Joi.string().valid("ToDo", "In Progress", "Done").required(),
      users: Joi.array().items(Joi.string()).required(),
    }),
    prompt: Joi.object<TaskModel>({
      title: Joi.string().min(2).required(),
    }),
    delete: Joi.object<TaskModel>({
      complete: Joi.string().valid("ToDo", "In Progress", "Done").required(),
    }),
  },
};
