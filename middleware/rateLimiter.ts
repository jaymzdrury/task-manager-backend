import { NextFunction, Request, Response } from "express";
import { RateLimiterMemory } from "rate-limiter-flexible";
import config from "../config/limit";
import { NotFoundError } from "../errors/not-found";
import { RateLimitError } from "../errors/rate-limit";

const limiter = new RateLimiterMemory(config);

const rateLimiter = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.ip) throw new NotFoundError("IP not found");

    const rateLimitRes = await limiter.consume(req.ip);
    res.setHeader("Retry-After", rateLimitRes.msBeforeNext / 1000);
    res.setHeader("X-RateLimit-Limit", config.points);
    res.setHeader("X-RateLimit-Remaining", rateLimitRes.remainingPoints);
    res.setHeader(
      "X-RateLimit-Reset",
      Number(new Date(Date.now() + rateLimitRes.msBeforeNext))
    );
  } catch (error) {
    throw new RateLimitError("Too Many Requests. Wait an hour...");
  }
  next();
};

export default rateLimiter;
