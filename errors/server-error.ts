import { CustomError } from "./custom-error";
import logger from "../utils/logger";

export class ServerError extends CustomError {
  statusCode = 500;

  constructor(public message: string) {
    super(message);
    logger.error({ message, statusCode: 500 });
    Object.setPrototypeOf(this, ServerError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
