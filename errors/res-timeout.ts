import { CustomError } from "./custom-error";
import logger from "../utils/logger";

export class ResTimeoutError extends CustomError {
  statusCode = 504;

  constructor(public message: string) {
    super(message);
    logger.error({ message, statusCode: 504 });
    Object.setPrototypeOf(this, ResTimeoutError.prototype);
  }
  serializeErrors() {
    return [{ message: this.message }];
  }
}
