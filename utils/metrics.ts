import { Application } from "express";
import { IncomingMessage, Server, ServerResponse } from "http";
import client from "prom-client";
import logger from "./logger";

export const restResponseTimeHistogram = new client.Histogram({
  name: "rest_response_time",
  help: "REST API response time in seconds",
  labelNames: ["method", "route", "status_code"],
});

export function startMetricsServer(app: Application) {
  const collectDefaultMetrics = client.collectDefaultMetrics;

  collectDefaultMetrics();

  app.get("/metrics", async (req, res) => {
    res.set("Content-Type", client.register.contentType);
    return res.send(await client.register.metrics());
  });

  const metricsServer: Server<typeof IncomingMessage, typeof ServerResponse> =
    app.listen(9100, () => {
      logger.info("Metrics server started at http://localhost:9100");
    });

  return { metricsServer };
}
