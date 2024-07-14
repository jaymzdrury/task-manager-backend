import config from "../config/config";
const { key } = config;
import jwt from "jsonwebtoken";

const keyEnv = <string>key;

export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, keyEnv, { ...(options && options) });
}
//
export function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, keyEnv);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e: any) {
    return {
      valid: false,
      expired: e.message === "jwt expired",
      decoded: null,
    };
  }
}
