import dotenv from "dotenv";
import joi from "joi";
import path from "path";
import { ServerError } from "../errors/server-error";

dotenv.config({ path: path.join(__dirname, "../.env") });

const envSchema = joi
  .object()
  .keys({
    KEY: joi.string().required(),
    URI: joi.string().required(),
    ORIGIN: joi.string().required(),
    AI: joi.string().required(),
    TASKID: joi.string().required(),
    USERID: joi.string().required(),
    ACCESSTOKEN: joi.string().required(),
    REFRESHTOKEN: joi.string().required(),
    EMAIL: joi.string().email().required(),
  })
  .unknown();

const { value: envVars, error } = envSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) throw new ServerError(`No ENV: ${error.message}`);

export default {
  key: envVars.KEY,
  uri: envVars.URI,
  origin: envVars.ORIGIN,
  ai: envVars.AI,
  taskId: envVars.TASKID,
  userId: envVars.USERID,
  accessToken: envVars.ACCESSTOKEN,
  refreshToken: envVars.REFRESHTOKEN,
  email: envVars.EMAIL,
};
