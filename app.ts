import config from "./config/config";

import express, { Application, Request, Response } from "express";
import { IncomingMessage, ServerResponse } from "http";
import cors, { CorsOptions } from "cors";
import compression from "compression";
import defaultConfig from "./config/default";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import deserializeUser from "./middleware/deserializeUser";
import responseTime from "response-time";
import { restResponseTimeHistogram } from "./utils/metrics";
import routes from "./routeHandler";
import { NotFoundError } from "./errors/not-found";

const { origin } = config;
const { compression: defaultCompression, limit } = defaultConfig;

const app: Application = express().disable("x-powered-by");
const options: CorsOptions = { origin, credentials: true };
app.use(cors(options));
app.use(compression(defaultCompression));
app.use(express.json({ limit }));
app.use(express.urlencoded({ extended: true, limit }));
app.use(helmet());
app.use(mongoSanitize());
app.use(cookieParser());
app.use(deserializeUser);
app.use(
  responseTime(
    (
      req: IncomingMessage,
      res: ServerResponse<IncomingMessage>,
      time: number
    ) => {
      if (req?.url) {
        restResponseTimeHistogram.observe(
          {
            method: req.method,
            route: req.url,
            status_code: res.statusCode,
          },
          time * 1000
        );
      }
    }
  )
);

app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));
routes(app);

app.all("*", async (req: Request, res: Response) => {
  throw new NotFoundError("App not found");
});

export default app;
