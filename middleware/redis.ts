import { NextFunction, Request, Response } from "express";
import connectRedis from "../config/redis";
import errMsg from "../utils/errMsg";
import redisRoute from "../utils/redisRoute";
import { ServerError } from "../errors/server-error";

const redis = async (req: Request, res: Response, next: NextFunction) => {
  if (req.query.search?.length) return next();

  try {
    const { client } = await connectRedis();

    const cachedData = await client.get(redisRoute(req.originalUrl));

    if (cachedData != null) return res.send(JSON.parse(cachedData));
  } catch (err) {
    throw new ServerError(errMsg(err));
  }

  next();
};

export default redis;
