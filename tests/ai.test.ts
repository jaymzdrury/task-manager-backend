import app from "../app";
import request from "supertest";
import shutdown, { ServerType } from "../shutdown";
import connectDB from "../config/db";

let server: ServerType | undefined;

beforeAll(async () => {
  connectDB();
  server = app.listen(5002);
});

afterAll(async () => shutdown(server as ServerType));

describe("401 /ai", () => {
  it("should return 401", async () => {
    const res = await request(app).post("/ai");
    expect(res.statusCode).toBe(401);
  });
});
