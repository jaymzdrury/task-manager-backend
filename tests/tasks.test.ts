import app from "../app";
import config from "../config/config";
import request from "supertest";
import testData from "../utils/testData";
import connectDB from "../config/db";
import shutdown, { ServerType } from "../shutdown";
const { taskBody: body } = testData;
const { taskId, accessToken, refreshToken } = config;

let server: ServerType | undefined;

beforeAll(async () => {
  connectDB();
  server = app.listen(5000);
});

afterAll(async () => shutdown(server as ServerType));

describe("GET /tasks", () => {
  it("should return all tasks", async () => {
    const res = await request(app)
      .get("/tasks")
      .set("Authorization", `Bearer ${accessToken}`)
      .set("x-refresh", refreshToken);
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe("GET ID /tasks/:id", () => {
  it("should return one task", async () => {
    const res = await request(app)
      .get(`/tasks/${taskId}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .set("x-refresh", refreshToken);
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Test");
  });
});

describe("PUT /tasks", () => {
  it("should update task", async () => {
    const res = await request(app)
      .put(`/tasks/${taskId}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .set("x-refresh", refreshToken)
      .send(body);
    expect(res.statusCode).toBe(200);
    expect(res.body.description).toBe("Test");
  });
});

describe("DELETE /tasks/:id", () => {
  it("should delete task", async () => {
    const res = await request(app)
      .delete(`/tasks/${taskId}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .set("x-refresh", refreshToken);
    expect(res.statusCode).toBe(200);
  });
});

describe("POST /tasks", () => {
  it("should create task", async () => {
    const res = await request(app)
      .post("/tasks")
      .set("Authorization", `Bearer ${accessToken}`)
      .set("x-refresh", refreshToken)
      .send(body);
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Test");
  });
});

describe("401 /tasks", () => {
  it("should return 401", async () => {
    const res = await request(app).get("/tasks");
    expect(res.statusCode).toBe(401);
  });
});
