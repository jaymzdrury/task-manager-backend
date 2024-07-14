import { createClient } from "redis";
import { BadRequestError } from "../errors/bad-request";
import logger from "../utils/logger";

async function connectRedis() {
  const client = createClient();

  client.on("error", (err) => {
    throw new BadRequestError(`Redis DB Error: ${err.message}`);
  });

  await client.connect().then(() => logger.info("Redis Connected"));

  return { client };
}

export default connectRedis;
