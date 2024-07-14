import bcrypt from "bcrypt";
import config from "../config/default";

export default async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(<number>config.saltWorkFactor);
  return bcrypt.hashSync(password, salt);
}
