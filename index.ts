import app from "./app";
import { IncomingMessage, Server, ServerResponse } from "http";
import connectDB from "./config/db";
import logger from "./utils/logger";
import { startMetricsServer } from "./utils/metrics";
import shutdown from "./shutdown";

const port: string | number = process.env.PORT || 5000;
connectDB();

const { metricsServer } = startMetricsServer(app);

const server: Server<typeof IncomingMessage, typeof ServerResponse> =
  app.listen(port, async () => logger.info(`running on port ${port}`));

process.on("unhandledRejection", (err, promise) => {
  logger.error(`UNHANDLED: @${promise} - ${err}`);
  shutdown(server, metricsServer);
  process.exit(1);
});

process.on("uncaughtRejection", (err) => {
  logger.error(`UNCAUGHT: ${err}`);
  shutdown(server, metricsServer);
  process.exit(1);
});
