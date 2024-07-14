import config from "./config";
const { uri } = config;

import mongoose, { Connection } from "mongoose";
import logger from "../utils/logger";
import errMsg from "../utils/errMsg";
import { NotFoundError } from "../errors/not-found";
import { ServerError } from "../errors/server-error";
import { BadRequestError } from "../errors/bad-request";

const db: string | undefined = uri;

function connectDB() {
  if (!db) throw new NotFoundError("No URI Found");

  const connection: Connection = mongoose.connection;
  if (connection.readyState >= 1) return;

  try {
    mongoose.connect(db);
    connection.on("connected", () =>
      logger.info(`MongoDB connected: ${connection.host}`)
    );
    connection.on("error", (err) => {
      throw new ServerError(`DB Error: ${err.message}`);
    });
    connection.on("disconnected", () => {
      logger.warn("MongoDB disconnected");
    });
  } catch (e) {
    throw new BadRequestError(errMsg(e));
  }
}

export default connectDB;
