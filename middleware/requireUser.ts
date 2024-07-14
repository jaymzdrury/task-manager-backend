import { Request, Response, NextFunction } from "express";
import { NotAuthorized } from "../errors/not-authorized";

const requireUser = (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;
  if (!user) throw new NotAuthorized("Not authorized");
  return next();
};

export default requireUser;
