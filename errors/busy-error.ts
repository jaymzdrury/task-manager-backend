import { CustomError } from "./custom-error";
import logger from "../utils/logger";

export class TooBusyError extends CustomError {
  statusCode = 503;

  constructor(public message: string) {
    super(message);
    logger.error({ message, statusCode: 503 });
    Object.setPrototypeOf(this, TooBusyError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
