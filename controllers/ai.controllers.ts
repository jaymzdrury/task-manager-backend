import { Request, Response } from "express";
import { post } from "../services/ai.services";

const postAI = async (req: Request, res: Response) => {
  const data = await post(req.body);
  return res.send(data);
};

export default { postAI };
