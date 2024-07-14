import { Response, Request } from "express";
import timer from "./timer";
import timeoutHandler from "./timeout";
import logger from "./logger";
import errMsg from "./errMsg";
import { ServerError } from "../errors/server-error";
import { UserModel } from "../models/user.model";
import { TaskModel } from "../models/task.model";

const { start, end, responseTime } = timer;

type RequestTypes =
  | Request
  | Request<UserModel["_id"]>
  | Request<TaskModel["_id"]>;

const asyncHandler = (
  requestHandler: (req: RequestTypes, res: Response) => Promise<unknown>
) => {
  return (req: RequestTypes, res: Response) => {
    const method = req.method.toUpperCase();
    start;

    timeoutHandler(req, res);

    Promise.resolve(requestHandler(req, res))
      .then(() => {
        end;
        logger.info(`${method}: ${responseTime}`);
      })
      .catch((err) => {
        throw new ServerError(`${method}: ${errMsg(err)}`);
      });
  };
};

export default asyncHandler;
