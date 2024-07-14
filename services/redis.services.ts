import connectRedis from "../config/redis";
import redisRoute from "../utils/redisRoute";
import errMsg from "../utils/errMsg";
import { ServerError } from "../errors/server-error";

export const redisSet = async (key: string, value: {}) => {
  const { client } = await connectRedis();
  await client.set(redisRoute(key), JSON.stringify(value));
};

export const redisDel = async (key: string) => {
  try {
    const { client } = await connectRedis();
    await client.del(key);
  } catch (error) {
    throw new ServerError(errMsg(error));
  }
};
