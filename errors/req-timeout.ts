import { CustomError } from "./custom-error";
import logger from "../utils/logger";

export class ReqTimeoutError extends CustomError {
  statusCode = 408;

  constructor(public message: string) {
    super(message);
    logger.error({ message, statusCode: 408 });
    Object.setPrototypeOf(this, ReqTimeoutError.prototype);
  }
  serializeErrors() {
    return [{ message: this.message }];
  }
}
