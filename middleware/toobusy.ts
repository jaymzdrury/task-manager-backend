import { Request, Response, NextFunction } from "express";
import toobusy from "toobusy-js";
import { TooBusyError } from "../errors/busy-error";

const busy = (req: Request, res: Response, next: NextFunction) => {
  if (toobusy()) throw new TooBusyError("Server is too busy");
  return next();
};

export default busy;
