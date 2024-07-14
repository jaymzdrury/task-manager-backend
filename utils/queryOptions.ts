import { QueryOptions, trusted } from "mongoose";
import daysAgo from "./daysAgo";

export default function queryOptions(
  query?: string | string[] | QueryOptions | undefined
) {
  return !query
    ? {}
    : query === "gte"
    ? { date: trusted({ $gte: daysAgo(7) }) }
    : query === "lte"
    ? { date: trusted({ $lte: daysAgo(7) }) }
    : { title: trusted({ $regex: query, $options: "i" }) };
}
