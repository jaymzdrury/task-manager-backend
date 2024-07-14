import { Request, Response } from "express";
import { ReqTimeoutError } from "../errors/req-timeout";
import { ResTimeoutError } from "../errors/res-timeout";

const timeoutHandler = (req: Request | null, res: Response) => {
  if (req)
    req.setTimeout(3000, () => {
      throw new ReqTimeoutError(`Request timed out: ${req}`);
    });

  res.setTimeout(2000, () => {
    throw new ResTimeoutError(`Response timed out: ${res}`);
  });
};

export default timeoutHandler;
