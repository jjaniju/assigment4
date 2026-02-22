import { describe, it, expect } from "vitest";
import express from "express";
import request from "supertest";
import dogRoutes from "../routes/dogRoutes";

const app = express();
app.use(express.json());
app.use("/dogs", dogRoutes);

describe("Dog Routes", () => {
  it("should return 200 for GET /dogs/random", async () => {
    const response = await request(app).get("/dogs/random");
    expect(response.status).toBe(200);
  });

  it("should return 404 for unknown routes", async () => {
    const response = await request(app).get("/unknown");
    expect(response.status).toBe(404);
  });
});