import schedule from "node-schedule";
import controllers from "../controllers/tasks.controllers";
import config from "../config/default";
import errMsg from "../utils/errMsg";
import logger from "../utils/logger";

const deleteOldTasks = schedule.scheduleJob(config.scheduler, async () => {
  try {
    await controllers.deleteOldTasks();
  } catch (e) {
    deleteOldTasks.cancel();
    logger.error(`FAILED SCHEDULER: ${errMsg(e)}`);
  }
});

export default { deleteOldTasks, schedule };
