import mongoose from "mongoose";
import scheduler from "./schedules/tasks.schedules";
import logger from "./utils/logger";
import { IncomingMessage, Server, ServerResponse } from "http";

export type ServerType = Server<typeof IncomingMessage, typeof ServerResponse>;

export default function shutdown(
  server: ServerType,
  metricsServer?: ServerType
) {
  server.close((err) => {
    if (err) logger.error("ERROR: Server closing:", err);

    scheduler.schedule
      .gracefulShutdown()
      .then(() => logger.info("Scheduler closed"))
      .catch((err) => logger.error("ERROR: Scheduler closing:", err))
      .finally(() =>
        mongoose.connection
          .close(false)
          .then(() => logger.info("MongoDB closed"))
      );
  });

  metricsServer &&
    metricsServer.close((err) =>
      err
        ? logger.error("ERROR: Metrics Server closing: ", err)
        : logger.info("Metrics Server closed")
    );
}
