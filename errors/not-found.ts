import { CustomError } from "./custom-error";
import logger from "../utils/logger";

export class NotFoundError extends CustomError {
  statusCode = 404;

  constructor(public message: string) {
    super(message);
    logger.error({ message, statusCode: 404 });
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
