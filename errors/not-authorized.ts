import { CustomError } from "./custom-error";
import logger from "../utils/logger";

export class NotAuthorized extends CustomError {
  statusCode = 401;

  constructor(public message: string) {
    super(message);
    logger.error({ message, statusCode: 404 });
    Object.setPrototypeOf(this, NotAuthorized.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
