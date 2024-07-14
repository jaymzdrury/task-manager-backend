import { Request, Response } from "express";
import { redisDel } from "../services/redis.services";

const deleteRedis = async (req: Request, res: Response) => {
  const data = await redisDel(req.params.id);
  res.send(data).status(200);
};

export default { deleteRedis };
