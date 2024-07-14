import app from "../app";
import config from "../config/config";
import request from "supertest";
import connectDB from "../config/db";
import shutdown, { ServerType } from "../shutdown";
const { userId, email } = config;

let server: ServerType | undefined;

beforeAll(async () => {
  connectDB();
  server = app.listen(5003);
});

afterAll(async () => shutdown(server as ServerType));

describe("GET /user/password/:id", () => {
  it("should return one user", async () => {
    const res = await request(app).get(`/user/password/${userId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("James Drury");
  });
});

describe("GET /user/:id", () => {
  it("should return one user", async () => {
    const res = await request(app).get(`/user/${email}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("James Drury");
  });
});
