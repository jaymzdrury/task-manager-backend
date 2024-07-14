import { Application } from "express";
import userRoutes from "./routes/user.routes";
import sessionRoutes from "./routes/session.routes";
import tasksRoutes from "./routes/tasks.routes";
import passwordRoutes from "./routes/password.routes";
import aiRoutes from "./routes/ai.routes";
import redisRoutes from "./routes/redis.routes";
import scheduler from "./schedules/tasks.schedules";

function routeHandler(app: Application) {
  app.use("/", tasksRoutes);
  app.use("/", userRoutes);
  app.use("/", sessionRoutes);
  app.use("/", passwordRoutes);
  app.use("/", aiRoutes);
  app.use("/", redisRoutes);
  scheduler.deleteOldTasks;
}

export default routeHandler;
