import { CustomError } from "./custom-error";
import logger from "../utils/logger";

export class RateLimitError extends CustomError {
  statusCode = 429;

  constructor(public message: string) {
    super(message);
    logger.error({ message, statusCode: 429 });
    Object.setPrototypeOf(this, RateLimitError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
