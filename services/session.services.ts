import { get } from "lodash";
import { FilterQuery, UpdateQuery } from "mongoose";
import Session, { SessionModel } from "../models/session.model";
import { verifyJwt, signJwt } from "../utils/jwt";
import { getUser } from "./user.services";
import config from "../config/default";
import errMsg from "../utils/errMsg";
import { ServerError } from "../errors/server-error";

export async function postSession(userId: string, userAgent: string) {
  const session = await Session.create({ user: userId, userAgent });
  return session.toJSON();
}

export async function getSessions(query: FilterQuery<SessionModel>) {
  const session = Session.find(query)
    .lean()
    .setOptions({ sanitizeFilter: true });
  return session;
}

export async function updateSession(
  query: FilterQuery<SessionModel>,
  update: UpdateQuery<SessionModel>
) {
  const session = Session.updateOne(query, update)
    .lean()
    .setOptions({ sanitizeFilter: true });
  return session;
}

export async function reIssueAccessToken({
  refreshToken,
}: {
  refreshToken: string;
}) {
  try {
    const { decoded } = verifyJwt(refreshToken);
    if (!decoded || !get(decoded, "session")) return false;

    const session = await Session.findById(get(decoded, "session"))
      .lean()
      .setOptions({ sanitizeFilter: true });
    if (!session || !session.valid) return false;

    const user = await getUser({ _id: session.user });
    if (!user) return false;

    const accessToken = signJwt(
      { ...user, session: session._id },
      { expiresIn: config.accessTokenExpires }
    );
    return accessToken;
  } catch (e: any) {
    throw new ServerError(`REISSUE ${errMsg(e)}`);
  }
}
