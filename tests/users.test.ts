import app from "../app";
import config from "../config/config";
import request from "supertest";
import shutdown, { ServerType } from "../shutdown";
import testData from "../utils/testData";
import connectDB from "../config/db";
const { userBody: body } = testData;
const { accessToken, refreshToken } = config;

let server: ServerType | undefined;

beforeAll(async () => {
  connectDB();
  server = app.listen(5001);
});

afterAll(async () => shutdown(server as ServerType));

describe("GET /users", () => {
  it("should return all users", async () => {
    const res = await request(app)
      .get("/user")
      .set("Authorization", `Bearer ${accessToken}`)
      .set("x-refresh", refreshToken);
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe("POST /users", () => {
  it("should create task", async () => {
    const res = await request(app).post("/user/signup").send(body);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Test Dummie");
  });
});

describe("401 /users", () => {
  it("should return 401", async () => {
    const res = await request(app).get("/user");
    expect(res.statusCode).toBe(401);
  });
});
